---
title: "Centralized Logging với Promtail, Loki và Grafana — Từ Single Server đến Multi-Server"
description: "Hướng dẫn triển khai hệ thống quản lý và xem log tập trung sử dụng Promtail, Loki, Grafana. Bao gồm Docker Compose, cấu hình chi tiết, kiến trúc ASCII, và các lưu ý vận hành thực tế."
pubDate: 2026-06-04
tags: ["devops", "logging", "docker", "monitoring"]
draft: false
---

## Bài toán thực tế

Khi bạn vận hành nhiều service trên server — dù là monolith hay microservices — việc SSH vào từng container để `docker logs` hay `tail -f` từng file log nhanh chóng trở thành ác mộng:

- **Không thể tìm kiếm** log xuyên suốt nhiều service cùng lúc
- **Mất context** khi log bị rotate hoặc container restart
- **Không correlate** được sự kiện giữa các service
- Khi backend và nơi xem log **nằm khác server**, SSH chaining càng phức tạp hơn

Giải pháp: **Promtail + Loki + Grafana** — bộ stack logging nhẹ, dễ triển khai, tích hợp tốt với Docker.

## Tổng quan kiến trúc

### Promtail, Loki, Grafana là gì?

| Component    | Vai trò                                                 |
| ------------ | ------------------------------------------------------- |
| **Promtail** | Agent thu thập log từ file/container, gửi về Loki       |
| **Loki**     | Hệ thống lưu trữ & index log (chỉ index label, không index full-text) |
| **Grafana**  | Dashboard trực quan hóa, truy vấn log bằng LogQL        |

### Tại sao không dùng ELK?

| Tiêu chí       | ELK (Elasticsearch)         | PLG (Promtail/Loki/Grafana)  |
| --------------- | --------------------------- | ---------------------------- |
| RAM             | 4-8 GB minimum              | 512 MB - 1 GB đủ dùng       |
| Index           | Full-text (tốn tài nguyên)  | Chỉ label (nhẹ)             |
| Storage         | Lớn (index + data)          | Nhỏ hơn nhiều               |
| Complexity      | Cao (tuning JVM, sharding)  | Thấp                        |
| Phù hợp         | Enterprise, search phức tạp | Small-Medium, DevOps team    |

## Kịch bản 1 — Tất cả trên cùng một server

Mọi service (app, database, cache...) và stack logging đều chạy trên 1 máy.

```
┌─────────────────────────────────────────────────────────┐
│                      SERVER                             │
│                                                         │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐              │
│  │  App API  │  │  Worker  │  │  Nginx   │              │
│  │ (stdout)  │  │ (stdout)  │  │ (/var/log)│             │
│  └─────┬─────┘  └─────┬─────┘  └─────┬─────┘           │
│        │              │              │                   │
│        └──────────────┼──────────────┘                   │
│                       ▼                                  │
│              ┌────────────────┐                          │
│              │   Promtail     │                          │
│              │  (collector)   │                          │
│              └───────┬────────┘                          │
│                      │ push (HTTP)                       │
│                      ▼                                   │
│              ┌────────────────┐                          │
│              │     Loki       │                          │
│              │  (log store)   │                          │
│              └───────┬────────┘                          │
│                      │ query                             │
│                      ▼                                   │
│              ┌────────────────┐                          │
│              │    Grafana     │  ◄── Browser :3000       │
│              │  (dashboard)   │                          │
│              └────────────────┘                          │
└─────────────────────────────────────────────────────────┘
```

### Docker Compose — Single Server

```yaml
# docker-compose.yml
services:
  # ---- Logging Stack ----
  loki:
    image: grafana/loki:3.5.0
    container_name: loki
    ports:
      - "3100:3100"
    volumes:
      - ./loki-config.yaml:/etc/loki/local-config.yaml
      - loki_data:/loki
    command: -config.file=/etc/loki/local-config.yaml
    restart: unless-stopped

  promtail:
    image: grafana/promtail:3.5.0
    container_name: promtail
    volumes:
      - ./promtail-config.yaml:/etc/promtail/config.yaml
      - /var/log:/var/log:ro
      - /var/lib/docker/containers:/var/lib/docker/containers:ro
      - /var/run/docker.sock:/var/run/docker.sock:ro
    command: -config.file=/etc/promtail/config.yaml
    depends_on:
      - loki
    restart: unless-stopped

  grafana:
    image: grafana/grafana:11.6.0
    container_name: grafana
    ports:
      - "3000:3000"
    environment:
      - GF_SECURITY_ADMIN_USER=admin
      - GF_SECURITY_ADMIN_PASSWORD=changeme
      - GF_USERS_ALLOW_SIGN_UP=false
    volumes:
      - grafana_data:/var/lib/grafana
      - ./grafana-datasources.yaml:/etc/grafana/provisioning/datasources/datasources.yaml
    depends_on:
      - loki
    restart: unless-stopped

  # ---- Your Application Services ----
  api:
    image: your-api:latest
    container_name: api
    labels:
      logging: "promtail"
      service: "api"
    # ... your config

  worker:
    image: your-worker:latest
    container_name: worker
    labels:
      logging: "promtail"
      service: "worker"
    # ... your config

volumes:
  loki_data:
  grafana_data:
```

### Config files

**loki-config.yaml**

```yaml
auth_enabled: false

server:
  http_listen_port: 3100

common:
  path_prefix: /loki
  storage:
    filesystem:
      chunks_directory: /loki/chunks
      rules_directory: /loki/rules
  replication_factor: 1
  ring:
    kvstore:
      store: inmemory

schema_config:
  configs:
    - from: "2024-01-01"
      store: tsdb
      object_store: filesystem
      schema: v13
      index:
        prefix: index_
        period: 24h

limits_config:
  # Giới hạn tốc độ ingestion
  ingestion_rate_mb: 10
  ingestion_burst_size_mb: 20
  # Retention — tự động xóa log cũ
  retention_period: 168h  # 7 ngày

compactor:
  working_directory: /loki/compactor
  compaction_interval: 10m
  retention_enabled: true
  retention_delete_delay: 2h
  delete_request_store: filesystem
```

**promtail-config.yaml**

```yaml
server:
  http_listen_port: 9080
  grpc_listen_port: 0

positions:
  filename: /tmp/positions.yaml

clients:
  - url: http://loki:3100/loki/api/v1/push
    # Batching — gom log trước khi gửi
    batchwait: 1s
    batchsize: 1048576  # 1MB

scrape_configs:
  # Thu thập log từ Docker containers
  - job_name: docker
    docker_sd_configs:
      - host: unix:///var/run/docker.sock
        refresh_interval: 5s
        filters:
          - name: label
            values: ["logging=promtail"]
    relabel_configs:
      - source_labels: ['__meta_docker_container_name']
        regex: '/(.*)'
        target_label: 'container'
      - source_labels: ['__meta_docker_container_label_service']
        target_label: 'service'
      - source_labels: ['__meta_docker_container_label_logging']
        target_label: '__tmp_logging'
      # Chỉ scrape container có label logging=promtail
      - source_labels: ['__tmp_logging']
        regex: 'promtail'
        action: keep

  # Thu thập log từ file hệ thống (VD: nginx, syslog)
  - job_name: system
    static_configs:
      - targets:
          - localhost
        labels:
          job: syslog
          __path__: /var/log/syslog

  - job_name: nginx
    static_configs:
      - targets:
          - localhost
        labels:
          job: nginx
          __path__: /var/log/nginx/*.log
    pipeline_stages:
      - regex:
          expression: '^(?P<remote_addr>[\w\.]+) - .* \[(?P<time_local>.*)\] "(?P<method>\w+) (?P<request_uri>\S+) .*" (?P<status>\d+) (?P<body_bytes_sent>\d+)'
      - labels:
          method:
          status:
```

**grafana-datasources.yaml** — Tự động thêm Loki làm datasource

```yaml
apiVersion: 1

datasources:
  - name: Loki
    type: loki
    access: proxy
    url: http://loki:3100
    isDefault: true
    editable: true
```

## Kịch bản 2 — Backend và Logging nằm khác server

Đây là kiến trúc phổ biến hơn trong production: backend chạy ở server A, còn Loki + Grafana chạy ở server B (logging server).

```
┌──────────────────────────────┐     ┌──────────────────────────────┐
│        SERVER A              │     │        SERVER B              │
│      (Backend)               │     │      (Logging)               │
│                              │     │                              │
│  ┌────────┐  ┌────────┐     │     │     ┌────────────────┐       │
│  │ App API│  │ Worker │     │     │     │     Loki       │       │
│  └───┬────┘  └───┬────┘     │     │     │  :3100         │       │
│      │           │          │     │     └───────┬────────┘       │
│      └─────┬─────┘          │     │             │                │
│            ▼                │     │             ▼                │
│   ┌────────────────┐        │     │     ┌────────────────┐       │
│   │   Promtail     │ ──push──┼────┼──►  │    (receives)  │       │
│   │  (collector)   │  HTTP   │     │     └────────────────┘       │
│   └────────────────┘        │     │             │                │
│                              │     │             ▼                │
│                              │     │     ┌────────────────┐       │
│                              │     │     │    Grafana     │       │
│                              │     │     │  :3000         │       │
│                              │     │     └────────────────┘       │
└──────────────────────────────┘     └──────────────────────────────┘
         Network (LAN / VPN)
```

### Server A — docker-compose.yml (Backend + Promtail)

```yaml
services:
  promtail:
    image: grafana/promtail:3.5.0
    container_name: promtail
    volumes:
      - ./promtail-config.yaml:/etc/promtail/config.yaml
      - /var/lib/docker/containers:/var/lib/docker/containers:ro
      - /var/run/docker.sock:/var/run/docker.sock:ro
    command: -config.file=/etc/promtail/config.yaml
    restart: unless-stopped

  api:
    image: your-api:latest
    container_name: api
    labels:
      logging: "promtail"
      service: "api"

  worker:
    image: your-worker:latest
    container_name: worker
    labels:
      logging: "promtail"
      service: "worker"
```

**promtail-config.yaml trên Server A** — thay URL trỏ về Server B:

```yaml
clients:
  - url: http://<SERVER_B_IP>:3100/loki/api/v1/push
    batchwait: 1s
    batchsize: 1048576
    # Timeout khi network chậm
    timeout: 10s
    # Retry khi Loki không phản hồi
    backoff_config:
      min_period: 500ms
      max_period: 5m
      max_retries: 10

# ... scrape_configs giống kịch bản 1
```

### Server B — docker-compose.yml (Loki + Grafana)

```yaml
services:
  loki:
    image: grafana/loki:3.5.0
    container_name: loki
    ports:
      - "3100:3100"
    volumes:
      - ./loki-config.yaml:/etc/loki/local-config.yaml
      - loki_data:/loki
    command: -config.file=/etc/loki/local-config.yaml
    restart: unless-stopped

  grafana:
    image: grafana/grafana:11.6.0
    container_name: grafana
    ports:
      - "3000:3000"
    environment:
      - GF_SECURITY_ADMIN_USER=admin
      - GF_SECURITY_ADMIN_PASSWORD=changeme
    volumes:
      - grafana_data:/var/lib/grafana
      - ./grafana-datasources.yaml:/etc/grafana/provisioning/datasources/datasources.yaml
    depends_on:
      - loki
    restart: unless-stopped

volumes:
  loki_data:
  grafana_data:
```

## Truy vấn log với LogQL

Sau khi deploy xong, truy cập Grafana tại `http://<server>:3000` → **Explore** → chọn datasource **Loki**.

Một số query hữu ích:

```logql
# Xem tất cả log của service "api"
{service="api"}

# Lọc log chứa từ "error" (case-insensitive)
{service="api"} |~ "(?i)error"

# Log có HTTP status 5xx
{service="api"} | json | status >= 500

# Đếm số lượng error trong 5 phút
count_over_time({service="api"} |~ "error" [5m])

# Top 5 endpoint có nhiều lỗi nhất
topk(5, sum by (request_uri) (
  count_over_time({job="nginx"} | json | status >= 500 [1h])
))

# Xem log nhiều service cùng lúc
{service=~"api|worker|nginx"}
```

## Lợi ích

1. **Nhẹ** — Loki không index full-text, tiết kiệm RAM/CPU/disk hơn ELK rất nhiều
2. **Dễ triển khai** — Docker Compose là đủ, không cần Kubernetes
3. **Label-based** — Tổ chức log theo label (service, environment, host), rất trực quan
4. **Tích hợp Grafana** — Kết hợp metric (Prometheus) + log (Loki) trên cùng 1 dashboard
5. **Chi phí thấp** — Chạy tốt trên VPS 2 vCPU / 2 GB RAM cho small-medium workload
6. **Scale được** — Loki hỗ trợ S3/GCS backend khi cần scale storage

## Hạn chế

1. **Không full-text search** — LogQL mạnh nhưng không thay thế Elasticsearch khi cần search phức tạp
2. **High cardinality** — Nếu dùng label có giá trị quá nhiều (VD: user_id, request_id), Loki sẽ chậm và tốn bộ nhớ
3. **Single point of failure** — Trong setup đơn giản (single node), Loki chết = mất khả năng xem log
4. **Query lớn chậm** — Truy vấn scan nhiều ngày dữ liệu có thể timeout
5. **Không built-in alerting phức tạp** — Cần kết hợp Grafana Alerting hoặc Loki Ruler

## Các lưu ý vận hành quan trọng

### 1. Tránh full disk

Đây là vấn đề **số 1** khi chạy Loki:

```yaml
# Trong loki-config.yaml
limits_config:
  retention_period: 168h        # Chỉ giữ log 7 ngày
  ingestion_rate_mb: 10         # Giới hạn tốc độ nhận log
  per_stream_rate_limit: 3MB    # Giới hạn mỗi stream

compactor:
  retention_enabled: true       # BẮT BUỘC phải bật
```

**Thêm monitoring disk:**

```bash
# Crontab kiểm tra disk usage
*/5 * * * * df -h /var/lib/docker/volumes | awk 'NR==2{if($5+0 > 80) system("echo DISK WARNING | mail -s alert admin@example.com")}'
```

**Giới hạn Docker log size** (quan trọng!):

```json
// /etc/docker/daemon.json
{
  "log-driver": "json-file",
  "log-opts": {
    "max-size": "10m",
    "max-file": "3"
  }
}
```

### 2. Quá nhiều log gửi cùng lúc (Burst)

Khi service bị lỗi liên tục, log có thể tăng đột biến 10-100x:

```yaml
# promtail-config.yaml — Rate limiting
limits_config:
  readline_rate_enabled: true
  readline_rate: 1000           # Tối đa 1000 dòng/giây mỗi stream
  readline_burst: 5000          # Cho phép burst 5000 dòng

# Loki — Reject khi quá tải
limits_config:
  ingestion_rate_mb: 10
  ingestion_burst_size_mb: 20
  reject_old_samples: true
  reject_old_samples_max_age: 168h
```

### 3. Network giữa Promtail và Loki

Khi chạy multi-server:

- **Luôn dùng VPN/private network** — Không expose Loki port 3100 ra public
- **Cấu hình retry** — Promtail có buffer nội bộ, khi Loki down nó sẽ retry
- **Timeout hợp lý** — Tránh Promtail bị block quá lâu

```yaml
# Promtail retry config
clients:
  - url: http://loki:3100/loki/api/v1/push
    backoff_config:
      min_period: 500ms
      max_period: 5m
      max_retries: 10
    timeout: 10s
```

### 4. Bảo mật

```yaml
# Loki — Giới hạn IP truy cập (dùng reverse proxy)
# nginx.conf trước Loki
server {
    listen 3100;
    allow 10.0.0.0/8;      # Chỉ cho phép internal network
    deny all;

    location / {
        proxy_pass http://localhost:3100;
    }
}
```

Hoặc dùng **basic auth** trên Promtail → Loki:

```yaml
# promtail-config.yaml
clients:
  - url: http://loki:3100/loki/api/v1/push
    basic_auth:
      username: promtail
      password_file: /etc/promtail/password
```

### 5. Backup và High Availability

- **Backup Grafana**: Dashboard config nằm trong volume `grafana_data`, backup định kỳ
- **Loki data**: Nếu dùng filesystem storage, backup thư mục `/loki`
- **Production**: Cân nhắc Loki với S3/MinIO backend để tránh mất data khi server chết

```yaml
# Loki với S3 backend (production)
common:
  storage:
    s3:
      endpoint: minio:9000
      bucketnames: loki-chunks
      access_key_id: ${MINIO_ACCESS_KEY}
      secret_access_key: ${MINIO_SECRET_KEY}
      insecure: true
      s3forcepathstyle: true
```

## Checklist triển khai

```
✅ Cài Docker & Docker Compose trên tất cả server
✅ Cấu hình Docker log driver (max-size, max-file)
✅ Deploy Loki với retention_period phù hợp
✅ Deploy Promtail với rate limiting
✅ Cấu hình Grafana datasource
✅ Thiết lập network security (VPN/firewall)
✅ Setup monitoring disk usage
✅ Test LogQL query cơ bản
✅ Tạo Grafana dashboard cho từng service
✅ Cấu hình alerting cho error rate
```

## Kết luận

Promtail + Loki + Grafana là giải pháp logging **vừa đủ** cho phần lớn team backend. Nó không cố gắng làm mọi thứ như ELK, mà tập trung vào việc **thu thập, lưu trữ, và truy vấn log một cách hiệu quả** với tài nguyên tối thiểu.

Điều quan trọng nhất khi vận hành: **luôn cấu hình retention, rate limiting, và monitoring disk**. Hệ thống logging mà tự nó làm chết server thì còn tệ hơn không có logging.

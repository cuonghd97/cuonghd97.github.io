# Microservice Architecture
### Context
Giống như yêu cầu phần mềm của kiến trúc `monoithic`: Bạn đang phát triển một ứng dụng server-side. Ứng dụng của bạn phải hỗ trợ rất nhiều các client khác nhau ví dụ như 
trình duyệt desktop, trình duyệt mobile và các ứng dụng cho thiết bị di động. Phải có các API cho
các ứng dụng bên thứ 3 gọi. Ứng dụng của bạn có thể tích hợp với các ứng dụng khác qua web service hoặc message broker.
Ứng dụng phải xử lý các HTTP request theo logic của nghiệp vụ, truy cập vào database, gửi - nhận message với các hệ thống
khác và trả về các response dạng HTML/JSON/XML. 
### Problem
Vấn đề đặt ra là sẽ dùng kiến trúc triển khai nào cho ứng dụng ta vừa nêu trên.
### Force
+ Có một nhóm các developer đang phát triển ứng dụng.
+ Những thành viên mới phải nhanh chóng làm việc hiệu quả.
+ Ứng dụng đang phát triển phải dễ hiểu và dễ sửa đổi.
+ Bạn muốn áp dụng `Continuous Deployment` cho ứng dụng.
+ Bạn phải chạy nhiều instance của ứng dụng trên nhiều máy để đáp ứng các yêu cầu về khả năng mở rộng và tính khả dụng.
+ Bạn muốn tận dụng các công nghệ mới nổi (frame works, ngôn ngữ lập trình,...).
### Solution

### Exampl

### Resulting context

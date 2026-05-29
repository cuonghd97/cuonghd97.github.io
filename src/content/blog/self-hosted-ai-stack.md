---
title: "Building a Self-Hosted AI Stack with Ollama and Docker"
description: "A practical guide to setting up a local AI development environment using Ollama, Open WebUI, and Docker Compose for privacy-first machine learning workflows."
pubDate: 2026-05-25
tags: ["ai", "docker", "devops"]
draft: false
---

## Why Self-Host Your AI?

Running AI models locally gives you full control over your data, eliminates API costs, and allows you to experiment freely without rate limits. In this post, I'll walk you through setting up a production-ready local AI stack.

## The Stack

Our self-hosted AI environment consists of three key components:

- **Ollama** — Local model runtime for running LLMs
- **Open WebUI** — Beautiful chat interface for interacting with models
- **Docker Compose** — Orchestration for the entire stack

## Docker Compose Configuration

Here's the `docker-compose.yml` that ties everything together:

```yaml
version: '3.8'
services:
  ollama:
    image: ollama/ollama:latest
    container_name: ollama
    volumes:
      - ollama_data:/root/.ollama
    ports:
      - "11434:11434"
    restart: unless-stopped

  open-webui:
    image: ghcr.io/open-webui/open-webui:main
    container_name: open-webui
    ports:
      - "3000:8080"
    environment:
      - OLLAMA_BASE_URL=http://ollama:11434
    depends_on:
      - ollama
    restart: unless-stopped

volumes:
  ollama_data:
```

## Pulling Your First Model

Once the stack is running, pull a model with:

```bash
docker exec -it ollama ollama pull llama3.2
```

This downloads the model weights locally. You can now interact with it through Open WebUI at `http://localhost:3000`.

## Performance Tips

1. **GPU Passthrough** — If you have an NVIDIA GPU, add the `deploy` section with GPU resources
2. **Model Selection** — Start with smaller models (7B parameters) for faster inference
3. **Persistent Storage** — Always use Docker volumes to persist model data

## Conclusion

Self-hosting AI is more accessible than ever. With Docker and Ollama, you can have a fully functional AI development environment running in minutes.

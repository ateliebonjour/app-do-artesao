FROM node:20-alpine

# Set working directory
WORKDIR /app

# Install simple http server for serving static files if needed, and git for devcontainers
RUN apk update && apk add --no-cache git

# Keep the container running for development
CMD ["tail", "-f", "/dev/null"]

# Use official lightweight Nginx Alpine base image
FROM nginx:alpine

# Metadata
LABEL maintainer="DevOps Team"
LABEL description="Student Names Directory Web Application"

# Copy static assets to Nginx webroot
COPY index.html /usr/share/nginx/html/index.html
COPY style.css /usr/share/nginx/html/style.css
COPY app.js /usr/share/nginx/html/app.js

# Healthcheck to ensure container is healthy
HEALTHCHECK --interval=30s --timeout=3s \
  CMD wget --quiet --tries=1 --spider http://localhost/ || exit 1

# Expose HTTP port
EXPOSE 80

# Start Nginx server in foreground
CMD ["nginx", "-g", "daemon off;"]

FROM nginx:latest

COPY ./reverse-proxy/nginx.conf /etc/nginx/nginx.conf
COPY ./reverse-proxy/my-site.crt /etc/ssl/certs/my-site.crt
COPY ./reverse-proxy/my-site.key /etc/ssl/private/my-site.key
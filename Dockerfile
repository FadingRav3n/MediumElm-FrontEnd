FROM nginx

RUN echo 'alias ll="ls -l"'
RUN apt-get update
RUN apt-get install -y bash vim
RUN apt-get install -y iputils-ping
RUN apt-get install -y locales
RUN locale-gen en_US.UTF-8
ENV LANG en_US.UTF-8
ENV LC_ALL en_US.UTF-8
RUN apt-get install -y net-tools
COPY ./dist /home/krowfeather/ui/dist

RUN rm /etc/nginx/conf.d/default.conf
COPY ./nginx_dev.conf /etc/nginx/conf.default

EXPOSE 80

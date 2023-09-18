#FROM python:3.7.10-stretch as develop
FROM python:3.7.16-bullseye as develop


RUN apt-get update && \
    apt-get install -y \
      nginx \
      vim \
      less \
      ca-certificates


RUN pip install flask-jwt-extended[asymmetric_crypto]

COPY ./servido_api/requirements.txt /srv/servido/requirements.txt
WORKDIR /srv/servido
RUN pip3 install -r requirements.txt

# USER root
#FLASK ENV
ENV STATIC_URL /static
ENV STATIC_PATH /srv/servido/servido-api/static

ENV FLASK_APP=flaskr
ENV FLASK_ENV=development
ENV FLASK_APP=servido.py

RUN wget --no-check-certificate https://f001.backblazeb2.com/file/lkf-resources/linkaform_api-3.0.tar.gz
RUN pip3 install linkaform_api-3.0.tar.gz

EXPOSE 80 443
#CMD ["flask", “run”]

#FROM develop as production
FROM develop as build

RUN apt-get update && \
    apt-get install -y \
      nginx \
      apt-transport-https \
      ca-certificates \
      curl \
      gnupg2 \
      software-properties-common \
      build-essential \
      python-dev \
      libpython2.7 \
      libzmq5 \
      libjansson4
      #uwsgi \
      #uwsgi-plugin-python \

RUN cd /tmp/
### install uwsgi 2.18 ###
RUN wget http://ftp.us.debian.org/debian/pool/main/libm/libmatheval/libmatheval1_1.1.11+dfsg-3_amd64.deb
RUN wget http://ftp.us.debian.org/debian/pool/main/u/uwsgi/uwsgi-core_2.0.18-1_amd64.deb
RUN wget http://ftp.us.debian.org/debian/pool/main/u/uwsgi/uwsgi_2.0.18-1_amd64.deb
RUN wget http://ftp.us.debian.org/debian/pool/main/u/uwsgi/uwsgi-plugin-python_2.0.18-1_amd64.deb
RUN dpkg -i libmatheval1_1.1.11+dfsg-3_amd64.deb
RUN dpkg -i uwsgi-core_2.0.18-1_amd64.deb
RUN dpkg -i uwsgi_2.0.18-1_amd64.deb 
RUN dpkg -i uwsgi-plugin-python_2.0.18-1_amd64.deb

#wget http://ftp.us.debian.org/debian/pool/main/libm/libmatheval/libmatheval1_1.1.11+dfsg-3_amd64.deb
#wget http://ftp.us.debian.org/debian/pool/main/u/uwsgi/uwsgi-core_2.0.18-1_amd64.deb
#wget http://ftp.us.debian.org/debian/pool/main/u/uwsgi/uwsgi_2.0.18-1_amd64.deb
#wget http://ftp.us.debian.org/debian/pool/main/u/uwsgi/uwsgi-plugin-python_2.0.18-1_amd64.deb
#dpkg -i libmatheval1_1.1.11+dfsg-3_amd64.deb
#dpkg -i uwsgi-core_2.0.18-1_amd64.deb
#dpkg -i uwsgi_2.0.18-1_amd64.deb 
#dpkg -i uwsgi-plugin-python_2.0.18-1_amd64.deb
######################################################

#Flask Env
ENV FLASK_APP=flaskr
ENV FLASK_ENV=development
ENV FLASK_APP=servido.py

#Downloads and compiles version 20 of uwsgi
# ADD https://projects.unbit.it/downloads/uwsgi-2.0.20.tar.gz /tmp/
# RUN cd /tmp/
# RUN tar zxvf /tmp/uwsgi-2.0.20.tar.gz &&  cd uwsgi-2.0.20 && make && mv uwsgi  /usr/bin/uwsgi-core

RUN pip install uWSGI==2.0.20

RUN mkdir -p /var/uwsgi/app/servido/socket
RUN chown www-data:www-data -R /var/uwsgi


RUN mkdir -p /run/uwsgi/app/servido/
RUN mkdir -p /var/log/uwsgi/app/
RUN chown www-data:www-data -R /var/www
RUN chown www-data:www-data -R /var/log/uwsgi/
RUN chown www-data:www-data -R /run/uwsgi/

#aqui se pudira poner un stage para que solo copie los compilados



WORKDIR /srv/servido/app/


FROM build as production

RUN apt-get update && \
    apt-get remove -y --purge \
    build-essential \
    python-dev \
    vim \
    less

# RUN rm /tmp/uwsgi-2.0.20.tar.gz


RUN mkdir -p /srv/servido/servido/

#UWSGI SETUP
COPY --chown=www-data:www-data ./docker/uwsgi/servido.ini /etc/uwsgi/apps-enabled/

#NGINX SETUP
RUN echo testssssssssssss
RUN rm -rf /etc/nginx/certs/
RUN rm -rf /etc/nginx/sites-enabled/
RUN echo testsssssssssssssss
COPY --chown=www-data:www-data ./nginx /etc/nginx
COPY --chown=www-data:www-data ./nginx/sites-available/servido.conf /etc/nginx/sites-enabled/servido.conf

#COPY ALL FILES
RUN echo cacheeeee
#RUN rm /srv/servido/servido_api/certs/*
COPY --chown=www-data:www-data ./docker /docker/
COPY --chown=www-data:www-data ./apps /srv/servido/apps
COPY --chown=www-data:www-data ./docker/build/custom /srv/servido/apps/custom
COPY --chown=www-data:www-data ./servido_api /srv/servido/servido_api
COPY --chown=www-data:www-data ./servido.py /srv/servido/servido.py

WORKDIR /srv/servido/

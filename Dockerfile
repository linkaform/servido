FROM python:3.7.10-stretch as develop


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
      uwsgi \
      uwsgi-plugin-python \
      apt-transport-https \
      ca-certificates \
      curl \
      gnupg2 \
      software-properties-common \
      build-essential \
      python-dev

#Flask Env
ENV FLASK_APP=flaskr
ENV FLASK_ENV=development
ENV FLASK_APP=servido.py

#Downloads and compiles version 20 of uwsgi
ADD https://projects.unbit.it/downloads/uwsgi-2.0.20.tar.gz /tmp/
RUN cd /tmp/
RUN tar zxvf /tmp/uwsgi-2.0.20.tar.gz &&  cd uwsgi-2.0.20 && make && mv uwsgi  /usr/bin/uwsgi-core

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

RUN rm /tmp/uwsgi-2.0.20.tar.gz


RUN mkdir -p /srv/servido/servido/

#UWSGI SETUP
COPY --chown=www-data:www-data ./docker/uwsgi/servido.ini /etc/uwsgi/apps-enabled/

#NGINX SETUP
COPY --chown=www-data:www-data ./nginx /etc/nginx


#ENTRYPOINT

COPY --chown=www-data:www-data ./docker /docker/

COPY --chown=www-data:www-data ./apps /srv/servido/apps
COPY --chown=www-data:www-data ./servido_api /srv/servido/servido_api
COPY --chown=www-data:www-data ./servido.py /srv/servido/servido.py

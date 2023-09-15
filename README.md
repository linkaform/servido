# Linkaform/Airflow_srv:Develeop



### Requerimientos

Docker y docker compose


### Docker-compose install


1. To download and install the Compose CLI plugin, run:
```
DOCKER_CONFIG=${DOCKER_CONFIG:-$HOME/.docker}
mkdir -p $DOCKER_CONFIG/cli-plugins
curl -SL https://github.com/docker/compose/releases/download/v2.20.3/docker-compose-linux-x86_64 -o $DOCKER_CONFIG/cli-plugins/docker-compose
```


2. Apply executable permissions to the binary:
```
 chmod +x $DOCKER_CONFIG/cli-plugins/docker-compose
```

3.  Test the installation.
```
 sudo chmod +x /usr/local/lib/docker/cli-plugins/docker-compose
```

Open Source project formed by a collection of templates that helps you building Microsites or your own Business Intelligence

### Run the project on localhost

```
cd docker
docker-compose up -d
```

Once the project is running you can access:
- API at port 5000 `http://127.0.0.1:5000`.
- WebPages at port 8011 on https


### Running the project for localhost debugging purposes

```
cd docker
docker-compose up
```

### Running the project on background

```
cd docker
docker-compose up -d
```


### Build Image for production

```
cd docker
docker-compose -f docker-prod.yml build --no-cache servido
docker-compose -f docker-prod.yml  build servido
```

### Uploading Image

```
docker push linkaform/servido:develop
```

### Testing the imagen

```
docker run  -i -t linkaform/servido:develop bash
```



### Production builds

```
cd docker
docker-compose -f docker-prod.yml build servido
```

```
docker push linkaform/servido:latest
```


Actualizar el certificado

Copiar el certificdo a nginx/certs/domain.com.chained.crt

# Linkaform/Airflow_srv:Develeop

Open Source project formed by a collection of templates that helps you building Microsites or your own Business Intelligence

### Run the project on localhost

```
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

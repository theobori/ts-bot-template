# ts-bot-template

## How to build and run ?

1. Install the dependencies 
- Mongo (only if you want a local instance)
- NodeJS

```bash
npm i
```

1. Create the environments files:
    - `env` using `.env_example`

2. Run the project with the instructions below.

### Production

```bash
npm run build
npm run start
```

### Development

```bash
npm run dev
```

## Docker

**Launch containers**

You need some environment variables that are in `config/mongo.env`:

- `MONGO_INITDB_ROOT_USERNAME`
- `MONGO_INITDB_ROOT_PASSWORD`

```bash
MONGO_INITDB_ROOT_USERNAME=user \
MONGO_INITDB_ROOT_PASSWORD=test \
docker-compose up
```


**Reset environment variables for MongoDB**

```bash
docker-compose rm -fv bot_mongo
```

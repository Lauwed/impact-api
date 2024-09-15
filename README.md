# impact

## Roadmap

- [ ] Fix `media_object` upload - `api` -> https://github.com/Lauwed/impact-api/issues/5
- [ ] Fix `person_picture` upload - `api`
- [ ] Sorting data - `api` -> https://github.com/Lauwed/impact-api/issues/6
- [ ] Add edit modal for the main picture on person page - `pwa`
- [ ] Add gallery section with images upload on person page - `pwa`
- [x] Add `Achievement` entity - `api`
- [ ] Create achievements section on person page - `pwa`

## Install

### Docker

#### Build the containers
```
docker compose build --no-cache
```

#### Start the containers
```
docker compose up --wait
```

#### Access the DB

You have a default user named `app` with a PostgreSQL database by default named `app`

From the container
```
psql -U app
```
From outside the container
```
docker exec -it impact-api-database-1 psql -U app
```
Enter the database `app`
```
\c app
```

#### Generate JWT keys

```
docker compose exec php sh -c '
    set -e
    apt-get install openssl
    php bin/console lexik:jwt:generate-keypair
    setfacl -R -m u:www-data:rX -m u:"$(whoami)":rwX config/jwt
    setfacl -dR -m u:www-data:rX -m u:"$(whoami)":rwX config/jwt
'
```

#### Generate admin user
Generated by default when you start the containers.

**username:** admin

**email:** admin@localhost

**password:** admin

Don't hesitate to change the logins.

#### Debug logs
```
docker logs impact-api-php-1
```

### Manual

#### Generate JWT keys

```
php sh -c '
    set -e
    apt-get install openssl
    php bin/console lexik:jwt:generate-keypair
    setfacl -R -m u:www-data:rX -m u:"$(whoami)":rwX config/jwt
    setfacl -dR -m u:www-data:rX -m u:"$(whoami)":rwX config/jwt
'
```

#### Generate admin user

```
php bin/console doctrine:fixtures:load --append
```

username: admin
password: admin

Don't hesitate to change the logins.
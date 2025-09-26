# Gazin Test rodar projeto

## Requisitos
- git
- docker
- docker compose

## Rodar o projeto

```
git clone https://github.com/KaioJAS/cadastro-desenvolvedores.git
cd cadastro-desenvolvedores
docker compose up -d
```

## Backend (Laravel)
```
docker exec -it cadastro_backend bash
composer install
php artisan migrate
php artisan db:seed
```

## Frontend (Next.js)
```
docker exec -it cadastro_frontend bash
npm install
```

## Acessar

Frontend: http://localhost:3000
Backend: http://localhost:8000

Login: admingazin@teste.com
Senha: gazinteste1966

## Obs

postgres roda na porta 5432
se der erro no banco, restart os containers
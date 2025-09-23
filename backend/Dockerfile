FROM php:8.3-fpm-alpine
RUN apk add --no-cache git curl libpng-dev zip unzip postgresql-dev oniguruma-dev libzip-dev
RUN docker-php-ext-install pdo pdo_pgsql mbstring zip bcmath
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer
WORKDIR /var/www/html

COPY composer.* ./
RUN composer install --no-dev --optimize-autoloader
COPY . .

RUN chown -R www-data:www-data /var/www/html && chmod -R 755 storage bootstrap/cache
EXPOSE 8000
CMD ["php", "artisan", "serve", "--host=0.0.0.0", "--port=8000"]

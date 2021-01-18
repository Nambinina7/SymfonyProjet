FROM php:7.4-fpm-alpine

COPY wait-for-it.sh /usr/bin/wait-for-it

RUN chmod +x /usr/bin/wait-for-it

RUN apk --update add \
    git \
    yarn \
    npm \
    nodejs \
    libxml2-dev \
    sqlite-dev \
    curl-dev \
    libpng-dev \
    libjpeg-turbo-dev \
    freetype-dev && \
    rm -rf /tmp/* && \
    rm -rf /var/cache/apk/*
    
RUN docker-php-ext-install pdo_mysql soap

#https://github.com/mlocati/docker-php-extension-installer
ADD https://raw.githubusercontent.com/mlocati/docker-php-extension-installer/master/install-php-extensions /usr/local/bin/
RUN chmod uga+x /usr/local/bin/install-php-extensions && sync
RUN install-php-extensions imagick gd intl 

COPY --from=composer /usr/bin/composer /usr/bin/composer

WORKDIR /var/www

CMD composer install ; wait-for-it database:3306 -- bin/console doctrine:migrations:migrate ;  php-fpm 

EXPOSE 9000

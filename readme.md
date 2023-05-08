## Установка и настройка проекта

### Docker compose
* не забудьте сменить все доступы (логин и пароль) к 
сервисам: db, pgadmin, pgbackups

### Установка фреймворка laravel

* В файле ./docker-install.yml запускаем сервис **compose** или 
в командной строке (запускаем из корневной папке): 
``docker compose -f docker-install.yml up composer``.
Ожидаем завершение установки laravel

* В файле ./app/site/.env добавить и отредактировать ключи:
```dotenv
# Общие настройки
# Имя сайта
APP_NAME=Laravel
# Указываем версию сайта, включаем продакш версию
APP_ENV=production
# Отключаем вывод ошибок
APP_DEBUG=false
# Адрес сайта
APP_URL=http://localhost:8000
# Адрес фронтенда
ASSET_URL=http://localhost:8000

# Настройки БД
DB_CONNECTION=pgsql
DB_HOST=db
DB_PORT=5432
# Указать имя БД
DB_DATABASE=postgres
# Указать пользователя
DB_USERNAME=postgres
# Указать пароль
DB_PASSWORD=dfhsfs3434235

# Настройки Redis
CACHE_DRIVER=redis
REDIS_HOST=redis
REDIS_PASSWORD=null
REDIS_PORT=6379
REDIS_CLIENT=predis
```

* Удаляем папку: ./app/site/resources

* Копируем все папки и файлы из ./files/ вставляя с заменной в папку ./app/site/

* в файле ./app/site/composer.json заменяем и добавляем:
```text
    "require": {
        "php": "^8.2",
        "inertiajs/inertia-laravel": "^0.6.9",
        "predis/predis": "^2.1"
    },
```

* В файле ./docker-compose.yml запускаем сервис **compose** или
в командной строке (запускаем из корневной папке):
``docker compose up composer``. 
Ожидаем завершение установки пакетов

* После обновлений останавливаем и освобождаем все сервисы.
  В командной строке (запускаем из корневной папке):
``docker compose down``

* Миграция и сиды:
1. **Запуск миграций** - в файле ./app/site/.env
указать значение ``APP_ENV=local``. Для отключения миграций укажите
значение ``APP_ENV=production``
2. **Генерация сидов (seeds)** - в файле
./docker-compose.yml сервис **migrate** комманда **command:**
разкоменентируем строчку ``php artisan db:seed``.
Заметка: при каждом запуске будет запускаться генерация seeds,
закомментируйте код после первого запуска во избежание повторных запусков генерации
* **Настройка laravel завершена**

### Запуск проекта
* В файле ./docker-compose.yml запускаем **services** или
  в командной строке (запускаем из корневной папке):
  ``docker compose up``.

### Остановка проекта
* В файле ./docker-compose.yml останавливаем **services** или
  в командной строке (запускаем из корневной папке):
  ``docker compose stop``.

### Завершение проекта
* В файле ./docker-compose.yml останавливаем **services** или
  в командной строке (запускаем из корневной папке):
  ``docker compose down``.

## Настройка проекта для разрботки
* В файле ./app/site/.env замениваем значение в ключах:
```dotenv
APP_ENV=local
APP_DEBUG=true
ASSET_URL=http://localhost:3000
```
* В файле ./docker-compose.yml сервисе **npm** меняем в строчках значения:
```yaml
  entrypoint: ["npm", "run", "dev", "--"]
  environment:
    APP_ENV: local
```

* Удалить файл если он существует ./app/site/public/hot

* Запускаем проект разработки:
1. Проект не запущен - в файле ./docker-compose.yml запускаем **services** или
   в командной строке (запускаем из корневной папке):
   ``docker compose up``.
2. Проект запущен - в файле ./docker-compose.yml запускаем сервис **npm** или
  в командной строке (запускаем из корневной папке):
  ``docker compose run npm``.
3. Не применились изменения - нужно остановить и освободить сервис **npm** или
   в командной строке (запускаем из корневной папке):
   ``docker compose down npm``. После заново запустить сервис **npm** или
   в командной строке (запускаем из корневной папке):
   ``docker compose run npm``. 

#### Заметки:
* Сервисы:
1. nginx - сервер nginx
2. redis - кэширование
3. db - базы данных postgres
4. php - интерпитатор php
5. redis-admin - панель управления по кэшированию redis
6. pgadmin - панель управления по работе с базой данных postgres
7. pgbackups - создание бэкапов баз данных postgres
8. queue - очереди для ларавел
9. cron - крон для ларавел
10. artisan - artisan для ларавел
11. migrate - миграция и сиды для ларавел
12. npm - node клиент
13. composer - установщик пакетов composer
14. npm-files - добавляение npm пакетов в папку проекта
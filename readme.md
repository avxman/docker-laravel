## Установка и настройка проекта

### Docker compose
* не забудьте сменить все доступы (логин и пароль) к 
сервисам: db, pgadmin, pgbackups

### Установка фреймворка laravel

* В файле ./docker-compose.yml запускаем сервис **compose** или 
в командной строке (запускаем из корневной папке): 
``docker compose run composer``. Ожидаем завершение установки laravel
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
* В файле ./app/site/vite.config.js весь код заменяем на
(настроено под react и typescript):
```js
import { defineConfig } from 'vite'
import laravel from 'laravel-vite-plugin'
import react from '@vitejs/plugin-react'

const server = ()=>{
    const env = process.env.APP_ENV??'production'
    const port = env === "local" ? 3000 : 8000
    const origin = env === "local" ? 'http://localhost:3000' : 'http://localhost:8000'
    const host = env === "local" ? 'localhost' : 'localhost'
    const watch = env === "local" ? {usePolling: true} : {}
    return {
        host : true,
        hmr: { host },
        port,
        origin,
        watch
    }
}

export default defineConfig({
    plugins: [
        laravel({
            input: ['resources/js/app.ts', 'resources/styles/scss/app.scss'],
            refresh: [{
                paths: ['resources/js/**', 'resources/styles/scss/**'],
                config: { delay: 50 }
            }],
        }),
        react(),
    ],
    resolve: {
        alias: {
            '@': '/resources/js',
        },
    },
    server: server(),
});


```
* в файле ./app/site/package.json весь код замениваем на:
```json
{
    "private": true,
    "scripts": {
        "dev": "vite",
        "build": "vite build"
    },
    "devDependencies": {
        "@types/node": "^18.14.1",
        "axios": "^1.1.2",
        "laravel-vite-plugin": "^0.7.2",
        "sass": "^1.58.3",
        "vite": "^4.0.0"
    },
    "dependencies": {
        "@inertiajs/inertia": "^0.11.1",
        "@inertiajs/react": "^1.0.2",
        "@types/lodash": "^4.14.191",
        "@vitejs/plugin-react": "^3.1.0",
        "i18next": "^22.4.10",
        "i18next-browser-languagedetector": "^7.0.1",
        "i18next-http-backend": "^2.1.1",
        "i18next-resources-to-backend": "^1.1.1",
        "nprogress": "^0.2.0",
        "react-bootstrap": "^2.7.2",
        "react-dom": "^18.2.0",
        "react-i18next": "^12.1.5"
    },
    "browserslist": {
        "production": [
            ">0.2%",
            "not dead",
            "not op_mini all"
        ],
        "development": [
            "last 1 chrome version",
            "last 1 firefox version",
            "last 1 safari version"
        ]
    },
    "browser": {
        "[module-name]": false
    }
}

```
* В папке ./app/site создаем файл tsconfig.json и добавляем код:
```json
{
    "compilerOptions": {
        "target": "es5",
        "allowJs": true,
        "skipLibCheck": true,
        "strict": true,
        "forceConsistentCasingInFileNames": true,
        "noEmit": true,
        "esModuleInterop": true,
        "moduleResolution": "node",
        "resolveJsonModule": true,
        "isolatedModules": true,
        "jsx": "preserve",
        "incremental": true,
        "baseUrl": ".",
        "paths": {
            "@/*": ["./resource/js/*"]
        }
    },
    "include": ["**/*.ts", "**/*.tsx"],
    "exclude": ["node_modules"]
}

```
* в файле ./app/site/composer.json заменяем строчки кода:
```text
    "require": {
        "php": "^8.2",
        "guzzlehttp/guzzle": "^7.2",
        "laravel/framework": "^10.8",
        "laravel/sanctum": "^3.2",
        "laravel/tinker": "^2.8",
        "inertiajs/inertia-laravel": "^0.6.9",
        "predis/predis": "^2.1"
    },
```
* файл ./docker-compose.yml в сервисе ``composer`` 
замениваем строчку кода `entrypoint` на:
```yaml
entrypoint: ["/bin/sh","-c"],
command:
  - cd site && composer update --ignore-platform-reqs
```
* В файле ./docker-compose.yml запускаем сервис **compose** или
в командной строке (запускаем из корневной папке):
``docker compose run composer``. Ожидаем завершение установки пакетов
* Миграция и сиды. Чтобы запусить генерацию сидов (seeds) - в файле
./docker-compose.yml сервис **migrate** комманда **command:**
разкоменентируем строчку ``php artisan db:seed``.
Заметка: при каждом запуске будет запускаться генерация seeds,
закомментируйте код в случаи повторных запусков генерации
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
  entrypoint: ["npm", "run", "dev", "--"],
  environment:
    APP_ENV: local
```
* Запускаем проект разработки:
1. Проект не запущен - в файле ./docker-compose.yml запускаем **services** или
   в командной строке (запускаем из корневной папке):
   ``docker compose up``.
2. Проект запущен - в файле ./docker-compose.yml запускаем сервис **npm** или
  в командной строке (запускаем из корневной папке):
  ``docker compose run npm``.
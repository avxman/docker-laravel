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

* Удаляем всё из папок: ./app/site/resources/js, ./app/site/resources/views

* Удаляем папку ./app/site/resources/css

* Создаем папки ./app/site/public/build, ./app/site/resources/js/Pages,
  ./app/site/resources/js/Layouts, ./app/site/resources/styles,
./app/site/resources/styles/scss, ./app/site/node_modules

* Создаем файл ./app/site/resources/styles/scss/app.scss и добавляем код:
```scss
/** Root style */
```

* Создаем файл ./app/site/resources/js/_app.tsx и добавляем код:
```tsx
// @ts-ignore
import { createRoot } from "react-dom/client"

//
export function Setup ({el, App, props}:{el:any, App:any, props:any}) {
    return createRoot(el).render(<App {...props} />)
}

//
export function Resolve(name:any) {
    // @ts-ignore
    const pages = import.meta.glob(['./Pages/**/*.tsx'], {eager: true})
    return pages[`./Pages/${name}.tsx`]
}

//
export function Title(title:any){
    return title.length?title:`Home`
}

```

* Создаем файл ./app/site/resources/js/i18n.ts и добавляем код:
```ts
import i18n from "i18next"
import {HttpBackendOptions} from "i18next-http-backend"
import LanguageDetector from "i18next-browser-languagedetector"
import { initReactI18next } from "react-i18next"

const resources = {
    en: {
        frontend: {
            
        },
        admin: {
            
        },
    },
    uk: {
        frontend: {
            
        },
        admin: {
            
        },
    }
}

i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init<HttpBackendOptions>({
        resources,
        fallbackLng: "en",
        debug: true,
        lng: "en",
        ns: [
            'frontend',
            'admin',
        ],
        interpolation: {
            escapeValue: false // not needed for react as it escapes by default
        }
    })
    .then(r => (r))
    .catch(e=>(e))

export default i18n

```

* Создаем файл ./app/site/resources/js/app.ts и добавляем код:
```ts
import {createInertiaApp} from "@inertiajs/react"
import Axios from "axios"
import {Setup, Resolve, Title} from "./_app"
import "./i18n"

//
// @ts-ignore
globalThis.Axios = Axios
// @ts-ignore
globalThis.Axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'

//
createInertiaApp({
    title: Title,
    resolve: Resolve,
    setup: Setup,
    progress: {
        // minimum: 0.1,
        // template:'',
        // parent: '#container',
        delay: 250,
        color: '#29d',
        includeCSS: true,
        showSpinner: true,
    },
}).then(r => (r)).catch(e=>(e))

```

* Создаем файл ./app/site/resources/js/Layouts/FrontendLayout.tsx и добавляем код:
```tsx
import {ThemeProvider} from "react-bootstrap"

export default function FrontendLayout({ children }:{children:any}) {
    return (
        <ThemeProvider breakpoints={['fhd', 'hd', 'xxl', 'xl', 'lg', 'md', 'sm', 'sx', 'xs']} minBreakpoint="sx">
            <>
                <header>
                    Header
                </header>
                <main>
                    Main
                    {children}
                </main>
                <footer>
                    Footer
                </footer>
            </>
        </ThemeProvider>
    )
}

```

* Создаем файл ./app/site/resources/js/Pages/Page.tsx и добавляем код:
```tsx
import {Head, Link} from "@inertiajs/react"
import FrontendLayout from "../../Layouts/FrontendLayout"
import {useTranslation} from "react-i18next"

const Index = ({ data, links } : {data:any, links:any})=>{
    const { t } = useTranslation('frontend')
    return (
        <>
            <Head title="Welcome" />
            <h1>Welcome</h1>
            <p>Hello, welcome to your first Inertia!</p>
        </>
    )
}

Index.layout = (page:any) => <FrontendLayout children={page} />

export default Index

```

* Создаем файл ./app/site/resources/views/app.blade.php и добавляем код:
```html
<!DOCTYPE html>
<html lang="{{Config()->get('app.locale')}}">
    <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
        @viteReactRefresh
        @vite(['resources/styles/scss/app.scss', 'resources/js/app.ts'])
        @inertiaHead
    </head>
    <body>
        @inertia
    </body>
</html>
```

* Удаляем весь код и добавляем код в файле ./app/site/routes/web.php:
```php
\Illuminate\Support\Facades\Route::get('/', function () {
    return \Inertia\Inertia::render('Page', [
            'data' => [
                'id'=>1,
                'status'=>true,
                'message'=>'GOOD!'
            ]
    ]);
});
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
entrypoint: ["/bin/sh","-c"]
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

* Удалить файл если он существует ./app/site/public/hot

* Запускаем проект разработки:
1. Проект не запущен - в файле ./docker-compose.yml запускаем **services** или
   в командной строке (запускаем из корневной папке):
   ``docker compose up``.
2. Проект запущен - в файле ./docker-compose.yml запускаем сервис **npm** или
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
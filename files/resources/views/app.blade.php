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

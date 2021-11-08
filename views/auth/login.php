<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Inicio</title>
    <link rel="stylesheet" href="/assets/scss/main.css">
</head>

<body class="container has-top-margin">

    <main id="swup" class="transition-fade">
        <form action="" class="register">
            <h1>Inicia sesion</h1>
            <div class="field">
                <label class="label">Nombres</label>
                <input type="text" class="input">
            </div>
            <div class="field">
                <label class="label">Contraseña</label>
                <input type="password" class="input">
            </div>
            <div class="field mg-top:lg">
                <button class="button is-primary is-fullwidth" type="submit">
                    <i data-icon='&#xe174'></i> Registrase ahora
                </button>
            </div>
            <hr>
            <p class="text:center">
                ¿No tienes una cuenta? <a href="/signup">Registrate aqui</a>
            </p>
        </form>
    </main>

    <script src="https://unpkg.com/swup@2.0.14/dist/swup.min.js"></script>
    <script src="./assets/js/app.js"></script>
</body>

</html>
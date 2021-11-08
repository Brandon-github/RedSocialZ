<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Inicio</title>
    <link rel="stylesheet" href="./assets/scss/main.css">
</head>

<body class="container has-top-margin">

    <main id="swup" class="transition-fade">
        <form action="" class="register">
            <h1>Registrate</h1>
            <div class="grid:2 gap">
                <div>
                    <label class="label">Nombres</label>
                    <input type="text" class="input">
                </div>
                <div>
                    <label class="label">Apellidos</label>
                    <input type="text" class="input">
                </div>
                <div>
                    <label class="label">Username</label>
                    <input type="text" class="input">
                </div>
                <div>
                    <label class="label">Correo electronico</label>
                    <input type="email" class="input is-text">
                </div>
                <div>
                    <label class="label">Contraseña</label>
                    <input type="password" class="input">
                </div>
                <div>
                    <label class="label">Repita contraseña</label>
                    <input type="password" class="input">
                </div>
            </div>
            <div class="field mg-top:lg">
                <button class="button is-primary is-fullwidth" type="submit">
                    <i data-icon='&#xe174'></i> Registrase ahora
                </button>
            </div>
            <hr>
            <p class="text:center">
                ¿Ya tienes una cuenta? <a href="/">Inicia sesion aqui</a>
            </p>
        </form>
    </main>

    <script src="https://unpkg.com/swup@2.0.14/dist/swup.min.js"></script>
    <script src="./assets/js/app.js"></script>
</body>

</html>
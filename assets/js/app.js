import 'https://unpkg.com/swup@2.0.14/dist/swup.min.js';
import 'https://unpkg.com/@swup/progress-plugin@1.0.1/dist/SwupProgressPlugin.min.js';
import 'https://unpkg.com/micromodal/dist/micromodal.min.js';
import 'https://unpkg.com/@popperjs/core@2/dist/umd/popper.min.js';
import 'https://unpkg.com/tippy.js@6/dist/tippy-bundle.umd.js';
import 'https://unpkg.com/@swup/forms-plugin@1.1.1/dist/SwupFormsPlugin.min.js';
import LazyImages from './utils/LazyImages.js';
import Navbar from './utils/navbar.js';
import { router } from './routes.js';
import Api from './utils/Api.js';
import global from './utils/global.js';

// swup init
const swup = new Swup({
    cache: false,
    plugins: [
        new SwupProgressPlugin({
            className: 'swup-progress-bar',
            transition: 500,
            delay: 0
        }),
        new SwupFormsPlugin()
    ]
});

const lazyImages = new LazyImages();
lazyImages.start(); // lazy load de imagenes
Navbar.checkActiveLinks();
router.run();

global('api', new Api);

MicroModal.init(); // modal init

swup.on('contentReplaced', () => {
    // en cuanto el sitio tenga cambios carga las imagenes
    lazyImages.start();
    Navbar.checkActiveLinks();
    router.run();
});
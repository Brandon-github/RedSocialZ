import 'https://unpkg.com/micromodal/dist/micromodal.min.js';
import 'https://unpkg.com/@popperjs/core@2/dist/umd/popper.min.js';
import 'https://unpkg.com/tippy.js@6/dist/tippy-bundle.umd.js';
import LazyImages from './utils/LazyImages.js';
import Navbar from './utils/Navbar.js';
import { router } from './routes.js';
import Api from './utils/Api.js';
import global from './utils/global.js';
import { unlock } from './utils/helpers.js';
import { swup } from './swup.js';

const lazyImages = new LazyImages();
lazyImages.start(); // lazy load de imagenes
Navbar.checkActiveLinks();
router.run();

global('api', new Api);
global('unlock', unlock);

MicroModal.init(); // modal init

swup.on('contentReplaced', () => {
    // en cuanto el sitio tenga cambios carga las imagenes
    lazyImages.start();
    Navbar.checkActiveLinks();
    router.run();
});
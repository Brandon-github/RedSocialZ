import 'https://unpkg.com/swup@2.0.14/dist/swup.min.js';
import 'https://unpkg.com/micromodal/dist/micromodal.min.js';
import 'https://unpkg.com/@popperjs/core@2/dist/umd/popper.min.js';
import 'https://unpkg.com/tippy.js@6/dist/tippy-bundle.umd.js';
import LazyImages from './utils/lazyImages.js';


// lazy load de imagenes
const lazyImages = new LazyImages();
lazyImages.start();

// swup init
const swup = new Swup();
swup.on('contentReplaced', () => {
    // en cuanto el sitio tenga cambios carga las imagenes
    lazyImages.start();
});

// modal init
MicroModal.init();

// tipy init
tippy('#share', {
    content: document.getElementById('template').innerHTML,
    interactive: true,
    placement: 'bottom',
    trigger: 'click',
    allowHTML: true,
    theme: 'socialcube'
});
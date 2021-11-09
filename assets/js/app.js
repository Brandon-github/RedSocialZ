import 'https://unpkg.com/swup@2.0.14/dist/swup.min.js';
import { test } from './test.js';
import LazyImages from './utils/lazyImages.js';

// swup init
const swup = new Swup();

// lazy load de imagenes
const lazyImages = new LazyImages();
lazyImages.start();

// prueba
console.log(test);
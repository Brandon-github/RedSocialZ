import 'https://unpkg.com/autosize@5.0.1/dist/autosize.min.js';
import Router from './utils/Router.js';
const router = new Router();

router.onPage('/new', () => {
    autosize(document.querySelectorAll('textarea'));
})

export { router };
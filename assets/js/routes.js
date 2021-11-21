import 'https://unpkg.com/autosize@5.0.1/dist/autosize.min.js';
import Router from './utils/Router.js';
import Scrolly from './utils/scroll.js';
import sharePost from './lib/sharePost.js';

const router = new Router();
const scrolly = new Scrolly();
scrolly.start();

router.onPage('/', () => {
    scrolly.reset();
    sharePost();
})

router.onPage('/@(.*)', () => {
    scrolly.reset();
    sharePost();
})

router.onPage('/p/(.*)', () => {
    sharePost();
})

router.onPage('/new', () => {
    autosize(document.querySelectorAll('textarea'));
})
router.onPage('/user/update', () => {
    autosize(document.querySelectorAll('textarea'));
})

export { router };
import 'https://unpkg.com/autosize@5.0.1/dist/autosize.min.js';
import Router from './utils/Router.js';
const router = new Router();

router.onPage('/', () => {
    // tipy init
    tippy('#share', {
        content:
`<div class="post-share">
    <a href="/" target='_blank'>
        <i class="brand-facebook"></i>&nbsp;
        Facebook
    </a>
    <a href="/" target='_blank'>
        <i class="brand-twitter"></i>&nbsp;
        Twitter
    </a>
    <a href="/" target='_blank'>
        <i class="brand-whatsapp"></i>&nbsp;
        WhatsApp
    </a>
</div>`,
        interactive: true,
        placement: 'bottom',
        trigger: 'click',
        allowHTML: true,
        theme: 'socialcube'
    });
})

router.onPage('/new', () => {
    autosize(document.querySelectorAll('textarea'));
})
router.onPage('/user/update', () => {
    autosize(document.querySelectorAll('textarea'));
})

export { router };
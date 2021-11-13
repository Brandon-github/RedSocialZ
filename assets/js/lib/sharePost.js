import global from './../utils/global.js'; 

const sharePost = () => {
    const copyUrl = (url) => {
        navigator.clipboard.writeText(url).then(function () {
            alert('Enlace copiado')
        }, function (err) {
            alert('error al copiar')
        });
    }

    global('copyPostUrl', copyUrl);

    // tipy init
    tippy('.share-post', {
        content: (reference) => {
            const url = encodeURIComponent(reference.dataset.url);

            const links = {
                facebook: `https://facebook.com/sharer/sharer.php?u=${url}`,
                twitter: `https://twitter.com/intent/tweet?text=${url}`,
                whatsapp: `https://api.whatsapp.com/send?text=${url}`
            }
            return `<div class="post-share">
        <a href="${links.facebook}" target='_blank'>
            <i class="brand-facebook"></i>&nbsp;
            Facebook
        </a>
        <a href="${links.twitter}" target='_blank'>
            <i class="brand-twitter"></i>&nbsp;
            Twitter
        </a>
        <a href="${links.whatsapp}" target='_blank'>
            <i class="brand-whatsapp"></i>&nbsp;
            WhatsApp
        </a>
        <button onclick='copyPostUrl("${reference.dataset.url}")'>
            <i data-icon='content_copy'></i>&nbsp;
            Copiar
        </button>
    </div>`
        },
        interactive: true,
        placement: 'bottom',
        trigger: 'click',
        allowHTML: true,
        theme: 'socialcube'
    });
}

export default sharePost;
import sharePost from '../lib/sharePost.js';
import LazyImages from './LazyImages.js';
import Router from './Router.js';

class Scrolly {
    load = false;
    loadall = false;
    offset = 5;
    scrollPosition() {
        // tamaño total del scroll
        const scrollHeight = document.body.scrollHeight;
        // tamaño scrollbar
        const scrollbarHeight = window.innerHeight;
        // posicion
        const viewposition = window.scrollY + scrollbarHeight - 5;

        // porcentaje en el que se encuentra
        return (100 * viewposition) / scrollHeight;
    }
    
    reset() {
        this.load = false;
        this.loadall = false;
        this.offset = 5;
    }

    finish() {
        document.getElementById('loading-svg').style.display = 'none';
    }

    start() {
        window.addEventListener("scroll", (event) => {
            const userPosts = /^\/@/.test(Router.getPath());
            const checkPath = Router.getPath() === '/' || userPosts ? true : false;

            if (this.scrollPosition() > 70 && !this.load && !this.loadall && checkPath) {
                this.load = true;

                const container = document.getElementById('posts-container');

                const url = `${baseUrl}api/content?limit=5&offset=${this.offset}${userPosts ? '&user=' + Router.getPath().match(/\w+/g)[0] : ''}`;

                fetch(url).then(r => r.json()).then(response => {

                    this.offset += 5;

                    container.insertAdjacentHTML('beforeend', response.content);

                    if (!response.next) {
                        this.loadall = true;
                        this.finish();
                    }

                    const lazyImages = new LazyImages();
                    lazyImages.start(); // lazy load de imagenes
                    sharePost();

                    this.load = false;
                });
            }
        });
    }

}

export default Scrolly;
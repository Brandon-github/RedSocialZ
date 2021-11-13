import sharePost from '../lib/sharePost.js';
import LazyImages from './LazyImages.js';

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

    finish() {
        document.getElementById('loading-svg').style.display = 'none';
    }

    start() {
        window.addEventListener("scroll", (event) => {
            if (this.scrollPosition() > 70 && !this.load && !this.loadall) {
                this.load = true;

                const container = document.getElementById('posts-container');

                fetch(`${baseUrl}api/content?limit=5&offset=${this.offset}`).then(r => r.json()).then(response => {

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
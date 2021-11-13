import store from "./Store.js";
import { swup } from "../swup.js";
import confetti from 'https://cdn.skypack.dev/canvas-confetti';

class Api {
    like(event, id) {
        // selecciona los contenedores
        const likesContainer = event.target.querySelector('span');
        const iconContainer = event.target.querySelector('i');

        const liked = iconContainer.dataset.icon === 'favorite' ? true : false;
        const likes = parseInt(likesContainer.textContent);

        if (liked) {
            event.target.classList.remove('text:secondary');
            iconContainer.dataset.icon = 'favorite_border';
            likesContainer.textContent = likes - 1;
        } else {
            event.target.classList.add('text:secondary');
            iconContainer.dataset.icon = 'favorite';
            likesContainer.textContent = likes + 1;
        }

        // fetch like api
        fetch(`${baseUrl}api/like?id=${id}`);
    }
    async unlock() {
        const id = store.get('unlock').id;
        const key = document.getElementById('unlock-key').value;

        const response = await fetch(`${baseUrl}api/unlock`, {
            method: 'POST',
            body: JSON.stringify({ id, key }),
            headers: { 'Content-Type': 'application/json' }
        }).then(r => r.json());

        if (response.unlocked) {
            confetti();
            swup.loadPage({url: `${baseUrl}p/${response.url}`})
        } else {
            alert('La contraseña es incorrecta, intentelo de nuevo');
        }
    }
}

export default Api;
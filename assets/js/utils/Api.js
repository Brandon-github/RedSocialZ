class Api {
    like(event, id) {
        // selecciona los contenedores
        const likesContainer = event.target.querySelector('span');
        const iconContainer = event.target.querySelector('i');

        const liked = iconContainer.dataset.icon === 'favorite' ? true : false;
        const likes = parseInt(likesContainer.textContent);

        if(liked) {
            event.target.classList.remove('text:secondary');
            iconContainer.dataset.icon = 'favorite_border';
            likesContainer.textContent = likes - 1;
        } else {
            event.target.classList.add('text:secondary');
            iconContainer.dataset.icon = 'favorite';
            likesContainer.textContent = likes + 1;
        }

        // fetch like api
        fetch(`${baseUrl}/api/like?id=${id}`);
    }
}

export default Api;
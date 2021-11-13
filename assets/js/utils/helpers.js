import store from "./Store.js";

const unlock = (description, id) => {
    store.set('unlock', {id});
    document.getElementById('unlock-description').textContent = description;
    MicroModal.show('unlock');
}

export { unlock };
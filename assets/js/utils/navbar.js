class Navbar {
    static checkActiveLinks() {
        const links = document.querySelectorAll('.navbar-links .nav-item');
        for (const link of links) {
            // obtiene datos del path del enlace
            const path = link.dataset.nav;

            link.classList.remove('is-active');

            // si el path del enlace es igual al del que esta activo actualmente -> agrega la clase is-active
            if (path === document.location.pathname) {
                link.classList.add('is-active');
            }
        }
    }
}

export default Navbar;
class Router {
    constructor() {
        this.pagesFunctions = [];
    }
    /**
     * @returns {String} path
     */
    getPath() {
        return window.location.pathname;
    }
    static getPath() {
        return window.location.pathname;
    }
    /**
     * @param {String} page 
     * @param {Function} callback 
     */
    onPage(page, callback) {
        if (typeof page == 'undefined' || typeof callback == 'undefined') {
            console.warn('No se agrego la funcion por que no se pasaron los parametros');
        } else {
            this.pagesFunctions.push({ page: page, function: callback });
        }
    }
    run() {
        this.pagesFunctions.forEach(fun => {

            // verifica si la expresesion coincide
            let matches = this.getPath().match(new RegExp('^' + fun.page + '$'));
            matches = matches == null ? false : matches;

            // comprueba si la pagina coincide y si el callback es una funcion
            if (matches && typeof fun.function === 'function') {

                // pasa los parametros si se requiere
                if (matches.length > 1) {

                    matches = matches.slice(1);
                    fun.function(...matches);

                } else {

                    fun.function();

                }
            }
        })
    }
}

export default Router;
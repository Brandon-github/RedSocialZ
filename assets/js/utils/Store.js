class Store {
    static store = {};
    /**
     * @param {string} name 
     * @returns {*} Retorna el valor de la 'store'
     */

    static get(name) {
        if (name in this.store) {
            return this.store[name];
        } else {
            return false;
        }
    }

    /**
     * Agrega una nueva 'store'
     * @param {string} name 
     * @param {*} value 
     */
    static set(name, value) {
        this.store[name] = value;
    }

    /**
     * Imprime todas las 'stores'
     * @param {boolean} json 
     */
    static print(json = false) {
        console.log(json ? JSON.stringify(this.store) : this.store);
    }

    /**
     * agregar los valores por defecto
     * @param {Object} init 
     */
    static start(init = {}) {
        this.store = init;
    }
}

export default Store;
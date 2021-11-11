/**
 * Agrega una variable global
 * @param {String} name 
 * @param {Any} content 
 */
const global = (name, content) => {
    window[name] = content;
}

export default global;
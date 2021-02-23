
const ejs = require('ejs');

// esto para poder utilizarlo en cualquier ubicacion
module.exports = {
    // en data se pasan los argumentos, ej. nombre proyecto
    render: function (content, data){
        return ejs.render(content, data);
    }
}
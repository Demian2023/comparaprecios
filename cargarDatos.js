// operacionesDatos.js
import axios from 'axios';

// Ejemplo de solicitud para leer datos
export function leerDatos(tabla) {
    return axios.get(`http://localhost/comparapreciosphp/comparaprecios.php?tabla=${tabla}`)
        .then(response => response.data)
        .catch(error => {
            console.error(error);
            throw error;
        });
}
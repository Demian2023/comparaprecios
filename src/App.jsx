import { useState, useEffect } from 'react'
import { leerDatos } from '../cargarDatos'
import moment from 'moment';
import './index.css'
import './cargando.css'

function App() {

  const [datos, setDatos] = useState([]);
  const [datosFormateados, setDatosFormateados] = useState([]);
  const [datosOrdenados, setDatosOrdenados] = useState([]);
  const [busqueda, setBusqueda] = useState("");

  const [productoSeleccionado, setProductoSeleccionado] = useState('');

  const handleSelectChange = (e) => {
    setProductoSeleccionado(e.target.value);
    setDatosOrdenados("");
    setBusqueda("");
    buscar(e.target.value)
  };

  const handleInputChange = (event) => {
    setBusqueda(event.target.value);
  };


  // funcion para dar formato al precio
  const formatearCantidad = cantidad => {
    return cantidad.toLocaleString('es-ES', {
      style: 'decimal',
      useGrouping: true,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };


const buscar = (producto) => {
  leerDatos(producto)
    .then(data => {
      setDatos(data);
    })
    .catch(error => {
      console.error('Error en la solicitud:', error);
      // Puedes agregar un estado para manejar el error si es necesario
    });
};
// convertir los datos
  useEffect(() => {
    datos.sort((a, b) => a.precio - b.precio)
    datos.forEach(item => {
      try {
        const stringANumero = Number(item.precio.replace(',', '.'));
        item.fecha = moment(item.fecha, "YYYY/MM/DD HH:mm:ss").format("DD/MM/YYYY HH:mm:ss");
        item.precio = formatearCantidad(stringANumero);
      } catch (error) {
        console.log("no ando el .replace(): ", error, " item: ", item.info)
      }
      
    });
    setDatosFormateados([...datos]);
  }, [datos]);


// funcion para filtrar
  const filtrar = (filtro) => {
    const busquedaItems = datosFormateados.filter(item => item.info.toLowerCase().includes(filtro));
    const otrosItems = datosFormateados.filter(item => !item.info.toLowerCase().includes(filtro));
    const nuevoArray = [...busquedaItems, ...otrosItems];
    setDatosOrdenados(nuevoArray);
  }
// para filtrar haciendo enter
const apretarEnter = (event) => {
  if (event.key === 'Enter') {
    filtrar(busqueda);
  }
};

  return (
    <>
      <h1>Compara precios</h1>
      <label>
        <h2>Selecciona un producto:</h2>
        <select value={productoSeleccionado} onChange={handleSelectChange}>
          <option value="">Selecciona un producto</option>
          <option value="cafe">Café</option>
          <option value="leche">Leche</option>
          <option value="azucar">Azúcar</option>
          <option value="yerba">Yerba</option>
          <option value="pan">Pan</option>
        </select>
      </label>
      {productoSeleccionado && (
        <h2>{productoSeleccionado}</h2>
      )}
      <div className="centrar">
        <input type="text" value={busqueda} onChange={handleInputChange} onKeyDown={apretarEnter}/>
        <button onClick={() => { filtrar(busqueda)}}>Filtrar</button>
      </div>
      <ol>
      {(datosOrdenados.length > 0 ? datosOrdenados : datosFormateados).map((e) => <li key={e.id}><h2>{e.info}</h2>
      <footer>
      <div><h3>Precio: </h3> <h4 className='resaltado'>$ {e.precio}</h4></div>
      <div><h3>Supermercado: </h3><h4>{e.supermercado}</h4></div>
      </footer>
      <div className="actualizado">Actualizado: {e.fecha}</div>
      </li>)}
      </ol>
    </>
  )
}

export default App

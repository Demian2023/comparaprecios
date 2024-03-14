import { useState, useEffect } from 'react'
import datosJson from '../base de datos/comparaprecios.json';
import moment from 'moment';
import './index.css'

function App() {

  const [datos, setDatos] = useState([]);
  const [datosProducto, setdatosProducto] = useState([]);
  const [datosFormateados, setDatosFormateados] = useState([]);
  const [datosfiltrados, setDatosFiltrados] = useState([]);
  const [busqueda, setBusqueda] = useState("");

  const [productoSeleccionado, setProductoSeleccionado] = useState('');

  const handleSelectChange = (e) => {
    setProductoSeleccionado(e.target.value);
    buscar(e.target.value);
    setDatosFiltrados("");
    setBusqueda("");
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
  console.log(datos)
  const resultados = datos.find(tabla => tabla.name.toLowerCase() === producto.toLowerCase());
  resultados && setdatosProducto(resultados.data);
};

  useEffect(() => {
    setDatos(datosJson)
  }, []);
// convertir los datos
  useEffect(() => {
    datosProducto.sort((a, b) => a.precio - b.precio)
    datosProducto.forEach(item => {
      try {
        const stringANumero = Number(item.precio.replace(',', '.'));
        item.fecha = moment(item.fecha, "YYYY/MM/DD HH:mm:ss").format("DD/MM/YYYY HH:mm:ss");
        item.precio = formatearCantidad(stringANumero);
      } catch (error) {
        console.log("no ando el .replace(): ", error, " item: ", item.info)
      }
      
    });
    setDatosFormateados([...datosProducto]);
  }, [datosProducto]);


// funcion para filtrar
  const filtrar = (filtro) => {
    const busquedaItems = datosFormateados.filter(item => item.info.toLowerCase().includes(filtro));
    const otrosItems = datosFormateados.filter(item => !item.info.toLowerCase().includes(filtro));
    const nuevoArray = [...busquedaItems, ...otrosItems];
    setDatosFiltrados(nuevoArray);
    setBusqueda("");
  }
// para filtrar haciendo enter
const apretarEnter = (event) => {
  if (event.key === 'Enter') {
    filtrar(busqueda);
    setBusqueda("");
  }
};

  return (
    <>
      <h1>Compara precios</h1>
      <div className="centrar">
        <div>
          <h2 style={{display: "inline"}}>Producto seleccionado: </h2>
          <select value={productoSeleccionado} onChange={handleSelectChange}>
            <option value="">Selecciona un producto</option>
            <option value="cafe">Café</option>
            <option value="leche">Leche</option>
            <option value="azucar">Azúcar</option>
            <option value="yerba">Yerba</option>
            <option value="pan">Pan</option>
          </select>
        </div>
       
        <div>
          <input type="text" placeholder='Añade un filtro' value={busqueda} onChange={handleInputChange} onKeyDown={apretarEnter}/>
          <button onClick={() => { filtrar(busqueda)}}>Filtrar</button>
        </div>

      </div>
        
      <ol>
      {(datosfiltrados.length > 0 ? datosfiltrados : datosFormateados).map((e) => 
      <li key={e.id}>
      <h2>{e.info}</h2>
      <footer>
      <div><h3>Precio: </h3> <h2>$ {e.precio}</h2></div>
      <div><h3>Supermercado: </h3><h4>{e.supermercado}</h4></div>
      </footer>
      <div className="actualizado">Actualizado: {e.fecha}</div>
      </li>)}
      </ol>
    </>
  )
}

export default App

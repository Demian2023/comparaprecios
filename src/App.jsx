import { useState, useEffect } from 'react'
import datosJson from '../base de datos/comparaprecios.json';
import moment from 'moment';
import './index.css';
import {Filtros} from "./Filtros";

function App() {

  const [datos, setDatos] = useState([]);
  const [datosProducto, setDatosProducto] = useState([]);
  const [datosFormateados, setDatosFormateados] = useState([]);
  const [datosfiltrados, setDatosFiltrados] = useState([]);
  
  const [productoSeleccionado, setProductoSeleccionado] = useState('');

//  traer el json a datos
  useEffect(() => {
    setDatos(datosJson)
  }, []);
// dar formato a los datos
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
// manejo de cambios para elegir producto
  const handleSelectChange = (e) => {
    setProductoSeleccionado(e.target.value);
    buscar(e.target.value);
    setDatosFiltrados("");
  };


// funcion para dar formato al precio
  const formatearCantidad = cantidad => {
      return cantidad.toLocaleString('es-ES', {
        style: 'decimal',
        useGrouping: true,
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });
  }
// buscar el producto
  const buscar = (producto) => {
    const resultados = datos.find(tabla => tabla.name.toLowerCase() === producto.toLowerCase());
    resultados && setDatosProducto(resultados.data);
  }
// filtro para buscar con varias opciones
  const filtrado = (filtros) => {
    let nuevoArray = [];
    if (filtros.length == 1) {
      const busquedaItems = datosFormateados.filter(item => item.info.toLowerCase().includes(filtros[0].toLowerCase()));
      nuevoArray = [...busquedaItems];
    } else if (filtros.length == 2) {
      const busquedaItems = datosFormateados.filter(item => item.info.toLowerCase().includes(filtros[0].toLowerCase()));
      const busquedaItems2 = busquedaItems.filter(item => item.info.toLowerCase().includes(filtros[1].toLowerCase()));
      nuevoArray = [...busquedaItems2];
    } else if (filtros.length == 3) {
      const busquedaItems = datosFormateados.filter(item => item.info.toLowerCase().includes(filtros[0].toLowerCase()));
      const busquedaItems2 = busquedaItems.filter(item => item.info.toLowerCase().includes(filtros[1].toLowerCase()));
      const busquedaItems3 = busquedaItems2.filter(item => item.info.toLowerCase().includes(filtros[2].toLowerCase()));
      nuevoArray = [...busquedaItems3];
    }
    // eliminar duplicados
    nuevoArray = [...new Set(nuevoArray)]
    nuevoArray.sort((a, b) => parseFloat(a.precio.replace(',', '.')) - parseFloat(b.precio.replace(',', '.')));
    // si no hay resultados...
    if (nuevoArray.length < 1) {
      setDatosFiltrados([{
        id: '1',
        info: 'No se encontraron datos',
        precio: '000,00',
        fecha: 'recien',
        supermercado: 'Ninguno'
      }]);
    } else {
      setDatosFiltrados(nuevoArray)
    }
  }

  return (
    <>
      <h1 id='titulo'>Compara precios</h1>
      <div className="centrar">
        <div>
          <h2 style={{display: "inline"}}>Producto seleccionado: </h2>
          <select value={productoSeleccionado} onChange={(e)=>{
          handleSelectChange(e);
          }}>
            <option value="" disabled>Selecciona un producto</option>
            <option value="aceite">Aceite</option>
            <option value="azucar">Azúcar</option>
            <option value="cafe">Café</option>
            <option value="cerveza">Cerveza</option>
            <option value="leche">Leche</option>
            <option value="pan">Pan</option>
            <option value="yerba">Yerba</option>
          </select>
        </div>

        {/* flecha subir */}
        <a href="#titulo" style={{position: "fixed", bottom: "10px", right: "20px"}}>
        <svg style={{width: "35px"}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="M214.6 41.4c-12.5-12.5-32.8-12.5-45.3 0l-160 160c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 141.2V448c0 17.7 14.3 32 32 32s32-14.3 32-32V141.2L329.4 246.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-160-160z"/></svg>
        </a>
      </div>
      
      {/* filtros */}
      <div className="centrar">
        <Filtros productoSeleccionado={productoSeleccionado} filtrado={filtrado}/>
      </div>

      {/* lista */}
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

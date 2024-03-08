import { useState, useEffect } from 'react'
import { leerDatos } from '../cargarDatos'
import moment from 'moment';
import './index.css'
import './cargando.css'

function App() {

  const [datos, setDatos] = useState([]);
  const [datosFormateados, setDatosFormateados] = useState([]);
  const [datosOrdenados, setDatosOrdenados] = useState([]);

  // funcion para dar formato al precio
  const formatearCantidad = cantidad => {
    return cantidad.toLocaleString('es-ES', {
      style: 'decimal',
      useGrouping: true,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };


// cargar los datos
  useEffect(() => {
    const fetchData = () => {
      leerDatos("azucar")
        .then(data => {
          setDatos(data);
        })
        .catch(error => {
          console.error('Error en la solicitud:', error);
          // Puedes agregar un estado para manejar el error si es necesario
        });
    };
    fetchData();
  }, []);
// convertir los datos
  useEffect(() => {
    datos.forEach(item => {
      const stringANumero = Number(item.precio.replace(',', '.'));
      item.fecha = moment(item.fecha, "YYYY/MM/DD HH:mm:ss").format("DD/MM/YYYY HH:mm:ss");
      item.precio = formatearCantidad(stringANumero);
    });
    setDatosFormateados([...datos]);
  }, [datos]);

  const Ledesma = () => {
    console.log("Ledesma")
    const ledesmaItems = datosFormateados.filter(item => item.info.toLowerCase().includes('ledesma'));
    const otrosItems = datosFormateados.filter(item => !item.info.toLowerCase().includes('ledesma'));
    const nuevoArray = [...ledesmaItems, ...otrosItems];
    setDatosOrdenados(nuevoArray);
    console.log(datosOrdenados)
  }

  return (
    <>
      <h1>Compara precios</h1>
      <h2>Azúcar: </h2>
      <button onClick={() => Ledesma()}>Ledesma</button>
      <ol>
      {datos && datos.length == 0 ?
      <div className="loader"></div> :
      (datosOrdenados.length > 0 ? datosOrdenados : datosFormateados).map((e) => <li key={e.id}><h2>{e.info}</h2>
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

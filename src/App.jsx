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
    const busquedaItems = datosFormateados.filter(item => item.info.toLowerCase().includes(filtro.toLowerCase()));
    // const otrosItems = datosFormateados.filter(item => !item.info.toLowerCase().includes(filtro.toLowerCase()));
    // const nuevoArray = [...busquedaItems, ...otrosItems];
    const nuevoArray = [...busquedaItems];
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
            <option value="aceite">Aceite</option>
            <option value="azucar">Azúcar</option>
            <option value="cafe">Café</option>
            <option value="cerveza">Cerveza</option>
            <option value="leche">Leche</option>
            <option value="pan">Pan</option>
            <option value="yerba">Yerba</option>
          </select>
        </div>

        {productoSeleccionado === 'aceite' && (
        <div>
          <button onClick={()=>filtrar("900")}>Filtro por 900 cc.</button>
          <button onClick={()=>filtrar("5 l")}>Filtro por 1,5 litros</button>
          <button onClick={()=>filtrar("girasol")}>Filtrar por girasol</button>
          <button onClick={()=>filtrar("maíz")}>Filtrar por maíz</button>
          <button onClick={()=>filtrar("oliva")}>Filtrar por Oliva</button>
          <div>
            <button onClick={()=>filtrar(" ")}>Volver a la lista</button>
          </div>
        </div>
      )}

      {productoSeleccionado === 'azucar' && (
        <div>
          {/* Contenido específico para azúcar */}
          <button onClick={()=>filtrar("1 k")}>Filtro por kilo</button>
          <button onClick={()=>filtrar("chango")}>Filtro por marca Chango</button>
          <button onClick={()=>filtrar("hileret")}>Filtro por marca Hileret</button>
          <button onClick={()=>filtrar(" ")}>Volver a la lista</button>
        </div>
      )}

      {productoSeleccionado === 'cafe' && (
        <div>
          {/* Contenido específico para café */}
          <div>
            <div>
              <h2>Filtrar por marca: </h2>
            </div>
            <button onClick={()=>filtrar("arlistan")}>Arlistán</button>
            <button onClick={()=>filtrar("dolca")}>Dolca</button> 
            <button onClick={()=>filtrar("nescafe")}>Nescafé</button> 
            <button onClick={()=>filtrar("bonafide")}>Bonafide</button> 
            <button onClick={()=>filtrar("morenita")}>La Morenita</button> 
          </div>
          
          <div>
          <button onClick={()=>filtrar("instant")}>Filtrar por instantáneo</button> 
          </div>
          <div>
            <h2>Filtrar por gramos: </h2>
          </div>
          <button onClick={()=>filtrar("50 g")}>50 gramos</button>
          <button onClick={()=>filtrar("100 g")}>100 gramos</button>
          <button onClick={()=>filtrar("125 g")}>125 gramos</button>
          <button onClick={()=>filtrar("170 g")}>170 gramos</button>
          <button onClick={()=>filtrar("250 g")}>250 gramos</button>

          <div>
            <button onClick={()=>filtrar(" ")}>Volver a la lista</button>  
          </div>
          
        </div>
      )}

      {productoSeleccionado === 'cerveza' && (
        <div>
          <div>
              <h2>Filtrar por marca: </h2>
          </div>
          <button onClick={()=>filtrar("quilmes")}>Quilmes</button>
          <button onClick={()=>filtrar("brahma")}>Brahma</button>
          <button onClick={()=>filtrar("schneider")}>Schneider</button>
          <button onClick={()=>filtrar("imperial")}>Imperial</button>
          <button onClick={()=>filtrar("andes")}>Andes</button>
          <button onClick={()=>filtrar("stella")}>Stella Artois</button>
          <button onClick={()=>filtrar("corona")}>Corona</button>
          <button onClick={()=>filtrar("heineken")}>Heineken</button>
          <button onClick={()=>filtrar("patagonia")}>Patagonia</button>
          <button onClick={()=>filtrar("budweiser")}>Budweiser</button>
          <div>
              <h2>Filtrar por contenido: </h2>
          </div>
          <button onClick={()=>filtrar("1 l")}>Filtro por litro</button>
          <button onClick={()=>filtrar("473")}>Filtrar por lata</button>
          <button onClick={()=>filtrar(" ")}>Volver a la lista</button>
        </div>
      )}

      {productoSeleccionado === 'leche' && (
        <div>
          <button onClick={()=>filtrar("1 l")}>Filtro por litro</button>
          <button onClick={()=>filtrar("seren")}>Filtrar por marca La Serenísima</button>
          <button onClick={()=>filtrar("sachet")}>Filtro por sachet</button>
          <button onClick={()=>filtrar("en polvo")}>Filtro por en polvo</button>
          <button onClick={()=>filtrar(" ")}>Volver a la lista</button>
        </div>
      )}

      

      {productoSeleccionado === 'pan' && (
        <div>
          <button onClick={()=>filtrar("1 k")}>Filtro por kilo</button>
          <button onClick={()=>filtrar("rallado")}>Pan rallado</button>
          <button onClick={()=>filtrar("pancho")}>Pan para panchos</button>
          <button onClick={()=>filtrar("hamburguesas")}>Pan para hamburguesas</button>
          <button onClick={()=>filtrar(" ")}>Volver a la lista</button>
        </div>
      )}

      {productoSeleccionado === 'yerba' && (
        <div>
          <div>
            <h2>Filtrar por marca: </h2>
          </div>

          <button onClick={()=>filtrar("tarag")}>Taragui</button>
          <button onClick={()=>filtrar("uni")}>Unión</button>
          <button onClick={()=>filtrar("playadito")}>Playadito</button>
          <button onClick={()=>filtrar("tranquera")}>La Tranquera</button>
          <button onClick={()=>filtrar("verdeflor")}>Verdeflor</button>
          <button onClick={()=>filtrar("nobleza")}>Nobleza Gaucha</button>

          <div>
            <h2>Filtrar por peso: </h2>
          </div>
          <button onClick={()=>filtrar("1 k")}>Filtro por kilo</button>
          <button onClick={()=>filtrar("500 g")}>Filtro por 1/2 kilo</button>
          <div>
            <button onClick={()=>filtrar(" ")}>Volver a la lista</button>
          </div>
        </div>
      )}
       
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

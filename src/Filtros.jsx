import { useState, useEffect } from 'react';
import PropTypes from 'prop-types'
import { FiltroIndividual } from './FiltroIndividual';

export const Filtros = ({productoSeleccionado, filtrado}) => {

    const [filtro1, setFiltro1] = useState("");
    const [filtro2, setFiltro2] = useState("");
    const [filtro3, setFiltro3] = useState("");

// manejar radio
    const handleRadioChange = (e) => {
        const { id, name  } = e.target;
        // setSelectedOption({
        //   ...selectedOption,
        //   [id]: value,
        // });
        if (name === "filtroUno") {
        setFiltro1(id)
        } else if (name === "filtroDos") {
        setFiltro2(id)
        } else if (name === "filtroTres") {
        setFiltro3(id)
        }
    }

    // actualizar filtros
    useEffect(() => {
        const filtrosActivos = [filtro1, filtro2, filtro3].filter(Boolean);
        
        if (filtrosActivos.length > 0) {
        filtrado(filtrosActivos);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filtro1, filtro2, filtro3]);

  
return (
    <>
        {productoSeleccionado === 'aceite' && (
            <div>
                <h2>Filtrar por:</h2>
                <div>
                    <FiltroIndividual
                    handleRadioChange={handleRadioChange}
                    idBusqueda={"900"}
                    nameFiltro={"filtroUno"}
                    filtro={filtro1}
                    texto={"900 CC."}
                    />
                    <FiltroIndividual
                    handleRadioChange={handleRadioChange}
                    idBusqueda={"5 l"}
                    nameFiltro={"filtroUno"}
                    filtro={filtro1}
                    texto={"1,5 litros"}
                    />
                </div>
                <div>
                    <FiltroIndividual
                    handleRadioChange={handleRadioChange}
                    idBusqueda={"girasol"}
                    nameFiltro={"filtroDos"}
                    filtro={filtro2}
                    texto={"Girasol"}
                    />
                    <FiltroIndividual
                    handleRadioChange={handleRadioChange}
                    idBusqueda={"maíz"}
                    nameFiltro={"filtroDos"}
                    filtro={filtro2}
                    texto={"Maíz"}
                    />
                    <FiltroIndividual
                    handleRadioChange={handleRadioChange}
                    idBusqueda={"oliva"}
                    nameFiltro={"filtroDos"}
                    filtro={filtro2}
                    texto={"Oliva"}
                    />
                </div>
                <div>
                    <button onClick={()=>{filtrado(" ");setFiltro1("");setFiltro2("");setFiltro3("")}}
                    style={{margin: 0}}>
                        Volver a la lista completa
                    </button>
                </div>
            </div>
        )}

        {productoSeleccionado === 'azucar' && (
            <div>
                <h2>Filtrar por:</h2>
                    <div>
                        <FiltroIndividual
                        handleRadioChange={handleRadioChange}
                        idBusqueda={"1 k"}
                        nameFiltro={"filtroUno"}
                        filtro={filtro1}
                        texto={"1 Kilo"}
                        />
                    </div>
                    <div>
                        <FiltroIndividual
                        handleRadioChange={handleRadioChange}
                        idBusqueda={"chango"}
                        nameFiltro={"filtroDos"}
                        filtro={filtro2}
                        texto={"Chango"}
                        />
                        <FiltroIndividual
                        handleRadioChange={handleRadioChange}
                        idBusqueda={"hileret"}
                        nameFiltro={"filtroDos"}
                        filtro={filtro2}
                        texto={"Hileret"}
                        />
                    </div>
                    <div>
                        <button onClick={()=>{filtrado(" ");setFiltro1("");setFiltro2("");setFiltro3("")}}
                        style={{margin: 0}}>
                            Volver a la lista completa
                        </button>
                </div>
            </div>
        )}

        {productoSeleccionado === 'cafe' && (
            <div>
                <div>
                    <h2>Filtrar por:</h2>
                </div>
                <div>
                    <FiltroIndividual
                    handleRadioChange={handleRadioChange}
                    idBusqueda={"arlistan"}
                    nameFiltro={"filtroUno"}
                    filtro={filtro1}
                    texto={"Arlistan"}
                    />
                    <FiltroIndividual
                    handleRadioChange={handleRadioChange}
                    idBusqueda={"dolca"}
                    nameFiltro={"filtroUno"}
                    filtro={filtro1}
                    texto={"Dolca"}
                    />
                    <FiltroIndividual
                    handleRadioChange={handleRadioChange}
                    idBusqueda={"nescafe"}
                    nameFiltro={"filtroUno"}
                    filtro={filtro1}
                    texto={"Nescafe"}
                    />
                    <FiltroIndividual
                    handleRadioChange={handleRadioChange}
                    idBusqueda={"bonafide"}
                    nameFiltro={"filtroUno"}
                    filtro={filtro1}
                    texto={"Bonafide"}
                    />
                    <FiltroIndividual
                    handleRadioChange={handleRadioChange}
                    idBusqueda={"morenita"}
                    nameFiltro={"filtroUno"}
                    filtro={filtro1}
                    texto={"La Morenita"}
                    />
                </div>
                <div>
                    <FiltroIndividual
                    handleRadioChange={handleRadioChange}
                    idBusqueda={"instant"}
                    nameFiltro={"filtroDos"}
                    filtro={filtro2}
                    texto={"Instantáneo"}
                    />
                    <FiltroIndividual
                    handleRadioChange={handleRadioChange}
                    idBusqueda={"capsula"}
                    nameFiltro={"filtroDos"}
                    filtro={filtro2}
                    texto={"Capsula"}
                    />
                </div>
                <div>
                    <FiltroIndividual
                    handleRadioChange={handleRadioChange}
                    idBusqueda={"50 g"}
                    nameFiltro={"filtroTres"}
                    filtro={filtro3}
                    texto={"50 Gramos"}
                    />
                    <FiltroIndividual
                    handleRadioChange={handleRadioChange}
                    idBusqueda={"100 g"}
                    nameFiltro={"filtroTres"}
                    filtro={filtro3}
                    texto={"100 Gramos"}
                    />
                    <FiltroIndividual
                    handleRadioChange={handleRadioChange}
                    idBusqueda={"125 g"}
                    nameFiltro={"filtroTres"}
                    filtro={filtro3}
                    texto={"125 Gramos"}
                    />
                    <FiltroIndividual
                    handleRadioChange={handleRadioChange}
                    idBusqueda={"170 g"}
                    nameFiltro={"filtroTres"}
                    filtro={filtro3}
                    texto={"170 Gramos"}
                    />
                    <FiltroIndividual
                    handleRadioChange={handleRadioChange}
                    idBusqueda={"250 g"}
                    nameFiltro={"filtroTres"}
                    filtro={filtro3}
                    texto={"250 Gramos"}
                    />
                </div>
                <div>
                    <button onClick={()=>{filtrado(" ");setFiltro1("");setFiltro2("");setFiltro3("")}}
                    style={{margin: 0}}>
                        Volver a la lista completa
                    </button>
                </div>
            </div>
        )}

        {productoSeleccionado === 'cerveza' && (
            <div className='centrar'>
                <div>
                    <h2>Filtrar por:</h2>
                </div>
                <div style={{width: "75vw", display: "flex", justifyContent: "center", flexWrap: "wrap"}}>
                    <FiltroIndividual
                    handleRadioChange={handleRadioChange}
                    idBusqueda={"quilmes"}
                    nameFiltro={"filtroUno"}
                    filtro={filtro1}
                    texto={"Quilmes"}
                    />
                    <FiltroIndividual
                    handleRadioChange={handleRadioChange}
                    idBusqueda={"brahma"}
                    nameFiltro={"filtroUno"}
                    filtro={filtro1}
                    texto={"Brahma"}
                    />
                    <FiltroIndividual
                    handleRadioChange={handleRadioChange}
                    idBusqueda={"schneider"}
                    nameFiltro={"filtroUno"}
                    filtro={filtro1}
                    texto={"Schneider"}
                    />
                    <FiltroIndividual
                    handleRadioChange={handleRadioChange}
                    idBusqueda={"imperial"}
                    nameFiltro={"filtroUno"}
                    filtro={filtro1}
                    texto={"Imperial"}
                    />
                    <FiltroIndividual
                    handleRadioChange={handleRadioChange}
                    idBusqueda={"andes"}
                    nameFiltro={"filtroUno"}
                    filtro={filtro1}
                    texto={"Andes"}
                    />
                    <FiltroIndividual
                    handleRadioChange={handleRadioChange}
                    idBusqueda={"stella"}
                    nameFiltro={"filtroUno"}
                    filtro={filtro1}
                    texto={"Stella Atois"}
                    />
                    <FiltroIndividual
                    handleRadioChange={handleRadioChange}
                    idBusqueda={"corona"}
                    nameFiltro={"filtroUno"}
                    filtro={filtro1}
                    texto={"Corona"}
                    />
                    <FiltroIndividual
                    handleRadioChange={handleRadioChange}
                    idBusqueda={"heineken"}
                    nameFiltro={"filtroUno"}
                    filtro={filtro1}
                    texto={"Heineken"}
                    />
                    <FiltroIndividual
                    handleRadioChange={handleRadioChange}
                    idBusqueda={"patagonia"}
                    nameFiltro={"filtroUno"}
                    filtro={filtro1}
                    texto={"Patagonia"}
                    />
                    <FiltroIndividual
                    handleRadioChange={handleRadioChange}
                    idBusqueda={"budweiser"}
                    nameFiltro={"filtroUno"}
                    filtro={filtro1}
                    texto={"Budweiser"}
                    />
                </div>
                <div>
                    <FiltroIndividual
                    handleRadioChange={handleRadioChange}
                    idBusqueda={"1 l"}
                    nameFiltro={"filtroDos"}
                    filtro={filtro2}
                    texto={"1 Litro"}
                    />
                    <FiltroIndividual
                    handleRadioChange={handleRadioChange}
                    idBusqueda={"473"}
                    nameFiltro={"filtroDos"}
                    filtro={filtro2}
                    texto={"Lata"}
                    />
                </div>
                <div>
                    <button onClick={()=>{filtrado(" ");setFiltro1("");setFiltro2("");setFiltro3("")}}
                    style={{margin: 0}}>
                        Volver a la lista completa
                    </button>
                </div>
            </div>
        )}

        {productoSeleccionado === 'leche' && (
            <div>
                <div>
                    <h2>Filtrar por:</h2>
                </div>
                <div>
                    <FiltroIndividual
                    handleRadioChange={handleRadioChange}
                    idBusqueda={"1 l"}
                    nameFiltro={"filtroUno"}
                    filtro={filtro1}
                    texto={"1 Litro"}
                    />
                    <FiltroIndividual
                    handleRadioChange={handleRadioChange}
                    idBusqueda={"sachet"}
                    nameFiltro={"filtroUno"}
                    filtro={filtro1}
                    texto={"Sachet"}
                    />
                    <FiltroIndividual
                    handleRadioChange={handleRadioChange}
                    idBusqueda={"en polvo"}
                    nameFiltro={"filtroUno"}
                    filtro={filtro1}
                    texto={"En polvo"}
                    />
                    <label htmlFor="en polvo">
                    <div className="filtro">
                        <input type="radio"
                        id='en polvo'
                        name='filtroUno'
                        value="en polvo"
                        checked={filtro1 === "en polvo"}
                        onChange={handleRadioChange}
                        />
                        En polvo
                    </div>
                    </label>
                </div>
                <div>
                    <button onClick={()=>{filtrado(" ");setFiltro1("");setFiltro2("");setFiltro3("")}}
                    style={{margin: 0}}>
                        Volver a la lista completa
                    </button>
                </div>
            </div>
        )}

        {productoSeleccionado === 'pan' && (
            <div>
                <div>
                    <h2>Filtrar por:</h2>
                </div>
                <div>
                    <FiltroIndividual
                    handleRadioChange={handleRadioChange}
                    idBusqueda={"rallado"}
                    nameFiltro={"filtroUno"}
                    filtro={filtro1}
                    texto={"Pan rallado"}
                    />
                    <FiltroIndividual
                    handleRadioChange={handleRadioChange}
                    idBusqueda={"pancho"}
                    nameFiltro={"filtroUno"}
                    filtro={filtro1}
                    texto={"Pan para pancho"}
                    />
                    <FiltroIndividual
                    handleRadioChange={handleRadioChange}
                    idBusqueda={"hamburguesas"}
                    nameFiltro={"filtroUno"}
                    filtro={filtro1}
                    texto={"Pan para hamburguesas"}
                    />
                </div>
                <div>
                    <button onClick={()=>{filtrado(" ");setFiltro1("");setFiltro2("");setFiltro3("")}}
                    style={{margin: 0}}>
                        Volver a la lista completa
                    </button>
                </div>
            </div>
            
        )}

        {productoSeleccionado === 'yerba' && (
            <div>
                <div>
                    <h2>Filtrar por:</h2>
                </div>
                <div>
                    <FiltroIndividual
                    handleRadioChange={handleRadioChange}
                    idBusqueda={"tarag"}
                    nameFiltro={"filtroUno"}
                    filtro={filtro1}
                    texto={"Taragüi"}
                    />
                    <FiltroIndividual
                    handleRadioChange={handleRadioChange}
                    idBusqueda={"uni"}
                    nameFiltro={"filtroUno"}
                    filtro={filtro1}
                    texto={"Unión"}
                    />
                    <FiltroIndividual
                    handleRadioChange={handleRadioChange}
                    idBusqueda={"playadito"}
                    nameFiltro={"filtroUno"}
                    filtro={filtro1}
                    texto={"Playadito"}
                    />
                    <FiltroIndividual
                    handleRadioChange={handleRadioChange}
                    idBusqueda={"tranquera"}
                    nameFiltro={"filtroUno"}
                    filtro={filtro1}
                    texto={"La Tranquera"}
                    />
                    <FiltroIndividual
                    handleRadioChange={handleRadioChange}
                    idBusqueda={"verdeflor"}
                    nameFiltro={"filtroUno"}
                    filtro={filtro1}
                    texto={"Verdeflor"}
                    />
                    <FiltroIndividual
                    handleRadioChange={handleRadioChange}
                    idBusqueda={"nobleza"}
                    nameFiltro={"filtroUno"}
                    filtro={filtro1}
                    texto={"Nobleza Gaucha"}
                    />
                </div>
                <div>
                    <FiltroIndividual
                    handleRadioChange={handleRadioChange}
                    idBusqueda={"1 k"}
                    nameFiltro={"filtroDos"}
                    filtro={filtro2}
                    texto={"1 Kilo"}
                    />
                    <FiltroIndividual
                    handleRadioChange={handleRadioChange}
                    idBusqueda={"500 g"}
                    nameFiltro={"filtroDos"}
                    filtro={filtro2}
                    texto={"Medio kilo"}
                    />
                </div>
                <div>
                    <button onClick={()=>{filtrado(" ");setFiltro1("");setFiltro2("");setFiltro3("")}}
                    style={{margin: 0}}>
                        Volver a la lista completa
                    </button>
                </div>
            </div>
        )}
    </>
)}

Filtros.propTypes = {
    productoSeleccionado: PropTypes.string,
    filtrado: PropTypes.func
}
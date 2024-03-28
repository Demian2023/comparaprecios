import PropTypes from 'prop-types'

export const FiltroIndividual = ({handleRadioChange, idBusqueda, nameFiltro, filtro, texto}) => {
return (
    <label htmlFor={idBusqueda}>
    <div className="filtro">
        <input type="radio"
        id={idBusqueda}
        name={nameFiltro}
        value={idBusqueda}
        checked={filtro === idBusqueda}
        onChange={handleRadioChange}
        />
        {texto}
    </div>
    </label>
);
}

FiltroIndividual.propTypes = {
    handleRadioChange: PropTypes.func,
    idBusqueda: PropTypes.string,
    nameFiltro: PropTypes.string,
    filtro: PropTypes.string,
    texto: PropTypes.string,
}

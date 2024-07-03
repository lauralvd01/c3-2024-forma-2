import eventosJSON from '../../../../dataset/historical_data.json'

exports.getHistoricalEvents = (ocurrence) => {
    if (ocurrence.length != 2) {
        throw new Error('El input debe ser ac o dc')
    }

    if (ocurrence == 'ac' || ocurrence == 'AC' || ocurrence == 'Ac' || ocurrence == 'aC'){
        return eventosJSON.result.events.filter((evn) => evn.date <= 0)
    } else if(ocurrence =='dc' || ocurrence == 'DC' || ocurrence == 'Dc' || ocurrence == 'dC'){
        return eventosJSON.result.events.filter((evn) => evn.date > 0)
    }
    
    throw new Error('Solo se aceptan caracteres no numéricos')
}
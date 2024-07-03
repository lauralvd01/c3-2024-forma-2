import getHistoricalEvents from '../../../src/domain/historical_events/repository/historicalEventsRepository'

describe('Test unitarios de el Historical Events Repository', () => {

    /**
     * Test unitario para obtener eventos históricos de la era antes de cristo
     * 1. Caso exitoso : el parametro usado es un string igual a 'ac', usando cada caso de case posible
     */
    test('Debería retornar eventos históricos de la era antes el cristo', () => {
        const ocurrence = 'ac'
        const result = getHistoricalEvents.getHistoricalEvents(ocurrence)

        expect(result.length).toBeGreaterThan(0)
        expect(result[0]).toEqual(getFirstEventBeforeChrist())

        const ocurrence2 = 'AC'
        const result2 = getHistoricalEvents.getHistoricalEvents(ocurrence2)

        expect(result2.length).toBeGreaterThan(0)
        expect(result2[0]).toEqual(getFirstEventBeforeChrist())

        const ocurrence3 = 'Ac'
        const result3 = getHistoricalEvents.getHistoricalEvents(ocurrence3)

        expect(result3.length).toBeGreaterThan(0)
        expect(result3[0]).toEqual(getFirstEventBeforeChrist())

        const ocurrence4 = 'aC'
        const result4 = getHistoricalEvents.getHistoricalEvents(ocurrence4)

        expect(result4.length).toBeGreaterThan(0)
        expect(result4[0]).toEqual(getFirstEventBeforeChrist())
    })

    /**
     * Test unitario para obtener eventos históricos de la era después de cristo
     * 1. Caso exitoso : el parametro usado es un string igual a 'dc', usando cada caso de case posible
     */
    test('Debería retornar eventos históricos de la era después de cristo', () => {
        const ocurrence = 'dc'
        const result = getHistoricalEvents.getHistoricalEvents(ocurrence)

        expect(result.length).toBeGreaterThan(0)
        expect(result[0]).toEqual(getFirstEventAfterChrist())

        const ocurrence2 = 'DC'
        const result2 = getHistoricalEvents.getHistoricalEvents(ocurrence2)

        expect(result2.length).toBeGreaterThan(0)
        expect(result2[0]).toEqual(getFirstEventAfterChrist())

        const ocurrence3 = 'Dc'
        const result3 = getHistoricalEvents.getHistoricalEvents(ocurrence3)

        expect(result3.length).toBeGreaterThan(0)
        expect(result3[0]).toEqual(getFirstEventAfterChrist())

        const ocurrence4 = 'dC'
        const result4 = getHistoricalEvents.getHistoricalEvents(ocurrence4)

        expect(result4.length).toBeGreaterThan(0)
        expect(result4[0]).toEqual(getFirstEventAfterChrist())
    })

    /**
     * Test unitario para obtener eventos históricos de la era antes o despues de cristo
     * 2. Caso fallido : el parametro usado es un string de largo = 2, que contiene caracteres alfanuméricos o solo númericos
     */
    test('Debería retornar un error con el mensaje "Solo se aceptan caracteres no numéricos"', () => {
        const ocurrence = 'a1'
        expect(() => getHistoricalEvents.getHistoricalEvents(ocurrence)).toThrowError("Solo se aceptan caracteres no numéricos")

        const ocurrence2 = '1a'
        expect(() => getHistoricalEvents.getHistoricalEvents(ocurrence2)).toThrowError("Solo se aceptan caracteres no numéricos")

        const ocurrence3 = '11'
        expect(() => getHistoricalEvents.getHistoricalEvents(ocurrence3)).toThrowError("Solo se aceptan caracteres no numéricos")
    })

    /**
     * Test unitario para obtener eventos históricos de la era antes o despues de cristo
     * 3. Caso fallido : el parametro usado es un string de largo != 2
     */
    test('Debería retornar un error con el mensaje "El input debe ser ac o dc"', () => {
        const ocurrence = 'a'
        expect(() => getHistoricalEvents.getHistoricalEvents(ocurrence)).toThrowError("El input debe ser ac o dc")

        const ocurrence2 = 'dcac'
        expect(() => getHistoricalEvents.getHistoricalEvents(ocurrence2)).toThrowError("El input debe ser ac o dc")
    })
})

function getFirstEventBeforeChrist() {
    return {
        "date": "-299",
        "description": "Los Samnitas, inician los preparativos de la Tercera guerra Samnita contra los romanos, reclutando tropas mercenarias de Galos y Sabinos y estableciendo alianzas con Etruscos y otros pueblos it\u00e1licos.",
        "lang": "es",
        "granularity": "year"
    }
}

function getFirstEventAfterChrist() {
    return {
        "date": "1",
        "description": "Fundación de Aksum (ciudad) en Etiopía.",
        "lang": "es",
        "category1": "África",
        "granularity": "year"
    }
}
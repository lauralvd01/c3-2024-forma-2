import getHistoricalEventsByOcurrence from '../../../src/domain/historical_events/use_cases/getHistoricalEvents'

describe('Test unitarios de el Historical Events Use cases', () => {

    /**
     * Test unitario para obtener eventos históricos de la era antes de cristo
     * 1. Caso exitoso : el parametro usado es un string igual a 'ac', usando cada caso de case posible
     */
    test('Debería retornar debe devolver un status 200 y en el body, un arreglo con los eventos históricos de antes del cristo ordenados desde el más antiguo al más nuevo', () => {
        const ocurrence = 'ac'
        let ctx = getHistoricalEventsByOcurrence.getHistoricalEventsByOcurrence({params: {ocurrence: ocurrence}})
        const body = ctx.body
        const status = ctx.status

        expect(status).toBe(200)
        expect(body.length).toBeGreaterThan(0)
        expect(body[0]).toEqual(getFirstEventBeforeChrist())
        expect(Number(body[0].date)).toBeLessThanOrEqual(Number(body[1].date))

        const ocurrence2 = 'AC'
        ctx = getHistoricalEventsByOcurrence.getHistoricalEventsByOcurrence({params: {ocurrence: ocurrence2}})
        const body2 = ctx.body
        const status2 = ctx.status

        expect(status2).toBe(200)
        expect(body2.length).toBeGreaterThan(0)
        expect(body2[0]).toEqual(getFirstEventBeforeChrist())
        expect(Number(body2[0].date)).toBeLessThanOrEqual(Number(body2[1].date))

        const ocurrence3 = 'Ac'
        ctx = getHistoricalEventsByOcurrence.getHistoricalEventsByOcurrence({params: {ocurrence: ocurrence3}})
        const body3 = ctx.body
        const status3 = ctx.status

        expect(status3).toBe(200)
        expect(body3.length).toBeGreaterThan(0)
        expect(body3[0]).toEqual(getFirstEventBeforeChrist())
        expect(Number(body3[0].date)).toBeLessThanOrEqual(Number(body3[1].date))

        const ocurrence4 = 'aC'
        ctx = getHistoricalEventsByOcurrence.getHistoricalEventsByOcurrence({params: {ocurrence: ocurrence4}})
        const body4 = ctx.body
        const status4 = ctx.status

        expect(status4).toBe(200)
        expect(body4.length).toBeGreaterThan(0)
        expect(body4[0]).toEqual(getFirstEventBeforeChrist())
        expect(Number(body4[0].date)).toBeLessThanOrEqual(Number(body4[1].date))
    })

    /**
     * Test unitario para obtener eventos históricos de la era después de cristo
     * 1. Caso exitoso : el parametro usado es un string igual a 'dc', usando cada caso de case posible
     */
    test('Debería retornar eventos históricos de la era después de cristo, desde el más antiguo al más nuevo', () => {
        const ocurrence = 'dc'
        let ctx = getHistoricalEventsByOcurrence.getHistoricalEventsByOcurrence({params: {ocurrence: ocurrence}})
        const body = ctx.body
        const status = ctx.status

        expect(status).toBe(200)
        expect(body.length).toBeGreaterThan(0)
        expect(body[0]).toEqual(getFirstEventAfterChrist())
        expect(Number(body[0].date)).toBeLessThanOrEqual(Number(body[1].date))

        const ocurrence2 = 'DC'
        ctx = getHistoricalEventsByOcurrence.getHistoricalEventsByOcurrence({params: {ocurrence: ocurrence2}})
        const body2 = ctx.body
        const status2 = ctx.status

        expect(status2).toBe(200)
        expect(body2.length).toBeGreaterThan(0)
        expect(body2[0]).toEqual(getFirstEventAfterChrist())
        expect(Number(body2[0].date)).toBeLessThanOrEqual(Number(body2[1].date))

        const ocurrence3 = 'Dc'
        ctx = getHistoricalEventsByOcurrence.getHistoricalEventsByOcurrence({params: {ocurrence: ocurrence3}})
        const body3 = ctx.body
        const status3 = ctx.status

        expect(status3).toBe(200)
        expect(body3.length).toBeGreaterThan(0)
        expect(body3[0]).toEqual(getFirstEventAfterChrist())
        expect(Number(body3[0].date)).toBeLessThanOrEqual(Number(body3[1].date))

        const ocurrence4 = 'dC'
        ctx = getHistoricalEventsByOcurrence.getHistoricalEventsByOcurrence({params: {ocurrence: ocurrence4}})
        const body4 = ctx.body
        const status4 = ctx.status

        expect(status4).toBe(200)
        expect(body4.length).toBeGreaterThan(0)
        expect(body4[0]).toEqual(getFirstEventAfterChrist())
        expect(Number(body4[0].date)).toBeLessThanOrEqual(Number(body4[1].date))
    })

    /**
     * Test unitario para obtener eventos históricos de la era antes o despues de cristo
     * 2. Caso fallido : el parametro usado es un string de largo = 2, que contiene caracteres alfanuméricos o solo númericos
     */
    test('Debería retornar un error con el mensaje "Solo se aceptan caracteres no numéricos"', () => {
        const ocurrence = 'a1'
        let ctx = getHistoricalEventsByOcurrence.getHistoricalEventsByOcurrence({params: {ocurrence: ocurrence}})
        const body = ctx.body
        const status = ctx.status

        expect(status).toBe(400)
        expect(body).toEqual({"message": "Solo se aceptan caracteres no numéricos"})

        const ocurrence2 = '1a'
        ctx = getHistoricalEventsByOcurrence.getHistoricalEventsByOcurrence({params: {ocurrence: ocurrence2}})
        const body2 = ctx.body
        const status2 = ctx.status

        expect(status2).toBe(400)
        expect(body2).toEqual({"message": "Solo se aceptan caracteres no numéricos"})

        const ocurrence3 = '11'
        ctx = getHistoricalEventsByOcurrence.getHistoricalEventsByOcurrence({params: {ocurrence: ocurrence3}})
        const body3 = ctx.body
        const status3 = ctx.status

        expect(status3).toBe(400)
        expect(body3).toEqual({"message": "Solo se aceptan caracteres no numéricos"})
    })

    /**
     * Test unitario para obtener eventos históricos de la era antes o despues de cristo
     * 3. Caso fallido : el parametro usado es un string de largo != 2
     */
    test('Debería retornar un error con el mensaje "El input debe ser ac o dc"', () => {
        const ocurrence = 'a'
        const {body, status} = getHistoricalEventsByOcurrence.getHistoricalEventsByOcurrence({params: {ocurrence: ocurrence}})

        expect(status).toBe(400)
        expect(body).toEqual({"message": "El input debe ser ac o dc"})

        const ocurrence2 = 'dcac'
        const ctx = getHistoricalEventsByOcurrence.getHistoricalEventsByOcurrence({params: {ocurrence: ocurrence2}})
        const body2 = ctx.body
        const status2 = ctx.status

        expect(status2).toBe(400)
        expect(body2).toEqual({"message": "El input debe ser ac o dc"})
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
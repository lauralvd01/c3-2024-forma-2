import request from 'supertest'
import { server, app } from '../../../../src/index'
import sinon from 'sinon'
import getHistoricalEvents from '../../../../src/domain/historical_events/repository/historicalEventsRepository'
import eventosJSON from '../../../../dataset/historical_data.json'

/**
 * El objetivo de este test de integración es probar la ruta GET /api/history/:ocurrence
 */
describe('GET /api/history/:ocurrence', () => {
    beforeEach(() => {
        sinon.restore()
    })

    afterAll(() => {
        server.close()
    })

    /**
     * Test de integración para obtener eventos históricos de la era antes de cristo
     * 1. Caso exitoso : el parametro usado es un string igual a 'ac', usando cada caso de case posible
     */
    test('Debería retornar un status 200 y un body con los eventos históricos de la era antes el cristo, desde el más antiguo al más nuevo', async () => {
        sinon.stub(getHistoricalEvents, 'getHistoricalEvents').returns(eventosJSON.result.events.filter((evn) => evn.date <= 0).sort((a, b) => a.date - b.date))
        const response = await request(app.callback()).get('/api/history/ac')
        const response2 = await request(app.callback()).get('/api/history/AC')
        const response3 = await request(app.callback()).get('/api/history/Ac')
        const response4 = await request(app.callback()).get('/api/history/aC')

        expect(response.status).toBe(200)
        expect(response.body.length).toBeGreaterThan(0)
        expect(response.body[0]).toEqual(getFirstEventBeforeChrist())
        expect(Number(response.body[0].date)).toBeLessThanOrEqual(Number(response.body[1].date))

        expect(response2.status).toEqual(response.status)
        expect(response2.body.length).toEqual(response.body.length)
        expect(response2.body[0]).toEqual(response.body[0])
        expect(response2.body[1]).toEqual(response.body[1])
        expect(response3.status).toEqual(response.status)
        expect(response3.body.length).toEqual(response.body.length)
        expect(response3.body[0]).toEqual(response.body[0])
        expect(response3.body[1]).toEqual(response.body[1])
        expect(response4.status).toEqual(response.status)
        expect(response4.body.length).toEqual(response.body.length)
        expect(response4.body[0]).toEqual(response.body[0])
        expect(response4.body[1]).toEqual(response.body[1])
    })

    /**
     * Test de integración para obtener eventos históricos de la era después de cristo
     * 1. Caso exitoso : el parametro usado es un string igual a 'dc', usando cada caso de case posible
     */
    test('Debería retornar un status 200 y un body con los eventos históricos de la era después de cristo, desde el más antiguo al más nuevo', async () => {
        sinon.stub(getHistoricalEvents, 'getHistoricalEvents').returns(eventosJSON.result.events.filter((evn) => evn.date > 0).sort((a, b) => a.date - b.date))
        const response = await request(app.callback()).get('/api/history/dc')
        const response2 = await request(app.callback()).get('/api/history/DC')
        const response3 = await await request(app.callback()).get('/api/history/Dc')
        const response4 = await request(app.callback()).get('/api/history/dC')

        expect(response.status).toBe(200)
        expect(response.body.length).toBeGreaterThan(0)
        expect(response.body[0]).toEqual(getFirstEventAfterChrist())
        expect(Number(response.body[0].date)).toBeLessThanOrEqual(Number(response.body[1].date))

        expect(response2.status).toEqual(response.status)
        expect(response2.body.length).toEqual(response.body.length)
        expect(response2.body[0]).toEqual(response.body[0])
        expect(response2.body[1]).toEqual(response.body[1])
        expect(response3.status).toEqual(response.status)
        expect(response3.body.length).toEqual(response.body.length)
        expect(response3.body[0]).toEqual(response.body[0])
        expect(response3.body[1]).toEqual(response.body[1])
        expect(response4.status).toEqual(response.status)
        expect(response4.body.length).toEqual(response.body.length)
        expect(response4.body[0]).toEqual(response.body[0])
        expect(response4.body[1]).toEqual(response.body[1])
    })

    /**
     * Test de integración para obtener eventos históricos de la era antes o despues de cristo
     * 2. Caso fallido : el parametro usado es un string de largo = 2, que contiene caracteres alfanuméricos o solo númericos
     */
    test('Debería retornar un status error 400 y un body con el mensaje "Solo se aceptan caracteres no numéricos"', async () => {
        const response = await request(app.callback()).get('/api/history/d1')
        const response2 = await request(app.callback()).get('/api/history/1d')
        const response3 = await request(app.callback()).get('/api/history/11')

        expect(response.status).toBe(400)
        expect(response.body).toEqual({"message": "Solo se aceptan caracteres no numéricos"})

        expect(response2.status).toEqual(response.status)
        expect(response2.body).toEqual(response.body)
        expect(response3.status).toEqual(response.status)
        expect(response3.body).toEqual(response.body)
    })

    /**
     * Test de integración para obtener eventos históricos de la era antes o despues de cristo
     * 3. Caso fallido : el parametro usado es un string de largo != 2
     */
    test('Debería retornar un status error 400 y un body con el mensaje "El input debe ser ac o dc"', async () => {
        const response = await request(app.callback()).get('/api/history/a')
        const response2 = await request(app.callback()).get('/api/history/dac')

        expect(response.status).toBe(400)
        expect(response.body).toEqual({"message": "El input debe ser ac o dc"})

        expect(response2.status).toEqual(response.status)
        expect(response2.body).toEqual(response.body)
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
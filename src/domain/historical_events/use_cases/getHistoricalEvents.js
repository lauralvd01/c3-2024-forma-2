import historicalEventsRepository from '../repository/historicalEventsRepository'

exports.getHistoricalEventsByOcurrence = (ctx) => {
    try {
        const ocurrence = ctx.params.ocurrence
        if (ocurrence === undefined || ocurrence === null) {throw new Error('Occurrence not found')}

        const eventos = historicalEventsRepository.getHistoricalEvents(ctx.params.ocurrence)
        ctx.body = eventos
        ctx.status = 200

    } catch (error) {
        switch (error.message) {
            case 'Occurrence not found':
                ctx.body = {"message": "Occurrence not found"}
                ctx.status = 404
                break;
            
            case 'El input debe ser ac o dc':
                ctx.body = {"message": "El input debe ser ac o dc"}
                ctx.status = 400
                break;
            
            case 'Solo se aceptan caracteres no numéricos':
                ctx.body = {"message": "Solo se aceptan caracteres no numéricos"}
                ctx.status = 400
                break;
            
            default:
                ctx.body = {"message": "Internal server error"}
                ctx.status = 500
                break;
        }
    }
    return ctx
}
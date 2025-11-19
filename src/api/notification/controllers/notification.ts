/**
 * notification controller
 */

import { factories } from '@strapi/strapi'

export default factories.createCoreController('api::notification.notification',({strapi})=>({
    async receive(ctx){
        try {
            const body = await ctx.request.body
            console.log(body)
            return ctx.send({status:200})
        } catch (error) {
            strapi.log.error('Error al crear preferencia de Mercado Pago:', error);
        }
    }
}));

/**
 * notification controller
 */

import { factories } from '@strapi/strapi'

export default factories.createCoreController('api::notification.notification',({strapi})=>({
    async receive(ctx){
        try {
            const body = await ctx.request.body
            const { id } = body.data
     
            await strapi.service('api::notification.notification').checkAndUpdateOrder(id)

            return ctx.send({status:200})
        } catch (error) {
            strapi.log.error('Error al crear preferencia de Mercado Pago:', error);
        }
    }
}));

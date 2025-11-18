/**
 * notification controller
 */

import { factories } from '@strapi/strapi'

export default factories.createCoreController('api::notification.notification',({strapi})=>({
    async create(ctx){
        try {
            const body = await ctx.request.body
            console.log(body)
        } catch (error) {
            strapi.log.error('Error al crear preferencia de Mercado Pago:', error);
        }
    }
}));

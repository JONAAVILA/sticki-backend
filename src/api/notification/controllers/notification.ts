/**
 * notification controller
 */

import { factories } from '@strapi/strapi'
import order from '../../order/controllers/order';

export default factories.createCoreController('api::notification.notification',({strapi})=>({
    async receive(ctx){
        try {
            const body = await ctx.request.body

            const orders = await strapi.entityService.findMany('api::order.order',{populate: '*',locale:'en'})
            console.log("orders:",orders)
            console.log("body:",body)
            return ctx.send({status:200})
        } catch (error) {
            strapi.log.error('Error al crear preferencia de Mercado Pago:', error);
        }
    }
}));

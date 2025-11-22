/**
 * notification controller
 */

import { factories } from '@strapi/strapi'
import order from '../../order/controllers/order';
import { Payment } from 'mercadopago';
import { mercadopago } from '../../../utils/mpConfig';

export default factories.createCoreController('api::notification.notification',({strapi})=>({
    async receive(ctx){
        try {
            const body = await ctx.request.body
            const { id } = body.data

            const payment = await new Payment(mercadopago).get({id})
            const paymentId = payment.additional_info.items[0].id

            const order = await strapi.entityService.findMany(
                'api::order.order',
                {
                    filters: {
                        documentId: {
                            $eq: paymentId,
                        },
                        populate: '*',
                        locale:'en'
                    }
                }
            )

            if(order){
                await strapi.documents('api::order.order').update
            }


            return ctx.send({status:200})
        } catch (error) {
            strapi.log.error('Error al crear preferencia de Mercado Pago:', error);
        }
    }
}));

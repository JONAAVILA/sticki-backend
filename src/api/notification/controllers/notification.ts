/**
 * notification controller
 */

import { factories } from '@strapi/strapi'
import { Payment } from 'mercadopago';
import { mercadopago } from '../../../utils/mpConfig';

export default factories.createCoreController('api::notification.notification',({strapi})=>({
    async receive(ctx){
        try {
            const body = await ctx.request.body
            const { id } = body.data
     
            const payment = await new Payment(mercadopago).get({id})
            const paymentId = payment.additional_info.items[0].id

            await strapi.documents('api::order.order').update({
                documentId:paymentId,
                locale:'en',
                data:{
                    statusOrder:'approved',
                    payment_id:id
                },
                status: 'published',
            });

            return ctx.send({status:200})
        } catch (error) {
            strapi.log.error('Error al crear preferencia de Mercado Pago:', error);
        }
    }
}));

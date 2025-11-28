/**
 * notification service
 */

import { factories } from '@strapi/strapi';
import { mercadopago } from '../../../utils/mpConfig';
import { Payment } from 'mercadopago';

export default factories.createCoreService('api::notification.notification',({strapi})=>({
    async checkAndUpdateOrder(id : string){
        try {
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
            })
        } catch (error) {
            return strapi.log.error
        }
    }
}));

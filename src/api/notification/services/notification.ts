/**
 * notification service
 */

import { factories } from '@strapi/strapi';
import { mercadopago } from '../../../utils/mpConfig';
import { Payment } from 'mercadopago';

const { TEST_MODE } = process.env

export default factories.createCoreService('api::notification.notification',({strapi})=>({
    async checkAndUpdateOrder(id : string){
        try {
            const payment = await new Payment(mercadopago).get({id})
            console.log("payment",payment)
            const paymentId = payment.additional_info.items[0].id

            const isValidPayment =
                payment.live_mode === true &&
                payment.status === "aprovved" &&
                TEST_MODE === "true" ? true : !payment.payer.email.includes("testuser.com")

            if(isValidPayment){
                await strapi.documents('api::order.order').update({
                    documentId:paymentId,
                    locale:'en',
                    data:{
                        statusOrder:'approved',
                        payment_id:id
                    },
                    status: 'published',
                })
            }
        } catch (error) {
            return strapi.log.error
        }
    }
}));

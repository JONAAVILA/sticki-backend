/**
 * check-payment controller
 */

import { factories } from '@strapi/strapi'
import { Payment } from 'mercadopago';
import { mercadopago } from '../../../utils/mpConfig';

export default factories.createCoreController('api::check-payment.check-payment',({strapi})=>({
    async create(ctx){
        try {
            const { id } = ctx.params

            const payment = await new Payment(mercadopago).get({id})
            console.log(payment)
            return payment.status
        } catch (error) {
            strapi.log.error(error)
        }
    }
}));

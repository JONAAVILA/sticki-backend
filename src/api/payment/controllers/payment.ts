import { factories } from '@strapi/strapi';
import { Preference } from 'mercadopago';
import { mercadopago } from '../../../utils/mpConfig';

const preference = new Preference(mercadopago);

export default factories.createCoreController('api::payment.payment',({strapi})=>({
    async create(ctx){
        try {
            const { items } = ctx.request.body

            if(!items || !Array.isArray(items)){
                return ctx.badRequest('Faltan los items del pedido')
            }

            const body = {
                items: items.map(item => ({
                    id:item.id,
                    title: item.title,
                    quantity: item.quantity,
                    unit_price: item.unit_price,
                    currency_id: item.currency_id ?? 'ARS',
                })),
                back_urls: {
                    success: "https://k9z0l866-3000.brs.devtunnels.ms/payment/success",
                    failure: "https://k9z0l866-3000.brs.devtunnels.ms/payment/failure",
                    pending: "https://k9z0l866-3000.brs.devtunnels.ms/payment/pending"
                },
                auto_return: "approved",
            }

            const result = await preference.create({body})
            console.log("result",result)

            return ctx.send(result)
        } catch (error) {
            strapi.log.error('Error al crear preferencia de Mercado Pago:', error);
            ctx.internalServerError('Error al crear preferencia de pago');
        }
    }
}));
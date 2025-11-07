import { factories } from '@strapi/strapi';
import { MercadoPagoConfig, Preference } from 'mercadopago';

const { MP_ACCESS_TOKEN } = process.env

const client = new MercadoPagoConfig({ accessToken: `${MP_ACCESS_TOKEN}` });
const preference = new Preference(client);

export default factories.createCoreController('api::payment.payment',({strapi})=>({
    async create(ctx){
        try {
            const { items } = ctx.request.body

            if(items || !Array.isArray(items)){
                return ctx.badRequest('Faltan los items del pedido')
            }

            const body = {
                items: items.map(item => ({
                    id:'1',
                    title: item.title,
                    quantity: item.quantity,
                    unit_price: item.unit_price,
                    currency_id: item.currency_id ?? 'ARS',
                })),
                back_urls: {
                    success: 'https://tusitio.com/success',
                    failure: 'https://tusitio.com/failure',
                    pending: 'https://tusitio.com/pending',
                },
                auto_return: 'approved',
            }

            const result = preference.create({body})

            ctx.body = {
                result
            }
        } catch (error) {
            strapi.log.error('Error al crear preferencia de Mercado Pago:', error);
            ctx.internalServerError('Error al crear preferencia de pago');
        }
    }
}));
import { factories } from '@strapi/strapi';
import { MercadoPagoConfig, Preference } from 'mercadopago';

const { MP_ACCESS_TOKEN } = process.env

const client = new MercadoPagoConfig({ accessToken: `${MP_ACCESS_TOKEN}` });
const preference = new Preference(client);

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
                    success: "http://localhost:3000/pagos/success",
                    failure: "http://localhost:3000/pagos/failure",
                    pending: "http://localhost:3000/pagos/pending"
                }
            }
            console.log("body",body)

            const result = await preference.create({body})
            console.log("result",result)

            return ctx.send(result)
        } catch (error) {
            strapi.log.error('Error al crear preferencia de Mercado Pago:', error);
            ctx.internalServerError('Error al crear preferencia de pago');
        }
    }
}));
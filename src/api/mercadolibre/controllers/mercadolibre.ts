/**
 * ml-auth controller
 */

import { factories } from '@strapi/strapi'

export default factories.createCoreController('api::mercadolibre.mercadolibre',({strapi})=>({
    async mercado(ctx){
        try {
            return ctx.send("mercado")
        } catch (error) {
            strapi.log.error('ocurrio un error')
        }   
    },
    async payment(ctx){
        try {
            return ctx.send("payment")
        } catch (error) {
            strapi.log.error('ocurrio un error payment')
        }   
    }
}));

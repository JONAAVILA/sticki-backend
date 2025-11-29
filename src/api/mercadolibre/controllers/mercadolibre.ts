/**
 * A set of functions called "actions" for `mercadolibre`
 */

import { factories } from '@strapi/strapi'

export default factories.createCoreController('api::mercadolibre.mercadolibre',({strapi})=>({
    async startAuth(ctx){
        try {
            const redirectUrl = await strapi.service('api::mercadolibre.mercadolibre').buildAuthUrl()

            return ctx.redirect(redirectUrl)
        } catch (error) {
            strapi.log.error('ocurrio un error')
            return ctx.body = { error: 'No se pudo iniciar el flujo de autenticación.' }
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

/**
 * A set of functions called "actions" for `mercadolibre`
 */

import { factories } from '@strapi/strapi'

export default factories.createCoreController('api::mercadolibre.mercadolibre',({strapi})=>({
    async startAuth(ctx){
        try {
            await strapi.service('api::mercadolibre.mercadolibre').buildAuth()

            return ctx.send("Auth completado")
        } catch (error) {
            strapi.log.error('ocurrio un error')
            return ctx.body = { error: 'No se pudo iniciar el flujo de autenticación.' }
        }   
    }
}));

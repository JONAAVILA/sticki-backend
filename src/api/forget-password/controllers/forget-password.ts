/**
 * forget-password controller
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::forget-password.forget-password',({strapi})=>({
    async receive(ctx){
        try {
            const body = await ctx.request.body
            const { email } = JSON.parse(body)

            const resetPassToken = await strapi.service('api::forget-password.forget-password').forgetPassword(email)
            ctx.send(resetPassToken)
        } catch (error) {
            ctx.internalServerError('Error al enviar email:', error);
            strapi.log.error('Error al enviar email:', error);
        }
    }
}));
    
/**
 * forget-password controller
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::forget-password.forget-password',({strapi})=>({
    async receive(ctx){
        try {
            const { email } = ctx.request.body

            const resetPassToken = await strapi.service('api::forget-password.forget-password').forgetPassword(email)
        } catch (error) {
            
        }
    }
}));
    
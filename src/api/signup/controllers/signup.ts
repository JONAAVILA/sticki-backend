/**
 * signup controller
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::signup.signup',({strapi})=>({
    async receive(ctx){
        console.log("ctx",ctx.request)
        return ctx.send("se ejecuto")
    }
}));

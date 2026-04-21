/**
 * user-me controller
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::user-me.user-me',({strapi})=>({
    async getUser(ctx){
        ctx.send("todo ok")
    }
}));

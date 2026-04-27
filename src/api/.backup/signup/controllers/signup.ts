/**
 * signup controller
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::signup.signup',({strapi})=>({
    async receive(ctx){
        try {
            const { data,type } = ctx.state
            console.log("data-signup",data)
            console.log("type",type)
            const { id, image_url, email_addresses, first_name, last_name, external_accounts } = data
            
            const provider = external_accounts.length && external_accounts[0].provider 
            const email = email_addresses[0].email_address
            const userName = email.split("@")[0]
    
            if(type === 'user.created'){

                const isAlreadyEmail = await strapi
                    .query('plugin::users-permissions.user')
                    .findOne({
                        where:{email:email}
                    })

                if(isAlreadyEmail) return ctx.badRequest("El usuario ya existe")

                const role = await strapi
                    .query("plugin::users-permissions.role")
                    .findOne({ where: { type: "authenticated" } })

                if(!role) {
                    throw new Error("No se encontró el rol 'authenticated' en Strapi");
                }
                
                await strapi
                    .plugin("users-permissions")
                    .service("user")
                    .add({
                        name:first_name,
                        lastname:last_name,
                        username:userName,
                        email:email,
                        clerkId:id,
                        role:role.id,
                        confirmed:true,
                        provider:provider,
                        avatar_url:image_url
                    })

                return ctx.send({ status:200 });
            }
        } catch (error) {
            console.log("error webhook",error)
            return ctx.send({ message: 'Evento ignorado' });
        }
    }
}));

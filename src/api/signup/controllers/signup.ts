/**
 * signup controller
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::signup.signup',({strapi})=>({
    async receive(ctx){
        try {
            const { data,type } = ctx.state.user
            const { id, image_url, email_addresses, first_name, last_name, external_accounts } = data
            
            const provider = external_accounts.length && external_accounts[0].provider 
            const email = email_addresses[0].email_address
            const userName = email.split("@")[0]
            console.log("type",type)
    
            if(type === 'user.created'){
                console.log("entro por el type")
                const isAlreadyEmail = await strapi
                    .query('plugin::users-permissions.user')
                    .findOne({
                        where:{email:email}
                    })

                console.log("isalready",isAlreadyEmail)
                if(isAlreadyEmail) return ctx.badRequest("El usuario ya existe")

                const role = await strapi
                    .query("plugin::users-permissions.role")
                    .findOne({ where: { type: "authenticated" } })
                console.log("role",role)
                if(!role) {
                    throw new Error("No se encontró el rol 'authenticated' en Strapi");
                }
                try {
                    const user = await strapi
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

                        console.log("user created",user)
                        
                    return ctx.send({ message: 'Usuario creado' });
                } catch (error) {
                    console.log("error al crear usuario",error)
                }
                
            }
        } catch (error) {
            console.log("error webhook",error)
            return ctx.send({ message: 'Evento ignorado' });
        }
    }
}));

/**
 * signup controller
 */

import { factories } from '@strapi/strapi';
import { Webhook } from 'svix';

const { CLERK_WEBHOOK_SECRET } = process.env

export default factories.createCoreController('api::signup.signup',({strapi})=>({
    async receive(ctx){
        try {
            const headers = ctx.request.headers
            console.log("header",headers)
            const body = JSON.stringify(ctx.request.body)
            console.log("body",body)
            const wh = new Webhook(CLERK_WEBHOOK_SECRET)
            console.log("webhook",wh)
            
            const svix_id = headers["svix-id"];
            console.log("svix_id",svix_id)
            const svix_timestamp = headers["svix-timestamp"];
            console.log("svix_timestamp",svix_timestamp)
            const svix_signature = headers["svix-signature"];
            console.log("svix_signature",svix_signature)
    
            if (!svix_id || !svix_timestamp || !svix_signature || Array.isArray(svix_id) || Array.isArray(svix_timestamp) || Array.isArray(svix_signature)) {
                return ctx.badRequest('Faltan encabezados de Svix o el formato es inválido');
            }
    
            let evt
            try {
                evt = wh.verify(
                    body,
                    {
                        "svix-id": svix_id,
                        "svix-timestamp": svix_timestamp,
                        "svix-signature": svix_signature,
                    }
                )
                console.log("evt",evt)
            } catch (error) {
                console.log("error evt",error)
                return ctx.badRequest('Firma de Webhook inválida')
            }
    
            const { id, image_url, email_addresses, first_name, last_name, external_accounts } = evt.data
            
            console.log("data webhook", id, image_url, email_addresses, first_name, last_name, external_accounts )
            
            const provider = external_accounts.length && external_accounts[0].provider 
            const email = email_addresses[0].email_address
            const userName = email.split("@")[0]
            const type = evt.type
    
            if(type === "user.created"){
                const role = await strapi
                    .query("plugin::users-permissions.role")
                    .findOne({ where: { type: "authenticated" } })
    
                if(!role) {
                    throw new Error("No se encontró el rol 'authenticated' en Strapi");
                }
                
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
    
                console.log("create user",user)
                
                return ctx.send({ message: 'Usuario creado' });
            }else{
                console.log("método no autorizado")
                return 
            }
            
        } catch (error) {
            console.log("error webhook",error)
            return ctx.send({ message: 'Evento ignorado' });
        }
    }
}));

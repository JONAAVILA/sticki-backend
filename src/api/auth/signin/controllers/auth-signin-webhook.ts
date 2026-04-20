import type { Context } from "koa"
import { Webhook } from "svix"

const { CLERK_SECRET_KEY } = process.env

export default {
    async register(ctx:Context){
        const headers = ctx.request.headers
        const payload = JSON.stringify(ctx.request.body)
        const wh = new Webhook(CLERK_SECRET_KEY)

        const svix_id = headers["svix-id"];
        const svix_timestamp = headers["svix-timestamp"];
        const svix_signature = headers["svix-signature"];

        if (!svix_id || !svix_timestamp || !svix_signature || Array.isArray(svix_id) || Array.isArray(svix_timestamp) || Array.isArray(svix_signature)) {
            return ctx.badRequest('Faltan encabezados de Svix o el formato es inválido');
        }

        let evt
        try {
            evt = wh.verify(
                payload,
                {
                    "svix-id": svix_id,
                    "svix-timestamp": svix_timestamp,
                    "svix-signature": svix_signature,
                }
            )
        } catch (error) {
            return ctx.badRequest('Firma de Webhook inválida')
        }

        const { id, email_addresses, first_name, last_name, external_accounts } = evt.data
        const provider = external_accounts.length && external_accounts[0].provider 
        const userName = email_addresses.split("@")[0]
        const email = email_addresses[0].email_addresses
        const type = evt.type

        if(type === "user.created"){
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
                provider:provider
            })
            
            return ctx.send({ message: 'Usuario creado' });
        }
        return ctx.send({ message: 'Evento ignorado' });
    }
}
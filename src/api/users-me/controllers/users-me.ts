/**
 * A set of functions called "actions" for `users-me`
 */
import crypto from "crypto"

export default {
    // user data
    async getUser(ctx,next){
        try {
            const user = await ctx.state.user
            return ctx.send(user)
        } catch (error) {
            strapi.log.error("user-me",error)
            return ctx.unauthorized("Usuario desconocido")        
        }
    },
    async upload(ctx){
        try {
            const body = await ctx.request.body
            const { prop,value } = body
            const { documentId } = await ctx.state.user

            await strapi
                .documents('plugin::users-permissions.user')
                .update({
                    documentId:documentId,
                    data:{
                        [prop]:value
                    }
                })

            return
        } catch (error) {
            strapi.log.error("user-me-upload",error)
            return ctx.unauthorized("Usuario desconocido")        
        }
    },
    async signup(ctx){
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
            strapi.log.error("user-me-signup",error)
            return ctx.unauthorized("Usuario desconocido")    
        }
    },
    async getSignature(ctx,next){
        try {
            const { clerkId } = ctx.state.user

            const user = await strapi
                .query('plugin::users-permissions.user')
                .findOne({
                    where:{clerkId:clerkId}
                })
            const { id } = user

            const timestamp = Math.round(Date.now() / 1000)

            const folder = `${id}/avatar`
            const public_id = `avatar-${id}`
            const overwrite = "true"

            const stringToSign = `folder=${folder}&overwrite=${overwrite}&public_id=${public_id}&timestamp=${timestamp}`

            const signature = crypto
                .createHash("sha1")
                .update(stringToSign + process.env.CLOUDINARY_SECRET)
                .digest("hex")

            return ctx.send({
                timestamp,
                signature,
                folder,
                public_id,
                overwrite,
                cloudName: process.env.CLOUDINARY_NAME,
                apiKey: process.env.CLOUDINARY_KEY,
        })
        } catch (err) {
            console.log(err)
            ctx.throw(500, "Error generando firma")
        }
    },
    // products and cateogories
    async productCategoryCreate(ctx,next){
        try {
            const { name,description } = ctx.request.body
            const { documentId } = ctx.state.user

            const store = await strapi
                .query('api::store.store')
                .findOne({
                    where:{ owner:documentId }
                })

            await strapi.documents('api::product-category.product-category').create({
                data:{
                    name,
                    description,
                    store:store.id,
                    publishedAt: new Date()
                }
            })

            ctx.body = {
                data: `La categoría ${name} se creó con éxito`,
            }
        } catch (error) {
            console.log("error category",error)
            ctx.throw(500, "Error al crear categoría")
        }
    }
};

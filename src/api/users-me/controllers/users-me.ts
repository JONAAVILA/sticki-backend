/**
 * A set of functions called "actions" for `users-me`
 */
import crypto from "crypto"

export default {
    // user data
    async getUser(ctx,next){
        try {
            const user = ctx.state.user
            return ctx.send(user)
        } catch (error) {
            strapi.log.error("user-me",error)
            return ctx.unauthorized("Usuario desconocido")        
        }
    },
    async upload(ctx){
        try {
            const body = ctx.request.body
            const { prop,value } = body
            const { documentId } = ctx.state.user

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
            
            const provider = external_accounts[0].provider ? external_accounts[0].provider : "locale"
            const email = email_addresses[0].email_address
            const userName = email.split("@")[0]
    
            if(type === 'user.created'){

                const isAlreadyEmail = await strapi
                    .query('plugin::users-permissions.user')
                    .findOne({
                        where:{
                            email:email
                        }
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
                        clerk_id:id,
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
    // sign cloudinary
    async getSignature(ctx,next){
        try {
            const { clerkId,id } = ctx.state.user

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
    // locations
    async getLocations(ctx,next){
        try {
            const { id } = ctx.state.user

            const locations = await strapi
                .documents('api::location-user.location-user')
                .findMany({
                    filters:{
                        users_permissions_user:{
                            id:id
                        },
                        is_active:true
                    }
                })

            return ctx.send({
                data:locations
            })
        } catch (error) {
            console.log(error)
            ctx.throw(500, "Error al buscar direcciones")
        }
    },
    async locationsCreate(ctx,next){
        try {
            const { documentId } = ctx.state.user
            const { data } = ctx.request.body
            const { 
                street,
                region,
                place,
                zipCode,
                country,
                door,
                floor,
                number,
                lat,
                long,
                typeAddress,
                instructions 
            } = data

            if(
                !street ||
                !region || 
                !place || 
                !zipCode || 
                !country || 
                !number || 
                !lat || 
                !long
            ) return ctx.throw("Datos faltantes")

            await strapi
                .documents('api::location-user.location-user')
                .create({
                    data:{
                        street,
                        region,
                        place,
                        zipCode,
                        country,
                        door,
                        floor,
                        number,
                        lat,
                        long,
                        typeAddress,
                        instructions,
                        isDefault:false,
                        publishedAt: new Date(),
                        users_permissions_user:documentId,
                        is_active:true
                    }
                })
            
            return ctx.send({
                data: "La dirección se creó con éxito",
            })
        } catch (error) {
            console.log(error)
            ctx.throw(500, "Error al crear direcciones")
        }
    },
    async deleteLocation(ctx,next){
        try {
            const { id } = ctx.params

            await strapi
                .documents('api::location-user.location-user')
                .update({
                    documentId:id,
                    data:{
                        is_active:false
                    }
                })

            return ctx.send({
                data: "La dirección se eliminó con éxito",
            })
        } catch (error) {
            console.log(error)
            return ctx.throw(500, "Error al eliminar dirección")
        }
    },
    //product-cateogories
    async productCategoryCreate(ctx,next){
        try {
            const { name,description,cover,galery } = ctx.request.body
            const { documentId } = ctx.state.user

            const store = await strapi
                .query('api::store.store')
                .findOne({
                    where:{ owner:documentId }
                })

            await strapi
                .documents('api::product-category.product-category')
                .create({
                    data:{
                        cover,
                        galery,
                        name,
                        description,
                        store:store.id,
                        publishedAt: new Date(),
                        is_active:true
                    }
                })

            return ctx.send({
                data: `La categoría ${name} se creó con éxito`,
            })
        } catch (error) {
            console.log("error category",error)
            ctx.throw(500, "Error al crear categoría")
        }
    },
    async getProductCategories(ctx,next){
        try {
            const { documentId } = ctx.state.user
            const store = await strapi
                .query('api::store.store')
                .findOne({
                    where:{ owner:documentId },
                    populate:['categories']
                })
            return ctx.send({
                data:store.categories
            })
        } catch (error) {
            console.log("error category",error)
            ctx.throw(500, "Error al optener las categorías")
        }
    }
};

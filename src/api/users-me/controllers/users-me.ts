/**
 * A set of functions called "actions" for `users-me`
 */

export default {
  // exampleAction: async (ctx, next) => {
  //   try {
  //     ctx.body = 'ok';
  //   } catch (err) {
  //     ctx.body = err;
  //   }
  // }
    async getUser(ctx,next){
        try {
            const { clerkId } = await ctx.state.user

            const user = await strapi
                .query('plugin::users-permissions.user')
                .findOne({
                    where:{clerkId:clerkId}
                })

            return ctx.send(user)
        } catch (error) {
            strapi.log.error("user-me",error)
            return ctx.unauthorized("Usuario desconocido")        
        }
    },
    async upload(ctx){
        try {
            const body = await ctx.request.body
            console.log("body",body)
            const { avatar_url } = body
            const { clerkId } = await ctx.state.user

            const user = await strapi
                .query('plugin::users-permissions.user')
                .findOne({
                    where:{clerkId:clerkId}
                })

            console.log("user upload",user)

            const up = await strapi
                .documents('plugin::users-permissions.user')
                .update({
                    documentId:user.documentId,
                    data:{
                        avatar_url:avatar_url
                    }
                })
            console.log("up",up)
            return
        } catch (error) {
            strapi.log.error("user-me",error)
            return ctx.unauthorized("Usuario desconocido")        
        }
    }
};

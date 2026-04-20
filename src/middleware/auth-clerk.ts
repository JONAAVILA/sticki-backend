import { verifyToken } from "@clerk/backend"

module.exports = (config, { strapi }) => {
  return async (ctx, next) => {
    console.log("ejecuto middle")

    const authHeader = ctx.request.header.authorization

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return await next()
    }

    const token = authHeader.split(' ')[1]

    try {
      const payload = await verifyToken(token, {
        secretKey: process.env.CLERK_SECRET_KEY,
      })

      if (payload) {
        const clerkId = payload.sub

        const [user] = await strapi.entityService.findMany(
          'plugin::users-permissions.user',
          {
            filters: { clerkId },
          }
        )

        if (user) {
          ctx.state.user = user
          ctx.isAuthenticated = true
        }
      }

      return await next()
    } catch (error) {
      console.error('Error de validación en Clerk:', error.message)
      return ctx.unauthorized('Token inválido')
    }
  }
}
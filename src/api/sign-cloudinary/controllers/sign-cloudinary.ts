/**
 * A set of functions called "actions" for `sign-cloudinary`
 */

import crypto from "crypto"

export default ({strapi})=>({
 getSignature: async (ctx) => {
    try {
      console.log("In getSignature action.")
      const user = ctx.state.user
      console.log("user-sign", user)

      if (!user) {
        return ctx.unauthorized("No autenticado")
      }

      const timestamp = Math.round(Date.now() / 1000)

      const folder = `avatars/${user.id}`
      const public_id = "avatar"
      const overwrite = "true"

      const stringToSign = `folder=${folder}&overwrite=${overwrite}&public_id=${public_id}&timestamp=${timestamp}`

      const signature = crypto
        .createHash("sha1")
        .update(stringToSign + process.env.CLOUDINARY_SECRET)
        .digest("hex")

      ctx.send({
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
})

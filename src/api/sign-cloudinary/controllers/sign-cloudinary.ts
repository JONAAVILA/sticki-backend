/**
 * A set of functions called "actions" for `sign-cloudinary`
 */

import crypto from "crypto"

export default {
    getSignature : async (ctx, next) => {
      try {
        const timestamp = Math.round(new Date().getTime() / 1000)

        const signature = crypto
          .createHash("sha1")
          .update(`timestamp=${timestamp}${process.env.CLOUDINARY_SECRET}`)
          .digest("hex")

        ctx.send({
            timestamp,
            signature,
            cloudName:process.env.CLOUDINARY_NAME,
            apiKey:process.env.CLOUDINARY_KEY
        }) 
      } catch (err) {
        console.log('Error al crear preferencia de Mercado Pago:', err);
        return "ocurrió un error"
    }
  }
};

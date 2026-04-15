/**
 * A set of functions called "actions" for `sign-cloudinary`
 */

import signCloudinary from "../services/sign-cloudinary";

export default {
    getSignature : async (ctx, next) => {
      try {
          const data = signCloudinary()
          ctx.send(data)
      } catch (err) {
          console.log('Error al crear preferencia de Mercado Pago:', err);
          return "ocurrió un error"
    }
  }
};

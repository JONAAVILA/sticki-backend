/**
 * sign-cloudinary service
 */

import crypto from "crypto"

export default () => ({
    signSignature(){
        const timestamp = Math.round(new Date().getTime() / 1000)

        const signature = crypto
            .createHash("sha1")
            .update(`timestamp=${timestamp}${process.env.CLOUDINARY_SECRET}`)
            .digest("hex")

        return {
            timestamp,
            signature,
            cloudName:process.env.CLOUDINARY_NAME,
            apiKey:process.env.CLOUDINARY_KEY
        }
    }
});

import { render } from "@react-email/render"
import jwt from "jsonwebtoken"
import type { Context } from "koa"
import React from "react"
import ConfirmEmail from "../../../email/ConfirmationEmail"

const { NODE_ENV,BASE_URL_PROD,BASE_URL_DEV} = process.env
const REDIRECT_URL = NODE_ENV === "production" ? BASE_URL_PROD : BASE_URL_DEV

export default {
    async register(ctx:Context){
        const { email,username,password } = ctx.request.body

        const isCreated = await strapi.query('plugin::users-permissions.user').findOne({
            where:{email:email}
        })
        if(isCreated?.email  === email) ctx.throw(400,"El email ya se encuentra registrado")

        const user = await strapi
            .plugin("users-permissions")
            .service("user")
            .add({
                email,
                username,
                password,
                confirmed:false
            })

        const token = jwt.sign(
            {id:user.id},
            process.env.JWT_SECRET as string,
            {expiresIn: '30d'}
        )

        await strapi.query('plugin::users-permissions.user').update({
            where:{id:user.id},
            data:{confirmationToken:token}
        })

        const url = `${REDIRECT_URL}/auth/email-confirmation?confirmation=${token}`
        
        const html = await render(
            React.createElement(ConfirmEmail,{
                username:user.username,
                inviteLink:url
            })
        )

        await strapi.plugin("email").service("email").send({
            to:email,
            from:"Stiki",
            subject: "Confirmá tu cuenta en Stiki",
            html,
        })

        ctx.send({ ok: true, message: `${username} se envió al email ${email} un link para verificar tu cuenta en Stiki, revisá tu correo de span si no encuentras el email` });
    }
}
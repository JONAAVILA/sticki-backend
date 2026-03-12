/**
 * forget-password service
 */
import * as React from 'react';
import { render } from '@react-email/render';
import { factories } from '@strapi/strapi';
import crypto from "crypto"
import { ConfirmationEmail } from '../../../email/ConfirmationEmail';

export default factories.createCoreService('api::forget-password.forget-password',({strapi})=>({
    async forgetPassword(email:string){
        try {
            const user = await strapi.query('plugin::users-permissions.user').findOne({
                where:{
                    email:email
                }
            })
            if(!user) throw new Error("Email no encontrado")

            const resetPasswordToken = crypto.randomBytes(64).toString('hex')
            console.log("pass",resetPasswordToken)
            
            const update = await strapi.query('plugin::users-permissions.user').update({
                where:{ id:user.id },
                data:{
                    resetPasswordToken:resetPasswordToken
                }
            })
            console.log("update",update)
            
            const emailHtml = await render(
                React.createElement(ConfirmationEmail,{
                    token:resetPasswordToken,
                    baseUrl:"http://localhost:3000"
                })
            )
            console.log("emailHtml",emailHtml)
            
            const send = await strapi.plugins['email'].services.email.send({
                to:email,
                subject:'Restabler contraseña',
                html:emailHtml
            })
            console.log("send",send)

            return {
                ok:true,
                message:'Email enviado'
            }
        } catch (error) {
            throw error
        }
    }
}));

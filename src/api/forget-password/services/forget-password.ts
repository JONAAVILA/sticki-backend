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
            
            await strapi.query('plugin::users-permissions.user').update({
                where:{ id:user.id },
                data:{
                    resetPasswordToken:resetPasswordToken
                }
            })
            
            const emailHtml = await render(
                React.createElement(ConfirmationEmail,{
                    token:resetPasswordToken,
                    baseUrl:"http://localhost:3000"
                })
            )
            
            const send = await strapi.plugins['email'].services.email.send({
                to:email,
                from:'Stiki store',
                subject:'Restabler contraseña',
                html:emailHtml
            })

            return {
                ok:true,
                message:'Email enviado'
            }
        } catch (error) {
            throw error
        }
    }
}));

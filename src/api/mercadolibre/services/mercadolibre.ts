/**
 * mercadolibre service
 */

import { factories } from '@strapi/strapi';

const { CLIENT_ID, CLIENT_SECRET, AUTH_URL, REDIRECT_URI } = process.env

export default factories.createCoreService('api::mercadolibre.mercadolibre',({strapi})=>({
    async buildAuth(){
        type DataResponse  = {
            access_token:string
        }
        const URL = 'https://api.mercadolibre.com/oauth/token'

        const credentials = {
            client_id:CLIENT_ID,
            client_secret:CLIENT_SECRET,
            grant_type: "client_credentials"
        }

        const credentialsParse = JSON.stringify(credentials)

        try {
            const res = await fetch(URL,{
                method:'POST',
                headers:{
                    "Content-Type": "application/json",
                },
                body:credentialsParse
            })

            const data = await res.json() as DataResponse
            const { access_token } = data

            const response = await fetch('https://api.mercadolibre.com/items/MLA1398714241/shipping_options?zip_code=1882',{
                method:'GET',
                headers:{
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${access_token}`,
                }
            })

            const dataShipment = await response.json()

            console.log('shipment',dataShipment)
        } catch (error) {
            return strapi.log.info('errorLog',error)
        }
    }
}));

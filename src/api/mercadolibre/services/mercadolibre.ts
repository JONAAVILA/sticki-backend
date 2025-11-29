/**
 * mercadolibre service
 */

import { factories } from '@strapi/strapi';

const { CLIENT_ID, CLIENT_SECRET, AUTH_URL, REDIRECT_URI } = process.env

export default factories.createCoreService('api::mercadolibre.mercadolibre',({strapi})=>({
    async buildAuth(){
        const URL = 'https://api.mercadolibre.com/oauth/token'

        const data = {
            client_id:CLIENT_ID,
            client_secret:CLIENT_SECRET,
            grant_type: "client_credentials"
        }

        const dataParse = JSON.stringify(data)

        try {
            const res = await fetch(URL,{
                method:'POST',
                headers:{
                    "Content-Type": "application/json",
                },
                body:dataParse
            })

            const data = await res.json()

            const response = await fetch('https://api.mercadolibre.com/items/MLA1398714241/shipping_options?zip_code=1843y',{
                method:'GET',
                headers:{
                    "Content-Type": "application/json",
                    Authorization: `Bearer APP_USR-8432012284158585-112910-6d92d21b73a86e7b6db85d795f468164-74051616`,
                }
            })

            const dataShipment = await response.json()

            console.log('shipment',dataShipment)
        } catch (error) {
            return strapi.log.info('errorLog',error)
        }
    }
}));

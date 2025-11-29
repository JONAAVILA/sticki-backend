/**
 * mercadolibre service
 */

import { factories } from '@strapi/strapi';

const { CLIENT_ID, AUTH_URL, REDIRECT_URI } = process.env

export default factories.createCoreService('api::mercadolibre.mercadolibre',({strapi})=>({
    async buildAuthUrl(){
        const url = `${AUTH_URL}?response_type=code&client_id=${CLIENT_ID}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}`
        
        strapi.log.info("Iniciando auth meli")

        return url
    }
}));

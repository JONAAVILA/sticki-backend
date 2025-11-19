import { MercadoPagoConfig } from 'mercadopago';

const { MP_ACCESS_TOKEN } = process.env

export const mercadopago = new MercadoPagoConfig({ accessToken: `${MP_ACCESS_TOKEN}` });
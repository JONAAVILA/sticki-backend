/**
 * ml-auth router
 */


export default {
  routes: [
    {
      method: 'POST',
      path: '/mercadolibres',
      handler: 'mercadolibre.mercado',
      config: {
        auth: false,
      },
    },
    {
      method: 'POST',
      path: '/mercadolibres/payment',
      handler: 'mercadolibre.payment',
      config: {
        auth: false,
      },
    },
  ],
};


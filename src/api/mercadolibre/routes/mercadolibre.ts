export default {
  routes: [
    {
      method: 'POST',
      path: '/mercadolibres/auth/redirect',
      handler: 'mercadolibre.startAuth',
      config: {
        auth: false,
      },
    },
    // {
    //   method: 'POST',
    //   path: '/mercadolibres/auth/callback',
    //   handler: 'mercadolibre.mercado',
    //   config: {
    //     auth: false,
    //   },
    // },
    // {
    //   method: 'POST',
    //   path: '/mercadolibres/shipments',
    //   handler: 'mercadolibre.payment',
    //   config: {
    //     auth: false,
    //   },
    // },
  ],
};

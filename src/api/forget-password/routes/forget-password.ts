/**
 * forget-password router
 */

export default {
  routes: [
    {
      method: 'POST',
      path: '/forget-password',
      handler: 'forget-password.receive',
      config: {
        auth: false,
      },
    },
  ],
};
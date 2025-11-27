/**
 * notification router
 */

export default {
  routes: [
    {
      method: 'POST',
      path: '/notifications/payments',
      handler: 'notification.receive',
      config: {
        auth: false,
      },
    },
  ],
};

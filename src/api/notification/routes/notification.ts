/**
 * notification router
 */

export default {
  routes: [
    {
      method: 'POST',
      path: '/notifications',
      handler: 'notification.receive',
      config: {
        auth: false,
      },
    },
  ],
};

/**
 * notification router
 */

export default {
  routes: [
    {
      method: 'PUT',
      path: '/notifications',
      handler: 'notification.receive',
      config: {
        auth: false,
      },
    },
  ],
};

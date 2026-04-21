/**
 * signup router
 */

export default {
  routes: [
    {
      method: 'POST',
      path: '/auth/signup-webhook',
      handler: 'signup.receive',
      config: {
        auth: false,
      },
    },
  ],
};

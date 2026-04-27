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
        middlewares:['api::signup.clerk-webhook'],
        auth: false
      }
    },
  ],
};

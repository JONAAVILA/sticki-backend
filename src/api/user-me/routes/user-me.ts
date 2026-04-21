/**
 * user-me router
 */

export default {
  routes: [
    {
      method: 'POST',
      path: 'user/user-me',
      handler: 'user-me.getUser',
      config: {
        auth: false,
      },
    },
  ],
};

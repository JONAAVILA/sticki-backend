/**
 * user-me router
 */

export default {
  routes: [
    {
      method: 'GET',
      path: '/user/user-me',
      handler: 'user-me.getUser',
      config: {
        auth: false,
      },
    },
  ],
};

export default {
  routes: [
    {
     method: 'GET',
     path: '/users-me',
     handler: 'users-me.getUser',
     config: {
        middlewares: ['api::users-me.user-me-middleware'],
        auth: false
     },
    },
    {
     method: 'PUT',
     path: '/users-me/upload',
     handler: 'users-me.upload',
     config: {
        middlewares: ['api::users-me.user-me-middleware'],
        auth: false
     },
    },
  ],
};

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
      {
         method: 'POST',
         path: '/users-me/signup',
         handler: 'users-me.signup',
         config: {
            middlewares: ['api::users-me.signup-webhook-middleware'],
            auth: false
         },
      },
      {
         method: 'GET',
         path: '/users-me/signature',
         handler: 'users-me.getSignature',
         config: {
            middlewares: ['api::users-me.user-me-middleware'],
            auth: false
         },
      },
      {
         method: 'GET',
         path: '/users-me/locations',
         handler: 'users-me.getLocations',
         config: {
            middlewares: ['api::users-me.user-me-middleware'],
            auth: false
         },
      },
      {
         method: 'POST',
         path: '/users-me/categories/create',
         handler: 'users-me.productCategoryCreate',
         config: {
            middlewares: ['api::users-me.user-me-middleware'],
            auth: false
         },
      },
      {
         method: 'GET',
         path: '/users-me/categories',
         handler: 'users-me.getProductCategories',
         config: {
            middlewares: ['api::users-me.user-me-middleware'],
            auth: false
         },
      },
   ],
};

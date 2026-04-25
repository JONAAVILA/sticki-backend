export default {
  routes: [
    {
     method: 'GET',
     path: '/cloudinary-sign',
     handler: 'cloudinary-sign.getSignature',
     config: {
        middlewares: ['api::cloudinary-sign.cloudinary-middleware'],
        auth: false
     },
    },
  ],
};

module.exports = {
  routes: [
    {
      method: "POST",
      path: "/auth/signin-webhook",
      handler: "auth.register",
      config: {
        auth: false,
      },
    },
    // {
    //   method: "GET",
    //   path: "/auth/confirm",
    //   handler: "confirm.confirm",
    //   config: {
    //     auth: false,
    //   },
    // },
  ],
};
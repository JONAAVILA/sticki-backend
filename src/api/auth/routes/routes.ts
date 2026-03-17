module.exports = {
  routes: [
    {
      method: "POST",
      path: "/auth/register",
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
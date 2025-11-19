/**
 * check-payment router
 */
export default {
  routes: [
    {
      method: "GET",
      path: "/check-payments/:id",
      handler: "check-payment.create",
    }
  ]
};

/**
 * A set of functions called "actions" for `user-me`
 */

export default {
  getUser: async (ctx, next) => {
    try {
      ctx.body = 'ok';
    } catch (err) {
      ctx.body = err;
    }
  }
};

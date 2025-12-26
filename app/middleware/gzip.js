module.exports = (options,app) => {
  return async function gzip(ctx, next) {
      ctx.state.cdn = app.config.cdn
      ctx.state.testcdn = app.config.testcdn
      await next();
  };
};
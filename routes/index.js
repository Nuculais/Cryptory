module.exports = (router) => {
  router.prefix('/v1')
  router.use('/profile', require('./profile'))
}

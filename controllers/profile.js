const Coin = require('../model/Coin')
const User = require('../model/User')

async function findAll(ctx) {

// Fetch all Todo’s from the database and return as payload
  const profile = await Coin.find({})
  ctx.body = profile
}

async function findOne(ctx) {

// Fetch all Todo’s from the database and return as payload
  const profile = await User.find({})
  ctx.body = profile
}

async function create(ctx) {
  // Create New Todo from payload sent and save to database
  const newCoin = new Coin(ctx.request.body)
  const savedCoin = await newCoin.save()
  ctx.body = savedCoin
}

async function destroy(ctx) {
  // Get id from url parameters and find Todo in database
  const id = ctx.params.id
  const coin = await Coin.findById(id)

  // Delete todo from database and return deleted object as reference
  const deletedCoin = await coin.remove()
  ctx.body = deletedCoin
}

async function update(ctx) {
  // Find Todo based on id, then toggle done on/off
  const id = ctx.params.id
  const coin = await Coin.findById(id)
  coin.done = !coin.done

  // Update todo in database
  const updatedCoin = await coin.save()
  ctx.body = updatedCoin
}

module.exports = {
  findAll,
  create,
  destroy,
  update
}

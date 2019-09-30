const isAdmin = (req, res, next) => {
  try {
    const user = req.user
    if (user.isAdmin) next()
    else throw new Error()
  } catch (err) {
    console.log(err.message)
    res.status(403).send({ statusCode: 403, message: 'You are not an admin' })
  }
}

module.exports = isAdmin
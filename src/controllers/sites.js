const { Site } = require('../database/models')
const trunks = require('trunks-log')

const log = new trunks('SITES')

const index = async (_req, res) => {
  try {
    const sites = await Site.find().exec()

    res.json({ sites })
  } catch (error) {
    log.error(error, 'Could not retrieve sites: {}', error.message)
    res.json({ error: error, message: 'Could not retrieve sites' }).status(500)
  }
}

const store = async (req, res) => {
  const site = new Site(req.body)

  try {
    const createdSite = await site.save()

    res.status(201).json({ site: createdSite })
  } catch (error) {
    log.error(error, 'Error creating site: {}')
    let errStatus = error.name === 'ValidationError' ? 400 : 500
    res.status(errStatus).json({ error })
  }
}

const show = async (req, res) => {
  try {
    const site = await Site.findById(req.params.id).exec()

    res.status(200).json({ site })
  } catch (error) {
    log.error(error, 'Could not find site: {}', req.params.id)
    res.status(500).json({ error })
  }
}

const destroy = async (req, res) => {
  try {
    await Site.findByIdAndRemove(req.params.id)

    res.status(204).send()
  } catch (error) {
    log.error(error, 'Error finding site: {}', req.params.id)
  }
}

const update = async (req, res) => {
  try {
    const site = await Site.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    }).exec()

    res.status(200).json({ site })
  } catch (error) {
    log.error(error, 'Could not update site: {}', req.params.id)
    res.status(500).json({ error })
  }
}

module.exports = { index, store, show, destroy, update }

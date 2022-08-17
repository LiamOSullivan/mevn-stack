const mongoose = require('mongoose')

const definition = {
  name: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  site_id: {
    type: Number,
    required: true,
  },
  terrain_type: {
    type: String,
    required: true,
  },
}

const options = {
  timestamps: true,
}

const siteSchema = new mongoose.Schema(definition, options)

module.exports = mongoose.model('Site', siteSchema)

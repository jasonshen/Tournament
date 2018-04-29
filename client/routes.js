const express = require('express')
const router = express.Router()

const FormData = require('form-data')
const path = require('path')
const fs = require('fs')
const fetch = require('node-fetch')
const shortid = require('shortid')
const multer = require('multer')
const upload = multer({
  dest: './images/',
  filename: (req, file, cb) => {
    return 'images/' + shortid.generate() + path.extname(file.originalname);
  }
})

const API_KEY = '9MCPCH3YgGrsTvr68kCzng'
const DEST_PATH = '/images/'

const base64 = (filename, data) => {
  var ext = path.extname(filename).substr(1)
  ext = ext || 'png'
  return 'data:image/' + ext + ';base64,' + data.toString('base64')
}

router.post('/check', upload.single('file'), (req, res, next) => {
  if (!req.file) {
    const error = new Error('Missing image.')
    error.status = 400
    return next(error)
  }

  const imageData = fs.readFileSync(req.file.path)

  const form = new FormData()
  form.append('api_key', API_KEY)
  form.append('image_contents', base64(req.file.originalname, imageData))

  return fetch('https://www.headlightlabs.com/api/gcpd_lookup', {
    method: 'POST',
    body: form,
  }).then((res) => {
    return res.json()
  }).then((json) => {
    if (json.errors) throw json.errors
    res.status(200).json(json)
  }).catch((err) => {
    next(err)
  })
})

router.post('/report', upload.single('file'), (req, res, next) => {
  if (!req.file) {
    const error = new Error('Missing image.')
    error.status = 400
    return next(error)
  }

  const imageData = fs.readFileSync(req.file.path)
  const form = new FormData()
  form.append('api_key', API_KEY)
  form.append('image_contents', base64(req.file.originalname, imageData))

  return fetch('https://www.headlightlabs.com/api/gcpd_report', {
    method: 'POST',
    body: form,
  }).then((res) => {
    return res.json()
  }).then((json) => {
    if (json.errors) throw json.errors
    res.status(200).json(json)
  }).catch((err) => {
    next(err)
  })
})

module.exports = router
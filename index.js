'use strict';

var postcss = require('postcss')
var functions = require('postcss-functions')
var blend = require('./src/blend.js')

module.exports = postcss.plugin('color-blend', function () {
  return postcss().use(functions({
    functions: blend
  }))
})

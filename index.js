const combine = require('depject')
const entry = require('depject/entry')
const nest = require('depnest')
const bulk = require('bulk-require')

// const git = require('patch-git')
const horcrux = require('ssb-horcrux')
const patchbay = { patchbay: bulk(__dirname, [ '!(node_modules|junk)/**/*.js' ]) }
const patchcore = require('patchcore')

// polyfills
require('setimmediate')

// from more specialized to more general
const sockets = combine(
  // git,
  horcrux,
  patchbay,
  patchcore
)

const api = entry(sockets, nest('app.html.app', 'first'))

const app = api.app.html.app()
document.body.appendChild(app)


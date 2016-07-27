var fs = require('fs')
var rollup = require('rollup')
var uglify = require('uglify-js')
var babel = require('rollup-plugin-babel')
var version = process.env.VERSION || require('../package.json').version
var banner =
    "/**\n" +
    " * vue-doctitle v" + version + "\n" +
    " * (c) " + new Date().getFullYear() + " bblue000\n" +
    " * https://github.com/vue-tool/vue-doctitle\n" +
    " * Released under the MIT License.\n" +
    " */\n";

rollup.rollup({
  entry: 'src/vue-doctitle.js',
  plugins: [
    babel({
      loose: 'all'
    })
  ]
})
.then(function (bundle) {
  return write('dist/vue-doctitle.js', bundle.generate({
    format: 'umd',
    banner: banner,
    moduleName: 'VueDocTitle'
  }).code)
})
.then(function () {
  return write(
    'dist/vue-doctitle.min.js',
    banner + '\n' + uglify.minify('dist/vue-doctitle.js').code
  )
})
.catch(logError)

function write (dest, code) {
  return new Promise(function (resolve, reject) {
    fs.writeFile(dest, code, function (err) {
      if (err) return reject(err)
      console.log(blue(dest) + ' ' + getSize(code))
      resolve()
    })
  })
}

function getSize (code) {
  return (code.length / 1024).toFixed(2) + 'kb'
}

function logError (e) {
  console.log(e)
}

function blue (str) {
  return '\x1b[1m\x1b[34m' + str + '\x1b[39m\x1b[22m'
}
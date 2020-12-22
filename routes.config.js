const path = require('path')
const resolveSrc = (_path) => {
  return path.resolve(__dirname, `./src/${_path}`)
}
const resolvePublic = (_path) => {
  return path.resolve(__dirname, `./public/${_path}`)
}


module.exports = {
  'index': {
    filename: 'index.html',
    title: 'index',
    template: resolvePublic('index.html'),
    entryFile: resolveSrc('index.js'),
    //chunks: ['main']
  },
  'test': {
    filename: 'test/index.html',
    title: 'test',
    template: resolvePublic('index.html'),
    entryFile: resolveSrc('pages/test/index.js'),
    chunks: ['test']
  }
}

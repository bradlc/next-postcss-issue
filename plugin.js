const fs = require('fs')
const path = require('path')

const PLUGIN_NAME = 'example'
const dependency = path.resolve('.dependency')

if (fs.existsSync(dependency)) {
  fs.unlinkSync(dependency)
}

module.exports = () => {
  return {
    postcssPlugin: PLUGIN_NAME,
    plugins: [
      function (root, result) {
        if (!fs.existsSync(dependency)) {
          fs.closeSync(fs.openSync(dependency, 'w'))
        }

        result.messages.push({
          type: 'dependency',
          plugin: PLUGIN_NAME,
          parent: result.opts.from,
          file: dependency,
        })

        return root
      },
    ],
  }
}

module.exports.postcss = true

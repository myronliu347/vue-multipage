var glob = require('glob')
var path = require('path')
var fs = require('fs')
var chalk = require('chalk')

var ENTRY = 'main.js'
var PAGE_FLODER = path.resolve(__dirname, '../src/pages/')
var PAGES = PAGE_FLODER + '/**/' + ENTRY
var TEMPLATE = 'index.html'

function initPages () {
  var pages = {}
  glob.sync(PAGES).forEach(function (entry) {
    var pageName = getPageName(entry)
    var templatePath = getTemplatePath(entry)
    if (!fs.existsSync(templatePath)) {
      console.log(chalk.yellow(pageName + '找不到模板文件'))
      return
    }

    pages[pageName] = {
      name: pageName,
      entry: entry,
      template: templatePath
    }
  })

  return pages
}

function getPageName (filePath) {
  return filePath.substring(PAGE_FLODER.length + 1, filePath.indexOf(ENTRY) - 1)
}

function getTemplatePath (filePath) {
  var templatePath = filePath.substring(0, filePath.indexOf(ENTRY))
  templatePath += TEMPLATE
  return templatePath
}

module.exports = initPages()

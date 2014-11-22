#!/usr/bin/env node

var cheerio = require('cheerio')
var req = require('request')

var search = process.argv[2]

var errorEmoji = '❗'
if (!search) {
  console.log(errorEmoji + ' problem: empty search term')
  process.exit(1)
} else {
  getWikiPage(search)
  console.log(search + '...')
}

function getWikiPage(name) {
  var wikiPage = 'http://en.wikipedia.org/wiki/' +
    search.replace(' ', '_')
  console.log(wikiPage)

  req( wikiPage, function(err, response, data) {

    if (err) {
      console.log(errorEmoji + err)
      process.exit(1)
    }

    if (response.statusCode === 404) {
      console.log(errorEmoji + ' problem: ' + wikiPage +
        ' can\'t be found!')
      process.exit(1)
    }

    if (response.statusCode === 200) {
      var $ = cheerio.load(data)

      var firstLinkName = $('p a')[0].children[0].data
      console.log(firstLinkName + '...')

      var firstLink = $('p a')[0].attribs.href.replace('/wiki', '')
      console.log(firstLink)
    }

  })
}


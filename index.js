#!/usr/bin/env node
console.log() // seperate output from rest of shell activity

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

var visitedPages = []

function getWikiPage(name) {
  var wikiPage = 'http://en.wikipedia.org/wiki/' +
    name.replace(' ', '_')
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

      var validLinks = $('p>a')

      var firstLinkName = validLinks[0].children[0].data
      console.log('\nlinks to ' + firstLinkName + '...')

      var firstLink = validLinks[0].attribs.href.replace('/wiki/', '')

      if ( visitedPages.indexOf(firstLink) >= 0 ) {
        console.log('You reached full circle! The stream ends.')
      } else {
        getWikiPage(firstLink)
        visitedPages.push(firstLink)
      }
    }

  })
}



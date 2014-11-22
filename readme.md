# wiki-stream

[![NPM](https://nodei.co/npm/wiki-stream.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/wiki-stream/)

An automated explorer of the vast river that is Wikipedia.

### usage

Specify a title of a wikipedia page, and **wikistream** will 'click' a random
link on the page to another page, and repeat the process.

```
wikistream Circle

http://en.wikipedia.org/wiki/circle
circle...

links to foci...
http://en.wikipedia.org/wiki/Focus_(geometry)

...
```

The 'swimming' continues until you reach full circle (i.e. Finding a page that
has been found before), until there is an error (sadly this happens quite a
lot), or until you hit 'ctrl c'.

### why?

I don't really know. The program was inspired by the 'wikiwar' game people
play, and the fact that clicking the first link outside of parentheses on a
Wikipedia article always leads to the philosophy page.

I don't really know.

### dependencies

Don't panic! These are all managed by NPM.

* `cheerio` works like jQuery on HTTP data. Very cool and easy.

* `request` makes HTTP requests. Simple as.


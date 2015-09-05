require('rimraf').sync('./test/db')

var test = require('tape')
var levi = require('../')

var down = require('jsondown')
// var down = require('leveldown')

var lv = levi('./test/db', { db: down })
  .use(levi.tokenizer())
  .use(levi.stemmer())
  .use(levi.stopword())

var live = lv.liveStream('hello lorem sucks')

test('CRUD', function (t) {
  lv.put('a', {
    a: 'hello world',
    b: 'the world sucks'
  }, {
    fields: {a: 2, b: 1}
  }, function (err) {
    t.notOk(err)
  })
  lv.put(
    'b',
   'Lorem Ipsum sucks text of the printing and typesetting industry.',
   function (err) {
    t.notOk(err)
  })
  lv.put(
    'c',
   'Aldus PageMaker including versions of Lorem Ipsum.',
   function (err) {
    t.notOk(err)
    t.end()
  })
})

test('Search', function (t) {
  live
  .each(console.log.bind(console, 'live'))

  lv
  .searchStream('hello lorem sucks')
  .each(console.log.bind(console, 'search'))
})
import crypto = require('crypto')
import tape = require('tape')
import { sha256js, sha256nodeCrypto } from '../';

var inputs = [
  ['', 'ascii'],
  ['abc', 'ascii'],
  ['123', 'ascii'],
  ['123456789abcdef123456789abcdef123456789abcdef123456789abcdef', 'ascii'],
  ['123456789abcdef123456789abcdef123456789abcdef123456789abc', 'ascii'],
  ['123456789abcdef123456789abcdef123456789abcdef123456789ab', 'ascii'],
  ['0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcde', 'ascii'],
  ['0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef', 'ascii'],
  ['foobarbaz', 'ascii']
]

tape("hash is the same as node's crypto", function (t) {
  inputs.forEach(function (v: string[]) {
    const a = new sha256js().update(v[0], v[1]).digest('hex')
    const e = crypto.createHash('sha256').update(v[0], v[1] as any).digest('hex')
    const f = new sha256nodeCrypto().update(v[0], v[1]).digest('hex');
    console.log(a, '==', e)
    t.equal(a, e)
  })

  t.end()
})

tape('call update multiple times', function (t) {
  inputs.forEach(function (v) {
    const hash = new sha256js()
    const _hash = crypto.createHash('sha256')

    for (let i = 0; i < v[0].length; i = (i + 1) * 2) {
      const s = v[0].substring(i, (i + 1) * 2)
      hash.update(s, v[1])
      _hash.update(s, v[1] as any)
    }

    const a = hash.digest('hex')
    const e = _hash.digest('hex')
    console.log(a, '==', e)
    t.equal(a, e)
  })
  t.end()
})

tape('call update twice', function (t) {
  const _hash = crypto.createHash('sha256')
  const hash = new sha256js()

  _hash.update('foo', 'ascii')
  hash.update('foo', 'ascii')

  _hash.update('bar', 'ascii')
  hash.update('bar', 'ascii')

  _hash.update('baz', 'ascii')
  hash.update('baz', 'ascii')

  const a = hash.digest('hex')
  const e = _hash.digest('hex')

  t.equal(a, e)
  t.end()
})

tape('hex encoding', function (t) {
  inputs.forEach(function (v) {
    const hash = new sha256js()
    const _hash = crypto.createHash('sha256')

    for (let i = 0; i < v[0].length; i = (i + 1) * 2) {
      const s = v[0].substring(i, (i + 1) * 2)
      hash.update(Buffer.from(s, 'ascii').toString('hex'), 'hex')
      _hash.update(Buffer.from(s, 'ascii').toString('hex'), 'hex' as any)
    }
    const a = hash.digest('hex')
    const e = _hash.digest('hex')

    console.log(a, '==', e)
    t.equal(a, e)
  })

  t.end()
})

tape('call digest for more than MAX_UINT32 bits of data', function (t) {
  const _hash = crypto.createHash('sha256')
  const hash = new sha256js()
  const bigData = Buffer.alloc(0x1ffffffff / 8)

  hash.update(bigData)
  _hash.update(bigData)

  const a = hash.digest('hex')
  const e = _hash.digest('hex')

  t.equal(a, e)
  t.end()
})
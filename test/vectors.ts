import tape = require('tape')
// @ts-ignore
import vectors = require('hash-test-vectors')

import { hashSha256, sha256js } from '../';

function makeTest (alg: string, i: number, verbose?: boolean) {
  const v = vectors[i]

  tape(alg + ': NIST vector ' + i, function (t) {
    if (verbose) {
      console.log(v)
      console.log('VECTOR', i)
      console.log('INPUT', v.input)
      console.log(Buffer.from(v.input, 'base64').toString('hex'))
    }

    const buf = Buffer.from(v.input, 'base64')
    t.equal(hashSha256(buf).toString('hex'), v[alg])

    i = ~~(buf.length / 2)
    let buf1 = buf.slice(0, i)
    let buf2 = buf.slice(i, buf.length)

    console.log(buf1.length, buf2.length, buf.length)

    t.equal(
      new sha256js()
        .update(buf1)
        .update(buf2)
        .digest('hex'),
      v[alg]
    )

    let j, buf3

    i = ~~(buf.length / 3)
    j = ~~(buf.length * 2 / 3)
    buf1 = buf.slice(0, i)
    buf2 = buf.slice(i, j)
    buf3 = buf.slice(j, buf.length)

    t.equal(
      new sha256js()
        .update(buf1)
        .update(buf2)
        .update(buf3)
        .digest('hex'),
      v[alg]
    )

    t.end()
  })
}

vectors.forEach(function (v: object, i: number) {
  makeTest('sha256', i)
})
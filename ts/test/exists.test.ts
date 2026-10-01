
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { EuropepmcSDK } from '..'


describe('exists', async () => {

  test('test-mode', () => {
    const testsdk = EuropepmcSDK.test()
    equal(testsdk instanceof EuropepmcSDK, true,
      'EuropepmcSDK.test() must return a client synchronously')
  })

})

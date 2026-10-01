

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'
import { createLiveTransport } from '../../live-runner'
import { runLiveEntity } from '../../live-entity'


import { EuropepmcSDK, BaseFeature, stdutil } from '../../..'

import {
  envOverride,
  liveClientOptions,
  liveDelay,
  loadEnvLocal,
  makeCtrl,
  makeMatch,
  makeReqdata,
  makeStepData,
  makeValid,
  maybeSkipControl,
} from '../../utility'


loadEnvLocal(__dirname + '/../../../.env.local')


describe('ArticleEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when EUROPEPMC_TEST_LIVE=TRUE.
  afterEach(liveDelay('EUROPEPMC_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = EuropepmcSDK.test()
    const ent = testsdk.Article()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.EUROPEPMC_TEST_LIVE
    for (const op of ['load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'article.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"hitCount":{"a":true,"h":"Hit Count","n":"hitCount","r":false,"t":"`$INTEGER`","key$":"hitCount","index$":0},"id":{"a":true,"h":"Id","n":"id","r":false,"t":"`$STRING`","key$":"id","index$":1},"result":{"a":true,"h":"Result","n":"result","r":false,"t":"`$OBJECT`","key$":"result","index$":2},"version":{"a":true,"h":"Version","n":"version","r":false,"t":"`$STRING`","key$":"version","index$":3}},"id":{"field":"id","name":"id","parts":["source","id"],"sep":"/"},"name":"article","op":{"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /article/{source}/{id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"id","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"source","or":"source","r":true,"t":"`$STRING`","index$":1}],"query":[{"a":true,"ex":"json","k":"query","n":"format","or":"format","r":false,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/article/{source}/{id}","q":{"exist":["format","id","source"]},"r":{},"s":[{"lit":"article"},{"var":"source"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"article","name__orig":"article","Name":"Article","name_":"article","name-":"article","NAME":"ARTICLE","index$":0}, {"active":true,"entity":"article","key$":"BasicArticleFlow","kind":"basic","name":"BasicArticleFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"article_ref01","srcdatavar":"article_ref01_data","suffix":"_dt0"},"m":{"id":"article01","source":"source01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-article_ref01"}}]}]}, 'Article', {"GET /article/{source}/{id}":{"protocol":"http","parameters":[{"name":"source","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"id","in":"path","required":true,"schema":{"type":"string"},"index$":1},{"name":"format","in":"query","schema":{"type":"string","default":"json","enum":["json"]},"index$":2}]}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let article_ref01_data = Object.values(setup.data.existing.article)[0] as any

    // LOAD
    const article_ref01_ent = client.Article()
    const article_ref01_match_dt0: any = {}
    article_ref01_match_dt0.id = article_ref01_data.id
    const article_ref01_data_dt0 = (await article_ref01_ent.load(article_ref01_match_dt0)).data()
    assert(article_ref01_data_dt0.id === article_ref01_data.id)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/article/ArticleTestData.json')

  // TODO: file ready util needed?
  const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8')

  // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
  const entityData = JSON.parse(entityDataSource)

  options.entity = entityData.existing

  let client = EuropepmcSDK.test(options, extra)
  const struct = client.utility().struct
  const merge = struct.merge
  const transform = struct.transform

  let idmap = transform(
    ['article01','article02','article03','source01'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'EUROPEPMC_TEST_ARTICLE_ENTID': idmap,
    'EUROPEPMC_TEST_LIVE': 'FALSE',
    'EUROPEPMC_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['EUROPEPMC_TEST_ARTICLE_ENTID']

  const live = 'TRUE' === env.EUROPEPMC_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['EUROPEPMC_TEST_ARTICLE_ENTID']
    idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {}
    if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
      throw new Error('Live ENTID must be a JSON object')
    }
    client = new EuropepmcSDK(merge([
      // FIRST, so the generated fields below win: sdk-test-control.json's
      // test.client.options adds to the live client, it does not redirect it.
      liveClientOptions(),
      {
      },
      // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
      // last entry is undefined, and basicSetup is normally called with no
      // argument at all - so a bare 'extra' silently discarded the apikey
      // and server values above and handed the SDK undefined. Harmless
      // while there was nothing in that object; not harmless now.
      extra || {},
      { system: { fetch: transport.fetch } }
    ]))
  }

  const setup = {
    idmap,
    env,
    options,
    client,
    struct,
    data: entityData,
    explain: 'TRUE' === env.EUROPEPMC_TEST_EXPLAIN,
    live,
    transport,
    now: Date.now(),
  }

  return setup
}
  

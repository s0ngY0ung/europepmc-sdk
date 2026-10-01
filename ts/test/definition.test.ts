import { describe, test } from 'node:test'
import { SDK } from '..'
import { runDefinitionPoint } from './definition-runner'
import { isControlSkipped } from './utility'


// Generated from the API definition, not from the model this SDK was built
// from: the route, the declared query parameters, the credential the security
// scheme names, and the definition's own response example.
const PLAN: any[] = [
  {
    "entity": "article",
    "accessor": "Article",
    "op": "load",
    "method": "GET",
    "path": "/article/{source}/{id}",
    "args": [
      {
        "name": "id",
        "wire": "id",
        "value": "p1"
      },
      {
        "name": "source",
        "wire": "source",
        "value": "p2"
      }
    ],
    "select": {
      "format": "v1"
    },
    "headers": [],
    "query": [
      "format"
    ],
    "auth": null,
    "status": 200,
    "sample": {
      "version": "x",
      "hitCount": 1,
      "result": {
        "id": "x",
        "source": "x",
        "title": "x",
        "authorString": "x",
        "pubYear": "x",
        "doi": "x"
      }
    },
    "idField": "id"
  },
  {
    "entity": "search",
    "accessor": "Search",
    "op": "load",
    "method": "GET",
    "path": "/search",
    "args": [],
    "select": {
      "cursor_mark": "v1",
      "format": "v1",
      "page_size": "v1",
      "query": "v1"
    },
    "headers": [],
    "query": [
      "query",
      "format",
      "pageSize",
      "cursorMark"
    ],
    "auth": null,
    "status": 200,
    "sample": {
      "version": "x",
      "hitCount": 1,
      "nextCursorMark": "x",
      "resultList": {
        "result": [
          {
            "authorString": "x",
            "doi": "x",
            "id": "x",
            "pubYear": "x",
            "source": "x",
            "title": "x"
          }
        ]
      }
    },
    "idField": "id"
  }
]


describe('definition', () => {
  for (const point of PLAN) {
    test(point.entity + '.' + point.op + ' ' + point.method + ' ' + point.path, async (t) => {
      const control = isControlSkipped('entityOp', point.entity + '.' + point.op, 'definition')
      if (control.skip) {
        t.skip(control.reason || 'skipped via sdk-test-control.json')
        return
      }
      await runDefinitionPoint(SDK, point)
    })
  }
})


import { BaseFeature } from './feature/base/BaseFeature'
import { TestFeature } from './feature/test/TestFeature'



const FEATURE_CLASS: Record<string, typeof BaseFeature> = {
   test: TestFeature,

}


const FEATURE_PLUGINS: Record<string, any[]> = {
  
}


class Config {

  makeFeature(this: any, fn: string) {
    const fc = FEATURE_CLASS[fn]
    const fi = new fc()
    return fi
  }

  // False for a feature added at runtime via options.extend (station's
  // adopt path) - the constructor uses this to skip makeFeature for names
  // no generated class backs.
  hasFeature(this: any, fn: string) {
    return null != FEATURE_CLASS[fn]
  }


  main = {
    name: 'Europepmc',
        slug: "europepmc",
    version: "0.0.1",
    target: "ts",

  }


  feature = {
     test:     {
      "options": {
        "active": false
      },
      "optspec": {
        "entity": "`$MAP`",
        "net": "`$MAP`"
      },
      "strict": false,
      "transport": "base"
    },

  }


  options = {
    base: "https://www.ebi.ac.uk/europepmc/webservices/rest",

    headers: {
      "content-type": "application/json"
    },

    entity: {
      
        article: {
        },
  
        search: {
        },
  
    }
  }


  entity = {
    "article": {
      "fields": [
        {
          "name": "hitCount",
          "title": "Hit Count",
          "type": "`$INTEGER`"
        },
        {
          "name": "id",
          "title": "Id",
          "type": "`$STRING`"
        },
        {
          "name": "result",
          "title": "Result",
          "type": "`$OBJECT`"
        },
        {
          "name": "version",
          "title": "Version",
          "type": "`$STRING`"
        }
      ],
      "id": {
        "field": "id",
        "name": "id",
        "parts": [
          "source",
          "id"
        ],
        "sep": "/"
      },
      "name": "article",
      "op": {
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "kind": "http",
              "method": "GET",
              "orig": "/article/{source}/{id}",
              "segments": [
                {
                  "lit": "article"
                },
                {
                  "var": "source"
                },
                {
                  "var": "id"
                }
              ],
              "parts": [
                "article",
                "{source}",
                "{id}"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {
                "params": [
                  {
                    "name": "id",
                    "orig": "id",
                    "type": "`$STRING`",
                    "kind": "param",
                    "reqd": true
                  },
                  {
                    "name": "source",
                    "orig": "source",
                    "type": "`$STRING`",
                    "kind": "param",
                    "reqd": true
                  }
                ],
                "query": [
                  {
                    "name": "format",
                    "orig": "format",
                    "type": "`$STRING`",
                    "kind": "query",
                    "example": "json"
                  }
                ]
              },
              "select": {
                "exist": [
                  "format",
                  "id",
                  "source"
                ]
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "search": {
      "fields": [
        {
          "name": "hitCount",
          "title": "Hit Count",
          "type": "`$INTEGER`"
        },
        {
          "name": "nextCursorMark",
          "title": "Next Cursor Mark",
          "type": "`$STRING`"
        },
        {
          "name": "resultList",
          "title": "Result List",
          "type": "`$OBJECT`"
        },
        {
          "name": "version",
          "title": "Version",
          "type": "`$STRING`"
        }
      ],
      "name": "search",
      "op": {
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "kind": "http",
              "method": "GET",
              "orig": "/search",
              "segments": [
                {
                  "lit": "search"
                }
              ],
              "parts": [
                "search"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {
                "query": [
                  {
                    "name": "cursor_mark",
                    "orig": "cursorMark",
                    "type": "`$STRING`",
                    "kind": "query",
                    "example": "*"
                  },
                  {
                    "name": "format",
                    "orig": "format",
                    "type": "`$STRING`",
                    "kind": "query",
                    "example": "json"
                  },
                  {
                    "name": "page_size",
                    "orig": "pageSize",
                    "type": "`$INTEGER`",
                    "kind": "query",
                    "example": 10
                  },
                  {
                    "name": "query",
                    "orig": "query",
                    "type": "`$STRING`",
                    "kind": "query",
                    "reqd": true
                  }
                ]
              },
              "select": {
                "exist": [
                  "cursor_mark",
                  "format",
                  "page_size",
                  "query"
                ]
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    }
  }
}


const config = new Config()

export {
  config,
  FEATURE_PLUGINS,
}


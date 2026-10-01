// Typed models for the Europepmc SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields{} and per-op
// params (op.<name>.points[].g.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.

export interface Article {
  hitCount?: number
  id?: string
  result?: Record<string, any>
  version?: string
}

export interface ArticleLoadMatch {
  id: string
  source: string
  format?: string
}

export interface Search {
  hitCount?: number
  nextCursorMark?: string
  resultList?: Record<string, any>
  version?: string
}

export interface SearchLoadMatch {
  cursor_mark?: string
  format?: string
  page_size?: number
  query: string
}


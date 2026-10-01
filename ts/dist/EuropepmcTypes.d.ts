export interface Article {
    hitCount?: number;
    id?: string;
    result?: Record<string, any>;
    version?: string;
}
export interface ArticleLoadMatch {
    id: string;
    source: string;
    format?: string;
}
export interface Search {
    hitCount?: number;
    nextCursorMark?: string;
    resultList?: Record<string, any>;
    version?: string;
}
export interface SearchLoadMatch {
    cursor_mark?: string;
    format?: string;
    page_size?: number;
    query: string;
}

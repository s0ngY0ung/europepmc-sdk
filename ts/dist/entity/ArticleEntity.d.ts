import { EuropepmcEntityBase } from '../EuropepmcEntityBase';
import type { EuropepmcSDK } from '../EuropepmcSDK';
import type { Control } from '../types';
import type { Article, ArticleLoadMatch } from '../EuropepmcTypes';
declare class ArticleEntity extends EuropepmcEntityBase<Article> {
    constructor(client: EuropepmcSDK, entopts: any);
    make(this: ArticleEntity): ArticleEntity;
    load(this: any, reqmatch?: ArticleLoadMatch, ctrl?: Control): Promise<ArticleEntity>;
}
export { ArticleEntity };

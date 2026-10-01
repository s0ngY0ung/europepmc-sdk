import { EuropepmcEntityBase } from '../EuropepmcEntityBase';
import type { EuropepmcSDK } from '../EuropepmcSDK';
import type { Control } from '../types';
import type { Search, SearchLoadMatch } from '../EuropepmcTypes';
declare class SearchEntity extends EuropepmcEntityBase<Search> {
    constructor(client: EuropepmcSDK, entopts: any);
    make(this: SearchEntity): SearchEntity;
    load(this: any, reqmatch?: SearchLoadMatch, ctrl?: Control): Promise<SearchEntity>;
}
export { SearchEntity };

import { ArticleEntity } from './entity/ArticleEntity';
import { SearchEntity } from './entity/SearchEntity';
export type * from './EuropepmcTypes';
import { inspect } from 'node:util';
import type { Context, Feature } from './types';
import { config } from './Config';
import { EuropepmcEntityBase } from './EuropepmcEntityBase';
import { Utility } from './utility/Utility';
import { BaseFeature } from './feature/base/BaseFeature';
declare const stdutil: Utility;
declare class EuropepmcSDK {
    _mode: string;
    _options: any;
    _utility: Utility;
    _features: Feature[];
    _rootctx: Context;
    constructor(options?: any);
    options(): any;
    utility(): any;
    prepare(fetchargs?: any): Promise<any>;
    direct(fetchargs?: any): Promise<Error | {
        ok: boolean;
        err: any;
        status?: undefined;
        headers?: undefined;
        data?: undefined;
    } | {
        ok: boolean;
        status: number;
        headers: any;
        data: any;
        err?: undefined;
    }>;
    _rawRequest(fetchargs?: any): Promise<Error | {
        ok: boolean;
        err: any;
        status?: undefined;
        headers?: undefined;
        data?: undefined;
    } | {
        ok: boolean;
        status: number;
        headers: any;
        data: any;
        err?: undefined;
    }>;
    graphql(query: string, variables?: any, ctrl?: any): Promise<any>;
    Article(entopts?: Record<string, any>): ArticleEntity;
    Search(entopts?: Record<string, any>): SearchEntity;
    static test(testoptsarg?: any, sdkoptsarg?: any): EuropepmcSDK;
    tester(testopts?: any, sdkopts?: any): EuropepmcSDK;
    toJSON(): {
        name: string;
    };
    toString(): string;
    [inspect.custom](): string;
}
declare const SDK: typeof EuropepmcSDK;
export { stdutil, config, BaseFeature, EuropepmcEntityBase, EuropepmcSDK, SDK, };

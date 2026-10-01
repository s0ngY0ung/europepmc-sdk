"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_path_1 = __importDefault(require("node:path"));
const Fs = __importStar(require("node:fs"));
const node_test_1 = require("node:test");
const node_assert_1 = __importDefault(require("node:assert"));
const live_runner_1 = require("../../live-runner");
const live_entity_1 = require("../../live-entity");
const __1 = require("../../..");
const utility_1 = require("../../utility");
(0, utility_1.loadEnvLocal)(__dirname + '/../../../.env.local');
(0, node_test_1.describe)('SearchEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when EUROPEPMC_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('EUROPEPMC_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.EuropepmcSDK.test();
        const ent = testsdk.Search();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.EUROPEPMC_TEST_LIVE;
        for (const op of ['load']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'search.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "hitCount": { "a": true, "h": "Hit Count", "n": "hitCount", "r": false, "t": "`$INTEGER`", "key$": "hitCount", "index$": 0 }, "nextCursorMark": { "a": true, "h": "Next Cursor Mark", "n": "nextCursorMark", "r": false, "t": "`$STRING`", "key$": "nextCursorMark", "index$": 1 }, "resultList": { "a": true, "h": "Result List", "n": "resultList", "r": false, "t": "`$OBJECT`", "key$": "resultList", "index$": 2 }, "version": { "a": true, "h": "Version", "n": "version", "r": false, "t": "`$STRING`", "key$": "version", "index$": 3 } }, "name": "search", "op": { "load": { "input": "data", "name": "load", "points": [{ "a": true, "co": { "id": "GET /search", "source": "openapi3", "version": 2 }, "g": { "query": [{ "a": true, "ex": "*", "k": "query", "n": "cursor_mark", "or": "cursorMark", "r": false, "t": "`$STRING`", "index$": 0 }, { "a": true, "ex": "json", "k": "query", "n": "format", "or": "format", "r": false, "t": "`$STRING`", "index$": 1 }, { "a": true, "ex": 10, "k": "query", "n": "page_size", "or": "pageSize", "r": false, "t": "`$INTEGER`", "index$": 2 }, { "a": true, "k": "query", "n": "query", "or": "query", "r": true, "t": "`$STRING`", "index$": 3 }] }, "k": "http", "m": "GET", "o": "/search", "q": { "exist": ["cursor_mark", "format", "page_size", "query"] }, "r": {}, "s": [{ "lit": "search" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "load" } }, "relations": { "ancestors": [] }, "key$": "search", "name__orig": "search", "Name": "Search", "name_": "search", "name-": "search", "NAME": "SEARCH", "index$": 1 }, { "active": true, "entity": "search", "key$": "BasicSearchFlow", "kind": "basic", "name": "BasicSearchFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": { "ref": "search_ref01", "srcdatavar": "search_ref01_data", "suffix": "_dt0" }, "m": {}, "o": "load", "s": [], "v": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-search_ref01" } }] }] }, 'Search', { "GET /search": { "protocol": "http", "parameters": [{ "name": "query", "in": "query", "required": true, "schema": { "type": "string" }, "index$": 0 }, { "name": "format", "in": "query", "schema": { "type": "string", "default": "json", "enum": ["json"] }, "index$": 1 }, { "name": "pageSize", "in": "query", "schema": { "type": "integer", "minimum": 1, "maximum": 1000, "default": 10 }, "index$": 2 }, { "name": "cursorMark", "in": "query", "schema": { "type": "string", "default": "*" }, "index$": 3 }] } });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let search_ref01_data = Object.values(setup.data.existing.search)[0];
        // LOAD
        const search_ref01_ent = client.Search();
        const search_ref01_match_dt0 = {};
        const search_ref01_data_dt0 = (await search_ref01_ent.load(search_ref01_match_dt0)).data();
        (0, node_assert_1.default)(null != search_ref01_data_dt0);
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/search/SearchTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.EuropepmcSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['search01', 'search02', 'search03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'EUROPEPMC_TEST_SEARCH_ENTID': idmap,
        'EUROPEPMC_TEST_LIVE': 'FALSE',
        'EUROPEPMC_TEST_EXPLAIN': 'FALSE',
    });
    idmap = env['EUROPEPMC_TEST_SEARCH_ENTID'];
    const live = 'TRUE' === env.EUROPEPMC_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['EUROPEPMC_TEST_SEARCH_ENTID'];
        idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {};
        if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
            throw new Error('Live ENTID must be a JSON object');
        }
        client = new __1.EuropepmcSDK(merge([
            // FIRST, so the generated fields below win: sdk-test-control.json's
            // test.client.options adds to the live client, it does not redirect it.
            (0, utility_1.liveClientOptions)(),
            {},
            // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
            // last entry is undefined, and basicSetup is normally called with no
            // argument at all - so a bare 'extra' silently discarded the apikey
            // and server values above and handed the SDK undefined. Harmless
            // while there was nothing in that object; not harmless now.
            extra || {},
            { system: { fetch: transport.fetch } }
        ]));
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
    };
    return setup;
}
//# sourceMappingURL=SearchEntity.test.js.map
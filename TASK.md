# Use and reproduce this mini task

This repository covers two public JSON operations of the Europe PMC API. No API key is needed. The full provider API and its XML responses are outside this task.

Tested environment: Linux/WSL, Node 24.14.0. Native Windows generation encountered the issues described in [the report](REPORT.md).

From a clean clone:

```sh
cd .sdk
npm ci
npm run generate
npx voxgig-sdkgen doctor
cd ../ts
npm ci
npm test
cd ..
node examples/live.cjs
```

The last command makes two public network requests. It checks a known publication identifier in both search and article lookup. Network failures should be distinguished from the offline test result.

```js
const { EuropepmcSDK } = require('./ts/dist/EuropepmcSDK');
const client = new EuropepmcSDK();
const search = await client.Search().load({
  query: 'EXT_ID:28818901 AND SRC:MED',
  format: 'json',
  page_size: 1
});
console.log(search.data().resultList.result[0].title);
const article = await client.Article().load({
  source: 'MED', id: '28818901', format: 'json'
});
console.log(article.data().result.title);
```

Run this example inside an async function or use the executable CommonJS example in `examples/live.cjs`. The SDK package is in this repository; it has not been published to npm.

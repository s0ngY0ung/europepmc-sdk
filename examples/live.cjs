const assert = require('node:assert/strict');
const { EuropepmcSDK } = require('../ts/dist/EuropepmcSDK');
(async () => {
  const client = new EuropepmcSDK();
  const search = await client.Search().load({query: 'EXT_ID:28818901 AND SRC:MED', format: 'json', page_size: 1});
  const data = search.data();
  assert.equal(data.hitCount, 1);
  assert.equal(data.resultList.result[0].id, '28818901');
  const article = await client.Article().load({source: 'MED', id: '28818901', format: 'json'});
  assert.equal(article.data().result.id, '28818901');
  console.log(JSON.stringify({ok: true, hitCount: data.hitCount, articleId: data.resultList.result[0].id, title: data.resultList.result[0].title}, null, 2));
})().catch(err => { console.error(err); process.exitCode = 1; });
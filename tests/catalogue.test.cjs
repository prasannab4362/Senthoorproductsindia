const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const html = fs.readFileSync('dist/index.html', 'utf8');
const nodes = new Map();
function element(dataset = {}) {
  const listeners = {}, classes = new Set();
  return {dataset, listeners, value:'', innerHTML:'', children:[], attributes:{}, hidden:false,
    addEventListener(type, fn) { (listeners[type] ??= []).push(fn); },
    fire(type, event = {}) { for (const fn of listeners[type] || []) fn(event); },
    append(child) { this.children.push(child); },
    replaceChildren(...children) { this.children = children; },
    setAttribute(key, value) { this.attributes[key] = value; },
    querySelectorAll() { return []; },
    classList:{add:c=>classes.add(c),remove:c=>classes.delete(c),contains:c=>classes.has(c),toggle(c, force){const add = force ?? !classes.has(c); add ? classes.add(c) : classes.delete(c); return add;}},
    showModal() { this.open = true; }, close() { this.open = false; this.fire('close'); },
    scrollIntoView() {}, focus() { this.focused = true; }
  };
}
const filters = ['all','orchard','field','coast','roots'].map(filter => element({filter}));
const document = {...element(),body:element(),createElement:()=>element(),
  querySelector(selector) {
    if(selector.startsWith('#')) assert.ok(html.includes(`id="${selector.slice(1)}"`), `Missing HTML target ${selector}`);
    if(!nodes.has(selector)) nodes.set(selector,element()); return nodes.get(selector);
  },
  querySelectorAll(selector) { return selector === '[data-filter]' ? filters : []; }
};
const context = vm.createContext({document, Date, FormData:class {get(key){return {name:'Test Buyer',email:'buyer@example.com',company:'Buyer & Co',collection:'Cashew apple',message:'Juice, 50 packs & delivery details'}[key]}}});
vm.runInContext(fs.readFileSync('dist/catalogue.js','utf8'),context);
const get = selector => document.querySelector(selector);
const collections = vm.runInContext('collections',context);
assert.equal(collections.length,8);
assert.deepEqual(Array.from(collections,c=>c.id),['banana','cashew','cashew-apple','seafood','groundnut','jackfruit','vetiver','rice']);
assert.equal(get('#results-count').textContent,'8 collections to explore');
for(const collection of collections) {
  assert.ok(fs.existsSync('dist/'+collection.image),collection.image);
  assert.ok(collection.items.length>=4);
  assert.ok(collection.detail && collection.description && collection.tamilDescription && collection.use);
  vm.runInContext(`showStory(${JSON.stringify(collection.id)})`,context);
  for(const product of collection.items) assert.ok(get('#story-panel').innerHTML.includes(product));
  document.fire('click',{target:{closest:()=>({dataset:{open:collection.id}})}});
  assert.equal(get('#dialog-title').textContent,collection.name);
  assert.equal(get('#dialog-ingredients').children.length,collection.items.length);
  assert.equal(get('#collection-dialog').open,true);
  get('#dialog-enquire').fire('click');
  assert.equal(get('#enquiry-collection').value,collection.name);
  assert.equal(get('#collection-dialog').open,false);
}
get('#catalogue-search').value=collections[2].tamil;
get('#catalogue-search').fire('input');
assert.equal(get('#results-count').textContent,'1 collection to explore');
get('#catalogue-search').value='NO MATCH HERE';get('#catalogue-search').fire('input');
assert.equal(get('#results-count').textContent,'0 collections to explore');
assert.ok(get('#collection-grid').innerHTML.includes('No matching products'));
get('#catalogue-search').value='';filters.find(f=>f.dataset.filter==='field').fire('click');
assert.equal(get('#results-count').textContent,'3 collections to explore');
get('#enquiry-form').fire('submit',{preventDefault(){}});
assert.ok(decodeURIComponent(get('#whatsapp-enquiry').href).includes('Juice, 50 packs & delivery details'));
assert.ok(get('#email-enquiry').href.startsWith('mailto:senthoorproducts@gmail.com?'));
assert.equal(get('#enquiry-actions').hidden,false);
get('#enquiry-form').fire('input');assert.equal(get('#enquiry-actions').hidden,true);
for(const match of html.matchAll(/(?:src|href)="(assets\/[^"#]+|[^"/]+\.(?:css|js|html))"/g)) assert.ok(fs.existsSync('dist/'+match[1]),match[1]);
const ids=Array.from(html.matchAll(/id="([^"]+)"/g),m=>m[1]);assert.equal(new Set(ids).size,ids.length,'Duplicate IDs');
for(const match of html.matchAll(/href="#([^"]+)"/g)) assert.ok(ids.includes(match[1]),`Broken anchor ${match[1]}`);
console.log('PASS: eight collections, all story panels and dialogs, enquiry selection, Tamil search, filters, no results, enquiry links, asset paths and anchors.');

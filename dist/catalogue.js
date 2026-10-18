const collections = [
  {
    "id": "banana",
    "name": "Banana",
    "tamil": "வாழை",
    "group": "orchard",
    "subtitle": "Fruit, flower, stem. More to discover.",
    "description": "The banana plant offers much more than its fruit. Turning fruit, flower and stem into convenient food formats brings familiar Tamil food traditions into everyday kitchens.",
    "items": [
      "Banana chips",
      "Green banana flour",
      "Banana powder",
      "Banana flower pickle",
      "Banana stem pickle"
    ],
    "story": "From plant to pantry",
    "detail": "Firm green fruit can become crisp chips or flour for cooking. Ripe fruit lends itself to dried slices and powder, while the flower and tender stem offer possibilities for pickles and prepared foods.",
    "use": "Snacking, flour blends, traditional accompaniments and convenient cooking."
  },
  {
    "id": "cashew",
    "name": "Cashew",
    "tamil": "முந்திரி",
    "group": "field",
    "subtitle": "A local crop, thoughtfully transformed.",
    "description": "Cashew kernels can be transformed through roasting, seasoning, grinding and confectionery making. Our focus is on these value-added formats and their uses.",
    "items": [
      "Roasted cashews",
      "Seasoned cashews",
      "Cashew butter",
      "Cashew paste",
      "Cashew sweets"
    ],
    "story": "Beyond the kernel",
    "detail": "Roasting and seasoning create snack formats. Ground kernels become smooth butter or cooking paste, while cashew-based sweets bring the crop into traditional confectionery.",
    "use": "Snacks, cooking pastes, spreads, sweets and gifting enquiries."
  },
  {
    "id": "cashew-apple",
    "name": "Cashew apple",
    "tamil": "முந்திரிப்பழம்",
    "group": "orchard",
    "subtitle": "Rediscover the fruit of the cashew.",
    "description": "The cashew apple is the fleshy fruit that grows above the cashew nut. It deserves a collection of its own, with possibilities in fruit drinks, preserves and fermented products.",
    "items": [
      "Cashew apple juice",
      "Cashew apple squash",
      "Cashew apple jam",
      "Cashew apple candy",
      "Cashew apple vinegar"
    ],
    "story": "A fruit with its own possibilities",
    "detail": "Juicing and preserving open up new uses for the cashew apple. It can be explored as juice or squash, cooked into jam, made into fruit candy, or processed into vinegar.",
    "use": "Fruit beverages, spreads, confectionery and culinary vinegar."
  },
  {
    "id": "seafood",
    "name": "Seafood",
    "tamil": "கடல் உணவுகள்",
    "group": "coast",
    "subtitle": "Coastal traditions, everyday convenience.",
    "description": "Value addition brings coastal ingredients into prepared and preserved food formats. The collection focuses on products made from fish and prawns, with preparation and storage confirmed for each enquiry.",
    "items": [
      "Fish pickle",
      "Prawn pickle",
      "Dried fish",
      "Fish cutlets",
      "Ready-to-cook fish"
    ],
    "story": "From the coast to the kitchen",
    "detail": "Pickling, drying and preparing ready-to-cook portions offer different ways to use seafood. Fish cutlets and seasoned portions can make meal preparation simpler; each format has its own handling needs.",
    "use": "Meal accompaniments, prepared snacks and ready-to-cook meals."
  },
  {
    "id": "groundnut",
    "name": "Groundnut",
    "tamil": "மணிலா / நிலக்கடலை",
    "group": "field",
    "subtitle": "A familiar harvest, in new forms.",
    "description": "Groundnut is woven into local snacks and cooking. Roasting, grinding, pressing and sweet-making turn this familiar field crop into a varied value-added collection.",
    "items": [
      "Roasted groundnuts",
      "Groundnut chikki",
      "Groundnut butter",
      "Groundnut chutney powder",
      "Groundnut oil"
    ],
    "story": "From field crop to daily favourite",
    "detail": "Roasted groundnuts become snacks, while ground kernels can become butter or chutney powder. Jaggery-based chikki and pressed groundnut oil offer further routes from crop to finished product.",
    "use": "Snacks, spreads, traditional sweets, condiments and cooking oil."
  },
  {
    "id": "jackfruit",
    "name": "Jackfruit",
    "tamil": "பலா",
    "group": "orchard",
    "subtitle": "Young fruit, ripe bulbs, useful seeds.",
    "description": "Jackfruit offers different possibilities at every stage. Young fruit, ripe bulbs and seeds can each become distinct value-added foods, from savoury meal ingredients to sweet preserves.",
    "items": [
      "Jackfruit chips",
      "Jackfruit flour",
      "Jackfruit seed flour",
      "Jackfruit jam",
      "Jackfruit pickle",
      "Ready-to-cook tender jackfruit"
    ],
    "story": "One fruit. Many ways to enjoy it.",
    "detail": "Firm bulbs can become chips, ripe fruit can become jam or dried products, and processed seeds can become flour. Tender jackfruit offers a savoury base for prepared meals and pickles.",
    "use": "Snacking, flour blends, preserves and savoury cooking."
  },
  {
    "id": "vetiver",
    "name": "Vetiver",
    "tamil": "வெட்டிவேர்",
    "group": "roots",
    "subtitle": "A fragrant root with lasting purpose.",
    "description": "Vetiver is valued for its aromatic roots. Its value-added possibilities span crafted household products, fragrance ingredients and food-grade beverage preparations.",
    "items": [
      "Vetiver syrup",
      "Dried vetiver sachets",
      "Vetiver woven mats",
      "Vetiver essential oil"
    ],
    "story": "Rooted in fragrance and craft",
    "detail": "Cleaned and dried roots can be made into aromatic sachets or woven mats. Distillation produces essential oil for fragrance use; food-grade preparations offer a separate route into beverage syrups.",
    "use": "Home fragrance, woven products and beverage preparations. Essential oil is for fragrance use, not consumption."
  }
];
const groups={orchard:"ORCHARD PRODUCTS",field:"FIELD CROPS",coast:"COASTAL PRODUCTS",roots:"AROMATIC ROOTS"};
const grid=document.querySelector('#collection-grid'),search=document.querySelector('#catalogue-search'),more=document.querySelector('#show-more');
let filter='all',expanded=false,selectedCollection=null;
function renderCollections(){const query=search.value.trim().toLocaleLowerCase();const matches=collections.filter(c=>(filter==='all'||c.group===filter)&&[c.name,c.tamil,c.description,...c.items].join(' ').toLocaleLowerCase().includes(query));const visible=expanded||filter!=='all'||query?matches:matches.slice(0,8);grid.innerHTML=visible.map(c=>`<article class="collection-card"><button data-open="${c.id}" aria-label="Explore ${c.name}"><div class="card-art"><img src="${collectionImage(c)}" alt="${c.name}" width="600" height="500" loading="lazy"><span class="card-count">${groups[c.group]}</span><span class="photo-explore">Discover ↗</span></div><div class="card-bottom"><div><h3>${c.name}</h3><span class="tamil-name" lang="ta">${c.tamil}</span><p>${c.subtitle}</p><p class="product-preview">${c.items.slice(0,3).join(" · ")}</p></div><span class="card-arrow" aria-hidden="true">↗</span></div></button></article>`).join('');if(!matches.length){const p=document.createElement('p');p.className='no-results';p.textContent='No matching collection yet. Send us your ingredient list — we’re happy to discuss it.';grid.append(p);}document.querySelector('#results-count').textContent=`${visible.length} of ${matches.length} collections`;more.hidden=matches.length<=8||filter!=='all'||!!query;more.textContent=expanded?'Show fewer collections ↑':'Explore all 7 collections ↓';}
document.querySelectorAll('[data-filter]').forEach(button=>button.addEventListener('click',()=>{filter=button.dataset.filter;document.querySelectorAll('[data-filter]').forEach(b=>{const active=b===button;b.classList.toggle('active',active);b.setAttribute('aria-pressed',String(active));});renderCollections();}));search.addEventListener('input',renderCollections);more.addEventListener('click',()=>{expanded=!expanded;renderCollections();if(!expanded)document.querySelector('#collections').scrollIntoView();});renderCollections();
const select=document.querySelector('#enquiry-collection');collections.forEach(c=>{const option=document.createElement('option');option.value=c.name;option.textContent=c.name;select.append(option);});
const dialog=document.querySelector('#collection-dialog');
document.addEventListener('click',event=>{const button=event.target.closest('[data-open]');if(!button)return;selectedCollection=collections.find(c=>c.id===button.dataset.open);if(!selectedCollection)return;document.querySelector('#dialog-title').textContent=selectedCollection.name;document.querySelector('#dialog-origin').textContent=groups[selectedCollection.group];document.querySelector('#dialog-art').innerHTML=`<img src="${collectionImage(selectedCollection)}" alt="${selectedCollection.name}">`;document.querySelector('#dialog-description').textContent=selectedCollection.description;document.querySelector('#dialog-use').textContent=selectedCollection.use;document.querySelector('#dialog-ingredients').replaceChildren(...selectedCollection.items.map(item=>{const tag=document.createElement('span');tag.textContent=item;return tag;}));dialog.showModal();document.body.classList.add('modal-open');});
document.querySelector('.dialog-close').addEventListener('click',()=>dialog.close());dialog.addEventListener('close',()=>document.body.classList.remove('modal-open'));dialog.addEventListener('click',event=>{const r=dialog.getBoundingClientRect();if(event.target===dialog&&(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom))dialog.close();});document.querySelector('#dialog-enquire').addEventListener('click',()=>{select.value=selectedCollection.name;dialog.close();document.querySelector('#enquiry-actions').hidden=true;document.querySelector('#contact').scrollIntoView();document.querySelector('[name="name"]').focus({preventScroll:true});});
const menu=document.querySelector('.menu-toggle'),nav=document.querySelector('#navigation');function closeMenu(){nav.classList.remove('open');menu.setAttribute('aria-expanded','false');menu.setAttribute('aria-label','Open navigation');}menu.addEventListener('click',()=>{const open=nav.classList.toggle('open');menu.setAttribute('aria-expanded',String(open));menu.setAttribute('aria-label',open?'Close navigation':'Open navigation');});nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeMenu));document.addEventListener('keydown',e=>{if(e.key==='Escape')closeMenu();});document.querySelector('#year').textContent=new Date().getFullYear();
const form=document.querySelector('#enquiry-form'),actions=document.querySelector('#enquiry-actions');form.addEventListener('input',()=>{actions.hidden=true;document.querySelector('#form-status').textContent='';});form.addEventListener('submit',event=>{event.preventDefault();const data=new FormData(form);const body=`Hello Senthoor Products India,\nI would like to enquire about NATIVE NATURE.\n\nName: ${data.get('name')}\nEmail: ${data.get('email')}\nCompany: ${data.get('company')||'Not specified'}\nCollection: ${data.get('collection')}\n\nRequirement:\n${data.get('message')}`;document.querySelector('#whatsapp-enquiry').href=`https://wa.me/919514007777?text=${encodeURIComponent(body)}`;document.querySelector('#email-enquiry').href=`mailto:senthoorproducts@gmail.com?subject=${encodeURIComponent('NATIVE NATURE — '+data.get('collection'))}&body=${encodeURIComponent(body)}`;actions.hidden=false;document.querySelector('#form-status').textContent='Your message is ready. Choose an app below, review it, then send. Nothing has been sent yet.';});
document.querySelectorAll('.phone-reveal').forEach(link=>{link.addEventListener('click',event=>{if(!link.classList.contains('revealed')){event.preventDefault();link.classList.add('revealed');const phone=link.dataset.phone;link.querySelector('.phone-display').textContent=phone+' ↗';link.setAttribute('aria-label',`Call ${phone}`);}});});

function collectionImage(c){return c.id==="cashew-apple"||c.id==="vetiver"?`assets/${c.id}.svg`:`assets/photos/${c.id}.webp`;}
document.querySelector("#product-stories").innerHTML=collections.map((c,i)=>`<article class="product-story" id="story-${c.id}"><div class="story-image"><img src="${collectionImage(c)}" alt="${c.name}${c.id==="vetiver"||c.id==="cashew-apple"?" illustration":" ingredient"}" loading="lazy" width="600" height="500"></div><div class="product-story-copy"><p class="eyebrow">0${i+1} / ${c.name.toUpperCase()} <span lang="ta">${c.tamil}</span></p><h3>${c.story}</h3><p>${c.description}</p><p>${c.detail}</p><h4>Value-added possibilities</h4><ul>${c.items.map(item=>`<li>${item}</li>`).join("")}</ul><p class="story-use">${c.use}</p><button class="text-link" data-open="${c.id}">Explore ${c.name.toLowerCase()} <span aria-hidden="true">↗</span></button></div></article>`).join("");

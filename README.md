# NATIVE NATURE

Responsive static website for Senthoor Products India, using the company name and contact details on the supplied visiting card. No build or runtime dependencies.

Run `npm run dev` and visit http://127.0.0.1:4173. Run `npm run check` for JavaScript syntax validation and `npm test` for collection, search, story, dialog, enquiry and asset checks. On PowerShell with script restrictions use `npm.cmd`. Deploy the `dist` directory to a static host.

## Content and enquiries

Seven core collections cover value-added possibilities from banana, cashew, cashew apple, seafood, groundnut, jackfruit and vetiver. Rice is an eighth collection, requested in the expanded brief. Every collection includes product examples, a Tamil summary and a detailed story in the ingredient explorer. Jackfruit and cashew apple have additional editorial features, and banana has a fruit/flower/stem/leaf section. There is no generic nuts collection. Examples are enquiry options, not confirmed inventory; current products, pack sizes and supplied forms require confirmation. The website does not claim certifications, fixed prices or stock levels.

Contact: T.M. Kumar; Pks Prabu; senthoorproducts@gmail.com. Address: 118A Hospital Street, Kurinjipadi 607302, Cuddalore District, Tamil Nadu, India. Enquiries prepare WhatsApp and email links for the visitor to review and send. No message is automatically sent and no form data is stored on a server.

Four original AI-generated editorial images depict the harvest, cashew apple, jackfruit and vetiver. They are optimized JPEGs in `dist/assets/editorial/`; generation prompts are in `IMAGE-PROMPTS.md`. Other displayed images are Pexels ingredient photographs. All imagery is illustrative, not photography of company inventory. Sources and licences are in `dist/photo-credits.json` and the public `dist/photo-credits.html` page. Fonts use Google Fonts with system fallbacks.

## Editing

- `dist/index.html`: page content and enquiry form
- `dist/journal.css`: harvest-journal design and responsive layouts (older stylesheets are not loaded)
- `dist/catalogue.js`: searchable ingredient collections, filters, dialogs, mobile navigation and enquiry links
- `dist/assets/`: logo mark and hero image

## Publishing on Windows

The Sites workflow requires Git Bash rather than WSL Bash. Prepend `C:\Program Files\Git\bin` to PATH for the helper process and set `TAR_OPTIONS=--force-local`. Use a forward-slash absolute archive path. Source credentials must remain in memory and be passed through hidden stdin.

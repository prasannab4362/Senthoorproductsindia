# NATIVE NATURE

Responsive static website for Senthoor Products India, using the company name and contact details on the supplied visiting card. No build or runtime dependencies.

Run `npm run dev` and visit http://127.0.0.1:4173. Run `npm run check` for JavaScript syntax validation. Deploy the `dist` directory to a static host.

## Content and enquiries

Seven collections cover value-added possibilities from banana, cashew, cashew apple, seafood, groundnut, jackfruit and vetiver. Every collection includes product examples and a dedicated story. Examples are enquiry options, not confirmed inventory; current products, pack sizes and supplied forms require confirmation. The website does not claim certifications, fixed prices or stock levels.

Contact: T.M. Kumar; Pks Prabu; senthoorproducts@gmail.com. Address: 118A Hospital Street, Kurinjipadi 607302, Cuddalore District, Tamil Nadu, India. Enquiries prepare WhatsApp and email links for the visitor to review and send. No message is automatically sent and no form data is stored on a server.

Cashew apple and vetiver use original SVG illustrations. All displayed raster photos are free-use Pexels stock photographs, not photos of the company's inventory. Sources and licences are in `dist/photo-credits.json` and the public `dist/photo-credits.html` page. Images are locally stored WebP files. Fonts use Google Fonts with system fallbacks.

## Editing

- `dist/index.html`: page content and enquiry form
- `dist/styles.css` and `dist/refresh.css`: visual design and responsive layouts
- `dist/catalogue.js`: searchable ingredient collections, filters, dialogs, mobile navigation and enquiry links
- `dist/assets/`: logo mark and hero image

## Publishing on Windows

The Sites workflow requires Git Bash rather than WSL Bash. Prepend `C:\Program Files\Git\bin` to PATH for the helper process and set `TAR_OPTIONS=--force-local`. Use a forward-slash absolute archive path. Source credentials must remain in memory and be passed through hidden stdin.

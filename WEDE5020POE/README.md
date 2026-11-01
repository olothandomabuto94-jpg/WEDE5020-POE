# WEDE5020-POE
A repository for my web development assignment in wede5020

# Chubby Chums

## Student Information
- **Name:** Olothando Mabuto
- **Student Number:** ST1052487
- **Module:** WEDE5020

## Project Overview
Chubby Chums is a non-profit child protection organization founded in 1999 by Tony Barnard and Martin Graham to help impoverished, diseased, and abused children. Starting from a single enclosed veranda, the organization has grown to incorporate 36 children's homes. It was officially registered as a Section 21 corporation in 2000, and is recognized as a Non-Profit Organization (NPO), Non-Government Organization (NGO), and Public Benefit Organization (PBO) (Chubby Chums, 2026).

Chubby Chums works in partnership with Child Protection Units and Child Treatment Services to stop child abuse, child neglect, and child exploitation, and to promote the importance of Early Childhood Development (ECD). The organization primarily operates in Johannesburg and the Far East Rand Regions (Chubby Chums, 2026).

This website redesign project aims to modernize the organization's online presence, making it more informative, accessible, and functional for visitors, donors, and people needing to report concerns about a child's welfare.

**Target Audience:** Children in need — including those in abusive households, those living in poverty, and those struggling with illnesses and diseases — along with the general public, donors, and potential volunteers (Chubby Chums, 2026).

## Website Goals and Objectives
The goal of the website is to provide key insights into the Chubby Chums organization and its operations — detailing where, why, and how it operates — while also providing clear information on contacting Chubby Chums and reporting child neglect or abuse to child protection services. The website also gives visitors a direct way to donate.

**Key Performance Indicators (KPIs):**
- **Website Traffic** — how many people are visiting the site and learning about Chubby Chums
- **Monthly Donations** — number of donations made via the website each month
- **Recurring Donors** — number of donors who continue to donate over time
- **Average Donation Amount** — average amount donated per donor
- **Conversion Rate** — percentage of visitors who go on to donate

## Key Features and Functionality
- Consistent navigation across all pages: Home, About, Donate, Enquiry, Contact, styled as colour-coded pill buttons using Flexbox
- **Home page** introducing the organization and its mission, with a hero section, mission statement, and a card-based row linking to About, Donate, Enquiry, and Contact
- **About page** with detailed history, registration status, and partnerships, using alternating text/image layouts
- **Enquiry page** allowing visitors to report suspected child abuse or neglect, with emergency contact numbers (SAPS and Childline) and a styled report form alongside a supporting image
- **Contact page** with phone, email, physical address, and a styled general contact form
- **Donate page** with full banking details and official registration/compliance information, presented in bordered information panels
- Fully responsive layout using CSS Flexbox, tested and adjusted at desktop, tablet (≤768px), and mobile (≤480px) breakpoints
- Custom-styled form elements (inputs, select, textarea) with consistent focus/hover/active states across the site

## Design Direction
The original proposal specified a colour scheme of white, black, yellow, blue, and green on a light background, using Arial. During the CSS phase, this was revised:

- **Colour palette expanded** to red (`#FF0000`), green (`#1AFF00`), yellow (`#FFF200`), blue (`#00A2FF`), orange (`#FF9900`), and purple (`#BF00FF`), with black (`#000000`) and white (`#FFFFFF`) used for text and background, to increase the colourful, child-friendly feel while keeping content readable.
- **Background inverted from light to dark** (black background, white text) after prototyping both options. This was chosen because the brighter accent colours read more vividly against black, photographs of children/donations sit well against a dark background, and white nav-link text improved readability against the blue and purple accent buttons specifically.
- Arial (with Helvetica/sans-serif fallbacks) was retained as originally proposed.

## Timeline and Milestones
- **14 August 2026** — Proposal and HTML framework
- **18 September 2026** — Applying CSS, responsive design, and improving UI/UX

## Part 1 Details
Part 1 covers the initial proposal and static HTML framework: page structure, navigation, and core content for the Home, About, Enquiry, Contact, and Donate pages, built without CSS or JavaScript.

## Part 2 Details
Part 2 covers visual design and responsiveness across all five pages:
- An external stylesheet (`CSS/chubbychums.css`) linked to every page
- A base style and CSS reset (`* { margin: 0; padding: 0; box-sizing: border-box; }`) to normalise browser defaults
- A typographic scale (h1 2.5rem, h2 2rem, body text 1rem, `line-height: 1.5` for readability) using `rem` units for accessibility
- Flexbox-based layouts for the navigation bar, hero sections, the home page's card row, and the enquiry page's form/image section, including nested flex containers for the card components
- Visual styling using `color`, `background-color`, `border`, and rounded corners (`border-radius`) throughout, plus `:hover`, `:focus`, and `:active` pseudo-classes for interactive feedback on links and form fields
- Responsive design implemented with media queries at 768px (tablet) and 480px (mobile), switching Flexbox rows to a stacked column layout on smaller screens and scaling down heading font sizes on mobile
- Screenshot evidence of the site at desktop, tablet, and mobile widths (see `/screenshots` — 15 screenshots covering all five pages at three breakpoints)

## Responsive Design Evidence

The site was tested and verified at three breakpoints — desktop, tablet (≤768px), and mobile (≤480px) — using browser developer tools' device toolbar. Screenshots for all five pages at each breakpoint are below.

### Desktop
![Home - Desktop](screenshots/index-desktop.png)
![About - Desktop](screenshots/about-desktop.png)
![Donate - Desktop](screenshots/donate-desktop.png)
![Enquiry - Desktop](screenshots/enquiry-desktop.png)
![Contact - Desktop](screenshots/contact-desktop.png)

### Tablet (768px)
![Home - Tablet](screenshots/index-tablet.png)
![About - Tablet](screenshots/about-tablet.png)
![Donate - Tablet](screenshots/donate-tablet.png)
![Enquiry - Tablet](screenshots/enquiry-tablet.png)
![Contact - Tablet](screenshots/contact-tablet.png)

### Mobile (480px)
![Home - Mobile](screenshots/index-mobile.png)
![About - Mobile](screenshots/about-mobile.png)
![Donate - Mobile](screenshots/donate-mobile.png)
![Enquiry - Mobile](screenshots/enquiry-mobile.png)
![Contact - Mobile](screenshots/contact-mobile.png)

Part 3 (further interactivity and refinement) will follow in a future submission.

## Sitemap
Home (index.html)
|-- About (about.html)
|-- Donate (donate.html)
|-- Enquiry (enquiry.html)
|-- Contact (contact.html)

## Changelog
- Created `index.html` — homepage with mission and services overview
- Created `about.html` — organizational history and partnerships
- Added `contact.html` — contact details and general contact form
- Added `enquiry.html` — child abuse/neglect reporting form with emergency contacts
- Added `donate.html` — banking details and registration information
- Added HTML comments across all pages for clarity and maintainability
- Linked external stylesheet (`CSS/chubbychums.css`) to all pages
- Established base styles, CSS reset, and typographic scale
- Expanded colour palette (added red, purple, additional accents beyond original proposal) and inverted site theme from light to dark background
- Built Flexbox navigation bar with colour-coded, rounded pill-style links and hover/focus/active states
- Built Flexbox hero sections (text + image) on the home and about pages
- Built nested Flexbox card row on the home page linking to About, Donate, Enquiry, and Contact
- Styled and structured the enquiry form (labels, inputs, select, textarea) with a supporting image in a Flexbox layout
- Styled the contact form to match the site-wide input/select/textarea design
- Added responsive media queries (768px and 480px breakpoints) across all pages, converting Flexbox rows to stacked columns and scaling typography on smaller screens
- Captured screenshot evidence of all five pages at desktop, tablet, and mobile widths

## Form Validation

JavaScript validation was added to the contact form and the enquiry form (`chubbychums.js`). Both forms use the `novalidate` attribute so the JavaScript messages are shown instead of the browser's default pop-ups.

| Field | Rules |
|-------|-------|
| Name (contact: required, enquiry: optional) | 2-60 characters; letters (including accented), spaces, apostrophes, full stops and hyphens only |
| Email (contact: required, enquiry: optional) | Must look like `name@example.com` |
| Phone (optional on both forms) | South African number: 10 digits starting with 0, or +27 followed by 9 digits; spaces, hyphens and brackets allowed |
| Child's name (enquiry, optional) | Same rules as a name |
| Child's location (enquiry, required) | 3-100 characters |
| Reason for enquiry (enquiry, required) | A reason must be chosen from the drop-down |
| Message / description (both, required) | 10-2000 characters |

- **Feedback:** each problem is shown under its field in red, with a summary at the top of the form after a failed submit. The first problem field is focused automatically.
- **Timing:** a field is checked when the visitor leaves it (after they have typed in it), and the message clears as soon as the value is fixed. Empty required fields are only reported on submit.
- **Accessibility:** fields use `required`, `aria-invalid` and `aria-describedby`, errors are announced to screen readers, and the checks work with the keyboard alone.
- **Anonymous reports:** the enquiry form accepts a report with no name, email or phone number, because reporters may wish to stay anonymous.
- **Current limitation:** the forms are not connected to an email or form service yet, so a valid form shows a thank-you message that says nothing has been sent, and points to the phone numbers. This will change when the site is deployed.

## Search Engine Optimization (SEO)

### On-page SEO
- **Keyword research:** keywords were chosen from the wording used on the site and the questions visitors are likely to ask. Search volumes can be confirmed with Google Keyword Planner or Google Trends. The keywords were worked into page titles, meta descriptions, image alt text, the FAQ and link text, without rewriting the original page content.

| Page | Main keyword | Supporting keywords |
|------|--------------|---------------------|
| Home | child protection organization South Africa | non-profit, children's homes Johannesburg, Chubby Chums |
| About | Chubby Chums | child protection NPO, Section 21, PBO, Child Protection Units |
| Donate | donate to children's charity | support vulnerable children, orphaned children South Africa |
| Enquiry | report child abuse South Africa | suspected child neglect, Childline, SAPS 10111 |
| Contact | Chubby Chums Germiston | 136 Cydonia Road, Primrose Hill, contact |

- **Title tags and meta descriptions:** every page has a unique title (52-57 characters) and a unique meta description (143-155 characters) that describe the page and include its main keyword.
- **Header tags:** each page has exactly one `<h1>`, followed by `<h2>` headings for its sections.
- **Image optimisation:** images were renamed with descriptive file names (for example `children-eating-outdoors.jpg` instead of `kids2.jpg`), given accurate alt text, and given width and height attributes. The three oversized images were resized (832 KB reduced to 157 KB), and images below the first screen use lazy loading.
- **URL structure:** pages use short, descriptive, lowercase names (`about.html`, `donate.html`, `enquiry.html`, `contact.html`).
- **Internal linking:** a "Get Involved" section on the About page, a related-links section on the Donate page, and "read more" links in the FAQ answers connect the pages using descriptive link text.
- **Mobile-friendliness:** responsive layouts were checked at 320, 360, 390, 414 and 768 pixels wide, and the sideways scrolling that appeared on small screens was fixed.

### Off-page SEO (plan)
- **Backlinks:** ask partner organisations, Child Protection Units, local community groups and non-profit directories to link to the website, and ask local news outlets to link to it when they feature Chubby Chums.
- **Social media:** share the website on the organisation's social media pages. The Open Graph tags on each page control the title and description shown when a link is shared.
- **Local SEO:** the organisation's name, address and phone number are the same on the contact page, the map popup and the structured data (JSON-LD) on the home page, which also lists the areas the organisation serves. Creating a Google Business Profile for 136 Cydonia Road, Germiston would strengthen local search results.

### Additional requests
- **robots.txt:** added to tell search engines to crawl the site but skip the `screenshots` folder.
- **Page speed:** smaller images, lazy loading, image dimensions set to avoid layout shift, and early connection to the map servers on the contact page.
- **Security:** the Leaflet library is loaded with a subresource integrity check, external links use `rel="noopener noreferrer"`, and content added by JavaScript is inserted as plain text so it cannot run as code.

### To do once the site is deployed
- Create `sitemap.xml` and add its address to `robots.txt`.
- Add canonical links, plus the page address and a preview image to the Open Graph tags.
- Add security headers (for example through a `_headers` file on Netlify).

## References
Chubby Chums. (2026). *Chubby Chums.* Available at: https://www.chubbychums1.co.za [Accessed 2026].

Lamaj, D. (2026). *Low fidelity wireframe.* Available at: https://uxpilot.ai/blogs/low-fidelity-wireframe [Accessed 2026].

Lucidity. (2026). *The complete list of charity KPIs.* Available at: https://getlucidity.com/strategy-resources/the-complete-list-of-charity-kpis/#Awareness_KPIs [Accessed 2026].

Mason, L. (2026). *Website hosting cost.* Forbes Advisor. Available at: https://www.forbes.com/advisor/business/website-hosting-cost/ [Accessed 2026].
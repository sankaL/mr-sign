# Product Requirements Document
# Mr. Sign and Print Website Redesign

## 1. Product Summary

Mr. Sign and Print needs a modern, responsive customer-facing website that clearly presents its sign, printing, and design services. The redesigned website should make it easy for customers to understand available services, see pricing guidance where available, contact the shop directly, and find the Vaughan location.

The MVP is a static public website. Customers do not submit online forms, create accounts, upload files, pay online, or receive generated request codes. Staff do not use an admin portal. Service content and pricing guidance are maintained through JSON files in the repository.

## 2. Goals

### 2.1 Business Goals

- Modernize the Mr. Sign and Print online presence.
- Make the business look professional, current, and trustworthy.
- Clearly show all services offered by the business.
- Encourage customers to call, email, or visit the shop for current pricing and project guidance.
- Keep the website inexpensive to host and simple to maintain.
- Improve search visibility for customers looking for signs and printing services in Vaughan and the GTA.

### 2.2 Customer Goals

- Quickly understand what Mr. Sign and Print offers.
- Browse services under Signs, Printing, and Design.
- View pricing guidance where available.
- Contact the business directly by phone or email.
- Find the location, hours, and directions.
- Use the website easily on mobile.

### 2.3 Maintenance Goals

- Keep services, descriptions, pricing guidance, images, and SEO fields in human-editable JSON files.
- Avoid runtime database, authentication, and email infrastructure.
- Make future content updates reviewable through normal code changes.

## 3. MVP Scope

### 3.1 In Scope

- Static responsive website
- Home page
- Signs page
- Printing page
- Design page
- Individual service pages
- Static contact page
- Location page
- Gallery page
- Static compatibility page for old pricing/contact URLs
- SEO and social sharing metadata
- Vaughan and GTA service-area focus
- Repository-managed JSON content files

### 3.2 Out of Scope

- Online payments
- Full checkout experience
- Customer accounts
- Customer login
- Customer file uploads
- Online quote request submissions
- Contact form submissions
- Generated request codes
- Admin portal
- Admin authentication
- Database-backed content editing
- Transactional customer or staff emails
- Inventory management
- CRM integration
- Live chat
- Advanced pricing calculators
- Production workflow management
- New public top-level service categories beyond the current website categories

## 4. Key Product Decisions

| Area | Decision |
|---|---|
| Site architecture | Static public website |
| Customer intake | Direct phone, email, and in-person contact only |
| Online forms | Not included in MVP |
| Admin portal | Removed from MVP |
| Database | Removed from MVP |
| Content source | JSON files in `packages/content/content/` |
| Online payment | Not included in MVP |
| File uploads | Not included in MVP |
| Pricing | Show fixed, starting, tiered, or contact-for-pricing guidance |
| Service area | Vaughan and GTA |
| Service categories | Use the same top-level categories from the existing website |

## 5. Website Structure

| Page | Purpose |
|---|---|
| Home | Introduce the business and direct users to services, phone, email, and location |
| Signs | Show all sign-related services |
| Printing | Show all printing-related services |
| Design | Show all design-related services |
| Service Detail Pages | Provide details for each individual service |
| Contact | Show phone, email, address, hours, and direct-contact guidance |
| Location | Show address, hours, map, directions, phone, and email |
| Gallery | Show representative service visuals |
| Legacy Pricing Contact | Keep old pricing/contact routes useful without online submissions |

## 6. Service Categories

The redesigned website must use the same top-level service categories from the existing website. Do not add new public top-level service categories in MVP.

### 6.1 Signs Services

| Signs Services |
|---|
| Awnings |
| Plate Directory Board |
| Banner |
| Plastic Lawn Signs |
| Channel Letters |
| Real Estate Signs |
| Changeable Letters |
| Sandwich Boards |
| Coroplast |
| T-Frame/Site Signs |
| Cut-out Letters |
| Vertical stands-Indoor |
| Illuminated Boxes |
| Vertical stands-Outdoor |
| Magnetic Signs |
| Vehicle Lettering |
| Menu Boxes |
| Vinyl Cutting |
| Neon |
| Window Lettering |

### 6.2 Printing Services

| Printing Services |
|---|
| Brochures |
| Invitations |
| Business Cards |
| Invoices |
| Color Business Cards |
| Large Format Printing |
| Color Postcards |
| Menu Boxes |
| Full Color Brochures |
| Stamps |
| Flyers |
| Weddings |

### 6.3 Design Services

| Design Services |
|---|
| Electronic Signs |
| Taxi's Roof signs |
| Engraving-pladge |
| Traffic Signs |
| Logos |
| T-shirt-Caps |
| Magnetic (Fridge) |
| Type Setting |
| Silk Screens |
| Websites |

## 7. Content Model

Service content lives in `packages/content/content/services/{signs,printing,design}/`.

Each service JSON file includes:

- Category slug
- Service slug
- Name
- Status
- Display order
- Featured flag
- Headline
- Short description
- Body copy
- Capabilities
- Pricing guidance
- Image reference
- SEO title and description
- Related service references

Pricing types:

| Type | Public Meaning |
|---|---|
| `fixed` | A visible fixed price |
| `startingFrom` | A visible starting price |
| `tiered` | Size, quantity, or option-based pricing guidance |
| `contactForPricing` | Customer should call or email for current pricing |

## 8. Acceptance Criteria

- The website can be built as a static Next.js export.
- Public navigation does not include an online submission flow.
- Contact and location pages show direct phone, email, address, hours, and directions.
- Every service has a public detail page.
- Every service page has SEO metadata and a valid generated image reference.
- Service content is sourced from JSON files in the repo.
- The app has no runtime dependency on a database, admin auth, or transactional email.
- Old online-order and pricing-contact URLs remain useful without offering a submission form.

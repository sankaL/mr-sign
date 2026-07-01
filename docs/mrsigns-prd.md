# Product Requirements Document

# Mr. Sign and Print Website Redesign

## 1. Product Summary

Mr. Sign and Print needs a modern, responsive customer-facing website that clearly presents its sign-first business, printing options, and sign maintenance services. The redesigned website should make it easy for customers to understand available services, contact the shop directly for current pricing, and find the Vaughan location.

The MVP is a static public website. Customers do not submit online forms, create accounts, upload files, pay online, or receive generated request codes. Staff do not use an admin portal. Service content and pricing guidance are maintained through JSON files in the repository.

## 2. Goals

### 2.1 Business Goals

- Modernize the Mr. Sign and Print online presence.
- Make the business look professional, current, and trustworthy.
- Clearly show sign, printing, manufacturing, and sign maintenance services offered by the business.
- Encourage customers to call, email, or visit the shop for current pricing and project guidance.
- Keep the website inexpensive to host and simple to maintain.
- Improve search visibility for customers looking for signs and printing services in Vaughan and the GTA.

### 2.2 Customer Goals

- Quickly understand what Mr. Sign and Print offers.
- Browse services under Signs, Printing, and Services.
- Contact the shop directly for current pricing guidance.
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
- Services page for sign maintenance
- About Us page
- FAQs page
- Individual service pages
- Static contact page
- Location page
- Gallery page
- Static compatibility pages for old pricing/contact and Design URLs
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
- Online public pricing amounts

## 4. Key Product Decisions

| Area               | Decision                                                                                  |
| ------------------ | ----------------------------------------------------------------------------------------- |
| Site architecture  | Static public website                                                                     |
| Customer intake    | Direct phone, email, and in-person contact only                                           |
| Online forms       | Not included in MVP                                                                       |
| Admin portal       | Removed from MVP                                                                          |
| Database           | Removed from MVP                                                                          |
| Content source     | JSON files in `packages/content/content/`                                                 |
| Online payment     | Not included in MVP                                                                       |
| File uploads       | Not included in MVP                                                                       |
| Pricing            | Do not show public pricing amounts. Direct customers to call or email for current pricing |
| Service area       | Vaughan and GTA                                                                           |
| Service categories | Signs, Printing, and Services                                                             |

## 5. Website Structure

| Page                   | Purpose                                                                         |
| ---------------------- | ------------------------------------------------------------------------------- |
| Home                   | Introduce the business and direct users to services, phone, email, and location |
| Signs                  | Show all sign-related services                                                  |
| Printing               | Show all printing-related services                                              |
| Services               | Show sign maintenance and service work                                          |
| About Us               | Explain the sign-first shop focus and GTA service area                          |
| FAQs                   | Answer common direct-contact, service, printing, and timing questions           |
| Service Detail Pages   | Provide details for each individual service                                     |
| Contact                | Show phone, email, address, hours, and direct-contact guidance                  |
| Location               | Show address, hours, map, directions, phone, and email                          |
| Gallery                | Show representative service visuals                                             |
| Legacy Pricing Contact | Keep old pricing/contact routes useful without online submissions               |

## 6. Service Categories

The redesigned website uses Signs, Printing, and Services as public top-level service categories.

### 6.1 Signs Services

| Signs Services              |
| --------------------------- |
| Awnings                     |
| Banners                     |
| Builders Signs              |
| Channel Letters             |
| Coroplast                   |
| Cut-out Letters             |
| Directional Signs           |
| Fabric Signs                |
| Illuminated Boxes           |
| Indoor Wall Graphics        |
| LED Signs                   |
| Magnetic Signs              |
| Menu Boxes                  |
| Neon                        |
| Plastic Lawn Signs          |
| Push Through Signs          |
| Pylon Signs                 |
| Real Estate Signs           |
| Reception Signs             |
| Sandwich Boards             |
| T-Frame/Site Signs          |
| Teardrop & Flags            |
| Traffic and Street Signs    |
| Vehicle Lettering and Wraps |
| Vertical stands-Indoor      |
| Vertical stands-Outdoor     |
| Vinyl Cutting               |
| Window Frosting             |
| Window Lettering            |

### 6.2 Printing Services

| Printing Services     |
| --------------------- |
| Brochures             |
| Invitations           |
| Business Cards        |
| Invoices              |
| Color Business Cards  |
| Large Format Printing |
| Color Postcards       |
| Menu Boxes            |
| Full Color Brochures  |
| Stamps                |
| Flyers                |
| Weddings              |

### 6.3 Services

| Sign Maintenance Services     |
| ----------------------------- |
| Sign Repairs                  |
| LED and Lighting Replacement  |
| Electrical Troubleshooting    |
| Sign Cleaning                 |
| Vinyl and Graphic Replacement |
| Emergency Sign Service        |

## 7. Content Model

Service content lives in `packages/content/content/services/{signs,printing,services}/`.

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
- Internal pricing guidance for future reference
- Image reference
- SEO title and description
- Related service references

Public pages do not render pricing amounts. Customers should call, email, or visit the shop for current pricing.

## 8. Acceptance Criteria

- The website can be built as a static Next.js export.
- Public navigation does not include an online submission flow.
- Contact and location pages show direct phone, email, address, hours, and directions.
- Every active service has a public detail page.
- Every service page has SEO metadata and a valid generated image reference.
- Service content is sourced from JSON files in the repo.
- Public pages do not show service pricing amounts.
- The app has no runtime dependency on a database, admin auth, or transactional email.
- Old online-order and pricing-contact URLs remain useful without offering a submission form.

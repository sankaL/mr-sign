# Product Requirements Document  
# Mr. Sign and Print Website Redesign

## 1. Product Summary

Mr. Sign and Print needs a modern, responsive customer-facing website that clearly presents its sign, printing, and design services. The current website feels outdated and relies heavily on old visual layouts. The redesigned website should make it easier for customers to understand available services, request a quote, contact the business, and find the store location.

The website should not function as a full e-commerce store in MVP. Customers will not pay online and will not upload files. Instead, they will submit structured quote requests, receive a unique request code, and Mr. Sign and Print will follow up by email or phone.

The website will also include an admin portal where staff can manage services, pricing, quote and contact requests, and basic website content.

---

## 2. Goals

## 2.1 Business Goals

- Modernize the Mr. Sign and Print online presence.
- Make the business look professional, current, and trustworthy.
- Clearly show all services offered by the business.
- Improve quote request submissions.
- Reduce manual back-and-forth by collecting structured information from customers.
- Allow admins to update services and pricing without changing code.
- Improve search visibility for customers looking for signs and printing services in Vaughan and the GTA.

## 2.2 Customer Goals

- Quickly understand what Mr. Sign and Print offers.
- Browse services under Signs, Printing, and Design.
- View pricing where available.
- Request a quote online.
- Contact the business easily.
- Find the location, hours, phone number, and email.
- Use the website easily on mobile.

## 2.3 Admin Goals

- Manage services shown on the website.
- Manage pricing or mark services as “Request Quote.”
- View incoming quote and contact requests.
- Receive email notifications for new requests.
- Support multiple admin accounts.
- Keep website content up to date without developer support.

---

## 3. MVP Scope

## 3.1 In Scope

The MVP includes:

- Modern responsive website
- Home page
- Signs page
- Printing page
- Design page
- Individual service pages
- Request Quote page
- Location page
- Contact page
- Admin portal
- Service and pricing management
- Quote and contact request management
- Email notifications through Resend
- Unique request codes
- SEO and social sharing metadata
- Vaughan and GTA service-area focus

## 3.2 Out of Scope

The MVP does not include:

- Online payments
- Full checkout experience
- Customer accounts
- Customer login
- File uploads
- Artwork upload management
- Inventory management
- CRM integration
- Live chat
- Advanced quote calculators
- Production workflow management
- New service categories beyond the current website’s existing categories

---

## 4. Key Product Decisions

| Area | Decision |
|---|---|
| Online payment | Not included in MVP |
| Online order | Not included as a separate public flow in MVP |
| File uploads | Not included in MVP |
| Artwork/files | Customers can be told to email files separately after submitting a request |
| Pricing | Some services may show pricing; others may show “Request Quote” |
| Admin email | Requests go to `order@mrsignandprint.net` |
| Admin accounts | Multiple admin accounts should be supported |
| Portfolio/gallery | Optional, only if enough quality images are available |
| Service area | Vaughan and GTA |
| Service categories | Use the same categories from the existing website |

---

## 5. Target Users

## 5.1 Customers

Customers may include:

- Small business owners
- Retail stores
- Restaurants
- Real estate agents
- Property managers
- Contractors
- Event organizers
- Local Vaughan and GTA businesses
- Returning print/sign customers

## 5.2 Admin Users

Admin users may include:

- Business owner
- Staff managing quotes and orders
- Staff updating services and pricing

---

## 6. Website Structure

The redesigned website should include the following public pages:

| Page | Purpose |
|---|---|
| Home | Introduce the business and direct users to services or quote requests |
| Signs | Show all sign-related services |
| Printing | Show all printing-related services |
| Design | Show all design-related services |
| Service Detail Pages | Provide details for each individual service |
| Request a Quote | Allow customers to submit quote requests |
| Location | Show address, hours, map, and contact details |
| Contact | Allow general inquiries |
| Portfolio/Gallery | Optional, if enough work samples are available |

---

## 7. Service Categories

Important product rule:

> The redesigned website should use the same service categories from the existing website. Do not add new public service categories in MVP.

---

## 7.1 Signs Services

The Signs section should include:

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

---

## 7.2 Printing Services

The Printing section should include:

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

---

## 7.3 Design Services

The Design section should include:

| Design Services |
|---|
| Electronic Signs |
| Taxi’s Roof signs |
| Engraving-pladge |
| Traffic Signs |
| Logos |
| T-shirt-Caps |
| Magnetic (Fridge) |
| Type Setting |
| Silk Screens |
| Websites |

---

## 8. Public Website Requirements

## 8.1 Home Page

The Home page should make the business look modern, professional, and easy to understand.

The Home page should include:

- Clear hero section
- Short description of Mr. Sign and Print
- Primary call-to-action: **Request a Quote**
- Secondary call-to-action: **Browse Services**
- Service category cards for:
  - Signs
  - Printing
  - Design
- Featured or popular services
- Optional gallery preview
- Location/contact summary
- Service area mention: Vaughan and GTA

### Acceptance Criteria

- Customers can quickly understand what the business offers.
- Customers can easily access Signs, Printing, Design, Quote, Location, and Contact.
- The page works well on mobile and desktop.

---

## 8.2 Signs Page

The Signs page should show all existing sign services in a clean, modern layout.

Each service should appear as a card with:

- Service name
- Short description
- Image or icon
- Pricing label, if available
- “Request Quote” or “View Details” action

### Acceptance Criteria

- All existing Signs categories are shown.
- No new Signs categories are introduced in MVP.
- Each service links to its own detail page.

---

## 8.3 Printing Page

The Printing page should show all existing printing services.

Each service should appear as a card with:

- Service name
- Short description
- Image or icon
- Pricing label, if available
- “Request Quote” or “View Details” action

### Acceptance Criteria

- All existing Printing categories are shown.
- No new Printing categories are introduced in MVP.
- Each service links to its own detail page.

---

## 8.4 Design Page

The Design page should show all existing design services.

Each service should appear as a card with:

- Service name
- Short description
- Image or icon
- Pricing label, if available
- “Request Quote” or “View Details” action

### Acceptance Criteria

- All existing Design categories are shown.
- No new Design categories are introduced in MVP.
- Each service links to its own detail page.

---

## 8.5 Service Detail Pages

Each service should have its own page.

Each service page should include:

- Service name
- Service category
- Description
- Pricing or “Request Quote”
- Optional service image/gallery
- Related services
- Call-to-action to request a quote

### Acceptance Criteria

- Customers can understand what each service is.
- Customers can request a quote from each service page.
- Pricing is shown only where the business chooses to show it.
- Services without fixed pricing show “Request Quote.”

---

## 8.6 Request Quote Page

The Request Quote page should allow customers to submit a structured quote request.

Customers should be able to:

- Select one or more services
- Enter contact information
- Enter project details
- Submit the request
- Receive a unique quote request code
- Receive a confirmation email

The admin should receive the request at:

`order@mrsignandprint.net`

### Required Customer Fields

- First name
- Last name
- Email
- Phone number
- Company name, optional
- Preferred contact method
- Project details

### Required Request Fields

- Service category
- Service selection
- Quantity, optional
- Size/dimensions, optional
- Material, optional
- Desired completion date, optional
- Notes/details

### Quote Code Example

`Q-MSP-2026-000001`

### Acceptance Criteria

- Customer can submit a quote without creating an account.
- Customer receives a quote request code.
- Admin receives an email notification.
- The request appears in the admin portal.
- No payment is collected.
- No file upload is available.

---

## 8.7 Contact Page

The Contact page should support general inquiries.

The page should include:

- Contact form
- Business phone number
- Business email
- Address
- Hours
- General message field

### Contact Form Fields

- First name
- Last name
- Email
- Phone number, optional
- Reason for contact
- Message

### Contact Code Example

`C-MSP-2026-000001`

### Acceptance Criteria

- Customer can submit a general inquiry.
- Admin receives the message at `order@mrsignandprint.net`.
- Customer receives a confirmation email.
- The inquiry appears in the admin portal.

---

## 8.8 Location Page

The Location page should help customers find and contact the business.

The page should include:

- Business name
- Address
- Map or directions link
- Phone number
- Email
- Business hours
- Service area: Vaughan and GTA
- Call-to-action buttons:
  - Call Now
  - Get Directions
  - Request a Quote

### Acceptance Criteria

- Customers can quickly find the address, hours, and contact details.
- Mobile users can tap to call.
- The page feels clean and professional.

---

## 8.9 Portfolio / Gallery

A portfolio or gallery may be included if the business has enough quality images.

If included, the gallery should:

- Show examples of previous work
- Be organized by service type where possible
- Be easy for admins to update
- Be optional for MVP launch

### Acceptance Criteria

- Gallery does not block MVP launch.
- Only quality images should be used.
- Gallery should improve trust and credibility.

---

## 9. Admin Portal Requirements

## 9.1 Admin Login

The admin portal should be protected by login.

The portal should support:

- Multiple admin accounts
- Basic user management
- Admin access to services, pricing, and requests

### Acceptance Criteria

- Only authorized users can access the admin portal.
- More than one admin account can exist.

---

## 9.2 Admin Dashboard

The dashboard should give admins a quick view of recent activity.

The dashboard should show:

- New quote requests
- New contact messages
- Recent submissions
- Requests by status
- Services missing pricing
- Services marked as “Request Quote”

### Acceptance Criteria

- Admin can quickly see new customer requests.
- Admin can open a request from the dashboard.

---

## 9.3 Service Management

Admins should be able to manage service content.

Admins should be able to:

- View existing services
- Edit service names
- Edit service descriptions
- Add or update service images
- Activate or deactivate services
- Control service display order
- Mark services as featured
- Manage service SEO information

### MVP Rule

The public website should use the existing service categories from the old website. New categories should not be added in MVP unless the business intentionally decides to expand later.

### Acceptance Criteria

- Admin can update services without developer help.
- Front-end service pages reflect admin updates.
- Existing categories remain consistent with the old website.

---

## 9.4 Pricing Management

Admins should be able to control how pricing appears for each service.

Pricing options should include:

| Pricing Type | Example |
|---|---|
| Exact Price | `$35.00` |
| Starting From | `Starting from $75.00` |
| Tiered Pricing | Different prices by size or quantity |
| Request Quote Only | No public price shown |

### Acceptance Criteria

- Admin can show pricing for selected services.
- Admin can mark selected services as “Request Quote.”
- Pricing changes appear on the public website.

---

## 9.5 Request Management

Admins should be able to manage incoming requests.

The admin portal should show:

- Quote requests
- Order requests
- Contact messages

Admins should be able to:

- View request details
- Search by request code
- Filter by request type
- Filter by request status
- Update request status
- Add internal notes

### Suggested Request Statuses

| Status | Description |
|---|---|
| New | Request has been submitted |
| Under Review | Admin is reviewing the request |
| Quote Sent | Quote has been sent to customer |
| Awaiting Customer Approval | Waiting for customer response |
| Approved | Customer approved the request |
| In Production | Work is being completed |
| Ready for Pickup | Order is ready |
| Completed | Request is complete |
| Cancelled | Request was cancelled |

### Acceptance Criteria

- Admin can view and manage all customer requests.
- Admin can search requests by code.
- Admin can update request status.

---

## 9.6 Email Management

The website should send automated emails using Resend.

### Required Emails

| Event | Email Sent |
|---|---|
| Quote submitted | Customer confirmation + admin notification |
| Order request submitted | Customer confirmation + admin notification |
| Contact form submitted | Customer confirmation + admin notification |

### Admin Email Recipient

All admin notifications should go to:

`order@mrsignandprint.net`

### Email Content

Emails should include:

- Request code
- Customer name
- Customer email
- Customer phone
- Selected services
- Request details
- Notes
- Submission date/time

### Acceptance Criteria

- Customer receives confirmation after submission.
- Admin receives request notification.
- Request code appears in email subject or body.
- Email wording feels professional and branded.

---

## 10. SEO and Metadata Requirements

The website should be designed with SEO in mind.

Each public page should include:

- Page title
- Meta description
- Social sharing title
- Social sharing description
- Social sharing image
- Clean page URL
- Clear headings
- Text-based content, not image-only content

The website should focus on search terms related to:

- Mr. Sign and Print
- Sign shop Vaughan
- Custom signs Vaughan
- Printing services Vaughan
- Sign and print shop GTA
- Banners Vaughan
- Business cards Vaughan
- Vehicle lettering Vaughan
- Channel letters Vaughan
- Traffic signs Vaughan

### Acceptance Criteria

- Each main page has proper SEO content.
- Each service page has its own title and description.
- Shared links show professional previews.
- The website supports local search visibility for Vaughan and the GTA.

---

## 11. Responsive Design Requirements

The website must work well on:

- Mobile phones
- Tablets
- Desktop screens
- Large desktop screens

### Mobile Requirements

- Easy-to-use navigation
- Clear service cards
- Simple quote and contact forms
- Tap-to-call phone number
- Clear quote CTA
- No horizontal scrolling

### Acceptance Criteria

- Website is usable on mobile.
- Forms are easy to complete on mobile.
- Services are easy to browse on mobile and desktop.

---

## 12. Content Requirements

The redesigned website should replace image-only service labels with real text content.

Each service should have:

- Service name
- Short description
- Optional detailed description
- Pricing or “Request Quote”
- Image or icon
- Call-to-action

The business should confirm:

- Final service descriptions
- Final pricing
- Which services are quote-only
- Business hours
- Phone numbers
- Whether fax should remain visible
- Whether a gallery should be included

---

## 13. User Stories

## 13.1 Customer Stories

### Browse Services

As a customer,  
I want to browse services under Signs, Printing, and Design,  
so that I can understand what Mr. Sign and Print offers.

### View Service Details

As a customer,  
I want to open a service page,  
so that I can learn more before requesting a quote.

### Request a Quote

As a customer,  
I want to request a quote online,  
so that I do not need to manually write an email.

### Contact the Business

As a customer,  
I want to send a general message,  
so that I can ask questions before starting a project.

### Find the Location

As a customer,  
I want to view the location and hours,  
so that I can visit or contact the business.

---

## 13.2 Admin Stories

### Manage Services

As an admin,  
I want to update service content,  
so that the website stays current.

### Manage Pricing

As an admin,  
I want to control whether pricing is shown or hidden,  
so that the business can handle custom services properly.

### View Requests

As an admin,  
I want to view incoming requests,  
so that I can follow up with customers.

### Manage Request Status

As an admin,  
I want to update request statuses,  
so that staff can track customer inquiries.

### Manage Admin Accounts

As an admin,  
I want multiple admin accounts,  
so that more than one person can manage the website.

---

## 14. MVP Acceptance Criteria

The MVP is complete when:

1. The website has a modern Home page.
2. The website has Signs, Printing, and Design pages.
3. The service categories match the existing old website.
4. Each service has a detail page.
5. Customers can submit quote requests.
6. Customers can submit general contact inquiries.
7. Quote and contact submissions generate unique codes.
8. Customer confirmation emails are sent.
9. Admin notification emails are sent to `order@mrsignandprint.net`.
10. Admin users can log in.
11. Multiple admin accounts are supported.
12. Admins can manage services.
13. Admins can manage pricing.
14. Admins can mark services as “Request Quote.”
15. Admins can view and manage customer requests.
16. The website works well on mobile, tablet, and desktop.
17. Pages have SEO and social sharing metadata.
18. The Location page includes business details.
19. No online payment is included.
20. No file upload is included.

---

## 15. Launch Checklist

### Content

- [ ] Confirm all service names from the old website
- [ ] Confirm service descriptions
- [ ] Confirm pricing
- [ ] Confirm quote-only services
- [ ] Confirm business phone number
- [ ] Confirm business email
- [ ] Confirm address
- [ ] Confirm hours
- [ ] Confirm service area as Vaughan and GTA
- [ ] Confirm whether portfolio/gallery is included

### Website

- [ ] Home page completed
- [ ] Signs page completed
- [ ] Printing page completed
- [ ] Design page completed
- [ ] Service detail pages completed
- [ ] Quote form completed
- [ ] Contact form completed
- [ ] Location page completed
- [ ] Responsive design completed
- [ ] SEO metadata added
- [ ] Social sharing metadata added

### Admin Portal

- [ ] Admin login completed
- [ ] Multiple admin accounts supported
- [ ] Service management completed
- [ ] Pricing management completed
- [ ] Request management completed
- [ ] Email notifications completed

### Testing

- [ ] Test quote request submission
- [ ] Test contact submission
- [ ] Test customer confirmation emails
- [ ] Test admin notification emails
- [ ] Test admin login
- [ ] Test service updates
- [ ] Test pricing updates
- [ ] Test mobile layout
- [ ] Test desktop layout
- [ ] Test SEO/social previews

---

## 16. Future Enhancements

Potential future features include:

- Online payments
- Customer accounts
- File uploads
- Artwork approval flow
- Quote PDF generation
- Invoice generation
- Advanced pricing calculator
- Portfolio/gallery expansion
- Customer testimonials
- Google Reviews integration
- CRM integration
- Live chat
- SMS notifications
- Internal production workflow tracking

---

## 17. Open Items

Before development starts, the following items should be confirmed:

1. Final branding direction, colors, and logo.
2. Final business phone numbers.
3. Whether fax should remain visible.
4. Final list of prices to publish.
5. Which services should be quote-only.
6. Whether gallery/portfolio should be included in MVP.
7. Final admin users for launch.
8. Final Resend sender email/domain.
9. Whether Saturday by appointment should remain in hours.
10. Whether the website should mention Concord in addition to Vaughan and GTA.

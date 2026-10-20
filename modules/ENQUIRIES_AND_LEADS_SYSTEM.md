# 📬 Master Specification: Tenant Public Contact Form to Dashboard Enquiries System

**File:** `modules/ENQUIRIES_AND_LEADS_SYSTEM.md`  
**Classification:** Core Functional Specification — Public Lead Capture & Multi-Tenant CRM Ingestion  
**Related Documents:**
- [`rules/MODELS_AND_CONTEXTS_ARCHITECTURE.md`](../rules/MODELS_AND_CONTEXTS_ARCHITECTURE.md) (Enquiry.ts / EnquiryContext.tsx)
- [`rules/RBAC_SECURITY_RULES.md`](../rules/RBAC_SECURITY_RULES.md) (Enquiries Permissions & Staff Assignment)
- [`modules/MULTI_TENANT_SYSTEM.md`](./MULTI_TENANT_SYSTEM.md) (Custom Domain & Subdomain Resolution)
- [`modules/CMS_ENGINE.md`](./CMS_ENGINE.md) (Public Contact Form Section SDK & Variable Binding)
- [`modules/AUTOMATIONS_AND_NOTIFICATIONS.md`](./AUTOMATIONS_AND_NOTIFICATIONS.md) (New Lead Alert Dispatches)

---

## 📑 Table of Contents
1. [Executive Architecture & Public-to-Dashboard Pipeline](#1-executive-architecture--public-to-dashboard-pipeline)
2. [Data Models & MongoDB Schema (`Enquiry.ts`)](#2-data-models--mongodb-schema)
3. [Public Contact Form Ingestion, Tenant Scoping & Anti-Spam Security](#3-public-contact-form-ingestion-tenant-scoping--anti-spam-security)
4. [Real-Time Alerts & Notification Engine](#4-real-time-alerts--notification-engine)
5. [Dashboard Enquiries Studio UI & Mobile Card View (`/dashboard/enquiries`)](#5-dashboard-enquiries-studio-ui--mobile-card-view)
6. [Workflow Lifecycle, Notes Timeline & CRM Lead Conversion](#6-workflow-lifecycle-notes-timeline--crm-lead-conversion)
7. [RBAC Permissions & Audit Governance](#7-rbac-permissions--audit-governance)
8. [Summary of Core Exported Symbols & API Endpoints](#8-summary-of-core-exported-symbols--api-endpoints)

---

## 1. Executive Architecture & Public-to-Dashboard Pipeline

Every tenant organization with a public-facing website, storefront, or landing page needs a seamless mechanism to capture inbound sales leads, customer questions, and support requests.

The **Enquiries & Leads System** creates a direct, authenticated pipeline connecting the public **"Contact Us"** page to the private **Tenant Dashboard** (`/dashboard/enquiries`).

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│               PUBLIC STOREFRONT CONTACT FORM TO DASHBOARD PIPELINE                     │
├────────────────────────────────────────────────────────────────────────────────────────┤
│ 1. VISITOR SUBMITS CONTACT FORM                                                        │
│    • Public Page: `https://brand.com/contact` or `tenant.app.com/contact`              │
│    • Form inputs: Name, Email, Phone, Subject, Service Interest, Message               │
├────────────────────────────────────────────────────────────────────────────────────────┤
│ 2. EDGE INGESTION & TENANT RESOLUTION                                                  │
│    • Reverse proxy inspects `Host` header to resolve tenant `companyId`                 │
│    • Security checks: Honeypot trap validation, IP rate limiter, Turnstile/Captcha     │
│    • Payload sanitized & persisted to MongoDB (`Enquiry` collection)                   │
├────────────────────────────────────────────────────────────────────────────────────────┤
│ 3. REAL-TIME MULTI-CHANNEL DISPATCH                                                    │
│    • Socket.IO event `enquiry:new` emitted to room `room:company:{companyId}`          │
│    • Dashboard audio chime triggers & unread badge counters increment in real-time     │
│    • Optional automated email & WhatsApp lead alerts sent to Tenant Owner/Staff        │
├────────────────────────────────────────────────────────────────────────────────────────┤
│ 4. DASHBOARD TRIAGE & CRM CONVERSION (`/dashboard/enquiries`)                         │
│    • Master data table / responsive mobile card view with status capsules              │
│    • Slide-over inspector with full message body, phone, and internal staff notes      │
│    • Single-click [ Convert to CRM Customer ] creates a permanent client profile       │
└────────────────────────────────────────────────────────────────────────────────────────┘
```

---

## 2. Data Models & MongoDB Schema

### 2.1 Concrete Model: `models/Enquiry.ts`

```typescript
import mongoose, { Schema, Document, Types } from 'mongoose';

export type EnquiryStatus =
  | 'NEW'
  | 'CONTACTED'
  | 'IN_PROGRESS'
  | 'CONVERTED'
  | 'ARCHIVED'
  | 'SPAM';

export type EnquiryPriority = 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT';

export interface IEnquiryNote {
  _id?: Types.ObjectId;
  authorId: Types.ObjectId;
  authorName: string;
  note: string;
  createdAt: Date;
}

export interface IEnquiry extends Document {
  _id: Types.ObjectId;
  companyId: Types.ObjectId;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  sourcePageUrl: string;       // e.g. "https://acme.com/contact"
  sourcePageTitle?: string;    // e.g. "Contact Us - Acme Corp"
  status: EnquiryStatus;
  priority: EnquiryPriority;
  assignedStaffId?: Types.ObjectId;
  notes: IEnquiryNote[];
  metadata: {
    ipAddress?: string;
    userAgent?: string;
    referrer?: string;
    customFields?: Record<string, any>;
  };
  convertedCustomerId?: Types.ObjectId; // Ref to Customer model if converted
  convertedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const EnquiryNoteSchema = new Schema<IEnquiryNote>(
  {
    authorId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    authorName: { type: String, required: true },
    note: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
  },
  { _id: true }
);

const EnquirySchema = new Schema<IEnquiry>(
  {
    companyId: {
      type: Schema.Types.ObjectId,
      ref: 'Company',
      required: true,
      index: true,
    },
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true, index: true },
    phone: { type: String, trim: true, default: '' },
    subject: { type: String, required: true, trim: true },
    message: { type: String, required: true },
    sourcePageUrl: { type: String, required: true },
    sourcePageTitle: { type: String, default: 'Contact Us' },
    status: {
      type: String,
      enum: ['NEW', 'CONTACTED', 'IN_PROGRESS', 'CONVERTED', 'ARCHIVED', 'SPAM'],
      default: 'NEW',
      index: true,
    },
    priority: {
      type: String,
      enum: ['LOW', 'MEDIUM', 'HIGH', 'URGENT'],
      default: 'MEDIUM',
    },
    assignedStaffId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      default: null,
      index: true,
    },
    notes: [EnquiryNoteSchema],
    metadata: {
      ipAddress: { type: String },
      userAgent: { type: String },
      referrer: { type: String },
      customFields: { type: Schema.Types.Mixed, default: {} },
    },
    convertedCustomerId: {
      type: Schema.Types.ObjectId,
      ref: 'Customer',
      default: null,
    },
    convertedAt: { type: Date, default: null },
  },
  { timestamps: true }
);

// Compound indexes for lightning-fast multi-tenant queries & triage
EnquirySchema.index({ companyId: 1, status: 1, createdAt: -1 });
EnquirySchema.index({ companyId: 1, assignedStaffId: 1 });
EnquirySchema.index({ companyId: 1, email: 1 });

export const Enquiry =
  mongoose.models.Enquiry || mongoose.model<IEnquiry>('Enquiry', EnquirySchema);
```

---

## 3. Public Contact Form Ingestion, Tenant Scoping & Anti-Spam Security

### 3.1 Tenant Resolution at Public Boundary
Public contact submissions do not require authentication. Instead, the backend resolves the tenant identity dynamically:
1. **Custom Domain**: Request to `https://www.nexusdynamics.com/api/public/enquiries` maps host `nexusdynamics.com` to `Company._id`.
2. **Subdomain**: Request to `https://nexus.platform.com/api/public/enquiries` maps subdomain `nexus` to `Company._id`.
3. **Explicit Header / Body Fallback**: When embedding across external widgets, `x-company-id` or form parameter `companyId` is verified.

### 3.2 Anti-Spam & Bot Defense Standards
Public forms are prime targets for automated spam bots. The ingestion endpoint enforces a multi-tier safeguard:
1. **Hidden Honeypot Field**: The form renders a hidden input field named `hp_website_url` (styled with `display: none` and `tabindex: -1`). Real users never fill it. If populated, the request is immediately rejected or silently marked `status: 'SPAM'`.
2. **IP Rate Limiting**: An in-memory/Redis rate limiter restricts submissions to **maximum 5 submissions per 15 minutes per IP address**.
3. **Payload Sanitization**: Strip dangerous HTML tags (`<script>`, `<iframe>`, `onload=`) to eliminate Stored XSS vectors before database persistence.

---

## 4. Real-Time Alerts & Notification Engine

When a new inquiry is submitted:
1. **Socket.IO Real-Time Dispatch**:
   - Emits an event `enquiry:new` to `room:company:{companyId}`.
   - Any staff or owner viewing `/dashboard/enquiries` receives the record instantly—the table auto-prepends the row with a smooth highlight flash without needing a page refresh.
2. **Auditory & Visual Chime**:
   - The dashboard topbar bell counter increments with a glowing cyan pill badge.
   - An optional subtle audio ping notifies online support staff.
3. **Automated Notification Dispatch**:
   - If configured in [`modules/AUTOMATIONS_AND_NOTIFICATIONS.md`](./AUTOMATIONS_AND_NOTIFICATIONS.md), an instant SMTP email or WhatsApp alert is dispatched to the tenant owner or assigned department email with lead details.

---

## 5. Dashboard Enquiries Studio UI & Mobile Card View

Located at route **`/dashboard/enquiries`**.

### 5.1 Bento Metric Header
Displays live lead volume and conversion velocity:
- **Total Enquiries**: All-time inquiry count with percentage growth.
- **New Unread**: Count of unread inquiries with pulsing alert badge.
- **In Progress**: Count of inquiries currently being handled by staff.
- **Conversion Rate**: Percentage of inquiries converted to full CRM customers.

### 5.2 Master Data Table (Desktop Viewport)
- **Columns**:
  - `Customer Name`: Primary contact name with initial avatar.
  - `Email & Phone`: Direct contact info with one-click copy icon.
  - `Public Source`: Originating page URL (e.g. `Storefront Contact Us`).
  - `Submission Date`: Formatted relative time (`2 mins ago`) with full tooltip timestamp.
  - `Status Pill`:
    - `NEW`: Glowing cyan (`#06b6d4`)
    - `CONTACTED`: Amber (`#f59e0b`)
    - `IN_PROGRESS`: Blue (`#3b82f6`)
    - `CONVERTED`: Emerald green (`#10b981`)
    - `ARCHIVED`: Slate gray (`#64748b`)
    - `SPAM`: Rose red (`#f43f5e`)
  - `Assigned Staff`: Avatar ring of assigned team member or `[ Assign ]` pill.
  - `Quick Actions`: View detail eye icon, reply via email icon, and dustbin delete icon.

### 5.3 Mobile Card View (`< 768px`)
In compliance with the **Mobile Responsive Standard**:
- Tables never render squished or cause horizontal page scroll.
- Each enquiry renders as an individual touch-friendly card (`44x44px` touch targets).
- Tapping a card slides into the full-screen Enquiry Inspector with a prominent top `← Back to Enquiries` button.

---

## 6. Workflow Lifecycle, Notes Timeline & CRM Lead Conversion

### 6.1 Slide-Over Inspection Drawer
Clicking any enquiry opens an interactive frosted glass right drawer:
- **Header**: Contact Name, current status dropdown, and priority selector.
- **Customer Coordinates**: Clickable phone (`tel:`) and email (`mailto:`) links.
- **Full Inbound Message**: Preserves exact formatting and paragraph structure.
- **Internal Staff Notes Timeline**: Staff members can post private internal comments (e.g. *"Spoke with Sarah on phone; sending quote for 10 licenses"*). Notes are timestamped and attributed to the staff user.
- **Quick Reply Composer**: Directly send an email reply or WhatsApp message to the customer from within the drawer.

### 6.2 Single-Click CRM Customer Conversion
The ultimate goal of lead management is converting inquiries into active commercial accounts:
1. When staff click **`[ Convert to CRM Client ]`**:
2. The system checks if a `Customer` record already exists with that email:
   - If found: Links the enquiry to the existing customer profile.
   - If new: Creates a new `Customer` record in `models/Customer.ts` with name, email, phone, and source attribution (`"Inquiry: Public Contact Form"`).
3. Sets `enquiry.status = 'CONVERTED'`, stamps `convertedAt = new Date()`, and links `convertedCustomerId`.
4. A celebratory green toast confirms: *"Successfully converted Sarah Chen to CRM Customer."*

---

## 7. RBAC Permissions & Audit Governance

Access to the Enquiries Studio is strictly governed by granular RBAC permissions in [`rules/RBAC_SECURITY_RULES.md`](../rules/RBAC_SECURITY_RULES.md):

| Permission Key | Description | Developer | Owner | Admin | Staff | Customer |
| :--- | :--- | :---: | :---: | :---: | :---: | :---: |
| `enquiries:view` | Access `/dashboard/enquiries` and view inquiry records | ✅ | ✅ | ✅ | ⚡ *(Assigned Only)*| ❌ |
| `enquiries:reply` | Send email/WhatsApp replies to inquiries | ✅ | ✅ | ✅ | ⚡ *(Assigned Only)*| ❌ |
| `enquiries:edit` | Update status, priority, or add internal notes | ✅ | ✅ | ✅ | ⚡ *(Assigned Only)*| ❌ |
| `enquiries:assign` | Assign enquiries to other staff members | ✅ | ✅ | ✅ | ❌ | ❌ |
| `enquiries:convert`| Convert enquiry into full CRM Customer | ✅ | ✅ | ✅ | ⚡ *(Delegated)* | ❌ |
| `enquiries:delete` | Soft-delete enquiry or mark as spam | ✅ | ✅ | ✅ | ❌ | ❌ |

---

## 8. Summary of Core Exported Symbols & API Endpoints

### 8.1 MongoDB Models & Types
- `Enquiry`: Root model for tenant inquiries and inbound leads.
- `IEnquiry`, `IEnquiryNote`, `EnquiryStatus`, `EnquiryPriority`: TypeScript interfaces.

### 8.2 Frontend Context & Hooks
- `EnquiryProvider` & `useEnquiries()`: React Context managing list, active drawer, status updates, notes, and CRM conversion.
- `usePublicContactForm()`: Reusable lightweight submission hook for public storefronts and CMS custom sections.

### 8.3 UI Components
- `EnquiriesMasterTable`: Desktop high-density master table.
- `EnquiryMobileCard`: Mobile touch card layout.
- `EnquiryDetailDrawer`: Slide-over inspection drawer with notes timeline and CRM conversion button.
- `PublicContactForm`: Clean, accessible public contact form component with honeypot and real-time validation.

### 8.4 REST API Endpoints
- `POST /api/public/enquiries`: Public form submission endpoint (Rate-limited, honeypot protected).
- `GET /api/enquiries`: Paginated tenant inquiries with status, search, and date filters.
- `GET /api/enquiries/:id`: Retrieve single inquiry details and notes timeline.
- `PATCH /api/enquiries/:id`: Update status, priority, or assigned staff.
- `POST /api/enquiries/:id/notes`: Append internal staff note.
- `POST /api/enquiries/:id/convert`: Convert inquiry to CRM customer record.
- `DELETE /api/enquiries/:id`: Delete or archive inquiry.

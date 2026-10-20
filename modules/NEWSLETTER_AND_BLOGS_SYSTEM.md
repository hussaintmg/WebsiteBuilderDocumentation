# 📰 Master Specification: Newsletter Canvas Studio, Blog Engine & Public CMS Loop Integration

**File:** `modules/NEWSLETTER_AND_BLOGS_SYSTEM.md`  
**Classification:** Core Functional Specification — Inbound Marketing, Content Management & Audience Engagement  
**Related Documents:**
- [`rules/MODELS_AND_CONTEXTS_ARCHITECTURE.md`](../rules/MODELS_AND_CONTEXTS_ARCHITECTURE.md) (Newsletter & Blog Models and Contexts)
- [`rules/RBAC_SECURITY_RULES.md`](../rules/RBAC_SECURITY_RULES.md) (Newsletter & Blog Action Permissions)
- [`modules/SETTINGS_AND_FEATURE_FLAGS_SYSTEM.md`](./SETTINGS_AND_FEATURE_FLAGS_SYSTEM.md) (Feature Map Gating: `features.newsletter`, `features.blogs`)
- [`modules/CMS_ENGINE.md`](./CMS_ENGINE.md) (CMS Visual Canvas, 2D Vector Shape Studio & Dynamic Variable Resolver)
- [`modules/CHAT_AND_COMMUNICATION_SYSTEM.md`](./CHAT_AND_COMMUNICATION_SYSTEM.md) (Bespoke Video Player, YouTube Shortcuts & Audio Waveforms)

---

## 📑 Table of Contents
1. [Executive Architecture & Feature Flag / Plan Gate Governance](#1-executive-architecture--feature-flag--plan-gate-governance)
2. [Data Models & MongoDB Schemas](#2-data-models--mongodb-schemas)
3. [Public Footer Subscription Pipeline & Subscriber Triage](#3-public-footer-subscription-pipeline--subscriber-triage)
4. [Visual Canvas Newsletter Composer & Batch Dispatch Engine](#4-visual-canvas-newsletter-composer--batch-dispatch-engine)
5. [Blog & Articles Studio with Multimodal Rich Block Editor](#5-blog--articles-studio-with-multimodal-rich-block-editor)
6. [CMS Public Dynamic Blog Loop Section (`<BlogLoopSection />`)](#6-cms-public-dynamic-blog-loop-section)
7. [Anti-Overflow & Mobile Multi-Viewport Standards](#7-anti-overflow--mobile-multi-viewport-standards)
8. [RBAC Permissions & Audit Governance](#8-rbac-permissions--audit-governance)
9. [Summary of Core Exported Symbols & API Endpoints](#9-summary-of-core-exported-symbols--api-endpoints)

---

## 1. Executive Architecture & Feature Flag / Plan Gate Governance

Modern multi-tenant digital platforms require rich inbound marketing tools to capture and nurture customer audiences. The **Newsletter Canvas Studio** and **Blog & Articles Engine** provide enterprise-grade audience engagement capabilities embedded seamlessly into the tenant dashboard.

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                        DUAL-TIER FEATURE GATE ARCHITECTURE                             │
├───────────────────────────────────────────┬────────────────────────────────────────────┤
│ 1. TENANT SUBSCRIPTION PLAN GATE          │ 2. DYNAMIC FEATURES MAP TOGGLE             │
│ • Free Tier: Newsletter & Blogs disabled  │ • `features.newsletter: true | false`       │
│ • Starter: Newsletter active (1k cap)     │ • `features.blogs: true | false`            │
│ • Pro/Enterprise: Unlimited campaigns &   │ • Controlled via Settings & Feature Flags  │
│   Full Multimodal Blog Engine             │ • Disabling instantly hides UI & API      │
└───────────────────────────────────────────┴────────────────────────────────────────────┘
```

### The Strict Feature Flag & Plan Law
1. **Dynamic Features Map Gate**: The Newsletter and Blog subsystems **MUST NEVER render** in the dashboard navigation or public routing unless explicitly enabled in the tenant's active Features Map (`features.newsletter === true`, `features.blogs === true`) in [`modules/SETTINGS_AND_FEATURE_FLAGS_SYSTEM.md`](./SETTINGS_AND_FEATURE_FLAGS_SYSTEM.md).
2. **Plan Tier Authorization**: If the tenant's current commercial plan does not grant access to Newsletters or Blogs, the dashboard sidebar items display a locked indicator (`PRO TIER`), and clicking prompts the user with an upgrade modal.
3. **Backend API Enforcement**: Any HTTP request to `/api/newsletter/*` or `/api/blogs/*` for a tenant with disabled features is immediately rejected with HTTP `403 Feature Disabled / Upgrade Plan Required`.

---

## 2. Data Models & MongoDB Schemas

### 2.1 `NewsletterSubscriber` Schema
Maintains audience opt-in records with tenant isolation, source attribution, and GDPR-compliant unsubscribe tokens.

```typescript
import mongoose, { Schema, Document, Types } from 'mongoose';

export interface INewsletterSubscriber extends Document {
  _id: Types.ObjectId;
  companyId: Types.ObjectId;
  email: string;
  status: 'ACTIVE' | 'UNSUBSCRIBED' | 'BOUNCED';
  source: 'FOOTER_FORM' | 'POPUP_MODAL' | 'CHECKOUT_OPTIN' | 'MANUAL_IMPORT';
  unsubscribeToken: string;
  subscribedAt: Date;
  unsubscribedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const NewsletterSubscriberSchema = new Schema<INewsletterSubscriber>(
  {
    companyId: { type: Schema.Types.ObjectId, ref: 'Company', required: true, index: true },
    email: { type: String, required: true, trim: true, lowercase: true, index: true },
    status: {
      type: String,
      enum: ['ACTIVE', 'UNSUBSCRIBED', 'BOUNCED'],
      default: 'ACTIVE',
      index: true,
    },
    source: {
      type: String,
      enum: ['FOOTER_FORM', 'POPUP_MODAL', 'CHECKOUT_OPTIN', 'MANUAL_IMPORT'],
      default: 'FOOTER_FORM',
    },
    unsubscribeToken: { type: String, required: true, unique: true },
    subscribedAt: { type: Date, default: Date.now },
    unsubscribedAt: { type: Date, default: null },
  },
  { timestamps: true }
);

NewsletterSubscriberSchema.index({ companyId: 1, email: 1 }, { unique: true });
NewsletterSubscriberSchema.index({ companyId: 1, status: 1 });

export const NewsletterSubscriber =
  mongoose.models.NewsletterSubscriber ||
  model<INewsletterSubscriber>('NewsletterSubscriber', NewsletterSubscriberSchema);
```

---

### 2.2 `NewsletterCampaign` Schema
Stores email campaigns designed in the Canvas Studio, including visual layout blocks, target recipient metrics, and dispatch statistics.

```typescript
export interface INewsletterBlock {
  id: string;
  type: 'HEADER_BANNER' | 'TEXT' | 'IMAGE' | 'BUTTON' | 'BENTO_CARD' | 'DIVIDER' | 'SOCIAL_ICONS';
  props: Record<string, any>; // styling, gradient tokens, URLs, content
}

export interface INewsletterCampaign extends Document {
  _id: Types.ObjectId;
  companyId: Types.ObjectId;
  authorId: Types.ObjectId;
  title: string;
  subject: string;
  previewText?: string;
  blocks: INewsletterBlock[];
  compiledHtml?: string;
  status: 'DRAFT' | 'SCHEDULED' | 'SENDING' | 'SENT' | 'FAILED';
  scheduledAt?: Date;
  sentAt?: Date;
  stats: {
    totalRecipients: number;
    deliveredCount: number;
    openCount: number;
    clickCount: number;
    unsubscribeCount: number;
  };
  createdAt: Date;
  updatedAt: Date;
}

const NewsletterCampaignSchema = new Schema<INewsletterCampaign>(
  {
    companyId: { type: Schema.Types.ObjectId, ref: 'Company', required: true, index: true },
    authorId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true, trim: true },
    subject: { type: String, required: true, trim: true },
    previewText: { type: String, default: '' },
    blocks: [{ type: Schema.Types.Mixed, default: [] }],
    compiledHtml: { type: String },
    status: {
      type: String,
      enum: ['DRAFT', 'SCHEDULED', 'SENDING', 'SENT', 'FAILED'],
      default: 'DRAFT',
      index: true,
    },
    scheduledAt: { type: Date, default: null },
    sentAt: { type: Date, default: null },
    stats: {
      totalRecipients: { type: Number, default: 0 },
      deliveredCount: { type: Number, default: 0 },
      openCount: { type: Number, default: 0 },
      clickCount: { type: Number, default: 0 },
      unsubscribeCount: { type: Number, default: 0 },
    },
  },
  { timestamps: true }
);

NewsletterCampaignSchema.index({ companyId: 1, status: 1, createdAt: -1 });

export const NewsletterCampaign =
  mongoose.models.NewsletterCampaign ||
  model<INewsletterCampaign>('NewsletterCampaign', NewsletterCampaignSchema);
```

---

### 2.3 `BlogPost` Schema
Stores rich, multimodal editorial articles supporting diverse block types, video players, and dynamic CMS loops.

```typescript
export type BlogBlockType =
  | 'TEXT'
  | 'IMAGE'
  | 'TEXT_AND_IMAGE'
  | 'VIDEO'
  | 'AUDIO'
  | 'IMAGE_GALLERY'
  | 'BLOCKQUOTE'
  | 'CODE';

export interface IBlogBlock {
  id: string;
  type: BlogBlockType;
  text?: string;
  imageUrl?: string;
  videoUrl?: string;
  audioUrl?: string;
  galleryUrls?: string[];
  caption?: string;
  layoutVariant?: '50_50' | '60_40' | '40_60' | 'IMAGE_LEFT' | 'IMAGE_RIGHT' | 'FULL_WIDTH';
}

export interface IBlogPost extends Document {
  _id: Types.ObjectId;
  companyId: Types.ObjectId;
  authorId: Types.ObjectId;
  authorName: string;
  authorAvatar?: string;
  title: string;
  slug: string;
  excerpt: string;
  coverImageUrl: string;
  blocks: IBlogBlock[];
  category: string;
  tags: string[];
  readingTimeMinutes: number;
  status: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';
  publishedAt?: Date;
  seo: {
    metaTitle?: string;
    metaDescription?: string;
    canonicalUrl?: string;
    ogImage?: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

const BlogPostSchema = new Schema<IBlogPost>(
  {
    companyId: { type: Schema.Types.ObjectId, ref: 'Company', required: true, index: true },
    authorId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    authorName: { type: String, required: true },
    authorAvatar: { type: String, default: '' },
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, trim: true, lowercase: true },
    excerpt: { type: String, required: true },
    coverImageUrl: { type: String, required: true },
    blocks: [{ type: Schema.Types.Mixed, default: [] }],
    category: { type: String, required: true, index: true },
    tags: [{ type: String, index: true }],
    readingTimeMinutes: { type: Number, default: 3 },
    status: {
      type: String,
      enum: ['DRAFT', 'PUBLISHED', 'ARCHIVED'],
      default: 'DRAFT',
      index: true,
    },
    publishedAt: { type: Date, default: null },
    seo: {
      metaTitle: { type: String },
      metaDescription: { type: String },
      canonicalUrl: { type: String },
      ogImage: { type: String },
    },
  },
  { timestamps: true }
);

BlogPostSchema.index({ companyId: 1, slug: 1 }, { unique: true });
BlogPostSchema.index({ companyId: 1, status: 1, publishedAt: -1 });

export const BlogPost =
  mongoose.models.BlogPost || model<IBlogPost>('BlogPost', BlogPostSchema);
```

---

## 3. Public Footer Subscription Pipeline & Subscriber Triage

### 3.1 Public Footer Subscription Component
When designers or tenants enable the newsletter subscription input in the public footer or homepage hero section:
1. **Frontend Ingestion Component**: Renders an accessible floating email input with a glowing **`[ Subscribe ]`** button.
2. **Honeypot Bot Trap**: Embeds an invisible field `hp_website` to catch automated crawlers.
3. **Endpoint**: Issues `POST /api/public/newsletter/subscribe`:
   - Inspects `Host` header to resolve `companyId`.
   - Validates email syntax and deduplicates against existing records.
   - Generates a cryptographically secure `unsubscribeToken` (UUIDv4) and returns a polite confirmation message: *"Thank you for subscribing!"*

### 3.2 Dashboard Subscriber Triage (`/dashboard/newsletter/subscribers`)
- Filter by status (`ACTIVE`, `UNSUBSCRIBED`, `BOUNCED`).
- Search by email address or signup date range.
- One-click CSV export and manual single/bulk subscriber import.

---

## 4. Visual Canvas Newsletter Composer & Batch Dispatch Engine

Located at route **`/dashboard/newsletter`**.

### 4.1 Custom Canvas Style Setup
Unlike basic plain-text email editors, the Newsletter Studio provides an in-house visual canvas builder borrowing directly from [`modules/CMS_ENGINE.md`](./CMS_ENGINE.md):

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                        NEWSLETTER CANVAS COMPOSER INTERFACE                            │
├────────────────────────────────────────────────────────────────────────────────────────┤
│ [ ← Back ]   Campaign: October Product Showcase     [ Preview: Desktop | Mobile ]      │
├────────────────────────────────────────────────────────────────────────────────────────┤
│ ┌────────────────────────────────────────────────────────────────────────────────────┐ │
│ │ 1. HEADER BANNER BLOCK (Vector Shape & Gradient Hero)                              │ │
│ │    • Multi-stop mesh gradient fill (`#06b6d4` ➔ `#3b82f6` ➔ `#a855f7`)             │ │
│ │    • Brand logo token `{{assets.logo}}` with custom height & glow                  │ │
│ ├────────────────────────────────────────────────────────────────────────────────────┤ │
│ │ 2. EDITORIAL TEXT BLOCK                                                            │ │
│ │    • Rich typography with inline variables: `Hello {{subscriber.firstName}}`       │ │
│ ├────────────────────────────────────────────────────────────────────────────────────┤ │
│ │ 3. PRODUCT SHOWCASE / BENTO CARD BLOCK                                             │ │
│ │    • Side-by-side product image & pricing pill with CTA button                     │ │
│ ├────────────────────────────────────────────────────────────────────────────────────┤ │
│ │ 4. LEGAL COMPLIANCE FOOTER                                                         │ │
│ │    • Physical company address & automated 1-click unsubscribe link                 │ │
│ └────────────────────────────────────────────────────────────────────────────────────┘ │
├────────────────────────────────────────────────────────────────────────────────────────┤
│ Active Audience: 4,820 Subscribers        [ Send Test Email ]   [ 🚀 Send Campaign ]   │
└────────────────────────────────────────────────────────────────────────────────────────┘
```

### 4.2 Cross-Client Anti-Overflow Email Compilation
- **Dual Engine Output**: Compiles the visual canvas into bulletproof inline-CSS tables with zero external flexbox or grid dependencies that break in desktop Outlook.
- **Strict Bounding Box**: Maximum `640px` width on desktop; automatically collapses to `100%` on mobile email viewports without horizontal scrolling (`overflow-x: hidden`).

---

## 5. Blog & Articles Studio with Multimodal Rich Block Editor

Located at route **`/dashboard/blogs`**.

### 5.1 Multimodal Block-Based Composition
Writers and content creators have total freedom in block arrangements:

1. **Pure Text Block**:
   - Supports headings (H1–H4), lead paragraphs, bullet/numbered lists, inline bold/italic/code, and callout quote boxes.
2. **Text + Image Side-by-Side Block**:
   - Flexible column distribution: `50% / 50%`, `60% / 40%`, or `40% / 60%`.
   - Layout switcher: Image on Left vs Image on Right.
3. **Pure Image & Hero Banner Block**:
   - High-definition image uploads directly via Digital Asset Management (`CmsAsset`).
   - Aspect ratio controls (`16:9`, `21:9`, `4:3`, `Custom`), image caption, and lightbox zoom toggle.
4. **Custom Video Player Block**:
   - Embedded custom player with frosted glass HUD and YouTube desktop shortcuts (`Space`/`K` for play/pause, `F` for fullscreen, `M` for mute, `J`/`L` for 10s seek, arrows for 5s seek/volume).
   - Mobile touch gestures: Double-tap seek, hold for `2x` playback.
5. **Audio Player Block**:
   - Waveform scrubber for podcasts, voice narrations, and audio tutorials.
6. **Multi-File Image Gallery Block**:
   - Responsive multi-image grid or touch-friendly carousel.

---

## 6. CMS Public Dynamic Blog Loop Section (`<BlogLoopSection />`)

To showcase blog posts on public pages (Home, About, Resources), the CMS Section SDK provides a dedicated dynamic loop section:

```typescript
// Example CMS Section Definition: BlogLoopSection.tsx
export const BlogLoopSection = ({
  category = 'all',
  tag,
  limit = 3,
  layout = 'BENTO_GRID', // 'BENTO_GRID' | 'SLIDER_CAROUSEL' | 'HIGH_DENSITY_LIST'
}: BlogLoopProps) => {
  const { posts, isLoading } = useDynamicBlogQuery({ category, tag, limit });

  return (
    <section className="py-16 px-4 max-w-7xl mx-auto overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <article
            key={post._id}
            className="group relative rounded-2xl bg-surface/80 border border-border/40 hover:border-accent/60 transition-all duration-300 hover:-translate-y-1 overflow-hidden"
          >
            <div className="aspect-[16/9] w-full overflow-hidden">
              <img
                src={post.coverImageUrl}
                alt={post.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="p-6">
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-accent/10 text-accent">
                {post.category}
              </span>
              <h3 className="mt-3 text-lg font-bold group-hover:text-accent transition-colors">
                <a href={`/blog/${post.slug}`}>{post.title}</a>
              </h3>
              <p className="mt-2 text-sm text-text-muted line-clamp-2">{post.excerpt}</p>
              <div className="mt-4 flex items-center justify-between text-xs text-text-muted">
                <span>{post.authorName}</span>
                <span>{post.readingTimeMinutes} min read</span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};
```

---

## 7. Anti-Overflow & Mobile Multi-Viewport Standards

Both the Newsletter Composer and the Blog Editor adhere strictly to zero-overflow container disciplines:
1. **Container Isolation**: Containers wrap within `overflow-x: hidden` and strict CSS width limits (`max-w-7xl mx-auto`).
2. **Aspect Ratio Enforcement**: Media blocks enforce standard CSS aspect ratios (`aspect-video`, `aspect-[4/3]`) to prevent layout shifts during image/video loading.
3. **Mobile Ergonomics (`< 768px`)**:
   - All interactive touch targets (block add buttons, media play toggles, category pills, delete icons) enforce a minimum bounding box of **`44x44px`**.
   - Text + Image blocks automatically wrap into a single vertical column on mobile screens to prevent text squishing.

---

## 8. RBAC Permissions & Audit Governance

Access control is strictly enforced via [`rules/RBAC_SECURITY_RULES.md`](../rules/RBAC_SECURITY_RULES.md):

| Permission Key | Description | Developer | Owner | Admin | Staff | Customer |
| :--- | :--- | :---: | :---: | :---: | :---: | :---: |
| `newsletter:view` | View campaign dashboard & subscriber stats | ✅ | ✅ | ✅ | ⚡ *(Owner Delegated)* | ❌ |
| `newsletter:compose` | Create & edit visual canvas email drafts | ✅ | ✅ | ✅ | ⚡ *(Owner Delegated)* | ❌ |
| `newsletter:send` | Dispatch broadcast emails to subscribers | ✅ | ✅ | ✅ | ❌ | ❌ |
| `newsletter:subscribers_manage` | Import, export, or curate subscribers | ✅ | ✅ | ✅ | ⚡ *(Owner Delegated)* | ❌ |
| `blogs:view` | Access Blog Management studio in dashboard | ✅ | ✅ | ✅ | ⚡ *(Assigned Staff)* | ❌ |
| `blogs:create` | Draft new blog posts & upload media | ✅ | ✅ | ✅ | ⚡ *(Assigned Staff)* | ❌ |
| `blogs:edit` | Edit existing posts & manage blocks | ✅ | ✅ | ✅ | ⚡ *(Assigned Staff)* | ❌ |
| `blogs:publish` | Publish draft articles to live public routes | ✅ | ✅ | ✅ | ❌ | ❌ |
| `blogs:delete` | Soft-delete or archive blog posts | ✅ | ✅ | ✅ | ❌ | ❌ |

---

## 9. Summary of Core Exported Symbols & API Endpoints

### 9.1 MongoDB Models & Types
- `NewsletterSubscriber`, `NewsletterCampaign`, `BlogPost`
- `INewsletterSubscriber`, `INewsletterCampaign`, `IBlogPost`, `IBlogBlock`, `BlogBlockType`

### 9.2 Frontend Contexts & Hooks
- `NewsletterContext` & `useNewsletter()`: Manages campaign lifecycle, visual canvas blocks, and subscriber metrics.
- `BlogContext` & `useBlogs()`: Manages articles, draft persistence, block mutation helpers, and category tags.
- `usePublicNewsletterSubscribe()`: Lightweight client hook for public footer email subscription forms.
- `useDynamicBlogQuery()`: Real-time query hook for dynamic CMS blog loop sections.

### 9.3 UI Components
- `NewsletterCanvasComposer`: Visual email block builder with live mobile/desktop toggle.
- `BlogPostEditorStudio`: Multimodal editorial canvas with text, image, and video blocks.
- `BlogLoopSection`: CMS-ready dynamic article grid section.
- `FooterNewsletterSubscribe`: Accessible public footer subscription pill.

### 9.4 REST API Endpoints
- `POST /api/public/newsletter/subscribe`: Ingest public email opt-ins (Honeypot & rate-limited).
- `GET /api/public/blogs`: Query published blog posts with category and pagination filters.
- `GET /api/public/blogs/:slug`: Fetch single published blog post by slug.
- `GET /api/newsletter/campaigns`: List tenant campaigns.
- `POST /api/newsletter/campaigns`: Create or update campaign canvas blocks.
- `POST /api/newsletter/campaigns/:id/send`: Dispatch email broadcast to active subscribers.
- `GET /api/blogs`: Manage dashboard articles.
- `POST /api/blogs`: Create new blog post draft.
- `PATCH /api/blogs/:id`: Update blocks, SEO metadata, or publish status.
- `DELETE /api/blogs/:id`: Delete or archive blog post.

# 🤖 Master Specification: AI Assistant, Multimodal Copilot & CMS Builder Engine

**File:** `modules/AI_ASSISTANT_AND_COPILOT_SYSTEM.md`  
**Classification:** Core Functional Specification — Enterprise Autonomous Intelligence & Governance  
**Related Documents:**
- [`rules/MODELS_AND_CONTEXTS_ARCHITECTURE.md`](../rules/MODELS_AND_CONTEXTS_ARCHITECTURE.md) (AiCopilotSession, AiCopilotMessage, AiActionExecution)
- [`rules/RBAC_SECURITY_RULES.md`](../rules/RBAC_SECURITY_RULES.md) (Multi-Tenant Scoping, Action Execution & Delegation)
- [`modules/CMS_ENGINE.md`](./CMS_ENGINE.md) (CMS Visual Canvas, 2D Vector Shape Studio & Component Decorator)
- [`modules/CHAT_AND_COMMUNICATION_SYSTEM.md`](./CHAT_AND_COMMUNICATION_SYSTEM.md) (Web Audio Waveforms, YouTube Video Controls & PDF Canvas)

---

## 📑 Table of Contents
1. [Executive Architecture & High-Altitude Topology](#1-executive-architecture--high-altitude-topology)
2. [Data Models & MongoDB Schemas](#2-data-models--mongodb-schemas)
3. [Sovereign RBAC & Multi-Tenant Data Isolation Gate](#3-sovereign-rbac--multi-tenant-data-isolation-gate)
4. [The Mandatory Human-in-the-Loop Action Confirmation Engine](#4-the-mandatory-human-in-the-loop-action-confirmation-engine)
5. [Multimodal Processing Suite (Audio Waveforms, PDF Canvas, Vision OCR & Video Player)](#5-multimodal-processing-suite)
6. [CMS AI Page Builder & Full-Site Copilot](#6-cms-ai-page-builder--full-site-copilot)
7. [Mobile Ergonomics & Floating Glass Trigger](#7-mobile-ergonomics--floating-glass-trigger)
8. [Summary of Core Exported Symbols & API Endpoints](#8-summary-of-core-exported-symbols--api-endpoints)

---

## 1. Executive Architecture & High-Altitude Topology

Modern enterprise operations and website content management require an intelligent, autonomous **Omni AI Copilot** that bridges high-level human intent (natural language voice notes, uploaded PDF invoices, inspection videos, or scanned receipts) with structured database operations, communication dispatch, and design automation.

The AI Copilot operates across **two distinct user surfaces**:

```
┌──────────────────────────────────────────────────────────────────────────────────────────────┐
│                            ENTERPRISE OMNI AI COPILOT DUAL-SURFACE                           │
├───────────────────────────────────────────────┬──────────────────────────────────────────────┤
│ 1. DASHBOARD OPERATIONS COPILOT               │ 2. CMS STUDIO AI PAGE BUILDER               │
│ • Fixed trigger at bottom-right of dashboard  │ • Embedded directly in CMS Visual Canvas     │
│ • Multimodal inputs: Voice, PDF, Video, Image │ • Generates/edits Public Pages & Hero grids  │
│ • Inventory extraction (PDF invoice → items)  │ • Configures Topbar, Sidebar, Footer shells  │
│ • Financial entries, edits, and deletions     │ • Styles Auth Pages & Skeleton Loaders       │
│ • PDF generation, Email & WhatsApp automation │ • Designs PDF Studio & Email/WhatsApp cards  │
│ • Strict tenant & user permission scoping     │ • Instant interactive canvas visual diff     │
│ • MANDATORY CONFIRMATION GATE BEFORE MUTATION │ • ONE-CLICK "APPLY CHANGES" APPROVAL GATE    │
└───────────────────────────────────────────────┴──────────────────────────────────────────────┘
```

### Core Architectural Laws
1. **The Sovereign Tenant Law**: The AI Copilot is strictly partitioned by `companyId`. An AI session initiated by a tenant user has **zero visibility into or authority over** records belonging to other tenants or the global platform.
2. **The Zero-Unilateral-Mutation Law**: The AI is **forbidden from autonomously mutating records, deleting data, dispatching outbound emails/WhatsApp messages, or publishing CMS layouts** without presenting an explicit, structured **Human-in-the-Loop Action Confirmation Card** and receiving user click-approval.
3. **The RBAC Permission Mirror**: The AI possesses **no independent superpowers**. It can only plan and execute actions that the authenticated user themselves is authorized to perform via their assigned RBAC permissions.
4. **Multimodal Parity with Chat**: Employs the identical Web Audio API waveform visualizer, YouTube shortcut video player, inline PDF multi-page canvas, and image inspector proven in [`modules/CHAT_AND_COMMUNICATION_SYSTEM.md`](./CHAT_AND_COMMUNICATION_SYSTEM.md).

---

## 2. Data Models & MongoDB Schemas

### 2.1 `AiCopilotSession` Schema
Tracks the ongoing conversational session, contextual route, and user identity.

```typescript
import { Schema, model, Document, Types } from 'mongoose';

export interface IAiCopilotSession extends Document {
  _id: Types.ObjectId;
  companyId: Types.ObjectId;
  userId: Types.ObjectId;
  surface: 'DASHBOARD_OPERATIONS' | 'CMS_PAGE_BUILDER';
  activeRoute: string; // e.g. "/dashboard/inventory", "/dashboard/cms/editor/home"
  activeEntityId?: Types.ObjectId; // e.g. current product or invoice being viewed
  title: string;
  
  // Rolling Compaction & Context Management
  rollingSummary: string; // Concise AI summary of older compacted conversation turns
  compactedTurnsCount: number; // Number of turns folded into the summary
  tokenCountEstimate: number; // Estimated tokens in active context

  status: 'ACTIVE' | 'ARCHIVED';
  createdAt: Date;
  updatedAt: Date;
}

const AiCopilotSessionSchema = new Schema<IAiCopilotSession>(
  {
    companyId: { type: Schema.Types.ObjectId, ref: 'Company', required: true, index: true },
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    surface: {
      type: String,
      enum: ['DASHBOARD_OPERATIONS', 'CMS_PAGE_BUILDER'],
      required: true,
      default: 'DASHBOARD_OPERATIONS',
    },
    activeRoute: { type: String, required: true },
    activeEntityId: { type: Schema.Types.ObjectId, default: null },
    title: { type: String, default: 'New Conversation' },
    rollingSummary: { type: String, default: '' },
    compactedTurnsCount: { type: Number, default: 0 },
    tokenCountEstimate: { type: Number, default: 0 },
    status: { type: String, enum: ['ACTIVE', 'ARCHIVED'], default: 'ACTIVE' },
  },
  { timestamps: true }
);

AiCopilotSessionSchema.index({ companyId: 1, userId: 1, updatedAt: -1 });
export const AiCopilotSession = model<IAiCopilotSession>('AiCopilotSession', AiCopilotSessionSchema);
```

---

### 2.2 `AiCopilotMessage` Schema
Maintains the chronological multimodal thread, parsed attachment metadata, and linked action proposals.

```typescript
export interface IAiAttachment {
  type: 'IMAGE' | 'VIDEO' | 'AUDIO' | 'PDF' | 'DOCUMENT';
  url: string;
  filename: string;
  sizeBytes: number;
  durationSeconds?: number;
  waveform?: number[]; // 40-bar normalized amplitude array for audio
  pageCount?: number;  // For PDF multi-page documents
}

export interface IAiCopilotMessage extends Document {
  _id: Types.ObjectId;
  sessionId: Types.ObjectId;
  companyId: Types.ObjectId;
  sender: 'USER' | 'ASSISTANT' | 'SYSTEM';
  content: string; // Markdown formatted response
  attachments: IAiAttachment[];
  actionExecutionId?: Types.ObjectId; // Reference to pending or executed action
  status: 'SENT' | 'PROCESSING' | 'AWAITING_CONFIRMATION' | 'EXECUTED' | 'CANCELLED';
  createdAt: Date;
}

const AiCopilotMessageSchema = new Schema<IAiCopilotMessage>(
  {
    sessionId: { type: Schema.Types.ObjectId, ref: 'AiCopilotSession', required: true, index: true },
    companyId: { type: Schema.Types.ObjectId, ref: 'Company', required: true, index: true },
    sender: { type: String, enum: ['USER', 'ASSISTANT', 'SYSTEM'], required: true },
    content: { type: String, default: '' },
    attachments: [
      {
        type: { type: String, enum: ['IMAGE', 'VIDEO', 'AUDIO', 'PDF', 'DOCUMENT'], required: true },
        url: { type: String, required: true },
        filename: { type: String, required: true },
        sizeBytes: { type: Number, required: true },
        durationSeconds: { type: Number },
        waveform: [{ type: Number }],
        pageCount: { type: Number },
      },
    ],
    actionExecutionId: { type: Schema.Types.ObjectId, ref: 'AiActionExecution', default: null },
    status: {
      type: String,
      enum: ['SENT', 'PROCESSING', 'AWAITING_CONFIRMATION', 'EXECUTED', 'CANCELLED'],
      default: 'SENT',
    },
  },
  { timestamps: true }
);

export const AiCopilotMessage = model<IAiCopilotMessage>('AiCopilotMessage', AiCopilotMessageSchema);
```

---

### 2.3 `AiActionExecution` Schema
Represents the Human-in-the-Loop governance proposal with exact diffs, risk tiers, and affirmative execution audit trail.

```typescript
export interface IAiActionExecution extends Document {
  _id: Types.ObjectId;
  sessionId: Types.ObjectId;
  companyId: Types.ObjectId;
  userId: Types.ObjectId;
  actionType:
    | 'DATA_BULK_CREATE'
    | 'DATA_CREATE'
    | 'DATA_UPDATE'
    | 'DATA_DELETE'
    | 'COMMUNICATION_EMAIL'
    | 'COMMUNICATION_WHATSAPP'
    | 'REPORT_GENERATE'
    | 'CMS_SECTION_INJECT'
    | 'CMS_THEME_APPLY'
    | 'CMS_LAYOUT_UPDATE';
  targetEntity: string; // e.g. "products", "invoices", "orders", "cms_pages", "templates"
  requiredPermissions: string[]; // e.g. ["product:create"], ["invoice:edit"]
  payloadSummary: string; // Human-friendly description: "Create 3 new products parsed from invoice_oct.pdf"
  diffPayload: Record<string, any>; // The exact DB documents or mutation parameters
  riskLevel: 'LOW' | 'MODERATE' | 'HIGH' | 'CRITICAL';
  status: 'PENDING_CONFIRMATION' | 'APPROVED' | 'REJECTED' | 'EXPIRED';
  expiresAt: Date; // 10-minute optimistic timeout
  executedAt?: Date;
  executionResult?: {
    success: boolean;
    affectedCount: number;
    affectedIds: string[];
    error?: string;
  };
}

const AiActionExecutionSchema = new Schema<IAiActionExecution>(
  {
    sessionId: { type: Schema.Types.ObjectId, ref: 'AiCopilotSession', required: true },
    companyId: { type: Schema.Types.ObjectId, ref: 'Company', required: true, index: true },
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    actionType: {
      type: String,
      enum: [
        'DATA_BULK_CREATE',
        'DATA_CREATE',
        'DATA_UPDATE',
        'DATA_DELETE',
        'COMMUNICATION_EMAIL',
        'COMMUNICATION_WHATSAPP',
        'REPORT_GENERATE',
        'CMS_SECTION_INJECT',
        'CMS_THEME_APPLY',
        'CMS_LAYOUT_UPDATE',
      ],
      required: true,
    },
    targetEntity: { type: String, required: true },
    requiredPermissions: [{ type: String, required: true }],
    payloadSummary: { type: String, required: true },
    diffPayload: { type: Schema.Types.Mixed, required: true },
    riskLevel: {
      type: String,
      enum: ['LOW', 'MODERATE', 'HIGH', 'CRITICAL'],
      required: true,
      default: 'LOW',
    },
    status: {
      type: String,
      enum: ['PENDING_CONFIRMATION', 'APPROVED', 'REJECTED', 'EXPIRED'],
      default: 'PENDING_CONFIRMATION',
    },
    expiresAt: {
      type: Date,
      default: () => new Date(Date.now() + 10 * 60 * 1000), // 10 minutes
    },
    executedAt: { type: Date },
    executionResult: {
      success: { type: Boolean },
      affectedCount: { type: Number },
      affectedIds: [{ type: String }],
      error: { type: String },
    },
  },
  { timestamps: true }
);

export const AiActionExecution = model<IAiActionExecution>('AiActionExecution', AiActionExecutionSchema);
```

---

### 2.4 `AiUserMemory` Schema (`models/AiUserMemory.ts`)
Maintains the user's permanent, cross-session personal memory. Injected into every prompt across all chats for that user.

```typescript
export interface ILearnedFact {
  factKey: string; // e.g. "preferred_theme", "primary_location", "coding_language"
  factValue: string; // e.g. "Dark Mode Obsidian", "Dubai, UAE", "TypeScript / Tailwind"
  confidence: number; // 0.0 - 1.0
  sourceSessionId?: Types.ObjectId;
  learnedAt: Date;
}

export interface IAiUserMemory extends Document {
  _id: Types.ObjectId;
  companyId: Types.ObjectId;
  userId: Types.ObjectId;

  // Static Core Identity Profile
  coreProfile: {
    fullName?: string;
    preferredName?: string;
    location?: string;
    language?: string; // e.g. "English", "Urdu", "Arabic"
    roleDescription?: string;
    companyBusinessFocus?: string;
  };

  // User-Defined Custom Instructions
  customInstructions: string; // e.g. "Always provide complete code snippets; prefer clean bullet points"

  // Dynamically Learned Cross-Chat Facts
  learnedFacts: ILearnedFact[];

  isMemoryEnabled: boolean; // Master toggle to enable/pause cross-chat memory
  lastMemoryExtractionAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const AiUserMemorySchema = new Schema<IAiUserMemory>(
  {
    companyId: { type: Schema.Types.ObjectId, ref: 'Company', required: true, index: true },
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    coreProfile: {
      fullName: String,
      preferredName: String,
      location: String,
      language: { type: String, default: 'English' },
      roleDescription: String,
      companyBusinessFocus: String,
    },
    customInstructions: { type: String, default: '' },
    learnedFacts: [
      {
        factKey: { type: String, required: true },
        factValue: { type: String, required: true },
        confidence: { type: Number, default: 1.0 },
        sourceSessionId: { type: Schema.Types.ObjectId, ref: 'AiCopilotSession' },
        learnedAt: { type: Date, default: Date.now },
      },
    ],
    isMemoryEnabled: { type: Boolean, default: true },
    lastMemoryExtractionAt: { type: Date },
  },
  { timestamps: true }
);

AiUserMemorySchema.index({ companyId: 1, userId: 1 }, { unique: true });
export const AiUserMemory = model<IAiUserMemory>('AiUserMemory', AiUserMemorySchema);
```

---

### 2.5 Context Window Auto-Compaction & Rolling Session Summarizer Engine

To prevent context exhaustion, token latency degradation, and astronomical LLM API costs on long-running discussions:

#### 1. Threshold Detection (The 12-Turn / 4,000-Token Barrier)
- When the active message stream in `AiCopilotSession` crosses **12 turns** (or exceeds **4,000 tokens**):
  - A lightweight asynchronous worker (e.g. Gemini 1.5 Flash / GPT-4o-mini) triggers background compaction.
  - The worker analyzes turns 1 through 8 (preserving the most recent 4-6 turns untouched).
  - It generates a dense, factual summary capturing key decisions, user parameters, and uncompleted actions.
  - The resulting text updates `AiCopilotSession.rollingSummary`, and `compactedTurnsCount` increments.

#### 2. Three-Tier Hierarchical Prompt Assembly Law
Every subsequent prompt sent to the LLM adheres to this strict layered assembly:

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                        HIERARCHICAL CONTEXT ASSEMBLY SEQUENCE                          │
├────────────────────────────────────────────────────────────────────────────────────────┤
│ Layer 1: System Directive & Tenant RBAC Guardrails                                     │
│ • Sovereign companyId restriction, tool definitions, output schemas                    │
├────────────────────────────────────────────────────────────────────────────────────────┤
│ Layer 2: Persistent User Long-Term Memory (<USER_MEMORY>)                              │
│ • Cross-Chat Scope: Injected into EVERY conversation for this user                     │
│ • Injects: Core Name, Location, Role, Custom Instructions, Learned Facts               │
├────────────────────────────────────────────────────────────────────────────────────────┤
│ Layer 3: Rolling Session Summary (<SESSION_ROLLING_SUMMARY>)                           │
│ • In-Session Scope: ISOLATED STRICTLY to this conversation session                      │
│ • Empty on New Chat! Zero summary leakage into fresh conversations                     │
├────────────────────────────────────────────────────────────────────────────────────────┤
│ Layer 4: Active Uncompacted Recent Messages (Last 4–6 Turns)                           │
│ • Verbatim user prompts, assistant answers, and action execution cards                 │
└────────────────────────────────────────────────────────────────────────────────────────┘
```

#### 3. Client Compaction Divider (`<AiCompactedSummaryDivider />`)
- Compacted turns do not mysteriously vanish from the user's viewport without explanation.
- An in-stream frosted divider appears:
  `[ 📜 Older conversation compacted (8 turns) — Click to inspect running summary ]`
- Tapping it smoothly unrolls an accordion card showing the exact summary the AI is retaining.

---

## 3. Sovereign RBAC & Multi-Tenant Data Isolation Gate

Every interaction between the user, the AI Copilot model, and the underlying database is strictly guarded by the **Tenant and RBAC Security Gate**:

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                        AI COPILOT SOVEREIGN RBAC & DATA PIPELINE                       │
├────────────────────────────────────────────────────────────────────────────────────────┤
│ 1. USER PROMPT INGESTION & CONTEXT RESOLUTION                                          │
│    • Injects authenticated session tokens: `req.user.companyId`, `req.user.role`       │
│    • Resolves authorized domain scope: `req.user.permissions`                          │
├────────────────────────────────────────────────────────────────────────────────────────┤
│ 2. MODEL TOOL-CALL INTERCEPTION & PERMISSION CHECK                                     │
│    • AI selects tool: `bulkCreateProductsFromPdf(items)`                               │
│    • Gate evaluates required permission: `product:create` in user permissions?         │
│      ├─ NO  → 403 Rejection: "You lack 'product:create' privilege. Action blocked."     │
│      └─ YES → Proceed to Tenant Scope Validation                                       │
├────────────────────────────────────────────────────────────────────────────────────────┤
│ 3. MANDATORY MULTI-TENANT FILTER INJECTION                                             │
│    • Tool automatically appends `{ companyId: req.user.companyId }` to all DB queries │
│    • Querying other companies is physically blocked by the DB abstraction layer        │
├────────────────────────────────────────────────────────────────────────────────────────┤
│ 4. HUMAN-IN-THE-LOOP ACTION PROPOSAL CREATION                                          │
│    • Action NOT executed! Serializes proposal to `AiActionExecution`                   │
│    • Renders Confirmation Card in AI chat stream                                       │
│    • Waits for affirmative user click: [ Confirm & Execute ]                           │
└────────────────────────────────────────────────────────────────────────────────────────┘
```

### Permission Enforcement Matrix for AI Tools

| Action Requested by User | AI Backend Tool Name | Required RBAC Permission | Tenant Scope Filter | Confirmation Required? |
| :--- | :--- | :--- | :--- | :--- |
| Extract PDF products & create items | `bulkCreateProducts` | `product:create` | `companyId: session.companyId` | **YES (Moderate Risk)** |
| Create or register new Invoice | `createInvoice` | `invoice:create` | `companyId: session.companyId` | **YES (Moderate Risk)** |
| Delete products, orders, or records | `deleteRecord` / `bulkDelete` | `*:delete` (Entity-specific) | `companyId: session.companyId` | **YES (HIGH Risk)** |
| Edit pricing, status, or details | `updateRecord` | `*:edit` (Entity-specific) | `companyId: session.companyId` | **YES (Moderate Risk)** |
| Generate & download PDF report | `generatePdfReport` | `report:view` / `report:export` | `companyId: session.companyId` | **NO (Read-only)** |
| Dispatch bulk Email notification | `dispatchEmailCampaign` | `automation:email_send` | `companyId: session.companyId` | **YES (HIGH Risk)** |
| Dispatch WhatsApp broadcast message | `dispatchWhatsApp` | `automation:whatsapp_send`| `companyId: session.companyId` | **YES (HIGH Risk)** |
| CMS: Inject new section into page | `cmsInjectSection` | `cms:page_edit` | `companyId: session.companyId` | **YES (One-click Apply)** |
| CMS: Update Topbar/Sidebar shell | `cmsUpdateShell` | `cms:shell_edit` | `companyId: session.companyId` | **YES (One-click Apply)** |
| CMS: Update Auth or Skeleton layout | `cmsUpdateTheme` | `cms:theme_edit` | `companyId: session.companyId` | **YES (One-click Apply)** |

---

## 4. The Mandatory Human-in-the-Loop Action Confirmation Engine

The AI Copilot does **not** make unilateral decisions that affect corporate data, inventory counts, accounting journals, customer communications, or storefront layouts.

### 4.1 The Interactive Confirmation Card Anatomy
When a mutating action is proposed, the AI outputs an interactive component directly inside the chat message stream:

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│ ⚠️  CONFIRM ACTION: Bulk Create 3 Products from Invoice                               │
│ Risk Tier: MODERATE   •   Target: Inventory / Products   •   Expires in: 09:42         │
├────────────────────────────────────────────────────────────────────────────────────────┤
│ Extracted from uploaded: invoice_october.pdf (Page 2)                                 │
│                                                                                        │
│ 1. Ergonomic Mesh Chair                                                                │
│    • SKU: CHAIR-092   • Cost: $199.99   • Price: $299.00   • Initial Stock: 15        │
│ 2. Motorized Standing Desk                                                             │
│    • SKU: DESK-404    • Cost: $420.00   • Price: $650.00   • Initial Stock: 8         │
│ 3. Dual Monitor Heavy Arm                                                              │
│    • SKU: ARM-110     • Cost: $45.00    • Price: $85.00    • Initial Stock: 25        │
├────────────────────────────────────────────────────────────────────────────────────────┤
│ [ ✅ Confirm & Execute (Enter) ]                       [ ❌ Reject / Cancel (Esc) ]   │
└────────────────────────────────────────────────────────────────────────────────────────┘
```

### 4.2 Lifecycle of an Action Execution
1. **Model Emits Proposal**: The AI model identifies the user's intent, parses the uploaded PDF/image, structures the JSON payload, and calls `proposeAction()`.
2. **Backend Persists Proposal**: The proposal is stored in MongoDB with status `PENDING_CONFIRMATION` and an expiration timestamp of 10 minutes.
3. **Optimistic Locking**: If the user navigates away or the token expires, the action cannot be triggered.
4. **User Click Execution**:
   - Tapping **`[ Confirm & Execute ]`** issues an authenticated `POST /api/ai/actions/:id/execute` request.
   - The server validates that `req.user._id === execution.userId`, verifies that the user still has the required permissions, runs the transaction inside a MongoDB session, and marks `status: 'APPROVED'`.
   - The UI displays a live progress spinner, followed by a celebratory success toast: *"Successfully created 3 products in inventory."*
5. **Rejection**:
   - Tapping **`[ Reject / Cancel ]`** marks `status: 'REJECTED'`. The AI acknowledges the cancellation: *"Action discarded. No records were modified."*

---

## 5. Multimodal Processing Suite

The AI Copilot features a comprehensive multimodal ingestion suite allowing users to communicate via their preferred medium.

### 5.1 Real-Time Voice Notes with Pulsing Waveforms
- **Audio Capture**: Uses the browser's `AudioContext` and `AnalyserNode` to record microphone input with high-quality Opus encoding (`audio/webm;codecs=opus`).
- **Live Reactive Waveform**: Projects 40 live, pulsating cyan/purple waveform bars inside the bottom composer bar that dynamically match the user's speaking pitch and amplitude.
- **Speech-to-Text Transcription**: Streams the audio to an in-house or cloud Whisper transcription service, automatically displaying the transcribed text in the prompt input while preserving the audio note.
- **Scrubbable Playback**: Messages containing voice notes render as interactive scrubbable waveform bars with `1x`, `1.5x`, and `2x` instant speed toggle pills.

### 5.2 PDF Document Canvas & Data Ingestion
- **Multi-Page Inline Canvas**: When a user uploads a PDF (e.g. supplier invoice, purchase order, vendor catalog), the Copilot displays an inline multi-page canvas with page navigation pills (`Page 1 of 4`) and zoom controls.
- **Document Table Extraction**: The AI document ingestion worker extracts tabular rows, item descriptions, line totals, tax amounts, and payment terms.
- **Natural Language Parsing**:
  - *"Read this invoice, add all products to our inventory, and draft an invoice to be paid."*
  - The AI parses the tabular data and generates a structured `DATA_BULK_CREATE` proposal for user review.

### 5.3 Vision OCR & Image Inspection
- **Receipt & Invoice Scanning**: Users can drop high-resolution photographs or scanned receipts (`JPG`, `PNG`, `WEBP`).
- **OCR Engine**: Tesseract / Vision AI parses skewed text, serial numbers, and pricing tags.
- **Visual Inspection**: Users can upload damaged product photos or site inspection snapshots; the AI analyzes the visual condition and writes incident reports.

### 5.4 Video Player with YouTube Shortcuts
- **Embedded Custom Player**: Uploaded MP4/WebM videos render inside the message bubble with custom frosted glass HUD controls, time scrubbers, volume sliders, and `2x` toggle.
- **Full YouTube Desktop Shortcuts Engine**:
  - `Space` / `K`: Play / Pause toggle.
  - `F`: Fullscreen toggle.
  - `M`: Mute / Unmute audio.
  - `J` / `L`: Seek backward / forward 10 seconds.
  - `←` / `→`: Seek backward / forward 5 seconds.
  - `↑` / `↓`: Volume increase / decrease (5%).
  - `<` / `>`: Decrease / increase playback speed (`0.5x`, `1x`, `1.5x`, `2x`).
- **Mobile Touch Gestures**: Double-tap left/right edge to seek 10s; hold anywhere on video to speed up playback to `2x`.
- **Keyframe Extraction**: AI samples video keyframes to analyze dynamic events or summarize tutorial steps.

---

## 6. CMS AI Page Builder & Full-Site Copilot

Beyond operational dashboard tasks, the AI Copilot functions as a full-fledged **Generative Web Designer** embedded directly inside the CMS Studio (`/dashboard/cms/*`).

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                        CMS STUDIO AI GENERATIVE BUILDER SCOPE                          │
├───────────────────────────────────────┬────────────────────────────────────────────────┤
│ 1. DYNAMIC PUBLIC PAGES & SECTIONS    │ • Generate Hero layouts, Bento grids, FAQs     │
│                                       │ • Write persuasive marketing & feature copy    │
│                                       │ • Reorder, insert, or delete page sections     │
├───────────────────────────────────────┼────────────────────────────────────────────────┤
│ 2. GLOBAL NAVIGATION SHELLS           │ • Public Topbar, Mobile Bottom Nav, Footer     │
│                                       │ • Dashboard Resizable Sidebar & Header Pill    │
├───────────────────────────────────────┼────────────────────────────────────────────────┤
│ 3. SKELETON LOADERS & AUTH PAGES      │ • Custom animated SVG placeholder geometries   │
│                                       │ • Login, Signup, Face Lock & MFA card layouts  │
├───────────────────────────────────────┼────────────────────────────────────────────────┤
│ 4. DOCUMENT & MESSAGING TEMPLATES     │ • PDF Canvas Studio invoice/contract templates │
│                                       │ • HTML Email marketing & transactional designs │
│                                       │ • WhatsApp rich broadcast message templates    │
└───────────────────────────────────────┴────────────────────────────────────────────────┘
```

### 6.1 Conversational CMS Directives
Users interact with the CMS AI Copilot conversationally:
- *"Add a 3-column bento feature section highlighting our AI analytics, with dark glassmorphism and cyan border glows."*
- *"Update our public Topbar to floating pill mode with 16px frosted glass blur."*
- *"Generate a skeleton loading layout for the order details page matching our card geometry."*
- *"Redesign the invoice PDF template: place a diagonal vector banner on top with company logo and cyan accent table headers."*
- *"Draft a WhatsApp broadcast announcement for our Black Friday discount."*

### 6.2 The CMS Visual Diff & One-Click Approval Gate
When the CMS AI generates or edits a page, section, or template:
1. It creates an in-memory virtual DOM patch.
2. The CMS Visual Canvas highlights the affected region with an animated neon preview border.
3. An inline floating pill appears on the canvas:
   - **`[ Apply to Canvas (Enter) ]`**: Commits the generated layout into the live CMS document state.
   - **`[ Discard Changes (Esc) ]`**: Reverts the canvas to the pristine state.
4. Changes are never saved to the public database without explicit user confirmation.

---

## 7. Mobile Ergonomics & Floating Glass Trigger

The AI Copilot interface is engineered for rapid access without obstructing critical dashboard data.

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                        MOBILE & DESKTOP COPILOT VIEWPORT STANDARDS                     │
├────────────────────────────────────────────────────────────────────────────────────────┤
│ DESKTOP VIEWPORT (`>= 1024px`):                                                        │
│ • Floating trigger pill at bottom-right corner (`bottom-6 right-6`).                   │
│ • Ambient glowing aura: `box-shadow: 0 0 24px rgba(6, 182, 212, 0.35)`.               │
│ • Expands into an elegant sliding right drawer (`480px` width) with frosted glass HUD. │
│ • Can be detached into a floating draggable modal.                                     │
├────────────────────────────────────────────────────────────────────────────────────────┤
│ MOBILE VIEWPORT (`< 768px`):                                                           │
│ • Floating glass pill pinned above Mobile Bottom Navigation (`bottom-20 right-4`).     │
│ • Tap opens a 100% full-screen slide-over sheet with dedicated top navigation bar:     │
│   `[ ← Back to Dashboard ]    Omni AI Copilot    [ Clear Session ]`                    │
│ • Touch targets strictly adhere to minimum `44x44px`.                                  │
│ • Bottom composer incorporates responsive microphone hold-to-record gestures.          │
│ • Zero horizontal overflow (`overflow-x: hidden`).                                     │
└────────────────────────────────────────────────────────────────────────────────────────┘
```

### 7.5 Chat History Architecture & Client Single-Fetch Caching
Users can revisit, search, and continue past conversational threads through an integrated **Chat History Drawer** embedded directly in the AI Assistant:

#### 1. Zero Redundant Fetching Law
- **Single Mount Fetch**: When the AI Assistant component mounts, `useAiChatHistory` queries `GET /api/v1/ai/sessions` **strictly once**.
- **Indefinite Cache Lifetime**: Managed via TanStack Query (React Query) / SWR with:
  ```typescript
  staleTime: Infinity,
  gcTime: 1000 * 60 * 60, // 1 hour
  refetchOnWindowFocus: false,
  ```
- **Optimistic Local Mutations**:
  - Starting a new chat inserts an ephemeral session entry into the cache instantly.
  - After the first user message, an LLM worker generates a concise 4-word title (e.g. *"Product Pricing Strategy"*), updating the local session cache optimistically.
  - Renaming or archiving a session mutates the local array in `< 1ms` before background sync.
- **Instant Session Swapping**: Tapping any past conversation loads its cached messages immediately from client memory. If un-cached, it fetches `GET /api/v1/ai/sessions/:id/messages` once and caches it.

#### 2. React Hook: `useAiChatHistory.ts`
```typescript
// hooks/useAiChatHistory.ts
"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";

export interface ChatSessionPreview {
  _id: string;
  title: string;
  surface: string;
  activeRoute: string;
  compactedTurnsCount: number;
  updatedAt: string;
}

export function useAiChatHistory(companyId: string) {
  const queryClient = useQueryClient();
  const queryKey = ["ai_sessions", companyId];

  // Fetch strictly ONCE per application lifecycle
  const { data: sessions = [], isLoading } = useQuery<ChatSessionPreview[]>({
    queryKey,
    queryFn: async () => {
      const res = await fetch(`/api/v1/ai/sessions?companyId=${companyId}`);
      if (!res.ok) throw new Error("Failed to load chat history");
      return res.json();
    },
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  });

  // Optimistic session title updater
  const updateSessionTitle = useCallback(
    (sessionId: string, newTitle: string) => {
      queryClient.setQueryData<ChatSessionPreview[]>(queryKey, (old = []) =>
        old.map((s) => (s._id === sessionId ? { ...s, title: newTitle } : s))
      );
    },
    [queryClient, queryKey]
  );

  // Optimistic new session prepend
  const addSessionOptimistic = useCallback(
    (newSession: ChatSessionPreview) => {
      queryClient.setQueryData<ChatSessionPreview[]>(queryKey, (old = []) => [
        newSession,
        ...old,
      ]);
    },
    [queryClient, queryKey]
  );

  return {
    sessions,
    isLoading,
    updateSessionTitle,
    addSessionOptimistic,
  };
}
```

#### 3. Production UI Component: `<AiChatHistoryDrawer />`
```tsx
// components/ai/AiChatHistoryDrawer.tsx
"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, MessageSquare, Clock, Plus, X, ChevronRight } from "lucide-react";
import { ChatSessionPreview } from "@/hooks/useAiChatHistory";

interface AiChatHistoryDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  sessions: ChatSessionPreview[];
  activeSessionId: string;
  onSelectSession: (sessionId: string) => void;
  onNewChat: () => void;
}

export const AiChatHistoryDrawer: React.FC<AiChatHistoryDrawerProps> = ({
  isOpen,
  onClose,
  sessions,
  activeSessionId,
  onSelectSession,
  onNewChat,
}) => {
  const [searchQuery, setSearchQuery] = useState("");

  // Group sessions by Today, Yesterday, Previous 7 Days, Older
  const groupedSessions = useMemo(() => {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
    const yesterday = today - 86400000;
    const sevenDaysAgo = today - 7 * 86400000;

    const filtered = sessions.filter((s) =>
      s.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const groups: { [key: string]: ChatSessionPreview[] } = {
      Today: [],
      Yesterday: [],
      "Previous 7 Days": [],
      Older: [],
    };

    filtered.forEach((s) => {
      const time = new Date(s.updatedAt).getTime();
      if (time >= today) groups.Today.push(s);
      else if (time >= yesterday) groups.Yesterday.push(s);
      else if (time >= sevenDaysAgo) groups["Previous 7 Days"].push(s);
      else groups.Older.push(s);
    });

    return groups;
  }, [sessions, searchQuery]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ x: "-100%", opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: "-100%", opacity: 0 }}
          transition={{ type: "spring", stiffness: 350, damping: 30 }}
          className="absolute inset-y-0 left-0 w-80 bg-slate-950/95 backdrop-blur-xl border-r border-white/10 z-30 flex flex-col shadow-2xl"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-white/10">
            <div className="flex items-center gap-2 text-white font-bold text-sm">
              <Clock className="w-4 h-4 text-cyan-400" />
              <span>Chat History</span>
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={onNewChat}
                title="New Chat"
                className="p-1.5 rounded-lg bg-cyan-600/20 hover:bg-cyan-600 text-cyan-300 hover:text-white transition-colors"
              >
                <Plus className="w-4 h-4" />
              </button>
              <button
                onClick={onClose}
                className="p-1.5 rounded-lg hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Search Filter */}
          <div className="p-3 border-b border-white/5">
            <div className="flex items-center gap-2 rounded-xl bg-slate-900 border border-white/10 px-3 py-1.5 text-xs">
              <Search className="w-3.5 h-3.5 text-slate-500" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search conversations..."
                className="w-full bg-transparent text-slate-200 placeholder-slate-500 focus:outline-none"
              />
            </div>
          </div>

          {/* Grouped Session List */}
          <div className="flex-1 overflow-y-auto p-3 space-y-4">
            {Object.entries(groupedSessions).map(
              ([groupName, items]) =>
                items.length > 0 && (
                  <div key={groupName} className="space-y-1.5">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 px-2">
                      {groupName}
                    </span>
                    {items.map((session) => {
                      const isActive = session._id === activeSessionId;
                      return (
                        <button
                          key={session._id}
                          onClick={() => {
                            onSelectSession(session._id);
                            onClose();
                          }}
                          className={`w-full flex items-center justify-between p-2.5 rounded-xl text-left text-xs transition-all ${
                            isActive
                              ? "bg-cyan-500/15 border border-cyan-500/30 text-cyan-300 font-semibold"
                              : "hover:bg-white/5 text-slate-300 hover:text-white border border-transparent"
                          }`}
                        >
                          <div className="flex items-center gap-2 truncate">
                            <MessageSquare className="w-3.5 h-3.5 flex-shrink-0 text-slate-500" />
                            <span className="truncate">{session.title}</span>
                          </div>
                          <ChevronRight className="w-3 h-3 text-slate-600 flex-shrink-0" />
                        </button>
                      );
                    })}
                  </div>
                )
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
```

---

## 8. Summary of Core Exported Symbols & API Endpoints

### 8.1 MongoDB Models & Types
- `AiCopilotSession`: Tracks ongoing conversational sessions with `rollingSummary` and `compactedTurnsCount`.
- `AiUserMemory`: Manages cross-chat persistent memory, core profile, custom instructions, and learned facts.
- `AiCopilotMessage`: Stores multimodal messages, attachments, waveforms, and linked action proposals.
- `AiActionExecution`: Stores Human-in-the-Loop action proposals, diffs, risk tiers, and execution audits.

### 8.2 Frontend Context & Hooks
- `AiCopilotProvider` / `useAiCopilot()`: Manages active session lifecycle, message stream, and action execution queue.
- `useAiChatHistory()`: SWR / React Query cache providing single-fetch chat history with `staleTime: Infinity` and zero redundant network calls.
- `useAiMemory()`: Exposes cross-chat persistent facts, custom instructions, and memory toggle.
- `useAiAudioRecorder()`: Web Audio API recording hook capturing live 40-frequency waveform arrays.
- `useAiDocumentParser()`: In-browser PDF canvas preview and table extraction helper.

### 8.3 UI Components
- `AiCopilotTrigger`: Floating bottom-right action trigger pill with glowing cyan aura.
- `AiCopilotDrawer`: Slide-over responsive glassmorphism conversation window.
- `AiChatHistoryDrawer`: Left sliding history drawer with date-based grouping (`Today`, `Yesterday`, `Older`) and instant search.
- `AiCompactedSummaryDivider`: Frosted in-stream accordion divider revealing running compacted turn summaries.
- `ActionConfirmationCard`: Human-in-the-Loop interactive confirmation card with diff preview and `[ Confirm & Execute ]` button.
- `AiVoiceWaveformComposer`: Dynamic recording bar featuring pulsing frequency bars.
- `AiMediaPreviewer`: In-copilot custom video player, multi-page PDF canvas, audio player, and image lightbox.

### 8.4 REST & Streaming API Endpoints
- `POST /api/ai/sessions`: Initialize or resume an AI Copilot session for the current route.
- `GET /api/v1/ai/sessions`: Retrieve all past chat sessions for the user (cached on client).
- `GET /api/v1/ai/memory`: Retrieve persistent user memory facts and instructions.
- `PUT /api/v1/ai/memory`: Update custom instructions or learned facts.
- `POST /api/ai/chat`: Send a prompt with multimodal attachments (streams markdown response via Server-Sent Events).
- `POST /api/ai/actions/:id/execute`: Affirmatively confirm and execute a proposed action under user credentials.
- `POST /api/ai/actions/:id/reject`: Discard a proposed action.
- `POST /api/ai/cms/generate`: Generate a CMS section layout, shell configuration, or document template proposal.


# Master Architecture: Root Models & React Contexts System

> **PURPOSE**: Establishes the non-negotiable architectural standard for MongoDB data models, React Context state management, API call encapsulation, and single-source-of-truth variable synchronization across the entire application.

---

## 🏛️ 1. Architecture Topology & Structural Separation

```mermaid
graph TD
    subgraph Root Models Architecture [/models]
        M1[models/Program.ts]
        M2[models/Order.ts]
        M3[models/User.ts]
        M4[models/Company.ts]
        M5[models/CmsAsset.ts]
        M6[models/CmsPage.ts]
        M7[models/CmsWebsiteDetails.ts]
        M8[models/CmsDocumentTemplate.ts]
        M_Barrel[models/index.ts]
    end

    subgraph Root Context Architecture [/context]
        C1[context/ProgramContext.tsx]
        C2[context/OrderContext.tsx]
        C3[context/UserContext.tsx]
        C4[context/CompanyContext.tsx]
        C5[context/AssetContext.tsx]
        C6[context/CmsPageContext.tsx]
        C7[context/WebsiteDetailsContext.tsx]
        C8[context/DocumentTemplateContext.tsx]
        
        subgraph Global Structural Contexts [2-3 Extra]
            GC1[context/AuthContext.tsx]
            GC2[context/ThemeContext.tsx]
            GC3[context/ToastContext.tsx]
        end
    end

    subgraph Consumer Architecture [Pages & Components]
        PublicPages[Public Landing Pages: Minimal Contexts Only]
        DashboardRoutes[Protected Dashboard Routes: Scoped Domain Contexts]
        TablesAndCards[Master Tables, Slides, & Forms]
    end

    M1 -.->|Types & Interfaces| C1
    M2 -.->|Types & Interfaces| C2
    M5 -.->|Types & Interfaces| C5

    C1 -->|Encapsulated API & Shared State| DashboardRoutes
    C2 -->|Encapsulated API & Shared State| TablesAndCards
    GC1 -->|Session & Roles| PublicPages
    GC1 -->|Session & Roles| DashboardRoutes
```

---

## 🗄️ 2. The Root `/models` Directory Architecture

### 2.1 File Separation Rule
- The `models/` directory must be located directly at the project root (`/models`).
- **Strict One-Model-Per-File Policy**: Every MongoDB collection must reside in its own dedicated TypeScript file. No clumped or multi-model files are permitted.
- An `index.ts` barrel file re-exports all models and interfaces for clean imports.

```
models/
├── index.ts                      # Barrel re-export
├── Program.ts                    # Program model & schema
├── Order.ts                      # Order model & schema
├── User.ts                       # User & authentication profile
├── Role.ts                       # Granular RBAC, page actions & row-level data scoping
├── Customer.ts                   # Customer & client CRM with staff attribution
├── Company.ts                    # Tenant company profile
├── CmsPage.ts                    # CMS visual pages & sections
├── CmsAsset.ts                   # Central digital assets DAM
├── CmsWebsiteDetails.ts          # Global site identity & contact info
├── CmsMaintenanceConfig.ts       # Website maintenance mode & sovereign access
├── CmsAuthThemeConfig.ts         # Auth pages styling & responsive layouts
├── CmsDocumentTemplate.ts        # PDF Canvas, Email & WhatsApp templates
├── CmsWorkflow.ts                # Visual automation workflows
├── CmsVariableRegistry.ts        # Dynamic variable catalog
├── ChatConversation.ts          # Real-time multi-tenant chat conversations
├── ChatMessage.ts               # Chat messages with ticks, reactions & media
├── AiCopilotSession.ts          # AI Copilot operational & CMS sessions
├── AiUserMemory.ts              # Cross-chat persistent user memory, custom instructions & facts
├── AiCopilotMessage.ts          # Multimodal copilot conversation stream
├── AiActionExecution.ts         # Human-in-the-loop action proposals & diffs
├── Enquiry.ts                   # Inbound leads & public contact form submissions
├── NewsletterSubscriber.ts      # Newsletter subscribers & opt-in records
├── NewsletterCampaign.ts        # Canvas email campaigns & dispatch stats
└── BlogPost.ts                  # Multimodal blog articles & dynamic CMS loop posts
```

### 2.2 Standard Model File Specification
Every model file must adhere to this standard anatomy:
1. **TypeScript Interface**: Typed document extending `mongoose.Document`.
2. **Strict Multi-Tenant Scoping**: All tenant-owned records enforce `companyId: mongoose.Types.ObjectId`.
3. **Compound Indexes**: Optimized for tenant queries, sorting, and unique business keys.
4. **Cached Model Export**: Prevents Next.js hot-reloading duplicate model compilation errors (`mongoose.models.<Name> || mongoose.model(...)`).

#### Concrete Reference Model: `models/Program.ts`
```typescript
// models/Program.ts
import mongoose, { Schema, Document } from "mongoose";

export interface IProgram extends Document {
  companyId: mongoose.Types.ObjectId;
  title: string;
  code: string; // e.g. "PROG-2026-001"
  description?: string;
  category: "ENGINEERING" | "TRAINING" | "OPERATIONS" | "MAINTENANCE" | "COMPLIANCE";
  status: "DRAFT" | "ACTIVE" | "UNDER_REVIEW" | "ARCHIVED" | "COMPLETED";
  startDate: Date;
  endDate?: Date;
  budget: number;
  leadInstructorId?: mongoose.Types.ObjectId;
  assignedStaffIds: mongoose.Types.ObjectId[];
  metadata: Record<string, any>;
  createdAt: Date;
  updatedAt: Date;
}

const ProgramSchema = new Schema<IProgram>(
  {
    companyId: {
      type: Schema.Types.ObjectId,
      ref: "Company",
      required: true,
      index: true,
    },
    title: {
      type: String,
      required: [true, "Program title is required"],
      trim: true,
    },
    code: {
      type: String,
      required: [true, "Program code is required"],
      uppercase: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    category: {
      type: String,
      enum: ["ENGINEERING", "TRAINING", "OPERATIONS", "MAINTENANCE", "COMPLIANCE"],
      default: "TRAINING",
      index: true,
    },
    status: {
      type: String,
      enum: ["DRAFT", "ACTIVE", "UNDER_REVIEW", "ARCHIVED", "COMPLETED"],
      default: "DRAFT",
      index: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
    },
    budget: {
      type: Number,
      default: 0,
    },
    leadInstructorId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    assignedStaffIds: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    metadata: {
      type: Schema.Types.Mixed,
      default: {},
    },
  },
  {
    timestamps: true,
  }
);

// Compound Indexes for fast tenant-scoped queries
ProgramSchema.index({ companyId: 1, status: 1 });
ProgramSchema.index({ companyId: 1, code: 1 }, { unique: true });
ProgramSchema.index({ companyId: 1, createdAt: -1 });

export const Program =
  mongoose.models.Program || mongoose.model<IProgram>("Program", ProgramSchema);
```

---

## 🌐 3. The Root `/context` Directory Architecture

### 3.1 One-to-One Model-to-Context Mapping Rule
- The `context/` directory must reside directly at the project root (`/context`).
- **Every MongoDB model must have a corresponding React Context**:
  - `models/Program.ts` ➔ `context/ProgramContext.tsx`
  - `models/Order.ts` ➔ `context/OrderContext.tsx`
  - `models/User.ts` ➔ `context/UserContext.tsx`
  - `models/Role.ts` ➔ `context/RoleContext.tsx`
  - `models/Customer.ts` ➔ `context/CustomerContext.tsx`
  - `models/Company.ts` ➔ `context/CompanyContext.tsx`
  - `models/CmsAsset.ts` ➔ `context/AssetContext.tsx`
  - `models/CmsPage.ts` ➔ `context/CmsPageContext.tsx`
  - `models/CmsWebsiteDetails.ts` ➔ `context/WebsiteDetailsContext.tsx`
  - `models/CmsMaintenanceConfig.ts` ➔ `context/MaintenanceContext.tsx`
  - `models/CmsAuthThemeConfig.ts` ➔ `context/AuthThemeContext.tsx`
  - `models/CmsDocumentTemplate.ts` ➔ `context/DocumentTemplateContext.tsx`
  - `models/ChatConversation.ts` & `ChatMessage.ts` ➔ `context/ChatContext.tsx`
  - `models/AiCopilotSession.ts` & `AiActionExecution.ts` ➔ `context/AiCopilotContext.tsx`
  - `models/Enquiry.ts` ➔ `context/EnquiryContext.tsx`
  - `models/NewsletterSubscriber.ts` & `NewsletterCampaign.ts` ➔ `context/NewsletterContext.tsx`
  - `models/BlogPost.ts` ➔ `context/BlogContext.tsx`
- **Extra 2–3 Global Structural Contexts Allowed**:
  - `context/AuthContext.tsx`: Manages active user session, JWT cookies, custom AI Facelock probe, and multi-account switching.
  - `context/ThemeContext.tsx`: Manages dual Light/Dark theme mode, HSL tokens, and `localStorage` skeleton theme persistence.
  - `context/ToastContext.tsx`: Manages global toast alerts, audio chimes, and action undo prompts.

```
context/
├── index.ts                      # Barrel export of hooks & providers
├── ProgramContext.tsx            # Program state, CRUD & domain actions
├── OrderContext.tsx              # Order state, slide view, table data
├── UserContext.tsx               # Users & staff management
├── RoleContext.tsx               # Granular RBAC, 3-tier matrix & permission studio
├── CustomerContext.tsx           # CRM customers & staff referral attribution
├── CompanyContext.tsx            # Tenant company settings & credentials
├── AssetContext.tsx              # Central DAM library & upload triggers
├── CmsPageContext.tsx            # CMS visual pages & section trees
├── WebsiteDetailsContext.tsx     # Brand logos, contact info & cascading
├── MaintenanceContext.tsx        # Maintenance mode state, toggles & bypass rules
├── AuthThemeContext.tsx          # 5-card auth styling & layout modes
├── DocumentTemplateContext.tsx   # PDF Canvas, Email & WhatsApp templates
├── ChatContext.tsx               # Real-time chat, Socket.IO, audio waveforms
├── AiCopilotContext.tsx          # AI Copilot sessions, multimodal stream & confirmation actions
├── EnquiryContext.tsx            # Leads, contact submissions & CRM conversion
├── NewsletterContext.tsx         # Newsletter campaigns, visual canvas & subscribers
├── BlogContext.tsx               # Blog articles, multimodal blocks & CMS loops
│
├── AuthContext.tsx               # [Global Structural 1] Master session
├── ThemeContext.tsx              # [Global Structural 2] Light/Dark & Skeletons
└── ToastContext.tsx              # [Global Structural 3] Global toast engine
```

---

## ⚡ 4. Encapsulation of API Calls & Domain Operations

### 4.1 The "No Direct Component API Calls" Law
> 🚫 **IRONCLAD RULE**:
> **NO API call (`fetch`, `axios`, or raw HTTP query) should ever be made directly inside a random component or page.**
>
> If a context exists for that model/domain, **100% of data fetching, mutations, and business operations MUST be executed through the functions provided by that Context**.

### 4.2 Standard Context Structure & Action Scope
Each model context must encapsulate:
1. **Core State Variables**:
   - `items: T[]`: The shared list of records.
   - `selectedItem: T | null`: Currently active/inspected record.
   - `isLoading: boolean`: Initial fetch status.
   - `isSubmitting: boolean`: Mutation in-progress status.
   - `error: string | null`: Error message for user feedback.
   - `pagination & filters`: Search query, category, status, current page.
2. **Standard CRUD Actions**:
   - `fetchItems(params)`: Loads data into state once.
   - `fetchItemById(id)`: Retrieves single record and updates `selectedItem`.
   - `createItem(data)`: Sends `POST`, validates, and prepends to `items`.
   - `editItem(id, updates)`: Sends `PUT/PATCH` and updates record in-place.
   - `deleteItem(id)`: Sends `DELETE` and filters record out of `items`.
3. **Domain-Specific Operations**:
   - Dedicated business workflows belonging to that entity (e.g. `downloadProgramPdf`, `sendProgramEmail`, `bulkUpdateStatus`).
   - **Boundary Enforcement**: Do NOT shove foreign operations into the context. For example, user authentication belongs in `AuthContext`, NOT in `ProgramContext`.

#### Concrete Reference Context: `context/ProgramContext.tsx`
```tsx
// context/ProgramContext.tsx
"use client";

import React, { createContext, useContext, useState, useCallback, useMemo } from "react";
import { IProgram } from "@/models/Program";
import { useToast } from "@/context/ToastContext";

interface IProgramFilters {
  search?: string;
  category?: string;
  status?: string;
}

interface IProgramContextState {
  programs: IProgram[];
  selectedProgram: IProgram | null;
  isLoading: boolean;
  isSubmitting: boolean;
  error: string | null;
  filters: IProgramFilters;
  totalCount: number;
  
  // CRUD Actions
  fetchPrograms: (filters?: IProgramFilters) => Promise<void>;
  fetchProgramById: (id: string) => Promise<IProgram | null>;
  createProgram: (data: Partial<IProgram>) => Promise<IProgram | null>;
  editProgram: (id: string, updates: Partial<IProgram>) => Promise<IProgram | null>;
  deleteProgram: (id: string) => Promise<boolean>;
  setSelectedProgram: (program: IProgram | null) => void;
  setFilters: (filters: IProgramFilters) => void;

  // Domain-Specific Operations
  downloadProgramPdf: (programId: string, templateKey?: string) => Promise<void>;
  sendProgramEmail: (programId: string, recipientEmails: string[], templateKey?: string) => Promise<boolean>;
  bulkUpdateProgramStatus: (programIds: string[], status: IProgram["status"]) => Promise<boolean>;
}

const ProgramContext = createContext<IProgramContextState | undefined>(undefined);

export const ProgramProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [programs, setPrograms] = useState<IProgram[]>([]);
  const [selectedProgram, setSelectedProgram] = useState<IProgram | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<IProgramFilters>({});
  const [totalCount, setTotalCount] = useState<number>(0);
  const { showToast } = useToast();

  // 1. Fetch All Programs (Loads data ONCE into context state)
  const fetchPrograms = useCallback(async (customFilters?: IProgramFilters) => {
    setIsLoading(true);
    setError(null);
    try {
      const activeFilters = customFilters || filters;
      const query = new URLSearchParams(activeFilters as Record<string, string>).toString();
      const res = await fetch(`/api/v1/programs?${query}`, { credentials: "include" });
      const json = await res.json();
      
      if (!res.ok || !json.success) {
        throw new Error(json.message || "Failed to fetch programs");
      }

      setPrograms(json.data.programs);
      setTotalCount(json.data.totalCount || json.data.programs.length);
    } catch (err: any) {
      setError(err.message);
      showToast({ type: "error", title: "Error", message: err.message });
    } finally {
      setIsLoading(false);
    }
  }, [filters, showToast]);

  // 2. Fetch Single Program by ID
  const fetchProgramById = useCallback(async (id: string) => {
    // Check if already in memory
    const existing = programs.find((p) => p._id.toString() === id);
    if (existing) {
      setSelectedProgram(existing);
      return existing;
    }

    setIsLoading(true);
    try {
      const res = await fetch(`/api/v1/programs/${id}`, { credentials: "include" });
      const json = await res.json();
      if (!res.ok || !json.success) throw new Error(json.message);
      setSelectedProgram(json.data);
      return json.data;
    } catch (err: any) {
      showToast({ type: "error", title: "Failed to load program", message: err.message });
      return null;
    } finally {
      setIsLoading(false);
    }
  }, [programs, showToast]);

  // 3. Create Program (In-place Immutable Update)
  const createProgram = useCallback(async (data: Partial<IProgram>) => {
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/v1/programs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (!res.ok || !json.success) throw new Error(json.message);

      const created: IProgram = json.data;
      // Update existing variable immutably: Prepend new item
      setPrograms((prev) => [created, ...prev]);
      setTotalCount((prev) => prev + 1);
      showToast({ type: "success", title: "Created", message: `Program "${created.title}" created successfully.` });
      return created;
    } catch (err: any) {
      showToast({ type: "error", title: "Creation Failed", message: err.message });
      return null;
    } finally {
      setIsSubmitting(false);
    }
  }, [showToast]);

  // 4. Edit Program (In-place Immutable Update: All consumers re-render automatically)
  const editProgram = useCallback(async (id: string, updates: Partial<IProgram>) => {
    setIsSubmitting(true);
    try {
      const res = await fetch(`/api/v1/programs/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(updates),
      });
      const json = await res.json();
      if (!res.ok || !json.success) throw new Error(json.message);

      const updated: IProgram = json.data;
      // In-place update of existing variable
      setPrograms((prev) => prev.map((item) => (item._id.toString() === id ? updated : item)));
      if (selectedProgram?._id.toString() === id) {
        setSelectedProgram(updated);
      }

      showToast({ type: "success", title: "Updated", message: `Program "${updated.title}" updated.` });
      return updated;
    } catch (err: any) {
      showToast({ type: "error", title: "Update Failed", message: err.message });
      return null;
    } finally {
      setIsSubmitting(false);
    }
  }, [selectedProgram, showToast]);

  // 5. Delete Program
  const deleteProgram = useCallback(async (id: string) => {
    setIsSubmitting(true);
    try {
      const res = await fetch(`/api/v1/programs/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      const json = await res.json();
      if (!res.ok || !json.success) throw new Error(json.message);

      // In-place removal from shared state
      setPrograms((prev) => prev.filter((item) => item._id.toString() !== id));
      setTotalCount((prev) => Math.max(0, prev - 1));
      if (selectedProgram?._id.toString() === id) {
        setSelectedProgram(null);
      }

      showToast({ type: "success", title: "Deleted", message: "Program deleted successfully." });
      return true;
    } catch (err: any) {
      showToast({ type: "error", title: "Delete Failed", message: err.message });
      return false;
    } finally {
      setIsSubmitting(false);
    }
  }, [selectedProgram, showToast]);

  // 6. Domain-Specific Action: Download Program PDF
  const downloadProgramPdf = useCallback(async (programId: string, templateKey = "PROGRAM_SYLLABUS") => {
    try {
      showToast({ type: "info", title: "Generating PDF", message: "Compiling high-fidelity program document..." });
      const res = await fetch(`/api/v1/programs/${programId}/pdf?templateKey=${templateKey}`, {
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed to generate program PDF");

      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `Program_${programId}.pdf`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
      showToast({ type: "success", title: "Downloaded", message: "Program PDF saved successfully." });
    } catch (err: any) {
      showToast({ type: "error", title: "PDF Export Error", message: err.message });
    }
  }, [showToast]);

  // 7. Domain-Specific Action: Send Program Email
  const sendProgramEmail = useCallback(async (programId: string, recipientEmails: string[], templateKey = "PROGRAM_ANNOUNCEMENT") => {
    setIsSubmitting(true);
    try {
      const res = await fetch(`/api/v1/programs/${programId}/send-email`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ recipientEmails, templateKey }),
      });
      const json = await res.json();
      if (!res.ok || !json.success) throw new Error(json.message);

      showToast({ type: "success", title: "Email Dispatched", message: `Program sent to ${recipientEmails.length} recipients.` });
      return true;
    } catch (err: any) {
      showToast({ type: "error", title: "Email Failed", message: err.message });
      return false;
    } finally {
      setIsSubmitting(false);
    }
  }, [showToast]);

  // 8. Domain-Specific Action: Bulk Update Status
  const bulkUpdateProgramStatus = useCallback(async (programIds: string[], status: IProgram["status"]) => {
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/v1/programs/bulk-status", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ programIds, status }),
      });
      const json = await res.json();
      if (!res.ok || !json.success) throw new Error(json.message);

      // In-place update of all matching records
      setPrograms((prev) =>
        prev.map((item) => (programIds.includes(item._id.toString()) ? { ...item, status } : item))
      );

      showToast({ type: "success", title: "Bulk Status Updated", message: `${programIds.length} programs updated to ${status}.` });
      return true;
    } catch (err: any) {
      showToast({ type: "error", title: "Bulk Action Failed", message: err.message });
      return false;
    } finally {
      setIsSubmitting(false);
    }
  }, [showToast]);

  const value = useMemo(
    () => ({
      programs,
      selectedProgram,
      isLoading,
      isSubmitting,
      error,
      filters,
      totalCount,
      fetchPrograms,
      fetchProgramById,
      createProgram,
      editProgram,
      deleteProgram,
      setSelectedProgram,
      setFilters,
      downloadProgramPdf,
      sendProgramEmail,
      bulkUpdateProgramStatus,
    }),
    [
      programs,
      selectedProgram,
      isLoading,
      isSubmitting,
      error,
      filters,
      totalCount,
      fetchPrograms,
      fetchProgramById,
      createProgram,
      editProgram,
      deleteProgram,
      downloadProgramPdf,
      sendProgramEmail,
      bulkUpdateProgramStatus,
    ]
  );

  return <ProgramContext.Provider value={value}>{children}</ProgramContext.Provider>;
};

export const useProgram = (): IProgramContextState => {
  const context = useContext(ProgramContext);
  if (!context) {
    throw new Error("useProgram must be used within a ProgramProvider");
  }
  return context;
};
```

---

## 🚫 5. The Public Pages Restraint Law

> 🛡️ **PERFORMANCE DIRECTIVE**:
> **Normal public pages MUST NOT mount unnecessary domain contexts.**

1. **Public Viewport Footprint**:
   - Routes like `/`, `/about`, `/contact`, `/pricing`, and `/blog` only need:
     - `ThemeContext` (Light/Dark mode)
     - `ToastContext` (Alerts)
     - `AuthContext` (To display "Login" vs "Dashboard" avatar in the topbar)
     - `WebsiteDetailsContext` (For logo, contact phone, and footer links)
2. **Strict Exclusion**:
   - Contexts like `ProgramContext`, `OrderContext`, `WorkflowContext`, or `AssetContext` **MUST NEVER be mounted in `app/layout.tsx` globally**.
3. **Route-Scoped Mounting**:
   - Domain contexts are mounted strictly in the layout of their respective route segment:
     ```tsx
     // app/dashboard/programs/layout.tsx
     import { ProgramProvider } from "@/context/ProgramContext";

     export default function ProgramsLayout({ children }: { children: React.ReactNode }) {
       return <ProgramProvider>{children}</ProgramProvider>;
     }
     ```

---

## 🔄 6. Single-Fetch & Shared State Management (No Duplicate Variables)

### 6.1 The Single-Fetch Guarantee
- When a user enters `/dashboard/programs`, `ProgramContext` executes `fetchPrograms()` **EXACTLY ONCE**.
- Moving between sub-views (e.g. from Table view to Cards view, or from Slide view to Detail Drawer) **NEVER re-fetches the list from the server**.
- The components directly consume the shared `programs` state from `useProgram()`.

### 6.2 The Zero-Duplicate-Variable Law
> ⚠️ **DEVELOPER ANTI-PATTERN TO AVOID**:
> ```tsx
> // ❌ WRONG: Creating a local duplicate variable inside a component
> const ProgramList = () => {
>   const { programs } = useProgram();
>   const [myLocalPrograms, setMyLocalPrograms] = useState(programs); // VIOLATION!
>   ...
> };
> ```
> ```tsx
> // ✅ CORRECT: Directly consume the shared context variable
> const ProgramList = () => {
>   const { programs, editProgram, deleteProgram } = useProgram();
>   // Uses programs directly. Any update in context updates this component instantly!
>   ...
> };
> ```

### 6.3 In-Place State Mutation & Automatic UI Re-Rendering
When an item is created, edited, or deleted:
1. The Context sends the API request to the backend.
2. Upon API confirmation, the Context updates its internal state variable in-place:
   - **Edit**: Replaces the matching item in `programs` array with the updated object.
   - **Delete**: Filters out the deleted item from `programs`.
   - **Create**: Prepends the newly created item into `programs`.
3. **Automatic Re-Rendering**: Because `programs` reference in the Context has changed immutably, **all components listening to `useProgram()` across the page automatically re-render with the fresh data**. No manual page reloads, no duplicate API calls, and zero state desynchronization.

---

## 📋 7. Standard Model-to-Context Catalog

| MongoDB Model (`/models`) | Corresponding Context (`/context`) | Primary Encapsulated Responsibilities |
| :--- | :--- | :--- |
| `Program.ts` | `ProgramContext.tsx` | Programs CRUD, syllabus PDF download, announcement emails, bulk status. |
| `Product.ts` | `ProductContext.tsx` | Inventory items, pricing, 3D model binding (`model3dUrl`), variants, stock tracking. |
| `Order.ts` | `OrderContext.tsx` | Order table & slide view, bulk status update, packing slip PDF, shipping alerts. |
| `User.ts` | `UserContext.tsx` | Staff directory, role assignments, profile edits, password reset dispatches. |
| `Company.ts` | `CompanyContext.tsx` | Tenant profile, business settings, custom integration credentials, billing. |
| `CmsAsset.ts` | `AssetContext.tsx` | Central DAM library, 3D model auto-ingestion (.glb/.gltf/AR), video scrubbing, reference token copier. |
| `CmsPage.ts` | `CmsPageContext.tsx` | Public pages list, visual section reordering, draft vs published state. |
| `CmsWebsiteDetails.ts` | `WebsiteDetailsContext.tsx` | Site name, favicons, light/dark logos, contact info, shell auto-cascading. |
| `CmsAuthThemeConfig.ts` | `AuthThemeContext.tsx` | 5-card auth styling, dual-mode light/dark palettes, mobile layout switches. |
| `CmsDocumentTemplate.ts`| `DocumentTemplateContext.tsx`| PDF Canvas Studio layers, Email block tables, WhatsApp formatted templates. |
| `CmsWorkflow.ts` | `WorkflowContext.tsx` | Node-based workflow canvas, webhook triggers, execution trace logs. |
| `CmsVariableRegistry.ts`| `VariableRegistryContext.tsx`| Universal variable catalog, dynamic model schema synchronization. |
| `ChatConversation.ts`  | `ChatContext.tsx`            | Real-time Socket.IO chat, voice waveforms, media controls, ticks & unread counts. |
| *(Global Structural 1)* | `AuthContext.tsx` | Session cookie verification, custom AI Facelock probe, multi-account switcher. |
| *(Global Structural 2)* | `ThemeContext.tsx` | Global Light/Dark mode, HSL harmony engine, `localStorage` skeleton themes. |
| *(Global Structural 3)* | `ToastContext.tsx` | Screen-space toast notifications, sound chimes, auto-dismiss timers. |

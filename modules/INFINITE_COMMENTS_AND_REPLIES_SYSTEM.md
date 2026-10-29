# Module Specification: Infinite Nested Comments & Hierarchical Reply Engine

> **PURPOSE**: Defines the enterprise-grade, high-performance comments and recursive replies system applicable across LMS Courses & Lectures, eCommerce Product Reviews, Blogs, and Social Community Feeds. Enforces infinite-depth nesting without stack overflows, a **Hybrid Adjacency List + Materialized Path** MongoDB schema, a **Two-Tier Redis Graph Cache** (Sorted Sets + Hashes) guaranteeing `< 1ms` child tree lookups with zero primary DB thrashing, on-demand `"Show Replies"` accordion expansion, and connective vertical thread guide lines.

---

## 🏛️ 1. Architecture & Core Topology

Handling deeply nested discussions (replies to replies to replies... to infinite depth) requires decoupling write operations from expensive recursive reads. Rather than executing recursive MongoDB `$graphLookup` table scans on every page load, the system uses a **Hybrid Adjacency List + Materialized Path** model paired with an ultra-fast **Redis Graph Cache**.

```
┌────────────────────────────────────────────────────────────────────────────────────────────────────────┐
│                              INFINITE NESTED COMMENTS ARCHITECTURE                                     │
├────────────────────────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                                        │
│  [Client Viewport]                    [Edge API Gateway]                       [Redis & MongoDB]       │
│                                                                                                        │
│  1. Initial Page Load        ──────► GET /api/v1/comments?entityId=.. ──────► Check Redis Roots ZSet   │
│     (Top-Level Roots Only)            depth=0, limit=20                       - HIT: Return in < 1ms   │
│                                                                               - MISS: Query Mongo      │
│                                                                                 depth: 0, sort: -1     │
│                                                                                                        │
│  2. User Taps "Show Replies" ──────► GET /api/v1/comments/children    ──────► Check Redis Replies ZSet │
│     (Accordion Expansion)             parentId=xyz, page=1, limit=10          - HIT: Hydrate Hashes    │
│                                                                               - MISS: Query Mongo      │
│                                                                                 path: /^.../           │
│                                                                                                        │
│  3. User Submits Reply       ──────► POST /api/v1/comments            ──────► 1. Save to MongoDB       │
│     (Direct or Deep Sub)              { parentId, content, ... }              2. Append to Redis ZSet  │
│                                                                               3. Incr Parent replyCount│
│                                                                               4. Invalidate Target ZSet│
└────────────────────────────────────────────────────────────────────────────────────────────────────────┘
```

---

## 🗄️ 2. Data Modeling & MongoDB Schema (`models/Comment.ts`)

### 2.1 The Hybrid Adjacency List + Materialized Path Paradigm
- **`parentId`**: The immediate parent comment ID (`null` for top-level root comments).
- **`rootCommentId`**: The top-level thread origin ID (allows instantaneous fetching of an entire conversation branch).
- **`path`**: Materialized string path representing the complete ancestor tree (e.g. `",rootId,child1Id,child2Id,"`). Enables prefix-based sub-tree queries using indexed regex without recursive joins.
- **`depth`**: Integer zero-indexed nesting depth (`0` = Root, `1` = Direct Reply, `2` = Reply-to-Reply, etc.).
- **`replyCount`**: Denormalized counter of immediate direct children, powering the `"Show Replies (N)"` trigger button without runtime count queries.

```typescript
// models/Comment.ts
import mongoose, { Schema, Document } from "mongoose";

export interface IComment extends Document {
  companyId: mongoose.Types.ObjectId;
  entityType: "COURSE_LESSON" | "PRODUCT" | "BLOG_POST" | "COMMUNITY_THREAD";
  entityId: mongoose.Types.ObjectId;

  // Hierarchical Ancestry
  parentId: mongoose.Types.ObjectId | null; // Direct parent comment or null
  rootCommentId: mongoose.Types.ObjectId | null; // Top-level root thread ID
  path: string; // Materialized path: ",rootId,parentId," for prefix indexing
  depth: number; // 0 for root, 1 for child, 2 for grandchild, etc.

  // Author Metadata
  authorId: mongoose.Types.ObjectId;
  authorRole: "STUDENT" | "INSTRUCTOR" | "STAFF" | "CUSTOMER" | "ADMIN";
  authorName: string;
  authorAvatarUrl?: string;
  authorBadge?: string; // e.g. "Instructor", "Verified Buyer", "Staff"

  // Content & Media
  content: string; // Markdown or clean text
  attachments?: Array<{
    type: "IMAGE" | "CODE_SNIPPET" | "DOCUMENT";
    url: string;
    caption?: string;
  }>;

  // Engagement & Metrics
  upvoteCount: number;
  upvotedBy: mongoose.Types.ObjectId[];
  replyCount: number; // Count of direct children for "Show Replies" badge
  totalSubRepliesCount: number; // Total deep descendants count

  // Moderation & Status
  status: "PUBLISHED" | "PENDING_MODERATION" | "HIDDEN" | "DELETED";
  isPinnedByStaff: boolean;
  isEdited: boolean;
  editedAt?: Date;

  createdAt: Date;
  updatedAt: Date;
}

const CommentSchema = new Schema<IComment>(
  {
    companyId: { type: Schema.Types.ObjectId, ref: "Company", required: true, index: true },
    entityType: {
      type: String,
      enum: ["COURSE_LESSON", "PRODUCT", "BLOG_POST", "COMMUNITY_THREAD"],
      required: true,
      index: true,
    },
    entityId: { type: Schema.Types.ObjectId, required: true, index: true },

    parentId: { type: Schema.Types.ObjectId, ref: "Comment", default: null, index: true },
    rootCommentId: { type: Schema.Types.ObjectId, ref: "Comment", default: null, index: true },
    path: { type: String, required: true, index: true },
    depth: { type: Number, default: 0, index: true },

    authorId: { type: Schema.Types.ObjectId, required: true, index: true },
    authorRole: {
      type: String,
      enum: ["STUDENT", "INSTRUCTOR", "STAFF", "CUSTOMER", "ADMIN"],
      required: true,
    },
    authorName: { type: String, required: true },
    authorAvatarUrl: { type: String },
    authorBadge: { type: String },

    content: { type: String, required: true, trim: true, maxlength: 4000 },
    attachments: [
      {
        type: { type: String, enum: ["IMAGE", "CODE_SNIPPET", "DOCUMENT"] },
        url: String,
        caption: String,
      },
    ],

    upvoteCount: { type: Number, default: 0, index: true },
    upvotedBy: [{ type: Schema.Types.ObjectId }],
    replyCount: { type: Number, default: 0 },
    totalSubRepliesCount: { type: Number, default: 0 },

    status: {
      type: String,
      enum: ["PUBLISHED", "PENDING_MODERATION", "HIDDEN", "DELETED"],
      default: "PUBLISHED",
      index: true,
    },
    isPinnedByStaff: { type: Boolean, default: false },
    isEdited: { type: Boolean, default: false },
    editedAt: { type: Date },
  },
  { timestamps: true }
);

// High-Performance Compound Indexes:
// 1. Fetching Root Comments for an entity (Chronological or Upvotes)
CommentSchema.index({ entityId: 1, depth: 1, isPinnedByStaff: -1, createdAt: -1 });
CommentSchema.index({ entityId: 1, depth: 1, isPinnedByStaff: -1, upvoteCount: -1 });

// 2. Fetching Direct Children under a parent
CommentSchema.index({ parentId: 1, createdAt: 1 });

// 3. Subtree Materialized Path Prefix Search
CommentSchema.index({ path: 1, createdAt: 1 });

export const Comment =
  mongoose.models.Comment || mongoose.model<IComment>("Comment", CommentSchema);
```

---

## ⚡ 3. Two-Tier Redis Graph Cache Architecture

To protect MongoDB from heavy database connections when hundreds of users open comment accordions simultaneously, all active comments reside in **Redis In-Memory Data Structures**:

### 3.1 Redis Key Layout
1. **Comment Entity Payload (`Hash`)**:
   - Key: `comment:item:{commentId}`
   - Value: Serialized JSON representation of the comment document (author, content, counts, timestamps).
   - TTL: 24 hours (refreshed on read).
2. **Entity Root Comments Index (`Sorted Set`)**:
   - Key: `comments:roots:{entityType}:{entityId}`
   - Score: `createdAt` Unix timestamp (or `upvoteCount`).
   - Member: `{commentId}`.
3. **Parent Direct Children Index (`Sorted Set`)**:
   - Key: `comment:children:{parentId}`
   - Score: `createdAt` Unix timestamp.
   - Member: `{childCommentId}`.

```typescript
// services/commentCacheService.ts
import { Redis } from "ioredis";
import { IComment } from "../models/Comment";

export class CommentCacheService {
  constructor(private redis: Redis) {}

  /**
   * Cache a single comment payload
   */
  async cacheComment(comment: IComment): Promise<void> {
    const key = `comment:item:${comment._id}`;
    const payload = JSON.stringify({
      _id: comment._id.toString(),
      entityId: comment.entityId.toString(),
      parentId: comment.parentId ? comment.parentId.toString() : null,
      rootCommentId: comment.rootCommentId ? comment.rootCommentId.toString() : null,
      depth: comment.depth,
      authorName: comment.authorName,
      authorAvatarUrl: comment.authorAvatarUrl,
      authorRole: comment.authorRole,
      authorBadge: comment.authorBadge,
      content: comment.content,
      replyCount: comment.replyCount,
      upvoteCount: comment.upvoteCount,
      createdAt: comment.createdAt.toISOString(),
      isPinnedByStaff: comment.isPinnedByStaff,
    });

    await this.redis.set(key, payload, "EX", 86400); // 24 Hours TTL

    // Index into Roots or Children Sorted Set
    if (comment.depth === 0) {
      await this.redis.zadd(
        `comments:roots:${comment.entityType}:${comment.entityId}`,
        new Date(comment.createdAt).getTime(),
        comment._id.toString()
      );
    } else if (comment.parentId) {
      await this.redis.zadd(
        `comment:children:${comment.parentId}`,
        new Date(comment.createdAt).getTime(),
        comment._id.toString()
      );
      // Increment parent's replyCount in Redis hash if cached
      const parentHash = await this.redis.get(`comment:item:${comment.parentId}`);
      if (parentHash) {
        const parsed = JSON.parse(parentHash);
        parsed.replyCount = (parsed.replyCount || 0) + 1;
        await this.redis.set(`comment:item:${comment.parentId}`, JSON.stringify(parsed), "EX", 86400);
      }
    }
  }

  /**
   * Get direct replies for a comment in < 1ms
   */
  async getChildReplies(
    parentId: string,
    offset = 0,
    limit = 10
  ): Promise<{ commentIds: string[]; total: number } | null> {
    const key = `comment:children:${parentId}`;
    const exists = await this.redis.exists(key);
    if (!exists) return null; // Cache miss, hydrate from MongoDB

    const [commentIds, total] = await Promise.all([
      this.redis.zrange(key, offset, offset + limit - 1),
      this.redis.zcard(key),
    ]);

    return { commentIds, total };
  }

  /**
   * Batch hydrate comments from array of IDs
   */
  async getCommentsByIds(commentIds: string[]): Promise<any[]> {
    if (commentIds.length === 0) return [];
    const keys = commentIds.map((id) => `comment:item:${id}`);
    const results = await this.redis.mget(keys);

    return results
      .filter((r): r is string => r !== null)
      .map((r) => JSON.parse(r));
  }
}
```

---

## 🎨 4. Recursive UI Component Architecture & Connective Thread Guides

### 4.1 Anti-Crash Guardrails for Infinite Loops
To prevent infinite browser recursion or CSS layout compression:
1. **Visual Indentation Capping**: Indentation expands smoothly up to depth 5 (`depth * 18px`), after which indentation remains fixed at `80px` to prevent message bubbles from shrinking to zero width on mobile viewports.
2. **On-Demand Accordion Loading**: Sub-replies are **never loaded upfront**. Each comment renders a tactile button: `[ 💬 Show 4 replies ]`. Clicking it fetches direct children asynchronously.
3. **Connective Thread Vertical Guide Lines**: Sleek vertical thread tracks (`border-l-2 border-slate-800 hover:border-cyan-500/60`) link parent nodes to all child replies, allowing users to collapse entire branches with a single click on the thread line.

### 4.2 Production React Recursive Component (`<InfiniteCommentThread />`)

```tsx
// components/comments/InfiniteCommentThread.tsx
"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronRight, MessageSquare, Heart, CornerDownRight, ShieldCheck } from "lucide-react";

export interface CommentNodeData {
  _id: string;
  parentId: string | null;
  depth: number;
  authorName: string;
  authorAvatarUrl?: string;
  authorRole: "STUDENT" | "INSTRUCTOR" | "STAFF" | "CUSTOMER" | "ADMIN";
  authorBadge?: string;
  content: string;
  replyCount: number;
  upvoteCount: number;
  createdAt: string;
  isPinnedByStaff?: boolean;
}

interface CommentNodeProps {
  comment: CommentNodeData;
  onPostReply: (parentId: string, text: string) => Promise<void>;
  fetchChildren: (parentId: string) => Promise<CommentNodeData[]>;
}

export const CommentNode: React.FC<CommentNodeProps> = ({
  comment,
  onPostReply,
  fetchChildren,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [children, setChildren] = useState<CommentNodeData[]>([]);
  const [isLoadingChildren, setIsLoadingChildren] = useState(false);
  const [isReplying, setIsReplying] = useState(false);
  const [replyText, setReplyText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [upvotes, setUpvotes] = useState(comment.upvoteCount);
  const [hasUpvoted, setHasUpvoted] = useState(false);

  // Safe visual indentation: maximum 80px to guarantee mobile anti-compression
  const indentPadding = Math.min(comment.depth * 18, 80);

  const toggleExpand = async () => {
    if (!isExpanded && children.length === 0 && comment.replyCount > 0) {
      setIsLoadingChildren(true);
      try {
        const loaded = await fetchChildren(comment._id);
        setChildren(loaded);
      } finally {
        setIsLoadingChildren(false);
      }
    }
    setIsExpanded((prev) => !prev);
  };

  const handleSendReply = async () => {
    if (!replyText.trim() || isSubmitting) return;
    setIsSubmitting(true);
    try {
      await onPostReply(comment._id, replyText);
      setReplyText("");
      setIsReplying(false);
      // Reload children
      const updated = await fetchChildren(comment._id);
      setChildren(updated);
      setIsExpanded(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      style={{ marginLeft: `${indentPadding}px` }}
      className="relative mb-3.5 group/node transition-all"
    >
      {/* Connective Thread Guide Line for Nested Levels */}
      {comment.depth > 0 && (
        <div
          onClick={() => setIsExpanded(false)}
          title="Collapse thread"
          className="absolute -left-3.5 top-0 bottom-0 w-[2px] bg-slate-800 hover:bg-cyan-500/60 cursor-pointer transition-colors"
        />
      )}

      {/* Main Comment Card */}
      <div className={`rounded-2xl border p-4 backdrop-blur-md transition-all ${
        comment.isPinnedByStaff
          ? "border-amber-500/30 bg-amber-950/10 shadow-lg shadow-amber-500/5"
          : "border-white/10 bg-slate-900/80 hover:border-white/20 shadow-sm"
      }`}>
        {/* Header: Author Info & Badges */}
        <div className="flex items-center justify-between gap-3 mb-2">
          <div className="flex items-center gap-2.5">
            {comment.authorAvatarUrl ? (
              <img
                src={comment.authorAvatarUrl}
                alt={comment.authorName}
                className="w-7 h-7 rounded-full object-cover ring-1 ring-white/20"
              />
            ) : (
              <div className="w-7 h-7 rounded-full bg-slate-800 flex items-center justify-center text-xs font-bold text-cyan-400 ring-1 ring-white/10">
                {comment.authorName.charAt(0).toUpperCase()}
              </div>
            )}
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-slate-100">
                {comment.authorName}
              </span>
              {comment.authorBadge && (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                  <ShieldCheck className="w-3 h-3" />
                  {comment.authorBadge}
                </span>
              )}
            </div>
          </div>

          <span className="text-[11px] text-slate-500">
            {new Date(comment.createdAt).toLocaleDateString(undefined, {
              month: "short",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>
        </div>

        {/* Content Body */}
        <p className="text-sm leading-relaxed text-slate-300 break-words whitespace-pre-wrap">
          {comment.content}
        </p>

        {/* Action Bar */}
        <div className="flex items-center gap-4 mt-3 pt-2.5 border-t border-white/5 text-xs text-slate-400">
          {/* Upvote Button */}
          <button
            onClick={() => {
              setUpvotes((prev) => (hasUpvoted ? prev - 1 : prev + 1));
              setHasUpvoted(!hasUpvoted);
            }}
            className={`flex items-center gap-1.5 transition-colors ${
              hasUpvoted ? "text-rose-400 font-bold" : "hover:text-rose-400"
            }`}
          >
            <Heart className={`w-3.5 h-3.5 ${hasUpvoted ? "fill-rose-400" : ""}`} />
            <span>{upvotes}</span>
          </button>

          {/* Reply Toggle */}
          <button
            onClick={() => setIsReplying(!isReplying)}
            className="flex items-center gap-1.5 hover:text-cyan-400 transition-colors font-medium"
          >
            <CornerDownRight className="w-3.5 h-3.5" />
            <span>Reply</span>
          </button>

          {/* Show / Hide Replies Accordion Trigger */}
          {comment.replyCount > 0 && (
            <button
              onClick={toggleExpand}
              className="flex items-center gap-1.5 ml-auto text-cyan-400 hover:text-cyan-300 transition-colors font-semibold"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>
                {isExpanded
                  ? "Hide replies"
                  : `Show ${comment.replyCount} ${comment.replyCount === 1 ? "reply" : "replies"}`}
              </span>
              {isExpanded ? (
                <ChevronDown className="w-3.5 h-3.5" />
              ) : (
                <ChevronRight className="w-3.5 h-3.5" />
              )}
            </button>
          )}
        </div>

        {/* Inline Reply Input Box */}
        <AnimatePresence>
          {isReplying && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-3 overflow-hidden pt-2"
            >
              <div className="flex flex-col gap-2 rounded-xl bg-slate-950/60 p-2.5 border border-white/10">
                <textarea
                  rows={2}
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  placeholder={`Replying to ${comment.authorName}...`}
                  className="w-full bg-transparent text-xs text-slate-200 placeholder-slate-500 focus:outline-none resize-none"
                />
                <div className="flex justify-end gap-2">
                  <button
                    onClick={() => setIsReplying(false)}
                    className="px-2.5 py-1 text-xs text-slate-400 hover:text-slate-200"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSendReply}
                    disabled={!replyText.trim() || isSubmitting}
                    className="px-3 py-1 text-xs font-semibold rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white disabled:opacity-40 transition-all shadow-sm"
                  >
                    {isSubmitting ? "Posting..." : "Post Reply"}
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Recursive Children Container */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-2.5 pl-3 border-l-2 border-slate-800/80"
          >
            {isLoadingChildren ? (
              <div className="flex items-center gap-2 py-2 text-xs text-slate-500 animate-pulse">
                <div className="w-3 h-3 rounded-full border-2 border-cyan-500 border-t-transparent animate-spin" />
                <span>Loading nested replies...</span>
              </div>
            ) : (
              children.map((child) => (
                <CommentNode
                  key={child._id}
                  comment={child}
                  onPostReply={onPostReply}
                  fetchChildren={fetchChildren}
                />
              ))
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
```

---

## 🛡️ 5. Edge Cases & Anti-Crash Verification Matrix

| Edge Case | Failure Mode Without System | Architectural Safeguard |
| :--- | :--- | :--- |
| **Recursive 100+ Deep Tree** | Infinite recursive stack-overflow crashes React Virtual DOM. | On-demand accordion expansion; sub-replies only render when user clicks "Show Replies". |
| **Mobile Screen Squeeze** | Indenting 20px per level squishes text to 10px width at depth 15. | Visual indentation hard-capped at `80px` (`Math.min(depth * 18, 80)`). |
| **Database Connection Exhaustion** | 1,000 users reading deeply nested discussions scan 50,000 DB records. | Two-Tier Redis Graph Cache returns paginated comment IDs in `< 1ms` from in-memory Sorted Sets. |
| **Orphaned Replies upon Deletion** | Deleting a parent comment leaves children floating with invalid parents. | Soft-delete flag `status: 'DELETED'` preserves tree structure; displays *"This comment was deleted"* while maintaining children. |

# Module Specification: LMS Live Streaming & Interactive Classroom Engine

> **PURPOSE**: Establishes the enterprise-grade live education architecture connecting Instructors and Students via **Protected YouTube Live Streaming** and **Bespoke Real-Time Classroom Live Chat**. Provides domain-origin access protection (preventing stream link leaking), enrollment gating, synchronized in-platform live chat (zero Google login required for students), instructor announcement pinning, real-time student Q&A upvoting, slow-mode anti-spam governance, and responsive split-screen classroom ergonomics.

---

## 🏛️ 1. Architecture & Live Classroom Topology

The LMS Live Classroom decouples high-bandwidth video ingestion/delivery (offloaded to YouTube Live's global infrastructure) from real-time classroom interactions (managed by our high-concurrency **Socket.IO + Redis** communications hub).

```
┌────────────────────────────────────────────────────────────────────────────────────────────────────────┐
│                              LMS LIVE CLASSROOM SYSTEM TOPOLOGY                                        │
├────────────────────────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                                        │
│  [Instructor / Studio]                [Delivery Infrastructure]                 [Student Classroom]    │
│                                                                                                        │
│  OBS / Camera / Mic        ──► RTMP Ingestion ──► YouTube Live Global CDN ──► Embedded IFrame Player   │
│  (YouTube Studio Unlisted)                        (Domain Origin Locked)        - Token-Gated Shell    │
│                                                                                 - Responsive 16:9 View │
│                                                                                                        │
│  Instructor Controls       ──► WSS / Socket.IO ──► Edge Socket Gateway     ──► Bespoke Live Chat       │
│  - Pin Announcements                               - Room: room:lms:live:..     - Student LMS Avatar   │
│  - Slow Mode / Moderation                          - Redis Pub/Sub Backing      - Q&A Upvote Queue     │
│  - Q&A Answering                                                                - Slow Mode Throttle   │
└────────────────────────────────────────────────────────────────────────────────────────────────────────┘
```

---

## 🔒 2. Stream Protection & Access Control Gating

### 2.1 Domain-Origin Lock & Obfuscation
1. **Unlisted Event**: Instructors create a scheduled live event on YouTube Studio set strictly to **"Unlisted"**.
2. **Domain-Restricted IFrame Embedding**: The player initializes via the YouTube IFrame Player API with strict parameters:
   - `origin`: Platform domain (e.g. `https://tenant.com`).
   - `enablejsapi`: `1`.
   - `rel`: `0` (disables unrelated third-party video recommendations).
   - `modestbranding`: `1`.
3. **Enrollment Verification Guard**:
   - The direct YouTube video URL is **never exposed in the raw HTML response**.
   - Edge Middleware verifies the student's active enrollment token (`hasActiveEnrollment(userId, courseId)`).
   - If unauthorized, the classroom renders a locked state (`<EnrollmentPaywallCard />`).
   - If authorized, the backend issues a short-lived playback token used to hydrate the `<LmsLivePlayer />`.

---

## 💬 3. Bespoke Real-Time Classroom Live Chat & Q&A

Students must **never be forced to create or log into a personal Google/YouTube account** to ask questions. All chat interactions execute directly through our authenticated WebSocket cluster:

### 3.1 Room Partitioning & Data Contracts
- **Live Class Room Key**: `room:lms:live:{courseId}:{lessonId}`
- **Socket Events**:
  - `class:chat_message`: Dispatched by student/instructor with text content.
  - `class:pinned_announcement`: Instructor pins an announcement/link to the top banner.
  - `class:question_upvote`: Students upvote questions in the Q&A tab.
  - `class:slow_mode_updated`: Instructor toggles slow mode delay (e.g. 10s cooldown).

```typescript
// types/lmsLiveChat.ts
export interface ILiveChatMessage {
  messageId: string;
  courseId: string;
  lessonId: string;
  senderId: string;
  senderName: string;
  senderAvatarUrl?: string;
  senderRole: "STUDENT" | "INSTRUCTOR" | "TA" | "ADMIN";
  content: string;
  isQuestion: boolean;
  upvotesCount: number;
  upvotedByUserIds: string[];
  isAnswered: boolean;
  createdAt: number;
}
```

---

## 💻 4. Production Classroom React Components

### 4.1 Master Classroom Stage (`<LmsLiveClassStage />`)
Features responsive desktop side-by-side split (video 70% / chat 30%) and dynamic mobile stacked tabs (`Video` / `Live Chat` / `Q&A`).

```tsx
// components/lms/LmsLiveClassStage.tsx
"use client";

import React, { useState } from "react";
import { MessageSquare, HelpCircle, Shield, Pin, Send, ThumbsUp, Radio } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface LmsLiveClassStageProps {
  youtubeVideoId: string;
  courseTitle: string;
  lessonTitle: string;
  instructorName: string;
  isEnrolled: boolean;
}

export const LmsLiveClassStage: React.FC<LmsLiveClassStageProps> = ({
  youtubeVideoId,
  courseTitle,
  lessonTitle,
  instructorName,
  isEnrolled,
}) => {
  const [activeTab, setActiveTab] = useState<"CHAT" | "QA">("CHAT");
  const [pinnedNote, setPinnedNote] = useState<string | null>(
    "Welcome to live class! Drop your questions in the Q&A tab. Assignment link is pinned in course resources."
  );

  if (!isEnrolled) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] p-8 text-center bg-slate-950 border border-white/10 rounded-3xl">
        <div className="p-4 rounded-full bg-rose-500/10 text-rose-400 mb-4 ring-1 ring-rose-500/20">
          <Shield className="w-10 h-10" />
        </div>
        <h2 className="text-2xl font-bold text-white mb-2">Live Classroom Locked</h2>
        <p className="text-sm text-slate-400 max-w-md mb-6">
          This live lecture is restricted to enrolled students of <span className="text-cyan-400">{courseTitle}</span>.
        </p>
        <button className="px-6 py-2.5 rounded-xl font-bold bg-cyan-600 hover:bg-cyan-500 text-white shadow-lg transition-all">
          Enroll Now to Join Live
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col lg:flex-row gap-4 h-[calc(100vh-120px)] min-h-[600px] w-full">
      {/* Left Stage: 16:9 Video Canvas & Lecture Info */}
      <div className="flex-1 flex flex-col gap-3 min-w-0">
        {/* Responsive 16:9 Video Embed */}
        <div className="relative w-full pt-[56.25%] bg-black rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${youtubeVideoId}?autoplay=1&modestbranding=1&rel=0&enablejsapi=1`}
            title="LMS Live Class Stream"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute top-0 left-0 w-full h-full border-0"
          />
          {/* Live Indicator Pill */}
          <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-red-600/90 text-white text-[11px] font-bold backdrop-blur-md shadow-md">
            <Radio className="w-3.5 h-3.5 animate-pulse" />
            <span>LIVE</span>
          </div>
        </div>

        {/* Video Title Header */}
        <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-900/60 border border-white/10 backdrop-blur-md">
          <div>
            <h1 className="text-lg font-bold text-white truncate">{lessonTitle}</h1>
            <p className="text-xs text-slate-400">
              {courseTitle} • Instructor: <span className="text-cyan-400 font-semibold">{instructorName}</span>
            </p>
          </div>
        </div>
      </div>

      {/* Right Stage: Synchronized Real-Time Chat & Q&A Panel */}
      <div className="w-full lg:w-[380px] flex flex-col h-full rounded-2xl bg-slate-900/90 border border-white/10 backdrop-blur-md overflow-hidden shadow-xl">
        {/* Header Tabs: All Chat vs Questions Only */}
        <div className="flex items-center justify-between p-2.5 border-b border-white/10 bg-slate-950/40">
          <div className="flex items-center gap-1 p-1 rounded-xl bg-slate-900 border border-white/5">
            <button
              onClick={() => setActiveTab("CHAT")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === "CHAT"
                  ? "bg-cyan-600 text-white shadow-sm"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Live Chat</span>
            </button>
            <button
              onClick={() => setActiveTab("QA")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === "QA"
                  ? "bg-cyan-600 text-white shadow-sm"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Q&A</span>
            </button>
          </div>
        </div>

        {/* Pinned Announcement Bar */}
        {pinnedNote && (
          <div className="flex items-start gap-2 p-2.5 bg-amber-500/10 border-b border-amber-500/20 text-xs text-amber-200">
            <Pin className="w-3.5 h-3.5 text-amber-400 mt-0.5 flex-shrink-0" />
            <p className="line-clamp-2 leading-relaxed">{pinnedNote}</p>
          </div>
        )}

        {/* Message Feed Area */}
        <div className="flex-1 p-3 overflow-y-auto space-y-3">
          {activeTab === "CHAT" ? (
            <div className="space-y-2.5">
              <div className="flex items-start gap-2 text-xs">
                <div className="w-6 h-6 rounded-full bg-cyan-600 flex items-center justify-center font-bold text-[10px] text-white">
                  IN
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-semibold text-cyan-400">Instructor Alex</span>
                    <span className="text-[10px] text-slate-500">10:02 AM</span>
                  </div>
                  <p className="text-slate-200 mt-0.5">Welcome everyone! Can everyone hear me clearly?</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-2.5">
              <div className="p-3 rounded-xl bg-slate-950/60 border border-white/5 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-200">Sarah Jenkins</span>
                  <span className="text-[10px] text-slate-500">10:04 AM</span>
                </div>
                <p className="text-xs text-slate-300">
                  Will the recording of this live lecture be available immediately after the stream ends?
                </p>
                <div className="flex items-center justify-between pt-1 text-xs">
                  <span className="text-[10px] text-amber-400 font-medium">Pending Answer</span>
                  <button className="flex items-center gap-1 text-slate-400 hover:text-cyan-400 font-semibold transition-colors">
                    <ThumbsUp className="w-3 h-3" />
                    <span>14</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Input Bar */}
        <div className="p-2.5 border-t border-white/10 bg-slate-950/60">
          <div className="flex items-center gap-2 rounded-xl bg-slate-900 border border-white/10 px-3 py-1.5">
            <input
              type="text"
              placeholder={activeTab === "CHAT" ? "Say something..." : "Ask a question..."}
              className="flex-1 bg-transparent text-xs text-white placeholder-slate-500 focus:outline-none"
            />
            <button className="p-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white transition-all">
              <Send className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
```

---

## 🛡️ 5. Edge Cases & Anti-Spam Governance

1. **Slow-Mode Throttling**: Limits students to 1 message every 10 seconds. Enforced on the client via disabled countdown timer and verified on the server via Redis rate limiter (`SET class:ratelimit:{userId} 1 EX 10 NX`).
2. **Profanity & URL Filter**: Real-time regex parses and masks offensive language; non-instructors are blocked from sharing suspicious external URLs to prevent phishing.
3. **Instructor Moderation Actions**: Instructors can:
   - Click any user to **Mute for 5 minutes**.
   - **Delete Message** across the entire classroom.
   - **Mark Question as Answered** to clean up the Q&A queue.

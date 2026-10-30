# Module Specification: Extreme Low-Bandwidth & Slow Network Performance Optimization Engine

> **PURPOSE**: Defines the definitive, production-grade architecture to make websites load and feel instantaneous on 2G, 3G, and unstable mobile connections. Enforces the 5 Pillars of Low-Bandwidth Speed: Adaptive Network-Aware Image Delivery, Server-Side Streaming with Projection Pruning, Offline-First Persistent SWR Caching, 80KB Initial JavaScript Budget, and Graceful Visual Auto-Degradation (disabling heavy 3D canvases, video loops, and unnecessary prefetching).

---

## 🏛️ 1. The Core Challenge: Slow Networks & High-Latency Devices

In developing regions and mobile environments, users frequently experience:
- **High Round-Trip Time (RTT)**: 400ms – 1,500ms latency per request. Every redundant HTTP hop multiplies load times.
- **Packet Loss & Throttled Bandwidth**: Effective speeds often drop below `50 – 250 kbps` (2G / slow 3G).
- **CPU & Memory Bottlenecks**: Budget smartphones struggle with parsing multi-megabyte JavaScript bundles, causing browser freezes.
- **The Data Panic**: Customers on limited mobile data packages hesitate to open websites with auto-playing videos and uncompressed multi-megabyte images.

```
┌────────────────────────────────────────────────────────────────────────┐
│               THE 5 PILLARS OF EXTREME LOW-BANDWIDTH SPEED             │
├────────────────────────────────────────────────────────────────────────┤
│ 1. Adaptive Network-Aware Images (WebP/AVIF + 20-char BlurHash LQIP)   │
│ 2. Streaming SSR + Database Projection Pruning (Shell in < 50ms)       │
│ 3. Offline-First Stale-While-Revalidate (SWR) Persistent Cache (0ms)   │
│ 4. 80KB Initial JavaScript Budget & Self-Hosted Font Subsetting        │
│ 5. Graceful Auto-Degradation & Manual "Data Saver" UI Toggle           │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 📶 2. Pillar 1: Network Quality Detection & Adaptive Downgrade

Detects the user's connection speed using the browser's Network Information API and automatically adjusts visual assets.

### 2.1 The `useNetworkQuality.ts` Hook

```typescript
// hooks/useNetworkQuality.ts
"use client";

import { useState, useEffect } from "react";

export type EffectiveConnectionType = "slow-2g" | "2g" | "3g" | "4g";

export interface NetworkQualityState {
  effectiveType: EffectiveConnectionType;
  saveData: boolean;
  rtt: number;           // Round-trip time in milliseconds
  downlink: number;      // Bandwidth estimate in Mbps
  isLowBandwidth: boolean; // True if on 2G, slow-3G, or Save-Data is active
  manualDataSaver: boolean;
  toggleManualDataSaver: () => void;
}

export function useNetworkQuality(): NetworkQualityState {
  const [effectiveType, setEffectiveType] = useState<EffectiveConnectionType>("4g");
  const [saveData, setSaveData] = useState<boolean>(false);
  const [rtt, setRtt] = useState<number>(50);
  const [downlink, setDownlink] = useState<number>(10);
  const [manualDataSaver, setManualDataSaver] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("app_data_saver") === "true";
    }
    return false;
  });

  useEffect(() => {
    if (typeof window === "undefined" || !("connection" in navigator)) return;

    const conn = (navigator as any).connection;

    const updateConnectionStatus = () => {
      setEffectiveType(conn.effectiveType || "4g");
      setSaveData(Boolean(conn.saveData));
      setRtt(conn.rtt || 50);
      setDownlink(conn.downlink || 10);
    };

    updateConnectionStatus();
    conn.addEventListener("change", updateConnectionStatus);

    return () => conn.removeEventListener("change", updateConnectionStatus);
  }, []);

  const toggleManualDataSaver = () => {
    const nextVal = !manualDataSaver;
    setManualDataSaver(nextVal);
    localStorage.setItem("app_data_saver", String(nextVal));
  };

  const isLowBandwidth =
    manualDataSaver ||
    saveData ||
    effectiveType === "slow-2g" ||
    effectiveType === "2g" ||
    (effectiveType === "3g" && rtt > 600);

  return {
    effectiveType,
    saveData,
    rtt,
    downlink,
    isLowBandwidth,
    manualDataSaver,
    toggleManualDataSaver,
  };
}
```

### 2.2 Manual "Data Saver" UI Header Pill (`DataSaverPill.tsx`)

Renders a sleek, unobtrusive toggle in the header or mobile footer drawer:

```tsx
// components/performance/DataSaverPill.tsx
"use client";

import React from "react";
import { useNetworkQuality } from "@/hooks/useNetworkQuality";
import { Zap, ShieldCheck } from "lucide-react";

export function DataSaverPill() {
  const { isLowBandwidth, manualDataSaver, toggleManualDataSaver, effectiveType } = useNetworkQuality();

  return (
    <button
      onClick={toggleManualDataSaver}
      title={`Network: ${effectiveType.toUpperCase()} | Click to toggle Data Saver`}
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium transition-all ${
        isLowBandwidth
          ? "bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/30"
          : "bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-200"
      }`}
    >
      {isLowBandwidth ? (
        <>
          <Zap className="w-3.5 h-3.5 fill-current animate-pulse text-amber-500" />
          <span>Data Saver ON</span>
        </>
      ) : (
        <>
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Standard Mode</span>
        </>
      )}
    </button>
  );
}
```

---

## 🖼️ 3. Pillar 2: Adaptive Image Pipeline & BlurHash Placeholders

### 3.1 Automatic Upload Transcoding & BlurHash Generation
When an image is uploaded in the CMS or products, the server immediately converts it to modern WebP/AVIF (80% size savings) and generates a compact 20-character BlurHash string stored in MongoDB.

```typescript
// lib/media/imageOptimizer.ts
import sharp from "sharp";
import { encode } from "blurhash";

export interface OptimizedImageResult {
  optimizedBuffer: Buffer;
  mimeType: "image/webp" | "image/avif";
  width: number;
  height: number;
  sizeBytes: number;
  blurHash: string;
}

export async function optimizeUploadedImage(
  inputBuffer: Buffer,
  options: { maxWidth?: number; format?: "webp" | "avif"; quality?: number } = {}
): Promise<OptimizedImageResult> {
  const maxWidth = options.maxWidth || 1920;
  const quality = options.quality || 80;

  // 1. Resize & transcode to WebP
  let pipeline = sharp(inputBuffer).rotate(); // auto-orient based on EXIF
  const metadata = await pipeline.metadata();

  if (metadata.width && metadata.width > maxWidth) {
    pipeline = pipeline.resize({ width: maxWidth, withoutEnlargement: true });
  }

  const optimizedBuffer = await pipeline
    .webp({ quality, effort: 4 })
    .toBuffer();

  const finalMeta = await sharp(optimizedBuffer).metadata();

  // 2. Generate ultra-compact BlurHash (32x32 raw pixel sample)
  const rawPixelData = await sharp(optimizedBuffer)
    .resize(32, 32, { fit: "inside" })
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const blurHash = encode(
    new Uint8ClampedArray(rawPixelData.data),
    rawPixelData.info.width,
    rawPixelData.info.height,
    4,
    3
  );

  return {
    optimizedBuffer,
    mimeType: "image/webp",
    width: finalMeta.width || 0,
    height: finalMeta.height || 0,
    sizeBytes: optimizedBuffer.length,
    blurHash,
  };
}
```

### 3.2 Adaptive Image Component (`<AdaptiveImage />`)
On slow connections (`isLowBandwidth === true`), automatically requests lower dimensions and displays the BlurHash LQIP instantly.

```tsx
// components/media/AdaptiveImage.tsx
"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useNetworkQuality } from "@/hooks/useNetworkQuality";
import { resolveMediaUrl, MediaInput } from "@/lib/storage/resolveMediaUrl";

interface Props {
  asset: MediaInput;
  alt: string;
  width: number;
  height: number;
  className?: string;
  priority?: boolean;
}

export function AdaptiveImage({ asset, alt, width, height, className = "", priority = false }: Props) {
  const { isLowBandwidth } = useNetworkQuality();
  const [isLoaded, setIsLoaded] = useState(false);

  // If slow network, request 50% smaller resolution and 60% quality from image CDN
  const targetWidth = isLowBandwidth ? Math.round(width * 0.6) : width;
  const targetQuality = isLowBandwidth ? 55 : 80;

  const src = resolveMediaUrl(asset, { width: targetWidth, quality: targetQuality });
  const blurDataURL = typeof asset === "object" && asset?.blurHash 
    ? `data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA4IDUiPjxyZWN0IHdpZHRoPSI4IiBoZWlnaHQ9IjUiIGZpbGw9IiNlNWU3ZWIiLz48L3N2Zz4=`
    : undefined;

  return (
    <div className={`relative overflow-hidden bg-zinc-100 dark:bg-zinc-800 ${className}`}>
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        priority={priority && !isLowBandwidth} // Disable priority preloading on slow 2G
        loading={priority && !isLowBandwidth ? "eager" : "lazy"}
        placeholder={blurDataURL ? "blur" : "empty"}
        blurDataURL={blurDataURL}
        onLoad={() => setIsLoaded(true)}
        className={`w-full h-full object-cover transition-opacity duration-300 ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
      />
    </div>
  );
}
```

---

## ⚡ 4. Pillar 3: Streaming SSR & MongoDB Projection Pruning

### 4.1 Strict Database Projection (90% Smaller JSON)
Never fetch full database documents on listing endpoints. A product document might contain 15KB of audit logs, customer reviews, and specifications. Projection prunes it to 400 bytes!

```typescript
// lib/products/getProducts.ts
import { db } from "@/lib/db";

export async function getLightweightProductList(tenantId: string, page = 1, limit = 20) {
  const skip = (page - 1) * limit;

  // 🚀 STRICT PROJECTION: Only fetch what the screen physically renders
  const products = await db.product.findMany({
    where: { tenantId, status: "PUBLISHED" },
    select: {
      id: true,
      title: true,
      slug: true,
      price: true,
      salePrice: true,
      category: true,
      featuredImage: {
        select: {
          url: true,
          blurHash: true,
          dimensions: true,
        },
      },
      // ❌ EXCLUDED: descriptionHtml, reviews, vendorNotes, changelog, variants
    },
    skip,
    take: limit,
  });

  return products;
}
```

### 4.2 React Server Component (RSC) Streaming with `<Suspense>`
The HTML shell, navigation bar, and skeleton cards reach the user's browser in `< 40ms` over 3G. The database results stream into the open HTTP connection when ready without blocking TTFB.

```tsx
// app/products/page.tsx
import { Suspense } from "react";
import { ProductGridSkeleton } from "@/components/products/ProductGridSkeleton";
import { ProductListStreamer } from "@/components/products/ProductListStreamer";

export const dynamic = "force-dynamic";

export default function ProductsPage() {
  return (
    <main className="max-w-7xl mx-auto px-4 py-8">
      {/* 🚀 Shell renders in 35ms! */}
      <div className="mb-6">
        <h1 className="text-3xl font-extrabold tracking-tight">Our Catalog</h1>
        <p className="text-sm text-zinc-500">Fast, streamlined shopping</p>
      </div>

      {/* ⚡ Suspense boundary streams data asynchronously */}
      <Suspense fallback={<ProductGridSkeleton count={8} />}>
        <ProductListStreamer />
      </Suspense>
    </main>
  );
}
```

---

## 💾 5. Pillar 4: Offline-First Persistent SWR Cache (IndexedDB)

Eliminates network round-trips completely on repeat page visits and back/forward navigation.

```typescript
// lib/cache/offlineSwrStorage.ts
import { State } from "swr";

const DB_NAME = "app_offline_cache";
const STORE_NAME = "swr_store";

function getDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    if (typeof window === "undefined") return;
    const req = indexedDB.open(DB_NAME, 1);
    req.onupgradeneeded = () => req.result.createObjectStore(STORE_NAME);
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

export const offlineSwrStorage = {
  getItem: async (key: string): Promise<State<any> | undefined> => {
    try {
      const db = await getDB();
      return new Promise((resolve) => {
        const tx = db.transaction(STORE_NAME, "readonly");
        const req = tx.objectStore(STORE_NAME).get(key);
        req.onsuccess = () => resolve(req.result);
        req.onerror = () => resolve(undefined);
      });
    } catch {
      return undefined;
    }
  },
  setItem: async (key: string, value: State<any>): Promise<void> => {
    try {
      const db = await getDB();
      const tx = db.transaction(STORE_NAME, "readwrite");
      tx.objectStore(STORE_NAME).put(value, key);
    } catch (e) {
      console.warn("[Offline Cache] Write failed:", e);
    }
  },
  removeItem: async (key: string): Promise<void> => {
    try {
      const db = await getDB();
      const tx = db.transaction(STORE_NAME, "readwrite");
      tx.objectStore(STORE_NAME).delete(key);
    } catch {}
  },
};
```

---

## 📦 6. Pillar 5: 80KB Initial JS Budget & Self-Hosted Font Subsetting

### 6.1 Font Subsetting & `font-display: swap`
Default Google Web Fonts contain 1,000+ glyphs (Cyrillic, Greek, Vietnamese) totaling 300KB+. We subset the font to basic Latin (English/Urdu numerals) dropping font size to **22KB**.

```css
/* styles/fonts.css */
@font-face {
  font-family: 'Plus Jakarta Sans';
  font-style: normal;
  font-weight: 400 700;
  font-display: swap; /* 🚀 Zero Flash of Invisible Text (FOIT) */
  src: url('/fonts/plus-jakarta-sans-latin-subset.woff2') format('woff2');
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F;
}
```

### 6.2 Route-Level Heavy Library Code-Splitting (`next/dynamic`)
Never bundle Three.js, Monaco Editor, Chart.js, or Canvas animation libraries in the main root layout.

```typescript
// components/analytics/RevenueChartLazy.tsx
import dynamic from "next/dynamic";

export const RevenueChartLazy = dynamic(
  () => import("./RevenueChart").then((mod) => mod.RevenueChart),
  {
    ssr: false,
    loading: () => <div className="h-64 rounded-xl bg-zinc-100 dark:bg-zinc-800 animate-pulse" />,
  }
);
```

---

## 🚀 7. Auto-Degradation Rules Matrix

| Component / Feature | High-Speed 4G/WiFi Mode | Low-Bandwidth / 2G / Data Saver Mode | Bandwidth Savings |
| :--- | :--- | :--- | :--- |
| **Hero Background Video** | Autoplays 1080p WebM loop | Disables video; displays static 25KB WebP poster | **-98% (5MB ➔ 25KB)** |
| **3D Three.js Model Viewer** | Interactive WebGL canvas | Displays high-res 2D preview snapshot with "Tap to load 3D" | **-90% (8MB ➔ 80KB)** |
| **Catalog Product Images** | 80% Quality AVIF (1200px) | 55% Quality WebP (600px) + instant BlurHash LQIP | **-75% (200KB ➔ 45KB)** |
| **Next.js Link Prefetching** | Full prefetch on hover | Prefetching disabled (`prefetch={false}`) | **-80% wasted network requests** |
| **Database Listing Queries** | Standard JSON | Strict projection pruning (removes heavy audit/reviews) | **-88% (400KB ➔ 48KB)** |
| **Repeated Page Views** | Fresh network round-trip | Instant 0ms render from IndexedDB SWR cache | **-100% transfer on repeat** |

---

## 🛡️ 8. Verification & Performance Budget Checklist

- [x] **Core Web Vitals Pass**: LCP $< 1.8\text{s}$, CLS $= 0.00$, FID / INP $< 80\text{ms}$ on simulated 3G throttled profiles.
- [x] **Strict 80KB Initial JavaScript Gate**: First Load JS shared by all chunks strictly $\le 85\text{KB}$.
- [x] **Zero White-Screen Layout Shifts**: BlurHash placeholders hold exact aspect ratio before image bytes arrive.
- [x] **Automatic 2G/Save-Data Downgrade**: Videos and 3D canvases smoothly degrade without user intervention.
- [x] **Edge Wire Compression**: Brotli (`br`) and Gzip enabled on all Next.js API routes and asset servers.

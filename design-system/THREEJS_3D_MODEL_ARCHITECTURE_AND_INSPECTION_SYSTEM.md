# 🧊 Master Specification: Three.js 3D Model Architecture, Parts Decomposition & Inspection System

**File:** `design-system/THREEJS_3D_MODEL_ARCHITECTURE_AND_INSPECTION_SYSTEM.md`  
**Classification:** WebGL Engineering, 3D Asset Decomposition, Scroll Rigging & Studio Verification  
**Related Documents:**
- [`design-system/FRONTEND_DESIGN_RULES.md`](./FRONTEND_DESIGN_RULES.md)
- [`design-system/DESIGN_ARCHITECTURE.md`](./DESIGN_ARCHITECTURE.md)
- [`design-system/02_VISUAL_EFFECTS_CATALOGUE.md`](./02_VISUAL_EFFECTS_CATALOGUE.md)
- [`design-system/05_ANIMATIONS_CATALOGUE.md`](./05_ANIMATIONS_CATALOGUE.md)
- [`design-system/03_UI_COMPONENTS_LIBRARY.md`](./03_UI_COMPONENTS_LIBRARY.md)
- [`design-system/09_IMPLEMENTATION_RECIPES.md`](./09_IMPLEMENTATION_RECIPES.md)

---

## 📑 Table of Contents
1. [Core Mandate: The High-Fidelity 3D Standard](#1-core-mandate-the-high-fidelity-3d-standard)
2. [The 4 Sourcing & Creation Pathways (Including Anatomy Engine)](#2-the-4-sourcing--creation-pathways-including-anatomy-engine)
3. [The Multi-Part Decomposition & Quality Audit Protocol](#3-the-multi-part-decomposition--quality-audit-protocol)
4. [3D Staging, Editor Verification & Inspection Tools](#4-3d-staging-editor-verification--inspection-tools)
5. [Scroll-Driven Animation Rigging & Choreography Engine](#5-scroll-driven-animation-rigging--choreography-engine)
6. [Mathematical Guardrails, Performance & Lifecycle Management](#6-mathematical-guardrails-performance--lifecycle-management)
7. [The 20-Point Automated & Manual 3D Verification Checklist](#7-the-20-point-automated--manual-3d-verification-checklist)
8. [Production React Component: The Three.js Model Inspector & Parts Studio](#8-production-react-component-the-threejs-model-inspector--parts-studio)
9. [The Anatomy 3D & Isometric Rigid-Body Engine Integration (`wheresryan22/anatomy`)](#9-the-anatomy-3d--isometric-rigid-body-engine-integration-wheresryan22anatomy)
10. [End-to-End Blueprint: Creating & Auditing High-Level 3D Models in Docs](#10-end-to-end-blueprint-creating--auditing-high-level-3d-models-in-docs)
11. [Printable A4 Engineering Schematics & Blueprint Exporter](#11-printable-a4-engineering-schematics--blueprint-exporter)

---

## 1. Core Mandate: The High-Fidelity 3D Standard

> 👑 **THE 3D EXCELLENCE LAW**:  
> Every 3D model introduced into our applications—whether procedural in Three.js code, engineered via the **Anatomy Rigid-Body Engine**, or imported from verified external sources, whether rendered as a stationary hero element, an interactive showcase, or a scroll-driven animated timeline—**MUST BE AN EXCEPTIONALLY HIGH-QUALITY, COMPLETE 3D MODEL WITH HIGH-PRECISION PARAMETERS**.
> 
> A mediocre, half-baked, or visually unverified 3D model is considered an **UNACCEPTABLE DESIGN AND ENGINEERING FAILURE**.
>
> Whenever a 3D model is built or integrated:
> 1. **Decompose Every Part**: The agent or developer must break down the model into its constituent child meshes, nodes, and kinematic links (minimum 40+ discrete parts for an explanatory machine).
> 2. **Audit Position & Geometry**: Each individual part must be independently verified for geometric integrity, world position, local rotation, pivot alignment, surface normals, and scale calibration.
> 3. **Verify Material & Lighting PBR**: Materials must feature physically based rendering (PBR) or verified 4-tone camera-locked shading with specular roughness, metalness, ambient occlusion, and HDR reflections.
> 4. **Rigorous Motion Instructions**: Scroll animations, bone keyframes, exploded views, and camera dollies must strictly follow exact geometric instructions and verified timing curves.
> 5. **Self-Verification Mandatory**: The model must be inspected and proven bug-free (zero NaN transforms, zero missing textures, zero un-disposed GPU memory leaks, and zero geometric interpenetrations via automated audits) before deployment.

---

## 2. The 4 Sourcing & Creation Pathways (Including Anatomy Engine)

We recognize four distinct pathways to introduce 3D assets into a project:

```
┌──────────────────────────────────────────────────────────────────────────────────────────────────────────────────┐
│                                             The 4 Sourcing Pathways                                              │
├──────────────────────────┬──────────────────────────┬──────────────────────────────┬─────────────────────────────┤
│ Pathway A: Procedural    │ Pathway B: Verified glTF │ Pathway C: 3D Editor Staging │ Pathway D: Anatomy Engine   │
│ Three.js Primitives      │ Free / CC0 web assets    │ Inspected in Three.js Editor │ High-precision rigid-body   │
│ Code-constructed meshes, │ (Kenney, Three.js, Poly  │ or Blender before export and │ 3D + SVG + WebGL shaders;   │
│ shaders & particles      │ Pizza, Sketchfab CC0)    │ runtime integration          │ automated geometric audits  │
└──────────────────────────┴──────────────────────────┴──────────────────────────────┴─────────────────────────────┘
```

### Pathway A: Procedural Generation (Code-Constructed 3D Models)
- **Use Case**: Abstract hero geometry, glowing crystalline polyhedra, floating glass data nodes, procedural particle rings, interactive waveform ribbons, and geometric hardware mockups.
- **Parametric Precision Mandate**:
  - Never use low-poly defaults (e.g. `segments: 8`) unless intentional low-poly retro style is explicitly requested.
  - Smooth curved surfaces require high subdivision parameters (e.g. `CylinderGeometry(radiusTop, radiusBottom, height, 64, 16)`, `SphereGeometry(radius, 64, 64)`).
  - Explicitly calculate normals using `geometry.computeVertexNormals()` after manual vertex mutations.
  - Compound objects must be assembled in logical `THREE.Group` hierarchies with named child meshes for granular animation targeting.

### Pathway B: Verified External Models (Free / CC0 Web Assets)
- **Strict Licensing Policy**: External models must be **100% free, lightweight, animated or static, and CC0/open-source**. Commercial or paid models are strictly forbidden.
- **Approved Sourcing Repositories**:
  - **Kenney.nl**: Clean, lightweight game kits and structural UI elements.
  - **Three.js Official Examples (`threejs.org/examples/models`)**: Certified high-performance glTF models (e.g. DamagedHelmet, LittlestTokyo, RobotExpressive).
  - **Poly Pizza (`poly.pizza`)**: Low-poly CC0 optimized assets.
  - **Sketchfab CC0**: Verified under Creative Commons Zero / Public Domain license.
  - **Smithsonian 3D Open Access**: Historical and natural artifacts with CC0 licensing.
- **Container Format Standard**:
  - Exclusively use **glTF 2.0 Binary (`.glb`)**. Plain `.obj`, `.dae`, or `.fbx` are prohibited due to lack of standard PBR materials and huge file bloat.
  - Models must utilize **Google Draco mesh compression** (`DRACOLoader`) or **Meshopt** for ultra-compact network delivery ($\le 5\text{MB}$ total download, target $\le 1.5\text{MB}$).

### Pathway C: 3D Editor Staging & Part Verification
- Before dropping any `.glb` model into code, the agent or developer should test the model in a dedicated 3D staging environment:
  - **Three.js Official Editor** (`https://threejs.org/editor/`): Load the model, check the scene graph hierarchy, test shadows, verify animations, and examine individual mesh materials.
  - **glTF-Transform CLI**: Run `gltf-transform inspect model.glb` to verify triangle count, texture dimensions, draw calls, and Draco compression.
  - **In-Browser Model Inspector**: Use our built-in React component (`<ThreeModelInspector />`) described in Section 8 for live runtime debugging and part-by-part isolation.

### Pathway D: Anatomy Procedural 3D & Isometric Rigid-Body Engine (`wheresryan22/anatomy`)
- **Use Case**: Engineering mechanisms, explanatory technical machines, cutaways, dial indicators, articulated robotic limbs, test benches, rocket engines, lock tumblers, and instruments where **the object IS the explanation**.
- **Installation Footprint**:
  - **Global Skill Footprint**: `~/.gemini/config/skills/anatomy/SKILL.md` (Native global CLI & slash command `/anatomy` available everywhere)
  - **Docs Repository**: Kept 100% clean (zero duplicate clone bloat in repo root)
- **Core Technology Stack**:
  - Zero heavy external DCC software (Blender/Maya) required. Written directly in TypeScript/ESM (`kit/iso-kit.ts`, `kit/turn-build.mjs`, `kit/lathe.mjs`, `kit/tube.mjs`).
  - High-precision geometric math: `lathe` for round profiles, `tubePieces` with collars/gaps for conduits, `bandsOf` for smooth compound curvature, and `turning()` for 3D rigid bodies.
  - Camera-locked 4-tone lighting (`lit`, `hi`, `mid`, `lo`, `faint`) and native materials (`steel`, `gold`, `chrome`, `rubber`, `gunmetal`, `copper`, `brass`).
  - WebGL volumetric hybrid shader integration (`kit/gl.mjs`) for fire, exhaust plumes, caustics, sparks, and lamp illumination.
  - Automated mathematical audit (`kit/audit.mjs`, `kit/turn-audit.mjs`, `scripts/lines.mjs`) proving zero pipe collisions, zero line-end orphans, and exact depth order.
- Detailed implementation and integration guide provided in **Section 9 & 10**.

---

## 3. The Multi-Part Decomposition & Quality Audit Protocol

A 3D model is not treated as a black-box opaque mesh. It is an organized assembly of mechanical, structural, or aesthetic sub-components.

```
Model Assembly (THREE.Group)
 ├── Base_Chassis (Mesh: PBR Brushed Metal, Casts Shadow)
 ├── Motor_Core (Mesh: Emissive Neon, Rotates on Y-Axis)
 ├── Cooling_Fins (InstancedMesh: 12x Radial Array)
 ├── Lens_Optics (Mesh: Physical Glass Material, Transmission = 0.95)
 └── Articulated_Arm (Bone Hierarchy: Inverse Kinematics Rig)
```

### 3.1 The 5-Point Part Inspection Checklist
For every sub-mesh in the scene hierarchy:

1. **Naming & Semantic Identification**:
   - Every animatable or interactive child node must have a distinct, semantic name (e.g. `part_engine_turbine`, `chassis_panel_left`, `glass_cover`). Avoid anonymous nodes like `Mesh001` or `Group_32`.
2. **Transform & Pivot Calibration**:
   - Verify that the local origin $(0, 0, 0)$ is at the **mechanical pivot point** of the part (e.g. wheel center for rotating wheels, hinge point for doors).
   - Ensure scale is uniform $(1.0, 1.0, 1.0)$. Negative scales (which invert surface normals) must be baked out.
3. **Geometry & Topology Integrity**:
   - Check triangle count per part. No single accessory part should exceed the entire chassis polycount.
   - Run `geometry.computeBoundingBox()` and `geometry.computeBoundingSphere()` to ensure frustum culling works accurately.
4. **Physically Based Materials (PBR)**:
   - Must use `MeshStandardMaterial` or `MeshPhysicalMaterial`.
   - Never use flat `MeshBasicMaterial` for hero objects (which lacks depth and illumination).
   - Configure:
     - `roughness`: Micro-surface finish ($0.05$ for polished glass, $0.35$ for anodized aluminum, $0.85$ for matte plastic).
     - `metalness`: Conductor vs dielectric ($1.0$ for raw chrome/gold/steel, $0.0$ for plastic/wood/cloth).
     - `envMapIntensity`: Environment reflection brightness ($1.0$ to $1.8$).
5. **Texture Optimization**:
   - Texture maps (`map`, `normalMap`, `roughnessMap`, `aoMap`) must have dimensions that are **powers of two** (e.g. $512 \times 512$, $1024 \times 1024$, max $2048 \times 2048$).
   - Color textures must use `texture.colorSpace = THREE.SRGBColorSpace`. Normal and roughness maps must use `THREE.NoColorSpace` (linear).

---

## 4. 3D Staging, Editor Verification & Inspection Tools

### 4.1 Programmatic Hierarchy Audit Function
Whenever a model is loaded in Three.js, run this recursive audit utility to log all parts, geometries, and memory consumption to the console:

```typescript
export interface ModelAuditSummary {
  totalTriangles: number;
  totalVertices: number;
  meshCount: number;
  materialCount: number;
  textureMemoryMB: number;
  parts: Array<{
    name: string;
    type: string;
    triangles: number;
    material: string;
    position: [number, number, number];
    visible: boolean;
  }>;
}

export function auditThreeModel(root: THREE.Object3D): ModelAuditSummary {
  let totalTriangles = 0;
  let totalVertices = 0;
  let meshCount = 0;
  const materials = new Set<THREE.Material>();
  const textures = new Set<THREE.Texture>();
  const parts: ModelAuditSummary['parts'] = [];

  root.traverse((child) => {
    if ((child as THREE.Mesh).isMesh) {
      const mesh = child as THREE.Mesh;
      meshCount++;
      const geometry = mesh.geometry;
      
      const triangles = geometry.index 
        ? geometry.index.count / 3 
        : (geometry.attributes.position ? geometry.attributes.position.count / 3 : 0);
      
      const vertices = geometry.attributes.position ? geometry.attributes.position.count : 0;
      totalTriangles += Math.floor(triangles);
      totalVertices += vertices;

      // Track materials
      if (Array.isArray(mesh.material)) {
        mesh.material.forEach((mat) => materials.add(mat));
      } else if (mesh.material) {
        materials.add(mesh.material);
      }

      // Track textures
      const checkMaterialTextures = (mat: any) => {
        ['map', 'normalMap', 'roughnessMap', 'metalnessMap', 'aoMap', 'emissiveMap'].forEach((key) => {
          if (mat[key] && mat[key].isTexture) textures.add(mat[key]);
        });
      };
      if (Array.isArray(mesh.material)) {
        mesh.material.forEach(checkMaterialTextures);
      } else {
        checkMaterialTextures(mesh.material);
      }

      parts.push({
        name: mesh.name || `Unnamed_${meshCount}`,
        type: mesh.type,
        triangles: Math.floor(triangles),
        material: Array.isArray(mesh.material) ? mesh.material.map(m => m.name).join(', ') : (mesh.material?.name || 'Default'),
        position: [mesh.position.x, mesh.position.y, mesh.position.z],
        visible: mesh.visible,
      });
    }
  });

  // Estimate texture memory (4 bytes per pixel for uncompressed RGBA)
  let textureBytes = 0;
  textures.forEach((tex) => {
    if (tex.image && tex.image.width && tex.image.height) {
      textureBytes += tex.image.width * tex.image.height * 4;
    }
  });

  return {
    totalTriangles,
    totalVertices,
    meshCount,
    materialCount: materials.size,
    textureMemoryMB: +(textureBytes / (1024 * 1024)).toFixed(2),
    parts,
  };
}
```

---

## 5. Scroll-Driven Animation Rigging & Choreography Engine

When 3D models are paired with scroll storytelling (via GSAP ScrollTrigger), they must be rigged with mathematical precision.

### 5.1 The 4 Classical 3D Scroll Patterns
1. **The Exploded Part Disassembly (`part-explode`)**:
   - As the user scrolls through product architecture sections, individual parts (casing, circuit board, battery, lenses) translate outwards along their radial normal vectors:
     $$\mathbf{P}_{\text{part}}(t) = \mathbf{P}_{\text{rest}} + \mathbf{V}_{\text{explode}} \cdot \text{smoothstep}(t_{\text{start}}, t_{\text{end}}, \text{scrollProgress})$$
2. **The Camera Orbit & Dolly (`camera-dolly`)**:
   - The camera glides along a 3D Catmull-Rom spline curve around the model, focusing on specific inspection targets as explanatory text cards pass by.
3. **The 360 Turntable Kinetic Scrub (`turntable-scrub`)**:
   - Continuous scroll maps directly to the model's Y-axis yaw rotation:
     $$\theta_y(s) = s \times 2\pi \times \text{revolutions}$$
4. **Internal X-Ray & Glass Morph (`xray-reveal`)**:
   - Exterior chassis material opacity transitions smoothly from $1.0$ to $0.15$ with `transparent = true`, while internal machinery illuminates with emissive highlights.

### 5.2 GSAP ScrollTrigger Three.js Rigging Pattern
```typescript
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

export function rigScrollModelTimeline(
  model: THREE.Object3D, 
  camera: THREE.PerspectiveCamera, 
  containerElement: HTMLElement
) {
  // Find key parts
  const casingTop = model.getObjectByName('casing_top');
  const casingBottom = model.getObjectByName('casing_bottom');
  const coreBoard = model.getObjectByName('core_processor');

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: containerElement,
      start: 'top top',
      end: 'bottom bottom',
      scrub: 1.2, // Smooth interpolation lag
    },
  });

  // Step 1: Initial Turntable reveal
  tl.to(model.rotation, { y: Math.PI * 0.75, ease: 'none' }, 0);
  tl.to(camera.position, { z: 4.5, y: 1.2, ease: 'power2.out' }, 0);

  // Step 2: Explode Parts (Chassis lifts, core stays, bottom lowers)
  if (casingTop) {
    tl.to(casingTop.position, { y: '+=1.8', ease: 'power2.inOut' }, 0.3);
  }
  if (casingBottom) {
    tl.to(casingBottom.position, { y: '-=1.2', ease: 'power2.inOut' }, 0.3);
  }

  // Step 3: Zoom into Core Board
  if (coreBoard) {
    tl.to(camera.position, { x: 0.2, y: 0.1, z: 2.2, ease: 'power3.inOut' }, 0.6);
    tl.to(camera, { fov: 35, onUpdate: () => camera.updateProjectionMatrix() }, 0.6);
  }

  return tl;
}
```

---

## 6. Mathematical Guardrails, Performance & Lifecycle Management

WebGL applications must adhere to strict hardware performance budgets:

### 6.1 Hardware Budgets Matrix
| Metric | Desktop Budget | Mobile Budget (`< 768px`) | Hard Ceilings |
| :--- | :--- | :--- | :--- |
| **Total Triangles** | $\le 100,000$ | $\le 30,000$ | Max $150,000$ |
| **Draw Calls per Frame** | $\le 40$ | $\le 20$ | Max $60$ |
| **Texture Dimensions** | $1024 \times 1024$ (max $2048$) | $512 \times 512$ (max $1024$) | Never $4096 \times 4096$ |
| **GPU Texture VRAM** | $\le 45\text{ MB}$ | $\le 15\text{ MB}$ | Max $80\text{ MB}$ |
| **FPS Target** | Steady $60\text{ fps}$ (or $120\text{ fps}$) | Steady $60\text{ fps}$ | Drop below $45\text{ fps} \rightarrow$ Fallback |

### 6.2 The Strict GPU Disposal Protocol (Zero Memory Leaks)
React unmounting or route switching MUST purge all GPU buffers immediately:

```typescript
export function purgeThreeScene(scene: THREE.Scene, renderer: THREE.WebGLRenderer) {
  scene.traverse((object: any) => {
    if (!object) return;

    // Dispose Geometries
    if (object.geometry) {
      object.geometry.dispose();
    }

    // Dispose Materials & Textures
    if (object.material) {
      const cleanMaterial = (mat: any) => {
        Object.keys(mat).forEach((prop) => {
          if (mat[prop] && typeof mat[prop].dispose === 'function') {
            mat[prop].dispose();
          }
        });
        mat.dispose();
      };

      if (Array.isArray(object.material)) {
        object.material.forEach(cleanMaterial);
      } else {
        cleanMaterial(object.material);
      }
    }
  });

  // Clear scene and renderer
  scene.clear();
  renderer.dispose();
  renderer.forceContextLoss();
}
```

---

## 7. The 20-Point Automated & Manual 3D Verification Checklist

Before claiming any Three.js 3D model feature is ready for production, the developer/agent must pass this 20-point verification audit:

```
[ ]  1. Model File Format: glTF 2.0 Binary (.glb) with Draco or Meshopt compression verified.
[ ]  2. Polycount Verified: Triangle count is within hardware budget (< 100k desktop, < 30k mobile).
[ ]  3. Part Tree Decomposition: Every animatable part has a distinct semantic name and verified pivot origin.
[ ]  4. Uniform Scale: All parts have scale (1, 1, 1); no inverted negative scale matrices.
[ ]  5. Normals Checked: Vertex normals computed; no dark unlit seams or black inverted polygons.
[ ]  6. PBR Materials: MeshStandardMaterial or MeshPhysicalMaterial with roughness/metalness parameters.
[ ]  7. Texture Dimensions: Power-of-two (POT) textures; sRGB colorSpace set for color maps.
[ ]  8. Studio Lighting Rig: Balanced 3-point lighting (Key, Fill, Rim) + ambient HDR environment map.
[ ]  9. Soft Shadows: PCFSoftShadowMap enabled; shadow bias calibrated to prevent shadow acne.
[ ] 10. Frame Rate Stability: Solid 60 FPS verified across Chrome, Firefox, and Safari.
[ ] 11. Draw Call Count: Draw calls strictly under 40 per frame (verified in renderer.info.render.calls).
[ ] 12. Viewport Clamping: Responsive canvas adapts with ResizeObserver; zero horizontal scrollbar creation.
[ ] 13. DPR Clamping: window.devicePixelRatio is clamped via Math.min(window.devicePixelRatio, 2).
[ ] 14. Scroll Rigging Easing: Scroll animations interpolate smoothly via cubic-bezier or scrub dampening.
[ ] 15. Touch / Mobile Handling: OrbitControls touch gestures do not hijack vertical page scroll.
[ ] 16. WebGL Context Loss Handler: webglcontextlost event listener implemented gracefully.
[ ] 17. Reduced Motion Fallback: Respects prefers-reduced-motion; pauses kinetic rotation.
[ ] 18. Complete GPU Disposal: scene.traverse() cleans all geometries, materials, and textures on unmount.
[ ] 19. Visual Inspector Tested: Model examined in ThreeModelInspector with wireframe and part isolation.
[ ] 20. Zero Console Warnings: Zero Three.js shader compilation errors or missing texture 404s.
```

---

## 8. Production React Component: The Three.js Model Inspector & Parts Studio

Save this component as `components/ui/ThreeModelInspector.tsx` for visual inspection, part isolation, wireframe toggling, and scroll timeline debugging:

```tsx
'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';
import { auditThreeModel, ModelAuditSummary, purgeThreeScene } from './ThreeAuditUtils';

export interface ThreeModelInspectorProps {
  modelUrl?: string;
  proceduralMeshFactory?: () => THREE.Object3D;
  title?: string;
  className?: string;
}

export function ThreeModelInspector({
  modelUrl,
  proceduralMeshFactory,
  title = '3D Model Studio & Parts Inspector',
  className = '',
}: ThreeModelInspectorProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const modelRootRef = useRef<THREE.Object3D | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);

  const [audit, setAudit] = useState<ModelAuditSummary | null>(null);
  const [wireframe, setWireframe] = useState(false);
  const [explodeDistance, setExplodeDistance] = useState(0);
  const [activePart, setActivePart] = useState<string | null>(null);
  const [lightingPreset, setLightingPreset] = useState<'studio' | 'cyberpunk' | 'warm'>('studio');
  const [loading, setLoading] = useState(true);

  // Initialize Three.js Scene
  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    const width = container.clientWidth || 800;
    const height = container.clientHeight || 500;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    scene.background = new THREE.Color('#090d16');
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(3, 2, 4);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.0;
    rendererRef.current = renderer;
    container.appendChild(renderer.domElement);

    // 2. Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controlsRef.current = controls;

    // 3. Lighting Rig
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    ambientLight.name = 'light_ambient';
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0x38bdf8, 2.0);
    dirLight.position.set(5, 8, 5);
    dirLight.castShadow = true;
    dirLight.shadow.mapSize.width = 1024;
    dirLight.shadow.mapSize.height = 1024;
    dirLight.shadow.bias = -0.0001;
    dirLight.name = 'light_dir';
    scene.add(dirLight);

    const fillLight = new THREE.PointLight(0x818cf8, 1.5, 20);
    fillLight.position.set(-5, -2, -3);
    fillLight.name = 'light_fill';
    scene.add(fillLight);

    // 4. Ground Grid Stage
    const grid = new THREE.GridHelper(10, 20, 0x38bdf8, 0x1e293b);
    grid.position.y = -1;
    scene.add(grid);

    // 5. Load or Construct Model
    const loadModel = () => {
      setLoading(true);

      const handleModelReady = (root: THREE.Object3D) => {
        modelRootRef.current = root;
        scene.add(root);

        // Center model geometry bounding box
        const bbox = new THREE.Box3().setFromObject(root);
        const center = bbox.getCenter(new THREE.Vector3());
        const size = bbox.getSize(new THREE.Vector3());
        const maxDim = Math.max(size.x, size.y, size.z);
        if (maxDim > 0) {
          const scale = 2.0 / maxDim;
          root.scale.setScalar(scale);
          root.position.sub(center.multiplyScalar(scale));
        }

        // Run full audit
        const report = auditThreeModel(root);
        setAudit(report);
        setLoading(false);
      };

      if (modelUrl) {
        const loader = new GLTFLoader();
        const dracoLoader = new DRACOLoader();
        dracoLoader.setDecoderPath('https://www.gstatic.com/draco/versioned/decoders/1.5.6/');
        loader.setDRACOLoader(dracoLoader);

        loader.load(
          modelUrl,
          (gltf) => handleModelReady(gltf.scene),
          undefined,
          (err) => {
            console.error('Failed to load 3D model:', err);
            setLoading(false);
          }
        );
      } else if (proceduralMeshFactory) {
        const root = proceduralMeshFactory();
        handleModelReady(root);
      } else {
        // High-Precision Fallback Procedural Assembly
        const group = new THREE.Group();
        group.name = 'Procedural_Cyber_Core';

        const chassis = new THREE.Mesh(
          new THREE.CylinderGeometry(0.8, 1.0, 1.4, 48, 8),
          new THREE.MeshStandardMaterial({ color: 0x1e293b, metalness: 0.85, roughness: 0.25 })
        );
        chassis.name = 'Chassis_Base';
        chassis.castShadow = true;
        group.add(chassis);

        const innerOrb = new THREE.Mesh(
          new THREE.SphereGeometry(0.45, 32, 32),
          new THREE.MeshStandardMaterial({ color: 0x38bdf8, emissive: 0x0284c7, emissiveIntensity: 0.8, roughness: 0.1 })
        );
        innerOrb.name = 'Quantum_Core_Orb';
        group.add(innerOrb);

        const ring = new THREE.Mesh(
          new THREE.TorusGeometry(1.2, 0.04, 16, 64),
          new THREE.MeshStandardMaterial({ color: 0x818cf8, metalness: 0.9, roughness: 0.1 })
        );
        ring.name = 'Outer_Gimbal_Ring';
        ring.rotation.x = Math.PI / 2;
        group.add(ring);

        handleModelReady(group);
      }
    };

    loadModel();

    // 6. Animation Loop
    let animId: number;
    const animate = () => {
      animId = requestAnimationFrame(animate);
      controls.update();

      // Slow ambient idle hover
      if (modelRootRef.current && explodeDistance === 0) {
        modelRootRef.current.rotation.y += 0.002;
      }

      renderer.render(scene, camera);
    };
    animate();

    // 7. Resize Observer
    const handleResize = () => {
      if (!container || !rendererRef.current) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      rendererRef.current.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      purgeThreeScene(scene, renderer);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [modelUrl, proceduralMeshFactory]);

  // Wireframe Toggle
  const toggleWireframe = useCallback(() => {
    if (!modelRootRef.current) return;
    const next = !wireframe;
    setWireframe(next);
    modelRootRef.current.traverse((child: any) => {
      if (child.isMesh && child.material) {
        if (Array.isArray(child.material)) {
          child.material.forEach((m: any) => (m.wireframe = next));
        } else {
          child.material.wireframe = next;
        }
      }
    });
  }, [wireframe]);

  // Exploded View Physics
  const handleExplodeChange = useCallback((distance: number) => {
    setExplodeDistance(distance);
    if (!modelRootRef.current) return;

    modelRootRef.current.traverse((child: any) => {
      if (child.isMesh) {
        if (!child.userData.originalPos) {
          child.userData.originalPos = child.position.clone();
        }
        const orig = child.userData.originalPos as THREE.Vector3;
        const normal = orig.clone().normalize();
        if (normal.length() === 0) normal.set(0, 1, 0);

        child.position.copy(orig).add(normal.multiplyScalar(distance));
      }
    });
  }, []);

  // Isolate Specific Part
  const isolatePart = useCallback((partName: string | null) => {
    setActivePart(partName);
    if (!modelRootRef.current) return;

    modelRootRef.current.traverse((child: any) => {
      if (child.isMesh) {
        if (!partName) {
          child.visible = true;
        } else {
          child.visible = child.name === partName;
        }
      }
    });
  }, []);

  return (
    <div className={`relative flex flex-col lg:flex-row w-full rounded-2xl bg-slate-950 border border-slate-800 overflow-hidden shadow-2xl text-slate-100 ${className}`}>
      {/* Main 3D Canvas Stage */}
      <div className="relative flex-1 min-h-[420px] lg:min-h-[560px]">
        <div ref={containerRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

        {/* Loading Overlay */}
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-slate-950/80 backdrop-blur-md">
            <div className="flex flex-col items-center gap-3">
              <div className="w-8 h-8 rounded-full border-2 border-sky-400 border-t-transparent animate-spin" />
              <span className="text-xs font-mono text-sky-400 uppercase tracking-widest">Auditing 3D Geometry...</span>
            </div>
          </div>
        )}

        {/* Floating Topbar Control Pill */}
        <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none">
          <div className="pointer-events-auto flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-slate-900/80 border border-slate-700/60 backdrop-blur-md">
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs font-semibold text-slate-200">{title}</span>
          </div>

          <div className="pointer-events-auto flex items-center gap-2">
            <button
              onClick={toggleWireframe}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium border transition-colors ${
                wireframe
                  ? 'bg-sky-500/20 border-sky-400 text-sky-300'
                  : 'bg-slate-900/80 border-slate-700/60 text-slate-300 hover:text-white'
              }`}
            >
              Wireframe
            </button>
            {activePart && (
              <button
                onClick={() => isolatePart(null)}
                className="px-3 py-1.5 rounded-xl text-xs font-medium bg-rose-500/20 border border-rose-400 text-rose-300 hover:bg-rose-500/30 transition-colors"
              >
                Reset Isolation
              </button>
            )}
          </div>
        </div>

        {/* Floating Bottom Explode Scrubber */}
        <div className="absolute bottom-4 left-4 right-4 flex items-center gap-4 px-4 py-2.5 rounded-xl bg-slate-900/85 border border-slate-700/60 backdrop-blur-md">
          <span className="text-xs font-medium text-slate-300 whitespace-nowrap">Exploded Disassembly:</span>
          <input
            type="range"
            min="0"
            max="1.5"
            step="0.01"
            value={explodeDistance}
            onChange={(e) => handleExplodeChange(parseFloat(e.target.value))}
            className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-sky-400"
          />
          <span className="text-xs font-mono text-sky-400 w-12 text-right">{explodeDistance.toFixed(2)}x</span>
        </div>
      </div>

      {/* Parts Decomposition & Audit Sidebar */}
      <div className="w-full lg:w-80 border-t lg:border-t-0 lg:border-l border-slate-800 bg-slate-900/60 backdrop-blur-xl p-5 flex flex-col gap-5">
        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">Model Telemetry</h4>
          {audit ? (
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-2.5 rounded-lg bg-slate-800/60 border border-slate-700/40">
                <div className="text-slate-400 text-[10px]">Triangles</div>
                <div className="font-mono font-bold text-sky-400">{audit.totalTriangles.toLocaleString()}</div>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-800/60 border border-slate-700/40">
                <div className="text-slate-400 text-[10px]">Vertices</div>
                <div className="font-mono font-bold text-emerald-400">{audit.totalVertices.toLocaleString()}</div>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-800/60 border border-slate-700/40">
                <div className="text-slate-400 text-[10px]">Meshes</div>
                <div className="font-mono font-bold text-indigo-400">{audit.meshCount}</div>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-800/60 border border-slate-700/40">
                <div className="text-slate-400 text-[10px]">VRAM Est.</div>
                <div className="font-mono font-bold text-amber-400">{audit.textureMemoryMB} MB</div>
              </div>
            </div>
          ) : (
            <div className="text-xs text-slate-500">Scanning telemetry...</div>
          )}
        </div>

        {/* Parts Hierarchy Explorer */}
        <div className="flex-1 overflow-hidden flex flex-col">
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Parts Tree ({audit?.parts.length || 0})</h4>
            <span className="text-[10px] text-slate-500">Click to Isolate</span>
          </div>

          <div className="overflow-y-auto space-y-1.5 max-h-[280px] pr-1">
            {audit?.parts.map((p, idx) => (
              <div
                key={idx}
                onClick={() => isolatePart(activePart === p.name ? null : p.name)}
                className={`p-2 rounded-lg border text-xs cursor-pointer transition-all flex items-center justify-between ${
                  activePart === p.name
                    ? 'bg-sky-500/20 border-sky-400 text-sky-200'
                    : 'bg-slate-800/40 border-slate-700/30 text-slate-300 hover:bg-slate-800/80 hover:border-slate-600'
                }`}
              >
                <div className="truncate flex-1 pr-2">
                  <div className="font-medium truncate">{p.name}</div>
                  <div className="text-[10px] text-slate-500 truncate">{p.material}</div>
                </div>
                <span className="font-mono text-[10px] text-slate-400 whitespace-nowrap">{p.triangles} ▲</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
```

---

## 9. The Anatomy 3D & Isometric Rigid-Body Engine Integration (`wheresryan22/anatomy`)

### 9.1 Philosophy: The Physical Object IS the Explanation
In world-class software and systems engineering, abstract box-and-arrow diagrams are often too flat, ambiguous, and forgettable. The **Anatomy Engine** enforces a profound design principle:

> ⚙️ **THE PHYSICAL ANALOGY MANDATE**:  
> Every complex software architecture, algorithmic mechanism, or distributed flow must be constructed as a **real, tangible physical machine** whose physical mechanics represent the exact digital logic.
> - A **Token Bucket Rate Limiter** becomes a weighted metering hopper with an escapement gate and calibrated balance springs.
> - A **Distributed Cache Invalidation Bus** becomes a multi-tier pin-tumbler lock where every pin must seat simultaneously for the central plug to rotate.
> - A **Shared Multi-Tenant GPU Context** becomes a gantry plotter visiting 16 precision chemical wells with a solitary robotic head.
> - A **Circuit Breaker** becomes an industrial high-voltage spring-loaded air gap switch with manual trip levers and magnetic blowout coils.

### 9.2 Architecture & Global Installation Footprint
The Anatomy skill is installed natively in the global Antigravity customizations directory, ensuring it is always ready to invoke across any workspace via the `/anatomy` slash command or agent prompts without bloating the repository root:
- **Global Skill Directory**: `~/.gemini/config/skills/anatomy/`
- **Documentation Repo Policy**: Kept 100% clean (zero duplicate clone bloat in repo root)
- **Core Modules (`kit/`)**:
  - `kit/iso-kit.ts` / `kit/iso-kit.mjs`: Core isometric projection math, 4-tone shading engine, SVG string rendering, plate formatting, and base CSS (`ISO_CSS`).
  - `kit/turn-build.mjs`: Kinematic rigid-body compiler (`turning()`), separating-plane solver, and pose sampler.
  - `kit/turn.mjs`: Runtime client controller (`TURN.mount()`, dynamic transform matrices, live layer management).
  - `kit/lathe.mjs`: Rotational solids of revolution along any 3D axis (flanges, bells, pistons, knurled dials, saddles).
  - `kit/tube.mjs`: 3D hydraulic conduits, electrical wire harnesses, collar couplings, and depth-sorted tube chunks.
  - `kit/gl.mjs`: WebGL volumetric shader pipeline (combustion flames, plumes, caustics, sparks, lamp glow) aligned to the isometric camera.
  - `kit/audit.mjs` & `kit/turn-audit.mjs`: Automated geometric verification proving zero pipe collisions, zero line-end orphans, and exact depth order.
  - `scripts/lines.mjs`: Headless Chrome verification asserting that every vector line terminates on a solid stroke, dot, or boundary.
  - `scripts/print.mjs`: Vector PDF exporter generating printable A4/Letter engineering blueprints and posters.

```
┌──────────────────────────────────────────────────────────────────────────────────────────────────┐
│                                   Anatomy Engine Architecture                                    │
├──────────────────────────────────────────────────────────────────────────────────────────────────┤
│ 1. GEOMETRY KERNEL                                                                               │
│    slabOf(), lathe(), tubePieces(), bandsOf(), saddleOf(), sphereOf(), coil(), knurl()           │
├──────────────────────────────────────────────────────────────────────────────────────────────────┤
│ 2. KINEMATIC RIGID-BODY COMPILER                                                                 │
│    T.group("name", { turn, slide, hinge, free }) ──> Separating Planes Depth Solver ──> Live SVG│
├──────────────────────────────────────────────────────────────────────────────────────────────────┤
│ 3. WORLD-SPACE WEBGL SHADER STACK                                                                │
│    Back SVG (Covered parts) ──> WebGL Canvas (Plumes/Sparks) ──> Front SVG (Occluding parts)     │
├──────────────────────────────────────────────────────────────────────────────────────────────────┤
│ 4. AUTOMATED AUDIT & CI GATES                                                                    │
│    A.settle() ──> A.auditOrExit() ──> TA.orbitOrExit() ──> lines.mjs (Zero-Interpenetration)    │
└──────────────────────────────────────────────────────────────────────────────────────────────────┘
```

### 9.3 Kinematic Groups & 3D Rigid-Body Mechanics
Anatomy introduces 4 fundamental kinematic primitives for multi-part mechanical motion:

| Kinematic Kind | Mechanical Definition | Mathematical Pose Specification | Real-World Application |
|---|---|---|---|
| **`turn`** | 1-DOF continuous rotation about vertical axis $[x, y]$ | `{ pivot: [x, y] }`, angle $\theta \in [0^\circ, 360^\circ]$ | Turntables, dials, turbines, combination locks |
| **`slide`** | 1-DOF linear translation along a direction vector | `{ direction: [dx, dy, dz], travel: D }`, displacement $d \in [0, D]$ | Hydraulic plungers, sliding carriages, vernier calipers |
| **`hinge`** | 1-DOF angular rotation about an arbitrary 3D axis | `{ point: [x,y,z], axis: [u,v,w], range: [min, max] }` in degrees | Articulated robot fingers, service doors, toggle levers |
| **`free`** | 6-DOF unconstrained rigid body motion | `{ R: [9] \| q: [x,y,z,w], t: [dx, dy, dz] }` or `null` (rest) | Breakaway capsules, falling debris, tumbling components |

### 9.4 Camera-Locked 4-Tone Shading & Native Physical Materials
Unlike generic WebGL shaders that compute per-pixel Phong or standard PBR at heavy GPU cost, Anatomy uses an optimized **camera-locked 4-tone lighting model**:
- **Light Vector**: Always locked to the top-left of the isometric view vector ($45^\circ$ azimuth, $30^\circ$ elevation).
- **Tone Scale**:
  - `lit`: Pure white `#FFFFFF` (dark theme) or pure black `#000000` (light theme). Reserved strictly for the single active focal component (e.g. active probe tip, glowing filament).
  - `hi`: Specular highlights and upward-facing planes ($Z+$).
  - `mid`: Structural side walls and primary mechanical bodies.
  - `lo`: Recessed pockets, downward faces, and foundational base plates.
  - `faint`: Precision engraved tick marks, ruler divisions, and hairline panel grooves.
- **Native Material Palettes**:
  - `steel`: Precision machine steel, sharp contrast, neutral gray tone ramp.
  - `gold`: Polished optical surfaces and sensor contacts, rich yellow/amber specular ramp.
  - `chrome`: Mirror-polished hydraulic rods and knobs with ultra-high specular cutoffs.
  - `rubber`: O-rings, flexible conduits, vibration dampeners, and gaskets with soft diffuse falloff.
  - `gunmetal`: Anodized titanium chassis, dark tactical hardware with muted highlights.
  - `copper` & `brass`: Heat exchangers, busbars, electrical lugs, and heavy mechanical bushings.

### 9.5 The Automated Geometric Audit Suite
Before any 3D model or isometric figure is deployed to documentation, it must pass a strict mathematical audit with **Zero Violations**:

```bash
# 1. Run full geometry collision, clearance, and painter's order audit
node build.mjs --audit

# 2. Run line-end verification in headless Chrome (assert line ends = 0)
node scripts/lines.mjs page.html --out shots/lines.png

# 3. For 3D turning figures, run full orbit sweep audit (0° to 360° at 0.3° increments)
node scripts/turn-check.mjs --fidelity --order --pops --lines --perf
```

What the audit verifies:
1. **Zero Pipe/Conduit Collisions**: No pipe or wire passes through any solid, cable, or fitting at rest, apart, or during intermediate motion.
2. **Support & Terminal Flushness**: Every pipe flange lands squarely on a port, manifold, or saddle pad (`G.saddleOf`); no floating ends.
3. **No Line-End Orphans**: Every seam, rib, weld, and ruler tick terminates cleanly on a solid perimeter, dot, or boundary.
4. **Depth Order Invariant**: Every overlapping pair of solids has a strict separating plane; zero Z-fighting or flickering.

---

## 10. End-to-End Blueprint: Creating & Auditing High-Level 3D Models in Docs

### 10.1 The 7-Step Production Workflow
Follow this disciplined engineering process whenever building high-level 3D models for documentation:

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                              The 7-Step Anatomy Workflow                               │
├─────────────┬──────────────────────────────────────────────────────────────────────────┤
│ Step 1      │ TRUTH FIRST: Determine physical dimensions, travel ranges, sensor rates │
├─────────────┼──────────────────────────────────────────────────────────────────────────┤
│ Step 2      │ INVENT THE MACHINE: Map digital concept to an unambiguous mechanical tool│
├─────────────┼──────────────────────────────────────────────────────────────────────────┤
│ Step 3      │ 40+ PARTS DECOMPOSITION: Base, Structure, Mechanism, Controls, Subject   │
├─────────────┼──────────────────────────────────────────────────────────────────────────┤
│ Step 4      │ COORDINATE PLANNING: World space (X/Y on floor, Z up, isometric camera) │
├─────────────┼──────────────────────────────────────────────────────────────────────────┤
│ Step 5      │ GEOMETRY PRECOMPUTATION: Slabs, lathes, coils, tubes, and saddles        │
├─────────────┼──────────────────────────────────────────────────────────────────────────┤
│ Step 6      │ KINEMATICS & RIGGING: Rig turning, sliding, and hinging live groups     │
├─────────────┼──────────────────────────────────────────────────────────────────────────┤
│ Step 7      │ AUTOMATED AUDIT: Run auditOrExit and lines.mjs until all errors are 0    │
└─────────────┴──────────────────────────────────────────────────────────────────────────┘
```

### 10.2 Parts Decomposition Template (Minimum 40 Parts)
Every explanatory model must declare at least 40 discrete parts to achieve the high-density standard:

| Group | Sub-Assembly | Constituent Parts | Material | Kinematic Group |
|---|---|---|---|---|
| **Base** | Foundation Plate | Cast iron base, 4 neoprene foot pads, perimeter chamfer, grounding lug, 4 M6 hex bolts | `gunmetal` | Static (`back`) |
| **Base** | Measurement Bed | Stainless calibration scale, etched tick lines (50x), 10 numbered major marks | `steel` | Static (`back`) |
| **Structure**| Vertical Uprights | Left & right twin guide columns, upper tie-bridge, 2 limit-stop bumpers, top cap nuts | `chrome` | Static (`back`) |
| **Mechanism**| Linear Slide | Carriage block, bronze slide bushings (4x), drive rack gear, tensioning coil spring | `brass` | `T.group("slide")` |
| **Mechanism**| Articulated Probe | 3-link knuckle finger, pivot hinge pins (3x), optical contact tip, silicon boot | `gold` / `rubber` | `T.group("hinge")` |
| **Controls** | Micrometer Dial | Knurled adjustment knob, vernier drum, radial graduations (100x), lock thumb screw | `steel` | `T.group("dial")` |
| **Subject**  | High-Voltage Core | Ceramic insulator spool, copper toroidal coil, central emitter needle, glow window | `copper` | `T.group("core")` (Lit) |
| **Atmosphere**| Discharge Plume | WebGL volumetric plasma cone, ionization sparks, ground contact heat pool | Shaders | WebGL Layer |

### 10.3 Production React Component: `<AnatomyInteractiveStage />`
The following component encapsulates the Anatomy client controller in React/Next.js, providing full interactive orbital control, exploded assembly inspection, live telemetry readouts, and dark/light paper theme switching:

```tsx
'use client';

import React, { useEffect, useRef, useState, useTransition } from 'react';

export interface PartTelemetry {
  id: string;
  name: string;
  group: 'turn' | 'slide' | 'hinge' | 'static';
  material: string;
  stateValue: number | string;
  unit: string;
}

export interface AnatomyModelProps {
  modelTitle: string;
  figureNumber?: string;
  interactiveHint?: string;
  stageHtml: string;
  turnData: any;
  parts: PartTelemetry[];
  onPoseChange?: (pose: Record<string, number>) => void;
}

export function AnatomyInteractiveStage({
  modelTitle = 'High-Precision 3D Actuator & Inspection Stage',
  figureNumber = 'Fig 4.2',
  interactiveHint = 'Drag dial to rotate • Hold Shift to lift probe • Space for auto-tour',
  stageHtml,
  turnData,
  parts = [],
  onPoseChange,
}: AnatomyModelProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const controllerRef = useRef<any>(null);
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [isExploded, setIsExploded] = useState(false);
  const [activePart, setActivePart] = useState<string | null>(null);
  const [dialAngle, setDialAngle] = useState(0);
  const [probeLift, setProbeLift] = useState(0);
  const [isTouring, setIsTouring] = useState(false);
  const [isPending, startTransition] = useTransition();

  // Mount Anatomy Controller
  useEffect(() => {
    if (!containerRef.current || !turnData) return;

    // Dynamically access the global TURN runtime or imported module
    const TURN = (window as any).TURN;
    if (!TURN) return;

    const stageEl = containerRef.current.querySelector('.iso-stage');
    if (!stageEl) return;

    const controller = TURN.mount(stageEl, turnData, {
      follow: (values: any) => ({
        ...values,
        'f2.mcp': -22 * (values.lift ?? 0),
        'carriage.slide': values.explode ? 45 * values.explode : 0,
      }),
      onHold: () => setIsTouring(false),
      onFrame: () => {
        // Frame callback if needed
      },
    });

    controllerRef.current = controller;

    return () => {
      if (controllerRef.current?.destroy) {
        controllerRef.current.destroy();
      }
    };
  }, [turnData]);

  // Push reactive poses to the Anatomy controller
  useEffect(() => {
    if (!controllerRef.current) return;
    controllerRef.current.set({
      dial: dialAngle,
      lift: probeLift,
      explode: isExploded ? 1.0 : 0.0,
    });
    onPoseChange?.({ dial: dialAngle, lift: probeLift, explode: isExploded ? 1 : 0 });
  }, [dialAngle, probeLift, isExploded, onPoseChange]);

  // Automated Tour Loop
  useEffect(() => {
    if (!isTouring) return;
    let animId: number;
    let start = performance.now();

    const loop = (time: number) => {
      const elapsed = (time - start) / 1000;
      setDialAngle((elapsed * 30) % 360);
      setProbeLift(Math.abs(Math.sin(elapsed * 1.5)));
      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animId);
  }, [isTouring]);

  return (
    <div
      className={`relative w-full rounded-2xl border transition-colors duration-300 font-sans ${
        theme === 'dark'
          ? 'bg-slate-950 border-slate-800 text-slate-100 shadow-2xl shadow-indigo-950/20'
          : 'bg-stone-50 border-stone-300 text-stone-900 shadow-xl'
      }`}
      data-theme={theme}
    >
      {/* Card Header Bar */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-inherit">
        <div className="flex items-center gap-3">
          <span className="font-mono text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
            {figureNumber}
          </span>
          <h3 className="text-sm font-semibold tracking-tight">{modelTitle}</h3>
        </div>

        {/* Global Toolbar Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsTouring(!isTouring)}
            className={`px-3 py-1 text-xs font-medium rounded-lg border transition-all ${
              isTouring
                ? 'bg-emerald-500/20 border-emerald-400 text-emerald-300'
                : 'bg-slate-800/60 border-slate-700 hover:bg-slate-800 text-slate-300'
            }`}
          >
            {isTouring ? '❚❚ Pause Tour' : '▶ Auto-Tour'}
          </button>

          <button
            onClick={() => setIsExploded(!isExploded)}
            className={`px-3 py-1 text-xs font-medium rounded-lg border transition-all ${
              isExploded
                ? 'bg-amber-500/20 border-amber-400 text-amber-300'
                : 'bg-slate-800/60 border-slate-700 hover:bg-slate-800 text-slate-300'
            }`}
          >
            {isExploded ? 'Collapse Parts' : 'Exploded View'}
          </button>

          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="p-1.5 rounded-lg border border-slate-700 hover:bg-slate-800 text-xs text-slate-300"
            title="Toggle Light/Dark Paper Theme"
          >
            {theme === 'dark' ? '☀️ Paper' : '🌙 Dark'}
          </button>
        </div>
      </div>

      {/* Main Stage Grid: Interactive SVG+WebGL Model on Left, Telemetry on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-4 min-h-[500px]">
        {/* Anatomy 3D Interactive Stage Canvas */}
        <div className="lg:col-span-3 p-6 flex items-center justify-center relative overflow-hidden" ref={containerRef}>
          {/* Injected Anatomy Stage Markup (Back SVG + Live Turn SVG + WebGL Canvas + Front SVG) */}
          <div
            className="w-full h-full flex items-center justify-center select-none cursor-grab active:cursor-grabbing"
            dangerouslySetInnerHTML={{ __html: stageHtml }}
          />

          {/* Interactive Hint Floating Pill */}
          <div className="absolute bottom-4 left-6 pointer-events-none">
            <span className="text-[11px] font-mono text-slate-500 bg-slate-900/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-slate-800">
              {interactiveHint}
            </span>
          </div>

          {/* Live Needle/Gauge Telemetry Pill */}
          <div className="absolute bottom-4 right-6 pointer-events-none">
            <div className="flex items-center gap-3 bg-slate-900/90 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-slate-800 font-mono text-xs">
              <span className="text-slate-400">Angle: <strong className="text-sky-400">{dialAngle.toFixed(1)}°</strong></span>
              <span className="text-slate-600">|</span>
              <span className="text-slate-400">Stroke: <strong className="text-emerald-400">{(probeLift * 12.5).toFixed(2)} mm</strong></span>
            </div>
          </div>
        </div>

        {/* Multi-Part Decomposition & Telemetry Sidebar */}
        <div className="border-t lg:border-t-0 lg:border-l border-inherit p-4 flex flex-col bg-slate-900/30">
          <div className="flex items-center justify-between pb-3 border-b border-inherit mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Mechanisms ({parts.length})</span>
            <span className="text-[10px] text-slate-500 font-mono">PBR 4-Tone</span>
          </div>

          {/* Interactive Pose Controls */}
          <div className="space-y-3 mb-4 pb-4 border-b border-inherit">
            <div>
              <div className="flex justify-between text-xs text-slate-400 mb-1">
                <span>Dial Turntable (θ)</span>
                <span className="font-mono text-sky-400">{dialAngle.toFixed(0)}°</span>
              </div>
              <input
                type="range"
                min="0"
                max="360"
                value={dialAngle}
                onChange={(e) => setDialAngle(Number(e.target.value))}
                className="w-full accent-sky-500 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs text-slate-400 mb-1">
                <span>Probe Plunger Lift</span>
                <span className="font-mono text-emerald-400">{(probeLift * 100).toFixed(0)}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={probeLift}
                onChange={(e) => setProbeLift(Number(e.target.value))}
                className="w-full accent-emerald-500 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
              />
            </div>
          </div>

          {/* Parts Hierarchy List */}
          <div className="flex-1 overflow-y-auto space-y-1.5 pr-1 max-h-[300px]">
            {parts.map((part) => (
              <div
                key={part.id}
                onClick={() => setActivePart(activePart === part.id ? null : part.id)}
                className={`p-2 rounded-lg border text-xs cursor-pointer transition-all flex items-center justify-between ${
                  activePart === part.id
                    ? 'bg-indigo-500/20 border-indigo-400 text-indigo-200'
                    : 'bg-slate-800/40 border-slate-700/40 text-slate-300 hover:bg-slate-800/80 hover:border-slate-600'
                }`}
              >
                <div className="truncate flex-1 pr-2">
                  <div className="font-medium truncate">{part.name}</div>
                  <div className="text-[10px] text-slate-500 capitalize">{part.material} • {part.group}</div>
                </div>
                <div className="font-mono text-[11px] text-slate-400 text-right">
                  {part.stateValue} <span className="text-[9px] text-slate-500">{part.unit}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
```

---

## 11. Printable A4 Engineering Schematics & Blueprint Exporter

When documenting systems for stakeholders, architecture reviews, or physical workshop references, the Anatomy engine provides an automated vector PDF printing pipeline (`scripts/print.mjs`).

### 11.1 The 3 Technical Sheet Formats

```
┌──────────────────────────────────────────────────────────────────────────────────────────────────┐
│                                   Printable Sheet Formats (A4)                                   │
├──────────────────────────┬───────────────────────────────┬───────────────────────────────────────┤
│ Format 1: Poster         │ Format 2: Technical Drawing   │ Format 3: Detailed Manual             │
├──────────────────────────┼───────────────────────────────┼───────────────────────────────────────┤
│ • 1 Page                 │ • 1 Page                      │ • 2 to 4 Pages                        │
│ • Large Hero isometric   │ • Traditional CAD title block │ • Overview with callout pins          │
│ • Big telemetry callouts │ • Bill of Materials (BOM)     │ • Step-by-step "How It Works" stills  │
│ • Numbered pointer pins  │ • Inset cross-section view    │ • Assembly group exploded close-ups   │
│ • Purpose: Exec Summary  │ • Purpose: Engineering Spec   │ • Purpose: Maintenance & Deep-Dive    │
└──────────────────────────┴───────────────────────────────┴───────────────────────────────────────┘
```

### 11.2 Generating Engineering Blueprints
Create a `sheet.mjs` specification file next to the model's build script:

```javascript
// sheet.mjs: Blueprint specification for A4 export
export default {
  title: "RAPTOR 2 HIGH-PRESSURE TEST STAND",
  model: "modules/raptor/model.mjs",
  format: "detailed", // "poster" | "drawing" | "detailed"
  paper: "a4",        // "a4" | "letter"
  poses: [
    { name: "rest", action: [] },
    { name: "firing", action: [["hold", 1.0], ["throttle", 1.0]] },
    { name: "apart", action: [["explode", 1.0]] }
  ],
  assemblies: [
    { name: "turbopump_assembly", selector: "#turbopump", zoom: 2.5, caption: "Dual-shaft oxygen/methane turbopump" },
    { name: "gimbal_actuator", selector: "#actuator_y", zoom: 3.0, caption: "Hydraulic vector servo" }
  ],
  bom: [
    { item: 1, part: "Main Combustion Chamber", material: "Copper alloy (GRCop-84)", count: 1 },
    { item: 2, part: "Regenerative Fuel Jacket", material: "Inconel 718", count: 1 },
    { item: 3, part: "Turbopump Feed Flanges", material: "Titanium Grade 5", count: 4 }
  ]
};
```

Execute the vector print generator:
```bash
node scripts/print.mjs sheet.mjs --format all --png
```
This produces vector-perfect, publication-grade PDFs ready for inclusion in official technical documentation manuals, regulatory submissions, and system architecture ledgers.


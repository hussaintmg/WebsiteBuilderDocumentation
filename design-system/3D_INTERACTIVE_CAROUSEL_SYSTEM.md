# 🎠 Master Specification: 3D Perspective Card Carousel System

> **FILE:** `design-system/3D_INTERACTIVE_CAROUSEL_SYSTEM.md`  
> **CLASSIFICATION:** 3D Spatial Geometry & Touch-Momentum Carousel  
> **COMPANION COMPONENT:** [`components/CardCarousel3D.tsx`](../components/CardCarousel3D.tsx)  
> **RECIPE:** [`design-system/09_IMPLEMENTATION_RECIPES.md#recipe-15`](./09_IMPLEMENTATION_RECIPES.md#recipe-15)  
> **INSPIRATION:** Usman Shams ([@iusmanshams](https://www.instagram.com/iusmanshams/)) and Apple Cover Flow 3D

---

## 1. Architectural Overview & Spatial Geometry

The **3D Perspective Card Carousel System** renders an interactive circular cylinder or elliptical ring of luxury cards positioned in true 3D CSS perspective space. Users can drag, swipe, or click pagination controls, causing cards to smoothly orbit around the central axis with realistic inertia and depth attenuation.

```
                    [ Card i-1 ] (scale: 0.85, z: -100px)
                   /            \
                  /              \
[ Card i-2 ]     /                \     [ Card i+1 ] (scale: 0.85, z: -100px)
                |                  |
                 \                /
                  \              /
                   \____________/
                  [ ACTIVE CARD i ] (scale: 1.0, z: 0px, Specular Glare)
```

---

## 2. Mathematical Foundation: Cylindrical Coordinate Distribution

Given $N$ items and a carousel radius $R$ derived from card width $W_{\text{card}}$:
$$R = \frac{W_{\text{card}}}{2 \cdot \tan\left(\frac{\pi}{N}\right)}$$

For each card $i \in \{0, 1, \dots, N-1\}$ with rotational drag angle $\theta_{\text{rot}}$:
$$\theta_i = \left(\frac{360^\circ}{N} \cdot i\right) + \theta_{\text{rot}}$$

### 2.1 Depth, Scale, and Opacity Attenuation
The visual priority of each card is modulated by its angular distance from the focal plane ($\theta = 0^\circ$):
$$\Delta\theta_i = \left(\theta_i + 180^\circ \pmod{360^\circ}\right) - 180^\circ$$
$$\text{proximity}_i = \cos(\Delta\theta_i \cdot \frac{\pi}{180^\circ})$$

The 3D CSS spatial transformation applied to each card facet is:
```css
transform: rotateY(var(--card-angle)) translateZ(var(--cylinder-radius)) scale(var(--depth-scale));
```

1. **Z-Translation**: $z_i = R \cdot (\text{proximity}_i - 1)$ via `translateZ`
2. **Scale Factor**: $s_i = 0.75 + 0.25 \cdot \max(0, \text{proximity}_i)$
3. **Card Opacity**: $\alpha_i = \max(0.2, \text{proximity}_i^{1.5})$
4. **Z-Index Layering**: $z\text{-index}_i = \lfloor 100 \cdot \text{proximity}_i \rfloor$

---

## 3. Touch Drag Momentum & Inertia Snapping

1. **Pointer Down**: Captures starting client coordinate $X_0$ and resets velocity history.
2. **Pointer Move**: Calculates displacement:
   $$\Delta\theta = \frac{\Delta X}{\text{dragFactor}}$$
   Updates rotational angle with $60\text{ FPS}$ frame rendering.
3. **Pointer Up**: Evaluates release velocity $v_x = \frac{\Delta X}{\Delta t}$.
   - If $|v_x| > v_{\text{threshold}}$, momentum continues over $k$ frames with exponential decay factor $\mu = 0.92$.
   - Elastic spring snaps to the nearest exact card index:
     $$i_{\text{target}} = \operatorname{round}\left(-\frac{\theta_{\text{rot}}}{360^\circ / N}\right) \pmod N$$

---

## 4. Specular Lighting & Glass Glare Physics

Each card features an active specular highlight layer that dynamically mirrors the card's tilt angle:
```tsx
const glareOpacity = Math.max(0, proximity);
const glareTransform = `translateX(${deltaTheta * 1.5}px)`;
```
This produces an organic metallic reflection that glides across the frosted card facet as it passes the central spotlight.

---

## 5. Accessibility & Responsive Degradation

- When screen width $< 640\text{px}$ (mobile devices), cylinder radius automatically contracts, and cards transition into a clean horizontal scroll snap with touch swipe.
- When `prefers-reduced-motion` is active, 3D rotations are flattened to standard 2D sliding transitions.
- Full keyboard support: `ArrowLeft` / `ArrowRight` rotates carousel by exactly 1 card.

# Process Skid Builder & P&ID Visualizer — Extraction & Standalone Integration Guide

> [!NOTE]
> This guide outlines how to extract the **Interactive 2D Process Skid Builder** and **Vector P&ID Layout Generator & Renderer** into a completely decoupled, standalone Web Application (React/Vite, Vue, or Vanilla JS) **without making any changes to the current Anti VAMS codebase**.

---

## 🏛️ Executive Summary & Core Isolation Boundary

The Skid Builder and P&ID Visualizer in Anti VAMS were built as **pure UI and mathematical layout components**. The geometry layout engine (`pidLayoutEngine.js`), vector symbol rendering library (`PIDSymbolLibrary.jsx`), and 2D canvas (`PIDVisualizerModal.jsx`) have **zero database, backend API, or record-linking dependencies**. 

The main file [`SkidVisualizer.jsx`](file:///Users/davidyoung/Desktop/Anti%20VAMS/src/components/skid/SkidVisualizer.jsx) has a minor link to `storageService` solely for asset record selection dropdowns. In a standalone app, removing record linking is as simple as omitting that single service import and letting the user select valve/fitting types from a static JSON registry.

---

## 📁 Step 1: Copy Source Files to New Project

To port the feature to your new project, copy the following 4 files directly from Anti VAMS:

```text
new-project/
├── src/
│   ├── components/
│   │   └── skid/
│   │       ├── SkidVisualizer.jsx              <-- Main 2D Canvas & Topology Configurator
│   │       └── pid/
│   │           ├── pidLayoutEngine.js          <-- Core Mathematical Vector & Layout Engine
│   │           ├── PIDSymbolLibrary.jsx        <-- SVG Vector Symbol Library (ISO / ANSI)
│   │           └── PIDVisualizerModal.jsx      <-- Interactive P&ID SVG Viewer (Pan & Zoom)
│   └── config/
│       └── assetCategories.js                  <-- Equipment type definitions (or custom list)
```

---

## 🛠️ Step 2: Remove Record Linking (2 Simple Edits in New Project)

In your **new application repository**, make these two minor edits inside your copied `SkidVisualizer.jsx`:

### 1. Remove `storageService` Import
At line 2 of `src/components/skid/SkidVisualizer.jsx`:

```diff
- import { storageService } from '../../services/storage';
```

### 2. Replace Database Asset Dropdown with Static Category Selector
In the slot inspector panel (search for `records` or asset lookup), replace the dynamic record selection with a simple type picker. 

For example, replace database record mapping with:
```jsx
// Standalone equipment type picker (No database required)
<select 
    value={slot.equipmentType || slot.defaultType} 
    onChange={(e) => updateSlotType(slot.id, e.target.value)}
>
    <option value="Gate Valve">Gate Valve</option>
    <option value="Ball Valve">Ball Valve</option>
    <option value="Check Valve">Check Valve</option>
    <option value="Globe Control Valve">Globe Control Valve</option>
    <option value="Choke Valve">Choke Valve</option>
    <option value="General Process Equipment">Spool / Fitting</option>
</select>
```

---

## ⚙️ Step 3: Standalone Component Usage

You can embed the Skid Visualizer and P&ID Modal into any page of your new application using the clean component interface below:

```jsx
import React, { useState } from 'react';
import { SkidVisualizer } from './components/skid/SkidVisualizer';
import { PIDVisualizerModal } from './components/skid/pid/PIDVisualizerModal';

export const StandaloneSkidApp = () => {
    const [skidSpec, setSkidSpec] = useState(null);
    const [isPidModalOpen, setIsPidModalOpen] = useState(false);

    return (
        <div style={{ width: '100vw', height: '100vh' }}>
            {/* 1. Interactive 2D Skid Builder */}
            <SkidVisualizer 
                initialSpec={skidSpec}
                onSpecChange={(updatedSpec) => setSkidSpec(updatedSpec)}
                onOpenPID={() => setIsPidModalOpen(true)}
            />

            {/* 2. Instant Vector P&ID Visualizer */}
            <PIDVisualizerModal 
                isOpen={isPidModalOpen}
                onClose={() => setIsPidModalOpen(false)}
                skidSpec={skidSpec}
            />
        </div>
    );
};
```

---

## 🧠 Step 4: How the Engine Operates Standalone

The engine uses a pure JSON topology format (`SkidSpec`). When the user adds streams, branches, tees, or valves in the Skid Builder, it outputs a `SkidSpec` data object:

```json
{
  "skidType": "2_stream_surge_relief",
  "streamCount": 2,
  "streams": [
    {
      "id": "stream_1",
      "label": "Stream #1",
      "slots": [
        { "id": "s1_spool_1", "role": "spool", "label": "Inlet Spool" },
        { "id": "s1_gate", "role": "gate_valve", "label": "Isolation Gate Valve" },
        { 
          "id": "s1_tee", 
          "role": "tee", 
          "branchSlots": [
            { "id": "b1_blind", "role": "blind_flange", "portDirection": "right" }
          ]
        }
      ]
    }
  ]
}
```

When **`generatePIDLayout(skidSpec)`** is called in [`pidLayoutEngine.js`](file:///Users/davidyoung/Desktop/Anti%20VAMS/src/components/skid/pid/pidLayoutEngine.js):
1. It calculates exact 2D `(x, y)` Cartesian coordinates and `0° / 90° / 180° / 270°` rotation vectors for every valve, fitting, and line segment.
2. [`PIDVisualizerModal.jsx`](file:///Users/davidyoung/Desktop/Anti%20VAMS/src/components/skid/pid/PIDVisualizerModal.jsx) renders the SVG vector output with pan, zoom, and SVG export controls.

---

## 🧪 Step 5: Unit Test Suite Porting (Optional)

If you want automated tests in your new app, copy the test file:
```text
Anti VAMS: src/components/skid/pid/__tests__/pidLayoutEngine.test.js
```
To run tests in Node.js on your new project:
```bash
node --test src/components/skid/pid/__tests__/pidLayoutEngine.test.js
```

---

### Summary Checklist

| Task | File / Action | Anti VAMS Touch Needed? |
| :--- | :--- | :---: |
| **1. Copy Code** | Copy `src/components/skid/` & `assetCategories.js` | ❌ None |
| **2. Remove DB Import** | Remove `import { storageService }` in copied `SkidVisualizer.jsx` | ❌ None |
| **3. Remove Linking UI** | Remove record selection modal/dropdown in new app | ❌ None |
| **4. Run Standalone** | Render `<SkidVisualizer />` & `<PIDVisualizerModal />` | ❌ None |

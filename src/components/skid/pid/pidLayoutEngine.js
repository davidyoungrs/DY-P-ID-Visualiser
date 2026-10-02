/**
 * Stream Topology & Layout Engine for Process Skid P&ID Generation
 * Translates skidSpec.streams, headers, slots, and recursive branchSlots into 2D orthographic line and symbol coordinates.
 */

function collectAllBranchSlots(parentSlot) {
    const list = [];
    const slotMap = { [parentSlot.id]: parentSlot };

    function traverse(s) {
        if (!s || !Array.isArray(s.branchSlots)) return;
        s.branchSlots.forEach(b => {
            slotMap[b.id] = b;
            const parent = slotMap[b._parentSlotId || s.id] || s;
            const bItem = {
                ...b,
                _parentSlotId: s.id,
                _parentRole: s.role || (s.slot && s.slot.role) || '',
                _parentRotation: s.rotation || (s.slot && s.slot.rotation) || 0,
                _parentSlot: s
            };
            list.push(bItem);
            traverse(bItem);
        });
    }
    traverse(parentSlot);
    return list;
}

export function generatePIDLayout(skidSpec) {
    const rawStreams = skidSpec?.streams || [];
    const START_X = 180;
    const START_Y = 140;
    const Y_STRIDE = 260;
    const X_STRIDE = 80;

    let maxX = 800;
    const renderedStreams = [];
    const lines = [];
    const hasInletHeader = !!skidSpec?.inletHeader || rawStreams.length > 1;
    const hasOutletHeader = !!skidSpec?.outletHeader || rawStreams.length > 1;

    let minY = START_Y - 80;
    let maxY = START_Y + 80;

    rawStreams.forEach((stream, streamIdx) => {
        const streamY = START_Y + (streamIdx * Y_STRIDE);
        const nodes = [];
        let currentX = START_X;

        if (streamY - 80 < minY) minY = streamY - 80;
        if (streamY + 80 > maxY) maxY = streamY + 80;

        // Process line start marker
        nodes.push({
            type: 'inlet_label',
            x: currentX - 60,
            y: streamY,
            label: `${stream.label || `Stream #${streamIdx + 1}`} IN`
        });

        const slots = stream.slots || [];
        slots.forEach((slot, slotIdx) => {
            const isBlindSlot = (slot.role || slot.defaultType || slot.type || '').toLowerCase().includes('blind');
            currentX += isBlindSlot ? 45 : X_STRIDE;
            const mainNode = {
                id: slot.id || `slot_${streamIdx}_${slotIdx}`,
                role: slot.role || 'valve',
                valveType: slot.valveType || slot.type || slot.label || slot.defaultType || 'Valve',
                rotation: slot.rotation || slot.rotationDeg || 0,
                x: currentX,
                y: streamY,
                tag: slot.tagNo || slot.tag || slot.label || `V-${(streamIdx + 1) * 100 + (slotIdx + 1)}`,
                slot
            };
            nodes.push(mainNode);

            // Recursively collect and layout Branch Slots attached to Tee, Cross, or Elbow fittings
            const branchSlots = collectAllBranchSlots(slot);
            if (branchSlots.length > 0) {
                // Track 2D (x, y) coordinates of every node in the branch tree
                const nodePosMap = { [slot.id]: { x: currentX, y: streamY } };

                // Group sibling branch slots by parent ID and direction to calculate offsets correctly
                const siblingCounts = {};

                branchSlots.forEach((bSlot, bIdx) => {
                    const parentId = bSlot._parentSlotId || slot.id;
                    const parentPos = nodePosMap[parentId] || { x: currentX, y: streamY };
                    const parentRole = (bSlot._parentRole || '').toLowerCase();
                    const parentRot = bSlot._parentRotation || 0;

                    const parentNode = nodes.find(n => n.id === parentId);

                    let dirX = 0;
                    let dirY = -1; // UP by default

                    const explicitDir = bSlot.portDirection || (bSlot.slot && bSlot.slot.portDirection) || bSlot._portDirection;
                    const isBlindBranch = (bSlot.role || '').toLowerCase().includes('blind') || (bSlot.valveType || '').toLowerCase().includes('blind');

                    // 1. Blind Flange Direct 1-to-1 Port Vector Rule:
                    // Position and projection vector depends ONLY on the port (+ button side) clicked on its adjoining parent item
                    if (isBlindBranch) {
                        let pDir = (explicitDir || '').toLowerCase();
                        if (!pDir) {
                            if (parentRole.includes('tee')) {
                                if (parentRot === 180) pDir = 'bottom';
                                else if (parentRot === 270) pDir = 'top';
                                else if (parentRot === 90) pDir = 'bottom';
                                else pDir = 'top';
                            } else if (parentRole.includes('elbow')) {
                                if (parentRot === 90) pDir = 'bottom';
                                else if (parentRot === 180) pDir = 'left';
                                else if (parentRot === 270) pDir = 'top';
                                else pDir = 'right';
                            } else if (parentNode && parentNode.isBranchNode && !parentNode.isHorizontalBranch) {
                                pDir = 'top';
                            } else {
                                pDir = 'right';
                            }
                        }
                        if (pDir === 'left') { dirX = -1; dirY = 0; }
                        else if (pDir === 'top') { dirX = 0; dirY = -1; }
                        else if (pDir === 'bottom') { dirX = 0; dirY = 1; }
                        else { dirX = 1; dirY = 0; } // 'right' or default
                    }
                    // 2. Explicit portDirection Priority for non-blind components
                    else if (explicitDir === 'right') { dirX = 1; dirY = 0; }
                    else if (explicitDir === 'top') { dirX = 0; dirY = -1; }
                    else if (explicitDir === 'bottom') { dirX = 0; dirY = 1; }
                    else if (explicitDir === 'left') { dirX = -1; dirY = 0; }
                    // 3. Parent Fitting-Specific Rotation & Vector Mapping
                    else if (parentRole.includes('tee')) {
                        if (bIdx > 0) {
                            dirX = 1; dirY = 0;
                        } else if (parentRot === 0) { dirX = 1; dirY = 0; }
                        else if (parentRot === 90) { dirX = 0; dirY = 1; }
                        else if (parentRot === 180) { dirX = -1; dirY = 0; }
                        else if (parentRot === 270) { dirX = 0; dirY = -1; }
                    } else if (parentRole.includes('elbow')) {
                        if (parentRot === 90) { dirX = 1; dirY = 0; }
                        else if (parentRot === 180) { dirX = 0; dirY = 1; }
                        else if (parentRot === 270) { dirX = -1; dirY = 0; }
                        else { dirX = 0; dirY = -1; }
                    } else if (parentRole.includes('choke')) {
                        const chokeRot = parentNode?.rotation || parentNode?.slot?.rotation || parentRot || 0;
                        const isFlipped = chokeRot === 180 || chokeRot === 270;

                        if (parentNode && parentNode.isBranchNode && parentNode.isHorizontalBranch) {
                            dirX = 0; dirY = isFlipped ? 1 : -1;
                        } else {
                            dirX = isFlipped ? -1 : 1; dirY = 0;
                        }
                    } else if (parentNode && parentNode.isBranchNode && typeof parentNode.flowDirX === 'number' && typeof parentNode.flowDirY === 'number') {
                        // 4. Inherit parent branch line vector for inline items (e.g. Spools, Valves along branch)
                        dirX = parentNode.flowDirX;
                        dirY = parentNode.flowDirY;
                    }

                    const dirKey = `${parentId}_${dirX}_${dirY}`;
                    const prevDistance = siblingCounts[dirKey] || 0;
                    const bStride = isBlindBranch ? 45 : 80;
                    const nodeDistance = prevDistance + bStride;
                    siblingCounts[dirKey] = nodeDistance;

                    const nodeX = parentPos.x + (dirX * nodeDistance);
                    const nodeY = parentPos.y + (dirY * nodeDistance);

                    nodePosMap[bSlot.id] = { x: nodeX, y: nodeY };

                    if (nodeY - 80 < minY) minY = nodeY - 80;
                    if (nodeY + 80 > maxY) maxY = nodeY + 80;
                    if (nodeX > maxX) maxX = nodeX;

                    const isUp = dirY < 0;
                    nodes.push({
                        id: bSlot.id || `bSlot_${slot.id}_${bIdx}`,
                        role: bSlot.role || 'valve',
                        valveType: bSlot.valveType || bSlot.type || bSlot.label || 'Valve',
                        rotation: bSlot.rotation || bSlot.rotationDeg || 0,
                        x: nodeX,
                        y: nodeY,
                        tag: bSlot.tagNo || bSlot.tag || bSlot.label || `B-${bIdx + 1}`,
                        slot: bSlot,
                        isBranchNode: true,
                        isBranchUp: isUp,
                        isHorizontalBranch: dirX !== 0,
                        flowDirX: dirX,
                        flowDirY: dirY
                    });

                    // Draw line segment from immediate parent or preceding sibling to this node
                    const prevX = parentPos.x + (dirX * prevDistance);
                    const prevY = parentPos.y + (dirY * prevDistance);

                    // Calculate exact port edge offsets for Elbow fittings (12px port radius)
                    const isParentElbow = parentRole.includes('elbow') && prevDistance === 0;
                    const isThisElbow = (bSlot.role || '').toLowerCase().includes('elbow') || (bSlot.valveType || '').toLowerCase().includes('elbow');

                    const startOffset = isParentElbow ? 12 : 0;
                    const endOffset = isThisElbow ? 12 : (isBlindBranch ? 4 : 0);

                    const lineX1 = prevX + (dirX * startOffset);
                    const lineY1 = prevY + (dirY * startOffset);
                    const lineX2 = nodeX - (dirX * endOffset);
                    const lineY2 = nodeY - (dirY * endOffset);

                    lines.push({
                        id: `line_branch_${slot.id}_${bSlot.id || bIdx}`,
                        x1: lineX1,
                        y1: lineY1,
                        x2: lineX2,
                        y2: lineY2,
                        style: 'branch'
                    });
                });
            }
        });

        const lastMainSlot = slots[slots.length - 1];
        const isLastMainFitting = lastMainSlot && (
            (lastMainSlot.role || '').toLowerCase().includes('elbow') ||
            (lastMainSlot.role || '').toLowerCase().includes('tee') ||
            (lastMainSlot.defaultType || '').toLowerCase().includes('elbow') ||
            (lastMainSlot.defaultType || '').toLowerCase().includes('tee')
        );
        const isLastMainBlind = lastMainSlot && (
            (lastMainSlot.role || '').toLowerCase().includes('blind') ||
            (lastMainSlot.defaultType || '').toLowerCase().includes('blind')
        );

        const mainLineEndX = isLastMainBlind ? currentX - 4 : (isLastMainFitting ? currentX - 12 : (slots.length > 0 ? currentX : START_X));
        const endOfStreamX = slots.length > 0 ? currentX : START_X;

        nodes.push({
            type: 'outlet_label',
            x: endOfStreamX + 40,
            y: streamY,
            label: `${stream.label || `Stream #${streamIdx + 1}`} OUT`
        });

        if (endOfStreamX > maxX) maxX = endOfStreamX;

        // Stream main process line STOPS cleanly at the port of the last item on this stream
        lines.push({
            id: `line_main_${stream.id || streamIdx}`,
            x1: START_X - 60,
            y1: streamY,
            x2: mainLineEndX,
            y2: streamY,
            style: 'process'
        });

        renderedStreams.push({
            id: stream.id || `stream_${streamIdx}`,
            label: stream.label || `Stream #${streamIdx + 1}`,
            y: streamY,
            nodes
        });
    });

    // Manifold Headers (Vertical Header Lines connecting all streams)
    const yMinHeader = START_Y;
    const yMaxHeader = START_Y + Math.max(0, (rawStreams.length - 1) * Y_STRIDE);

    const headers = [];

    if (hasInletHeader && rawStreams.length > 0) {
        lines.push({
            id: 'line_header_inlet',
            x1: START_X - 60,
            y1: yMinHeader - 45,
            x2: START_X - 60,
            y2: yMaxHeader + 45,
            style: 'header'
        });
        headers.push({
            type: 'inlet',
            x: START_X - 60,
            yMin: yMinHeader - 45,
            yMax: yMaxHeader + 45,
            label: skidSpec?.inletHeader?.label || 'INLET HEADER'
        });
    }

    if (hasOutletHeader && rawStreams.length > 0) {
        lines.push({
            id: 'line_header_outlet',
            x1: maxX + 40,
            y1: yMinHeader - 45,
            x2: maxX + 40,
            y2: yMaxHeader + 45,
            style: 'header'
        });
        headers.push({
            type: 'outlet',
            x: maxX + 40,
            yMin: yMinHeader - 45,
            yMax: yMaxHeader + 45,
            label: skidSpec?.outletHeader?.label || 'OUTLET HEADER'
        });
    }

    const calculatedHeight = Math.ceil(maxY - minY + 120);

    return {
        streams: renderedStreams,
        lines,
        headers,
        minY,
        maxY,
        totalWidth: maxX + 220,
        totalHeight: Math.max(560, calculatedHeight)
    };
}

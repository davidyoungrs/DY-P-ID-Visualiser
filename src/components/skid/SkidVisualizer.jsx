import React, { useState, useRef, useEffect, useCallback } from 'react';

import { ASSET_CATEGORY_LIST } from '../../config/assetCategories';
import { PIDVisualizerModal } from './pid/PIDVisualizerModal';

/**
 * Preset topology factories
 */

// 1-Stream Surge Relief Skid: Single Stream [Inlet Spool -> Gate Valve -> Spool -> Surge Relief Valve -> Discharge Spool]
export const createSingleStreamSurgeReliefSkidSpec = () => {
    return {
        skidType: '1_stream_surge_relief',
        streamCount: 1,
        inletHeader: null,
        outletHeader: null,
        streams: [
            {
                id: 'stream_1',
                label: 'Main Relief Line',
                slots: [
                    { id: 's1_spool_1', role: 'spool', label: 'Inlet Spool', defaultType: 'General Process Equipment' },
                    { id: 's1_gate', role: 'gate_valve', label: 'Isolation Gate Valve', defaultType: 'Gate Valve' },
                    { id: 's1_spool_2', role: 'spool', label: 'Intermediate Spool', defaultType: 'General Process Equipment' },
                    { id: 's1_srv', role: 'surge_valve', label: 'Surge Relief Valve', defaultType: 'Axial Surge Relief Valve' },
                    { id: 's1_spool_3', role: 'spool', label: 'Discharge Spool', defaultType: 'General Process Equipment' }
                ]
            }
        ]
    };
};

// 2-Stream Surge Relief Skid: Inlet Header -> 2 Parallel Streams -> Outlet Header
export const createTwoStreamSurgeReliefSkidSpec = () => {
    return {
        skidType: '2_stream_surge_relief',
        streamCount: 2,
        inletHeader: {
            id: 'inlet_header',
            label: 'Inlet Header',
            role: 'inlet_header',
            defaultType: 'General Process Equipment'
        },
        outletHeader: {
            id: 'outlet_header',
            label: 'Outlet Header',
            role: 'outlet_header',
            defaultType: 'General Process Equipment'
        },
        streams: [
            {
                id: 'stream_1',
                label: 'Stream #1',
                slots: [
                    { id: 's1_spool_1', role: 'spool', label: 'Inlet Spool', defaultType: 'General Process Equipment' },
                    { id: 's1_gate', role: 'gate_valve', label: 'Isolation Gate Valve', defaultType: 'Gate Valve' },
                    { id: 's1_spool_2', role: 'spool', label: 'Intermediate Spool', defaultType: 'General Process Equipment' },
                    { id: 's1_srv', role: 'surge_valve', label: 'Surge Relief Valve', defaultType: 'Axial Surge Relief Valve' },
                    { id: 's1_spool_3', role: 'spool', label: 'Discharge Spool', defaultType: 'General Process Equipment' }
                ]
            },
            {
                id: 'stream_2',
                label: 'Stream #2',
                slots: [
                    { id: 's2_spool_1', role: 'spool', label: 'Inlet Spool', defaultType: 'General Process Equipment' },
                    { id: 's2_gate', role: 'gate_valve', label: 'Isolation Gate Valve', defaultType: 'Gate Valve' },
                    { id: 's2_spool_2', role: 'spool', label: 'Intermediate Spool', defaultType: 'General Process Equipment' },
                    { id: 's2_srv', role: 'surge_valve', label: 'Surge Relief Valve', defaultType: 'Axial Surge Relief Valve' },
                    { id: 's2_spool_3', role: 'spool', label: 'Discharge Spool', defaultType: 'General Process Equipment' }
                ]
            }
        ]
    };
};

// 3-Stream Surge Relief Skid: Inlet Header -> 3 Parallel Streams -> Outlet Header
export const createThreeStreamSurgeReliefSkidSpec = () => {
    return {
        skidType: '3_stream_surge_relief',
        streamCount: 3,
        inletHeader: {
            id: 'inlet_header',
            label: 'Inlet Header',
            role: 'inlet_header',
            defaultType: 'General Process Equipment'
        },
        outletHeader: {
            id: 'outlet_header',
            label: 'Outlet Header',
            role: 'outlet_header',
            defaultType: 'General Process Equipment'
        },
        streams: [
            {
                id: 'stream_1',
                label: 'Stream #1',
                slots: [
                    { id: 's1_spool_1', role: 'spool', label: 'Inlet Spool', defaultType: 'General Process Equipment' },
                    { id: 's1_gate', role: 'gate_valve', label: 'Isolation Gate Valve', defaultType: 'Gate Valve' },
                    { id: 's1_spool_2', role: 'spool', label: 'Intermediate Spool', defaultType: 'General Process Equipment' },
                    { id: 's1_srv', role: 'surge_valve', label: 'Surge Relief Valve', defaultType: 'Axial Surge Relief Valve' },
                    { id: 's1_spool_3', role: 'spool', label: 'Discharge Spool', defaultType: 'General Process Equipment' }
                ]
            },
            {
                id: 'stream_2',
                label: 'Stream #2',
                slots: [
                    { id: 's2_spool_1', role: 'spool', label: 'Inlet Spool', defaultType: 'General Process Equipment' },
                    { id: 's2_gate', role: 'gate_valve', label: 'Isolation Gate Valve', defaultType: 'Gate Valve' },
                    { id: 's2_spool_2', role: 'spool', label: 'Intermediate Spool', defaultType: 'General Process Equipment' },
                    { id: 's2_srv', role: 'surge_valve', label: 'Surge Relief Valve', defaultType: 'Axial Surge Relief Valve' },
                    { id: 's2_spool_3', role: 'spool', label: 'Discharge Spool', defaultType: 'General Process Equipment' }
                ]
            },
            {
                id: 'stream_3',
                label: 'Stream #3',
                slots: [
                    { id: 's3_spool_1', role: 'spool', label: 'Inlet Spool', defaultType: 'General Process Equipment' },
                    { id: 's3_gate', role: 'gate_valve', label: 'Isolation Gate Valve', defaultType: 'Gate Valve' },
                    { id: 's3_spool_2', role: 'spool', label: 'Intermediate Spool', defaultType: 'General Process Equipment' },
                    { id: 's3_srv', role: 'surge_valve', label: 'Surge Relief Valve', defaultType: 'Axial Surge Relief Valve' },
                    { id: 's3_spool_3', role: 'spool', label: 'Discharge Spool', defaultType: 'General Process Equipment' }
                ]
            }
        ]
    };
};

// Blank Canvas Specification (clean slate with a single plus button)
export const createBlankSkidSpec = () => {
    return {
        skidType: 'blank',
        streamCount: 0,
        inletHeader: null,
        outletHeader: null,
        streams: []
    };
};

// Choke Manifold Specification Preset
export const createChokeManifoldSkidSpec = () => {
    return {
        skidType: 'choke_manifold',
        streamCount: 1,
        inletHeader: null,
        outletHeader: null,
        streams: [
            {
                id: 'stream_1',
                label: 'Stream #1',
                slots: [
                    {
                        id: 'stream_1_spool_1',
                        role: 'spool',
                        label: 'Spool Piece',
                        defaultType: 'Spool Piece',
                        isRotatable: true,
                        rotation: 0
                    },
                    {
                        id: 'stream_1_cross_1',
                        role: 'cross',
                        label: 'Cross Fitting (4-Way)',
                        defaultType: 'Cross Fitting',
                        isRotatable: false,
                        rotation: 0,
                        branchSlots: [
                            {
                                id: 'stream_1_gate_valve_1',
                                role: 'gate_valve',
                                label: 'Gate Valve',
                                defaultType: 'Gate Valve',
                                isRotatable: true,
                                rotation: 0,
                                portDirection: 'top'
                            },
                            {
                                id: 'stream_1_spool_2',
                                role: 'spool',
                                label: 'Spool Piece',
                                defaultType: 'Spool Piece',
                                isRotatable: true,
                                rotation: 0,
                                portDirection: 'top'
                            },
                            {
                                id: 'stream_1_adj_choke_1',
                                role: 'adjustable_choke',
                                label: 'Adjustable Choke Valve',
                                defaultType: 'Adjustable Choke Valve',
                                isRotatable: true,
                                rotation: 90,
                                portDirection: 'top',
                                branchSlots: [
                                    {
                                        id: 'stream_1_spool_3',
                                        role: 'spool',
                                        label: 'Spool Piece',
                                        defaultType: 'Spool Piece',
                                        isRotatable: true,
                                        rotation: 0,
                                        portDirection: 'left'
                                    }
                                ]
                            },
                            {
                                id: 'stream_1_tee_1',
                                role: 'tee',
                                label: 'Tee Fitting (3-Way)',
                                defaultType: 'Tee Fitting',
                                isRotatable: true,
                                rotation: 180,
                                portDirection: 'bottom',
                                branchSlots: [
                                    {
                                        id: 'stream_1_tee_2',
                                        role: 'tee',
                                        label: 'Tee Fitting (3-Way)',
                                        defaultType: 'Tee Fitting',
                                        isRotatable: true,
                                        rotation: 0,
                                        portDirection: 'bottom'
                                    },
                                    {
                                        id: 'stream_1_tee_3',
                                        role: 'tee',
                                        label: 'Tee Fitting (3-Way)',
                                        defaultType: 'Tee Fitting',
                                        isRotatable: true,
                                        rotation: 180,
                                        portDirection: 'bottom'
                                    },
                                    {
                                        id: 'stream_1_tee_4',
                                        role: 'tee',
                                        label: 'Tee Fitting (3-Way)',
                                        defaultType: 'Tee Fitting',
                                        isRotatable: true,
                                        rotation: 0,
                                        portDirection: 'bottom'
                                    },
                                    {
                                        id: 'stream_1_tee_5',
                                        role: 'tee',
                                        label: 'Tee Fitting (3-Way)',
                                        defaultType: 'Tee Fitting',
                                        isRotatable: true,
                                        rotation: 180,
                                        portDirection: 'bottom',
                                        branchSlots: [
                                            {
                                                id: 'stream_1_pos_choke_1',
                                                role: 'positive_choke',
                                                label: 'Positive Choke Valve',
                                                defaultType: 'Positive Choke Valve',
                                                isRotatable: true,
                                                rotation: 90,
                                                portDirection: 'right',
                                                branchSlots: [
                                                    {
                                                        id: 'stream_1_spool_4',
                                                        role: 'spool',
                                                        label: 'Spool Piece',
                                                        defaultType: 'Spool Piece',
                                                        isRotatable: true,
                                                        rotation: 0,
                                                        portDirection: 'right'
                                                    }
                                                ]
                                            }
                                        ]
                                    },
                                    {
                                        id: 'stream_1_tee_6',
                                        role: 'tee',
                                        label: 'Tee Fitting (3-Way)',
                                        defaultType: 'Tee Fitting',
                                        isRotatable: true,
                                        rotation: 0,
                                        portDirection: 'bottom',
                                        branchSlots: [
                                            {
                                                id: 'stream_1_cross_2',
                                                role: 'cross',
                                                label: 'Cross Fitting (4-Way)',
                                                defaultType: 'Cross Fitting',
                                                isRotatable: false,
                                                rotation: 0,
                                                portDirection: 'bottom',
                                                branchSlots: [
                                                    {
                                                        id: 'stream_1_spool_5',
                                                        role: 'spool',
                                                        label: 'Spool Piece',
                                                        defaultType: 'Spool Piece',
                                                        isRotatable: true,
                                                        rotation: 0,
                                                        portDirection: 'bottom',
                                                        branchSlots: [
                                                            {
                                                                id: 'stream_1_blind_2',
                                                                role: 'blind_flange',
                                                                label: 'Blind Flange',
                                                                defaultType: 'Blind Flange',
                                                                isRotatable: false,
                                                                rotation: 0,
                                                                portDirection: 'bottom'
                                                            }
                                                        ]
                                                    }
                                                ]
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        id: 'stream_1_blind_1',
                        role: 'blind_flange',
                        label: 'Blind Flange',
                        defaultType: 'Blind Flange',
                        isRotatable: false,
                        rotation: 0
                    }
                ]
            }
        ]
    };
};

export const SKID_PRESETS = [
    { id: 'blank', label: 'Blank Canvas', factory: createBlankSkidSpec },
    { id: 'choke_manifold', label: 'Choke Manifold', factory: createChokeManifoldSkidSpec },
    { id: '1_stream_surge_relief', label: 'Single Stream Surge Relief Skid', factory: createSingleStreamSurgeReliefSkidSpec },
    { id: '2_stream_surge_relief', label: '2 Stream Surge Relief Skid', factory: createTwoStreamSurgeReliefSkidSpec },
    { id: '3_stream_surge_relief', label: '3 Stream Surge Relief Skid', factory: createThreeStreamSurgeReliefSkidSpec }
];

export const createDefaultSurgeReliefSkidSpec = createBlankSkidSpec;

export const SkidVisualizer = ({
    skidRecord,
    childComponents = [],
    onRefreshChildren,
    onNavigateToRecord,
    onUpdateSkidSpec
}) => {
    const [localChildren, setLocalChildren] = useState(childComponents);

    useEffect(() => {
        setLocalChildren(childComponents);
    }, [childComponents]);

    const getSkidSpec = useCallback(() => {
        let spec = skidRecord?.treeSpecData || skidRecord?.tree_spec_data;
        if (typeof spec === 'string') {
            try { spec = JSON.parse(spec); } catch (e) { spec = null; }
        }
        if (spec && typeof spec === 'object' && spec.streams && Array.isArray(spec.streams)) {
            return spec;
        }
        return createBlankSkidSpec();
    }, [skidRecord?.treeSpecData, skidRecord?.tree_spec_data]);

    const [skidSpec, setSkidSpec] = useState(getSkidSpec);
    const [isPIDOpen, setIsPIDOpen] = useState(false);

    useEffect(() => {
        const spec = getSkidSpec();
        setSkidSpec(spec);
        console.log(`[SKID STRUCTURE INIT] Loaded topology for skid "${skidRecord?.tagNo || skidRecord?.id || 'New Skid'}":`, {
            skidType: spec?.skidType,
            streamCount: spec?.streams?.length || 0,
            hasInletHeader: !!spec?.inletHeader,
            hasOutletHeader: !!spec?.outletHeader,
            totalSlots: (spec?.streams || []).reduce((acc, s) => acc + (s.slots?.length || 0), 0)
        });
    }, [getSkidSpec]);

    // Handle switching preset configuration
    const handleSelectPreset = (presetId) => {
        if (!presetId) return;
        const preset = SKID_PRESETS.find(p => p.id === presetId);
        if (!preset) return;

        // Check if any child components are currently attached
        const hasAttachedComponents = (localChildren || []).some(c => !!(c.assemblySlot || c.assembly_slot));
        if (hasAttachedComponents) {
            if (!window.confirm('Applying a new preset configuration will reset the topology layout. Any attached component records will remain in inventory but will be unlinked from their previous slots. Do you want to continue?')) {
                return;
            }
        }

        const newSpec = preset.factory();
        console.log(`[SKID BUILD ⚡ PRESET APPLIED] "${preset.label}" (id: ${presetId})`, {
            skidType: newSpec.skidType,
            streamCount: newSpec.streamCount,
            streams: newSpec.streams
        });
        persistSkidSpec(newSpec);
    };

    // Zoom & pan canvas state
    const [zoomLevel, setZoomLevel] = useState(1);
    const [panOffset, setPanOffset] = useState({ x: 0, y: 0 });
    const [isDraggingCanvas, setIsDraggingCanvas] = useState(false);
    const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

    // State for modal
    const [activeSlotModal, setActiveSlotModal] = useState(null); // slot object
    const [modalMode, setModalMode] = useState('create'); // 'create' | 'link'
    const [unassignedValves, setUnassignedValves] = useState([]);
    const [selectedValveToLink, setSelectedValveToLink] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Component creation form in modal
    const [newValveForm, setNewValveForm] = useState({
        tagNo: '',
        serialNumber: '',
        oem: '',
        valveType: 'Gate Valve',
        sizeClass: '',
        mawp: '',
        lastCertDate: '',
        nextCertDate: ''
    });

    // In-canvas slot insertion picker state: { streamId: string, insertIndex: number } | null
    const [insertionTarget, setInsertionTarget] = useState(null);

    // Stream duplication picker state: { selectedStreamId: string } | null
    const [streamToDuplicatePicker, setStreamToDuplicatePicker] = useState(null);

    // Inline slot / component header rename state: { slotId: string, currentLabel: string } | null
    const [editingSlot, setEditingSlot] = useState(null);

    // Debounced Persistence Refs
    const debouncedSaveTimerRef = useRef(null);
    const pendingSpecRef = useRef(null);

    // Cleanup / flush on unmount
    useEffect(() => {
        return () => {
            if (debouncedSaveTimerRef.current) {
                clearTimeout(debouncedSaveTimerRef.current);
                debouncedSaveTimerRef.current = null;
            }
            if (pendingSpecRef.current && skidRecord?.id) {
                storageService.updateTreeSpecData(skidRecord.id, pendingSpecRef.current).catch(err => {
                    console.error('[SkidVisualizer] Unmount save failed:', err);
                });
            }
        };
    }, [skidRecord?.id]);

    const queueDebouncedCloudSave = (spec) => {
        if (!skidRecord?.id) return;
        pendingSpecRef.current = spec;
        if (debouncedSaveTimerRef.current) {
            clearTimeout(debouncedSaveTimerRef.current);
        }
        debouncedSaveTimerRef.current = setTimeout(async () => {
            debouncedSaveTimerRef.current = null;
            const specToSave = pendingSpecRef.current;
            pendingSpecRef.current = null;
            if (specToSave) {
                try {
                    await storageService.updateTreeSpecData(skidRecord.id, specToSave);
                } catch (err) {
                    console.error('[SkidVisualizer] Failed to persist skid spec:', err);
                }
            }
        }, 600);
    };

    const persistSkidSpec = (updatedSpec) => {
        setSkidSpec(updatedSpec);
        if (skidRecord) {
            skidRecord.treeSpecData = updatedSpec;
        }
        if (onUpdateSkidSpec) {
            onUpdateSkidSpec(updatedSpec);
        }
        queueDebouncedCloudSave(updatedSpec);
    };

    const getComponentForSlot = (slotId) => {
        return localChildren.find(c => (c.assemblySlot || c.assembly_slot) === slotId);
    };

    // Zoom Handlers
    const handleZoomIn = () => setZoomLevel(prev => Math.min(2.5, Math.round((prev + 0.15) * 100) / 100));
    const handleZoomOut = () => setZoomLevel(prev => Math.max(0.3, Math.round((prev - 0.15) * 100) / 100));
    const handleResetView = () => {
        setZoomLevel(1);
        setPanOffset({ x: 0, y: 0 });
    };

    // Canvas Mouse Pan Handlers
    const handleMouseDown = (e) => {
        if (e.target.closest('.interactive-control') || e.target.closest('.skid-card') || e.target.closest('button')) {
            return;
        }
        setIsDraggingCanvas(true);
        setDragStart({ x: e.clientX - panOffset.x, y: e.clientY - panOffset.y });
    };

    const handleMouseMove = (e) => {
        if (!isDraggingCanvas) return;
        setPanOffset({
            x: e.clientX - dragStart.x,
            y: e.clientY - dragStart.y
        });
    };

    const handleMouseUp = () => setIsDraggingCanvas(false);

    // Helper to resolve valid equipment category for any slot role/definition
    const resolveValidAssetCategory = (slot) => {
        if (!slot) return 'General Process Equipment';
        const role = slot.role;
        if (role === 'gate_valve') return 'Gate Valve';
        if (role === 'surge_valve') return 'Axial Surge Relief Valve';
        if (role === 'ball_valve') return 'Ball Valve';
        if (role === 'check_valve') return 'Check Valve';
        if (role === 'positive_choke') return 'Positive Choke Valve';
        if (role === 'adjustable_choke') return 'Adjustable Choke Valve';
        if (['spool', 'cross', 'tee', 'elbow', 'reducer', 'blind_flange', 'inlet_header', 'outlet_header'].includes(role)) {
            return 'General Process Equipment';
        }
        if (slot.defaultType && ASSET_CATEGORIES[slot.defaultType]) {
            return slot.defaultType;
        }
        const label = slot.label || slot.defaultType || '';
        if (ASSET_CATEGORIES[label]) {
            return label;
        }
        return 'General Process Equipment';
    };

    // Modal Handlers
    const handleOpenSlotModal = async (slot, mode = 'create') => {
        setActiveSlotModal(slot);
        setModalMode(mode);
        const initialType = resolveValidAssetCategory(slot);
        setNewValveForm({
            tagNo: `${skidRecord?.tagNo || 'SKID'}-${slot.id.toUpperCase()}`,
            serialNumber: '',
            oem: skidRecord?.oem || '',
            valveType: initialType,
            sizeClass: skidRecord?.sizeClass || '',
            mawp: skidRecord?.mawp || '',
            lastCertDate: '',
            nextCertDate: ''
        });

        if (mode === 'link') {
            const allLocal = await storageService.getLocalOnly();
            const unassigned = allLocal.filter(r => {
                const sameCust = !skidRecord?.customer || (r.customer || '').trim().toLowerCase() === (skidRecord.customer || '').trim().toLowerCase();
                const isNotChild = !r.parentId && r.id !== skidRecord?.id;
                return sameCust && isNotChild;
            });
            setUnassignedValves(unassigned);
            if (unassigned.length > 0) {
                setSelectedValveToLink(unassigned[0].id);
            }
        }
    };

    const handleCreateInSlot = async (e) => {
        if (e) {
            e.preventDefault();
            e.stopPropagation();
        }
        console.log('[SKID DEBUG 🔍] handleCreateInSlot triggered:', {
            hasEvent: !!e,
            slotId: activeSlotModal?.id,
            slotLabel: activeSlotModal?.label,
            newValveForm,
            skidRecordId: skidRecord?.id
        });

        setIsSubmitting(true);
        try {
            // If the parent Skid record does not exist in storage yet, persist it first so parentId is valid
            let parentId = skidRecord?.id;
            if (!parentId) {
                parentId = crypto.randomUUID();
                if (skidRecord) skidRecord.id = parentId;
                const parentToSave = {
                    ...skidRecord,
                    id: parentId,
                    valveType: skidRecord?.valveType || 'Process Skid',
                    serialNumber: skidRecord?.serialNumber || skidRecord?.tagNo || `SKID-${Date.now().toString(36)}`,
                    treeSpecData: skidSpec
                };
                console.log('[SKID DEBUG 🔍] Parent Skid ID missing. Auto-persisting parent record:', parentToSave);
                const savedParent = await storageService.save(parentToSave);
                console.log('[SKID DEBUG 🔍] Parent Skid auto-persisted result:', savedParent);
            }

            const customerName = (skidRecord?.customer || '').trim();
            const siteLoc = (skidRecord?.siteLocation || skidRecord?.site_location || '').trim();
            const plant = (skidRecord?.plantArea || skidRecord?.plant_area || '').trim();
            const oemName = (newValveForm.oem || skidRecord?.oem || '').trim();

            const newId = crypto.randomUUID();
            const newRecord = {
                id: newId,
                uniqueId: newId,
                tagNo: newValveForm.tagNo || `${skidRecord?.tagNo || 'SKID'}-${activeSlotModal.id.toUpperCase()}`,
                serialNumber: newValveForm.serialNumber,
                oem: oemName,
                valveType: newValveForm.valveType,
                sizeClass: newValveForm.sizeClass || '',
                mawp: newValveForm.mawp || '',
                lastCertDate: newValveForm.lastCertDate || null,
                nextCertDate: newValveForm.nextCertDate || null,
                customer: customerName,
                siteLocation: siteLoc,
                plantArea: plant,
                parentId: parentId,
                assemblySlot: activeSlotModal.id,
                status: 'In Service'
            };

            console.log('[SKID DEBUG 🔍] Saving new child equipment record:', newRecord);
            const saved = await storageService.save(newRecord);
            console.log('[SKID DEBUG 🔍] Child equipment record save result:', saved);

            if (saved) {
                console.log(`[SKID BUILD + CREATE COMPONENT] Slot: "${activeSlotModal.label || activeSlotModal.id}" ➔ Saved Tag: "${saved.tagNo || saved.tag_no || saved.id}" (${saved.valveType})`);
                setLocalChildren(prev => {
                    const updated = [...prev.filter(c => (c.assemblySlot || c.assembly_slot) !== activeSlotModal.id), saved];
                    console.log('[SKID DEBUG 🔍] Updated localChildren list:', updated);
                    return updated;
                });
                setActiveSlotModal(null);
                if (onRefreshChildren) {
                    try {
                        console.log('[SKID DEBUG 🔍] Calling onRefreshChildren...');
                        await onRefreshChildren();
                        console.log('[SKID DEBUG 🔍] onRefreshChildren completed cleanly.');
                    } catch (refErr) {
                        console.warn('[SKID BUILD] Silent refresh warning:', refErr);
                    }
                }
            }
        } catch (err) {
            console.error('[SKID DEBUG ❌] Failed to create skid component:', err);
            alert('Failed to save component: ' + err.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleLinkValve = async (e) => {
        if (e) {
            e.preventDefault();
            e.stopPropagation();
        }
        if (!selectedValveToLink || !activeSlotModal || !skidRecord?.id) return;
        setIsSubmitting(true);
        try {
            await storageService.attachComponentToTree(skidRecord.id, selectedValveToLink, activeSlotModal.id);
            const linked = unassignedValves.find(v => v.id === selectedValveToLink);
            if (linked) {
                const updatedLinked = { ...linked, parentId: skidRecord.id, assemblySlot: activeSlotModal.id };
                console.log(`[SKID BUILD 🔗 LINK COMPONENT] Slot: "${activeSlotModal.label || activeSlotModal.id}" ➔ Linked equipment tag: "${linked.tagNo || linked.tag_no || linked.id}"`);
                setLocalChildren(prev => [...prev.filter(c => (c.assemblySlot || c.assembly_slot) !== activeSlotModal.id), updatedLinked]);
            }
            setActiveSlotModal(null);
            if (onRefreshChildren) await onRefreshChildren();
        } catch (err) {
            console.error('Failed to link component to skid:', err);
            alert('Failed to link component: ' + err.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDetachValve = async (componentId) => {
        if (!window.confirm('Are you sure you want to detach this component from the Process Skid? (The equipment record will remain in inventory)')) {
            return;
        }
        try {
            const detachedComp = localChildren.find(c => c.id === componentId);
            await storageService.detachComponentFromTree(componentId);
            console.log(`[SKID BUILD 🔗 UNLINK COMPONENT] Detached equipment tag: "${detachedComp?.tagNo || detachedComp?.tag_no || componentId}" from slot "${detachedComp?.assemblySlot || detachedComp?.assembly_slot || 'unknown'}"`);
            setLocalChildren(prev => prev.filter(c => c.id !== componentId));
            if (onRefreshChildren) await onRefreshChildren();
        } catch (err) {
            console.error('Failed to detach component:', err);
            alert('Failed to detach component: ' + err.message);
        }
    };

    // Helper: Renumber streams sequentially
    const renumberStreams = (streams) => {
        return streams.map((s, idx) => ({
            ...s,
            label: `Stream #${idx + 1}`
        }));
    };

    // Duplicate an existing stream by ID
    const cloneSlotWithBranches = (slot, streamIndex) => {
        const timestamp = Date.now().toString(36);
        const randomSuffix = Math.random().toString(36).substring(2, 6);
        const newId = `s${streamIndex}_${slot.role || 'slot'}_${timestamp}_${randomSuffix}`;

        const cloned = {
            id: newId,
            role: slot.role,
            label: slot.label,
            defaultType: slot.defaultType,
            isRotatable: slot.isRotatable,
            rotation: slot.rotation || 0
        };

        if (slot.portDirection) {
            cloned.portDirection = slot.portDirection;
        }

        if (slot.branchSlots && Array.isArray(slot.branchSlots)) {
            cloned.branchSlots = slot.branchSlots.map(bSlot => cloneSlotWithBranches(bSlot, streamIndex));
        } else if (slot.role === 'tee' || slot.role === 'cross') {
            cloned.branchSlots = [];
        }

        return cloned;
    };

    const duplicateStream = (sourceStreamId) => {
        const currentStreams = skidSpec.streams || [];
        const sourceStream = currentStreams.find(s => s.id === sourceStreamId) || currentStreams[0];
        const nextIndex = currentStreams.length + 1;
        const newStreamId = `stream_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`;

        // Deep-clone slot definitions with fresh IDs including all branchSlots
        const clonedSlots = (sourceStream ? sourceStream.slots : []).map(slot => cloneSlotWithBranches(slot, nextIndex));

        const newStream = {
            id: newStreamId,
            label: `Stream #${nextIndex}`,
            slots: clonedSlots
        };

        const updatedStreams = renumberStreams([...currentStreams, newStream]);
        const updated = {
            ...skidSpec,
            streamCount: updatedStreams.length,
            streams: updatedStreams
        };
        console.log(`[SKID BUILD 🔀 DUPLICATE STREAM] Source: "${sourceStream?.label || sourceStreamId}" ➔ Created: "${newStream.label}" (${clonedSlots.length} cloned slots)`, {
            newStreamId,
            clonedSlots
        });
        persistSkidSpec(updated);
        setStreamToDuplicatePicker(null);
    };

    // Skid Topology Modifications: Add / Duplicate Process Stream
    const handleAddProcessStreamClick = () => {
        const currentStreams = skidSpec.streams || [];
        if (currentStreams.length === 0) {
            // No stream exists: add a blank stream
            handleAddEmptyPortStream();
        } else if (currentStreams.length === 1) {
            // Exactly 1 stream: duplicate it directly
            duplicateStream(currentStreams[0].id);
        } else {
            // More than 1 stream: prompt user to choose which stream to copy
            setStreamToDuplicatePicker({
                selectedStreamId: currentStreams[0].id
            });
        }
    };

    // Add Empty Port Stream (for header manifold button: adds additional stream with only (+) button)
    const handleAddEmptyPortStream = () => {
        const currentStreams = skidSpec.streams || [];
        const nextIndex = currentStreams.length + 1;
        const newStreamId = `stream_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`;

        const newStream = {
            id: newStreamId,
            label: `Stream #${nextIndex}`,
            slots: [] // Blank canvas stream with only (+) button
        };

        const updatedStreams = renumberStreams([...currentStreams, newStream]);
        const updated = {
            ...skidSpec,
            streamCount: updatedStreams.length,
            streams: updatedStreams
        };
        console.log(`[SKID BUILD 🔀 ADD STREAM] Added empty process stream ➔ "${newStream.label}" (id: ${newStreamId})`);
        persistSkidSpec(updated);
    };

    // Remove Stream with Renumbering
    const handleRemoveStream = (streamId) => {
        const stream = (skidSpec.streams || []).find(s => s.id === streamId);
        if (!stream) return;

        // An inlet header or outlet header requires a minimum of two connections / streams
        if ((skidSpec.inletHeader || skidSpec.outletHeader) && (skidSpec.streams || []).length <= 2) {
            alert('An inlet header and an outlet header require a minimum of 2 connected streams. To reduce further, remove the manifold header first or use a single stream pre-set.');
            return;
        }

        // Check if any slot has an attached component
        const hasAttached = stream.slots.some(slot => getComponentForSlot(slot.id));
        if (hasAttached) {
            alert('Cannot remove stream while components are attached to it. Please detach the components first.');
            return;
        }

        if (!window.confirm(`Are you sure you want to remove ${stream.label}?`)) return;

        const remainingStreams = skidSpec.streams.filter(s => s.id !== streamId);
        const updatedStreams = renumberStreams(remainingStreams);
        const updated = {
            ...skidSpec,
            streamCount: updatedStreams.length,
            streams: updatedStreams
        };
        console.log(`[SKID BUILD - REMOVE STREAM] Removed "${stream.label}" (id: ${streamId})`);
        persistSkidSpec(updated);
    };

    // Insert slot into stream or establish vertical manifold headers
    const handleInsertSlot = (streamId, index, equipmentType, customLabel) => {
        // Special case: Inlet Header & Outlet Header are vertical manifolds that connect to parallel streams (minimum 2 connections)
        if (equipmentType === 'Inlet Header') {
            let currentStreams = [...(skidSpec.streams || [])];
            // Ensure minimum of two connections / streams
            while (currentStreams.length < 2) {
                const nextIdx = currentStreams.length + 1;
                currentStreams.push({
                    id: `stream_${nextIdx}`,
                    label: `Stream #${nextIdx}`,
                    slots: []
                });
            }
            const updated = {
                ...skidSpec,
                inletHeader: {
                    id: 'inlet_header',
                    role: 'inlet_header',
                    label: customLabel || 'Inlet Header',
                    defaultType: 'General Process Equipment'
                },
                streamCount: currentStreams.length,
                streams: currentStreams
            };
            console.log(`[SKID BUILD + ADD MANIFOLD HEADER] Added Inlet Header ➔ "${customLabel || 'Inlet Header'}"`);
            persistSkidSpec(updated);
            setInsertionTarget(null);
            return;
        }

        if (equipmentType === 'Outlet Header') {
            let currentStreams = [...(skidSpec.streams || [])];
            // Ensure minimum of two connections / streams
            while (currentStreams.length < 2) {
                const nextIdx = currentStreams.length + 1;
                currentStreams.push({
                    id: `stream_${nextIdx}`,
                    label: `Stream #${nextIdx}`,
                    slots: []
                });
            }
            const updated = {
                ...skidSpec,
                outletHeader: {
                    id: 'outlet_header',
                    role: 'outlet_header',
                    label: customLabel || 'Outlet Header',
                    defaultType: 'General Process Equipment'
                },
                streamCount: currentStreams.length,
                streams: currentStreams
            };
            console.log(`[SKID BUILD + ADD MANIFOLD HEADER] Added Outlet Header ➔ "${customLabel || 'Outlet Header'}"`);
            persistSkidSpec(updated);
            setInsertionTarget(null);
            return;
        }

        let currentStreams = [...(skidSpec.streams || [])];
        let streamIdx = currentStreams.findIndex(s => s.id === streamId);

        // If canvas is blank or stream doesn't exist yet, initialize stream_1
        if (streamIdx === -1) {
            const initialStreamId = streamId || 'stream_1';
            const newStream = {
                id: initialStreamId,
                label: 'Stream #1',
                slots: []
            };
            currentStreams.push(newStream);
            streamIdx = currentStreams.length - 1;
        }

        const effectiveStreamId = currentStreams[streamIdx].id;
        const timestamp = Date.now().toString(36);
        let role = 'valve';
        let defaultType = equipmentType;
        let isRotatable = false;
        let rotation = 0;

        if (equipmentType === 'Gate Valve') role = 'gate_valve';
        else if (equipmentType === 'Axial Surge Relief Valve') role = 'surge_valve';
        else if (equipmentType === 'Ball Valve') role = 'ball_valve';
        else if (equipmentType === 'Check Valve') role = 'check_valve';
        else if (equipmentType === 'Positive Choke Valve') {
            role = 'positive_choke';
            defaultType = 'Positive Choke Valve';
            isRotatable = true;
            rotation = 0;
        } else if (equipmentType === 'Adjustable Choke Valve') {
            role = 'adjustable_choke';
            defaultType = 'Adjustable Choke Valve';
            isRotatable = true;
            rotation = 0;
        } else if (equipmentType === 'Cross') {
            role = 'cross';
            defaultType = 'General Process Equipment';
            isRotatable = false;
            rotation = 0;
        } else if (equipmentType === 'Tee') {
            role = 'tee';
            defaultType = 'General Process Equipment';
            isRotatable = true;
        } else if (equipmentType === 'Blind Flange') {
            role = 'blind_flange';
            defaultType = 'General Process Equipment';
            isRotatable = false;
        } else if (equipmentType === 'Concentric Reducer') {
            role = 'reducer';
            defaultType = 'General Process Equipment';
            isRotatable = false;
        } else if (equipmentType === 'Elbow' || equipmentType === '90° Elbow') {
            role = 'elbow';
            defaultType = 'General Process Equipment';
            isRotatable = true;
            rotation = 0;
        } else if (equipmentType === 'Spool Piece' || equipmentType === 'General Process Equipment') {
            role = 'spool';
            defaultType = 'General Process Equipment';
        } else if (equipmentType.includes('Pressure Relief') || equipmentType.includes('Safety') || equipmentType.includes('PSV') || equipmentType.includes('PRV')) {
            role = 'safety_valve';
            defaultType = equipmentType;
            isRotatable = true;
            rotation = 0;
        } else {
            // General valve types from database (Globe Control, Butterfly, Plug, etc.)
            role = 'valve';
            defaultType = equipmentType;
            if (equipmentType.toLowerCase().includes('safety') || equipmentType.toLowerCase().includes('relief') || equipmentType.toLowerCase().includes('psv')) {
                isRotatable = true;
            }
        }

        let slotLabel = customLabel || equipmentType;
        if (role === 'blind_flange') {
            slotLabel = 'Blind Flange';
        } else if (role === 'elbow') {
            slotLabel = '90° Elbow';
        } else if (role === 'positive_choke') {
            slotLabel = 'Positive Choke Valve';
        } else if (role === 'adjustable_choke') {
            slotLabel = 'Adjustable Choke Valve';
        } else if (role === 'reducer') {
            slotLabel = 'Concentric Reducer';
        }

        const newSlot = {
            id: `${effectiveStreamId}_${role}_${timestamp}`,
            role,
            label: slotLabel,
            defaultType,
            isRotatable,
            rotation,
            // Tee and Cross fittings carry their perpendicular branch slots here
            branchSlots: (role === 'tee' || role === 'cross') ? [] : undefined
        };

        // If this is a branch insert (into a tee's perpendicular port), route to branch handler
        if (insertionTarget?.isBranch && insertionTarget?.teeSlotId) {
            handleInsertTeeBranchSlot(insertionTarget.streamId, insertionTarget.teeSlotId, newSlot);
            return;
        }

        const targetSlots = [...currentStreams[streamIdx].slots];
        const insertAt = typeof index === 'number' && index >= 0 ? index : targetSlots.length;
        targetSlots.splice(insertAt, 0, newSlot);
        currentStreams[streamIdx] = {
            ...currentStreams[streamIdx],
            slots: targetSlots
        };

        const updated = {
            ...skidSpec,
            streamCount: currentStreams.length,
            streams: currentStreams
        };
        console.log(`[SKID BUILD + ADD SLOT] Stream: "${currentStreams[streamIdx].label}" ➔ Added "${newSlot.label}" (role: ${newSlot.role}, id: ${newSlot.id}) at index ${insertAt}`, {
            streamId: effectiveStreamId,
            slot: newSlot,
            insertAt
        });
        persistSkidSpec(updated);
        setInsertionTarget(null);
    };

    // Insert a slot into a tee/cross/elbow's perpendicular or horizontal branch (at any depth)
    const handleInsertTeeBranchSlot = (streamId, teeSlotId, newBranchSlot) => {
        const currentStreams = [...(skidSpec.streams || [])];
        const sIdx = currentStreams.findIndex(s => s.id === streamId);
        if (sIdx === -1) return;

        const portDir = insertionTarget?.portDirection || newBranchSlot.portDirection || 'bottom';
        newBranchSlot.portDirection = portDir;

        // Auto-orient rotatable components so their incoming port connects to parent flow direction
        const role = newBranchSlot.role;
        if (role === 'elbow' || role === 'positive_choke' || role === 'adjustable_choke') {
            if (portDir === 'top') newBranchSlot.rotation = 90;       // incoming from bottom
            else if (portDir === 'bottom') newBranchSlot.rotation = 0;  // incoming from top
            else if (portDir === 'left') newBranchSlot.rotation = 0;    // incoming from right
            else if (portDir === 'right') newBranchSlot.rotation = 180; // incoming from left
        } else if (role === 'tee') {
            if (portDir === 'left') newBranchSlot.rotation = 90;
            else if (portDir === 'right') newBranchSlot.rotation = 0;
            else if (portDir === 'top' || portDir === 'bottom') newBranchSlot.rotation = 0;
        }

        const insertInSlots = (slotList) => {
            return (slotList || []).map(slot => {
                let updatedSlot = { ...slot };
                if (slot.id === teeSlotId) {
                    const existing = slot.branchSlots || [];
                    let updatedBranchSlots = [...existing];

                    let targetIdx;
                    if (typeof insertionTarget?.branchInsertIndex === 'number') {
                        const relIdx = insertionTarget.branchInsertIndex;
                        const directionalNonBlindIndices = [];
                        existing.forEach((b, idx) => {
                            const bDir = b.portDirection || portDir;
                            if (bDir === portDir && b.role !== 'blind_flange') {
                                directionalNonBlindIndices.push(idx);
                            }
                        });

                        if (directionalNonBlindIndices.length > 0) {
                            if (relIdx < directionalNonBlindIndices.length) {
                                targetIdx = directionalNonBlindIndices[relIdx];
                            } else {
                                targetIdx = directionalNonBlindIndices[directionalNonBlindIndices.length - 1] + 1;
                            }
                        } else {
                            const blindForDirIdx = existing.findIndex(b => (b.portDirection || portDir) === portDir && b.role === 'blind_flange');
                            targetIdx = blindForDirIdx !== -1 ? blindForDirIdx : existing.length;
                        }
                    } else {
                        const blindForDirIdx = existing.findIndex(b => (b.portDirection || portDir) === portDir && b.role === 'blind_flange');
                        targetIdx = blindForDirIdx !== -1 ? blindForDirIdx : existing.length;
                    }

                    updatedBranchSlots.splice(targetIdx, 0, newBranchSlot);
                    updatedSlot.branchSlots = updatedBranchSlots;
                } else if (updatedSlot.branchSlots && updatedSlot.branchSlots.length > 0) {
                    updatedSlot.branchSlots = insertInSlots(updatedSlot.branchSlots);
                }
                return updatedSlot;
            });
        };

        const updatedSlots = insertInSlots(currentStreams[sIdx].slots);

        console.log(`[SKID BUILD + ADD BRANCH] Stream: "${streamId}", Target Slot: "${teeSlotId}" ➔ Added branch slot "${newBranchSlot.label}" (id: ${newBranchSlot.id})`, {
            streamId,
            teeSlotId,
            newBranchSlot
        });

        currentStreams[sIdx] = { ...currentStreams[sIdx], slots: updatedSlots };
        persistSkidSpec({ ...skidSpec, streams: currentStreams });
        setInsertionTarget(null);
    };

    // Remove a slot from a tee/cross/elbow's perpendicular or horizontal branch (at any depth)
    const handleRemoveTeeBranchSlot = (streamId, teeSlotId, branchSlotId) => {
        const comp = getComponentForSlot(branchSlotId);
        if (comp) {
            alert('Please detach the equipment record from this slot before removing it.');
            return;
        }
        if (!window.confirm('Remove this branch component?')) return;

        const currentStreams = [...(skidSpec.streams || [])];
        const sIdx = currentStreams.findIndex(s => s.id === streamId);
        if (sIdx === -1) return;

        const removeFromSlots = (slotList) => {
            return (slotList || []).map(slot => {
                let updatedSlot = { ...slot };
                if (updatedSlot.branchSlots && updatedSlot.branchSlots.length > 0) {
                    updatedSlot.branchSlots = updatedSlot.branchSlots.filter(b => b.id !== branchSlotId);
                    updatedSlot.branchSlots = removeFromSlots(updatedSlot.branchSlots);
                }
                return updatedSlot;
            });
        };

        const updatedSlots = removeFromSlots(currentStreams[sIdx].slots);

        console.log(`[SKID BUILD - REMOVE BRANCH] Stream: "${streamId}", Target Slot: "${teeSlotId}" ➔ Removed branch slot id "${branchSlotId}"`);

        currentStreams[sIdx] = { ...currentStreams[sIdx], slots: updatedSlots };
        persistSkidSpec({ ...skidSpec, streams: currentStreams });
    };

    // Rotate Tee, Cross, Elbow or any rotatable slot (top-level or branch)
    const handleRotateSlot = (streamId, slotId) => {
        const currentStreams = [...(skidSpec.streams || [])];
        const sIdx = currentStreams.findIndex(s => s.id === streamId);
        if (sIdx === -1) return;

        let targetSlotLabel = slotId;
        let newAngle = 0;

        const rotateInSlots = (slotList) => {
            return (slotList || []).map(slot => {
                let updatedSlot = { ...slot };
                if (slot.id === slotId) {
                    const isSafety = slot.role === 'safety_valve' || slot.defaultType?.toLowerCase().includes('safety') || slot.defaultType?.toLowerCase().includes('relief') || slot.defaultType?.toLowerCase().includes('psv');
                    if (isSafety) {
                        // Binary toggle for Pressure Relief Valves: Left <-> Right
                        const currentSide = slot.outletSide || (slot.rotation === 180 ? 'right' : 'left');
                        const nextSide = currentSide === 'left' ? 'right' : 'left';
                        updatedSlot.outletSide = nextSide;
                        updatedSlot.rotation = nextSide === 'right' ? 180 : 0;
                        targetSlotLabel = slot.label || slot.id;
                        newAngle = updatedSlot.rotation;
                    } else {
                        const nextRot = ((slot.rotation || 0) + 90) % 360;
                        targetSlotLabel = slot.label || slot.id;
                        newAngle = nextRot;
                        updatedSlot.rotation = nextRot;
                    }
                }
                if (updatedSlot.branchSlots && updatedSlot.branchSlots.length > 0) {
                    updatedSlot.branchSlots = rotateInSlots(updatedSlot.branchSlots);
                }
                return updatedSlot;
            });
        };

        const slots = rotateInSlots(currentStreams[sIdx].slots);

        console.log(`[SKID BUILD ↻ ROTATE SLOT] Stream: "${currentStreams[sIdx].label}" ➔ Slot "${targetSlotLabel}" (id: ${slotId}) rotated to ${newAngle}°`);

        currentStreams[sIdx] = { ...currentStreams[sIdx], slots };
        persistSkidSpec({ ...skidSpec, streams: currentStreams });
    };

    // Remove single slot from stream
    const handleRemoveSlot = (streamId, slotId) => {
        const comp = getComponentForSlot(slotId);
        if (comp) {
            alert('Please detach the equipment record from this slot before removing the slot.');
            return;
        }
        const currentStreams = [...(skidSpec.streams || [])];
        const sIdx = currentStreams.findIndex(s => s.id === streamId);
        if (sIdx === -1) return;

        const targetSlot = currentStreams[sIdx].slots.find(s => s.id === slotId);
        const slotName = targetSlot?.label || 'this slot';
        if (!window.confirm(`Are you sure you want to remove "${slotName}" from the skid assembly?`)) {
            return;
        }

        console.log(`[SKID BUILD - REMOVE SLOT] Stream: "${currentStreams[sIdx].label}" ➔ Removed "${slotName}" (id: ${slotId})`);

        const updatedSlots = currentStreams[sIdx].slots.filter(s => s.id !== slotId);
        currentStreams[sIdx] = { ...currentStreams[sIdx], slots: updatedSlots };
        persistSkidSpec({ ...skidSpec, streams: currentStreams });
    };

    // Remove vertical manifold header (inlet or outlet)
    const handleRemoveHeader = (headerType) => {
        const isHeaderInlet = headerType === 'inlet';
        const headerObj = isHeaderInlet ? skidSpec.inletHeader : skidSpec.outletHeader;
        if (!headerObj) return;

        const comp = getComponentForSlot(headerObj.id);
        if (comp) {
            alert('Please detach the equipment record from this header before removing it.');
            return;
        }

        const label = headerObj.label || (isHeaderInlet ? 'Inlet Header' : 'Outlet Header');
        if (!window.confirm(`Are you sure you want to remove the ${label}?`)) {
            return;
        }

        console.log(`[SKID BUILD - REMOVE HEADER] Removed ${label} (${headerType})`);

        const updated = {
            ...skidSpec,
            [isHeaderInlet ? 'inletHeader' : 'outletHeader']: null
        };
        persistSkidSpec(updated);
    };

    // Rename slot or manifold header label and persist to database
    const handleRenameSlot = (slotId, newLabel, headerType = null) => {
        const trimmed = (newLabel || '').trim();
        if (!trimmed) return;

        console.log(`[SKID BUILD ✏️ RENAME SLOT] Slot/Header "${slotId}" renamed ➔ "${trimmed}"`);

        if (headerType === 'inlet' || slotId === 'inlet_header') {
            const updated = {
                ...skidSpec,
                inletHeader: {
                    ...(skidSpec.inletHeader || { id: 'inlet_header', role: 'inlet_header', defaultType: 'General Process Equipment' }),
                    label: trimmed
                }
            };
            persistSkidSpec(updated);
            return;
        }

        if (headerType === 'outlet' || slotId === 'outlet_header') {
            const updated = {
                ...skidSpec,
                outletHeader: {
                    ...(skidSpec.outletHeader || { id: 'outlet_header', role: 'outlet_header', defaultType: 'General Process Equipment' }),
                    label: trimmed
                }
            };
            persistSkidSpec(updated);
            return;
        }

        // Stream slot
        const currentStreams = [...(skidSpec.streams || [])];
        let found = false;
        for (let sIdx = 0; sIdx < currentStreams.length; sIdx++) {
            const stream = currentStreams[sIdx];
            const slotIndex = stream.slots.findIndex(s => s.id === slotId);
            if (slotIndex !== -1) {
                const updatedSlots = [...stream.slots];
                updatedSlots[slotIndex] = {
                    ...updatedSlots[slotIndex],
                    label: trimmed
                };
                currentStreams[sIdx] = {
                    ...stream,
                    slots: updatedSlots
                };
                found = true;
                break;
            }
        }

        if (found) {
            persistSkidSpec({
                ...skidSpec,
                streams: currentStreams
            });
        }
    };

    const handleCommitSlotRename = () => {
        if (!editingSlot) return;
        handleRenameSlot(editingSlot.slotId, editingSlot.currentLabel, editingSlot.headerType);
        setEditingSlot(null);
    };

    // Render individual slot card
    const renderSlotCard = (slot, streamId = null) => {
        const comp = getComponentForSlot(slot.id);
        const hasComp = !!comp;
        const isHeader = slot.role === 'inlet_header' || slot.role === 'outlet_header';
        const isSpool = slot.role === 'spool' || isHeader;
        const isSurge = slot.role === 'surge_valve' || (comp && comp.valveType === 'Axial Surge Relief Valve');
        const isCross = slot.role === 'cross';
        const isTee = slot.role === 'tee';
        const isBlindFlange = slot.role === 'blind_flange';
        const isReducer = slot.role === 'reducer';
        const isElbow = slot.role === 'elbow';
        const isChoke = slot.role === 'positive_choke' || slot.role === 'adjustable_choke' || (comp && (comp.valveType === 'Positive Choke Valve' || comp.valveType === 'Adjustable Choke Valve')) || slot.defaultType === 'Positive Choke Valve' || slot.defaultType === 'Adjustable Choke Valve';
        const isSafety = slot.role === 'safety_valve' || (comp && (comp.valveType?.toLowerCase().includes('safety') || comp.valveType?.toLowerCase().includes('relief') || comp.valveType?.toLowerCase().includes('psv'))) || slot.defaultType?.toLowerCase().includes('safety') || slot.defaultType?.toLowerCase().includes('relief') || slot.defaultType?.toLowerCase().includes('psv');
        const isRotatable = (slot.isRotatable || isTee || isElbow || isChoke || isSafety) && !isCross;

        let badgeBg = '#f1f5f9';
        let badgeColor = '#475569';
        // Clean SVG icons instead of emojis
        let badgeIcon = (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="3" />
                <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
            </svg>
        );

        if (isHeader) {
            badgeBg = '#e0e7ff';
            badgeColor = '#3730a3';
            badgeIcon = (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="3" width="18" height="18" rx="2" />
                    <path d="M3 9h18M9 21V9" />
                </svg>
            );
        } else if (isSafety) {
            badgeBg = '#fee2e2';
            badgeColor = '#b91c1c';
            badgeIcon = (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ transform: `rotate(${slot.rotation || 0}deg)` }}>
                    {/* Bottom inlet triangle */}
                    <polygon points="8 20 16 20 12 14" fill="currentColor" opacity="0.8" />
                    {/* Side outlet triangle (left vs right) */}
                    <polygon points="12 14 6 9 6 19" fill="currentColor" />
                    {/* Top stem */}
                    <line x1="12" y1="14" x2="12" y2="3" strokeWidth="2" />
                    <line x1="8" y1="6" x2="16" y2="4" strokeWidth="2" />
                    <line x1="8" y1="9" x2="16" y2="7" strokeWidth="2" />
                </svg>
            );
        } else if (isSurge) {
            badgeBg = '#fee2e2';
            badgeColor = '#991b1b';
            badgeIcon = (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                </svg>
            );
        } else if (isChoke) {
            badgeBg = '#dbeafe';
            badgeColor = '#1e40af';
            badgeIcon = (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ transform: `rotate(${slot.rotation || 0}deg)` }}>
                    <path d="M12 4v4a8 8 0 0 0 8 8h4" strokeWidth="2.5" />
                    <polygon points="7 4 17 4 12 10 7 4" fill="currentColor" />
                    <circle cx="12" cy="4" r="2" fill="currentColor" />
                    <circle cx="20" cy="16" r="2" fill="currentColor" />
                </svg>
            );
        } else if (isCross) {
            badgeBg = '#e0f2fe';
            badgeColor = '#0369a1';
            badgeIcon = (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" style={{ transform: `rotate(${slot.rotation || 0}deg)` }}>
                    <line x1="12" y1="2" x2="12" y2="22" />
                    <line x1="2" y1="12" x2="22" y2="12" />
                    <circle cx="12" cy="12" r="3" fill="currentColor" />
                </svg>
            );
        } else if (isTee) {
            badgeBg = '#e0f2fe';
            badgeColor = '#0369a1';
            badgeIcon = (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" style={{ transform: `rotate(${slot.rotation || 0}deg)` }}>
                    <line x1="12" y1="2" x2="12" y2="22" />
                    <line x1="12" y1="12" x2="22" y2="12" />
                    <circle cx="12" cy="12" r="3" fill="currentColor" />
                </svg>
            );
        } else if (isElbow) {
            badgeBg = '#e0f2fe';
            badgeColor = '#0284c7';
            badgeIcon = (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ transform: `rotate(${slot.rotation || 0}deg)` }}>
                    <path d="M12 4v4a8 8 0 0 0 8 8h4" />
                    <circle cx="12" cy="4" r="2.5" fill="currentColor" />
                    <circle cx="20" cy="16" r="2.5" fill="currentColor" />
                </svg>
            );
        } else if (isReducer) {
            badgeBg = '#f3f4f6';
            badgeColor = '#475569';
            badgeIcon = (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="4 5 20 8 20 16 4 19 4 5" />
                    <line x1="4" y1="5" x2="4" y2="19" />
                    <line x1="20" y1="8" x2="20" y2="16" />
                </svg>
            );
        } else if (isBlindFlange) {
            badgeBg = '#fef2f2';
            badgeColor = '#b91c1c';
            badgeIcon = (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="8" />
                    <line x1="12" y1="4" x2="12" y2="20" strokeWidth="3" />
                    <line x1="8" y1="8" x2="8.01" y2="8" strokeWidth="2" />
                    <line x1="16" y1="8" x2="16.01" y2="8" strokeWidth="2" />
                    <line x1="8" y1="16" x2="8.01" y2="16" strokeWidth="2" />
                    <line x1="16" y1="16" x2="16.01" y2="16" strokeWidth="2" />
                </svg>
            );
        } else if (isSpool) {
            badgeBg = '#f3f4f6';
            badgeColor = '#4b5563';
            badgeIcon = (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 6h16M4 18h16M4 6v12M20 6v12M9 6v12M15 6v12" />
                </svg>
            );
        } else {
            badgeBg = '#dbeafe';
            badgeColor = '#1e40af';
            badgeIcon = (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="3 4 21 20 21 4 3 20 3 4" />
                    <line x1="12" y1="12" x2="12" y2="3" />
                </svg>
            );
        }

        return (
            <div
                key={slot.id}
                className="skid-card"
                style={{
                    width: '185px',
                    minHeight: '120px',
                    background: hasComp ? '#ffffff' : '#f8fafc',
                    border: hasComp ? '2px solid #2563eb' : '2px dashed #cbd5e1',
                    borderRadius: '8px',
                    padding: '0.6rem',
                    boxShadow: hasComp ? '0 4px 6px -1px rgba(37, 99, 235, 0.1), 0 2px 4px -2px rgba(0,0,0,0.05)' : 'none',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    position: 'relative',
                    transition: 'all 0.15s ease',
                    boxSizing: 'border-box'
                }}
            >
                <div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.25rem', marginBottom: '0.35rem' }}>
                        {editingSlot && editingSlot.slotId === slot.id && !isBlindFlange ? (
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.2rem', width: '100%' }}>
                                <input
                                    type="text"
                                    autoFocus
                                    value={editingSlot.currentLabel}
                                    onChange={(e) => setEditingSlot({ ...editingSlot, currentLabel: e.target.value })}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter') handleCommitSlotRename();
                                        if (e.key === 'Escape') setEditingSlot(null);
                                    }}
                                    onBlur={handleCommitSlotRename}
                                    style={{
                                        fontSize: '0.72rem',
                                        fontWeight: 700,
                                        padding: '1px 4px',
                                        borderRadius: '3px',
                                        border: '1px solid #2563eb',
                                        color: '#1e40af',
                                        background: '#ffffff',
                                        width: '100%',
                                        outline: 'none',
                                        boxSizing: 'border-box'
                                    }}
                                />
                                <button
                                    type="button"
                                    onMouseDown={(e) => e.preventDefault()}
                                    onClick={handleCommitSlotRename}
                                    title="Save name"
                                    style={{
                                        border: 'none',
                                        background: '#2563eb',
                                        color: '#ffffff',
                                        borderRadius: '3px',
                                        padding: '1px 4px',
                                        fontSize: '0.68rem',
                                        cursor: 'pointer',
                                        lineHeight: 1.1
                                    }}
                                >
                                    ✓
                                </button>
                                <button
                                    type="button"
                                    onMouseDown={(e) => e.preventDefault()}
                                    onClick={() => setEditingSlot(null)}
                                    title="Cancel"
                                    style={{
                                        border: 'none',
                                        background: '#94a3b8',
                                        color: '#ffffff',
                                        borderRadius: '3px',
                                        padding: '1px 4px',
                                        fontSize: '0.68rem',
                                        cursor: 'pointer',
                                        lineHeight: 1.1
                                    }}
                                >
                                    ✕
                                </button>
                            </div>
                        ) : (
                            <>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', overflow: 'hidden', flex: 1, minWidth: 0 }}>
                                    <span style={{ display: 'inline-flex', alignItems: 'center', color: badgeColor, flexShrink: 0 }}>
                                        {badgeIcon}
                                    </span>
                                    <span
                                        style={{
                                            fontSize: '0.72rem',
                                            fontWeight: 700,
                                            color: badgeColor,
                                            textTransform: 'uppercase',
                                            letterSpacing: '0.02em',
                                            whiteSpace: 'nowrap',
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',
                                            cursor: isBlindFlange ? 'default' : 'pointer'
                                        }}
                                        title={isBlindFlange ? 'Blind Flange' : `${slot.label} (Click to rename)`}
                                        onClick={isBlindFlange ? undefined : () => setEditingSlot({
                                            slotId: slot.id,
                                            currentLabel: slot.label,
                                            headerType: isHeader ? (slot.role === 'inlet_header' ? 'inlet' : 'outlet') : null
                                        })}
                                    >
                                        {isBlindFlange ? 'Blind Flange' : slot.label}
                                    </span>
                                    {!isBlindFlange && (
                                    <button
                                        type="button"
                                        onClick={() => setEditingSlot({
                                            slotId: slot.id,
                                            currentLabel: slot.label,
                                            headerType: isHeader ? (slot.role === 'inlet_header' ? 'inlet' : 'outlet') : null
                                        })}
                                        title={`Rename ${slot.label}`}
                                        style={{
                                            border: 'none',
                                            background: 'transparent',
                                            color: '#94a3b8',
                                            cursor: 'pointer',
                                            padding: '0 2px',
                                            fontSize: '0.72rem',
                                            lineHeight: 1,
                                            display: 'inline-flex',
                                            alignItems: 'center',
                                            opacity: 0.8
                                        }}
                                        onMouseEnter={(e) => e.currentTarget.style.color = '#2563eb'}
                                        onMouseLeave={(e) => e.currentTarget.style.color = '#94a3b8'}
                                    >
                                        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M12 20h9" />
                                            <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
                                        </svg>
                                    </button>
                                    )}
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', flexShrink: 0 }}>
                                    {isRotatable && (
                                        <span style={{ fontSize: '0.68rem', color: '#64748b', background: '#e2e8f0', padding: '1px 4px', borderRadius: '3px' }}>
                                            {slot.rotation || 0}°
                                        </span>
                                    )}
                                    {(streamId || slot._parentTeeId) && (
                                        <button
                                            type="button"
                                            onClick={() => slot._parentTeeId
                                                ? handleRemoveTeeBranchSlot(slot._branchStreamId, slot._parentTeeId, slot.id)
                                                : handleRemoveSlot(streamId, slot.id)
                                            }
                                            title={`Delete slot ${slot.label}`}
                                            style={{
                                                border: '1px solid #fecaca',
                                                background: '#fff5f5',
                                                color: '#ef4444',
                                                borderRadius: '3px',
                                                cursor: 'pointer',
                                                fontSize: '0.72rem',
                                                padding: '1px 5px',
                                                lineHeight: 1.1,
                                                fontWeight: 700
                                            }}
                                        >
                                            ✕
                                        </button>
                                    )}
                                </div>
                            </>
                        )}
                    </div>

                    {hasComp ? (
                        <div style={{ marginTop: '0.15rem' }}>
                            <div
                                onClick={() => onNavigateToRecord && onNavigateToRecord(comp.id)}
                                style={{
                                    fontWeight: 700,
                                    fontSize: '0.84rem',
                                    color: '#1d4ed8',
                                    cursor: onNavigateToRecord ? 'pointer' : 'default',
                                    textDecoration: onNavigateToRecord ? 'underline' : 'none',
                                    whiteSpace: 'nowrap',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis'
                                }}
                                title={comp.tagNo || comp.serialNumber || 'Attached Record'}
                            >
                                {comp.tagNo || comp.serialNumber || 'Attached Record'}
                            </div>
                            <div style={{ fontSize: '0.72rem', color: '#64748b', marginTop: '2px' }}>
                                {comp.valveType || 'Equipment'}
                            </div>
                            {comp.nextCertDate && (
                                <div style={{ fontSize: '0.68rem', color: '#059669', fontWeight: 600, marginTop: '2px' }}>
                                    Cert: {comp.nextCertDate}
                                </div>
                            )}
                        </div>
                    ) : (
                        <div style={{ fontSize: '0.72rem', color: '#94a3b8', fontStyle: 'italic', padding: '0.2rem 0' }}>
                            {slot.defaultType || 'Unassigned Slot'}
                        </div>
                    )}
                </div>

                <div style={{ display: 'flex', gap: '0.3rem', alignItems: 'center', marginTop: '0.4rem', borderTop: '1px solid #f1f5f9', paddingTop: '0.35rem' }}>
                    {isRotatable && (
                        <button
                            type="button"
                            onClick={() => handleRotateSlot(streamId || slot._branchStreamId, slot.id)}
                            style={{
                                padding: '0.2rem 0.4rem',
                                fontSize: '0.7rem',
                                borderRadius: '4px',
                                border: '1px solid #cbd5e1',
                                background: '#f8fafc',
                                color: '#334155',
                                cursor: 'pointer',
                                fontWeight: 500
                            }}
                            title={`Rotate by 90° (Current: ${slot.rotation || 0}°)`}
                        >
                            ↻
                        </button>
                    )}

                    {hasComp ? (
                        <>
                            {onNavigateToRecord && (
                                <button
                                    type="button"
                                    onClick={() => onNavigateToRecord(comp.id)}
                                    style={{
                                        padding: '0.2rem 0.4rem',
                                        fontSize: '0.7rem',
                                        borderRadius: '4px',
                                        border: '1px solid #93c5fd',
                                        background: '#eff6ff',
                                        color: '#1d4ed8',
                                        cursor: 'pointer',
                                        fontWeight: 600,
                                        flex: 1
                                    }}
                                >
                                    Open
                                </button>
                            )}
                            <button
                                type="button"
                                onClick={() => handleDetachValve(comp.id)}
                                style={{
                                    padding: '0.2rem 0.35rem',
                                    fontSize: '0.7rem',
                                    borderRadius: '4px',
                                    border: '1px solid #fca5a5',
                                    background: '#fef2f2',
                                    color: '#b91c1c',
                                    cursor: 'pointer',
                                    fontWeight: 600
                                }}
                                title="Detach from skid"
                            >
                                ✕
                            </button>
                        </>
                    ) : (
                        <div style={{ display: 'flex', gap: '0.25rem', width: '100%' }}>
                            <button
                                type="button"
                                onClick={() => handleOpenSlotModal(slot, 'create')}
                                style={{
                                    flex: 1,
                                    padding: '0.22rem 0.3rem',
                                    fontSize: '0.68rem',
                                    borderRadius: '4px',
                                    border: '1px solid #2563eb',
                                    background: '#2563eb',
                                    color: '#ffffff',
                                    cursor: 'pointer',
                                    fontWeight: 600
                                }}
                            >
                                + Create
                            </button>
                            <button
                                type="button"
                                onClick={() => handleOpenSlotModal(slot, 'link')}
                                style={{
                                    flex: 1,
                                    padding: '0.22rem 0.3rem',
                                    fontSize: '0.68rem',
                                    borderRadius: '4px',
                                    border: '1px solid #cbd5e1',
                                    background: '#ffffff',
                                    color: '#334155',
                                    cursor: 'pointer',
                                    fontWeight: 600
                                }}
                            >
                                Link
                            </button>
                        </div>
                    )}
                </div>
            </div>
        );
    };

    // Calculate maximum topological vertical and horizontal extents for dynamic container bounds
    const computeStreamExtents = (stream) => {
        let maxTopDepth = 0;
        let maxBottomDepth = 0;
        let maxLeftExt = 0;
        let maxRightExt = 0;

        const mainCount = (stream.slots || []).length;

        const measureSlotBranches = (slot, slotIndexInMain, currentRelX, currentRelY) => {
            const branches = slot.branchSlots || [];
            if (branches.length === 0) return;

            const topBranches = branches.filter(b => (b.portDirection || 'top') === 'top' && b.role !== 'blind_flange');
            const bottomBranches = branches.filter(b => (b.portDirection || 'bottom') === 'bottom' && b.role !== 'blind_flange');
            const leftBranches = branches.filter(b => b.portDirection === 'left' && b.role !== 'blind_flange');
            const rightBranches = branches.filter(b => b.portDirection === 'right' && b.role !== 'blind_flange');

            topBranches.forEach((bSlot, bIdx) => {
                const relY = currentRelY + (bIdx + 1);
                if (relY > maxTopDepth) maxTopDepth = relY;
                measureSlotBranches(bSlot, slotIndexInMain, currentRelX, relY);
            });

            bottomBranches.forEach((bSlot, bIdx) => {
                const relY = currentRelY - (bIdx + 1);
                if (-relY > maxBottomDepth) maxBottomDepth = -relY;
                measureSlotBranches(bSlot, slotIndexInMain, currentRelX, relY);
            });

            leftBranches.forEach((bSlot, bIdx) => {
                const relX = currentRelX - (bIdx + 1);
                const totalAbsCol = slotIndexInMain + relX;
                if (totalAbsCol < 0) {
                    const overage = -totalAbsCol;
                    if (overage > maxLeftExt) maxLeftExt = overage;
                }
                measureSlotBranches(bSlot, slotIndexInMain, relX, currentRelY);
            });

            rightBranches.forEach((bSlot, bIdx) => {
                const relX = currentRelX + (bIdx + 1);
                const totalAbsCol = slotIndexInMain + relX;
                if (totalAbsCol >= mainCount) {
                    const overage = totalAbsCol - (mainCount - 1);
                    if (overage > maxRightExt) maxRightExt = overage;
                }
                measureSlotBranches(bSlot, slotIndexInMain, relX, currentRelY);
            });
        };

        (stream.slots || []).forEach((slot, sIdx) => {
            measureSlotBranches(slot, sIdx, 0, 0);
        });

        return { maxTopDepth, maxBottomDepth, maxLeftExt, maxRightExt };
    };

    // Inline "+" connector button to insert slots
    const renderInlineInsertButton = (streamId, insertIndex) => {
        return (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '40px', height: '100%', position: 'relative' }}>
                {/* Horizontal flow line */}
                <div style={{ position: 'absolute', left: 0, right: 0, height: '2px', background: '#94a3b8', zIndex: 1 }} />
                <button
                    type="button"
                    onClick={() => setInsertionTarget({ streamId, insertIndex })}
                    title="Insert component here"
                    style={{
                        position: 'relative',
                        zIndex: 2,
                        width: '20px',
                        height: '20px',
                        borderRadius: '50%',
                        border: '1.5px solid #2563eb',
                        background: '#ffffff',
                        color: '#2563eb',
                        fontSize: '0.75rem',
                        lineHeight: '18px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        padding: 0,
                        fontWeight: 'bold',
                        boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
                    }}
                >
                    +
                </button>
            </div>
        );
    };

    return (
        <div style={{
            background: 'var(--panel-bg, #ffffff)',
            borderRadius: '12px',
            border: '1px solid var(--border-color, #e2e8f0)',
            padding: '1.5rem',
            marginTop: '1.5rem',
            boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)'
        }}>
            {/* Header controls bar */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.25rem' }}>
                <div>
                    <h3 style={{ margin: 0, fontSize: '1.15rem', color: '#1e293b' }}>
                        Process Skid Visualizer & Topology Builder
                    </h3>
                    <p style={{ margin: '0.25rem 0 0 0', fontSize: '0.8rem', color: '#64748b' }}>
                        {skidSpec.inletHeader && skidSpec.outletHeader
                            ? 'Interactive schematic: Inlet Header (left) flows through parallel process streams to Outlet Header (right).'
                            : (!skidSpec.streams || skidSpec.streams.length === 0 || skidSpec.streams.every(s => !s.slots || s.slots.length === 0))
                                ? 'Blank canvas: Click + to insert your first component or choose a pre-set configuration.'
                                : 'Interactive schematic: Direct inline process skid topology.'}
                    </p>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', flexWrap: 'wrap' }} className="interactive-control">
                    {/* Preset Selector Dropdown */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                        <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#475569' }}>Pre-set:</span>
                        <select
                            value={skidSpec.skidType || ''}
                            onChange={(e) => handleSelectPreset(e.target.value)}
                            style={{
                                padding: '0.4rem 0.65rem',
                                borderRadius: '6px',
                                border: '1px solid #cbd5e1',
                                background: '#ffffff',
                                color: '#1e293b',
                                fontSize: '0.8rem',
                                fontWeight: 500,
                                cursor: 'pointer',
                                outline: 'none'
                            }}
                        >
                            <option value="" disabled>Select Pre-set Configuration...</option>
                            {SKID_PRESETS.map(preset => (
                                <option key={preset.id} value={preset.id}>
                                    {preset.label}
                                </option>
                            ))}
                        </select>
                    </div>

                    <button
                        type="button"
                        onClick={handleAddProcessStreamClick}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.35rem',
                            padding: '0.45rem 0.85rem',
                            background: '#2563eb',
                            color: '#ffffff',
                            border: 'none',
                            borderRadius: '6px',
                            fontWeight: 600,
                            fontSize: '0.82rem',
                            cursor: 'pointer'
                        }}
                    >
                        <span>+</span>
                        <span>Add Process Stream</span>
                    </button>

                    <button
                        type="button"
                        onClick={() => setIsPIDOpen(true)}
                        title="Open P&ID Schematic Diagram (ISA-5.1)"
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.4rem',
                            padding: '0.45rem 0.85rem',
                            background: '#0284c7',
                            color: '#ffffff',
                            border: 'none',
                            borderRadius: '6px',
                            fontWeight: 600,
                            fontSize: '0.82rem',
                            cursor: 'pointer'
                        }}
                    >
                        <span>📊</span>
                        <span>View P&ID</span>
                    </button>

                    <div style={{ display: 'flex', alignItems: 'center', background: '#f1f5f9', borderRadius: '6px', padding: '2px', border: '1px solid #cbd5e1' }}>
                        <button
                            type="button"
                            onClick={handleZoomOut}
                            title="Zoom Out"
                            style={{ padding: '0.35rem 0.6rem', border: 'none', background: 'transparent', cursor: 'pointer', fontWeight: 'bold' }}
                        >
                            -
                        </button>
                        <span style={{ fontSize: '0.75rem', fontWeight: 600, padding: '0 0.4rem', minWidth: '42px', textAlign: 'center', color: '#475569' }}>
                            {Math.round(zoomLevel * 100)}%
                        </span>
                        <button
                            type="button"
                            onClick={handleZoomIn}
                            title="Zoom In"
                            style={{ padding: '0.35rem 0.6rem', border: 'none', background: 'transparent', cursor: 'pointer', fontWeight: 'bold' }}
                        >
                            +
                        </button>
                        <button
                            type="button"
                            onClick={handleResetView}
                            title="Reset View"
                            style={{ padding: '0.35rem 0.6rem', borderLeft: '1px solid #cbd5e1', borderRight: 'none', borderTop: 'none', borderBottom: 'none', background: 'transparent', cursor: 'pointer', fontSize: '0.72rem', color: '#64748b' }}
                        >
                            Reset
                        </button>
                    </div>
                </div>
            </div>

            {/* Interactive schematic canvas container */}
            <div
                style={{
                    width: '100%',
                    height: '580px',
                    background: '#f8fafc',
                    borderRadius: '8px',
                    border: '1px solid #e2e8f0',
                    overflow: 'hidden',
                    position: 'relative',
                    cursor: isDraggingCanvas ? 'grabbing' : 'grab',
                    userSelect: 'none'
                }}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
            >
                {/* Canvas grid background pattern */}
                <div
                    style={{
                        position: 'absolute',
                        inset: 0,
                        backgroundImage: 'radial-gradient(#cbd5e1 1px, transparent 1px)',
                        backgroundSize: '20px 20px',
                        pointerEvents: 'none',
                        opacity: 0.6
                    }}
                />

                {/* Canvas transform layer */}
                <div
                    style={{
                        position: 'absolute',
                        top: '50px',
                        left: '50px',
                        transform: `translate(${panOffset.x}px, ${panOffset.y}px) scale(${zoomLevel})`,
                        transformOrigin: 'top left',
                        display: 'flex',
                        alignItems: 'stretch',
                        gap: '2.5rem',
                        transition: isDraggingCanvas ? 'none' : 'transform 0.05s ease-out'
                    }}
                >
                    {/* BLANK CANVAS STATE: Blank canvas with a single plus button */}
                    {!skidSpec.inletHeader && !skidSpec.outletHeader && (!skidSpec.streams || skidSpec.streams.length === 0 || skidSpec.streams.every(s => !s.slots || s.slots.length === 0)) ? (
                        <div style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            padding: '3rem 4rem',
                            background: '#ffffff',
                            borderRadius: '12px',
                            border: '2px dashed #cbd5e1',
                            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.03)',
                            minWidth: '360px',
                            maxWidth: '480px',
                            margin: 'auto'
                        }}>
                            <button
                                type="button"
                                onClick={() => setInsertionTarget({ streamId: 'stream_1', insertIndex: 0 })}
                                title="Add equipment / component"
                                style={{
                                    width: '64px',
                                    height: '64px',
                                    borderRadius: '50%',
                                    border: '2px solid #2563eb',
                                    background: '#eff6ff',
                                    color: '#2563eb',
                                    fontSize: '2rem',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    cursor: 'pointer',
                                    boxShadow: '0 4px 10px rgba(37, 99, 235, 0.2)',
                                    transition: 'all 0.15s ease',
                                    outline: 'none'
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.transform = 'scale(1.08)';
                                    e.currentTarget.style.background = '#2563eb';
                                    e.currentTarget.style.color = '#ffffff';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = 'scale(1)';
                                    e.currentTarget.style.background = '#eff6ff';
                                    e.currentTarget.style.color = '#2563eb';
                                }}
                            >
                                +
                            </button>
                            <div style={{ marginTop: '1.25rem', textAlign: 'center' }}>
                                <div style={{ fontSize: '0.95rem', fontWeight: 700, color: '#1e293b' }}>
                                    Blank Canvas
                                </div>
                                <div style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '0.35rem', lineHeight: '1.4' }}>
                                    Click the plus button to insert your first component or choose a pre-set configuration from the dropdown above.
                                </div>
                            </div>
                        </div>
                    ) : (
                        <>
                            {/* LEFT COLUMN: Vertical Inlet Header (Rendered only when inletHeader exists) */}
                            {skidSpec.inletHeader && (
                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '200px' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', marginBottom: '0.4rem', padding: '0 4px' }}>
                                        <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#3b82f6', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                                            Inlet Manifold (Vertical)
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => handleRemoveHeader('inlet')}
                                            title="Remove Inlet Header"
                                            style={{
                                                fontSize: '0.68rem',
                                                border: '1px solid #fecaca',
                                                background: '#fff1f2',
                                                color: '#b91c1c',
                                                borderRadius: '3px',
                                                padding: '1px 5px',
                                                cursor: 'pointer',
                                                fontWeight: 700
                                            }}
                                        >
                                            ✕
                                        </button>
                                    </div>

                                    {/* Top Cap flange */}
                                    <div style={{ width: '40px', height: '10px', background: '#3b82f6', borderRadius: '4px 4px 0 0', opacity: 0.8 }} />

                                    {/* Vertical Header Body */}
                                    <div style={{
                                        width: '100%',
                                        background: '#eff6ff',
                                        border: '2px solid #3b82f6',
                                        borderRadius: '8px',
                                        padding: '0.75rem',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        gap: '1rem',
                                        boxShadow: '0 4px 6px -1px rgba(59, 130, 246, 0.1)',
                                        flex: 1
                                    }}>
                                        {renderSlotCard(skidSpec.inletHeader || { id: 'inlet_header', label: 'Inlet Header', defaultType: 'General Process Equipment', role: 'inlet_header' })}

                                        <div style={{ marginTop: 'auto', width: '100%', borderTop: '1px solid #bfdbfe', paddingTop: '0.6rem' }}>
                                            <div style={{ fontSize: '0.72rem', color: '#1d4ed8', fontWeight: 600, textAlign: 'center', marginBottom: '0.4rem' }}>
                                                Stream Ports ({skidSpec.streams?.length || 2})
                                            </div>
                                            <button
                                                type="button"
                                                onClick={handleAddEmptyPortStream}
                                                style={{
                                                    width: '100%',
                                                    padding: '0.35rem 0.5rem',
                                                    fontSize: '0.72rem',
                                                    borderRadius: '4px',
                                                    border: '1px dashed #2563eb',
                                                    background: '#ffffff',
                                                    color: '#2563eb',
                                                    cursor: 'pointer',
                                                    fontWeight: 600
                                                }}
                                            >
                                                + Add Port / Stream
                                            </button>
                                        </div>
                                    </div>

                                    {/* Bottom Drain flange */}
                                    <div style={{ width: '40px', height: '10px', background: '#3b82f6', borderRadius: '0 0 4px 4px', opacity: 0.8 }} />
                                </div>
                            )}

                            {/* MIDDLE COLUMN: Parallel Streams */}
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', justifyContent: 'space-around' }}>
                                {(skidSpec.streams || []).map((stream, sIdx) => (
                                    <div
                                        key={stream.id}
                                        style={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            background: '#ffffff',
                                            border: '1px solid #e2e8f0',
                                            borderRadius: '10px',
                                            paddingTop: `${75 + computeStreamExtents(stream).maxTopDepth * 170}px`,
                                            paddingBottom: `${75 + computeStreamExtents(stream).maxBottomDepth * 170}px`,
                                            paddingLeft: `${16 + computeStreamExtents(stream).maxLeftExt * 225}px`,
                                            paddingRight: `${16 + computeStreamExtents(stream).maxRightExt * 225}px`,
                                            boxShadow: '0 2px 4px rgba(0,0,0,0.03)',
                                            position: 'relative'
                                        }}
                                    >
                                        {/* Stream Header line */}
                                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'absolute', top: '0.75rem', left: '1rem', right: '1rem' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                                <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#1e293b' }}>{stream.label}</span>
                                                <span style={{ fontSize: '0.7rem', color: '#64748b' }}>({stream.slots.length} components)</span>
                                            </div>
                                            {(skidSpec.streams || []).length > 1 && (
                                                <button
                                                    type="button"
                                                    onClick={() => handleRemoveStream(stream.id)}
                                                    style={{
                                                        fontSize: '0.68rem',
                                                        border: '1px solid #fecaca',
                                                        background: '#fff1f2',
                                                        color: '#b91c1c',
                                                        borderRadius: '4px',
                                                        padding: '0.15rem 0.4rem',
                                                        cursor: 'pointer',
                                                        fontWeight: 600
                                                    }}
                                                    title="Delete entire stream"
                                                >
                                                    Remove Stream
                                                </button>
                                            )}
                                        </div>

                                        {/* Flow Sequence (Horizontal) */}
                                        <div style={{ display: 'flex', alignItems: 'center' }}>
                                            {/* Left port connector line from inlet header if manifold exists */}
                                            {skidSpec.inletHeader && (
                                                <div style={{ width: '24px', height: '2px', background: '#3b82f6', flexShrink: 0 }} />
                                            )}

                                            {/* Start insertion button — suppressed if first slot is an elbow/choke with no left port (90° or 180°), a blind flange, or a tee */}
                                            {(() => {
                                                const firstSlot = (stream.slots || [])[0];
                                                const isElbowOrChoke = (s) => s && (s.role === 'elbow' || s.role === 'positive_choke' || s.role === 'adjustable_choke');
                                                const suppressStartInsert = firstSlot && (
                                                    (isElbowOrChoke(firstSlot) && (firstSlot.rotation === 0 || firstSlot.rotation === 90)) ||
                                                    firstSlot.role === 'blind_flange' ||
                                                    firstSlot.role === 'tee'
                                                );
                                                if (suppressStartInsert) {
                                                    return <div style={{ width: '40px', height: '2px', opacity: 0 }} />;
                                                }
                                                return renderInlineInsertButton(stream.id, 0);
                                            })()}

                                            {/* Stream Slots */}
                                            {stream.slots.map((slot, slotIdx) => {
                                                const slotIsBlind = slot.role === 'blind_flange';
                                                const slotIsTee = slot.role === 'tee';
                                                const slotIsCross = slot.role === 'cross';
                                                const slotIsElbow = slot.role === 'elbow' || slot.role === 'positive_choke' || slot.role === 'adjustable_choke';
                                                const rot = slot.rotation || 0;

                                                const renderVerticalPort = (targetSlot = slot, direction) => {
                                                    let tSlot = targetSlot;
                                                    let dir = direction;
                                                    if (typeof targetSlot === 'string') {
                                                        dir = targetSlot;
                                                        tSlot = slot;
                                                    }
                                                    const isTop = dir === 'top';
                                                    const isTargetSlotMainTee = tSlot.id === slot.id;
                                                    const isConnectedToUpstream = isTargetSlotMainTee ? (slotIdx > 0 || !!skidSpec.inletHeader) : true;

                                                    const tRot = tSlot.rotation || 0;
                                                    const isCrossRole = tSlot.role === 'cross';

                                                    const isPortOpen = (slotItem, portDirection, isVerticalContext = false) => {
                                                        if (!slotItem) return false;
                                                        const r = slotItem.role;
                                                        const rotVal = slotItem.rotation || 0;
                                                        if (r === 'cross') return true;
                                                        if (r === 'blind_flange') return false;
                                                        if (r === 'tee') {
                                                            if (portDirection === 'top') return rotVal === 0 || rotVal === 180 || rotVal === 270;
                                                            if (portDirection === 'right') return rotVal === 0 || rotVal === 90 || rotVal === 270;
                                                            if (portDirection === 'bottom') return rotVal === 0 || rotVal === 90 || rotVal === 180;
                                                            if (portDirection === 'left') return rotVal === 90 || rotVal === 180 || rotVal === 270;
                                                        }
                                                        if (r === 'elbow' || r === 'positive_choke' || r === 'adjustable_choke') {
                                                            if (portDirection === 'top') return rotVal === 0 || rotVal === 270;
                                                            if (portDirection === 'right') return rotVal === 0 || rotVal === 90;
                                                            if (portDirection === 'bottom') return rotVal === 90 || rotVal === 180;
                                                            if (portDirection === 'left') return rotVal === 180 || rotVal === 270;
                                                        }
                                                        if (r === 'safety_valve' || (slotItem.defaultType && slotItem.defaultType.toLowerCase().includes('safety'))) {
                                                            // PSV: Bottom port is inlet (always open). Outlet is strictly Left or Right based on outletSide / rotation.
                                                            if (portDirection === 'bottom') return true;
                                                            const currentSide = slotItem.outletSide || (rotVal === 180 ? 'right' : 'left');
                                                            if (portDirection === 'left') return currentSide === 'left';
                                                            if (portDirection === 'right') return currentSide === 'right';
                                                            return false;
                                                        }
                                                        // 2-Port Straight-Through Inline Components (spool, gate_valve, check_valve, ball_valve, etc.)
                                                        if (isVerticalContext) {
                                                            return portDirection === 'top' || portDirection === 'bottom';
                                                        } else {
                                                            return portDirection === 'left' || portDirection === 'right';
                                                        }
                                                    };

                                                    const tActivePorts = isCrossRole ? {
                                                        top: true, right: true, bottom: true, left: true
                                                    } : {
                                                        top: tRot === 0 || tRot === 180 || tRot === 270,
                                                        right: tRot === 0 || tRot === 90 || tRot === 270,
                                                        bottom: tRot === 0 || tRot === 90 || tRot === 180,
                                                        left: !isConnectedToUpstream && (tRot === 90 || tRot === 180 || tRot === 270)
                                                    };

                                                    const isActive = isTop ? tActivePorts.top : tActivePorts.bottom;
                                                    const isOnlyActiveVerticalPort = isActive && !(isTop ? tActivePorts.bottom : tActivePorts.top);

                                                    const branches = (tSlot.branchSlots || []).filter(b => {
                                                        const bDir = b.portDirection || (isTop ? 'top' : 'bottom');
                                                        if (isOnlyActiveVerticalPort) {
                                                            return bDir === 'top' || bDir === 'bottom';
                                                        }
                                                        return bDir === dir;
                                                    });
                                                    const nonBlindBranches = branches.filter(b => b.role !== 'blind_flange');
                                                    const blindBranch = branches.find(b => b.role === 'blind_flange');

                                                    const renderBranchPlusButton = (bInsertIndex) => (
                                                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                                            <div style={{ width: '2px', height: '14px', background: '#0369a1' }} />
                                                            <button
                                                                type="button"
                                                                title={`Insert component into ${dir} branch`}
                                                                onClick={() => setInsertionTarget({
                                                                    streamId: stream.id,
                                                                    insertIndex: slotIdx,
                                                                    isBranch: true,
                                                                    teeSlotId: tSlot.id,
                                                                    portDirection: dir,
                                                                    branchInsertIndex: bInsertIndex
                                                                })}
                                                                style={{
                                                                    width: '20px', height: '20px',
                                                                    borderRadius: '50%',
                                                                    border: '1.5px solid #0369a1',
                                                                    background: '#ffffff',
                                                                    color: '#0369a1',
                                                                    fontSize: '0.75rem',
                                                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                                    cursor: 'pointer', padding: 0, fontWeight: 'bold',
                                                                    boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
                                                                }}
                                                            >+</button>
                                                            <div style={{ width: '2px', height: '14px', background: '#0369a1' }} />
                                                        </div>
                                                    );

                                                    const renderHorizontalBranch = (hTargetSlot, hDirection) => {
                                                        const isLeft = hDirection === 'left';
                                                        const branchItems = (hTargetSlot.branchSlots || []).filter(b => b.portDirection === hDirection);
                                                        const nonBlind = branchItems.filter(b => b.role !== 'blind_flange');
                                                        const blind = branchItems.find(b => b.role === 'blind_flange');

                                                        const renderHPlusButton = (bInsertIndex) => (
                                                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '40px', height: '100%', position: 'relative' }}>
                                                                <div style={{ position: 'absolute', left: 0, right: 0, height: '2px', background: '#0369a1', zIndex: 1 }} />
                                                                <button
                                                                    type="button"
                                                                    title={`Insert component into ${hDirection} port`}
                                                                    onClick={() => setInsertionTarget({
                                                                        streamId: stream.id,
                                                                        insertIndex: slotIdx,
                                                                        isBranch: true,
                                                                        teeSlotId: hTargetSlot.id,
                                                                        portDirection: hDirection,
                                                                        branchInsertIndex: bInsertIndex
                                                                    })}
                                                                    style={{
                                                                        position: 'relative',
                                                                        zIndex: 2,
                                                                        width: '20px', height: '20px',
                                                                        borderRadius: '50%',
                                                                        border: '1.5px solid #0369a1',
                                                                        background: '#ffffff',
                                                                        color: '#0369a1',
                                                                        fontSize: '0.75rem',
                                                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                                        cursor: 'pointer', padding: 0, fontWeight: 'bold',
                                                                        boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
                                                                    }}
                                                                >+</button>
                                                            </div>
                                                        );

                                                        const renderHorizontalBranchSlotItem = (childSlot, parentSlotId = hTargetSlot.id) => {
                                                            const hasTopPort = isPortOpen(childSlot, 'top', false);
                                                            const hasBottomPort = isPortOpen(childSlot, 'bottom', false);

                                                            return (
                                                                <div key={childSlot.id} style={{ display: 'flex', alignItems: 'center', position: 'relative' }}>
                                                                    {hasTopPort && (
                                                                        <div style={{ position: 'absolute', bottom: '100%', left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                                                            {renderVerticalPort(childSlot, 'top')}
                                                                        </div>
                                                                    )}
                                                                    {renderSlotCard({ ...childSlot, _parentTeeId: parentSlotId, _branchStreamId: stream.id }, null)}
                                                                    {hasBottomPort && (
                                                                        <div style={{ position: 'absolute', top: '100%', left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                                                            {renderVerticalPort(childSlot, 'bottom')}
                                                                        </div>
                                                                    )}
                                                                </div>
                                                            );
                                                        };

                                                        const lastHorizontalSlot = nonBlind[nonBlind.length - 1];
                                                        const suppressHPlus = lastHorizontalSlot && !isPortOpen(lastHorizontalSlot, hDirection, false);

                                                        if (isLeft) {
                                                            return (
                                                                <div style={{ display: 'flex', alignItems: 'center', position: 'absolute', right: '100%', marginRight: '0px' }}>
                                                                    {blind ? (
                                                                        <>
                                                                            {renderSlotCard({ ...blind, _parentTeeId: hTargetSlot.id, _branchStreamId: stream.id }, null)}
                                                                            <div style={{ width: '10px', height: '2px', background: '#0369a1' }} />
                                                                            {nonBlind.map((childSlot) => (
                                                                                <React.Fragment key={childSlot.id}>
                                                                                    {renderHorizontalBranchSlotItem(childSlot, hTargetSlot.id)}
                                                                                    <div style={{ width: '10px', height: '2px', background: '#0369a1' }} />
                                                                                </React.Fragment>
                                                                            ))}
                                                                        </>
                                                                    ) : (
                                                                        <>
                                                                            {!suppressHPlus && renderHPlusButton(nonBlind.length)}
                                                                            {nonBlind.slice().reverse().map((childSlot, revIdx) => {
                                                                                const origIdx = nonBlind.length - 1 - revIdx;
                                                                                return (
                                                                                    <React.Fragment key={childSlot.id}>
                                                                                        {renderHorizontalBranchSlotItem(childSlot, hTargetSlot.id)}
                                                                                        {renderHPlusButton(origIdx)}
                                                                                    </React.Fragment>
                                                                                );
                                                                            })}
                                                                        </>
                                                                    )}
                                                                </div>
                                                            );
                                                        } else {
                                                            return (
                                                                <div style={{ display: 'flex', alignItems: 'center', position: 'absolute', left: '100%', marginLeft: '0px' }}>
                                                                    {nonBlind.map((childSlot, bIdx) => (
                                                                        <React.Fragment key={childSlot.id}>
                                                                            {renderHPlusButton(bIdx)}
                                                                            {renderHorizontalBranchSlotItem(childSlot, hTargetSlot.id)}
                                                                        </React.Fragment>
                                                                    ))}
                                                                    {blind ? (
                                                                        <>
                                                                            <div style={{ width: '10px', height: '2px', background: '#0369a1' }} />
                                                                            {renderSlotCard({ ...blind, _parentTeeId: hTargetSlot.id, _branchStreamId: stream.id }, null)}
                                                                        </>
                                                                    ) : (
                                                                        !suppressHPlus && renderHPlusButton(nonBlind.length)
                                                                    )}
                                                                </div>
                                                            );
                                                        }
                                                    };

                                                    const renderVerticalBranchSlotItem = (bSlot, parentSlotId = tSlot.id) => {
                                                        const hasLeftPort = isPortOpen(bSlot, 'left', true);
                                                        const hasRightPort = isPortOpen(bSlot, 'right', true);

                                                        return (
                                                            <div key={bSlot.id} style={{ display: 'flex', alignItems: 'center', position: 'relative' }}>
                                                                {hasLeftPort && renderHorizontalBranch(bSlot, 'left')}
                                                                {renderSlotCard({ ...bSlot, _parentTeeId: parentSlotId, _branchStreamId: stream.id }, null)}
                                                                {hasRightPort && renderHorizontalBranch(bSlot, 'right')}
                                                            </div>
                                                        );
                                                    };

                                                    const lastBranchSlot = nonBlindBranches[nonBlindBranches.length - 1];
                                                    const suppressEndPlus = lastBranchSlot && !isPortOpen(lastBranchSlot, isTop ? 'top' : 'bottom', true);

                                                    return (
                                                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: isTop ? 'flex-end' : 'flex-start' }}>
                                                            {isActive ? (
                                                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                                                    {isTop ? (
                                                                        blindBranch ? (
                                                                            <>
                                                                                {renderSlotCard({ ...blindBranch, _parentTeeId: tSlot.id, _branchStreamId: stream.id }, null)}
                                                                                <div style={{ width: '2px', height: '14px', background: '#0369a1' }} />
                                                                                {nonBlindBranches.map((bSlot) => (
                                                                                    <React.Fragment key={bSlot.id}>
                                                                                        {renderVerticalBranchSlotItem(bSlot)}
                                                                                        <div style={{ width: '2px', height: '14px', background: '#0369a1' }} />
                                                                                    </React.Fragment>
                                                                                ))}
                                                                            </>
                                                                        ) : (
                                                                            <>
                                                                                {!suppressEndPlus && renderBranchPlusButton(nonBlindBranches.length)}
                                                                                {nonBlindBranches.slice().reverse().map((bSlot, revIdx) => {
                                                                                    const originalIdx = nonBlindBranches.length - 1 - revIdx;
                                                                                    return (
                                                                                        <React.Fragment key={bSlot.id}>
                                                                                            {renderVerticalBranchSlotItem(bSlot)}
                                                                                            {renderBranchPlusButton(originalIdx)}
                                                                                        </React.Fragment>
                                                                                    );
                                                                                })}
                                                                            </>
                                                                        )
                                                                    ) : (
                                                                        nonBlindBranches.map((bSlot, bIdx) => (
                                                                            <React.Fragment key={bSlot.id}>
                                                                                {renderBranchPlusButton(bIdx)}
                                                                                {renderVerticalBranchSlotItem(bSlot)}
                                                                            </React.Fragment>
                                                                        ))
                                                                    )}
                                                                    {!isTop && (
                                                                        blindBranch ? (
                                                                            <>
                                                                                <div style={{ width: '2px', height: '14px', background: '#0369a1' }} />
                                                                                {renderSlotCard({ ...blindBranch, _parentTeeId: tSlot.id, _branchStreamId: stream.id }, null)}
                                                                            </>
                                                                        ) : (
                                                                            !suppressEndPlus && renderBranchPlusButton(nonBlindBranches.length)
                                                                        )
                                                                    )}
                                                                </div>
                                                            ) : (
                                                                /* Placeholder element keeps vertical spacing identical across all rotations so card position never moves */
                                                                isTargetSlotMainTee && <div style={{ height: '48px', width: '2px', opacity: 0 }} />
                                                            )}
                                                        </div>
                                                    );
                                                };

                                                if (slotIsCross) {
                                                    const renderVerticalCrossPort = (direction) => renderVerticalPort(slot, direction);
                                                    return (
                                                        <React.Fragment key={slot.id}>
                                                            <div style={{ display: 'inline-flex', alignItems: 'center', position: 'relative' }}>
                                                                {/* Left side connector line */}
                                                                <div style={{ width: '0px', height: '2px', opacity: 0 }} />

                                                                {/* Central Card Container with Top & Bottom Ports */}
                                                                <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                                                                    <div style={{ position: 'absolute', bottom: '100%', left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                                                        {renderVerticalCrossPort('top')}
                                                                    </div>
                                                                    {renderSlotCard(slot, stream.id)}
                                                                    <div style={{ position: 'absolute', top: '100%', left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                                                        {renderVerticalCrossPort('bottom')}
                                                                    </div>
                                                                </div>

                                                                {/* Right side exit with plus button */}
                                                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                                                    <div style={{ width: '10px', height: '2px', background: '#0369a1' }} />
                                                                    <button
                                                                        type="button"
                                                                        title="Add component to right cross port"
                                                                        onClick={() => setInsertionTarget({ streamId: stream.id, insertIndex: slotIdx + 1, isBranch: false })}
                                                                        style={{
                                                                            width: '20px', height: '20px',
                                                                            borderRadius: '50%',
                                                                            border: '1.5px solid #0369a1',
                                                                            background: '#ffffff',
                                                                            color: '#0369a1',
                                                                            fontSize: '0.75rem',
                                                                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                                            cursor: 'pointer', padding: 0, fontWeight: 'bold',
                                                                            boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
                                                                        }}
                                                                    >+</button>
                                                                    <div style={{ width: '10px', height: '2px', background: '#0369a1' }} />
                                                                </div>
                                                            </div>
                                                        </React.Fragment>
                                                    );
                                                }

                                                if (slotIsTee) {
                                                    // 3-Way Tee open ports & upstream connection handling:
                                                    // When connected to an upstream component (slotIdx > 0 or inletHeader present):
                                                    // 1 of the 3 open ports is consumed by the upstream connection (Left port), leaving 2 open outlet plus buttons.
                                                    // When NOT connected to upstream (standalone slot 0 with no header): all 3 open ports show plus buttons.
                                                    const isConnectedToUpstream = slotIdx > 0 || !!skidSpec.inletHeader;
                                                    const activePorts = {
                                                        top: rot === 0 || rot === 180 || rot === 270,
                                                        right: rot === 0 || rot === 90 || rot === 270,
                                                        bottom: rot === 0 || rot === 90 || rot === 180,
                                                        left: !isConnectedToUpstream && (rot === 90 || rot === 180 || rot === 270)
                                                    };

                                                    return (
                                                        <React.Fragment key={slot.id}>
                                                            <div style={{ display: 'inline-flex', alignItems: 'center', position: 'relative' }}>
                                                                {/* Left Port */}
                                                                {activePorts.left ? (
                                                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                                                        <div style={{ width: '10px', height: '2px', background: '#0369a1' }} />
                                                                        <button
                                                                            type="button"
                                                                            title="Add component to left branch port"
                                                                            onClick={() => setInsertionTarget({ streamId: stream.id, insertIndex: slotIdx, isBranch: true, teeSlotId: slot.id, portDirection: 'left' })}
                                                                            style={{
                                                                                width: '20px', height: '20px',
                                                                                borderRadius: '50%',
                                                                                border: '1.5px solid #0369a1',
                                                                                background: '#ffffff',
                                                                                color: '#0369a1',
                                                                                fontSize: '0.75rem',
                                                                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                                                cursor: 'pointer', padding: 0, fontWeight: 'bold',
                                                                                boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
                                                                            }}
                                                                        >+</button>
                                                                        <div style={{ width: '10px', height: '2px', background: '#0369a1' }} />
                                                                    </div>
                                                                ) : (
                                                                    /* Horizontal connector from preceding stream line if connected, else invisible spacing */
                                                                    <div style={{ width: '0px', height: '2px', opacity: 0 }} />
                                                                )}

                                                                {/* Central Card Container */}
                                                                <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                                                                    <div style={{ position: 'absolute', bottom: '100%', left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                                                        {renderVerticalPort('top')}
                                                                    </div>
                                                                    {renderSlotCard(slot, stream.id)}
                                                                    <div style={{ position: 'absolute', top: '100%', left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                                                        {renderVerticalPort('bottom')}
                                                                    </div>
                                                                </div>

                                                                {/* Right Port */}
                                                                {activePorts.right ? (
                                                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                                                        <div style={{ width: '10px', height: '2px', background: '#0369a1' }} />
                                                                        <button
                                                                            type="button"
                                                                            title="Add component to right branch port"
                                                                            onClick={() => setInsertionTarget({ streamId: stream.id, insertIndex: slotIdx + 1, isBranch: false })}
                                                                            style={{
                                                                                width: '20px', height: '20px',
                                                                                borderRadius: '50%',
                                                                                border: '1.5px solid #0369a1',
                                                                                background: '#ffffff',
                                                                                color: '#0369a1',
                                                                                fontSize: '0.75rem',
                                                                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                                                cursor: 'pointer', padding: 0, fontWeight: 'bold',
                                                                                boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
                                                                            }}
                                                                        >+</button>
                                                                        <div style={{ width: '10px', height: '2px', background: '#0369a1' }} />
                                                                    </div>
                                                                ) : (
                                                                    <div style={{ width: '40px', height: '2px', opacity: 0 }} />
                                                                )}
                                                            </div>
                                                        </React.Fragment>
                                                    );
                                                }

                                                if (slotIsElbow) {
                                                    // 90° Elbow 2-port orientations:
                                                    // A. 0°: Left (inlet) & Top (outlet) ➔ 1 plus button (Top)
                                                    // B. 90°: Top & Right ➔ 2 plus buttons (Top, Right) [Left port is closed]
                                                    // C. 180°: Right & Bottom ➔ 2 plus buttons (Right, Bottom) [Left port is closed]
                                                    // D. 270°: Bottom (outlet) & Left (inlet) ➔ 1 plus button (Bottom)
                                                    const elbowPorts = {
                                                        top: rot === 0 || rot === 270,
                                                        right: rot === 0 || rot === 90,
                                                        bottom: rot === 90 || rot === 180,
                                                        left: rot === 180 || rot === 270
                                                    };

                                                    const renderVerticalElbowPort = (direction) => {
                                                        const isTop = direction === 'top';
                                                        const isActive = isTop ? elbowPorts.top : elbowPorts.bottom;

                                                        if (!isActive) {
                                                            return <div style={{ height: '34px', width: '2px', opacity: 0 }} />;
                                                        }

                                                        return renderVerticalPort(slot, direction);
                                                    };

                                                    return (
                                                        <React.Fragment key={slot.id}>
                                                            <div style={{ display: 'inline-flex', alignItems: 'center', position: 'relative' }}>
                                                                {/* Left side: Active at 0° and 270°, suppressed/invisible at 90° and 180° */}
                                                                {elbowPorts.left ? (
                                                                    <div style={{ width: '0px', height: '2px', opacity: 0 }} />
                                                                ) : (
                                                                    <div style={{ width: '40px', height: '2px', opacity: 0 }} />
                                                                )}

                                                                {/* Central Card Container */}
                                                                <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                                                                    <div style={{ position: 'absolute', bottom: '100%', left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                                                        {renderVerticalElbowPort('top')}
                                                                    </div>
                                                                    {renderSlotCard(slot, stream.id)}
                                                                    <div style={{ position: 'absolute', top: '100%', left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                                                        {renderVerticalElbowPort('bottom')}
                                                                    </div>
                                                                </div>

                                                                {/* Right Side: Active only at 90° and 180° */}
                                                                {elbowPorts.right ? (
                                                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                                                        <div style={{ width: '10px', height: '2px', background: '#0369a1' }} />
                                                                        <button
                                                                            type="button"
                                                                            title="Add component to right elbow exit"
                                                                            onClick={() => setInsertionTarget({ streamId: stream.id, insertIndex: slotIdx + 1, isBranch: false })}
                                                                            style={{
                                                                                width: '20px', height: '20px',
                                                                                borderRadius: '50%',
                                                                                border: '1.5px solid #0369a1',
                                                                                background: '#ffffff',
                                                                                color: '#0369a1',
                                                                                fontSize: '0.75rem',
                                                                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                                                cursor: 'pointer', padding: 0, fontWeight: 'bold',
                                                                                boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
                                                                            }}
                                                                        >+</button>
                                                                        <div style={{ width: '10px', height: '2px', background: '#0369a1' }} />
                                                                    </div>
                                                                ) : (
                                                                    /* Invisible spacer prevents trailing pipe line on right at 0° and 270° while preserving grid position */
                                                                    <div style={{ width: '40px', height: '2px', opacity: 0 }} />
                                                                )}
                                                            </div>
                                                        </React.Fragment>
                                                    );
                                                }

                                                return (
                                                    <React.Fragment key={slot.id}>
                                                        {renderSlotCard(slot, stream.id)}
                                                        {(!slotIsBlind || slotIdx === 0) && renderInlineInsertButton(stream.id, slotIdx + 1)}
                                                    </React.Fragment>
                                                );
                                            })}

                                            {/* Right port connector line to outlet header if manifold exists */}
                                            {skidSpec.outletHeader && (
                                                <div style={{ width: '24px', height: '2px', background: '#10b981', flexShrink: 0 }} />
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* RIGHT COLUMN: Vertical Outlet Header (Rendered only when outletHeader exists) */}
                            {skidSpec.outletHeader && (
                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '200px' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', marginBottom: '0.4rem', padding: '0 4px' }}>
                                        <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#10b981', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                                            Discharge Manifold (Vertical)
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => handleRemoveHeader('outlet')}
                                            title="Remove Outlet Header"
                                            style={{
                                                fontSize: '0.68rem',
                                                border: '1px solid #fecaca',
                                                background: '#fff1f2',
                                                color: '#b91c1c',
                                                borderRadius: '3px',
                                                padding: '1px 5px',
                                                cursor: 'pointer',
                                                fontWeight: 700
                                            }}
                                        >
                                            ✕
                                        </button>
                                    </div>

                                    {/* Top Cap flange */}
                                    <div style={{ width: '40px', height: '10px', background: '#10b981', borderRadius: '4px 4px 0 0', opacity: 0.8 }} />

                                    {/* Vertical Header Body */}
                                    <div style={{
                                        width: '100%',
                                        background: '#ecfdf5',
                                        border: '2px solid #10b981',
                                        borderRadius: '8px',
                                        padding: '0.75rem',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        gap: '1rem',
                                        boxShadow: '0 4px 6px -1px rgba(16, 185, 129, 0.1)',
                                        flex: 1
                                    }}>
                                        {renderSlotCard(skidSpec.outletHeader || { id: 'outlet_header', label: 'Outlet Header', defaultType: 'General Process Equipment', role: 'outlet_header' })}

                                        <div style={{ marginTop: 'auto', width: '100%', borderTop: '1px solid #a7f3d0', paddingTop: '0.6rem' }}>
                                            <div style={{ fontSize: '0.72rem', color: '#047857', fontWeight: 600, textAlign: 'center' }}>
                                                Discharge Returns
                                            </div>
                                        </div>
                                    </div>

                                    {/* Bottom Drain flange */}
                                    <div style={{ width: '40px', height: '10px', background: '#10b981', borderRadius: '0 0 4px 4px', opacity: 0.8 }} />
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>

            {/* Modal: Insert Component Picker */}
            {insertionTarget && (
                <div style={{
                    position: 'fixed',
                    top: 0, left: 0, right: 0, bottom: 0,
                    background: 'rgba(0,0,0,0.6)',
                    backdropFilter: 'blur(3px)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 2000,
                    padding: '1rem'
                }} onClick={() => setInsertionTarget(null)}>
                    <div style={{
                        background: '#ffffff',
                        borderRadius: '10px',
                        padding: '1.5rem',
                        maxWidth: '460px',
                        width: '100%',
                        boxShadow: '0 20px 25px -5px rgba(0,0,0,0.2)'
                    }} onClick={e => e.stopPropagation()}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                            <h4 style={{ margin: 0, fontSize: '1.05rem', color: '#1e293b' }}>
                                {insertionTarget.isBranch ? 'Add Branch Component' : 'Insert Skid Component'}
                            </h4>
                            <button
                                type="button"
                                onClick={() => setInsertionTarget(null)}
                                style={{ background: 'none', border: 'none', fontSize: '1.2rem', cursor: 'pointer', color: '#64748b' }}
                            >
                                ✕
                            </button>
                        </div>
                        <p style={{ fontSize: '0.8rem', color: '#64748b', marginTop: 0 }}>
                            {insertionTarget.isBranch
                                ? 'Select the component to add to the tee\'s perpendicular branch port:'
                                : 'Select the equipment type to insert into this stream position:'}
                        </p>

                        <div style={{ maxHeight: '340px', overflowY: 'auto', paddingRight: '4px', marginTop: '1rem' }}>
                            {/* Headers & Manifolds Section — hidden for branch inserts */}
                            {!insertionTarget.isBranch && (
                                <>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
                                <div style={{ fontSize: '0.72rem', fontWeight: 700, color: '#2563eb', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                                    Headers & Manifolds (Vertical)
                                </div>
                                <span style={{ fontSize: '0.65rem', color: '#64748b' }}>Min. 2 stream connections</span>
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', marginBottom: '1rem' }}>
                                {[
                                    { label: 'Inlet Header', type: 'Inlet Header', subtitle: 'Vertical inlet manifold (≥2 ports)' },
                                    { label: 'Outlet Header', type: 'Outlet Header', subtitle: 'Vertical discharge manifold (≥2 ports)' }
                                ].map(item => (
                                    <button
                                        key={item.label}
                                        type="button"
                                        onClick={() => handleInsertSlot(insertionTarget.streamId, insertionTarget.insertIndex, item.type, item.label)}
                                        style={{
                                            padding: '0.6rem 0.5rem',
                                            borderRadius: '6px',
                                            border: '1px solid #bfdbfe',
                                            background: '#eff6ff',
                                            color: '#1d4ed8',
                                            fontSize: '0.8rem',
                                            fontWeight: 600,
                                            cursor: 'pointer',
                                            textAlign: 'center',
                                            transition: 'all 0.15s'
                                        }}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.background = '#dbeafe';
                                            e.currentTarget.style.borderColor = '#2563eb';
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.background = '#eff6ff';
                                            e.currentTarget.style.borderColor = '#bfdbfe';
                                        }}
                                    >
                                        <div>{item.label}</div>
                                        <div style={{ fontSize: '0.65rem', fontWeight: 400, color: '#3b82f6', marginTop: '2px' }}>
                                            {item.subtitle}
                                        </div>
                                    </button>
                                ))}
                            </div>
                                </>
                            )} {/* end !insertionTarget.isBranch */}

                            {/* Spools & Piping Fittings Section */}
                            <div style={{ fontSize: '0.72rem', fontWeight: 700, color: '#475569', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '0.4rem' }}>
                                Spools & Piping Fittings
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', marginBottom: '1rem' }}>
                                {[
                                    { label: 'Spool Piece', type: 'Spool Piece' },
                                    { label: 'Blind Flange', type: 'Blind Flange' },
                                    { label: 'Concentric Reducer', type: 'Concentric Reducer' },
                                    { label: '90° Elbow (Rotatable)', type: '90° Elbow' },
                                    { label: 'Cross Fitting (4-Way)', type: 'Cross' },
                                    { label: 'Tee Fitting (3-Way)', type: 'Tee' }
                                ].map(item => (
                                    <button
                                        key={item.label}
                                        type="button"
                                        onClick={() => handleInsertSlot(insertionTarget.streamId, insertionTarget.insertIndex, item.type, item.label)}
                                        style={{
                                            padding: '0.6rem 0.5rem',
                                            borderRadius: '6px',
                                            border: '1px solid #cbd5e1',
                                            background: '#f8fafc',
                                            color: '#1e293b',
                                            fontSize: '0.8rem',
                                            fontWeight: 600,
                                            cursor: 'pointer',
                                            textAlign: 'center',
                                            transition: 'all 0.15s'
                                        }}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.background = '#eff6ff';
                                            e.currentTarget.style.borderColor = '#2563eb';
                                            e.currentTarget.style.color = '#2563eb';
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.background = '#f8fafc';
                                            e.currentTarget.style.borderColor = '#cbd5e1';
                                            e.currentTarget.style.color = '#1e293b';
                                        }}
                                    >
                                        {item.label}
                                    </button>
                                ))}
                            </div>

                            {/* Valves & Actuation Section */}
                            <div style={{ fontSize: '0.72rem', fontWeight: 700, color: '#475569', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '0.4rem' }}>
                                Valve Equipment Types
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                                {ASSET_CATEGORY_LIST
                                    .filter(cat => cat !== 'Process Skid' && cat !== 'Wellhead Christmas Tree' && cat !== 'General Process Equipment' && cat !== 'End Suction Pump')
                                    .map(cat => (
                                        <button
                                            key={cat}
                                            type="button"
                                            onClick={() => handleInsertSlot(insertionTarget.streamId, insertionTarget.insertIndex, cat, cat)}
                                            style={{
                                                padding: '0.6rem 0.5rem',
                                                borderRadius: '6px',
                                                border: '1px solid #cbd5e1',
                                                background: '#f8fafc',
                                                color: '#1e293b',
                                                fontSize: '0.8rem',
                                                fontWeight: 600,
                                                cursor: 'pointer',
                                                textAlign: 'center',
                                                transition: 'all 0.15s'
                                            }}
                                            onMouseEnter={(e) => {
                                                e.currentTarget.style.background = '#eff6ff';
                                                e.currentTarget.style.borderColor = '#2563eb';
                                                e.currentTarget.style.color = '#2563eb';
                                            }}
                                            onMouseLeave={(e) => {
                                                e.currentTarget.style.background = '#f8fafc';
                                                e.currentTarget.style.borderColor = '#cbd5e1';
                                                e.currentTarget.style.color = '#1e293b';
                                            }}
                                        >
                                            {cat}
                                        </button>
                                    ))}
                            </div>
                        </div>

                        <div style={{ marginTop: '1.25rem', textAlign: 'right' }}>
                            <button
                                type="button"
                                onClick={() => setInsertionTarget(null)}
                                style={{
                                    padding: '0.45rem 1rem',
                                    borderRadius: '6px',
                                    border: '1px solid #cbd5e1',
                                    background: '#ffffff',
                                    color: '#475569',
                                    cursor: 'pointer',
                                    fontSize: '0.82rem'
                                }}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Modal: Create or Link Slot Record */}
            {activeSlotModal && (
                <div style={{
                    position: 'fixed',
                    top: 0, left: 0, right: 0, bottom: 0,
                    background: 'rgba(0,0,0,0.65)',
                    backdropFilter: 'blur(3px)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 2000,
                    padding: '1rem'
                }}>
                    <div style={{
                        background: '#ffffff',
                        borderRadius: '12px',
                        padding: '1.5rem',
                        maxWidth: '520px',
                        width: '100%',
                        boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)'
                    }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                            <div>
                                <h4 style={{ margin: 0, fontSize: '1.1rem', color: '#1e293b' }}>
                                    {modalMode === 'create' ? 'Create & Attach Equipment' : 'Link Existing Inventory Valve'}
                                </h4>
                                <div style={{ fontSize: '0.8rem', color: '#64748b' }}>
                                    Target Slot: <strong style={{ color: '#2563eb' }}>{activeSlotModal.label}</strong>
                                </div>
                            </div>
                            <button
                                type="button"
                                onClick={() => setActiveSlotModal(null)}
                                style={{ background: 'none', border: 'none', fontSize: '1.25rem', cursor: 'pointer', color: '#64748b' }}
                            >
                                ✕
                            </button>
                        </div>

                        {/* Mode Switcher */}
                        <div style={{ display: 'flex', borderBottom: '1px solid #e2e8f0', marginBottom: '1.25rem' }}>
                            <button
                                type="button"
                                onClick={() => setModalMode('create')}
                                style={{
                                    flex: 1,
                                    padding: '0.5rem',
                                    border: 'none',
                                    background: 'transparent',
                                    borderBottom: modalMode === 'create' ? '2px solid #2563eb' : 'none',
                                    color: modalMode === 'create' ? '#2563eb' : '#64748b',
                                    fontWeight: modalMode === 'create' ? 700 : 500,
                                    cursor: 'pointer',
                                    fontSize: '0.85rem'
                                }}
                            >
                                Create New Record
                            </button>
                            <button
                                type="button"
                                onClick={() => setModalMode('link')}
                                style={{
                                    flex: 1,
                                    padding: '0.5rem',
                                    border: 'none',
                                    background: 'transparent',
                                    borderBottom: modalMode === 'link' ? '2px solid #2563eb' : 'none',
                                    color: modalMode === 'link' ? '#2563eb' : '#64748b',
                                    fontWeight: modalMode === 'link' ? 700 : 500,
                                    cursor: 'pointer',
                                    fontSize: '0.85rem'
                                }}
                            >
                                Link From Inventory
                            </button>
                        </div>

                        {modalMode === 'create' ? (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                                <div>
                                    <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: '#374151', marginBottom: '0.25rem' }}>
                                        Tag Number *
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        value={newValveForm.tagNo}
                                        onChange={(e) => setNewValveForm({ ...newValveForm, tagNo: e.target.value })}
                                        style={{ width: '100%', padding: '0.5rem', borderRadius: '6px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }}
                                    />
                                </div>

                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                                    <div>
                                        <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: '#374151', marginBottom: '0.25rem' }}>
                                            Serial Number *
                                        </label>
                                        <input
                                            type="text"
                                            required
                                            placeholder="e.g. SN-SKID-01"
                                            value={newValveForm.serialNumber}
                                            onChange={(e) => setNewValveForm({ ...newValveForm, serialNumber: e.target.value })}
                                            style={{ width: '100%', padding: '0.5rem', borderRadius: '6px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }}
                                        />
                                    </div>
                                    <div>
                                        <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: '#374151', marginBottom: '0.25rem' }}>
                                            OEM / Manufacturer
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="e.g. Mokveld, FMC"
                                            value={newValveForm.oem}
                                            onChange={(e) => setNewValveForm({ ...newValveForm, oem: e.target.value })}
                                            style={{ width: '100%', padding: '0.5rem', borderRadius: '6px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }}
                                        />
                                    </div>
                                </div>

                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                                    <div>
                                        <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: '#374151', marginBottom: '0.25rem' }}>
                                            Equipment Type
                                        </label>
                                        <select
                                            value={newValveForm.valveType}
                                            onChange={(e) => setNewValveForm({ ...newValveForm, valveType: e.target.value })}
                                            style={{ width: '100%', padding: '0.5rem', borderRadius: '6px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }}
                                        >
                                            {ASSET_CATEGORY_LIST
                                                .filter(cat => cat !== 'Process Skid' && cat !== 'Wellhead Christmas Tree' && cat !== 'End Suction Pump')
                                                .map(cat => (
                                                    <option key={cat} value={cat}>
                                                        {cat === 'General Process Equipment' ? 'General Process Equipment (Spool / Header)' : cat}
                                                    </option>
                                                ))}
                                        </select>
                                    </div>
                                    <div>
                                        <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: '#374151', marginBottom: '0.25rem' }}>
                                            Size / Rating
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="e.g. 6-inch ANSI 600"
                                            value={newValveForm.sizeClass}
                                            onChange={(e) => setNewValveForm({ ...newValveForm, sizeClass: e.target.value })}
                                            style={{ width: '100%', padding: '0.5rem', borderRadius: '6px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }}
                                        />
                                    </div>
                                </div>

                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                                    <div>
                                        <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: '#374151', marginBottom: '0.25rem' }}>
                                            Last Cert Date
                                        </label>
                                        <input
                                            type="date"
                                            value={newValveForm.lastCertDate}
                                            onChange={(e) => setNewValveForm({ ...newValveForm, lastCertDate: e.target.value })}
                                            style={{ width: '100%', padding: '0.5rem', borderRadius: '6px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }}
                                        />
                                    </div>
                                    <div>
                                        <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: '#374151', marginBottom: '0.25rem' }}>
                                            Next Recert Date
                                        </label>
                                        <input
                                            type="date"
                                            value={newValveForm.nextCertDate}
                                            onChange={(e) => setNewValveForm({ ...newValveForm, nextCertDate: e.target.value })}
                                            style={{ width: '100%', padding: '0.5rem', borderRadius: '6px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }}
                                        />
                                    </div>
                                </div>

                                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem', marginTop: '1rem' }}>
                                    <button
                                        type="button"
                                        onClick={() => setActiveSlotModal(null)}
                                        style={{ padding: '0.5rem 1rem', borderRadius: '6px', border: '1px solid #cbd5e1', background: '#ffffff', cursor: 'pointer' }}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="button"
                                        disabled={isSubmitting}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            e.stopPropagation();
                                            handleCreateInSlot(e);
                                        }}
                                        style={{
                                            padding: '0.5rem 1.25rem',
                                            borderRadius: '6px',
                                            border: 'none',
                                            background: '#2563eb',
                                            color: '#ffffff',
                                            fontWeight: 600,
                                            cursor: 'pointer'
                                        }}
                                    >
                                        {isSubmitting ? 'Saving...' : 'Save & Attach'}
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                {unassignedValves.length === 0 ? (
                                    <div style={{ padding: '1.5rem', textAlign: 'center', background: '#f8fafc', borderRadius: '6px', color: '#64748b', fontSize: '0.85rem' }}>
                                        No unassigned inventory records found for customer <strong>{skidRecord?.customer || 'this organization'}</strong>.
                                    </div>
                                ) : (
                                    <div>
                                        <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#374151', marginBottom: '0.35rem' }}>
                                            Select Valve from Inventory:
                                        </label>
                                        <select
                                            value={selectedValveToLink}
                                            onChange={(e) => setSelectedValveToLink(e.target.value)}
                                            style={{ width: '100%', padding: '0.6rem', borderRadius: '6px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }}
                                        >
                                            {unassignedValves.map(v => (
                                                <option key={v.id} value={v.id}>
                                                    {v.tagNo || v.tag_no} — {v.valveType || v.valve_type} ({v.serialNumber || v.serial_number || 'No SN'})
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                )}

                                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem', marginTop: '1rem' }}>
                                    <button
                                        type="button"
                                        onClick={() => setActiveSlotModal(null)}
                                        style={{ padding: '0.5rem 1rem', borderRadius: '6px', border: '1px solid #cbd5e1', background: '#ffffff', cursor: 'pointer' }}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="button"
                                        disabled={isSubmitting || unassignedValves.length === 0}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            e.stopPropagation();
                                            handleLinkValve(e);
                                        }}
                                        style={{
                                            padding: '0.5rem 1.25rem',
                                            borderRadius: '6px',
                                            border: 'none',
                                            background: '#2563eb',
                                            color: '#ffffff',
                                            fontWeight: 600,
                                            cursor: unassignedValves.length === 0 ? 'not-allowed' : 'pointer',
                                            opacity: unassignedValves.length === 0 ? 0.6 : 1
                                        }}
                                    >
                                        {isSubmitting ? 'Linking...' : 'Attach Component'}
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* Modal: Duplicate Process Stream Picker */}
            {streamToDuplicatePicker && (
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'rgba(15, 23, 42, 0.65)',
                    backdropFilter: 'blur(4px)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 1000,
                    padding: '1rem'
                }}>
                    <div style={{
                        background: '#ffffff',
                        borderRadius: '12px',
                        width: '100%',
                        maxWidth: '460px',
                        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.2), 0 10px 10px -5px rgba(0, 0, 0, 0.1)',
                        padding: '1.5rem',
                        boxSizing: 'border-box'
                    }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', borderBottom: '1px solid #e2e8f0', paddingBottom: '0.75rem' }}>
                            <div>
                                <h3 style={{ margin: 0, fontSize: '1.15rem', fontWeight: 700, color: '#0f172a' }}>
                                    Duplicate Process Stream
                                </h3>
                                <p style={{ margin: '0.2rem 0 0', fontSize: '0.8rem', color: '#64748b' }}>
                                    Select which existing stream template configuration to copy
                                </p>
                            </div>
                            <button
                                type="button"
                                onClick={() => setStreamToDuplicatePicker(null)}
                                style={{
                                    border: 'none',
                                    background: 'transparent',
                                    fontSize: '1.4rem',
                                    lineHeight: 1,
                                    cursor: 'pointer',
                                    color: '#94a3b8'
                                }}
                            >
                                &times;
                            </button>
                        </div>

                        <div style={{ marginBottom: '1.5rem' }}>
                            <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: '#374151', marginBottom: '0.5rem' }}>
                                Stream to Copy:
                            </label>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                {(skidSpec.streams || []).map((stream) => {
                                    const isSelected = streamToDuplicatePicker.selectedStreamId === stream.id;
                                    return (
                                        <div
                                            key={stream.id}
                                            onClick={() => setStreamToDuplicatePicker({ selectedStreamId: stream.id })}
                                            style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'space-between',
                                                padding: '0.75rem 1rem',
                                                borderRadius: '8px',
                                                border: isSelected ? '2px solid #2563eb' : '1px solid #e2e8f0',
                                                background: isSelected ? '#eff6ff' : '#ffffff',
                                                cursor: 'pointer',
                                                transition: 'all 0.15s ease'
                                            }}
                                        >
                                            <div>
                                                <div style={{ fontWeight: 600, fontSize: '0.88rem', color: isSelected ? '#1d4ed8' : '#0f172a' }}>
                                                    {stream.label}
                                                </div>
                                                <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '0.15rem' }}>
                                                    {stream.slots.length} component slot{stream.slots.length === 1 ? '' : 's'}
                                                    {stream.slots.length > 0 && ` (${stream.slots.map(s => s.label).slice(0, 3).join(', ')}${stream.slots.length > 3 ? '...' : ''})`}
                                                </div>
                                            </div>
                                            <input
                                                type="radio"
                                                name="streamToDuplicate"
                                                checked={isSelected}
                                                onChange={() => setStreamToDuplicatePicker({ selectedStreamId: stream.id })}
                                                style={{ cursor: 'pointer' }}
                                            />
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.6rem' }}>
                            <button
                                type="button"
                                onClick={() => setStreamToDuplicatePicker(null)}
                                style={{
                                    padding: '0.55rem 1rem',
                                    borderRadius: '6px',
                                    border: '1px solid #cbd5e1',
                                    background: '#ffffff',
                                    color: '#475569',
                                    fontWeight: 500,
                                    fontSize: '0.85rem',
                                    cursor: 'pointer'
                                }}
                            >
                                Cancel
                            </button>
                            <button
                                type="button"
                                onClick={() => duplicateStream(streamToDuplicatePicker.selectedStreamId)}
                                style={{
                                    padding: '0.55rem 1.25rem',
                                    borderRadius: '6px',
                                    border: 'none',
                                    background: '#2563eb',
                                    color: '#ffffff',
                                    fontWeight: 600,
                                    fontSize: '0.85rem',
                                    cursor: 'pointer',
                                    boxShadow: '0 2px 4px rgba(37, 99, 235, 0.2)'
                                }}
                            >
                                Duplicate Stream
                            </button>
                        </div>
                    </div>
                </div>
            )}
            <PIDVisualizerModal
                isOpen={isPIDOpen}
                onClose={() => setIsPIDOpen(false)}
                skidSpec={skidSpec}
            />
        </div>
    );
};

import React, { useState } from 'react';
import { generatePIDLayout } from './pidLayoutEngine';
import {
    ControlValveSymbol,
    GlobeValveSymbol,
    GateValveSymbol,
    BallValveSymbol,
    ButterflyValveSymbol,
    SpoolSymbol,
    CheckValveSymbol,
    SafetyValveSymbol,
    PumpSymbol,
    StrainerSymbol,
    TeeSymbol,
    CrossSymbol,
    ElbowSymbol,
    PlugValveSymbol,
    ChokeValveSymbol,
    ReducerSymbol,
    BlindFlangeSymbol
} from './PIDSymbolLibrary';

export const PIDVisualizerModal = ({ isOpen, onClose, skidSpec }) => {
    const [zoom, setZoom] = useState(1);
    const [pan, setPan] = useState({ x: 0, y: 0 });
    const [isDragging, setIsDragging] = useState(false);
    const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

    if (!isOpen) return null;

    const layout = generatePIDLayout(skidSpec);

    const handleMouseDown = (e) => {
        setIsDragging(true);
        setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
    };

    const handleMouseMove = (e) => {
        if (!isDragging) return;
        setPan({ x: e.clientX - dragStart.x, y: e.clientY - dragStart.y });
    };

    const handleMouseUp = () => setIsDragging(false);

    const renderSymbolNode = (node) => {
        const role = (node.role || '').toLowerCase();
        const type = (node.valveType || '').toLowerCase();

        let element = null;
        if (role.includes('tee') || type.includes('tee')) {
            element = <TeeSymbol x={node.x} y={node.y} rotation={node.rotation || 0} tag={node.tag} />;
        } else if (role.includes('cross') || type.includes('cross')) {
            element = <CrossSymbol x={node.x} y={node.y} tag={node.tag} />;
        } else if (role.includes('elbow') || type.includes('elbow')) {
            element = (
                <ElbowSymbol
                    x={node.x}
                    y={node.y}
                    rotation={node.rotation || 0}
                    isBranchNode={!!node.isBranchNode}
                    isBranchUp={!!node.isBranchUp}
                    tag={node.tag}
                />
            );
        } else if (role.includes('reducer') || type.includes('reducer')) {
            element = <ReducerSymbol x={node.x} y={node.y} tag={node.tag} />;
        } else if (role.includes('blind') || type.includes('blind')) {
            const isVert = (typeof node.flowDirY === 'number' && typeof node.flowDirX === 'number')
                ? (node.flowDirY !== 0 && node.flowDirX === 0)
                : (node.isBranchNode ? !node.isHorizontalBranch : false);
            element = <BlindFlangeSymbol x={node.x} y={node.y} tag={node.tag} isVertical={isVert} />;
        } else if (role.includes('spool') || type.includes('spool')) {
            element = <SpoolSymbol x={node.x} y={node.y} tag={node.tag} />;
        } else if (role.includes('butterfly') || type.includes('butterfly')) {
            element = <ButterflyValveSymbol x={node.x} y={node.y} tag={node.tag} />;
        } else if (role.includes('plug') || type.includes('plug')) {
            element = <PlugValveSymbol x={node.x} y={node.y} />;
        } else if (role.includes('ball') || type.includes('ball')) {
            element = <BallValveSymbol x={node.x} y={node.y} />;
        } else if (role.includes('gate') || type.includes('gate')) {
            element = <GateValveSymbol x={node.x} y={node.y} />;
        } else if (role.includes('check') || type.includes('check')) {
            element = <CheckValveSymbol x={node.x} y={node.y} />;
        } else if (role.includes('safety') || role.includes('relief') || type.includes('safety') || type.includes('relief') || type.includes('psv')) {
            // Determine Left vs Right outlet based on explicit slot config or rotation angle
            // 0° / 90° -> Left outlet, 180° / 270° -> Right outlet
            const rot = node.rotation || node.slot?.rotation || 0;
            const side = node.slot?.outletSide || (rot === 180 || rot === 270 ? 'right' : 'left');
            element = <SafetyValveSymbol x={node.x} y={node.y} tag={node.tag} outletSide={side} />;
        } else if (role.includes('choke') || type.includes('choke')) {
            const isAdj = role.includes('adjustable') || type.includes('adjustable');
            const rot = node.rotation || node.slot?.rotation || 0;
            const isFlipped = rot === 180 || rot === 270;

            let inletSide = 'bottom';
            let outletSide = 'right';

            if (node.isBranchNode && node.isHorizontalBranch) {
                // Horizontal branch (Flow coming from Left or Right)
                inletSide = node.flowDirX < 0 ? 'right' : 'left';
                outletSide = isFlipped ? 'bottom' : 'top';
            } else if (node.isBranchNode && !node.isHorizontalBranch) {
                // Vertical branch (Flow coming from Top or Bottom)
                inletSide = node.flowDirY > 0 ? 'top' : 'bottom';
                outletSide = isFlipped ? 'left' : 'right';
            } else {
                // Main stream line (Flow coming from Left)
                inletSide = 'left';
                outletSide = isFlipped ? 'bottom' : 'top';
            }

            element = <ChokeValveSymbol x={node.x} y={node.y} tag={node.tag} isAdjustable={isAdj} inletSide={inletSide} outletSide={outletSide} />;
        } else if (role.includes('control') || type.includes('control')) {
            element = <ControlValveSymbol x={node.x} y={node.y} tag={node.tag} />;
        } else if (role.includes('pump') || type.includes('pump')) {
            element = <PumpSymbol x={node.x} y={node.y} label={node.tag} />;
        } else if (role.includes('strainer') || type.includes('filter')) {
            element = <StrainerSymbol x={node.x} y={node.y} />;
        } else {
            element = <GlobeValveSymbol x={node.x} y={node.y} />;
        }

        // Rotate vertical branch valves/pumps 90 degrees so pipe line passes through their centerline.
        // Horizontal branch nodes, fittings (Tees, Elbows), Chokes, and Safety/Relief valves handle their own orientation.
        const isFittings = role.includes('tee') || type.includes('tee') || role.includes('elbow') || type.includes('elbow');
        const isSafetyValve = role.includes('safety') || role.includes('relief') || type.includes('safety') || type.includes('relief') || type.includes('psv');
        const isChokeValve = role.includes('choke') || type.includes('choke');
        if (node.isBranchNode && !isFittings && !isSafetyValve && !isChokeValve && !node.isHorizontalBranch) {
            return (
                <g transform={`rotate(90, ${node.x}, ${node.y})`}>
                    {element}
                </g>
            );
        }

        return element;
    };

    return (
        <div style={{
            position: 'fixed', inset: 0, zIndex: 9999,
            backgroundColor: 'rgba(15, 23, 42, 0.95)',
            display: 'flex', flexDirection: 'column'
        }}>
            {/* Header */}
            <div style={{
                padding: '16px 24px', backgroundColor: '#1e293b', borderBottom: '1px solid #334155',
                display: 'flex', justifyContent: 'space-between', alignItems: 'center'
            }}>
                <div>
                    <h2 style={{ margin: 0, color: '#f8fafc', fontSize: '18px', fontWeight: 'bold' }}>
                        📊 Process Skid P&ID Schematic (ISA-5.1)
                    </h2>
                    <span style={{ color: '#94a3b8', fontSize: '12px' }}>
                        {skidSpec?.streams?.length || 0} Process Streams • Manifold Headers & Branch Chains
                    </span>
                </div>
                <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                    <button type="button" onClick={() => setZoom(z => Math.min(z + 0.2, 3))} style={btnStyle}>➕ Zoom In</button>
                    <button type="button" onClick={() => setZoom(z => Math.max(z - 0.2, 0.4))} style={btnStyle}>➖ Zoom Out</button>
                    <button type="button" onClick={() => { setZoom(1); setPan({ x: 0, y: 0 }); }} style={btnStyle}>🎯 Reset</button>
                    <button type="button" aria-label="close" onClick={onClose} style={{ ...btnStyle, backgroundColor: '#ef4444' }}>✕ Close</button>
                </div>
            </div>

            {/* SVG Canvas Area */}
            <div
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                style={{ flex: 1, cursor: isDragging ? 'grabbing' : 'grab', overflow: 'hidden', position: 'relative' }}
            >
                <svg
                    width="100%" height="100%"
                    viewBox={`0 ${(layout.minY || 0) < 0 ? (layout.minY - 40) : 0} ${layout.totalWidth} ${layout.totalHeight}`}
                    style={{
                        transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
                        transformOrigin: '0 0',
                        transition: isDragging ? 'none' : 'transform 0.1s ease-out'
                    }}
                >
                    {/* Grid Background */}
                    <defs>
                        <pattern id="pidGrid" width="40" height="40" patternUnits="userSpaceOnUse">
                            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#1e293b" strokeWidth="0.5" />
                        </pattern>
                    </defs>
                    <rect x="-1000" y="-1000" width="10000" height="10000" fill="url(#pidGrid)" />

                    {/* Process Lines */}
                    {layout.lines.map(line => (
                        <line
                            key={line.id}
                            x1={line.x1} y1={line.y1}
                            x2={line.x2} y2={line.y2}
                            stroke={line.style === 'header' ? '#38bdf8' : line.style === 'branch' ? '#38bdf8' : '#38bdf8'}
                            strokeWidth={line.style === 'header' ? '6' : line.style === 'branch' ? '3' : '3.5'}
                            strokeLinecap="round"
                        />
                    ))}

                    {/* Manifold Header Badges */}
                    {(layout.headers || []).map(hdr => (
                        <g key={hdr.type} transform={`translate(${hdr.x}, ${hdr.yMin - 15})`}>
                            <rect x="-60" y="-14" width="120" height="24" rx="4" fill="#0f172a" stroke="#38bdf8" strokeWidth="1.5" />
                            <text textAnchor="middle" y="2" fill="#38bdf8" fontSize="11" fontWeight="bold">
                                {hdr.label}
                            </text>
                        </g>
                    ))}

                    {/* Stream Symbols & Nodes */}
                    {layout.streams.map(stream => (
                        <g key={stream.id}>
                            {stream.nodes.map(node => (
                                <g key={node.id || node.x}>
                                    {node.type === 'inlet_label' && (
                                        <g transform={`translate(${node.x}, ${node.y})`}>
                                            <polygon points="-10,-12 10,0 -10,12" fill="#38bdf8" />
                                            <text x="-18" y="4" textAnchor="end" fill="#38bdf8" fontSize="12" fontWeight="bold">{node.label}</text>
                                        </g>
                                    )}
                                    {node.type === 'outlet_label' && (
                                        <g transform={`translate(${node.x}, ${node.y})`}>
                                            <polygon points="-10,-12 10,0 -10,12" fill="#10b981" />
                                            <text x="18" y="4" textAnchor="start" fill="#10b981" fontSize="12" fontWeight="bold">{node.label}</text>
                                        </g>
                                    )}
                                    {!node.type && renderSymbolNode(node)}
                                </g>
                            ))}
                        </g>
                    ))}
                </svg>
            </div>
        </div>
    );
};

const btnStyle = {
    backgroundColor: '#334155', color: '#f8fafc', border: 'none',
    padding: '8px 14px', borderRadius: '6px', cursor: 'pointer',
    fontSize: '13px', fontWeight: '500'
};

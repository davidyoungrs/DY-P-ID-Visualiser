import React from 'react';

export const ControlValveSymbol = ({ x = 0, y = 0, size = 32, tag }) => (
    <g transform={`translate(${x}, ${y})`}>
        {/* Globe Body */}
        <polygon points={`-${size/2},-${size/3} -${size/2},${size/3} ${size/2},-${size/3} ${size/2},${size/3}`} fill="#1e293b" stroke="#38bdf8" strokeWidth="2" />
        {/* Stem & Diaphragm Actuator */}
        <line x1="0" y1="0" x2="0" y2={-size/1.2} stroke="#38bdf8" strokeWidth="2" />
        <path d={`M -${size/2.5},-${size/1.2} A ${size/2.5} ${size/4} 0 0 1 ${size/2.5},-${size/1.2} Z`} fill="#0f172a" stroke="#38bdf8" strokeWidth="2" />
        {tag && (
            <g transform={`translate(0, ${-size * 1.6})`}>
                <circle r={size/2.2} fill="#0f172a" stroke="#38bdf8" strokeWidth="1.5" />
                <text textAnchor="middle" dy="4" fill="#f8fafc" fontSize="10" fontWeight="bold">{tag}</text>
            </g>
        )}
    </g>
);

export const GlobeValveSymbol = ({ x = 0, y = 0, size = 28 }) => (
    <g transform={`translate(${x}, ${y})`}>
        <polygon points={`-${size/2},-${size/3} -${size/2},${size/3} ${size/2},-${size/3} ${size/2},${size/3}`} fill="#1e293b" stroke="#f8fafc" strokeWidth="2" />
        <circle r={size/6} fill="#38bdf8" />
        <line x1="0" y1="0" x2="0" y2={-size/1.5} stroke="#f8fafc" strokeWidth="2" />
        <line x1={-size/3} y1={-size/1.5} x2={size/3} y2={-size/1.5} stroke="#f8fafc" strokeWidth="2" />
    </g>
);

export const GateValveSymbol = ({ x = 0, y = 0, size = 28 }) => (
    <g transform={`translate(${x}, ${y})`}>
        <polygon points={`-${size/2},-${size/3} -${size/2},${size/3} ${size/2},-${size/3} ${size/2},${size/3}`} fill="#1e293b" stroke="#f8fafc" strokeWidth="2" />
        <line x1="0" y1="0" x2="0" y2={-size/1.5} stroke="#f8fafc" strokeWidth="2" />
        <line x1={-size/3} y1={-size/1.5} x2={size/3} y2={-size/1.5} stroke="#f8fafc" strokeWidth="2" />
    </g>
);

export const BallValveSymbol = ({ x = 0, y = 0, size = 28 }) => (
    <g transform={`translate(${x}, ${y})`}>
        <polygon points={`-${size/2},-${size/3} -${size/2},${size/3} ${size/2},-${size/3} ${size/2},${size/3}`} fill="#1e293b" stroke="#f8fafc" strokeWidth="2" />
        <circle r={size/4} fill="#38bdf8" stroke="#f8fafc" strokeWidth="1" />
    </g>
);

export const ButterflyValveSymbol = ({ x = 0, y = 0, size = 28, tag }) => (
    <g transform={`translate(${x}, ${y})`}>
        {/* Opposing triangles body */}
        <polygon points={`-${size/2},-${size/3} -${size/2},${size/3} ${size/2},-${size/3} ${size/2},${size/3}`} fill="#1e293b" stroke="#f8fafc" strokeWidth="2" />
        {/* Butterfly rotating disc line diagonal through center */}
        <line x1={-size/4} y1={-size/2.5} x2={size/4} y2={size/2.5} stroke="#38bdf8" strokeWidth="2.5" strokeLinecap="round" />
        {/* Hand lever stem */}
        <line x1="0" y1="0" x2="0" y2={-size/1.5} stroke="#f8fafc" strokeWidth="2" />
        <line x1={-size/3} y1={-size/1.5} x2={size/3} y2={-size/1.5} stroke="#f8fafc" strokeWidth="2" />
        {tag && (
            <text x="0" y={size/1.2} textAnchor="middle" fill="#94a3b8" fontSize="9" fontWeight="500">{tag}</text>
        )}
    </g>
);

export const SpoolSymbol = ({ x = 0, y = 0, size = 36, tag }) => (
    <g transform={`translate(${x}, ${y})`}>
        {/* Main spool pipe section */}
        <line x1={-size/2} y1="0" x2={size/2} y2="0" stroke="#38bdf8" strokeWidth="4" />
        {/* Left Flange Pair (||) */}
        <line x1={-size/2 - 2} y1={-size/3} x2={-size/2 - 2} y2={size/3} stroke="#f8fafc" strokeWidth="2.5" />
        <line x1={-size/2 + 2} y1={-size/3} x2={-size/2 + 2} y2={size/3} stroke="#f8fafc" strokeWidth="2.5" />
        {/* Right Flange Pair (||) */}
        <line x1={size/2 - 2} y1={-size/3} x2={size/2 - 2} y2={size/3} stroke="#f8fafc" strokeWidth="2.5" />
        <line x1={size/2 + 2} y1={-size/3} x2={size/2 + 2} y2={size/3} stroke="#f8fafc" strokeWidth="2.5" />
        {tag && (
            <text x="0" y={size/1.5} textAnchor="middle" fill="#94a3b8" fontSize="9" fontWeight="500">{tag}</text>
        )}
    </g>
);

export const CheckValveSymbol = ({ x = 0, y = 0, size = 28 }) => (
    <g transform={`translate(${x}, ${y})`}>
        <polygon points={`-${size/2},-${size/3} -${size/2},${size/3} ${size/2},0`} fill="#38bdf8" stroke="#f8fafc" strokeWidth="2" />
        <line x1={size/2} y1={-size/3} x2={size/2} y2={size/3} stroke="#f8fafc" strokeWidth="2" />
    </g>
);

export const SafetyValveSymbol = ({ x = 0, y = 0, size = 32, tag = 'PSV', outletSide = 'left' }) => {
    const isRight = outletSide === 'right';
    const sideSign = isRight ? 1 : -1;

    return (
        <g transform={`translate(${x}, ${y})`}>
            {/* Bottom Inlet Triangle (pointing up towards valve center) */}
            <polygon points={`-${size/3},${size/2} ${size/3},${size/2} 0,0`} fill="#1e293b" stroke="#ef4444" strokeWidth="2" />
            
            {/* Outlet Triangle (pointing Left or Right from valve center) */}
            <polygon points={`0,0 ${sideSign * size/2},-${size/3} ${sideSign * size/2},${size/3}`} fill="#1e293b" stroke="#ef4444" strokeWidth="2" />
            
            {/* Top Stem Rod */}
            <line x1="0" y1="0" x2="0" y2={-size/1.1} stroke="#ef4444" strokeWidth="2" />
            
            {/* Top Spring Hatching Lines (4 sloped parallel bars) */}
            <g transform={`translate(0, -${size/1.6})`}>
                <line x1={-size/4} y1={size/6} x2={size/4} y2={-size/6} stroke="#ef4444" strokeWidth="2" />
                <line x1={-size/4} y1={0} x2={size/4} y2={-size/3} stroke="#ef4444" strokeWidth="2" />
                <line x1={-size/4} y1={-size/6} x2={size/4} y2={-size/2} stroke="#ef4444" strokeWidth="2" />
                <line x1={-size/4} y1={-size/3} x2={size/4} y2={-size/1.5} stroke="#ef4444" strokeWidth="2" />
            </g>

            {tag && (
                <text x="0" y={-size * 1.3} textAnchor="middle" fill="#ef4444" fontSize="10" fontWeight="bold">{tag}</text>
            )}
        </g>
    );
};

export const PumpSymbol = ({ x = 0, y = 0, size = 40, label = 'P-101' }) => (
    <g transform={`translate(${x}, ${y})`}>
        <circle r={size/2} fill="#1e293b" stroke="#38bdf8" strokeWidth="2.5" />
        <polygon points={`0,-${size/2} ${size/2},${size/4} -${size/2},${size/4}`} fill="#38bdf8" opacity="0.6" />
        <text y={size/1.4} textAnchor="middle" fill="#f8fafc" fontSize="10" fontWeight="bold">{label}</text>
    </g>
);

export const StrainerSymbol = ({ x = 0, y = 0, size = 28 }) => (
    <g transform={`translate(${x}, ${y})`}>
        <polygon points={`-${size/2},-${size/3} ${size/2},-${size/3} 0,${size/2}`} fill="#1e293b" stroke="#38bdf8" strokeWidth="2" />
        <line x1={-size/3} y1="0" x2={size/3} y2="0" stroke="#38bdf8" strokeWidth="1.5" strokeDasharray="2,2" />
    </g>
);

export const InstrumentBubble = ({ x = 0, y = 0, tag = 'PT-101', size = 24 }) => (
    <g transform={`translate(${x}, ${y})`}>
        <circle r={size/2} fill="#0f172a" stroke="#38bdf8" strokeWidth="1.5" />
        <text textAnchor="middle" dy="3" fill="#38bdf8" fontSize="9" fontWeight="bold">{tag}</text>
    </g>
);

export const TeeSymbol = ({ x = 0, y = 0, size = 24, rotation = 0, tag }) => {
    return (
        <g transform={`translate(${x}, ${y})`}>
            <circle r={size / 5} fill="#38bdf8" stroke="#f8fafc" strokeWidth="1" />
            {tag && (
                <text x="0" y={size / 1.5} textAnchor="middle" fill="#94a3b8" fontSize="9" fontWeight="500">{tag}</text>
            )}
        </g>
    );
};

export const ElbowSymbol = ({ x = 0, y = 0, size = 24, rotation = 0, tag }) => {
    // Exact 1-to-1 match with Skid Builder SVG icon (12 4 v 4 a 8 8 0 0 0 8 8 h 4):
    // Unrotated (0°): Starts at Top (0, -size/2), goes down, curves Right to (size/2, 0).
    // Rotated 90°:   Starts at Right (size/2, 0), curves Down to (0, size/2).
    // Rotated 180°:  Starts at Bottom (0, size/2), curves Left to (-size/2, 0).
    // Rotated 270°:  Starts at Left (-size/2, 0), curves Up to (0, -size/2).

    return (
        <g transform={`translate(${x}, ${y}) rotate(${rotation})`}>
            {/* 0° arc: Top (0, -size/2) -> Right (size/2, 0) */}
            <path
                d={`M 0,-${size/2} L 0,-${size/6} A ${size/3} ${size/3} 0 0 0 ${size/6},0 L ${size/2},0`}
                fill="none"
                stroke="#38bdf8"
                strokeWidth="3.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <circle cx="0" cy={-size/2} r="3" fill="#38bdf8" stroke="#f8fafc" strokeWidth="1" />
            <circle cx={size/2} cy="0" r="3" fill="#38bdf8" stroke="#f8fafc" strokeWidth="1" />
            {tag && (
                <text x="0" y={size/1.2} textAnchor="middle" fill="#94a3b8" fontSize="9" fontWeight="500" transform={`rotate(${-rotation})`}>{tag}</text>
            )}
        </g>
    );
};

export const PlugValveSymbol = ({ x = 0, y = 0, size = 28 }) => (
    <g transform={`translate(${x}, ${y})`}>
        <polygon points={`-${size/2},-${size/3} -${size/2},${size/3} ${size/2},-${size/3} ${size/2},${size/3}`} fill="#1e293b" stroke="#f8fafc" strokeWidth="2" />
        <rect x={-size/6} y={-size/3} width={size/3} height={size/1.5} fill="#38bdf8" opacity="0.9" rx="1" />
    </g>
);

export const ChokeValveSymbol = ({ x = 0, y = 0, size = 28, rotation = 0, tag, isAdjustable = false, inletSide = 'bottom', outletSide = 'right' }) => {
    // Both inlet and outlet triangle tips ALWAYS point inward toward center (0, 0)
    // Stem/actuator sits on the side opposite the outlet triangle
    let stemX = 0;
    let stemY = 0;

    // Inlet triangle coordinates
    let inP1 = `-${size/3},${size/2}`, inP2 = `${size/3},${size/2}`;
    if (inletSide === 'top') {
        inP1 = `-${size/3},-${size/2}`; inP2 = `${size/3},-${size/2}`;
    } else if (inletSide === 'left') {
        inP1 = `-${size/2},-${size/3}`; inP2 = `-${size/2},${size/3}`;
    } else if (inletSide === 'right') {
        inP1 = `${size/2},-${size/3}`; inP2 = `${size/2},${size/3}`;
    }

    // Outlet triangle coordinates
    let outP1 = `${size/2},-${size/3}`, outP2 = `${size/2},${size/3}`;
    if (outletSide === 'left') {
        outP1 = `-${size/2},-${size/3}`; outP2 = `-${size/2},${size/3}`;
        stemX = size / 1.5; stemY = 0;
    } else if (outletSide === 'right') {
        outP1 = `${size/2},-${size/3}`; outP2 = `${size/2},${size/3}`;
        stemX = -size / 1.5; stemY = 0;
    } else if (outletSide === 'top') {
        outP1 = `-${size/3},-${size/2}`; outP2 = `${size/3},-${size/2}`;
        stemX = 0; stemY = size / 1.5;
    } else if (outletSide === 'bottom') {
        outP1 = `-${size/3},${size/2}`; outP2 = `${size/3},${size/2}`;
        stemX = 0; stemY = -size / 1.5;
    }

    return (
        <g transform={`translate(${x}, ${y})`}>
            {/* Inlet Triangle: Base on incoming line, tip pointing inward to center (0,0) */}
            <polygon points={`${inP1} ${inP2} 0,0`} fill="#1e293b" stroke="#f8fafc" strokeWidth="2" />
            {/* Outlet Triangle: Base on outgoing line, tip pointing inward to center (0,0) */}
            <polygon points={`${outP1} ${outP2} 0,0`} fill="#1e293b" stroke="#f8fafc" strokeWidth="2" />
            {/* Center Choke Orifice Trim */}
            <circle cx="0" cy="0" r={size/6} fill="#38bdf8" stroke="#f8fafc" strokeWidth="1" />
            {/* Adjustable Stem / Handwheel opposite outlet */}
            {isAdjustable && (
                <>
                    <line x1="0" y1="0" x2={stemX} y2={stemY} stroke="#f8fafc" strokeWidth="1.5" />
                    {stemX !== 0 && (
                        <polygon points={`${stemX},-${size/4} ${stemX},${size/4} ${stemX + (stemX > 0 ? -size/6 : size/6)},0`} fill="#38bdf8" stroke="#f8fafc" strokeWidth="1" />
                    )}
                    {stemY !== 0 && (
                        <polygon points={`-${size/4},${stemY} ${size/4},${stemY} 0,${stemY + (stemY > 0 ? -size/6 : size/6)}`} fill="#38bdf8" stroke="#f8fafc" strokeWidth="1" />
                    )}
                </>
            )}
            {tag && (
                <text x="0" y={size/1.1} textAnchor="middle" fill="#94a3b8" fontSize="9" fontWeight="500">{tag}</text>
            )}
        </g>
    );
};

export const CrossSymbol = ({ x = 0, y = 0, size = 24, tag }) => (
    <g transform={`translate(${x}, ${y})`}>
        <circle r={size / 4} fill="#38bdf8" stroke="#f8fafc" strokeWidth="1.5" />
        {tag && (
            <text x="0" y={size / 1.4} textAnchor="middle" fill="#94a3b8" fontSize="9" fontWeight="500">{tag}</text>
        )}
    </g>
);

export const ReducerSymbol = ({ x = 0, y = 0, size = 32, tag }) => (
    <g transform={`translate(${x}, ${y})`}>
        {/* Concentric Reducer: Trapezoid pipe section */}
        <polygon points={`-${size/2},-${size/3} -${size/2},${size/3} ${size/2},${size/5} ${size/2},-${size/5}`} fill="#1e293b" stroke="#38bdf8" strokeWidth="2" />
        {tag && (
            <text x="0" y={size/1.3} textAnchor="middle" fill="#94a3b8" fontSize="9" fontWeight="500">{tag}</text>
        )}
    </g>
);

export const BlindFlangeSymbol = ({ x = 0, y = 0, size = 24, tag, isVertical = false }) => (
    <g transform={`translate(${x}, ${y}) ${isVertical ? 'rotate(90)' : ''}`}>
        {/* Flange Cap Bar with Bolt cross-hatch */}
        <rect x={-size/6} y={-size/2} width={size/3} height={size} fill="#0f172a" stroke="#ef4444" strokeWidth="2" rx="1" />
        <line x1={-size/6} y1={-size/2} x2={size/6} y2={size/2} stroke="#ef4444" strokeWidth="1.5" />
        <line x1={-size/6} y1={size/2} x2={size/6} y2={-size/2} stroke="#ef4444" strokeWidth="1.5" />
        {tag && (
            <text x="0" y={size/1.2} textAnchor="middle" fill="#ef4444" fontSize="9" fontWeight="500" transform={isVertical ? 'rotate(-90)' : ''}>{tag}</text>
        )}
    </g>
);


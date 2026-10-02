import test from 'node:test';
import assert from 'node:assert/strict';
import { generatePIDLayout } from '../pidLayoutEngine.js';

test('Extreme Complex Skid Topology & Clash Detection Suite', async (t) => {

    await t.test('1. Deeply Nested Branch Chains (4 Levels Deep) - No Coordinate Overlaps', () => {
        const extremeSpec = {
            inletHeader: { label: 'INLET' },
            outletHeader: { label: 'OUTLET' },
            streams: [
                {
                    id: 'stream_1',
                    label: 'Stream 1',
                    slots: [
                        {
                            id: 'slot_cross_1',
                            role: 'cross',
                            label: 'Cross Fitting',
                            branchSlots: [
                                {
                                    id: 'b1_gate',
                                    role: 'gate',
                                    label: 'Gate Valve 1',
                                    portDirection: 'top',
                                    branchSlots: [
                                        {
                                            id: 'b2_choke',
                                            role: 'adjustable_choke',
                                            label: 'Choke Valve 2',
                                            branchSlots: [
                                                {
                                                    id: 'b3_spool',
                                                    role: 'spool',
                                                    label: 'Spool 3',
                                                    branchSlots: [
                                                        {
                                                            id: 'b4_tee',
                                                            role: 'tee',
                                                            label: 'Tee 4',
                                                            rotation: 90
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
                }
            ]
        };

        const layout = generatePIDLayout(extremeSpec);

        assert.ok(layout.streams.length > 0);
        assert.ok(layout.lines.length > 0);

        // Verify all rendered nodes have unique (x, y) locations (Zero Clashes)
        const coords = new Set();
        const nodes = layout.streams[0].nodes.filter(n => !n.type); // Filter symbol nodes

        nodes.forEach(n => {
            const key = `${n.x},${n.y}`;
            assert.equal(coords.has(key), false, `Clash detected at coordinate (${key}) for node ${n.id}`);
            coords.add(key);
        });
    });

    await t.test('2. Elbow Rotations (0°, 90°, 180°, 270°) Correctly Direct 2D Vectors', () => {
        const rotations = [0, 90, 180, 270];

        rotations.forEach(rot => {
            const spec = {
                streams: [
                    {
                        id: 'stream_elbow',
                        slots: [
                            {
                                id: `elbow_${rot}`,
                                role: 'elbow',
                                rotation: rot,
                                branchSlots: [
                                    {
                                        id: `child_${rot}`,
                                        role: 'ball',
                                        label: 'Ball Valve'
                                    }
                                ]
                            }
                        ]
                    }
                ]
            };

            const layout = generatePIDLayout(spec);
            const parentNode = layout.streams[0].nodes.find(n => n.id === `elbow_${rot}`);
            const childNode = layout.streams[0].nodes.find(n => n.id === `child_${rot}`);

            assert.ok(parentNode, `Parent node missing for rotation ${rot}`);
            assert.ok(childNode, `Child node missing for rotation ${rot}`);

            if (rot === 0) {
                // Up (-Y)
                assert.ok(childNode.y < parentNode.y);
                assert.equal(childNode.x, parentNode.x);
            } else if (rot === 90) {
                // Right (+X)
                assert.ok(childNode.x > parentNode.x);
                assert.equal(childNode.y, parentNode.y);
            } else if (rot === 180) {
                // Down (+Y)
                assert.ok(childNode.y > parentNode.y);
                assert.equal(childNode.x, parentNode.x);
            } else if (rot === 270) {
                // Left (-X)
                assert.ok(childNode.x < parentNode.x);
                assert.equal(childNode.y, parentNode.y);
            }
        });
    });

    await t.test('3. Elbow Line Segment Endpoint Clipping (Exact 12px Port Edge Boundary)', () => {
        const spec = {
            streams: [
                {
                    id: 'stream_1',
                    slots: [
                        {
                            id: 'elbow_parent',
                            role: 'elbow',
                            rotation: 90,
                            branchSlots: [
                                {
                                    id: 'elbow_child',
                                    role: 'elbow',
                                    rotation: 180
                                }
                            ]
                        }
                    ]
                }
            ]
        };

        const layout = generatePIDLayout(spec);
        const branchLine = layout.lines.find(l => l.id.includes('line_branch'));

        assert.ok(branchLine, 'Branch line connecting elbows missing');

        // Rotation 90 -> dirX = +1, dirY = 0
        // Parent at X=260, Y=140. Child at X=340, Y=140
        // With 12px port clipping:
        // x1 = 260 + 12 = 272
        // x2 = 340 - 12 = 328
        assert.equal(branchLine.x1, 272);
        assert.equal(branchLine.x2, 328);
        assert.equal(branchLine.y1, 140);
        assert.equal(branchLine.y2, 140);
    });

    await t.test('4. Multi-Stream Manifold & Dual Headers (Inlet & Outlet Alignment)', () => {
        const spec = {
            inletHeader: { label: 'MAIN INLET' },
            outletHeader: { label: 'MAIN OUTLET' },
            streams: [
                { id: 's1', label: 'Stream #1', slots: [{ id: 'v1', role: 'gate' }] },
                { id: 's2', label: 'Stream #2', slots: [{ id: 'v2', role: 'ball' }] },
                { id: 's3', label: 'Stream #3', slots: [{ id: 'v3', role: 'globe' }] }
            ]
        };

        const layout = generatePIDLayout(spec);

        assert.equal(layout.streams.length, 3);
        assert.equal(layout.headers.length, 2);

        const inletHdr = layout.headers.find(h => h.type === 'inlet');
        const outletHdr = layout.headers.find(h => h.type === 'outlet');

        assert.ok(inletHdr);
        assert.ok(outletHdr);

        // Header vertical span should encompass top to bottom stream Y coordinates
        assert.ok(inletHdr.yMin <= 95);
        assert.ok(inletHdr.yMax >= 665);
    });

    await t.test('5. Tee Fitting Port Direction Alignment (Explicit Port vs Rotation Mapping)', () => {
        const spec = {
            streams: [{
                id: 's1',
                slots: [
                    {
                        id: 'tee_0',
                        role: 'tee',
                        rotation: 0,
                        branchSlots: [{ id: 'blind_right', role: 'blind_flange', portDirection: 'right' }]
                    },
                    {
                        id: 'tee_180',
                        role: 'tee',
                        rotation: 180,
                        branchSlots: [{ id: 'blind_left', role: 'blind_flange', portDirection: 'left' }]
                    }
                ]
            }]
        };

        const layout = generatePIDLayout(spec);
        const tee0Node = layout.streams[0].nodes.find(n => n.id === 'tee_0');
        const blindRightNode = layout.streams[0].nodes.find(n => n.id === 'blind_right');
        const tee180Node = layout.streams[0].nodes.find(n => n.id === 'tee_180');
        const blindLeftNode = layout.streams[0].nodes.find(n => n.id === 'blind_left');

        assert.ok(blindRightNode.x > tee0Node.x, 'Right port Tee branch must point RIGHT (+X)');
        assert.equal(blindRightNode.y, tee0Node.y);

        assert.ok(blindLeftNode.x < tee180Node.x, 'Left port Tee branch must point LEFT (-X)');
        assert.equal(blindLeftNode.y, tee180Node.y);
    });

    await t.test('6. Multi-level Cross & Choke Branch Vector Propagation (Blind Flange on Right Outlet)', () => {
        const spec = {
            streams: [{
                id: 'stream_1',
                slots: [{
                    id: 'cross_fitting',
                    role: 'cross',
                    branchSlots: [
                        {
                            id: 'adj_choke',
                            role: 'adjustable_choke',
                            portDirection: 'top',
                            branchSlots: [
                                {
                                    id: 'tee_top_branch',
                                    role: 'tee',
                                    rotation: 0,
                                    branchSlots: [{ id: 'blind_flange_right', role: 'blind_flange', portDirection: 'right' }]
                                }
                            ]
                        }
                    ]
                }]
            }]
        };

        const layout = generatePIDLayout(spec);
        const teeNode = layout.streams[0].nodes.find(n => n.id === 'tee_top_branch');
        const blindNode = layout.streams[0].nodes.find(n => n.id === 'blind_flange_right');

        assert.ok(teeNode);
        assert.ok(blindNode);
        assert.ok(blindNode.x > teeNode.x, 'Blind Flange attached to 0° Tee on top manifold branch must extend RIGHT (+X)');
        assert.equal(blindNode.y, teeNode.y);
    });

    await t.test('7. Sequential Branch Sibling Stride Cumulative Spacing (Elbow -> Spool -> Blind Flange)', () => {
        const spec = {
            streams: [{
                id: 's1',
                slots: [{
                    id: 'elbow_1',
                    role: 'elbow',
                    rotation: 90, // Right branch (+X)
                    branchSlots: [
                        { id: 'spool_1', role: 'spool', portDirection: 'right' },
                        { id: 'blind_1', role: 'blind_flange', portDirection: 'right' }
                    ]
                }]
            }]
        };

        const layout = generatePIDLayout(spec);
        const elbow = layout.streams[0].nodes.find(n => n.id === 'elbow_1');
        const spool = layout.streams[0].nodes.find(n => n.id === 'spool_1');
        const blind = layout.streams[0].nodes.find(n => n.id === 'blind_1');

        assert.ok(elbow && spool && blind);
        assert.equal(spool.x, elbow.x + 80, 'Spool Piece must be 80px right of Elbow');
        assert.equal(blind.x, spool.x + 45, 'Blind Flange must be 45px right of Spool Piece (125px right of Elbow)');
        assert.equal(blind.y, elbow.y);
    });
});

import React from 'react';
import { render } from '@testing-library/react';
import {
    ControlValveSymbol,
    GlobeValveSymbol,
    GateValveSymbol,
    BallValveSymbol,
    CheckValveSymbol,
    SafetyValveSymbol,
    PumpSymbol,
    StrainerSymbol,
    InstrumentBubble
} from '../PIDSymbolLibrary';

describe('PIDSymbolLibrary SVG Components', () => {
    test('renders ControlValveSymbol with SVG elements and tag', () => {
        const { container, getByText } = render(
            <svg>
                <ControlValveSymbol x={100} y={100} tag="CV-101" />
            </svg>
        );
        expect(container.querySelector('polygon')).toBeTruthy();
        expect(container.querySelector('path')).toBeTruthy();
        expect(getByText('CV-101')).toBeTruthy();
    });

    test('renders GlobeValveSymbol', () => {
        const { container } = render(
            <svg>
                <GlobeValveSymbol x={50} y={50} />
            </svg>
        );
        expect(container.querySelector('polygon')).toBeTruthy();
    });

    test('renders GateValveSymbol', () => {
        const { container } = render(
            <svg>
                <GateValveSymbol x={50} y={50} />
            </svg>
        );
        expect(container.querySelector('polygon')).toBeTruthy();
    });

    test('renders BallValveSymbol', () => {
        const { container } = render(
            <svg>
                <BallValveSymbol x={50} y={50} />
            </svg>
        );
        expect(container.querySelector('circle')).toBeTruthy();
    });

    test('renders CheckValveSymbol with directional polygon', () => {
        const { container } = render(
            <svg>
                <CheckValveSymbol x={50} y={50} />
            </svg>
        );
        expect(container.querySelector('polygon')).toBeTruthy();
    });

    test('renders SafetyValveSymbol with tag', () => {
        const { getByText, container } = render(
            <svg>
                <SafetyValveSymbol x={50} y={50} tag="PSV-101" />
            </svg>
        );
        expect(getByText('PSV-101')).toBeTruthy();
        expect(container.querySelector('rect')).toBeTruthy();
    });

    test('renders PumpSymbol with label', () => {
        const { getByText, container } = render(
            <svg>
                <PumpSymbol x={100} y={100} label="P-101" />
            </svg>
        );
        expect(getByText('P-101')).toBeTruthy();
        expect(container.querySelector('circle')).toBeTruthy();
    });

    test('renders StrainerSymbol', () => {
        const { container } = render(
            <svg>
                <StrainerSymbol x={50} y={50} />
            </svg>
        );
        expect(container.querySelector('polygon')).toBeTruthy();
    });

    test('renders InstrumentBubble with tag text', () => {
        const { getByText, container } = render(
            <svg>
                <InstrumentBubble x={100} y={50} tag="PT-101" />
            </svg>
        );
        expect(getByText('PT-101')).toBeTruthy();
        expect(container.querySelector('circle')).toBeTruthy();
    });
});

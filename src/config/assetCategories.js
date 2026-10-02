/**
 * Anti-VAMS Asset Categories Engine & Capabilities Registry
 * Centralizes capabilities, statuses, UI policy rules, and display metadata
 * across all asset/equipment categories in the application.
 */

export const ASSET_CATEGORIES = {
    'Gate Valve': {
        status: 'active',
        allowSignature: true,
        allowPdfExport: true,
        allowInspections: true,
        allowTestReports: true,
        sizeLabel: 'Valve Size',
        sealLabel: 'Seal Type'
    },
    'Ball Valve': {
        status: 'active',
        allowSignature: true,
        allowPdfExport: true,
        allowInspections: true,
        allowTestReports: true,
        sizeLabel: 'Valve Size',
        sealLabel: 'Seal Type'
    },
    'Globe Control Valve': {
        status: 'active',
        allowSignature: true,
        allowPdfExport: true,
        allowInspections: true,
        allowTestReports: true,
        sizeLabel: 'Valve Size',
        sealLabel: 'Seal Type'
    },
    'Butterfly Valve': {
        status: 'active',
        allowSignature: true,
        allowPdfExport: true,
        allowInspections: true,
        allowTestReports: true,
        sizeLabel: 'Valve Size',
        sealLabel: 'Seal Type'
    },
    'Check Valve': {
        status: 'active',
        allowSignature: true,
        allowPdfExport: true,
        allowInspections: true,
        allowTestReports: true,
        sizeLabel: 'Valve Size',
        sealLabel: 'Seal Type'
    },
    'Plug Valve': {
        status: 'active',
        allowSignature: true,
        allowPdfExport: true,
        allowInspections: true,
        allowTestReports: true,
        sizeLabel: 'Valve Size',
        sealLabel: 'Seal Type'
    },
    'Pressure Relief Valve': {
        status: 'active',
        allowSignature: true,
        allowPdfExport: true,
        allowInspections: true,
        allowTestReports: true,
        sizeLabel: 'Valve Size',
        sealLabel: 'Seal Type'
    },
    'Pilot Operated Relief Valve': {
        status: 'active',
        allowSignature: true,
        allowPdfExport: true,
        allowInspections: true,
        allowTestReports: true,
        sizeLabel: 'Valve Size',
        sealLabel: 'Seal Type'
    },
    'Positive Choke Valve': {
        status: 'active',
        allowSignature: true,
        allowPdfExport: true,
        allowInspections: true,
        allowTestReports: true,
        hideActuation: true,
        sizeLabel: 'Nominal Size',
        sealLabel: 'Seal Type'
    },
    'Adjustable Choke Valve': {
        status: 'active',
        allowSignature: true,
        allowPdfExport: true,
        allowInspections: true,
        allowTestReports: true,
        sizeLabel: 'Nominal Size',
        sealLabel: 'Seal Type'
    },
    'Axial Surge Relief Valve': {
        status: 'active',
        allowSignature: true,
        allowPdfExport: true,
        allowInspections: true,
        allowTestReports: true,
        sizeLabel: 'Valve Size',
        sealLabel: 'Seal Type'
    },
    'Actuator / Gearbox Only': {
        status: 'active',
        allowSignature: true,
        allowPdfExport: true,
        allowInspections: true,
        allowTestReports: true,
        sizeLabel: 'Valve Size',
        sealLabel: 'Seal Type'
    },
    'General Process Equipment': {
        status: 'active',
        allowSignature: true,
        allowPdfExport: true,
        allowInspections: true,
        allowTestReports: true,
        sizeLabel: 'Equipment Size',
        sealLabel: 'Seal Type'
    },
    'Wellhead Christmas Tree': {
        status: 'active',
        isAssembly: true,
        allowSignature: true,
        allowPdfExport: true,
        allowInspections: true,
        allowTestReports: true,
        hideActuation: true,
        sizeLabel: 'Nominal Bore / Rating',
        sealLabel: 'Seal Type'
    },
    'Process Skid': {
        status: 'active',
        isAssembly: true,
        allowSignature: true,
        allowPdfExport: true,
        allowInspections: true,
        allowTestReports: true,
        hideActuation: true,
        sizeLabel: 'Skid Design Capacity / Rating',
        sealLabel: 'Seal Type'
    },
    'End Suction Pump': {
        status: 'coming_soon',
        noticeText: 'ℹ️ Equipment Type - Coming Soon',
        allowSignature: false,
        allowPdfExport: false,
        allowInspections: false,
        allowTestReports: false,
        hideMaterialSpecs: true,
        hideActuation: true,
        sizeLabel: 'Equipment Size',
        sealLabel: 'Seal Type'
    }
};

/**
 * Returns the capability configuration for a given asset category.
 * Falls back to fully active default config if category is unknown.
 */
export const getAssetCategoryConfig = (type) => {
    return ASSET_CATEGORIES[type] || {
        status: 'active',
        allowSignature: true,
        allowPdfExport: true,
        allowInspections: true,
        allowTestReports: true,
        sizeLabel: 'Valve Size',
        sealLabel: 'Seal Type'
    };
};

/**
 * Ordered list of all supported asset category labels for UI selectors
 */
export const ASSET_CATEGORY_LIST = Object.keys(ASSET_CATEGORIES);

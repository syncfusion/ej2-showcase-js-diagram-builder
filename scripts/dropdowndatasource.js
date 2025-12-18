class DropDownDataSources {
    fileFormats() {
        const fileFormats = [
            { text: 'JPG', value: 'JPG' }, { text: 'PNG', value: 'PNG' }, { text: 'SVG', value: 'SVG' }
        ];
        return fileFormats;
    }

    diagramRegions() {
        const diagramRegions = [
            { text: 'Content', value: 'Content' }, { text: 'PageSettings', value: 'PageSettings' }
        ];
        return diagramRegions;
    }

    importFormat() {
        const importFormat = [
            { text: 'CSV', value: 'CSV' }, { text: 'XML', value: 'XML' }, { text: 'JSON', value: 'JSON' }
        ];
        return importFormat;
    }

    borderStyles() {
        const borderStyles = [
            { text: 'None', value: 'None', className: 'ddl-svg-style ddl_linestyle_none' },
            { text: '1,2', value: '1,2', className: 'ddl-svg-style ddl_linestyle_one_two' },
            { text: '3,3', value: '3,3', className: 'ddl-svg-style ddl_linestyle_three_three' },
            { text: '5,3', value: '5,3', className: 'ddl-svg-style ddl_linestyle_five_three' },
            { text: '4,4,1', value: '4,4,1', className: 'ddl-svg-style ddl_linestyle_four_four_one' }
        ];
        return borderStyles;
    }

    fontFamilyList() {
        const fontFamilyList = [
            { text: 'Arial', value: 'Arial' },
            { text: 'Aharoni', value: 'Aharoni' },
            { text: 'Bell MT', value: 'Bell MT' },
            { text: 'Fantasy', value: 'Fantasy' },
            { text: 'Times New Roman', value: 'Times New Roman' },
            { text: 'Segoe UI', value: 'Segoe UI' },
            { text: 'Verdana', value: 'Verdana' },
        ];
        return fontFamilyList;
    }

    decoratorList() {
        const decoratorList = [
            { text: 'None', value: 'None' },
            { text: 'Arrow', value: 'Arrow' },
            { text: 'Diamond', value: 'Diamond' },
            { text: 'OpenArrow', value: 'OpenArrow' },
            { text: 'Circle', value: 'Circle' },
            { text: 'Square', value: 'Square' },
            { text: 'Fletch', value: 'Fletch' },
            { text: 'OpenFetch', value: 'OpenFetch' },
            { text: 'IndentedArrow', value: 'IndentedArrow' },
            { text: 'OutdentedArrow', value: 'OutdentedArrow' },
            { text: 'DoubleArrow', value: 'DoubleArrow' }
        ];
        return decoratorList;
    }

    textPositionDataSource() {
        const textPosition = [
            { text: 'TopLeft', value: 'TopLeft' }, { text: 'TopCenter', value: 'TopCenter' },
            { text: 'TopRight', value: 'TopRight' }, { text: 'MiddleLeft', value: 'MiddleLeft' },
            { text: 'Center', value: 'Center' }, { text: 'MiddleRight', value: 'MiddleRight' },
            { text: 'BottomLeft', value: 'BottomLeft' }, { text: 'BottomCenter', value: 'BottomCenter' },
            { text: 'BottomRight', value: 'BottomRight' },
        ];
        return textPosition;
    }

    lineTypes() {
        const lineTypes = [
            { text: 'Straight', value: 'Straight' }, { text: 'Orthogonal', value: 'Orthogonal' },
            { text: 'Bezier', value: 'Bezier' }
        ];
        return lineTypes;
    }

    gradientDirections() {
        const gradientDirections = [
            { text: 'BottomToTop', value: 'BottomToTop' }, { text: 'TopToBottom', value: 'TopToBottom' },
            { text: 'RightToLeft', value: 'RightToLeft' }, { text: 'LeftToRight', value: 'LeftToRight' }
        ];
        return gradientDirections;
    }

    drawShapesList() {
        const drawShapesList = [
            { iconCss: 'sf-icon-Square', text: 'Rectangle' },
            { iconCss: 'sf-icon-Ellipse', text: 'Ellipse' },
            { iconCss: 'sf-icon-Triangle', text: 'Polygon' }
        ];
        return drawShapesList;
    }

    drawConnectorsList() {
        const drawConnectorsList = [
            { iconCss: 'sf-icon-StraightLine', text: 'Straight Line' },
            { iconCss: 'sf-icon-ConnectorMode', text: 'Orthogonal Line' },
            { iconCss: 'sf-icon-BeizerLine', text: 'Bezier' }
        ];
        return drawConnectorsList;
    }

    orderCommandsList() {
        const orderCommandsList = [
            { iconCss: 'sf-icon-Sendback', text: 'Send To Back' },
            { iconCss: 'sf-icon-BringFront', text: 'Bring To Front' },
            { iconCss: 'sf-icon-SendBackward', text: 'Send Backward' },
            { iconCss: 'sf-icon-BringForward', text: 'Bring Forward' },
        ];
        return orderCommandsList;
    }

    mindmapLevels() {
        const mindmapLevels = [
            { text: 'Root', value: 'Level0' }, { text: 'Level1', value: 'Level1' },
            { text: 'Level2', value: 'Level2' }, { text: 'Level3', value: 'Level3' },
            { text: 'Level4', value: 'Level4' }, { text: 'Level5', value: 'Level5' },
        ];
        return mindmapLevels;
    }

    zoomMenuItems() {
        const zoomMenuItems = [
            { text: '400%' }, { text: '300%' }, { text: '200%' }, { text: '150%' },
            { text: '100%' }, { text: '75%' }, { text: '50%' }, { text: '25%' }, { separator: true },
            { text: 'Fit To Screen' }
        ];
        return zoomMenuItems;
    }

    paperList() {
        const paperList = [
            { text: 'Letter (8.5 in x 11 in)', value: 'Letter' }, { text: 'Legal (8.5 in x 14 in)', value: 'Legal' },
            { text: 'Tabloid (279 mm x 432 mm)', value: 'Tabloid' }, { text: 'A3 (297 mm x 420 mm)', value: 'A3' },
            { text: 'A4 (210 mm x 297 mm)', value: 'A4' }, { text: 'A5 (148 mm x 210 mm)', value: 'A5' },
            { text: 'A6 (105 mm x 148 mm)', value: 'A6' }, { text: 'Custom', value: 'Custom' },
        ];
        return paperList;
    }

    listViewData() {
        const listViewData = [
            { text: 'Flow', id: 'flowShapes', checked: true },
            { text: 'Basic', id: 'basicShapes', checked: true },
            { text: 'BPMN', id: 'bpmnShapes', checked: true },
            { text: 'Connectors', id: 'connectorsShapes', checked: true },
            { text: 'Electrical', id: 'electricalShapes', checked: false },
            { text: 'Network', id: 'networkShapes', checked: false },
            { text: 'Floorplan', id: 'floorShapes', checked: false },
        ];
        return listViewData;
    }

    menuItems = [
        {
            text: 'File',
            items: [
                { text: 'New', iconCss: 'e-icons e-circle-add' }, { text: 'Open', iconCss: 'e-icons e-folder-open' }, { separator: true },
                { text: 'Save', iconCss: 'sf-icon-Save' }, { text: 'Save As', iconCss: 'e-icons e-save-as' },
                { separator: true },
                { text: 'Export', iconCss: 'sf-icon-Export' },
                { text: 'Print', iconCss: 'sf-icon-Print' }
            ]
        },
        {
            text: 'Edit',
            items: [
                { text: 'Undo', iconCss: 'sf-icon-Undo' }, { text: 'Redo', iconCss: 'sf-icon-Redo' }, { separator: true },
                { text: 'Cut', iconCss: 'sf-icon-Cut' }, { text: 'Copy', iconCss: 'sf-icon-Copy' },
                { text: 'Paste', iconCss: 'sf-icon-Paste' }, { text: 'Delete', iconCss: 'sf-icon-Delete' }, { separator: true },
                { text: 'Duplicate' }, { separator: true },
                { text: 'Edit Tooltip' }, { separator: true },
                { text: 'Select All' },
            ]
        },
        {
            text: 'View',
            items: [
                { text: 'Zoom In', iconCss: 'sf-icon-ZoomIn' }, { text: 'Zoom Out', iconCss: 'sf-icon-ZoomOut' }, { separator: true },
                { text: 'Fit To Screen' }, { separator: true },
                { text: 'Show Rulers' }, { text: 'Show Guides', iconCss: 'sf-icon-Selection' },
                { text: 'Show Grid', iconCss: 'sf-icon-Selection' }, { separator: true },
                { text: 'Snap To Grid' }
            ]
        },
        {
            text: 'Arrange',
            items: [
                { text: 'Send To Back', iconCss: 'sf-icon-Sendback' }, { text: 'Bring To Front', iconCss: 'sf-icon-BringFront' },
                { text: 'Send Backward', iconCss: 'sf-icon-SendBackward' }, { text: 'Bring Forward', iconCss: 'sf-icon-BringForward' },
                { separator: true },
                {
                    text: 'Align Objects', items: [
                        { text: 'Left', iconCss: 'sf-icon-AlignLeft' }, { text: 'Right', iconCss: 'sf-icon-AlignRight' },
                        { text: 'Center', iconCss: 'sf-icon-AlignHorizontally' }, { text: 'Top', iconCss: 'sf-icon-AilgnTop' },
                        { text: 'Bottom', iconCss: 'sf-icon-AlignBottom' }, { text: 'Middle', iconCss: 'sf-icon-AlignVertically' }
                    ]
                },
                {
                    text: 'Distribute Objects', items: [
                        { text: 'Horizontally', iconCss: 'sf-icon-DistributeHorizontal' },
                        { text: 'Vertically', iconCss: 'sf-icon-DistributeVertical' }
                    ]
                },
                {
                    text: 'Match Size', items: [
                        { text: 'Both Width and Height' }, { text: 'Width' }, { text: 'Height' }
                    ]
                }, { separator: true },
                { text: 'Lock' }, { text: 'Unlock' }, { separator: true },
                { text: 'Group' }, { text: 'Ungroup' }
            ]
        }, {
            text: 'Window',
            items: [
                { text: 'Show Toolbar', iconCss: 'sf-icon-Selection' }, { text: 'Show Stencil', iconCss: 'sf-icon-Selection' },
                { text: 'Show Properties', iconCss: 'sf-icon-Selection' }, { text: 'Show Layers' },
                { text: 'Show Pager', iconCss: 'sf-icon-Selection' }, { text: 'Themes' }
            ]
        },
    ];

    getHelpMenuItems() {
        const menuItems = [
            { text: 'Keyboard Shortcuts' }, { text: 'Documentation' }
        ];
        return menuItems;
    }
}

export default DropDownDataSources;
import { selectedItem,diagramEvents } from '../index.js';  // The correct path to index.js
import {MindMapUtilityMethods} from './mindmap';
import {OrgChartUtilityMethods} from './orgchart';

class DiagramClientSideEvents {
    constructor(selectedItem, page) {
        this.selectedItem = selectedItem;
        this.page = page;
    }

    selectionChange(args) {
        const diagram = selectedItem.selectedDiagram;
        if (selectedItem.preventSelectionChange || selectedItem.isLoading) {
            return;
        }
        if (args.state === 'Changed') {
            if (selectedItem.diagramType === 'MindMap') {
                if (args.newValue.length === 1 && diagram.selectedItems.nodes.length === 1) {
                    const node = args.newValue[0];
                    diagram.selectedItems.userHandles[0].visible = false;
                    diagram.selectedItems.userHandles[1].visible = false;
                    diagram.selectedItems.userHandles[2].visible = false;
                    if (node.id !== 'textNode' && !(node instanceof ej.diagrams.Connector)) {
                        const addInfo = node.addInfo;
                        if (node.id === 'rootNode') {
                            diagram.selectedItems.userHandles[0].visible = true;
                            diagram.selectedItems.userHandles[1].visible = true;
                        }
                        else if (addInfo.orientation.toString() === 'Left') {
                            diagram.selectedItems.userHandles[0].visible = true;
                            diagram.selectedItems.userHandles[2].visible = true;
                            diagram.selectedItems.userHandles[2].side = 'Left';
                        }
                        else {
                            diagram.selectedItems.userHandles[1].visible = true;
                            diagram.selectedItems.userHandles[2].visible = true;
                            diagram.selectedItems.userHandles[2].side = 'Right';
                        }
                        selectedItem.utilityMethods.bindMindMapProperties(node, selectedItem);
                    }
                    if (node.addInfo && node.addInfo.level !== undefined) {
                        selectedItem.mindmapSettings.levelType.value = 'Level' + node.addInfo.level;
                    }
                }
            }
            else if (selectedItem.diagramType === 'OrgChart') {
                if (args.newValue.length === 1) {
                    const node = args.newValue[0];
                    diagram.selectedItems.userHandles[0].visible = false;
                    diagram.selectedItems.userHandles[1].visible = false;
                    diagram.selectedItems.userHandles[2].visible = false;
                    if (node.id !== 'textNode' && node instanceof ej.diagrams.Node) {
                        diagram.selectedItems.userHandles[0].visible = true;
                        diagram.selectedItems.userHandles[1].visible = true;
                        diagram.selectedItems.userHandles[2].visible = true;
                    }
                }
            }
            else {
                let selectedItems = selectedItem.selectedDiagram.selectedItems.nodes;
                selectedItems = selectedItems.concat(selectedItem.selectedDiagram.selectedItems.connectors);
                selectedItem.utilityMethods.enableToolbarItems(selectedItems);
                const nodeContainer = document.getElementById('nodePropertyContainer');
                nodeContainer.classList.remove('multiple');
                nodeContainer.classList.remove('connector');
                if (selectedItems.length > 1) {
                    this.multipleSelectionSettings(selectedItems);
                }
                else if (selectedItems.length === 1) {
                    this.singleSelectionSettings(selectedItems[0]);
                }
                else {
                    selectedItem.utilityMethods.objectTypeChange('diagram');
                }
            }
        }
    }

    multipleSelectionSettings(selectedItems) {
        selectedItem.utilityMethods.objectTypeChange('None');
        let showConnectorPanel = false, showNodePanel = false;
        let showTextPanel = false, showConTextPanel = false;
        const nodeContainer = document.getElementById('nodePropertyContainer');
        selectedItems.forEach(object => {
            if (object instanceof ej.diagrams.Node && (!showNodePanel || !showTextPanel)) {
                showNodePanel = true;
                showTextPanel = object.annotations.length > 0 && object.annotations[0].content ? true : false;
            }
            else if (object instanceof ej.diagrams.Connector && (!showConnectorPanel || !showConTextPanel)) {
                showConnectorPanel = true;
                showConTextPanel = object.annotations.length > 0 && object.annotations[0].content ? true : false;
            }
        });

        const selectItem1 = selectedItem.selectedDiagram.selectedItems;
        let bindNode;
        if (showNodePanel) {
            nodeContainer.style.display = '';
            nodeContainer.classList.add('multiple');
            if (showConnectorPanel) {
                nodeContainer.classList.add('connector');
            }
            selectedItem.utilityMethods.bindNodeProperties(selectItem1.nodes[0], selectedItem);
            if (selectItem1.nodes && selectItem1.nodes.length > 0) {
                bindNode = selectItem1.nodes.find(node=>node.annotations && node.annotations.length > 0);
                if (bindNode) {
                    selectedItem.utilityMethods.bindTextProperties(bindNode.annotations[0].style, selectedItem);
                    selectedItem.utilityMethods.updateHorVertAlign(bindNode.annotations[0].horizontalAlignment, bindNode.annotations[0].verticalAlignment);
                }
            }
        }
        if (showConnectorPanel && !showNodePanel) {
            document.getElementById('connectorPropertyContainer').style.display = '';
            selectedItem.utilityMethods.bindConnectorProperties(selectItem1.connectors[0], selectedItem);
        }
        if (showTextPanel || showConTextPanel) {
            document.getElementById('textPropertyContainer').style.display = '';
            if (showTextPanel && showConTextPanel) {
                document.getElementById('textPositionDiv').style.display = 'none';
                document.getElementById('textColorDiv').className = 'col-xs-6 db-col-left';
            }
            else {
                document.getElementById('textPositionDiv').style.display = '';
                document.getElementById('textColorDiv').className = 'col-xs-6 db-col-right';
                if (showConTextPanel) {
                    diagramEvents.ddlTextPosition.dataSource = selectedItem.textProperties.getConnectorTextPositions();
                }
                else {
                    diagramEvents.ddlTextPosition.dataSource = selectedItem.textProperties.getNodeTextPositions();
                    diagramEvents.ddlTextPosition.value = diagramEvents.ddlTextPosition.value || selectedItem.utilityMethods.getPosition(bindNode.annotations[0].offset);
                }
                diagramEvents.ddlTextPosition.dataBind();
            }
        }
    }

    singleSelectionSettings(selectedObject) {
        let object = null;
        if (selectedObject instanceof ej.diagrams.Node) {
            selectedItem.utilityMethods.objectTypeChange('node');
            object = selectedObject;
            selectedItem.utilityMethods.bindNodeProperties(object, selectedItem);
        }
        else if (selectedObject instanceof ej.diagrams.Connector) {
            selectedItem.utilityMethods.objectTypeChange('connector');
            object = selectedObject;
            selectedItem.utilityMethods.bindConnectorProperties(object, selectedItem);
        }
        if (object.shape && object.shape.type === 'Text') {
            document.getElementById('textPropertyContainer').style.display = '';
            document.getElementById('toolbarTextAlignmentDiv').style.display = 'none';
            document.getElementById('textPositionDiv').style.display = 'none';
            document.getElementById('textColorDiv').className = 'col-xs-6 db-col-left';
            const opacitySlider = document.getElementById('textOpacityProp');
            if (opacitySlider) {
                opacitySlider.style.visibility = 'hidden';
            }
            selectedItem.utilityMethods.bindTextProperties(object.style, selectedItem);
        }
        else if (object.annotations.length > 0 && object.annotations[0].content) {
            document.getElementById('textPropertyContainer').style.display = '';
            let annotation = null;
            document.getElementById('toolbarTextAlignmentDiv').style.display = '';
            document.getElementById('textPositionDiv').style.display = '';
            document.getElementById('textColorDiv').className = 'col-xs-6 db-col-right';
            const opacitySlider = document.getElementById('textOpacityProp');
            if (opacitySlider) {
                opacitySlider.style.visibility = 'visible';
            }
            selectedItem.utilityMethods.bindTextProperties(object.annotations[0].style, selectedItem);
            selectedItem.utilityMethods.updateHorVertAlign(object.annotations[0].horizontalAlignment, object.annotations[0].verticalAlignment);
            if (object.annotations[0] instanceof ej.diagrams.ShapeAnnotation) {
                annotation = object.annotations[0];
                diagramEvents.ddlTextPosition.dataSource = selectedItem.textProperties.getNodeTextPositions();
                diagramEvents.ddlTextPosition.value = selectedItem.utilityMethods.getPosition(annotation.offset);
                diagramEvents.ddlTextPosition.dataBind();
            }
            else if (object.annotations[0] instanceof ej.diagrams.PathAnnotation) {
                annotation = object.annotations[0];
                diagramEvents.ddlTextPosition.dataSource = selectedItem.textProperties.getConnectorTextPositions();
                diagramEvents.ddlTextPosition.value = selectedItem.textProperties.textPosition = null;
                diagramEvents.ddlTextPosition.dataBind();
                diagramEvents.ddlTextPosition.value = selectedItem.textProperties.textPosition = annotation.alignment;
                diagramEvents.ddlTextPosition.dataBind();
            }
        }
    }

    nodePositionChange(args) {
        selectedItem.preventPropertyChange = true;
        selectedItem.nodeProperties.offsetX.value = (Math.round(args.newValue.offsetX * 100) / 100);
        selectedItem.nodeProperties.offsetY.value = (Math.round(args.newValue.offsetY * 100) / 100);
        if (args.state === 'Completed') {
            selectedItem.isModified = true;
            selectedItem.preventPropertyChange = false;
        }
    }

    nodeSizeChange(args) {
        selectedItem.preventPropertyChange = true;
        selectedItem.nodeProperties.width.value = (Math.round(args.newValue.width * 100) / 100);
        selectedItem.nodeProperties.height.value = (Math.round(args.newValue.height * 100) / 100);
        selectedItem.nodeProperties.offsetX.value = (Math.round(args.source.offsetX * 100) / 100);
        selectedItem.nodeProperties.offsetY.value = (Math.round(args.source.offsetY * 100) / 100);
        if (args.state === 'Completed') {
            selectedItem.isModified = true;
            selectedItem.preventPropertyChange = false;
        }
    }

    textEdit(args) {
        if (selectedItem.diagramType === 'MindMap') {
            setTimeout(() => { selectedItem.selectedDiagram.doLayout(); }, 10);
        }
        selectedItem.isModified = true;
    }

    scrollChange(args) {
        var btnZoomIncrement = document.getElementById("btnZoomIncrement").ej2_instances[0];
        if (btnZoomIncrement) {
            btnZoomIncrement.content = Math.round(args.newValue.CurrentZoom * 100) + ' %';	 
        }
    }

    nodeRotationChange(args) {
        selectedItem.preventPropertyChange = true;
        selectedItem.nodeProperties.rotateAngle.value = (Math.round(args.newValue.rotateAngle * 100) / 100);
        selectedItem.preventPropertyChange = false;
        if (args.state === 'Completed') {
            selectedItem.isModified = true;
        }
    }

    diagramContextMenuClick(args) {
        const diagram = selectedItem.selectedDiagram;
        selectedItem.customContextMenu.updateBpmnShape(diagram, args.item);
        const text = args.item.text;
        if (['Group', 'Un Group', 'Undo', 'Redo', 'Select All'].includes(text)) {
            selectedItem.isModified = true;
            if (selectedItem.diagramType === 'MindMap' || selectedItem.diagramType === 'OrgChart') {
                if (text === 'Undo' || text === 'Redo') {
                    args.cancel = true;
                    if (text === 'Undo') {
                        selectedItem.utilityMethods.undoRedoLayout(true, selectedItem);
                    }
                    else if (text === 'Redo') {
                        selectedItem.utilityMethods.undoRedoLayout(false, selectedItem);
                    }
                }
            }
        }
        if (selectedItem.diagramType === 'MindMap' || selectedItem.diagramType === 'OrgChart') {
            if (text === 'Copy') {
                selectedItem.utilityMethods.copyLayout(selectedItem);
            }
            else if (text === 'Cut') {
                args.cancel = true;
                selectedItem.utilityMethods.cutLayout(selectedItem);
            }
            else if (text === 'Paste') {
                args.cancel = true;
                selectedItem.utilityMethods.pasteLayout(selectedItem);
            }
        }
    }

    diagramContextMenuOpen(args) {
        const diagram = selectedItem.selectedDiagram;
        args.hiddenItems = args.hiddenItems.concat(selectedItem.customContextMenu.getHiddenMenuItems(diagram));
    }

    dragEnter(args) {
        const obj = args.element;
        const ratio = 100 / obj.width;
        obj.width = 100;
        obj.height *= ratio;
    }

    historyChange(args) {
        const diagram = selectedItem.selectedDiagram;
        const toolbarContainer = document.getElementsByClassName('db-toolbar-container')[0];
        toolbarContainer.classList.remove('db-undo');
        toolbarContainer.classList.remove('db-redo');
        if (diagram.historyManager.undoStack.length > 0) {
            toolbarContainer.classList.add('db-undo');
        }
        if (diagram.historyManager.redoStack.length > 0) {
            toolbarContainer.classList.add('db-redo');
        }
    }
}

class DiagramPropertyBinding {
    constructor(selectedItem, page) {
        this.selectedItem = selectedItem;
        this.page = page;
    }

    pageBreaksChange(args) {
        if (args.event) {
            selectedItem.pageSettings.pageBreaks = args.checked;
            selectedItem.selectedDiagram.pageSettings.showPageBreaks = args.checked;
        }
    }

    multiplePage(args) {
        if (args.event) {
            selectedItem.printSettings.multiplePage = args.checked;
        }
    }

    paperListChange(args) {
        if (args.element) {
            const diagram = selectedItem.selectedDiagram;
            document.getElementById('pageDimension').style.display = 'none';
            document.getElementById('pageOrientation').style.display = '';
            selectedItem.pageSettings.paperSize = args.value;
            const paperSize = selectedItem.utilityMethods.getPaperSize(selectedItem.pageSettings.paperSize);
            let pageWidth = paperSize.pageWidth;
            let pageHeight = paperSize.pageHeight;
            if (pageWidth && pageHeight) {
                if (selectedItem.pageSettings.isPortrait) {
                    if (pageWidth > pageHeight) {
                        const temp = pageWidth;
                        pageWidth = pageHeight;
                        pageHeight = temp;
                    }
                }
                else {
                    if (pageHeight > pageWidth) {
                        const temp = pageHeight;
                        pageHeight = pageWidth;
                        pageWidth = temp;
                    }
                }
                diagram.pageSettings.width = pageWidth;
                diagram.pageSettings.height = pageHeight;
                selectedItem.pageSettings.pageWidth = pageWidth;
                selectedItem.pageSettings.pageHeight = pageHeight;
                diagram.dataBind();
            }
            else {
                document.getElementById('pageOrientation').style.display = 'none';
                document.getElementById('pageDimension').style.display = '';
            }
        }
    }

    pageDimensionChange(args) {
        if (args.event) {
            let pageWidth = Number(selectedItem.pageSettings.pageWidth);
            let pageHeight = Number(selectedItem.pageSettings.pageHeight);
            let target = args.event.target;
            if (target.tagName.toLowerCase() === 'span') {
                target = target.parentElement.children[0];
            }
            const diagram = selectedItem.selectedDiagram;
            if (target.id === 'pageWidth') {
                pageWidth = Number(target.value.replace(/,/g, ''));
            }
            else {
                pageHeight = Number(target.value.replace(/,/g, ''));
            }
            if (pageWidth && pageHeight) {
                if (pageWidth > pageHeight) {
                    selectedItem.pageSettings.isPortrait = false;
                    selectedItem.pageSettings.isLandscape = true;
                    diagram.pageSettings.orientation = 'Landscape';
                }
                else {
                    selectedItem.pageSettings.isPortrait = true;
                    selectedItem.pageSettings.isLandscape = false;
                    diagram.pageSettings.orientation = 'Portrait';
                }
                selectedItem.pageSettings.pageWidth = diagram.pageSettings.width = pageWidth;
                selectedItem.pageSettings.pageHeight = diagram.pageSettings.height = pageHeight;
                diagram.dataBind();
            }
        }
    }

    pageOrientationChange(args) {
        if (args.event) {
            let pageWidth = Number(selectedItem.pageSettings.pageWidth);
            let pageHeight = Number(selectedItem.pageSettings.pageHeight);
            const target = args.event.target;
            const diagram = selectedItem.selectedDiagram;
            switch (target.id) {
                case 'pagePortrait':
                    selectedItem.pageSettings.isPortrait = true;
                    selectedItem.pageSettings.isLandscape = false;
                    diagram.pageSettings.orientation = 'Portrait';
                    break;
                case 'pageLandscape':
                    selectedItem.pageSettings.isPortrait = false;
                    selectedItem.pageSettings.isLandscape = true;
                    diagram.pageSettings.orientation = 'Landscape';
                    break;
            }
            diagram.dataBind();
            selectedItem.pageSettings.pageWidth = diagram.pageSettings.width;
            selectedItem.pageSettings.pageHeight = diagram.pageSettings.height;
        }
    }

    pageBackgroundChange1(args) {
        if (args.currentValue) {
            const diagram = selectedItem.selectedDiagram;
            diagram.pageSettings.background = {
                color: args.currentValue.rgba
            };
            diagram.dataBind();
        }
    }

    textPositionChange(args) {
        if (args.value !== null) {
            this.textPropertyChange('textPosition', args.value);
        }
    }

    toolbarTextStyleChange(args) {
        this.textPropertyChange(args.item.tooltipText, false);
    }

    toolbarTextSubAlignChange(args) {
        const propertyName = args.item.tooltipText.replace(/[' ']/g, '');
        this.textPropertyChange(propertyName, propertyName);
    }

    toolbarTextAlignChange(args) {
        let propertyName = args.item.tooltipText.replace('Align ', '');
        const flipMap = { Left: 'Right', Right: 'Left', Top: 'Bottom', Bottom: 'Top' };
        propertyName = flipMap[propertyName] || propertyName;
        this.textPropertyChange(propertyName, propertyName);
    }

    textPropertyChange(propertyName, propertyValue) {
        if (!selectedItem.preventPropertyChange) {
            const diagram = selectedItem.selectedDiagram;
            let selectedObjects = diagram.selectedItems.nodes;
            selectedObjects = selectedObjects.concat(diagram.selectedItems.connectors);
            propertyName = propertyName.toLowerCase();
            if (selectedObjects.length > 0) {
                selectedObjects.forEach(node => {
                    if (node instanceof ej.diagrams.Node || node instanceof ej.diagrams.Connector) {
                        if (node.annotations.length > 0) {
                            node.annotations.forEach(annotation => {
                                if (annotation instanceof ej.diagrams.ShapeAnnotation) {
                                    if (propertyName === 'textposition') {
                                        selectedItem.textProperties.textPosition = propertyValue.toString();
                                        annotation.offset = selectedItem.utilityMethods.getOffset(propertyValue);
                                    }
                                }
                                else if (annotation instanceof ej.diagrams.PathAnnotation) {
                                    if (propertyName === 'textposition') {
                                        selectedItem.textProperties.textPosition = propertyValue.toString();
                                        annotation.alignment = selectedItem.textProperties.textPosition;
                                    }
                                }
                                if (['left', 'right', 'center'].includes(propertyName)) {
                                    annotation.horizontalAlignment = propertyValue;
                                    selectedItem.utilityMethods.updateHorVertAlign(annotation.horizontalAlignment, annotation.verticalAlignment);
                                }
                                else if (['top', 'bottom'].includes(propertyName)) {
                                    annotation.verticalAlignment = propertyValue;
                                    selectedItem.utilityMethods.updateHorVertAlign(annotation.horizontalAlignment, annotation.verticalAlignment);
                                }
                                else if (propertyName === 'middle') {
                                    annotation.verticalAlignment = 'Center';
                                    selectedItem.utilityMethods.updateHorVertAlign(annotation.horizontalAlignment, annotation.verticalAlignment);
                                }
                                else {
                                    this.updateTextProperties(propertyName, propertyValue, annotation.style);
                                }
                            });
                        }
                                                else if (node.shape && node.shape.type === 'Text') {
                            this.updateTextProperties(propertyName, propertyValue, node.style);
                        }
                    }
                });
                diagram.dataBind();
                selectedItem.isModified = true;
            }
        }
    }

    updateTextProperties(propertyName, propertyValue, annotation) {
        switch (propertyName) {
            case 'bold':
                annotation.bold = !annotation.bold;
                this.updateToolbarState('toolbarTextStyle', annotation.bold, 0);
                break;
            case 'italic':
                annotation.italic = !annotation.italic;
                this.updateToolbarState('toolbarTextStyle', annotation.italic, 1);
                break;
            case 'underline':
                selectedItem.textProperties.textDecoration = !selectedItem.textProperties.textDecoration;
                annotation.textDecoration = annotation.textDecoration === 'None' || !annotation.textDecoration ? 'Underline' : 'None';
                this.updateToolbarState('toolbarTextStyle', selectedItem.textProperties.textDecoration, 2);
                break;
            case 'aligntextleft':
            case 'aligntextright':
            case 'aligntextcenter':
                annotation.textAlign = propertyValue.toString().replace('AlignText', '');
                selectedItem.utilityMethods.updateTextAlign(annotation.textAlign);
                break;
        }
    }

    updateToolbarState(toolbarName, isSelected, index) {
        const toolbarTextStyle = document.getElementById(toolbarName);
        if (toolbarTextStyle) {
            const instance = toolbarTextStyle.ej2_instances[0];
            if (instance) {
                const cssClass = instance.items[index].cssClass;
                instance.items[index].cssClass = isSelected ? cssClass + ' tb-item-selected' : cssClass.replace(' tb-item-selected', '');
                instance.dataBind();
            }
        }
    }
}

class MindMapPropertyBinding {
    constructor(selectedItem) {
        this.selectedItem = selectedItem;
    }

    mindmapTextStyleChange(args) {
        this.updateMindMapTextStyle(args.item.tooltipText.toLowerCase(), false);
    }

    updateMindMapTextStyle(propertyName, propertyValue) {
        const diagram = selectedItem.selectedDiagram;
        if (diagram.nodes.length > 0) {
            diagram.nodes.forEach(node => {
                if (node.addInfo && node.annotations.length > 0) {
                    const annotation = node.annotations[0].style;
                    const addInfo = node.addInfo;
                    const levelType = selectedItem.mindmapSettings.levelType.value;
                    const mindmapTextStyleToolbar = document.getElementById('mindmapTextStyleToolbar').ej2_instances[0];
                    if ('Level' + addInfo.level === levelType || addInfo.level === levelType) {
                        switch (propertyName) {
                            case 'bold':
                                annotation.bold = !annotation.bold;
                                mindmapTextStyleToolbar.items[0].cssClass = annotation.bold ? 'tb-item-start tb-item-selected' : 'tb-item-start';
                                break;
                            case 'italic':
                                annotation.italic = !annotation.italic;
                                mindmapTextStyleToolbar.items[1].cssClass = annotation.italic ? 'tb-item-middle tb-item-selected' : 'tb-item-middle';
                                break;
                            case 'underline':
                                annotation.textDecoration = annotation.textDecoration === 'None' || !annotation.textDecoration ? 'Underline' : 'None';
                                mindmapTextStyleToolbar.items[2].cssClass = annotation.textDecoration === 'Underline' ? 'tb-item-end tb-item-selected' : 'tb-item-end';
                                break;
                        }
                    }
                }
            });
            diagram.dataBind();
            selectedItem.isModified = true;
        }
    }

    mindmapPatternChange(args) {
        const target = args.target;
        const diagram = selectedItem.selectedDiagram;
        diagram.historyManager.startGroupAction();
        selectedItem.selectedDiagram.nodes.forEach(node => {
            if (node.id !== 'textNode') {
                if (target.className === 'mindmap-pattern-style mindmap-pattern1') {
                    node.height = node.id === 'rootNode' ? 50 : 20;
                } else {
                    node.height = 50;
                }
                if (node.id !== 'rootNode') {
                    selectedItem.childNodeHeight = node.height;
                }
            }
        });
        selectedItem.selectedDiagram.connectors.forEach(connector => {
            switch (target.className) {
                case 'mindmap-pattern-style mindmap-pattern1':
                    connector.type = 'Bezier';
                    selectedItem.connectorType = 'Bezier';
                    MindMapUtilityMethods.templateType = 'template1';
                    break;
                case 'mindmap-pattern-style mindmap-pattern2':
                    connector.type = 'Bezier';
                    selectedItem.connectorType = 'Bezier';
                    MindMapUtilityMethods.templateType = 'template4';
                    break;
                case 'mindmap-pattern-style mindmap-pattern3':
                    connector.type = 'Orthogonal';
                    selectedItem.connectorType = 'Orthogonal';
                    MindMapUtilityMethods.templateType = 'template2';
                    break;
                case 'mindmap-pattern-style mindmap-pattern4':
                    connector.type = 'Straight';
                    selectedItem.connectorType = 'Straight';
                    MindMapUtilityMethods.templateType = 'template3';
                    break;
            }
        });
        diagram.historyManager.endGroupAction();
        selectedItem.selectedDiagram.doLayout();
        selectedItem.isModified = true;
    }
}

class OrgChartPropertyBinding {
    constructor(selectedItem) {
        this.selectedItem = selectedItem;
    }

    orgDropDownChange(args) {
        if (args.element) {
            const value = args.value ? args.value.toString() : '';
            const mappings = {
                'employeeId': 'id',
                'superVisorId': 'parent',
                'orgNameField': 'nameField',
                'orgImageField': 'imageField'
            };
            if (args.element.id in mappings) {
                selectedItem.orgDataSettings[mappings[args.element.id]] = value;
            }
        }
    }

    orgMultiSelectChange(args) {
        if (args.element) {
            const mappings = {
                'orgAdditionalField': 'additionalFields',
                'orgBindingFields': 'bindingFields'
            };
            if (args.element.id in mappings) {
                selectedItem.orgDataSettings[mappings[args.element.id]] = args.value;
            }
        }
    }

    orgChartSpacingChange(args) {
        if (args.event) {
            const target = args.event.target.tagName.toLowerCase() === 'span' ? args.event.target.parentElement.children[0] : args.event.target;
            const spacingMapping = {
                'orgHorizontalSpacing': 'horizontalSpacing',
                'orgVerticalSpacing': 'verticalSpacing'
            };
            if (target.id in spacingMapping) {
                selectedItem.selectedDiagram.layout[spacingMapping[target.id]] = args.value;
                selectedItem.selectedDiagram.dataBind();
            }
        }
    }

    orgChartAligmentChange(args) {
        const diagram = selectedItem.selectedDiagram;
        const commandType = args.item.tooltipText.replace(/[' ']/g, '').toLowerCase();
        const alignmentMappings = {
            'alignleft': 'Left',
            'alignright': 'Right',
            'aligncenter': 'Center',
            'aligntop': 'Top',
            'alignmiddle': 'Center',
            'alignbottom': 'Bottom'
        };
        if (commandType in alignmentMappings) {
            if (commandType.includes('alignleft') || commandType.includes('alignright') || commandType.includes('aligncenter')) {
                diagram.layout.horizontalAlignment = alignmentMappings[commandType];
            } else {
                diagram.layout.verticalAlignment = alignmentMappings[commandType];
            }
            selectedItem.isModified = true;
        }
    }

    layoutOrientationChange(args) {
        const orientationMappings = {
            'org-pattern-1': ['Vertical', 'Alternate'],
            'org-pattern-2': ['Vertical', 'Left'],
            'org-pattern-3': ['Vertical', 'Right'],
            'org-pattern-4': ['Horizontal', 'Center'],
            'org-pattern-5': ['Horizontal', 'Right'],
            'org-pattern-6': ['Horizontal', 'Left']
        };
        const targetId = args.target.className.split(' ')[1];
        if (targetId in orientationMappings) {
            OrgChartUtilityMethods.subTreeOrientation = orientationMappings[targetId][0];
            OrgChartUtilityMethods.subTreeAlignments = orientationMappings[targetId][1];
            selectedItem.selectedDiagram.layout.getLayoutInfo = (node, options) => {
                options.orientation = orientationMappings[targetId][0];
                options.type = orientationMappings[targetId][1];
            };
            selectedItem.selectedDiagram.doLayout();
            selectedItem.isModified = true;
        }
    }

    layoutPatternChange(args) {
        const targetId = args.target.id;
        const bindingFields = (targetId === 'orgPattern2' || targetId === 'orgPattern4');
        const imageField = (targetId === 'orgPattern3' || targetId === 'orgPattern4');
        selectedItem.utilityMethods.updateLayout(selectedItem, bindingFields, imageField);
    }

    getTooltipContent(args) {
        if (args.target && args.target.classList) {
            const classList = args.target.classList;
            if (classList.contains('db-employee-id')) {
                return 'Defines a unique column from the data source.';
            }
            if (classList.contains('db-supervisor-id')) {
                return 'Defines a column that is used to identify the person to whom the employee reports to.';
            }
            if (classList.contains('db-nameField-id')) {
                return 'Defines a column that has an employee name, and it appears at the top of the shapes.';
            }
            if (classList.contains('db-bindingField-id')) {
                return 'Defines columns that have employees’ contact information, and appear after the employees’ names in the shape.';
            }
            if (classList.contains('db-imageField-id')) {
                return 'Defines a column that has the picture of an employee.';
            }
            if (classList.contains('db-additionalField-id')) {
                return 'Defines columns that should be displayed through a tooltip.';
            }
        }
        return '';
    }
}

export { DiagramClientSideEvents, DiagramPropertyBinding, MindMapPropertyBinding, OrgChartPropertyBinding };
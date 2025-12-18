// utilitymethods.js

/**
 *  Home page handler
 */
import {OrgChartData, OrgChartUtilityMethods} from './orgchart';
import {MindMapUtilityMethods, MindMap} from './mindmap';
import { snapSettings, selectedItemSettings } from '../index';
import {PageCreation} from './pages';
export class PaperSize {
    constructor() {}
}

export class UtilityMethods {
    constructor() {
        this.flowChartImage = [
            { source: 'src/assets/dbstyle/common_images/blank_diagram.svg', name: 'Blank Diagram', type: 'svg_blank' },
            { source: 'src/assets/dbstyle/flowchart_Images/Credit_Card_Processing.svg', name: 'Credit Card Processing', type: 'svg_image' },
            { source: 'src/assets/dbstyle/flowchart_Images/Bank_Teller_Flow.svg', name: 'Banking Teller Process Flow', type: 'svg_image' },
            { source: 'src/assets/dbstyle/flowchart_Images/Developer_Workflow.SVG', name: 'Agile"s Developer Workflow', type: 'svg_image' },
        ];
        this.mindMapImage = [
            { source: 'src/assets/dbstyle/common_images/blank_diagram_mind.svg', name: 'Blank Diagram', type: 'svg_image' },
            { source: 'src/assets/dbstyle/mindmap_images/BusinessPlanning.SVG', name: 'Business Planning', type: 'svg_image' },
            { source: 'src/assets/dbstyle/mindmap_images/TQM.SVG', name: 'Quality Management', type: 'svg_image' },
            { source: 'src/assets/dbstyle/mindmap_images/SoftwareLifeCycle.SVG', name: 'Software Life Cycle', type: 'svg_image' },
        ];
        this.orgChartImage = [
            { source: 'src/assets/dbstyle/common_images/blank_diagram_org.svg', name: 'Blank Diagram', type: 'svg_image' },
            { source: 'src/assets/dbstyle/orgchart_images/OrgRenderingStyle_1.svg', name: 'Org Template Style - 1', type: 'svg_image' },
            { source: 'src/assets/dbstyle/orgchart_images/OrgRenderingStyle_2.svg', name: 'Org Template Style - 2', type: 'svg_image' },
            { source: 'src/assets/dbstyle/orgchart_images/OrgRenderingStyle_3.svg', name: 'Org Template Style - 3', type: 'svg_image' },
        ];
        this.bpmnImage = [
            { source: 'src/assets/dbstyle/common_images/blank_diagram.svg', name: 'Blank Diagram', type: 'svg_blank' },
            { source: 'src/assets/dbstyle/bpmn_images/Template1.png', name: 'BPMN Diagram 1' },
            { source: 'src/assets/dbstyle/bpmn_images/Template1.png', name: 'BPMN Diagram 2' },
            { source: 'src/assets/dbstyle/bpmn_images/Template1.png', name: 'BPMN Diagram 3' },
        ];
        this.fillColorCode = ['#C4F2E8', '#F7E0B3', '#E5FEE4', '#E9D4F1', '#D4EFED', '#DEE2FF'];
        this.borderColorCode = ['#8BC1B7', '#E2C180', '#ACCBAA', '#D1AFDF', '#90C8C2', '#BBBFD6'];
    }

    bindNodeProperties(node, selectedItem) {
        selectedItem.preventPropertyChange = true;
        selectedItem.nodeProperties.offsetX.value = (Math.round(node.offsetX * 100) / 100);
        selectedItem.nodeProperties.offsetY.value = (Math.round(node.offsetY * 100) / 100);
        selectedItem.nodeProperties.width.value = node.width ? (Math.round(node.width * 100) / 100) : (Math.round(node.minWidth * 100) / 100);
        selectedItem.nodeProperties.height.value = node.height ? (Math.round(node.height * 100) / 100) : (Math.round(node.minHeight * 100) / 100);
        if (selectedItem.selectedDiagram.selectedItems?.nodes?.length === 1) {
            selectedItem.nodeProperties.rotateAngle.value = node.rotateAngle;
        }
        selectedItem.nodeProperties.strokeColor.value = this.getHexColor(node.style.strokeColor);
        selectedItem.nodeProperties.strokeStyle.value = node.style.strokeDashArray ? node.style.strokeDashArray : 'None';
        selectedItem.nodeProperties.strokeWidth.value = node.style.strokeWidth;
        selectedItem.nodeProperties.fillColor.value = this.getHexColor(node.style.fill);
        selectedItem.nodeProperties.opacity.value = node.style.opacity * 100;
        selectedItem.nodeProperties.aspectRatio.checked = node.constraints & ej.diagrams.NodeConstraints.AspectRatio ? true : false;
        selectedItem.nodeProperties.gradient = node.style.gradient.type !== 'None' ? true : false;
        const gradientElement = document.getElementById('gradientStyle');
        if (selectedItem.nodeProperties.gradient) {
            gradientElement.className = 'row db-prop-row db-gradient-style-show';
            document.getElementById('gradient').ej2_instances[0].checked = true;
            selectedItem.nodeProperties.gradientColor.value = node.style.gradient.stops[1].color;
            const gradient = node.style.gradient;
            if (gradient.x1) {
                selectedItem.nodeProperties.gradientDirection.value = 'North';
            }
            else if (gradient.x2) {
                selectedItem.nodeProperties.gradientDirection.value = 'East';
            }
            else if (gradient.y1) {
                selectedItem.nodeProperties.gradientDirection.value = 'West';
            }
            else if (gradient.y2) {
                selectedItem.nodeProperties.gradientDirection.value = 'South';
            }
        }
        else {
            gradientElement.className = 'row db-prop-row db-gradient-style-hide';
            document.getElementById('gradient').ej2_instances[0].checked = false;
            selectedItem.nodeProperties.gradientColor.value = '#ffffff';
            selectedItem.nodeProperties.gradientDirection.value = 'South';
        }
        selectedItem.preventPropertyChange = false;
    }

    bindMindMapProperties(node, selectedItem) {
        selectedItem.preventPropertyChange = true;
        selectedItem.mindmapSettings.stroke.value = node.style.strokeColor;
        selectedItem.mindmapSettings.strokeStyle.value = node.style.strokeDashArray ? node.style.strokeDashArray : 'None';
        selectedItem.mindmapSettings.strokeWidth.value = node.style.strokeWidth;
        selectedItem.mindmapSettings.fill.value = node.style.fill;
        selectedItem.mindmapSettings.opacity.value = (node.style.opacity || 1) * 100;
        if (node.annotations.length > 0) {
            const annotation = node.annotations[0].style;
            selectedItem.mindmapSettings.fontFamily.value = annotation.fontFamily;
            selectedItem.mindmapSettings.fontColor.value = annotation.color;
            selectedItem.mindmapSettings.fontSize.value = annotation.fontSize;
            selectedItem.mindmapSettings.textOpacity.value = (annotation.opacity || 1) * 100;
            //Bind text style toolbar with mindmap.
            let mindmapTextStyleToolbar = document.getElementById('mindmapTextStyleToolbar').ej2_instances[0];
            mindmapTextStyleToolbar.items[0].cssClass = annotation.bold ? 'tb-item-start tb-item-selected' : 'tb-item-start';
            mindmapTextStyleToolbar.items[1].cssClass = annotation.italic ? 'tb-item-middle tb-item-selected' : 'tb-item-middle';
            mindmapTextStyleToolbar.items[2].cssClass = annotation.textDecoration === 'Underline' ? 'tb-item-end tb-item-selected' : 'tb-item-end';
        }
        selectedItem.preventPropertyChange = false;
    }

    bindTextProperties(text, selectedItem) {
        selectedItem.preventPropertyChange = true;
        selectedItem.textProperties.fontColor.value = this.getHexColor(text.color);
        selectedItem.textProperties.fontFamily.value = text.fontFamily;
        selectedItem.textProperties.fontSize.value = text.fontSize;
        selectedItem.textProperties.opacity.value = text.opacity * 100;
        let toolbarTextStyle = document.getElementById('toolbarTextStyle');
        if (toolbarTextStyle) {
            toolbarTextStyle = toolbarTextStyle.ej2_instances[0];
        }
        if (toolbarTextStyle) {
            toolbarTextStyle.items[0].cssClass = text.bold ? 'tb-item-start tb-item-selected' : 'tb-item-start';
            toolbarTextStyle.items[1].cssClass = text.italic ? 'tb-item-middle tb-item-selected' : 'tb-item-middle';
            toolbarTextStyle.items[2].cssClass = text.textDecoration === 'Underline' ? 'tb-item-end tb-item-selected' : 'tb-item-end';
        }
        this.updateTextAlign(text.textAlign);
        selectedItem.preventPropertyChange = false;
    }

    updateTextAlign(textAlign) {
        let toolbarTextSubAlignment = document.getElementById('toolbarTextSubAlignment');
        if (toolbarTextSubAlignment) {
            toolbarTextSubAlignment = toolbarTextSubAlignment.ej2_instances[0];
        }
        if (toolbarTextSubAlignment) {
            for (let i = 0; i < toolbarTextSubAlignment.items.length; i++) {
                toolbarTextSubAlignment.items[i].cssClass = toolbarTextSubAlignment.items[i].cssClass.replace(' tb-item-selected', '');
            }
            const index = textAlign === 'Left' ? 0 : (textAlign === 'Center' ? 1 : 2);
            toolbarTextSubAlignment.items[index].cssClass = toolbarTextSubAlignment.items[index].cssClass + ' tb-item-selected';
        }
    }
    // Seperated text align toolbar so modified the function accordingly
    updateHorVertAlign(horizontalAlignment, verticalAlignment) {
        let toolbarHorAlignment = document.getElementById('toolbarTextAlignmentHor');
        let toolbarVerAlignment = document.getElementById('toolbarTextAlignmentVer');

        if (toolbarHorAlignment) {
            toolbarHorAlignment = toolbarHorAlignment.ej2_instances[0];
        }
         if (toolbarVerAlignment) {
            toolbarVerAlignment = toolbarVerAlignment.ej2_instances[0];
        }
        if (toolbarHorAlignment) {
            for (let i = 0; i < toolbarHorAlignment.items.length; i++) {
                toolbarHorAlignment.items[i].cssClass = toolbarHorAlignment.items[i].cssClass.replace(' tb-item-selected', '');
            }
            let index = horizontalAlignment === 'Right' ? 0 : (horizontalAlignment === 'Center' ? 1 : 2);
            toolbarHorAlignment.items[index].cssClass = toolbarHorAlignment.items[index].cssClass + ' tb-item-selected';
        }
         if (toolbarVerAlignment) {
            for (let i = 0; i < toolbarVerAlignment.items.length; i++) {
                toolbarVerAlignment.items[i].cssClass = toolbarVerAlignment.items[i].cssClass.replace(' tb-item-selected', '');
            }
            let index = verticalAlignment === 'Bottom' ? 0 : (verticalAlignment === 'Center' ? 1 : 2);
            toolbarVerAlignment.items[index].cssClass = toolbarVerAlignment.items[index].cssClass + ' tb-item-selected';
        }
    }

    bindConnectorProperties(connector, selectedItem) {
        selectedItem.preventPropertyChange = true;
        selectedItem.connectorProperties.lineColor.value = this.getHexColor(connector.style.strokeColor);
        selectedItem.connectorProperties.lineStyle.value = connector.style.strokeDashArray ? connector.style.strokeDashArray : 'None';
        selectedItem.connectorProperties.lineType.value = connector.type;
        selectedItem.connectorProperties.lineWidth.value = connector.style.strokeWidth;
        selectedItem.connectorProperties.sourceType.value = connector.sourceDecorator.shape;
        selectedItem.connectorProperties.targetType.value = connector.targetDecorator.shape;
        selectedItem.connectorProperties.opacity.value = connector.style.opacity * 100;
        selectedItem.connectorProperties.lineJumpSize.value = connector.bridgeSpace;
        selectedItem.connectorProperties.lineJump.checked = connector.constraints & ej.diagrams.ConnectorConstraints.Bridging ? true : false;
        selectedItem.connectorProperties.targetSize.value = connector.targetDecorator.width;
        selectedItem.connectorProperties.sourceSize.value = connector.sourceDecorator.width;
        selectedItem.preventPropertyChange = false;
    }

    getHexColor(colorStr) {
        const a = document.createElement('div');
        a.style.color = colorStr;
        const colors = window.getComputedStyle(document.body.appendChild(a)).color.match(/\d+/g).map(a => parseInt(a, 10));
        document.body.removeChild(a);
        return (colors.length >= 3) ? '#' + (((1 << 24) + (colors[0] << 16) + (colors[1] << 8) + colors[2]).toString(16).substr(1)) : '';
    }

    getOffset(position) {
        switch (position.toLowerCase()) {
            case 'topleft':
                return { x: 0, y: 0 };
            case 'topcenter':
                return { x: 0.5, y: 0 };
            case 'topright':
                return { x: 1, y: 0 };
            case 'middleleft':
                return { x: 0, y: 0.5 };
            case 'middleright':
                return { x: 1, y: 0.5 };
            case 'bottomleft':
                return { x: 0, y: 1 };
            case 'bottomcenter':
                return { x: 0.5, y: 1 };
            case 'bottomright':
                return { x: 1, y: 1 };
            default:
                return { x: 0.5, y: 0.5 };
        }
    }

    getPosition(offset) {
        if (offset.x === 0 && offset.y === 0) {
            return 'TopLeft';
        }
        else if (offset.x === 0.5 && offset.y === 0) {
            return 'TopCenter';
        }
        else if (offset.x === 1 && offset.y === 0) {
            return 'TopRight';
        }
        else if (offset.x === 0 && offset.y === 0.5) {
            return 'MiddleLeft';
        }
        else if (offset.x === 1 && offset.y === 0.5) {
            return 'MiddleRight';
        }
        else if (offset.x === 0 && offset.y === 1) {
            return 'BottomLeft';
        }
        else if (offset.x === 0.5 && offset.y === 1) {
            return 'BottomCenter';
        }
        else if (offset.x === 1 && offset.y === 1) {
            return 'BottomRight';
        }
        else {
            return 'Center';
        }
    }

    hideElements(elementType, diagram, diagramType) {
        const diagramContainer = document.getElementsByClassName('diagrambuilder-container')[0];
        if (diagramContainer.classList.contains(elementType)) {
            if (!(diagramType === 'mindmap-diagram' || diagramType === 'orgchart-diagram')) {
                diagramContainer.classList.remove(elementType);
            }
        }
        else {
            diagramContainer.classList.add(elementType);
        }
        if (diagram) {
            diagram.updateViewPort();
        }
    }

    objectTypeChange(objectType) {
        document.getElementById('diagramPropertyContainer').style.display = 'none';
        document.getElementById('nodePropertyContainer').style.display = 'none';
        document.getElementById('textPropertyContainer').style.display = 'none';
        document.getElementById('connectorPropertyContainer').style.display = 'none';
        switch (objectType) {
            case 'diagram':
                document.getElementById('diagramPropertyContainer').style.display = '';
                break;
            case 'node':
                document.getElementById('nodePropertyContainer').style.display = '';
                break;
            case 'connector':
                document.getElementById('connectorPropertyContainer').style.display = '';
                break;
        }
    }

    getDefaultDiagramTemplates1(selectedItem, tempCount, backgroundColor, parentId) {
        tempCount = tempCount ? tempCount : 4;
        backgroundColor = backgroundColor ? backgroundColor : 'red';
        parentId = parentId ? parentId : 'Flow Chart';
        let parentDiv = document.getElementById('diagramTemplateDiv1');
        parentDiv = parentDiv.cloneNode(true);
        parentDiv.id = '';
        parentDiv.style.display = '';
        const parentElements = parentDiv.getElementsByClassName('db-diagram-template-parent-text');
        for (let i = 0; i < parentElements.length; i++) {
            if (parentElements[i].children[0].innerHTML.trim() === parentId) {
                parentElements[i].classList.add('active');
            }
            parentElements[i].onclick = this.showDiagramTemplates.bind(this, selectedItem);
        }
        const diagramTemplatesDiv = parentDiv.getElementsByClassName('diagramTemplates')[0];
        diagramTemplatesDiv.appendChild(this.generateDiagramTemplates(tempCount, backgroundColor, parentId, selectedItem));
        this.tempDialog.content = parentDiv.outerHTML;
        this.tempDialog.dataBind();
        this.triggerTemplateEvent(selectedItem);
        return this.tempDialog.content;
    }

    generateDiagramTemplates(tempCount, backgroundColor, parentId, selectedItem) {
        const parentTemplateDiv = document.createElement('div');
        parentTemplateDiv.classList.add('class', 'db-parent-diagram-template');
        const divElement = document.getElementById('diagramTemplateDiv');
        for (let i = 0; i < tempCount; i++) {
            const cloneTemplateDiv = divElement.cloneNode(true);
            cloneTemplateDiv.style.display = '';
            cloneTemplateDiv.id = '';
            const imageDiv = cloneTemplateDiv.children[0];
            imageDiv.setAttribute('id', parentId.replace(' ', '').toLowerCase() + '_child' + i);
            imageDiv.onclick = this.generateDiagram.bind(this, selectedItem);
            const diagramType = this.getImageSource(parentId, i);
            imageDiv.children[0].style.backgroundImage = 'url(' + diagramType.source + ')';
            if (diagramType.type) {
                if (diagramType.type === 'svg_blank') {
                    imageDiv.children[0].className = 'db-diagram-template-svg-blank-image';
                }
                else {
                    imageDiv.children[0].className = 'db-diagram-template-svg-image';
                }
            }
            else {
                imageDiv.children[0].className = 'db-diagram-template-image';
            }
            cloneTemplateDiv.children[1].children[0].innerHTML = diagramType.name;
            parentTemplateDiv.appendChild(cloneTemplateDiv);
        }
        return parentTemplateDiv;
    }

    triggerTemplateEvent(selectedItem) {
        const parentElements = document.getElementsByClassName('db-diagram-template-parent-text');
        for (let i = 0; i < parentElements.length; i++) {
            parentElements[i].onclick = this.showDiagramTemplates.bind(this, selectedItem);
        }
        const parentElements1 = document.getElementsByClassName('db-diagram-template-image-div');
        for (let i = 0; i < parentElements1.length; i++) {
            parentElements1[i].onclick = this.generateDiagram.bind(this, selectedItem);
        }
    }

    getImageSource(diagramType, index) {
        switch (diagramType) {
            case 'Flow Chart':
                return this.flowChartImage[index];
            case 'Mind Map':
                return this.mindMapImage[index];
            case 'Org Chart':
                return this.orgChartImage[index];
            default:
                return this.bpmnImage[index];
        }
    }

    readTextFile(file, selectedItem) {
        document.getElementsByClassName('sb-content-overlay')[0].style.display = '';
        const ajax = new ej.base.Ajax(file, 'GET', true);
        ajax.send().then();
        ajax.onSuccess = (data) => {
            selectedItem.preventSelectionChange = true;
            selectedItem.isTemplateLoad = true;
            this.page.loadPage(data);
            this.page.loadDiagramSettings();
            selectedItem.isTemplateLoad = false;
            if (selectedItem.diagramType === 'MindMap') {
                const rootNode = MindMapUtilityMethods.getNode(selectedItem.selectedDiagram.nodes, 'rootNode');
                selectedItem.utilityMethods.bindMindMapProperties(rootNode, selectedItem);
            }
            if (selectedItem.diagramType === 'OrgChart') {
                selectedItem.selectedDiagram.selectedItems.userHandles = OrgChartUtilityMethods.handle;
                selectedItem.selectedDiagram.selectedItems.constraints = ej.diagrams.SelectorConstraints.UserHandle;
                selectedItem.selectedDiagram.dataBind();
            }
            selectedItem.preventSelectionChange = false;
            document.getElementsByClassName('sb-content-overlay')[0].style.display = 'none';
        };
        ajax.onFailure = (data) => {
            document.getElementsByClassName('sb-content-overlay')[0].style.display = 'none';
        };
        ajax.onError = (evt) => {
            document.getElementsByClassName('sb-content-overlay')[0].style.display = 'none';
            return null;
        };
    }

    generateDiagram(selectedItem, evt) {
        const diagramContainer = document.getElementsByClassName('diagrambuilder-container')[0];
        const target = evt.target;
        if (target.id.startsWith('mindmap')) {
            selectedItem.diagramType = 'MindMap';
            MindMapUtilityMethods.selectedItem = selectedItem;
            const mindMapObject = new MindMap(selectedItem);
            if (target.id === 'mindmap_child0') {
                mindMapObject.createMindMap(true);
                MindMapUtilityMethods.templateType = 'template1';
            }
            else if (target.id === 'mindmap_child1') {
                mindMapObject.createMindMap(false);
                this.readTextFile('src/assets/dbstyle/mindmap_images/BusinessPlanning.json', selectedItem);
                MindMapUtilityMethods.templateType = 'template1';
            }
            else if (target.id === 'mindmap_child2') {
                mindMapObject.createMindMap(false);
                this.readTextFile('src/assets/dbstyle/mindmap_images/TQM.json', selectedItem);
                MindMapUtilityMethods.templateType = 'template2';
            }
            else if (target.id === 'mindmap_child3') {
                mindMapObject.createMindMap(false);
                this.readTextFile('src/assets/dbstyle/mindmap_images/SoftwareDevelopmentLifeCycle.json', selectedItem);
                MindMapUtilityMethods.templateType = 'template1';
            }
            this.hideMenuItems();
            diagramContainer.classList.add('custom-diagram');
        }
        else if (target.id.startsWith('orgchart')) {
            selectedItem.diagramType = 'OrgChart';
            OrgChartUtilityMethods.selectedItem = selectedItem;
            const orgChartObject = new OrgChartData(selectedItem);
            if (target.id === 'orgchart_child0') {
                orgChartObject.createOrgChart(true);
            }
            else {
                OrgChartUtilityMethods.subTreeOrientation = 'Horizontal';
                OrgChartUtilityMethods.subTreeAlignments = 'Center';
                if (target.id === 'orgchart_child1') {
                    orgChartObject.createOrgChart(false);
                    this.readTextFile('src/assets/dbstyle/orgchart_images/OrgTemplateStyle1.json', selectedItem);
                }
                else if (target.id === 'orgchart_child2') {
                    orgChartObject.createOrgChart(false);
                    this.readTextFile('src/assets/dbstyle/orgchart_images/OrgTemplateStyle2.json', selectedItem);
                }
                else if (target.id === 'orgchart_child3') {
                    orgChartObject.createOrgChart(false);
                    this.readTextFile('src/assets/dbstyle/orgchart_images/OrgTemplateStyle3.json', selectedItem);
                }
            }
            this.hideMenuItems();
            diagramContainer.classList.add('custom-diagram');
        }
        else if (target.id.startsWith('flowchart')) {
            if (target.id === 'flowchart_child0') {
                this.hideShortcutVisibility();
                selectedItem.selectedDiagram.snapSettings = snapSettings;
                selectedItem.selectedDiagram.selectedItems = selectedItemSettings;
                selectedItem.selectedDiagram.selectedItems.userHandles = [];
                selectedItem.selectedDiagram.clear();
                this.updatePalette(selectedItem.selectedDiagram);
            }
            else if (target.id === 'flowchart_child1') {
                this.readTextFile('src/assets/dbstyle/flowchart_Images/CreditCardFlow.json', selectedItem);
            }
            else if (target.id === 'flowchart_child2') {
                this.readTextFile('src/assets/dbstyle/flowchart_Images/BankingTellerProcess.json', selectedItem);
            }
            else if (target.id === 'flowchart_child3') {
                this.readTextFile('src/assets/dbstyle/flowchart_Images/Developer_Workflow.json', selectedItem);
            }
            selectedItem.diagramType = 'GeneralDiagram';
            diagramContainer.classList.add('general-diagram');
        }
        else {
            selectedItem.selectedDiagram.clear();
            selectedItem.diagramType = 'GeneralDiagram';
            diagramContainer.classList.add('general-diagram');
        }
        const diagramName = target.parentElement.children[1].children[0].innerHTML;
        if (diagramName !== 'Blank Diagram') {
            document.getElementById('diagramName').innerHTML = diagramName;
        }
        this.tempDialog.hide();
    }

    hideMenuItems() {
        const btnWindow = document.getElementById('diagram-menu').ej2_instances[0].items[4];
        btnWindow.items[1].iconCss = '';
        const btnView = document.getElementById('diagram-menu').ej2_instances[0].items[2]
        btnView.items[7].iconCss = '';
    }

    currentDiagramVisibility(diagramname, selectedItem) {
        if (diagramname === 'mindmap-diagram' || diagramname === 'orgchart-diagram') {
            selectedItem.utilityMethods.hideElements('hide-palette', null, diagramname);
            const diagramContainer = document.getElementsByClassName('db-current-diagram-container')[0];
            diagramContainer.classList.add(diagramname);
            const propertyContainer = document.getElementsByClassName('db-property-editor-container')[0];
            if (diagramname === 'mindmap-diagram') {
                propertyContainer.classList.remove('orgchart-diagram');
            }
            else {
                propertyContainer.classList.remove('mindmap-diagram');
            }
            propertyContainer.classList.add(diagramname);
        }
    }

    showDiagramTemplates(selectedItem, evt) {
        let target = evt.target;
        if (target.tagName.toLowerCase() === 'span') {
            target = target.parentElement;
        }
        switch (target.children[0].innerHTML.trim()) {
            case 'Flow Chart':
                this.getDefaultDiagramTemplates1(selectedItem, 4, 'red', 'Flow Chart');
                break;
            case 'Mind Map':
                this.getDefaultDiagramTemplates1(selectedItem, 4, 'blue', 'Mind Map');
                break;
            case 'Org Chart':
                this.getDefaultDiagramTemplates1(selectedItem, 4, 'orange', 'Org Chart');
                break;
            case 'BPMN':
                this.getDefaultDiagramTemplates1(selectedItem, 4, 'brown', 'BPMN');
                break;
        }
    }

    enableToolbarItems(selectedItems) {
        const toolbarContainer = document.getElementsByClassName('db-toolbar-container')[0];
        let toolbarClassName = 'db-toolbar-container';
        if (toolbarContainer.classList.contains('db-undo')) {
            toolbarClassName += ' db-undo';
        }
        if (toolbarContainer.classList.contains('db-redo')) {
            toolbarClassName += ' db-redo';
        }
        toolbarContainer.className = toolbarClassName;
        if (selectedItems.length === 1) {
            toolbarContainer.className = toolbarContainer.className + ' db-select';
            if (selectedItems[0] instanceof ej.diagrams.Node) {
                if (selectedItems[0].children) {
                    if (selectedItems[0].children.length > 2) {
                        toolbarContainer.className = toolbarContainer.className + ' db-select db-multiple db-node db-group';
                    }
                    else {
                        toolbarContainer.className = toolbarContainer.className + ' db-select db-node db-group';
                    }
                }
                else {
                    toolbarContainer.className = toolbarContainer.className + ' db-select db-node';
                }
            }
        }
        else if (selectedItems.length === 2) {
            toolbarContainer.className = toolbarContainer.className + ' db-select db-double';
        }
        else if (selectedItems.length > 2) {
            toolbarContainer.className = toolbarContainer.className + ' db-select db-double db-multiple';
        }
        if (selectedItems.length > 1) {
            let isNodeExist = false;
            for (let i = 0; i < selectedItems.length; i++) {
                if (selectedItems[i] instanceof ej.diagrams.Node) {
                    toolbarContainer.className = toolbarContainer.className + ' db-select db-node';
                    break;
                }
            }
        }
    }

    enableMenuItems(itemText, selectedItem) {
        const selectedDiagram = diagram.ej2_instances ? diagram.ej2_instances[0] : selectedItem.selectedDiagram;
        let selectedItems = selectedDiagram.selectedItems.nodes;
        selectedItems = selectedItems.concat(selectedDiagram.selectedItems.connectors);
        if (itemText) {
            const commandType = itemText.replace(/[' ']/g, '');
            if (selectedItems.length === 0 || selectedItem.diagramType !== 'GeneralDiagram') {
                switch (commandType.toLowerCase()) {
                    case 'edittooltip':
                        const disable = !(selectedItems.length === 1);
                        return disable;
                    case 'cut':
                    case 'copy':
                    case 'delete':
                    case 'duplicate':
                        return true;
                }
            }
            if (selectedItems.length > 1) {
                if (commandType.toLowerCase() === 'edittooltip') {
                    return true;
                }
            }
            if (selectedItem.pasteData.length === 0 && itemText === 'Paste') {
                return true;
            }
            if (itemText === 'Undo' && selectedItem.selectedDiagram.historyManager.undoStack.length === 0) {
                return true;
            }
            if (itemText === 'Redo' && selectedItem.selectedDiagram.historyManager.redoStack.length === 0) {
                return true;
            }
            if (itemText === 'Select All') {
                if (selectedItem.diagramType !== 'GeneralDiagram' || (selectedItem.selectedDiagram.nodes.length === 0 && selectedItem.selectedDiagram.connectors.length === 0)) {
                    return true;
                }
            }
            if (['Align Objects', 'Distribute Objects', 'Match Size', 'Group'].includes(itemText)) {
                if (selectedItems.length < 2) {
                    return true;
                }
            }
            if (['Bring To Front', 'Send To Back', 'Bring Forward', 'Send Backward'].includes(itemText)) {
                if (selectedItems.length !== 1) {
                    return true;
                }
            }
            if (['Lock', 'Unlock'].includes(itemText)) {
                if (selectedItems.length < 1) {
                    return true;
                } else {
                    if (itemText === 'Lock') {
                        for (let i = 0; i < selectedItems.length; i++) {
                            if (selectedItems[i].constraints !== ej.diagrams.NodeConstraints.Default) {
                                return true;
                            }
                        }
                    } else {
                        for (let i = 0; i < selectedItems.length; i++) {
                            if (selectedItems[i].constraints === ej.diagrams.NodeConstraints.Default) {
                                return true;
                            }
                        }
                    }
                }
            }
            if (itemText === 'Ungroup') {
                if (selectedItems.length !== 1 || !(selectedItems[0] instanceof ej.diagrams.Node) || !selectedItems[0].children || selectedItems[0].children.length === 0) {
                    return true;
                }
            }
            if (selectedItem.diagramType !== 'GeneralDiagram') {
                if (['Themes', 'Paste', 'Show Rulers', 'Show Layers', 'Show Guides', 'Show Grid', 'Snap To Grid', 'Show Stencil','Align Objects', 'Distribute Objects', 'Match Size', 'Group',
                    'Bring To Front', 'Send To Back', 'Bring Forward', 'Send Backward','Lock', 'Unlock','Ungroup'].includes(itemText)) {
                    return true;
                }
            }
        }
        return false;
    }

    enableArrangeMenuItems(selectedItem) {
        const contextInstance = document.getElementById('arrangeContextMenu');
        const contextMenu = contextInstance.ej2_instances[0];
        let selectedItems = selectedItem.selectedDiagram.selectedItems.nodes;
        selectedItems = selectedItems.concat(selectedItem.selectedDiagram.selectedItems.connectors);
        for (let i = 0; i < contextMenu.items.length; i++) {
            contextMenu.enableItems([contextMenu.items[i].text], false);
        }
        if (selectedItem.diagramType === 'GeneralDiagram') {
            if (selectedItems.length > 1) {
                contextMenu.enableItems(['Align Objects', 'Distribute Objects', 'Match Size', 'Lock', 'Unlock', 'Group'], true);
                for (let i = 0; i < 1; i++) {
                    if(selectedItems[i].constraints & ej.diagrams.NodeConstraints.Drag) {
                        contextMenu.enableItems(['Lock'], true);
                        contextMenu.enableItems(['Unlock'], false);
                    }
                    else {
                        contextMenu.enableItems(['Lock'], false);
                        contextMenu.enableItems(['Unlock'], true);
                    }
                }
            }
            else if (selectedItems.length === 1) {
                contextMenu.enableItems(['Send To Back', 'Bring To Front', 'Send Backward', 'Bring Forward']);
                const object = selectedItems[0];
                if (object instanceof ej.diagrams.Node) {
                    if (object.children && object.children.length > 0) {
                        contextMenu.enableItems(['Ungroup']);
                    }
                    if (object.constraints & ej.diagrams.NodeConstraints.Drag) {
                        contextMenu.enableItems(['Lock'], true);
                        contextMenu.enableItems(['Unlock'], false);
                    }
                    else {
                        contextMenu.enableItems(['Unlock'], true);
                        contextMenu.enableItems(['Lock'], false);
                    }
                }
            }
        }
    }

    getPaperSize(paperName) {
        const paperSize = new PaperSize();
        switch (paperName) {
            case 'Letter':
                paperSize.pageWidth = 816;
                paperSize.pageHeight = 1056;
                break;
            case 'Legal':
                paperSize.pageWidth = 816;
                paperSize.pageHeight = 1344;
                break;
            case 'Tabloid':
                paperSize.pageWidth = 1056;
                paperSize.pageHeight = 1632;
                break;
            case 'A3':
                paperSize.pageWidth = 1122;
                paperSize.pageHeight = 1587;
                break;
            case 'A4':
                paperSize.pageWidth = 793;
                paperSize.pageHeight = 1122;
                break;
            case 'A5':
                paperSize.pageWidth = 559;
                paperSize.pageHeight = 793;
                break;
            case 'A6':
                paperSize.pageWidth = 396;
                paperSize.pageHeight = 559;
                break;
        }
        return paperSize;
    }

    removeChild(selectedItem) {
        const diagram = selectedItem.selectedDiagram;
        if (diagram.selectedItems.nodes.length > 0) {
            selectedItem.preventPropertyChange = true;
            diagram.historyManager.startGroupAction();
            this.removeSubChild(diagram.selectedItems.nodes[0], selectedItem);
            diagram.historyManager.endGroupAction();
            diagram.doLayout();
            selectedItem.preventPropertyChange = false;
        }
        selectedItem.isModified = true;
    }

    removeSubChild(node, selectedItem) {
        const diagram = selectedItem.selectedDiagram;
        for (let i = node.outEdges.length - 1; i >= 0; i--) {
            const connector = MindMapUtilityMethods.getConnector(diagram.connectors, node.outEdges[i]);
            const childNode = MindMapUtilityMethods.getNode(diagram.nodes, connector.targetID);
            if (childNode != null && childNode.outEdges.length > 0) {
                this.removeSubChild(childNode, selectedItem);
            }
            else {
                diagram.remove(childNode);
            }
        }
        for (let j = node.inEdges.length - 1; j >= 0; j--) {
            const connector = MindMapUtilityMethods.getConnector(diagram.connectors, node.inEdges[j]);
            const childNode = MindMapUtilityMethods.getNode(diagram.nodes, connector.sourceID);
            let index = childNode.outEdges.indexOf(connector.id);
            if (childNode.outEdges.length > 1 && index === 0) {
                index = childNode.outEdges.length;
            }
            if (index > 0) {
                const node1 = childNode.outEdges[index - 1];
                const connector1 = diagram.getObject(node1);
                const node2 = MindMapUtilityMethods.getNode(diagram.nodes, connector1.targetID);
                diagram.select([node2]);
            }
            else {
                diagram.select([childNode]);
            }
        }
        diagram.remove(node);
    }

    cutLayout(selectedItem) {
        const diagram = selectedItem.selectedDiagram;
        if (diagram.selectedItems.nodes.length) {
            selectedItem.utilityMethods.copyLayout(selectedItem);
            selectedItem.utilityMethods.removeChild(selectedItem);
            diagram.doLayout();
            selectedItem.isModified = true;
        }
    }

    copyLayout(selectedItem) {
        const diagram = selectedItem.selectedDiagram;
        const selectedNode = diagram.selectedItems.nodes[0];
        if (selectedNode.id !== 'rootNode') {
            selectedItem.pasteData = CommonKeyboardCommands.cloneSelectedItemswithChildElements();
        }
    }

    pasteLayout(selectedItem) {
        selectedItem.isCopyLayoutElement = true;
        if (selectedItem.diagramType === 'MindMap') {
            MindMapUtilityMethods.mindmapPaste();
        }
        else if (selectedItem.diagramType === 'OrgChart') {
            OrgChartUtilityMethods.orgchartPaste();
        }
        selectedItem.isCopyLayoutElement = false;
        selectedItem.isModified = true;
    }

    undoRedoLayout(isUndo, selectedItem) {
        const diagram = selectedItem.selectedDiagram;
        if (isUndo) {
            diagram.undo();
        }
        else {
            diagram.redo();
        }
        if (diagram.selectedItems.nodes.length === 0) {
            this.updateSectionForNode(selectedItem);
        }
        diagram.doLayout();
        selectedItem.isModified = true;
    }

    updateSectionForNode(selectedItem) {
        const diagram = selectedItem.selectedDiagram;
        for (let i = 0; i < diagram.nodes.length; i++) {
            const newSelection = diagram.nodes[i];
            if (newSelection.id === 'rootNode') {
                selectedItem.preventPropertyChange = true;
                diagram.select([newSelection]);
                selectedItem.preventPropertyChange = false;
            }
        }
    }

    updateLayout(selectedItem, bindBindingFields, imageField) {
        selectedItem.selectedDiagram.constraints = selectedItem.selectedDiagram.constraints &= ~ej.diagrams.DiagramConstraints.UndoRedo;
        for (let i = 0; i < selectedItem.selectedDiagram.nodes.length; i++) {
            const node = selectedItem.selectedDiagram.nodes[i];
            if (node.id !== 'textNode') {
                const nodeInfo = node.addInfo;
                const keys = Object.keys(nodeInfo);
                const bindingFields = [];
                const additionalFields = [];
                let propName = 'Name';
                if (nodeInfo[propName] && nodeInfo[propName].checked) {
                    bindingFields.push(propName);
                }
                for (let i_1 = 0; i_1 < keys.length; i_1++) {
                    const keyValue = nodeInfo[keys[i_1]];
                    if (keyValue && keyValue.type === 'bindingField') {
                        if (keyValue.checked) {
                            if (bindBindingFields) {
                                bindingFields.push(keys[i_1]);
                            }
                        }
                        else {
                            additionalFields.push(keys[i_1]);
                        }
                    }
                }
                selectedItem.selectedDiagram.removeLabels(node, node.annotations);
                propName = 'Image URL';
                if (!imageField) {
                    node.minWidth = 150;
                    node.minHeight = 50;
                    selectedItem.selectedDiagram.dataBind();
                    node.shape = { type: 'Basic', shape: 'Rectangle', cornerRadius: 5 };
                    selectedItem.selectedDiagram.dataBind();
                }
                else if (imageField) {
                    node.minWidth = 300;
                    node.minHeight = 100;
                    selectedItem.selectedDiagram.dataBind();
                    node.shape = {
                        type: 'Image', source: nodeInfo[propName] && nodeInfo[propName].value ? nodeInfo[propName].value.toString() : 'src/assets/dbstyle/orgchart_images/blank-male.jpg',
                        align: 'XMinYMin', scale: 'Meet'
                    };
                    node.addInfo[propName].value = node.shape.source;
                    selectedItem.selectedDiagram.dataBind();
                }
                const annotations = [];
                let startY = 0.5 - ((bindingFields.length - 1) / 10);
                for (let i_2 = 0; i_2 < bindingFields.length; i_2++) {
                    const annotation1 = {
                        content: nodeInfo[bindingFields[i_2]].value.toString() || bindingFields[i_2], addInfo: bindingFields[i_2], offset: { x: 0.5, y: startY }
                    };
                    if (node.shape && node.shape.type === 'Image') {
                        annotation1.offset.x = 0;
                        annotation1.margin = { left: 110 };
                        annotation1.horizontalAlignment = 'Left';
                    }
                    if (i_2 === 0) {
                        annotation1.style = { fontSize: 14, bold: true };
                    }
                    startY += 0.2;
                    annotations.push(annotation1);
                }
                if (annotations.length > 0) {
                    selectedItem.selectedDiagram.addLabels(node, annotations);
                }
                let content = '';
                if (additionalFields.length > 0) {
                    for (let i_3 = 0; i_3 < additionalFields.length; i_3++) {
                        if (nodeInfo[additionalFields[i_3]].value) {
                            content += additionalFields[i_3] + ':' + nodeInfo[additionalFields[i_3]].value + '\n';
                        }
                    }
                }
                if (content) {
                    node.tooltip = { content: content, position: 'BottomCenter', relativeMode: 'Object' };
                    node.constraints = ej.diagrams.NodeConstraints.Default | ej.diagrams.NodeConstraints.Tooltip;
                }
                else {
                    node.constraints = ej.diagrams.NodeConstraints.Default & ~ej.diagrams.NodeConstraints.Tooltip;
                }
            }
        }
        selectedItem.selectedDiagram.dataBind();
        selectedItem.selectedDiagram.doLayout();
        selectedItem.isModified = true;
        selectedItem.selectedDiagram.constraints = selectedItem.selectedDiagram.constraints |= ej.diagrams.DiagramConstraints.UndoRedo;
    }

    createShortCutDiv() {
        let shortCut = document.getElementById('customShortcutDiv');
        if (!shortCut) {
            let div = document.createElement('div');
            div.id = 'customShortcutDiv';
            div.innerHTML = this.getShortCutDiv();
            div.style.zIndex = 10000;
            div.style.position = 'absolute';
            div.style.userSelect = 'none';
            div.style.cursor = 'move';
            document.body.appendChild(div);

            // Make the div draggable
            let isDragging = false;
            let offsetX, offsetY;

            div.addEventListener('mousedown', function (e) {
                isDragging = true;
                offsetX = e.clientX - div.offsetLeft;
                offsetY = e.clientY - div.offsetTop;
            });

            document.addEventListener('mousemove', function (e) {
                if (isDragging) {
                    div.style.left = (e.clientX - offsetX) + 'px';
                    div.style.top = (e.clientY - offsetY) + 'px';
                }
            });

            document.addEventListener('mouseup', function () {
                isDragging = false;
            });
            document.getElementById('customShortcutDiv').querySelector('#closeIconDiv').onclick = this.toggleShortcutVisibility.bind(this);
        } else if (shortCut && shortCut.style.display !== 'block') {
            shortCut.style.display = 'block';
        }
    }

    getShortCutDiv() {
        return `<div style="width: 400px; height: 300px; padding: 10px; background-color: #FFF7B5; border: 1px solid #FFF7B5">
            <div id="closeIconDiv" style="float: right; width: 22px; height: 22px; border: 1px solid #FFF7B5">
                <span class="sf-icon-Close" style="font-size:14px;cursor:pointer;"></span>
            </div>
            <div>
                <span class="db-html-font-medium">Quick shortcuts</span>
            </div>
            <div style="padding-top:10px">
                <ul>
                    <li>
                        <span class="db-html-font-medium">Tab : </span>
                        <span class="db-html-font-normal">Add a child to parent</span>
                    </li>
                </ul>
            </div>
            <div>
                <ul>
                    <li>
                        <span class="db-html-font-medium">Enter : </span>
                        <span class="db-html-font-normal">Add a child to the same level</span>
                    </li>
                </ul>
            </div>
            <div>
                <ul>
                    <li>
                        <span class="db-html-font-medium">Shift + Tab : </span>
                        <span class="db-html-font-normal">Move the child parent to the next level</span>
                    </li>
                </ul>
            </div>
            <div>
                <ul>
                    <li>
                        <span class="db-html-font-medium">Delete : </span>
                        <span class="db-html-font-normal">Delete a topic</span>
                    </li>
                </ul>
            </div>
            <div>
                <ul>
                    <li>
                        <span class="db-html-font-medium">F2 : </span>
                        <span class="db-html-font-normal">Edit a topic</span>
                    </li>
                </ul>
            </div>
            <div>
                <ul>
                    <li>
                        <span class="db-html-font-medium">Esc : </span>
                        <span class="db-html-font-normal">End text editing</span>
                    </li>
                </ul>
            </div>
            <div>
                <ul>
                    <li>
                        <span class="db-html-font-medium">Arrow(Up, Down, Left, Right) : </span>
                        <span class="db-html-font-normal">Navigate between child</span>
                    </li>
                </ul>
            </div>
            <div>
                <ul>
                    <li>
                        <span class="db-html-font-medium">F1 : </span>
                        <span class="db-html-font-normal">Show/Hide shortcut Key</span>
                    </li>
                </ul>
            </div>
        </div>`;
    }

    toggleShortcutVisibility() {
        const shortcutDiv = document.getElementById('customShortcutDiv');
        if (shortcutDiv) {
            shortcutDiv.style.display = (shortcutDiv.style.display === 'block' || shortcutDiv.style.display === '') ? 'none' : 'block';
        }
    }
    hideShortcutVisibility() {
        const shortcutDiv = document.getElementById('customShortcutDiv');
        if (shortcutDiv) {
            shortcutDiv.style.display = 'none';
        }
    }
    showShortcutVisibility() {
        const shortcutDiv = document.getElementById('customShortcutDiv');
        if (shortcutDiv) {
            shortcutDiv.style.display = 'block';
        }
    }
    updatePalette(diagram) {
        const diagramContainer = document.getElementsByClassName('diagrambuilder-container')[0];
        const propertyContainer = document.getElementsByClassName('db-property-editor-container')[0];
        if (diagramContainer.classList.contains('hide-palette')) {
            diagramContainer.classList.remove('hide-palette');
            diagramContainer.classList.remove('custom-diagram');
            diagram.updateViewPort();
        }
        if (propertyContainer.classList.contains('orgchart-diagram')) {
            propertyContainer.classList.remove('orgchart-diagram');
        } else if (propertyContainer.classList.contains('mindmap-diagram')) {
            propertyContainer.classList.remove('mindmap-diagram')
        }
    }

    resetZoomTo100(diagram) {
        const currentZoom = diagram.scrollSettings.currentZoom;
        if (currentZoom !== 1) {
            const zoom = { zoomFactor: (1 / currentZoom) - 1 };
            diagram.zoomTo(zoom);
            let zoomCurrentValue = document.getElementById("btnZoomIncrement").ej2_instances[0];
            zoomCurrentValue.content = (diagram.scrollSettings.currentZoom * 100).toFixed() + '%';
        }
    }

    updatePages(selectedItem, type) {
        let page = new PageCreation(selectedItem);
        let diagramString = selectedItem.selectedDiagram.saveDiagram();
        let diagramObject = JSON.parse(diagramString);
        let pageOption = { text: 'Page1', name: 'page1', diagram: JSON.parse(selectedItem.selectedDiagram.saveDiagram()) };
        diagramObject.activePage = 'page1';
        diagramObject.pageOptionList = [pageOption];
        diagramObject.diagramType = type;
        page.loadPage(JSON.stringify(diagramObject));
    }
}

export default UtilityMethods;
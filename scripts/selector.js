/**
 * Selector Handler
 */
import UtilityMethods  from './utilitymethods';
import CustomContextMenuItems from './customcontextmenuitems';
import { selectedItem } from '../index.js';
import {MindMapUtilityMethods} from './mindmap';
class NodeProperties {
    constructor() {
        this.m_offsetX = 0;
        this.m_offsetY = 0;
        this.m_width = 0;
        this.m_height = 0;
        this.m_rotateAngle = 0;
        this.m_fillColor = '#ffffff';
        this.m_strokeColor = '#000000';
        this.m_strokeStyle = 'None';
        this.m_strokeWidth = 1;
        this.m_opacity = 0;
        this.opacityText = '0%';
        this.m_aspectRatio = false;
        this.m_gradient = false;
        this.m_gradientDirection = 'BottomToTop';
        this.m_gradientColor = '#ffffff';
    }

    triggerPropertyChange(propertyName, propertyValue) {
        if (!ej.base.isNullOrUndefined(this.propertyChange)) {
            this.propertyChange.call(this, { propertyName, propertyValue });
        }
    }

    getGradient(node) {
        const gradientValue = this.getGradientDirectionValue(selectedItem.nodeProperties.gradientDirection.value);
        node.style.gradient = {
            type: 'Linear',
            x1: gradientValue.x1, x2: gradientValue.x2, y1: gradientValue.y1, y2: gradientValue.y2,
            stops: [
                { color: node.style.fill, offset: 0 },
                { color: this.getColor(selectedItem.nodeProperties.gradientColor.value), offset: 1 }
            ]
        };
    }

    getGradientDirectionValue(direction) {
        let x1 = 0, x2 = 0, y1 = 0, y2 = 0;
        if (direction === 'LeftToRight') {
            x1 = 100;
        } else if (direction === 'BottomToTop') {
            y2 = 100;
        } else if (direction === 'RightToLeft') {
            x2 = 100;
        } else {
            y1 = 100;
        }
        return { x1, y1, x2, y2 };
    }

    getColor(colorName) {
        if (window.navigator.msSaveBlob && colorName.length === 9) {
            return colorName.substring(0, 7);
        }
        return colorName;
    }
}

class ConnectorProperties {
    constructor() {
        this.m_lineColor = '#ffffff';
    }
    triggerPropertyChange(propertyName, propertyValue) {
        if (!ej.base.isNullOrUndefined(this.propertyChange)) {
            this.propertyChange.call(this, { propertyName, propertyValue });
        }
    }
}

class TextProperties {
    constructor() {
        this.m_textPosition = '';
        this.m_fontFamily = 'Arial';
        this.m_fontColor = '#ffffff';
        this.textPositionDataSource = this.getNodeTextPositions();
    }

    getNodeTextPositions() {
        return [
            { text: 'TopLeft', value: 'TopLeft' }, { text: 'TopCenter', value: 'TopCenter' },
            { text: 'TopRight', value: 'TopRight' }, { text: 'MiddleLeft', value: 'MiddleLeft' },
            { text: 'Center', value: 'Center' }, { text: 'MiddleRight', value: 'MiddleRight' },
            { text: 'BottomLeft', value: 'BottomLeft' }, { text: 'BottomCenter', value: 'BottomCenter' },
            { text: 'BottomRight', value: 'BottomRight' },
        ];
    }

    getConnectorTextPositions() {
        return [
            { text: 'Before', value: 'Before' }, { text: 'Center', value: 'Center' },
            { text: 'After', value: 'After' },
        ];
    }

    triggerPropertyChange(propertyName, propertyValue) {
        if (!ej.base.isNullOrUndefined(this.propertyChange)) {
            this.propertyChange.call(this, { propertyName, propertyValue });
        }
    }
}

class ExportSettings {
    constructor() {
        this.m_fileName = 'Diagram';
        this.m_format = 'JPG';
        this.m_region = 'PageSettings';
    }

    get fileName() {
        return this.m_fileName;
    }

    set fileName(fileName) {
        this.m_fileName = fileName;
    }

    get format() {
        return this.m_format;
    }

    set format(format) {
        this.m_format = format;
    }

    get region() {
        return this.m_region;
    }

    set region(region) {
        this.m_region = region;
    }
}

class PrintSettings {
    constructor() {
        this.m_region = 'PageSettings';
        this.m_pageWidth = 0;
        this.m_pageHeight = 0;
        this.m_isPortrait = true;
        this.m_isLandscape = false;
        this.m_multiplePage = false;
        this.m_paperSize = 'Letter';
    }

    get region() {
        return this.m_region;
    }

    set region(region) {
        this.m_region = region;
    }

    get pageWidth() {
        return this.m_pageWidth;
    }

    set pageWidth(pageWidth) {
        this.m_pageWidth = pageWidth;
    }

    get pageHeight() {
        return this.m_pageHeight;
    }

    set pageHeight(pageHeight) {
        this.m_pageHeight = pageHeight;
    }

    get isPortrait() {
        return this.m_isPortrait;
    }

    set isPortrait(isPortrait) {
        this.m_isPortrait = isPortrait;
    }

    get isLandscape() {
        return this.m_isLandscape;
    }

    set isLandscape(isLandscape) {
        this.m_isLandscape = isLandscape;
    }

    get multiplePage() {
        return this.m_multiplePage;
    }

    set multiplePage(multiplePage) {
        this.m_multiplePage = multiplePage;
    }

    get paperSize() {
        return this.m_paperSize;
    }

    set paperSize(paperSize) {
        this.m_paperSize = paperSize;
        document.getElementById('printCustomSize').style.display = 'none';
        document.getElementById('printOrientation').style.display = 'none';
        if (paperSize === 'Custom') {
            document.getElementById('printCustomSize').style.display = '';
        } else {
            document.getElementById('printOrientation').style.display = '';
        }
    }
}

class PageSettings {
    constructor() {
        this.pageWidth = 1056;
        this.pageHeight = 816;
        this.backgroundColor = '#ffffff';
        this.isPortrait = false;
        this.isLandscape = true;
        this.paperSize = 'Letter';
        this.pageBreaks = false;
    }
}

class ScrollSettings {
    constructor() {
        this.currentZoom = '100%';
    }
}

class MindMapSettings {
    constructor() {
        this.m_levelType = 'Level0';
        this.m_fill = 'white';
        this.m_stroke = 'white';
        this.m_strokeStyle = 'None';
        this.m_strokeWidth = 1;
        this.m_fontFamily = 'Arial';
        this.m_fontColor = '#ffffff';
    }

    get levelType() {
        return this.m_levelType;
    }

    set levelType(levelType) {
        if (this.m_levelType !== levelType) {
            this.m_levelType = levelType;
            this.triggerPropertyChange('levelType', levelType);
        }
    }

    get fill() {
        return this.m_fill;
    }

    set fill(fill) {
        if (this.m_fill !== fill) {
            this.m_fill = fill;
            this.triggerPropertyChange('fill', fill);
        }
    }

    get stroke() {
        return this.m_stroke;
    }

    set stroke(stroke) {
        if (this.m_stroke !== stroke) {
            this.m_stroke = stroke;
            this.triggerPropertyChange('stroke', stroke);
        }
    }

    get strokeStyle() {
        return this.m_strokeStyle;
    }

    set strokeStyle(strokeStyle) {
        if (this.m_strokeStyle !== strokeStyle) {
            this.m_strokeStyle = strokeStyle;
            this.triggerPropertyChange('strokeStyle', strokeStyle);
        }
    }

    get strokeWidth() {
        return this.m_strokeWidth;
    }

    set strokeWidth(strokeWidth) {
        if (this.m_strokeWidth !== strokeWidth) {
            this.m_strokeWidth = strokeWidth;
            this.triggerPropertyChange('strokeWidth', strokeWidth);
        }
    }

    get opacity() {
        return this.m_opacity;
    }

    set opacity(opacity) {
        if (this.m_opacity !== opacity) {
            this.m_opacity = opacity;
            this.triggerPropertyChange('opacity', opacity);
        }
    }

    get fontFamily() {
        return this.m_fontFamily;
    }

    set fontFamily(fontFamily) {
        if (this.m_fontFamily !== fontFamily) {
            this.m_fontFamily = fontFamily;
            this.triggerPropertyChange('fontFamily', fontFamily);
        }
    }

    get fontSize() {
        return this.m_fontSize;
    }

    set fontSize(fontSize) {
        if (this.m_fontSize !== fontSize) {
            this.m_fontSize = fontSize;
            this.triggerPropertyChange('fontSize', fontSize);
        }
    }

    get fontColor() {
        return this.m_fontColor;
    }

    set fontColor(fontColor) {
        if (this.m_fontColor !== fontColor) {
            this.m_fontColor = fontColor;
            this.triggerPropertyChange('fontColor', fontColor);
        }
    }

    get textOpacity() {
        return this.m_textOpacity;
    }

    set textOpacity(textOpacity) {
        if (this.m_textOpacity !== textOpacity) {
            this.m_textOpacity = textOpacity;
            this.triggerPropertyChange('textOpacity', textOpacity);
        }
    }

    triggerPropertyChange(propertyName, propertyValue) {
        if (!ej.base.isNullOrUndefined(this.propertyChange)) {
            this.propertyChange.call(this, { propertyName, propertyValue });
        }
    }
}

class OrgDataSettings {
    constructor() {
        this.dataSourceColumns = [];
        this.id = '';
        this.parent = '';
        this.nameField = '';
        this.bindingFields = [];
        this.imageField = '';
        this.additionalFields = [];
        this.fileformat = '';
        this.extensionType = '.csv';
        this.buttonContent = 'Download Example CSV';
    }
}

class SelectorViewModel {
    constructor() {
        
        this.selectedDiagram = null;
        this.isCopyLayoutElement = false;
        this.currentDiagramName = '';
        this.preventPropertyChange = false;
        this.isModified = false;
        this.uniqueId = null;
        this.preventSelectionChange = false;
        this.pasteData = [];
        this.isLoading = false;
        this.isTemplateLoad = false;
        this.nodeProperties = new NodeProperties();
        this.textProperties = new TextProperties();
        this.connectorProperties = new ConnectorProperties();
        this.exportSettings = new ExportSettings();
        this.printSettings = new PrintSettings();
        this.pageSettings = new PageSettings();
        this.utilityMethods = new UtilityMethods();
        this.mindmapSettings = new MindMapSettings();
        this.orgDataSettings = new OrgDataSettings();
        this.scrollSettings = new ScrollSettings();
        this.customContextMenu = new CustomContextMenuItems();
        this.nodeProperties.propertyChange = this.nodePropertyChange.bind(this);
        this.connectorProperties.propertyChange = this.connectorPropertyChange.bind(this);
        this.textProperties.propertyChange = this.textPropertyChange.bind(this);
        this.mindmapSettings.propertyChange = this.mindMapPropertyChange.bind(this);

    }
    randomIdGenerator() {
        return Math.random().toString(36).replace(/[^a-z]+/g, '').substr(2, 10);
    }
    getAbsolutePath() {
        return window.location.pathname;
    }
    nodePropertyChange(args) {
        if (!selectedItem.preventPropertyChange) {
            const diagram = selectedItem.selectedDiagram;
            if (diagram) {
                if (diagram.selectedItems.nodes.length > 0) {
                    const selectedNodes = diagram.selectedItems.nodes;
                    for (let i = 0; i < selectedNodes.length; i++) {
                        const node = selectedNodes[i];
                        const propertyName1 = args.propertyName.toString().toLowerCase();
                        switch (propertyName1) {
                            case 'offsetx':
                                node.offsetX = selectedItem.nodeProperties.offsetX.value;
                                break;
                            case 'offsety':
                                node.offsetY = selectedItem.nodeProperties.offsetY.value;
                                break;
                            case 'width':
                                node.width = selectedItem.nodeProperties.width.value;
                                break;
                            case 'height':
                                node.height = selectedItem.nodeProperties.height.value;
                                break;
                            case 'rotateangle':
                                node.rotateAngle = selectedItem.nodeProperties.rotateAngle.value;
                                break;
                            case 'aspectratio':
                                node.constraints = node.constraints ^ ej.diagrams.NodeConstraints.AspectRatio;
                                break;
                        }
                        if (!node.children) {
                            this.applyNodeStyle(propertyName1, node, args.propertyValue);
                        } else {
                            for (let j = 0; j < node.children.length; j++) {
                                this.applyNodeStyle(propertyName1, diagram.getObject(node.children[j]), args.propertyValue);
                            }
                        }
                    }
                    selectedItem.isModified = true;
                }
                if (diagram.connectors.length > 0) {
                    const selectedNodes = diagram.selectedItems.connectors;
                    for (let i = 0; i < selectedNodes.length; i++) {
                        switch (args.propertyName.toString().toLowerCase()) {
                            case 'strokecolor':
                                selectedItem.connectorProperties.lineColor.value = this.getColor(selectedItem.nodeProperties.strokeColor.value);
                                break;
                            case 'strokewidth':
                                selectedItem.connectorProperties.lineWidth.value = selectedItem.nodeProperties.strokeWidth.value;
                                break;
                            case 'strokestyle':
                                selectedItem.connectorProperties.lineStyle.value = selectedItem.nodeProperties.strokeStyle.value;
                                break;
                            case 'opacity':
                                selectedItem.connectorProperties.opacity.value = selectedItem.nodeProperties.opacity.value;
                                break;
                        }
                    }
                    this.isModified = true;
                }
                diagram.dataBind();
            }
        }
    }
    applyNodeStyle(propertyName, node, value) {
        const addInfo = node.addInfo || {};
        switch (propertyName) {
            case 'fillcolor':
                node.style.fill = this.getColor(value);
                let gradientCheckBox = document.getElementById('gradient').ej2_instances[0];
                if (value && gradientCheckBox.checked) {
                    NodeProperties.prototype.getGradient(node);
                }
                break;
            case 'strokecolor':
                node.style.strokeColor = this.getColor(selectedItem.nodeProperties.strokeColor.value);
                break;
            case 'strokewidth':
                node.style.strokeWidth = selectedItem.nodeProperties.strokeWidth.value;
                break;
            case 'strokestyle':
                node.style.strokeDashArray = selectedItem.nodeProperties.strokeStyle.value;
                break;
            case 'opacity':
                node.style.opacity = selectedItem.nodeProperties.opacity.value / 100;
                document.getElementById("nodeOpacitySliderText").value = selectedItem.nodeProperties.opacity.value + '%';
                break;
            case 'gradient':
                if (value && !value.checked) {
                    node.style.gradient.type = 'None';
                } else {
                    NodeProperties.prototype.getGradient(node);
                }
                break;
            case 'gradientdirection':
            case 'gradientcolor':
                NodeProperties.prototype.getGradient(node);
                break;
        }
    }
    connectorPropertyChange(args) {
        if (!this.preventPropertyChange) {
            const diagram = selectedItem.selectedDiagram;
            if (diagram && diagram.selectedItems.connectors.length > 0) {
                const selectedNodes = diagram.selectedItems.connectors;
                for (let i = 0; i < selectedNodes.length; i++) {
                    const connector = selectedNodes[i];
                    switch (args.propertyName.toString().toLowerCase()) {
                        case 'linecolor':
                            connector.style.strokeColor = this.getColor(selectedItem.connectorProperties.lineColor.value);
                            connector.sourceDecorator.style = { fill: connector.style.strokeColor, strokeColor: connector.style.strokeColor };
                            connector.targetDecorator.style = { fill: connector.style.strokeColor, strokeColor: connector.style.strokeColor };
                            break;
                        case 'linewidth':
                            connector.style.strokeWidth = selectedItem.connectorProperties.lineWidth.value;
                            if (connector.sourceDecorator.style) {
                                connector.sourceDecorator.style.strokeWidth = connector.style.strokeWidth;
                            } else {
                                connector.sourceDecorator.style = { strokeWidth: connector.style.strokeWidth };
                            }
                            if (connector.targetDecorator.style) {
                                connector.targetDecorator.style.strokeWidth = connector.style.strokeWidth;
                            } else {
                                connector.targetDecorator.style = { strokeWidth: connector.style.strokeWidth };
                            }
                            break;
                        case 'linestyle':
                            connector.style.strokeDashArray = selectedItem.connectorProperties.lineStyle.value;
                            break;
                        case 'linetype':
                            connector.type = selectedItem.connectorProperties.lineType.value;
                            break;
                        case 'sourcetype':
                            connector.sourceDecorator.shape = selectedItem.connectorProperties.sourceType.value;
                            break;
                        case 'targettype':
                            connector.targetDecorator.shape = selectedItem.connectorProperties.targetType.value;
                            break;
                        case 'sourcesize':
                            connector.sourceDecorator.width = connector.sourceDecorator.height = selectedItem.connectorProperties.sourceSize.value;
                            break;
                        case 'targetsize':
                            connector.targetDecorator.width = connector.targetDecorator.height = selectedItem.connectorProperties.targetSize.value;
                            break;
                        case 'opacity':
                            connector.style.opacity = selectedItem.connectorProperties.opacity.value / 100;
                            connector.targetDecorator.style.opacity = connector.style.opacity;
                            connector.sourceDecorator.style.opacity = connector.style.opacity;
                            document.getElementById("connectorOpacitySliderText").value = selectedItem.connectorProperties.opacity.value + '%';
                            break;
                        case 'linejump':
                            if (args.propertyValue.checked) {
                                connector.constraints = connector.constraints | ej.diagrams.ConnectorConstraints.Bridging;
                            } else {
                                connector.constraints = connector.constraints & ~ej.diagrams.ConnectorConstraints.Bridging;
                            }
                            break;
                        case 'linejumpsize':
                            connector.bridgeSpace = selectedItem.connectorProperties.lineJumpSize.value;
                            break;
                    }
                }
                diagram.dataBind();
                this.isModified = true;
            }
        }
    }
    textPropertyChange(args) {
        if (!this.preventPropertyChange) {
            const diagram = selectedItem.selectedDiagram;
            if (diagram) {
                let selectedObjects = diagram.selectedItems.nodes;
                selectedObjects = selectedObjects.concat(diagram.selectedItems.connectors);
                const propertyName = args.propertyName.toString().toLowerCase();
                if (selectedObjects.length > 0) {
                    for (let i = 0; i < selectedObjects.length; i++) {
                        const node = selectedObjects[i];
                        if (node instanceof ej.diagrams.Node || node instanceof ej.diagrams.Connector) {
                            if (node.annotations.length > 0) {
                                for (let j = 0; j < node.annotations.length; j++) {
                                    const annotation = node.annotations[j].style;
                                    this.updateTextProperties(propertyName, annotation);
                                }
                            } else if (node.shape && node.shape.type === 'Text') {
                                this.updateTextProperties(propertyName, node.style);
                            }
                        }
                    }
                    diagram.dataBind();
                    this.isModified = true;
                }
            }
        }
    }
    updateTextProperties(propertyName, annotation) {
        switch (propertyName) {
            case 'fontfamily':
                annotation.fontFamily = selectedItem.textProperties.fontFamily.value;
                break;
            case 'fontsize':
                annotation.fontSize = selectedItem.textProperties.fontSize.value;
                break;
            case 'fontcolor':
                annotation.color = this.getColor(selectedItem.textProperties.fontColor.value);
                break;
            case 'opacity':
                annotation.opacity = selectedItem.textProperties.opacity.value / 100;
                document.getElementById("textOpacityText").value = selectedItem.textProperties.opacity.value + '%';
                break;
        }
    }
    mindMapPropertyChange(args) {
        if (!this.preventPropertyChange) {
            const diagram = selectedItem.selectedDiagram;
            if (diagram && diagram.nodes.length > 0) {
                for (let i = 0; i < diagram.nodes.length; i++) {
                    const node = diagram.nodes[i];
                    if (node.addInfo) {
                        const addInfo = node.addInfo;
                        const levelType = selectedItem.mindmapSettings.levelType.value;
                        if ('Level' + addInfo.level === levelType || addInfo.level === levelType) {
                            switch (args.propertyName.toString().toLowerCase()) {
                                case 'fill':
                                    node.style.fill = this.getColor(selectedItem.mindmapSettings.fill.value);
                                    break;
                                case 'stroke':
                                    node.style.strokeColor = this.getColor(selectedItem.mindmapSettings.stroke.value);
                                    if (node.inEdges.length > 0) {
                                        const connector = MindMapUtilityMethods.getConnector(diagram.connectors, node.inEdges[0]);
                                        connector.style.strokeColor = node.style.strokeColor;
                                    }
                                    break;
                                case 'strokewidth':
                                    node.style.strokeWidth = selectedItem.mindmapSettings.strokeWidth.value;
                                    if (node.inEdges.length > 0) {
                                        const connector1 = MindMapUtilityMethods.getConnector(diagram.connectors, node.inEdges[0]);
                                        connector1.style.strokeWidth = selectedItem.mindmapSettings.strokeWidth.value;
                                    }
                                    break;
                                case 'strokestyle':
                                    node.style.strokeDashArray = selectedItem.mindmapSettings.strokeStyle.value;
                                    if (node.inEdges.length > 0) {
                                        const connector2 = MindMapUtilityMethods.getConnector(diagram.connectors, node.inEdges[0]);
                                        connector2.style.strokeDashArray = selectedItem.mindmapSettings.strokeStyle.value;
                                    }
                                    break;
                                case 'opacity':
                                    node.style.opacity = selectedItem.mindmapSettings.opacity.value / 100;
                                    document.getElementById("mindmapOpacityText").value = selectedItem.mindmapSettings.opacity.value + '%';
                                    break;
                                default:
                                    this.updateMindMapTextStyle(node, args.propertyName.toString().toLowerCase());
                                    break;
                            }
                        }
                    }
                    diagram.dataBind();
                    this.isModified = true;
                }
            }
        }
    }
    updateMindMapTextStyle(node, propertyName) {
        const diagram = selectedItem.selectedDiagram;
        if (node.addInfo && node.annotations.length > 0) {
            const annotation = node.annotations[0].style;
            switch (propertyName) {
                case 'fontfamily':
                    annotation.fontFamily = selectedItem.mindmapSettings.fontFamily.value;
                    break;
                case 'fontsize':
                    annotation.fontSize = selectedItem.mindmapSettings.fontSize.value;
                    break;
                case 'fontcolor':
                    annotation.color = this.getColor(selectedItem.mindmapSettings.fontColor.value);
                    break;
                case 'textopacity':
                    annotation.opacity = selectedItem.mindmapSettings.textOpacity.value / 100;
                    document.getElementById("mindMaptextOpacityText").value = selectedItem.mindmapSettings.textOpacity.value + '%';
                    break;
            }
            diagram.dataBind();
            this.isModified = true;
        }
    }
    getColor(colorName) {
        if (window.navigator.msSaveBlob && colorName.length === 9) {
            return colorName.substring(0, 7);
        }
        return colorName;
    }
}

export {
    NodeProperties,
    ConnectorProperties,
    TextProperties,
    ExportSettings,
    PrintSettings,
    PageSettings,
    ScrollSettings,
    MindMapSettings,
    OrgDataSettings,
    SelectorViewModel
};
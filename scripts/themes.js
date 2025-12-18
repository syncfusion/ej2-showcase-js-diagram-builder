/**
 * Theme handler
 */
import {MindMapUtilityMethods} from './mindmap';
let themeClicked = false;
class DiagramTheme {
    constructor(selectedItem) {
        this.nodeOldStyles = [];
        this.connectorOldStyles = [];
        this.isThemeApplied = false;
        this.colorList = [
            {
                themeName: 'theme1', themeStyle: [
                    { fillColor: '#F0F0F0', borderColor: '#D2D2D2', textColor: '#000000', type: 'shapeType1' },
                    { fillColor: '#E3E3E3', borderColor: '#D2D2D2', textColor: '#000000', type: 'shapeType2' },
                    { fillColor: '#ffffff', borderColor: '#D2D2D2', textColor: '#000000', type: 'shapeType3' },
                    { fillColor: '#D2D2D2', borderColor: '#D2D2D2', textColor: '#000000', type: 'shapeType4' }
                ], lineColor: '#6A696A', lineType: 'Orthogonal'
            },
            {
                themeName: 'theme2', themeStyle: [
                    { fillColor: '#F0F0F0', borderColor: '#ABABAB', textColor: '#000000', type: 'shapeType1' },
                    { fillColor: '#6A696A', borderColor: '#6A696A', textColor: '#FFFFFF', type: 'shapeType2' },
                    { fillColor: '#FFFFFF', borderColor: '#ABABAB', textColor: '#000000', type: 'shapeType3' },
                    { fillColor: '#161415', borderColor: '#161415', textColor: '#FFFFFF', type: 'shapeType4' }
                ], lineColor: '#6A696A', lineType: 'Orthogonal'
            },
            {
                themeName: 'theme3', themeStyle: [
                    { fillColor: '#D8EBEC', borderColor: '#77B4B7', textColor: '#000000', type: 'shapeType1' },
                    { fillColor: '#F4E6CE', borderColor: '#D8B983', textColor: '#000000', type: 'shapeType2' },
                    { fillColor: '#F3CBDB', borderColor: '#F4B1CC', textColor: '#000000', type: 'shapeType3' },
                    { fillColor: '#528AD8', borderColor: '#174F9C', textColor: '#000000', type: 'shapeType4' }
                ], lineColor: '#18519D', lineType: 'Orthogonal'
            },
            {
                themeName: 'theme4', themeStyle: [
                    { fillColor: '#A9DDD8', borderColor: '#00AE9D', textColor: '#000000', type: 'shapeType1' },
                    { fillColor: '#F4E0BB', borderColor: '#FBB63D', textColor: '#000000', type: 'shapeType2' },
                    { fillColor: '#B5DAEA', borderColor: '#29A4DA', textColor: '#000000', type: 'shapeType3' },
                    { fillColor: '#D69BC1', borderColor: '#C360A0', textColor: '#000000', type: 'shapeType4' }
                ], lineColor: '#C86DA7', lineType: 'Bezier'
            },
            {
                themeName: 'theme5', themeStyle: [
                    { fillColor: '#BFEAE5', borderColor: '#96C7BF', textColor: '#000000', type: 'shapeType1' },
                    { fillColor: '#F8ECC4', borderColor: '#C3B58B', textColor: '#000000', type: 'shapeType2' },
                    { fillColor: '#E8E2FF', borderColor: '#CFC4FB', textColor: '#000000', type: 'shapeType3' },
                    { fillColor: '#F7E2E5', borderColor: '#D4A8AF', textColor: '#000000', type: 'shapeType4' }
                ], lineColor: '#4D4D4D', lineType: 'Orthogonal'
            },
            {
                themeName: 'theme6', themeStyle: [
                    { fillColor: '#FFE9E1', borderColor: '#F6D2C4', textColor: '#000000', type: 'shapeType1' },
                    { fillColor: '#DFEEE4', borderColor: '#ACD9BB', textColor: '#000000', type: 'shapeType2' },
                    { fillColor: '#FFF8F6', borderColor: '#FFE7E0', textColor: '#000000', type: 'shapeType3' },
                    { fillColor: '#B2ABA9', borderColor: '#161415', textColor: '#000000', type: 'shapeType4' }
                ], lineColor: '#161415', lineType: 'Orthogonal'
            },
            {
                themeName: 'theme7', themeStyle: [
                    { fillColor: '#9FE3DD', borderColor: '#49C7BC', textColor: '#000000', type: 'shapeType1' },
                    { fillColor: '#2EA499', borderColor: '#50BFB5', textColor: '#FFFFFF', type: 'shapeType2' },
                    { fillColor: '#E6F5F7', borderColor: '#9FE3DD', textColor: '#000000', type: 'shapeType3' },
                    { fillColor: '#13615A', borderColor: '#13615A', textColor: '#FFFFFF', type: 'shapeType4' }
                ], lineColor: '#13615A', lineType: 'Bezier'
            },
            {
                themeName: 'theme8', themeStyle: [
                    { fillColor: '#F5F2D7', borderColor: '#E4D772', textColor: '#000000', type: 'shapeType1' },
                    { fillColor: '#FCEBFF', borderColor: '#F8CAFF', textColor: '#000000', type: 'shapeType2' },
                    { fillColor: '#EAE4F2', borderColor: '#D3BDF1', textColor: '#000000', type: 'shapeType3' },
                    { fillColor: '#551660', borderColor: '#551660', textColor: '#FFFFFF', type: 'shapeType4' }
                ], lineColor: '#551660', lineType: 'Bezier'
            },
            {
                themeName: 'theme9', themeStyle: [
                    { fillColor: '#2CBAA7', borderColor: '#FFFFFF', textColor: '#000000', type: 'shapeType1' },
                    { fillColor: '#EFC608', borderColor: '#FFFFFF', textColor: '#000000', type: 'shapeType2' },
                    { fillColor: '#27BBD6', borderColor: '#FFFFFF', textColor: '#000000', type: 'shapeType3' },
                    { fillColor: '#2B333C', borderColor: '#FFFFFF', textColor: '#FFFFFF', type: 'shapeType4' }
                ], lineColor: '#2B333C', lineType: 'Orthogonal'
            },
            {
                themeName: 'theme10', themeStyle: [
                    { fillColor: '#8DAF5B', borderColor: '#FFFFFF', textColor: '#FFFFFF', type: 'shapeType1' },
                    { fillColor: '#E6B15A', borderColor: '#FFFFFF', textColor: '#FFFFFF', type: 'shapeType2' },
                    { fillColor: '#2683A8', borderColor: '#FFFFFF', textColor: '#FFFFFF', type: 'shapeType3' },
                    { fillColor: '#E64759', borderColor: '#FFFFFF', textColor: '#FFFFFF', type: 'shapeType4' }
                ], lineColor: '#E64759', lineType: 'Bezier'
            },
            {
                themeName: 'theme11', themeStyle: [
                    { fillColor: '#46B38E', borderColor: '#FFFFFF', textColor: '#FFFFFF', type: 'shapeType1' },
                    { fillColor: '#42A5F5', borderColor: '#FFFFFF', textColor: '#FFFFFF', type: 'shapeType2' },
                    { fillColor: '#9F86FF', borderColor: '#FFFFFF', textColor: '#FFFFFF', type: 'shapeType3' },
                    { fillColor: '#E64759', borderColor: '#FFFFFF', textColor: '#FFFFFF', type: 'shapeType4' }
                ], lineColor: '#696969', lineType: 'Orthogonal'
            },
            {
                themeName: 'theme12', themeStyle: [
                    { fillColor: '#78BFFE', borderColor: '#5AAAFF', textColor: '#000000', type: 'shapeType1' },
                    { fillColor: '#288CF7', borderColor: '#288CF7', textColor: '#FFFFFF', type: 'shapeType2' },
                    { fillColor: '#BCDEF8', borderColor: '#8ECAFF', textColor: '#000000', type: 'shapeType3' },
                    { fillColor: '#054F96', borderColor: '#054F96', textColor: '#FFFFFF', type: 'shapeType4' }
                ], lineColor: '#054F96', lineType: 'Bezier'
            }
        ];
        this.selectedItem = selectedItem;
    }

    getShapeType(shapeType) {
        switch (shapeType) {
            case 'Ellipse':
            case 'Terminator':
                return 'shapeType2';
            case 'Plus':
            case 'Star':
            case 'Diamond':
            case 'Decision':
                return 'shapeType4';
            case 'Hexagon':
            case 'Parallelogram':
            case 'Trapezoid':
            case 'Cylinder':
            case 'DirectData':
            case 'SequentialData':
            case 'Sort':
            case 'MultiDocument':
            case 'Collate':
            case 'Or':
            case 'InternalStorage':
            case 'SequentialAccessStorage':
            case 'Annotation2':
            case 'ManualInput':
            case 'StoredData':
                return 'shapeType3';
            default:
                return 'shapeType1';
        }
    }

    getShapeStyle(shapeType, themeStyle) {
        return themeStyle.find(style => style.type === shapeType) || null;
    }

    getThemeStyle(themeName) {
        return this.colorList.find(theme => theme.themeName === themeName) || null;
    }

    themeMouseOver(args) {
        themeClicked = false;
        const { target } = args;
        const { selectedDiagram: diagram } = this.selectedItem;
        if (target.className === 'db-theme-style-div') {
            const themeName = target.children[0].className.replace('db-theme-style ', '');
            diagram.constraints = diagram.constraints & ~ej.diagrams.DiagramConstraints.UndoRedo;
            diagram.dataBind();
            this.applyStyle(themeName);
            this.isThemeApplied = true;
            diagram.constraints = diagram.constraints | ej.diagrams.DiagramConstraints.UndoRedo;
            diagram.dataBind();
        }
    }

    applyOldStyle(args) {
        if (!themeClicked) {
            this.selectedItem.selectedDiagram.constraints = this.selectedItem.selectedDiagram.constraints & ~ej.diagrams.DiagramConstraints.UndoRedo;
            this.selectedItem.selectedDiagram.dataBind();
            const { selectedDiagram: diagram } = this.selectedItem;
            diagram.historyManager.startGroupAction();

            this.nodeOldStyles.forEach(themeStyle => {
                const node = MindMapUtilityMethods.getNode(diagram.nodes, themeStyle.name.toString());
                node.style.fill = themeStyle.fill.toString();
                node.style.strokeColor = themeStyle.border.toString();
                if (node.annotations.length > 0 && !node.annotations[0].hyperlink) {
                    node.annotations[0].style.color = themeStyle.fontColor;
                }
                diagram.dataBind();
            });

            this.connectorOldStyles.forEach(themeStyle => {
                const connector = MindMapUtilityMethods.getConnector(diagram.connectors, themeStyle.name.toString());
                connector.style.strokeColor = themeStyle.border.toString();
                connector.sourceDecorator.style.fill = connector.sourceDecorator.style.strokeColor = themeStyle.border.toString();
                connector.targetDecorator.style.fill = connector.targetDecorator.style.strokeColor = themeStyle.border.toString();
                connector.type = themeStyle.type;
                diagram.dataBind();
            });

            this.isThemeApplied = false;
            diagram.historyManager.endGroupAction();
            this.selectedItem.selectedDiagram.constraints = this.selectedItem.selectedDiagram.constraints | ej.diagrams.DiagramConstraints.UndoRedo;
            this.selectedItem.selectedDiagram.dataBind();
        }
    }

    themeClick(args) {
        const { target } = args;
        if (target.classList.contains('db-theme-style-div')) {
            const themeName = target.children[0].className.replace('db-theme-style ', '');
            this.selectedItem.themeStyle = themeName;
            this.applyOldStyle()
            this.applyStyle(themeName);
            this.colorList.forEach(({ themeName: currentThemeName }) => {
                const element = document.getElementsByClassName(String(currentThemeName))[0].parentNode;
                if (element.classList.contains('db-theme-focus-style-div')) {
                    element.classList.remove('db-theme-focus-style-div');
                }
                if (currentThemeName === themeName) {
                    element.classList.add('db-theme-focus-style-div');
                }
            });

            this.selectedItem.isModified = true;
        }
        let themeDialog = document.getElementById('themeDialog').ej2_instances[0];
        themeClicked = true;
        themeDialog.hide();
    }

    setNodeOldStyles() {
        this.nodeOldStyles = [];
        this.connectorOldStyles = [];
        const { selectedDiagram: diagram } = this.selectedItem;
        if (diagram.nodes.length > 0) {
            diagram.nodes.forEach(node => {
                const style = {
                    name: node.id,
                    'fill': node.style.fill,
                    'border': node.style.strokeColor
                };
                if (node.annotations.length > 0 && !node.annotations[0].hyperlink) {
                    style.fontColor = node.annotations[0].style.color;
                }
                this.nodeOldStyles.push(style);
            });
        }
        if (diagram.connectors.length > 0) {
            diagram.connectors.forEach(connector => {
                this.connectorOldStyles.push({
                    name: connector.id,
                    'border': connector.style.strokeColor,
                    'type': connector.type
                });
            });
        }
    }

    applyStyle(themeName) {
        const themeType = this.getThemeStyle(themeName);
        const { selectedDiagram: diagram } = this.selectedItem;
        diagram.historyManager.startGroupAction();
        if (diagram.nodes.length > 0) {
            diagram.nodes.forEach(node => {
                if (node.style.gradient) {
                    node.style.gradient.type = 'None';
                }
                this.applyThemeStyleforElement(node, themeType);
            });
        }
        if (diagram.connectors.length > 0 && themeType) {
            diagram.connectors.forEach(connector => {
                this.applyThemeStyleforElement(connector, themeType);
            });
            diagram.dataBind();
        }
        diagram.historyManager.endGroupAction();
    }

    applyThemeStyleforElement(element, themeName) {
        const themeType = themeName || this.getThemeStyle(this.selectedItem.themeStyle);
        const { selectedDiagram: diagram } = this.selectedItem;
        diagram.historyManager.startGroupAction();

        if (element instanceof ej.diagrams.Node) {
            const node = element;
            if (node.shape) {
                let shapeStyle = null;
                if (node.shape.type === 'Flow' || node.shape.type === 'Basic') {
                    const shapeModel = node.shape;
                    shapeStyle = this.getShapeStyle(this.getShapeType(shapeModel.shape), themeType.themeStyle);
                    if (shapeStyle) {
                        node.style.fill = shapeStyle.fillColor;
                        node.style.strokeColor = shapeStyle.borderColor;
                        if (node.annotations.length > 0 && !(node.annotations[0].hyperlink && node.annotations[0].hyperlink.link)) {
                            node.annotations[0].style.color = shapeStyle.textColor;
                        }
                        diagram.dataBind();
                    }
                }
            }
        } else if (element instanceof ej.diagrams.Connector) {
            const connector = element;
            connector.style.strokeColor = themeType.lineColor.toString();
            connector.sourceDecorator.style.fill = connector.sourceDecorator.style.strokeColor = themeType.lineColor.toString();
            connector.targetDecorator.style.fill = connector.targetDecorator.style.strokeColor = themeType.lineColor.toString();
            connector.type = themeType.lineType;
            diagram.dataBind();
        }

        diagram.historyManager.endGroupAction();
    }
}

export default DiagramTheme;
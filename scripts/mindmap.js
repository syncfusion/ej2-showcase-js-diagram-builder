/**
 *  Home page handler
 */
import CommonKeyboardCommands from './commoncommands';

class MindMap {
    constructor(selectedItem) {
        this.selectedItem = selectedItem;
    }
    getCommandSettings() {
        const commandManager = {
            commands: [
                {
                    gesture: { key: ej.diagrams.Keys.Tab }, canExecute: this.canExecute,
                    execute: this.addChild.bind(this), name: 'leftChild'
                },
                {
                    gesture: { key: ej.diagrams.Keys.Tab, keyModifiers: ej.diagrams.KeyModifiers.Shift }, canExecute: this.canExecute,
                    execute: this.addRightChild.bind(this), name: 'rightChild'
                },
                {
                    gesture: { key: ej.diagrams.Keys.Enter }, canExecute: this.canExecute,
                    execute: this.addSibilingChildTop.bind(this), name: 'sibilingChildTop'
                },
                {
                    gesture: { key: ej.diagrams.Keys.Enter, keyModifiers: ej.diagrams.KeyModifiers.Shift }, canExecute: this.canExecute,
                    execute: this.addSibilingChildBottom.bind(this), name: 'sibilingChildBottom'
                },
                {
                    gesture: { key: ej.diagrams.Keys.Delete }, canExecute: this.canExecute,
                    execute: this.removeChild.bind(this), name: 'deleteChild'
                },
                {
                    gesture: { key: ej.diagrams.Keys.Down }, canExecute: this.canExecute,
                    execute: this.navigateBottomChild.bind(this), name: 'navigationDown'
                },
                {
                    gesture: { key: ej.diagrams.Keys.Up }, canExecute: this.canExecute,
                    execute: this.navigateTopChild.bind(this), name: 'navigationUp'
                },
                {
                    gesture: { key: ej.diagrams.Keys.Right }, canExecute: this.canExecute,
                    execute: this.navigateLeftChild.bind(this), name: 'navigationLeft'
                },
                {
                    gesture: { key: ej.diagrams.Keys.Left }, canExecute: this.canExecute,
                    execute: this.navigateRightChild.bind(this), name: 'navigationRight'
                },
                {
                    gesture: { key: ej.diagrams.Keys.Space }, canExecute: this.canExecute,
                    execute: this.expandCollapse.bind(this), name: 'expandCollapse'
                },
                {
                    gesture: { key: ej.diagrams.Keys.F2 }, canExecute: this.canExecute,
                    execute: this.editNode.bind(this), name: 'editing'
                },
                {
                    gesture: { key: ej.diagrams.Keys.F1 }, canExecute: this.canExecute,
                    execute: MindMapUtilityMethods.toggleShortcutVisibility.bind(MindMapUtilityMethods), name: 'showShortCut'
                },
                {
                    gesture: { key: ej.diagrams.Keys.Z, keyModifiers: ej.diagrams.KeyModifiers.Control }, canExecute: this.preventExecute,
                    execute: this.undoMindMap.bind(this), name: 'undo'
                },
                {
                    gesture: { key: ej.diagrams.Keys.Y, keyModifiers: ej.diagrams.KeyModifiers.Control }, canExecute: this.preventExecute,
                    execute: this.redoMindMap.bind(this), name: 'redo'
                },
                {
                    gesture: { key: ej.diagrams.Keys.X, keyModifiers: ej.diagrams.KeyModifiers.Control }, canExecute: this.preventExecute,
                    execute: this.cutMindMap.bind(this), name: 'cutObject'
                },
                {
                    gesture: { key: ej.diagrams.Keys.C, keyModifiers: ej.diagrams.KeyModifiers.Control }, canExecute: this.preventExecute,
                    execute: this.copyMindMap.bind(this), name: 'copyObject'
                },
                {
                    gesture: { key: ej.diagrams.Keys.V, keyModifiers: ej.diagrams.KeyModifiers.Control }, canExecute: this.preventExecute,
                    execute: this.pasteMindMap.bind(this), name: 'pasteObject'
                }
            ]
        };
        commandManager.commands = CommonKeyboardCommands.addCommonCommands(commandManager.commands);
        return commandManager;
    }
    preventExecute() {
        return false;
    }
    canExecute() {
        return true;
    }
    undoMindMap() {
        this.selectedItem.utilityMethods.undoRedoLayout(true, this.selectedItem);
    }
    redoMindMap() {
        this.selectedItem.utilityMethods.undoRedoLayout(false, this.selectedItem);
    }
    cutMindMap() {
        this.selectedItem.utilityMethods.cutLayout(this.selectedItem);
    }
    copyMindMap() {
        this.selectedItem.utilityMethods.copyLayout(this.selectedItem);
    }
    pasteMindMap() {
        this.selectedItem.utilityMethods.pasteLayout(this.selectedItem);
    }
    addChild(args) {
        MindMapUtilityMethods.addNode('Left');
    }
    addRightChild(args) {
        MindMapUtilityMethods.addNode('Right');
    }
    addSibilingChildTop() {
        MindMapUtilityMethods.addSibilingChild('Top');
    }
    addSibilingChildBottom() {
        MindMapUtilityMethods.addSibilingChild('Bottom');
    }
    removeChild(args) {
        this.selectedItem.utilityMethods.removeChild(this.selectedItem);
    }
    navigateLeftChild(args) {
        this.navigateChild('left');
    }
    navigateRightChild() {
        this.navigateChild('right');
    }
    navigateTopChild() {
        this.navigateChild('top');
    }
    navigateBottomChild() {
        this.navigateChild('bottom');
    }
    expandCollapse() {
        const diagram = this.selectedItem.selectedDiagram;
        if (diagram.selectedItems.nodes.length > 0) {
            const node = diagram.selectedItems.nodes[0];
            node.isExpanded = !node.isExpanded;
            diagram.dataBind();
        }
    }
    editNode() {
        const diagram = this.selectedItem.selectedDiagram;
        if (diagram.selectedItems.nodes.length > 0) {
            const node = diagram.selectedItems.nodes[0];
            diagram.startTextEdit(node, node.annotations[0].id);
            this.selectedItem.isModified = true;
        }
    }
    navigateChild(direction) {
        const diagram = this.selectedItem.selectedDiagram;
        let node = null;
        if (direction === 'top' || direction === 'bottom') {
            const sameLevelNodes = this.getSameLevelNodes();
            const index = sameLevelNodes.indexOf(diagram.selectedItems.nodes[0]);
            node = direction === 'top' ? sameLevelNodes[index - 1] : sameLevelNodes[index + 1];
        } else {
            node = this.getMinDistanceNode(diagram, direction);
        }
        if (node) {
            diagram.clearSelection();
            diagram.select([node]);
            diagram.bringIntoView(node.wrapper.bounds);
        }
    }
    getSameLevelNodes() {
        const sameLevelNodes = [];
        const diagram = this.selectedItem.selectedDiagram;
        if (diagram.selectedItems.nodes.length > 0) {
            const node = diagram.selectedItems.nodes[0];
            if (node.addInfo && node.addInfo.orientation) {
                const orientation = node.addInfo.orientation.toString();
                const connector = MindMapUtilityMethods.getConnector(diagram.connectors, node.inEdges[0]);
                const parentNode = MindMapUtilityMethods.getNode(diagram.nodes, connector.sourceID);
                for (let i = 0; i < parentNode.outEdges.length; i++) {
                    const connector = MindMapUtilityMethods.getConnector(diagram.connectors, parentNode.outEdges[i]);
                    const childNode = MindMapUtilityMethods.getNode(diagram.nodes, connector.targetID);
                    if (childNode) {
                        const childOrientation = childNode.addInfo.orientation.toString();
                        if (orientation === childOrientation) {
                            sameLevelNodes.push(childNode);
                        }
                    }
                }
            }
        }
        return sameLevelNodes;
    }
    getMinDistanceNode(diagram, direction) {
        const node = diagram.selectedItems.nodes[0];
        const parentBounds = node.wrapper.bounds;
        let childBounds = null;
        let oldChildBoundsTop = 0;
        let childNode = null;
        let lastChildNode = null;
        let leftOrientationFirstChild = null, rightOrientationFirstChild = null;
        if (node.id === 'rootNode') {
            const edges = node.outEdges;
            for (let i = 0; i < edges.length; i++) {
                const connector = MindMapUtilityMethods.getConnector(diagram.connectors, edges[i]);
                childNode = MindMapUtilityMethods.getNode(diagram.nodes, connector.targetID);
                const addInfo = childNode.addInfo;
                if (addInfo.orientation.toString().toLowerCase() === direction) {
                    if (direction === 'left' && leftOrientationFirstChild === null) {
                        leftOrientationFirstChild = childNode;
                    }
                    if (direction === 'right' && rightOrientationFirstChild === null) {
                        rightOrientationFirstChild = childNode;
                    }
                    childBounds = childNode.wrapper.bounds;
                    if (parentBounds.top >= childBounds.top && (childBounds.top >= oldChildBoundsTop || oldChildBoundsTop === 0)) {
                        oldChildBoundsTop = childBounds.top;
                        lastChildNode = childNode;
                    }
                }
            }
            if (!lastChildNode) {
                lastChildNode = direction === 'left' ? leftOrientationFirstChild : rightOrientationFirstChild;
            }
        } else {
            let edges = [];
            let selecttype = '';
            const orientation = node.addInfo.orientation.toString();
            if (orientation.toLowerCase() === 'left') {
                edges = direction === 'left' ? node.outEdges : node.inEdges;
                selecttype = direction === 'left' ? 'target' : 'source';
            } else {
                edges = direction === 'right' ? node.outEdges : node.inEdges;
                selecttype = direction === 'right' ? 'target' : 'source';
            }
            for (let i = 0; i < edges.length; i++) {
                const connector = MindMapUtilityMethods.getConnector(diagram.connectors, edges[i]);
                childNode = MindMapUtilityMethods.getNode(diagram.nodes, selecttype === 'target' ? connector.targetID : connector.sourceID);
                if (childNode.id === 'rootNode') {
                    lastChildNode = childNode;
                    break;
                } else {
                    childBounds = childNode.wrapper.bounds;
                    if (selecttype === 'target') {
                        if (parentBounds.top >= childBounds.top && (childBounds.top >= oldChildBoundsTop || oldChildBoundsTop === 0)) {
                            oldChildBoundsTop = childBounds.top;
                            lastChildNode = childNode;
                        }
                    } else {
                        lastChildNode = childNode;
                    }
                }
            }
        }
        return lastChildNode;
    }
    createMindMap(isNew) {
        const diagram = this.selectedItem.selectedDiagram;
        this.selectedItem.utilityMethods.currentDiagramVisibility('mindmap-diagram', this.selectedItem);
        diagram.updateViewPort();
        if (isNew) {
            diagram.clear();
            diagram.constraints = diagram.constraints & ~ej.diagrams.DiagramConstraints.UndoRedo;
            const rootNode = MindMapUtilityMethods.createEmptyMindMap();
            this.selectedItem.utilityMethods.updatePages(this.selectedItem,'MindMap');
            diagram.layout = {
                horizontalSpacing: 100,
                verticalSpacing: 50,
                type: 'MindMap',
                getBranch: function (node) {
                    if (node.addInfo) {
                        const addInfo = node.addInfo;
                        return addInfo.orientation ? addInfo.orientation.toString() : '';
                    }
                    return 'Left';
                },
                root: rootNode.id
            };
            diagram.pageSettings = { width: null, height: null };
            diagram.selectedItems = { userHandles: MindMapUtilityMethods.handle, constraints: ej.diagrams.SelectorConstraints.UserHandle };
            diagram.commandManager = this.getCommandSettings();
            diagram.snapSettings.constraints = diagram.snapSettings.constraints & ~ej.diagrams.SnapConstraints.ShowLines;
            diagram.constraints = diagram.constraints | ej.diagrams.DiagramConstraints.UndoRedo;
            diagram.tool = ej.diagrams.DiagramTools.SingleSelect; /* By default enable select tool alone*/
            diagram.dataBind();
            this.selectedItem.utilityMethods.bindMindMapProperties(rootNode, this.selectedItem);
        } else {
            this.updateMindMap();
        }
        diagram.contextMenuSettings.show = false;
        diagram.dataBind();
        this.selectedItem.utilityMethods.createShortCutDiv();
    }
    updateMindMap() {
        const diagram = this.selectedItem.selectedDiagram;
        diagram.layout = {
            type:'MindMap',
            getBranch: function (node) {
                if (node.addInfo) {
                    const addInfo = node.addInfo;
                    return addInfo.orientation ? addInfo.orientation.toString() : '';
                }
                return 'Left';
            },
        };
        diagram.pageSettings = { width: null, height: null };
        diagram.selectedItems = { userHandles: MindMapUtilityMethods.handle, constraints: ej.diagrams.SelectorConstraints.UserHandle };
        diagram.commandManager = this.getCommandSettings();
        diagram.tool = ej.diagrams.DiagramTools.SingleSelect | ej.diagrams.DiagramTools.ZoomPan;
    }
    getShortCutKeys(shortcutKeys) {
        const annotations = [];
        let y = 0.1;
        for (let i = 0; i < shortcutKeys.length; i++) {
            const annotation = {
                content: shortcutKeys[i].key.toString() + ': ' + shortcutKeys[i].value.toString(), offset: { x: 0.1, y: y }, visibility: true,
                style: { color: 'white' }, horizontalAlignment: 'Left', verticalAlignment: 'Bottom'
            };
            annotations.push(annotation);
            y += 0.1;
        }
        return annotations;
    }
}

class MindMapUtilityMethods {
    static lastFillIndex = 0;
    static mindmapPaste() {
        const diagram = this.selectedItem.selectedDiagram;
        const selectedNode = diagram.selectedItems.nodes[0];
        let selectedelement;
        let mindmapData;
        let selecteditemOrientation;
        if (this.selectedItem.pasteData.length > 0) {
            diagram.startGroupAction();
            diagram.paste(this.selectedItem.pasteData);
            if (selectedNode.id !== 'rootNode') {
                selecteditemOrientation = selectedNode.addInfo.orientation.toString();
            } else {
                selecteditemOrientation = this.selectedItem.pastedFirstItem.addInfo.orientation.toString();
            }
            selectedelement = this.selectedItem.pastedFirstItem;
            mindmapData = MindMapUtilityMethods.getMindMapShape(selectedNode);
            const connector = MindMapUtilityMethods.setConnectorDefault(diagram, selecteditemOrientation, mindmapData.connector, selectedNode.id, selectedelement.id);
            diagram.add(connector);
            let selectedNodeLevel;
            selectedNodeLevel = selectedNode.addInfo.level;
            this.updateLevel(selectedelement, selectedNodeLevel, selecteditemOrientation);
            diagram.clearSelection();
            this.selectedItem.preventPropertyChange = true;
            diagram.select([selectedelement]);
            this.selectedItem.preventPropertyChange = false;
            diagram.doLayout();
            diagram.endGroupAction();
            diagram.bringIntoView(diagram.nodes[diagram.nodes.length - 1].wrapper.bounds);
        }
    }
    static updateLevel(parentNode, level, orientation) {
        const diagram = this.selectedItem.selectedDiagram;
        parentNode.addInfo.level = level + 1;
        let level1 = 'Level' + parentNode.addInfo.level;
        this.addMindMapLevels(level1);
        parentNode.addInfo.orientation = orientation;
        for (let i = parentNode.outEdges.length - 1; i >= 0; i--) {
            const connector = MindMapUtilityMethods.getConnector(diagram.connectors, parentNode.outEdges[i]);
            const childNode = MindMapUtilityMethods.getNode(diagram.nodes, connector.targetID);
            childNode.addInfo.orientation = orientation;
            connector.sourcePortID = 'rightPort';
            connector.targetPortID = 'leftPort';
            if (orientation === 'Right') {
                connector.sourcePortID = 'leftPort';
                connector.targetPortID = 'rightPort';
            }
            if (childNode.outEdges.length > 0) {
                this.updateLevel(childNode, parentNode.addInfo.level, orientation);
            } else {
                childNode.addInfo.level = parentNode.addInfo.level + 1;
                level1 = 'Level' + childNode.addInfo.level;
                this.addMindMapLevels(level1);
            }
        }
        diagram.dataBind();
    }
    static addMindMapLevels(level) {
        const mindmap = document.getElementById('mindMapLevels');
        const dropdownlist = mindmap.ej2_instances[0];
        const dropdowndatasource = dropdownlist.dataSource;
        let isExist = false;
        for (let i = 0; i < dropdowndatasource.length; i++) {
            const data = dropdowndatasource[i];
            if (data.text === level) {
                isExist = true;
                break;
            }
        }
        if (!isExist) {
            dropdowndatasource.push({ text: level, value: level });
        }
        dropdownlist.dataSource = dropdowndatasource;
        dropdownlist.dataBind();
    }
    static createEmptyMindMap() {
        const node = {
            id: 'rootNode', width: 150, minHeight: 50,
            annotations: [{ content: 'MindMap', style: { color: '#000000', fontFamily:'Arial', fontSize:12 } }],
            shape: { type: 'Basic', shape: 'Rectangle', cornerRadius: 5 },
            ports: [{ id: 'leftPort', offset: { x: 0, y: 0.5 } }, { id: 'rightPort', offset: { x: 1, y: 0.5 } }],
            addInfo: { level: 0 }, style: { fill: '#D0ECFF', strokeColor: '#80BFEA', strokeWidth: 1 },
            constraints: ej.diagrams.NodeConstraints.Default & ~ej.diagrams.NodeConstraints.Delete
        };
        this.selectedItem.selectedDiagram.add(node);
        return node;
    }
    static toggleShortcutVisibility() {
        this.selectedItem.utilityMethods.toggleShortcutVisibility();
    }
    static getMindMapShape(parentNode) {
        let node = {};
        let connector = {};
        const addInfo = parentNode.addInfo;
        const annotations = {
            content: ''
        };
        node = {
            minWidth: 100, maxWidth: 100, minHeight: 20, height: this.selectedItem.childNodeHeight ? this.selectedItem.childNodeHeight : 50, shape: { type: 'Basic', shape: 'Rectangle' },
            annotations: [annotations], style: { fill: '#000000', strokeColor: '#000000' },
            addInfo: { level: addInfo.level + 1 },
            offsetX: 200, offsetY: 200
        };
        //To select proper connector type based on current diagram template in mindmap
        connector = { type: this.selectedItem.connectorType ? this.selectedItem.connectorType : 'Bezier', style: { strokeWidth: 3 } };

        if (addInfo.level < 1) {
            node.style.fill = this.selectedItem.utilityMethods.fillColorCode[this.lastFillIndex];
            node.style.strokeColor = this.selectedItem.utilityMethods.borderColorCode[this.lastFillIndex];
            if (this.lastFillIndex + 1 >= this.selectedItem.utilityMethods.fillColorCode.length) {
                this.lastFillIndex = 0;
            } else {
                this.lastFillIndex++;
            }
        } else {
            node.style.strokeColor = node.style.fill = parentNode.style.fill;
        }
        connector.style.strokeColor = node.style.fill;
        connector.targetDecorator = { shape: 'None' };
        connector.constraints = ej.diagrams.ConnectorConstraints.PointerEvents | ej.diagrams.ConnectorConstraints.Select | ej.diagrams.ConnectorConstraints.Delete;
        node.constraints = ej.diagrams.NodeConstraints.Default & ~ej.diagrams.NodeConstraints.Drag;
        node.ports = [{ id: 'leftPort', offset: { x: 0, y: 0.5 } }, { id: 'rightPort', offset: { x: 1, y: 0.5 } }];

        return { node, connector };
    }
    static addNode(orientation) {
        const diagram = this.selectedItem.selectedDiagram;
        const selectedNode = diagram.selectedItems.nodes[0];
        if (selectedNode.id !== 'rootNode') {
            const selectedNodeOrientation = selectedNode.addInfo.orientation.toString();
            orientation = selectedNodeOrientation;
        }
        diagram.startGroupAction();
        const mindmapData = this.getMindMapShape(selectedNode);
        const node = mindmapData.node;
        this.addMindMapLevels('Level' + node.addInfo.level);
        node.id = 'node' + this.selectedItem.randomIdGenerator();
        if (node.addInfo) {
            node.addInfo.orientation = orientation;
        } else {
            node.addInfo = { orientation };
        }
        diagram.add(node);
        const connector = this.setConnectorDefault(diagram, orientation, mindmapData.connector, selectedNode.id, node.id);
        diagram.add(connector);
        const newNode = this.getNode(diagram.nodes, node.id);
        diagram.doLayout();
        diagram.endGroupAction();
        this.selectedItem.preventPropertyChange = true;
        diagram.select([newNode]);
        this.selectedItem.preventPropertyChange = false;
        diagram.dataBind();
        diagram.bringIntoView(newNode.wrapper.bounds);
        diagram.startTextEdit(newNode, newNode.annotations[0].id);
        this.selectedItem.isModified = true;
    }
    static addSibilingChild(position) {
        const diagram = this.selectedItem.selectedDiagram;
        const selectedNode = diagram.selectedItems.nodes[0];
        if (selectedNode.id !== 'rootNode') {
            const selectedNodeOrientation = selectedNode.addInfo.orientation.toString();

            const connector1 = this.getConnector(diagram.connectors, selectedNode.inEdges[0]);
            diagram.startGroupAction();
            const mindmapData = this.getMindMapShape(this.getNode(diagram.nodes, connector1.sourceID));
            const node = mindmapData.node;
            node.id = 'node' + this.selectedItem.randomIdGenerator();
            node.addInfo.orientation = selectedNodeOrientation;
            diagram.add(node);
            const connector = this.setConnectorDefault(diagram, selectedNodeOrientation, mindmapData.connector, connector1.sourceID, node.id);
            diagram.add(connector);
            const newNode = this.getNode(diagram.nodes, node.id);
            diagram.doLayout();
            diagram.endGroupAction();
            this.selectedItem.preventPropertyChange = true;
            diagram.select([newNode]);
            this.selectedItem.preventPropertyChange = false;
            diagram.bringIntoView(newNode.wrapper.bounds);
            diagram.startTextEdit(newNode, newNode.annotations[0].id);
            this.selectedItem.isModified = true;
        }
    }
    static getConnector(connectors, name) {
        return connectors.find(connector => connector.id === name);
    }
    static getNode(nodes, name) {
        return nodes.find(node => node.id === name);
    }
    static setConnectorDefault(diagram, orientation, connector, sourceID, targetID) {
        connector.id = 'connector' + this.selectedItem.randomIdGenerator();
        connector.sourceID = sourceID;
        connector.targetID = targetID;
        connector.sourcePortID = 'rightPort';
        connector.targetPortID = 'leftPort';
        if (orientation === 'Right') {
            connector.sourcePortID = 'leftPort';
            connector.targetPortID = 'rightPort';
        }
        connector.style.strokeWidth = 3;
        return connector;
    }
    static handle = [
        {
            name: 'leftHandle', pathColor: 'white', backgroundColor: '#7d7d7d', borderColor: 'white',
            pathData: 'M0,3.063 L7.292,3.063 L7.292,0 L11.924,4.633 L7.292,9.266 L7.292,5.714 L0.001,5.714 L0.001,3.063Z',
            side: 'Right', offset: 0.5, horizontalAlignment: 'Center', verticalAlignment: 'Center',
        },
        {
            name: 'rightHandle', pathColor: 'white', backgroundColor: '#7d7d7d', borderColor: 'white',
            pathData: 'M11.924,6.202 L4.633,6.202 L4.633,9.266 L0,4.633 L4.632,0 L4.632,3.551 L11.923,3.551 L11.923,6.202Z',
            visible: true, offset: 0.5, side: 'Left', horizontalAlignment: 'Center', verticalAlignment: 'Center'
        }, {
            name: 'removeHandle', pathColor: 'white', backgroundColor: '#7d7d7d', borderColor: 'white',
            pathData: 'M 7.04 22.13 L 92.95 22.13 L 92.95 88.8 C 92.95 91.92 91.55 94.58 88.76 96.74 C 85.97 98.91 82.55 100 78.52 100 L 21.48 100 C 17.45 100 14.03 98.91 11.24 96.74 C 8.45 94.58 7.04 91.92 7.04 88.8 z M 32.22 0 L 67.78 0 L 75.17 5.47 L 100 5.47 L 100 16.67 L 0 16.67 L 0 5.47 L 24.83 5.47 z',
            side: 'Bottom', offset: 0.5, horizontalAlignment: 'Center', verticalAlignment: 'Center'
        }
    ];
}

export { MindMap, MindMapUtilityMethods };
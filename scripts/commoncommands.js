class CommonKeyboardCommands {
    constructor() {
        this.selectedItem = null;
        this.page = null;
        this.isOpen = false;
    }

    static newDiagram() {
        const diagram = this.selectedItem.selectedDiagram;
        document.getElementById('diagramName').innerHTML = 'Untitled Diagram';
        let zoomCurrentValue = document.getElementById("btnZoomIncrement").ej2_instances[0];
        zoomCurrentValue.content = '100%';
        this.selectedItem.utilityMethods.resetZoomTo100(diagram);
        let openTemplateDialog = document.getElementById("openTemplateDialog").ej2_instances[0];
        openTemplateDialog.show();
    }

    static openDiagram() {
        this.openUploadBox(true, '.json');
    }

    static saveDiagram() {
        this.download(this.page.savePage(), document.getElementById('diagramName').innerHTML);
    }

    static zoomIn() {
        const diagram = this.selectedItem.selectedDiagram;
        diagram.zoomTo({ type: 'ZoomIn', zoomFactor: 0.2 });
        this.selectedItem.scrollSettings.currentZoom = (diagram.scrollSettings.currentZoom * 100).toFixed() + '%';
    }

    static zoomOut() {
        const diagram = this.selectedItem.selectedDiagram;
        diagram.zoomTo({ type: 'ZoomOut', zoomFactor: 0.2 });
        this.selectedItem.scrollSettings.currentZoom = (diagram.scrollSettings.currentZoom * 100).toFixed() + '%';
    }

    static download(data, filename) {
        let dataStr = data;
        if (window.navigator.msSaveBlob) {
            const blob = new Blob([dataStr], { type: 'data:text/json;charset=utf-8,' });
            window.navigator.msSaveOrOpenBlob(blob, filename + '.json');
        } else {
            dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(dataStr);
            const a = document.createElement('a');
            a.href = dataStr;
            a.download = filename + '.json';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a); // Remove the link after clicking
        }
    }

    static openUploadBox(isOpen, extensionType) {
        const defaultUpload = document.getElementById('defaultfileupload');
        const uploadInstance = defaultUpload.ej2_instances[0];
        uploadInstance.clearAll();
        this.selectedItem.orgDataSettings.extensionType = uploadInstance.allowedExtensions = extensionType;
        uploadInstance.dataBind();
        this.isOpen = isOpen;
        document.getElementsByClassName('e-file-select-wrap')[0].children[0].click();
    }

    static addCommonCommands(commands) {
        commands.push({
            gesture: { key: ej.diagrams.Keys.N, keyModifiers: ej.diagrams.KeyModifiers.Shift }, canExecute: this.canExecute,
            execute: this.newDiagram.bind(this), name: 'New'
        });
        commands.push({
            gesture: { key: ej.diagrams.Keys.O, keyModifiers: ej.diagrams.KeyModifiers.Control }, canExecute: this.canExecute,
            execute: this.openDiagram.bind(this), name: 'Open'
        });
        commands.push({
            gesture: { key: ej.diagrams.Keys.S, keyModifiers: ej.diagrams.KeyModifiers.Control }, canExecute: this.canExecute,
            execute: this.saveDiagram.bind(this), name: 'Save'
        });
        commands.push({
            gesture: { key: ej.diagrams.Keys.Plus, keyModifiers: ej.diagrams.KeyModifiers.Control }, canExecute: this.canExecute,
            execute: this.zoomIn.bind(this), name: 'ZoomIn'
        });
        commands.push({
            gesture: { key: ej.diagrams.Keys.Minus, keyModifiers: ej.diagrams.KeyModifiers.Control }, canExecute: this.canExecute,
            execute: this.zoomOut.bind(this), name: 'ZoomOut'
        });
        return commands;
    }

    static canExecute() {
        return true;
    }

    static cloneSelectedItems() {
        const diagram = this.selectedItem.selectedDiagram;
        let selectedItems = diagram.selectedItems.nodes.concat(diagram.selectedItems.connectors);
        return selectedItems;
    }

    static duplicateSelectedItems() {
        this.selectedItem.selectedDiagram.paste(this.cloneSelectedItems());
    }

    static cloneSelectedItemswithChildElements() {
        return this.cloneChild();
    }

    static cloneChild() {
        const diagram = this.selectedItem.selectedDiagram;
        let selectedItems = [];
        if (diagram.selectedItems.nodes.length > 0) {
            const node = diagram.selectedItems.nodes[0];
            node.addInfo = node.addInfo || {};
            node.addInfo.isFirstNode = true;
            selectedItems.push(node);
            selectedItems = this.cloneSubChildSubChild(node, selectedItems);
        }
        return selectedItems;
    }

    static cloneSubChildSubChild(node, select) {
        const diagram = this.selectedItem.selectedDiagram;
        let selection = select;
        for (let i = node.outEdges.length - 1; i >= 0; i--) {
            const connector = diagram.getObject(node.outEdges[i]);
            const childNode = diagram.getObject(connector.targetID);
            selection.push(connector);
            selection.push(childNode);
            if (childNode.outEdges.length > 0) {
                this.cloneSubChildSubChild(childNode, selection);
            }
        }
        return this.sortCollection(selection);
    }

    static sortCollection(selection) {
        const nodes = [];
        const connectors = [];
        for (let item of selection) {
            if (item instanceof ej.diagrams.Node) {
                nodes.push(item);
            } else if (item instanceof ej.diagrams.Connector) {
                connectors.push(item);
            }
        }
        return [...nodes, ...connectors];
    }
}

export default CommonKeyboardCommands;
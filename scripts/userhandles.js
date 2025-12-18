import { selectedItem } from '../index.js';
import {MindMapUtilityMethods} from './mindmap';
import {OrgChartUtilityMethods} from './orgchart'
class CustomTool {
    constructor(selectedItem) {
        this.selectedItem = selectedItem;
    }

    getTool(action) {
        let tool;
        const handler = diagram.ej2_instances[0].commandHandler;
        switch (action) {
            case 'leftHandle': {
                const leftTool = new LeftExtendTool(selectedItem.selectedDiagram.commandHandler);
                leftTool.selectedItem = selectedItem;
                return leftTool;
            }
            case 'rightHandle': {
                const rightTool = new RightExtendTool(selectedItem.selectedDiagram.commandHandler);
                rightTool.selectedItem = selectedItem;
                return rightTool;
            }
            case 'removeHandle': {
                const removeTool = new RemoveTool(selectedItem.selectedDiagram.commandHandler);
                removeTool.selectedItem = selectedItem;
                return removeTool;
            }
            case 'orgAddHandle': {
                const orgAddTool = new OrgAddHandleTool(selectedItem.selectedDiagram.commandHandler);
                orgAddTool.selectedItem = selectedItem;
                return orgAddTool;
            }
            case 'orgRemoveHandle': {
                const orgRemoveTool = new OrgRemoveHandleTool(selectedItem.selectedDiagram.commandHandler);
                orgRemoveTool.selectedItem = selectedItem;
                return orgRemoveTool;
            }
            case 'orgEditHandle': {
                const orgEditTool = new OrgEditHandleTool(selectedItem.selectedDiagram.commandHandler);
                orgEditTool.selectedItem = selectedItem;
                return orgEditTool;
            }
            default:
                return null;
        }
    }
}

class LeftExtendTool extends ej.diagrams.ToolBase {
    constructor(...args) {
        super(...args);
        this.selectedItem = null;
    }

    mouseDown(args) {
        this.inAction = true;
        super.mouseDown(args);
    }

    mouseUp(args) {
        if (this.inAction) {
            const selectedObject = this.commandHandler.getSelectedObject();
            if (selectedObject[0] instanceof ej.diagrams.Node) {
                MindMapUtilityMethods.addNode('Left');
            }
        }
        super.mouseUp(args);
    }
}

class RightExtendTool extends ej.diagrams.ToolBase {
    constructor(...args) {
        super(...args);
        this.selectedItem = null;
    }

    mouseDown(args) {
        this.inAction = true;
        super.mouseDown(args);
    }

    mouseUp(args) {
        if (this.inAction) {
            const selectedObject = this.commandHandler.getSelectedObject();
            if (selectedObject[0] instanceof ej.diagrams.Node) {
                MindMapUtilityMethods.addNode('Right');
            }
        }
        super.mouseUp(args);
    }
}

class RemoveTool extends ej.diagrams.ToolBase {
    constructor(...args) {
        super(...args);
        this.selectedItem = null;
    }

    mouseDown(args) {
        this.inAction = true;
        super.mouseDown(args);
    }

    mouseUp(args) {
        if (this.inAction) {
            const selectedObject = this.commandHandler.getSelectedObject();
            if (selectedObject[0] instanceof ej.diagrams.Node) {
                selectedItem.utilityMethods.removeChild(selectedItem);
            }
        }
        super.mouseUp(args);
    }
}

class OrgAddHandleTool extends ej.diagrams.ToolBase {
    constructor(...args) {
        super(...args);
        this.selectedItem = null;
    }

    mouseDown(args) {
        this.inAction = true;
        super.mouseDown(args);
    }

    mouseUp(args) {
        if (this.inAction) {
            const selectedObject = this.commandHandler.getSelectedObject();
            if (selectedObject[0] instanceof ej.diagrams.Node) {
                OrgChartUtilityMethods.addChild(selectedItem.selectedDiagram.selectedItems.nodes[0].id);
            }
        }
        super.mouseUp(args);
    }
}

class OrgRemoveHandleTool extends ej.diagrams.ToolBase {
    constructor(...args) {
        super(...args);
        this.selectedItem = null;
    }

    mouseDown(args) {
        this.inAction = true;
        super.mouseDown(args);
    }

    mouseUp(args) {
        if (this.inAction) {
            const selectedObject = this.commandHandler.getSelectedObject();
            if (selectedObject[0] instanceof ej.diagrams.Node) {
                selectedItem.utilityMethods.removeChild(selectedItem);
            }
        }
        super.mouseUp(args);
    }
}

class OrgEditHandleTool extends ej.diagrams.ToolBase {
    constructor(...args) {
        super(...args);
        this.selectedItem = null;
    }

    mouseDown(args) {
        this.inAction = true;
        super.mouseDown(args);
    }

    mouseUp(args) {
        if (this.inAction) {
            const selectedObject = this.commandHandler.getSelectedObject();
            if (selectedObject[0] instanceof ej.diagrams.Node) {
                OrgChartUtilityMethods.showCustomProperty();
            }
        }
        super.mouseUp(args);
    }
}


// Export all classes
export {
    CustomTool,
    LeftExtendTool,
    RightExtendTool,
    RemoveTool,
    OrgAddHandleTool,
    OrgRemoveHandleTool,
    OrgEditHandleTool
};
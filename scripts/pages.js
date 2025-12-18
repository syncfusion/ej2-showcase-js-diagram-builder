import {MindMapUtilityMethods, MindMap} from './mindmap';
import {OrgChartData, OrgChartUtilityMethods} from './orgchart';
class PageOptions {
    constructor() {}
}

class PageCreation {
    constructor(selectedItem) {
        this.pageOptionList = [];
        this.pageSwitch = false;
        this.selectedItem = selectedItem;
    }

    generatePageButtons(pages) {
        const pageOptionElement = document.getElementById('pageOptionList');
        const pageContainerWidth = pageOptionElement.parentElement.getBoundingClientRect().width - 1;
        let buttonWidth = 75;
        if (pages.length * buttonWidth > pageContainerWidth) {
            buttonWidth = (pageContainerWidth - 32) / pages.length;
        }
        while (pageOptionElement.hasChildNodes()) {
            pageOptionElement.removeChild(pageOptionElement.lastChild);
        }
        pages.forEach((pageOption) => {
            const buttonElement = document.createElement('button');
            buttonElement.setAttribute('id', pageOption.name);
            buttonElement.setAttribute('style', `width:${buttonWidth}px`);
            buttonElement.setAttribute('title', pageOption.text);
            buttonElement.onclick = this.showPageData.bind(this);
            pageOptionElement.appendChild(buttonElement);
            const pageButton = new ej.buttons.Button({
                content: pageOption.text
            });
            pageButton.appendTo(buttonElement);
            if (this.activePage.name === pageOption.name) {
                buttonElement.classList.add('db-active-page');
            }
        });
        const addButtonElement = document.createElement('button');
        addButtonElement.setAttribute('id', 'addNewPage');
        pageOptionElement.appendChild(addButtonElement);
        addButtonElement.setAttribute('style', 'width:32px');
        addButtonElement.onclick = this.addNewPage.bind(this);
        const addPageButton = new ej.buttons.Button({
            iconCss: 'sf-icon-Plus'
        });
        addPageButton.appendTo(addButtonElement);
    }

    showPageData(evt) {
        const target = evt.target;
        const page = this.findPage(target.id);
        if (page != null) {
            if (this.activePage) {
                const button = document.getElementById(this.activePage.name);
                if (button.classList.contains('db-active-page')) {
                    button.classList.remove('db-active-page');
                }
                this.saveDiagramSettings();
            }
            this.activePage = page;
            this.pageSwitch = true;
            this.loadDiagramSettings();
            this.pageSwitch = false;
        }
        target.classList.add('db-active-page');
    }

    findPage(id) {
        return this.pageOptionList.find(page => page.name === id) || null;
    }

    addNewPage() {
        if (this.activePage) {
            this.saveDiagramSettings();
            this.selectedItem.utilityMethods.resetZoomTo100(this.selectedItem.selectedDiagram);
            this.selectedItem.selectedDiagram.clear();
        }
        if (this.selectedItem.diagramType === 'MindMap') {
            MindMapUtilityMethods.createEmptyMindMap();
            this.selectedItem.selectedDiagram.doLayout();
        } else if (this.selectedItem.diagramType === 'OrgChart') {
            OrgChartUtilityMethods.createEmptyOrgChart();
            this.selectedItem.selectedDiagram.doLayout();
        }
        this.activePage = new PageOptions();
        this.activePage.name = `page${this.pageOptionList.length + 1}`;
        this.activePage.text = `Page${this.pageOptionList.length + 1}`;
        this.pageOptionList.push(this.activePage);
        this.generatePageButtons(this.pageOptionList);
    }

    savePage() {
        const pageData = {};
        this.saveDiagramSettings();
        pageData.pageOptionList = this.pageOptionList;
        pageData.activePage = this.activePage.name;
        pageData.diagramType = this.selectedItem.diagramType;
        return JSON.stringify(pageData);
    }

    loadPage(savedData) {
        const pageData = JSON.parse(savedData);
        this.pageOptionList = pageData.pageOptionList;
        this.activePage = this.findPage(pageData.activePage.toString());
        this.selectedItem.diagramType = pageData.diagramType.toString();
        this.generatePageButtons(this.pageOptionList);
    }

    saveDiagramSettings() {
        this.activePage.diagram = JSON.parse(this.selectedItem.selectedDiagram.saveDiagram());
        if (this.selectedItem.diagramType === 'MindMap') {
            this.activePage.mindmapTemplateType = MindMapUtilityMethods.templateType;
        }
    }

    updateDiagramViews(){
        // While calling diagram refresh, the overview is removed from the diagram views causing diagram not visible after load or creating new page.
        const diagram = this.selectedItem.selectedDiagram;
        const overview = document.getElementById('overview').ej2_instances[0];
        if (diagram.views.length === 1 && diagram.views[0] !== 'overview') {
            diagram.views.push(overview.element.id);
            diagram.views[overview.element.id] = overview;
        }
    }

    loadDiagramSettings() {
        const diagram = this.selectedItem.selectedDiagram;
        if (this.selectedItem.diagramType === "GeneralDiagram") {
            this.selectedItem.utilityMethods.hideShortcutVisibility();
            this.selectedItem.utilityMethods.updatePalette(diagram);
        }
        this.selectedItem.isLoading = true;
        diagram.loadDiagram(JSON.stringify(this.activePage.diagram));
        if (this.selectedItem.diagramType === "GeneralDiagram") {
            this.setNodeDefaults(diagram.nodes);
        }
        diagram.clearSelection();
        if (this.selectedItem.diagramType === 'GeneralDiagram') {
            diagram.refresh();
        }
        this.updateDiagramViews();
        if (this.selectedItem.diagramType !== "GeneralDiagram" && this.selectedItem.diagramType !== 'OrgChart') {
            diagram.fitToPage();
            switch(this.activePage.mindmapTemplateType){
                case 'template1':
                    this.selectedItem.connectorType = 'Bezier';
                    this.selectedItem.childNodeHeight = 20;
                    break;
                case 'template2':
                    this.selectedItem.connectorType = 'Orthogonal';
                    this.selectedItem.childNodeHeight = 50;
                    break;
                case 'template3':
                    this.selectedItem.connectorType = 'Straight';
                    this.selectedItem.childNodeHeight = 50;
                    break;
            }
        }
        let zoomCurrentValue = document.getElementById("btnZoomIncrement").ej2_instances[0];
        zoomCurrentValue.content = (this.selectedItem.selectedDiagram.scrollSettings.currentZoom * 100).toFixed() + '%';
        this.selectedItem.isLoading = false;
        if (this.selectedItem.diagramType === 'MindMap') {
            MindMapUtilityMethods.templateType = this.activePage.mindmapTemplateType;
            if (!this.pageSwitch && !this.selectedItem.isTemplateLoad) {
                MindMapUtilityMethods.selectedItem = this.selectedItem;
                const map = new MindMap(this.selectedItem);
                map.createMindMap(false);
            }
            const closeIconDiv = document.getElementById('customShortcutDiv').querySelector('#closeIconDiv');
            if (closeIconDiv) {
                closeIconDiv.onclick = MindMapUtilityMethods.toggleShortcutVisibility.bind(MindMapUtilityMethods);
            }
        }
        if (this.selectedItem.diagramType === 'OrgChart') {
            if (!this.pageSwitch && !this.selectedItem.isTemplateLoad) {
                OrgChartUtilityMethods.selectedItem = this.selectedItem;
                const org = new OrgChartData(this.selectedItem);
                org.createOrgChart(false);
            }
            const closeIconDiv = document.getElementById('customShortcutDiv').querySelector('#closeIconDiv');
            if (closeIconDiv) {
                closeIconDiv.onclick = OrgChartUtilityMethods.toggleShortcutVisibility.bind(OrgChartUtilityMethods);
            }
        }
        const btnView = document.getElementById('diagram-menu').ej2_instances[0].items[2];
        if (diagram.rulerSettings) {
            btnView.items[5].iconCss = diagram.rulerSettings.showRulers ? 'sf-icon-Selection' : '';
            const containerDiv = document.getElementById('diagramContainerDiv');
            if (!diagram.rulerSettings.showRulers) {
                containerDiv.classList.remove('db-show-ruler');
            } else {
                if (!containerDiv.classList.contains('db-show-ruler')) {
                    containerDiv.classList.add('db-show-ruler');
                }
            }
        }
        if (diagram.snapSettings) {
            btnView.items[6].iconCss = (diagram.snapSettings.constraints & ej.diagrams.SnapConstraints.SnapToObject) ? 'sf-icon-Selection' : '';
            btnView.items[7].iconCss = (diagram.snapSettings.constraints & ej.diagrams.SnapConstraints.ShowLines) ? 'sf-icon-Selection' : '';
            btnView.items[9].iconCss = (diagram.snapSettings.constraints & ej.diagrams.SnapConstraints.SnapToLines) ? 'sf-icon-Selection' : '';
        }
    }

    setNodeDefaults(nodes) {
        for (let i = 0; i < nodes.length; i++) {
            let node = nodes[i];
            node.ports = [
                { offset: { x: 0, y: 0.5 }, style: { fill: 'white' }, visibility: ej.diagrams.PortVisibility.Connect | ej.diagrams.PortVisibility.Hover, constraints: ej.diagrams.PortConstraints.Default | ej.diagrams.PortConstraints.Draw },
                { offset: { x: 0.5, y: 0 }, style: { fill: 'white' }, visibility: ej.diagrams.PortVisibility.Connect | ej.diagrams.PortVisibility.Hover, constraints: ej.diagrams.PortConstraints.Default | ej.diagrams.PortConstraints.Draw },
                { offset: { x: 1, y: 0.5 }, style: { fill: 'white' }, visibility: ej.diagrams.PortVisibility.Connect | ej.diagrams.PortVisibility.Hover, constraints: ej.diagrams.PortConstraints.Default | ej.diagrams.PortConstraints.Draw },
                { offset: { x: 0.5, y: 1 }, style: { fill: 'white' }, visibility: ej.diagrams.PortVisibility.Connect | ej.diagrams.PortVisibility.Hover, constraints: ej.diagrams.PortConstraints.Default | ej.diagrams.PortConstraints.Draw }
            ];
        }
    }

    loadJson() {
        if (!this.selectedItem.uniqueId) {
            this.selectedItem.uniqueId = this.selectedItem.randomIdGenerator();
        }
        if (this.selectedItem.isModified) {
            const spanElement = document.getElementById('diagramreport');
            spanElement.innerHTML = 'Saving';
            this.selectedItem.isModified = false;
            const save = this.savePage();
            const ajax = new Ajax('https://ej2services.syncfusion.com/production/web-services/api/Diagram/SaveJson', 'POST', true, 'application/json');
            const data = JSON.stringify({
                DiagramName: this.selectedItem.uniqueId,
                DiagramContent: save,
            });
            ajax.send(data).then();
            ajax.onSuccess = (data) => {
                const uri = window.location.origin + this.selectedItem.getAbsolutePath() + '?id=' + this.selectedItem.uniqueId;
                window.history.replaceState(null, null, uri);
                this.selectedItem.isModified = false;
                spanElement.innerHTML = 'Saved';
            };
            ajax.onFailure = (args) => {
                this.selectedItem.isModified = false;
                spanElement.innerHTML = 'Offline';
            };
            ajax.onError = (args) => {
                this.selectedItem.isModified = false;
                spanElement.innerHTML = 'Offline';
                return null;
            };
        }
    }
}

export { PageOptions, PageCreation };
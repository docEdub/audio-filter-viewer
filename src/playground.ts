//#region Playground copy/paste code ...

class Padding {
    top: number = 0;
    left: number = 0;
    bottom: number = 0;
    right: number = 0;

    constructor(top: number, left?: number, bottom?: number, right?: number) {
        this.top = top;
        this.left = left ?? this.top;
        this.bottom = bottom ?? this.top;
        this.right = right ?? this.left;
    }
}

interface IGuiControl extends BABYLON.GUI.Control {
    onGuiResized(): void;
}

const isGuiControl = (control: BABYLON.GUI.Control): control is IGuiControl => {
    return (control as IGuiControl).onGuiResized !== undefined;
}

interface IGui {
    get height(): number;
    get width(): number;
    add(control: IGuiControl): void;
}

class Gui implements IGui {
    gui: BABYLON.GUI.AdvancedDynamicTexture;

    constructor(engine: BABYLON.Engine) {
        this.gui = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("gui");
        engine.onResizeObservable.add(() => {
            this.onResized();
        });
    }

    get height(): number { return this.gui.getInternalTexture()?.height ?? 0; }
    get width(): number { return this.gui.getInternalTexture()?.width ?? 0; }

    add(control: IGuiControl): void {
        this.gui.addControl(control);
    }

    onResized(): void {
        this.gui.executeOnAllControls((control) => {
            if (isGuiControl(control)) {
                control.onGuiResized();
            }
        });
    }
}

class GraphAxes extends BABYLON.GUI.Container implements IGuiControl {
    static readonly AxesColor = "grey";
    static readonly AxesWidth = 20;
    static readonly Padding = new Padding(100);

    gui: IGui;
    xAxis: BABYLON.GUI.Line;
    yAxis: BABYLON.GUI.Line;

    constructor(gui: IGui) {
        super();
        gui.add(this);
        this.gui = gui;
        this.xAxis = new BABYLON.GUI.Line();
        this.xAxis.lineWidth = GraphAxes.AxesWidth;
        this.xAxis.color = GraphAxes.AxesColor;
        this.addControl(this.xAxis);
        this.yAxis = new BABYLON.GUI.Line();
        this.yAxis.lineWidth = GraphAxes.AxesWidth;
        this.yAxis.color = GraphAxes.AxesColor;
        this.addControl(this.yAxis);
        this.onGuiResized();
    }

    onGuiResized(): void {
        const height = this.gui.height - (GraphAxes.Padding.top + GraphAxes.Padding.bottom);
        const width = this.gui.width - (GraphAxes.Padding.left + GraphAxes.Padding.right);
        this.height = height + `px`;
        this.width = width + `px`;
        this.top = (GraphAxes.Padding.top - GraphAxes.Padding.bottom) / 2;
        this.left = (GraphAxes.Padding.left - GraphAxes.Padding.right) / 2;
        this.xAxis.x2 = width;
        this.xAxis.y1 = this.xAxis.y2 = height;
        this.yAxis.y2 = this.xAxis.y1;
    }
}

class Playground {
    public static CreateScene(engine: BABYLON.Engine, canvas: HTMLCanvasElement): BABYLON.Scene {
        const scene = new BABYLON.Scene(engine);
        new BABYLON.FreeCamera("camera", new BABYLON.Vector3(0, 5, -10), scene);
        const gui = new Gui(engine);
        new GraphAxes(gui);
        return scene;
    }
}

//#endregion

export { Playground };

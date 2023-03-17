export

//#region Playground copy/paste code ...

class Playground {
    public static CreateScene(engine: BABYLON.Engine, canvas: HTMLCanvasElement): BABYLON.Scene {
        // This creates a basic Babylon Scene object (non-mesh)
        const scene = new BABYLON.Scene(engine);

        // This creates and positions a free camera (non-mesh)
        new BABYLON.FreeCamera("camera", new BABYLON.Vector3(0, 5, -10), scene);

        // Initialize GUI.
        const gui = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("gui");

        // Add a GUI multiline.
        const line = new BABYLON.GUI.MultiLine();
        line.add({x: 0, y: 0}, {x: `50%`, y: `50%`});
        gui.addControl(line);

        let lineStartX = 0;
        let lineDeltaX = 1;
        scene.onAfterRenderObservable.add(() => {
            lineStartX += lineDeltaX;
            if (lineStartX <= 0 || 100 <= lineStartX) {
                lineDeltaX *= -1;
            }
            line.getAt(0).x = `${lineStartX}%`;
        });

        return scene;
    }
}

//#endregion

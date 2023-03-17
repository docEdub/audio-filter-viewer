import { Playground } from "./playground";

(() => {
    const canvas = <HTMLCanvasElement> document.getElementById("MainCanvas");
    const engine = new BABYLON.Engine(canvas, true);
    const scene = Playground.CreateScene(engine, canvas);

    window.addEventListener('resize', () => {
        engine.resize();
    });

    engine.runRenderLoop(() => {
       scene.render();
    });
})();

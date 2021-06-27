import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { Loadable } from "./interface";
import { LoadingManager } from "three";

export class LoaderGLTF implements Loadable {
  private loader: GLTFLoader;
  constructor(manager: LoadingManager) {
    this.loader = new GLTFLoader(manager);;
  }
  public load = async (file: string) => {
    const obj = await this.loader.loadAsync(file)
    const scene = obj.scene || obj.scenes[0];
    if (!scene) {
      console.log('no obj to render');
      return null;
    }
    return scene;
  }
}
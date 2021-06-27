import { STLLoader } from "three/examples/jsm/loaders/STLLoader";
import { Loadable } from "./interface";
import { LoadingManager, Mesh } from "three";

export class LoaderSTL implements Loadable {
  private loader: STLLoader;
  constructor(manager: LoadingManager) {
    this.loader = new STLLoader(manager);;
  }
  public load = async (file: string) => {
    const geo = await this.loader.loadAsync(file)
    return new Mesh(geo);
  }
}
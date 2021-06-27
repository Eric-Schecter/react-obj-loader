import { Loadable } from "./interface";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import { MTLLoader } from "three/examples/jsm/loaders/MTLLoader";
import { LoadingManager } from "three";

export class LoaderObj implements Loadable {
  constructor(private manager: LoadingManager, private fileList: Map<string, string>) {}
  private loadMTL = async (src: string, loader: OBJLoader) => {
    const mtl = await new MTLLoader(this.manager).loadAsync(src);
    mtl.preload();
    loader.setMaterials(mtl)
  }
  private getMTLfromObj = (file: string) => {
    const url = this.fileList.get(file);
    if (!url) { return [] }
    const mark = 'mtllib';
    const filetype = '.mtl';
    return fetch(url)
      .then(res => res.text())
      .then(res => res.split('\n')
        .filter(d => d.startsWith(mark) && d.endsWith(filetype))
        .map(d => d.slice(mark.length).trim())
      )
      .catch(err => {
        console.log(err);
        return [];
      })
  }
  public load = async (file: string) => {
    const loader = new OBJLoader(this.manager);
    const mtlFiles = await this.getMTLfromObj(file);
    await mtlFiles.forEach(s => this.loadMTL(s, loader));
    return loader.loadAsync(file);
  }
}
import { LoadingManager, LoaderUtils,  } from "three";
import { Loadable } from "./interface";
import { LoaderGLTF } from "./gltf";
import { LoaderObj } from "./obj";
import { LoaderSTL } from "./stl";

export class LoaderHandler {
  private loaders: { [prop: string]: Loadable } = {};
  constructor(fileList:Map<string, string>){
    const manager = new LoadingManager();
    manager.setURLModifier(url => {
      const baseURL = LoaderUtils.extractUrlBase(url);
      const path = url.replace(baseURL, '');
      return fileList.has(path)
        ? fileList.get(path) as string
        : url
    })
    this.loaders['gltf'] = new LoaderGLTF(manager);
    this.loaders['obj'] = new LoaderObj(manager, fileList);
    this.loaders['stl'] = new LoaderSTL(manager);
  }
  public getRenderObjs = (files: string[]) => {
    return Promise.all(files.map(file => {
      const key = Object.keys(this.loaders)
        .filter(key => file.endsWith(`.${key}`))[0]
      return key ? this.loaders[key].load(file) : null;
    }));
  }
}
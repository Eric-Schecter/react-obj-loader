import { Object3D, Box3, Vector3 } from "three";
import { LoaderHandler } from "./loaderHandler";

const LOADEDOBJ = 'loadedObj';

export class LoaderManager {
  private loaders: LoaderHandler;
  private fileList = new Map<string, string>();
  private reg: RegExp;
  constructor() {
    this.loaders = new LoaderHandler(this.fileList)
    this.reg = new RegExp(`.(${this.getLoaderTypeString()})$`, 'i');
  }
  private getLoaderTypeString = () => {
    return Object
      .keys(this.loaders)
      .reduce((pre, curr) => `${pre}|${curr}`, '');
  }
  private handleFilePath = (entry: any): Promise<string> => {
    return new Promise((resolve) => {
      entry.file((file: any) => {
        const path = URL.createObjectURL(file);
        this.fileList.set(file.name, path);
        resolve('');
      })
    })
  }
  private handleDirPath = (entry: any) => {
    const reader = entry.createReader();
    return new Promise((resolve) => {
      reader.readEntries((entries: any) => {
        resolve(Promise.all(entries.map((entry: any) => this.handleItme(entry))));
      });
    })
  }
  private handleItme = async (entry: any) => {
    return await entry.isFile
      ? this.handleFilePath(entry)
      : this.handleDirPath(entry);
  }
  private parse = async (item: DataTransferItem) => {
    const entry = item.webkitGetAsEntry();
    return await this.handleItme(entry);
  }
  private getEntryFile = () => {
    const filelist = Array.from(this.fileList);
    return filelist.filter(([key]) => this.reg.test(key)).map(([key]) => key);
  }
  private clearFileList = () => {
    const fileList = Array.from(this.fileList.values());
    fileList.forEach(file => URL.revokeObjectURL(file));
    this.fileList.clear();
  }
  private normalized = (obj: Object3D) => {
    const box = new Box3().setFromObject(obj);
    const center = box.getCenter(new Vector3());
    const size = box.getSize(new Vector3());
    const ratio = Math.min(...size.toArray());
    obj.scale.divideScalar(ratio);
    obj.position.y += size.y / ratio / 2 - center.y;
    obj.name = LOADEDOBJ;
  }
  private setObjs = (objs: (Object3D | null)[]) => {
    objs.flatMap(obj => obj ? [obj] : [])
      .forEach(obj => this.normalized(obj))
  }
  public load = async (item: DataTransferItem, normalized = false) => {
    await this.parse(item);
    const entryFiles = this.getEntryFile();
    if (!entryFiles.length) {
      console.log('can not found glTF file');
      return [];
    }
    const objs = await this.loaders.getRenderObjs(entryFiles);
    normalized && this.setObjs(objs);
    this.clearFileList();
    return objs;
  }
  public dispose = () => {
    this.clearFileList();
  }
}
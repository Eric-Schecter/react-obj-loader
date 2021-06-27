import { Object3D } from "three";
export declare class LoaderManager {
    private loaders;
    private fileList;
    private reg;
    constructor();
    private getLoaderTypeString;
    private handleFilePath;
    private handleDirPath;
    private handleItme;
    private parse;
    private getEntryFile;
    private clearFileList;
    private normalized;
    private setObjs;
    load: (item: DataTransferItem, normalized?: boolean) => Promise<(Object3D | null)[]>;
    dispose: () => void;
}

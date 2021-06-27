import { Loadable } from "./interface";
import { LoadingManager } from "three";
export declare class LoaderObj implements Loadable {
    private manager;
    private fileList;
    constructor(manager: LoadingManager, fileList: Map<string, string>);
    private loadMTL;
    private getMTLfromObj;
    load: (file: string) => Promise<import("three").Group>;
}

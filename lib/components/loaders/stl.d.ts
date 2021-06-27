import { Loadable } from "./interface";
import { LoadingManager, Mesh } from "three";
export declare class LoaderSTL implements Loadable {
    private loader;
    constructor(manager: LoadingManager);
    load: (file: string) => Promise<Mesh<import("three").BufferGeometry, import("three").Material | import("three").Material[]>>;
}

import { Loadable } from "./interface";
import { LoadingManager } from "three";
export declare class LoaderGLTF implements Loadable {
    private loader;
    constructor(manager: LoadingManager);
    load: (file: string) => Promise<import("three").Group | null>;
}

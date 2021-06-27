export declare class LoaderHandler {
    private loaders;
    constructor(fileList: Map<string, string>);
    getRenderObjs: (files: string[]) => Promise<(import("three").Object3D | null)[]>;
}

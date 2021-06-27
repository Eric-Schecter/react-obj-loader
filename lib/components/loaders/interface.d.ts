import { Object3D } from "three";
export interface Loadable {
    load: (file: string) => Promise<Object3D | null>;
}

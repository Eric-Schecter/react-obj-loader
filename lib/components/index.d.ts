import { ReactChild } from 'react';
import { Object3D } from 'three';
declare type Props = {
    children?: ReactChild;
    cb?: (items: Object3D[]) => any;
    className?: string;
    normalized?: boolean;
};
export declare const ObjLoader: ({ children, cb, className, normalized }: Props) => JSX.Element;
export {};

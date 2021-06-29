import React, { ReactChild, useEffect, useRef } from 'react';
import { Object3D } from 'three';
import { LoaderManager } from './loaders';

type Props = {
  children?: ReactChild,
  cb?: (items: Object3D[]) => any,
  className?: string,
  normalized?: boolean
}

export const ObjLoader = ({ children, cb = () => { }, className = '', normalized = true }: Props) => {
  const refLoader = useRef(new LoaderManager());

  const dragover = (e: React.DragEvent) => {
    e.preventDefault();
  }

  const drop = async (e: React.DragEvent) => {
    if (!refLoader.current) {
      return;
    }
    e.stopPropagation();
    e.preventDefault();
    const items = Array.from(e.dataTransfer.items || []);
    if (items.length) {
      const promises = items.map(item => refLoader.current.load(item, normalized))
      const objs = await Promise.all(promises);
      const parts = objs.flat().flatMap(obj => obj ? [obj] : []);
      cb(parts);
    }
  }

  useEffect(() => {
    return refLoader.current.dispose;
  }, [])

  return <div
    className={className}
    onDrop={drop}
    onDragOver={dragover}
  >
    {children}
  </div>
}
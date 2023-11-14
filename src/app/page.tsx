'use client'

import { fabric } from 'fabric';
import { useRef, useEffect, useState } from 'react';

export default function Home() {
  const canvasEl = useRef<HTMLCanvasElement>(null);
  const [img, setImg] = useState<EventTarget & HTMLImageElement>(null);

  useEffect(() => {
    const width = canvasEl.current.clientWidth;
    const height = canvasEl.current.clientHeight;

    const c = new fabric.Canvas(canvasEl.current, {
      width: width,
      height: height,
      backgroundColor: '#242423',
      preserveObjectStacking: true
    });

    c.on('drop', (opt) => {
      const event: MouseEvent & { dataTransfer? : DataTransfer } = opt.e;
      const src = event.dataTransfer.getData('text/plain');
      const x = event.offsetX;
      const y = event.offsetY;

      const img = new Image();
      img.src = src;
      console.log(img.width);

      fabric.Image.fromURL(src, (object) => {
        object.set({
          left: x - (img.width/2),
          top: y - (img.height/2),
        })
        c.add(object);
        console.log(c.toSVG());
      })
    });

    return () => {
      c.dispose();
    }
  }, [])

  return (
    <div className="w-full flex-col">
      <div className="flex justify-center">
        <img src="/orange_thing.svg" />
        <img src="/pink_thing.svg" />
        <img src="/purple_thing.svg" />
      </div>
      <div className="w-full flex justify-center">
        <canvas className="w-1/3 aspect-square" ref={canvasEl}/>
      </div>
    </div>
  )
}

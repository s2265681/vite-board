import React, { useCallback, useEffect, useRef, useState } from 'react';

const tickCount = 4;

export default function TeamindGrid({ width, height, canvas, pixelRatio = 1 }) {
  const canvasElRef = useRef();
  const [ ctx, setCtx ] = useState(null);
  const drawRef = useRef(null);
  const cacheRef = useRef(null);
  const handledWidth = width * pixelRatio;
  const handledHeight = height * pixelRatio;
  const gridSize = 4000 * pixelRatio;
  const minGridSize = 20 * pixelRatio;
  const minSubSize = (tickCount + 1) * minGridSize;

  console.log(handledWidth, 'handledWidth');
  console.log(canvasElRef, 'canvasElRef');
  console.log(handledHeight, 'handledHeight');
  console.log(canvas, 'canvas...');

  const draw = useCallback(() => {
    if (!ctx) return;
    const safeVpt = Array.isArray(canvas?.viewportTransform)
      ? canvas.viewportTransform
      : [ 1, 0, 0, 1, 0, 0 ];
    const x = safeVpt[4] * pixelRatio;
    const y = safeVpt[5] * pixelRatio;
    const zoom = safeVpt[0];
    console.log(safeVpt, 'ddddddd111');
    const lastData = {};
    if (
      lastData &&
      lastData.x === x &&
      lastData.y === y &&
      lastData.zoom === zoom &&
      lastData.width === handledWidth &&
      lastData.height === handledHeight
    ) { return; }
    cacheRef.current = {
      x,
      y,
      zoom,
      width: handledWidth,
      height: handledHeight,
    };
    console.log('ddddddd2222');
    // console.log(safeVpt, x, y, zoom, "////");
    // return;
    // let gridLineWidth = zoom * gridSize * pixelRatio;
    // const firstLinePosX = x % gridLineWidth;
    // const firstLinePosY = y % gridLineWidth;
    // let currentLinePosX = firstLinePosX;
    // let currentLinePosY = firstLinePosY;
    // const xLines = [currentLinePosX];
    // const yLines = [currentLinePosY];

    // while (currentLinePosX < handledWidth) {
    //   currentLinePosX = currentLinePosX + gridLineWidth;
    //   xLines.push(currentLinePosX);
    // }

    // while (currentLinePosY < handledHeight) {
    //   currentLinePosY = currentLinePosY + gridLineWidth;
    //   yLines.push(currentLinePosY);
    // }
    // const xLineArr = handleLines(xLines, gridLineWidth, minGridSize);
    // const yLineArr = handleLines(yLines, gridLineWidth, minGridSize);
    // const styledXLines = calcLineStyle(xLineArr, x, minSubSize);
    // const styledYLines = calcLineStyle(yLineArr, y, minSubSize);
    // ctx.fillStyle = "#eef2f8";
    // ctx.fillRect(0, 0, handledWidth, handledHeight);
    // styledXLines.forEach((xLine) => {
    //   ctx.beginPath();
    //   ctx.strokeStyle = xLine.color;
    //   ctx.moveTo(xLine.line, 0);
    //   ctx.lineTo(xLine.line, handledHeight);
    //   ctx.closePath();
    //   ctx.stroke();
    // });
    // styledYLines.forEach((yLine) => {
    //   ctx.beginPath();
    //   ctx.strokeStyle = yLine.color;
    //   ctx.moveTo(0, yLine.line);
    //   ctx.lineTo(handledWidth, yLine.line);
    //   ctx.closePath();
    //   ctx.stroke();
    // });
  }, [
    canvas,
    ctx,
    handledHeight,
    handledWidth,
    pixelRatio,
    gridSize,
    minSubSize,
    minGridSize,
  ]);

  drawRef.current = draw;

  useEffect(() => {
    const canvas = canvasElRef.current;
    const ctx = canvas.getContext('2d');
    setCtx(ctx);
    let lastTime;
    let intervalId;
    const step = now => {
      if (!lastTime) lastTime = now;
      const period = now - lastTime;
      if (period > 0) {
        drawRef.current && drawRef.current();
        lastTime = now;
      }
      intervalId = window.requestAnimationFrame(step);
    };
    intervalId = window.requestAnimationFrame(step);
    return () => {
      cancelAnimationFrame(intervalId);
    };
  }, []);

  return (
    <canvas
      ref={canvasElRef}
      style={{
        position: 'absolute',
        left: 0,
        top: 50,
        zIndex: -1,
        width: '100%',
        height: '100%',
        userSelect: 'none',
        touchAction: 'none',
      }}
      width={handledWidth}
      height={handledHeight}
    />
  );
}

import { Button } from "antd";
import React, { FC, useEffect, useRef, useCallback, useState } from "react";
import { useWindowSize } from "./hooks";
import { v4 as uuidv4 } from "uuid";
import { fabric } from "fabric";
import { router } from "dva";
import { createNote } from "./element/note";
import TeamindGrid from "./grid";
import "./index.less";

const { Link } = router;
Window.teamind = {};

function initCanvas(el, setCanvas) {
  const canvas = new fabric.Canvas(el, {
    perPixelTargetFind: false,
    targetFindTolerance: 10,
    preserveObjectStacking: true,
    selection: true,
    defaultCursor: "default",
    backgroundColor: "#f3fff0",
    uniScaleKey: undefined,
  });
  // canvas.freeDrawingCursor = `url(${setOSSDomain('/meeting/pencil-cursor.svg')}) 0 24, crosshair`
  Window.teamind.canvas = canvas;
  setCanvas(canvas);
}

const FabricBoard = () => {
  const [canvas, setCanvas] = useState(null);
  const windowSize = useWindowSize();
  const canvasEl = useRef(null);
  const [currentZoom, setCurrentZoom] = useState(1);

  useEffect(() => {
    initCanvas(canvasEl.current, setCanvas);
  }, [windowSize]);

  useEffect(() => {
    document.getElementsByTagName("html")[0].style.overflow = "hidden";
    return () => {
      document.getElementsByTagName("html")[0].style.overflow = "auto";
    };
  }, []);

  const setZoom = useCallback(
    (type) => {
      let curZoom = canvas.getZoom()
      if (type == "-") {
        setCurrentZoom(curZoom - 0.25);
        canvas.setZoom(curZoom - 0.25)
      } else {
        setCurrentZoom(curZoom + 0.25);
        canvas.setZoom(curZoom + 0.25)
      }
    },
    [canvas]
  );

  return (
    <div>
      <Button type="primary">
        <Link to="/overview/all">返回</Link>
      </Button>
      FabricBoard
      <br />
      <br />
      <TeamindGrid
        width={windowSize.width}
        height={windowSize.height}
        canvas={canvas}
        pixelRatio={fabric.devicePixelRatio}
      />
      <canvas
        ref={canvasEl}
        id="fabric-canvas"
        width={windowSize.width}
        height={windowSize.height}
      />
      <div className="right_bottom_tool">
        <div onClick={()=>setZoom("-")}>-</div>
        <div>{currentZoom * 100}%</div>
        <div onClick={()=>setZoom("+")}>+</div>
      </div>
    </div>
  );
};

export default FabricBoard;

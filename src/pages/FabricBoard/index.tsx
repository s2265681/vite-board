import { Button } from 'antd';
import React, { FC, useEffect, useRef , useCallback  } from 'react';
import { useWindowSize } from './hooks'
import { initCanvas } from './utils'
import { Window } from './interface'
import { v4 as uuidv4 } from 'uuid'
import { fabric } from 'fabric'
import { router } from "dva";
import { createNote } from './element/note'
const { Link } = router;

const FabricBoard: FC = () => {
  const windowSize:any = useWindowSize()
  const canvasEl = useRef(null)

  useEffect(()=>{
    initCanvas(canvasEl.current)
    for(let i=0;i<100;i++){
      Window.teamind.canvas.add(createNote({left:i*5,top:i*5}))
    }
  },[windowSize])
  console.log(windowSize,'windowSize,,,')
  return (
    <div>
       <Button type="primary">
          <Link to="/overview/all">返回</Link>
      </Button>
      FabricBoard
       <br/>
       <br/>
       <canvas
        ref={canvasEl}
        id="fabric-canvas"
        width={windowSize.width}
        height={windowSize.height}
      />
    </div>
  );
};

export default FabricBoard;

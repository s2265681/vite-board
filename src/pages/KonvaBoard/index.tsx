import { Button } from 'antd';
import React, { FC, useEffect,useRef } from 'react';
import { router } from "dva";
import Konva from 'konva';
// import Konva from 'konva/lib/Core';
// import { Rect } from 'konva/lib/shapes/Rect';
const { Link } = router;

const KonvaBoard: FC = () => {

  const canvasEl = useRef(null)
  useEffect(()=>{
    // var rect1 = new Rect();
    // var shape = new Konva.Rect();
    // canvasEl.current
    // const canvas = new Konva
     initCanvas()
  },[])


  function initCanvas(){
    let stage = new Konva.Stage({
      container: 'konva-canvas',
      width: window.innerWidth,
      height: window.innerHeight,
    })
  
     // add canvas element
     let layer = new Konva.Layer();
   
     // create shape
     var box = new Konva.Rect({
       x: 50,
       y: 50,
       width: 100,
       height: 50,
       fill: '#00D2FF',
       stroke: 'black',
       strokeWidth: 4,
       draggable: true,
     });

     layer.add(box);

     stage.add(layer);

     console.log(stage,'stage')
    
  // add cursor styling
  // box.on('mouseover', function () {
  //   document.body.style.cursor = 'pointer';
  // });
  // box.on('mouseout', function () {
  //   document.body.style.cursor = 'default';
  // });
    }

    

  return (
    <div>
       <Button type="primary">
          <Link to="/overview/all">返回</Link>
      </Button>
       KonvaBoard
       <br/>
       <br/>
       <canvas
        style={{ border: "1px solid #f00"}}
        ref={canvasEl}
        id="konva-canvas"
        width="1000"
        height="1000"
      />
    </div>
  );
};

export default KonvaBoard;

import { Button } from "antd";
import React, { FC, useEffect, useRef } from "react";
import {
  Stage,
  Layer,
  Star,
  Text,
  Rect,
  Circle,
  Line,
  Group,
} from "react-konva";

function generateShapes() {
  return (
    <Stage width={window.innerWidth} height={window.innerHeight}>
      {/* <Transformer> */}
      <Layer>
        {/* <Transformer> */}
        <Text text="Try to drag a star" />
        <Group
          draggable={true}
          width={window.innerWidth}
          height={window.innerHeight}
        >
          {new Array(100).fill("").map((key, index) => (
            <Rect
              x={20 * index * 0.5}
              y={50 * index * 0.1}
              width={150}
              height={150}
              fill="red"
              name="rect"
              // draggable={true}
              shadowBlur={10}
            />
          ))}
        </Group>
      </Layer>
      {/* </Transformer> */}
    </Stage>
  );
}

export default generateShapes;

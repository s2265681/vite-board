


import React,{useRef} from 'react'

export default function TeamindGrid({width,height,canvas,pixelRatio}) {
    const canvasElRef = useRef()
    const handledWidth = width * pixelRatio
    const handledHeight = height * pixelRatio
    return (
       <canvas
      ref={canvasElRef}
      style={{
        position: 'absolute',
        left: 0,
        top: 0,
        zIndex: -1,
        width: '100%',
        height: '100%',
        userSelect: 'none',
        touchAction: 'none',
      }}
      width={handledWidth}
      height={handledHeight}
    />
    )
}

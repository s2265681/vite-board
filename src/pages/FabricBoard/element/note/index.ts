
import {fabric} from 'fabric'

export const createNote = ({left,top}:{left:number, top:number}) => {
    let color = '#FFE258'
    let scale = 1;
    const text = new fabric.Textbox('好好学习', {
      textAlign: 'center',
      width: 126,
      height: 126,
      splitByGrapheme: true,
      fontFamily: 'Noto Sans SC',
      fill: '#ff0'
    })
    const rect = new fabric.Rect({
      width: 150,
      height: 150,
      fill: color || '#FFE258',
      rx: 4,
      ry: 4,
      shadow: new fabric.Shadow({
        offsetY: 10,
        blur: 10,
        color: 'rgba(0,0,0,0.3)'
      }),
    })
    const noteGroup = new fabric.Group([rect, text], {
      width: 150,
      height: 150,
      scaleX: scale,
      scaleY: scale,
      top: left||300,
      left: top || 300,
    })
    return noteGroup
  }

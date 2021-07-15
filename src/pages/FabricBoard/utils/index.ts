

import { fabric } from 'fabric'
import { Window } from '../interface'

const setOSSDomain = (url: string) => `https://teamind-static-oss.teamind.co/${url}`

export function initCanvas(el: any) {
    const canvas = new fabric.Canvas(el, {
        perPixelTargetFind: false,
        targetFindTolerance: 10,
        preserveObjectStacking: true,
        selection: true,
        defaultCursor: "default",
        backgroundColor: "#f3fff0",
        uniScaleKey: undefined,
    })
    canvas.freeDrawingCursor = `url(${setOSSDomain('/meeting/pencil-cursor.svg')}) 0 24, crosshair`
    Window.teamind.canvas = canvas
}
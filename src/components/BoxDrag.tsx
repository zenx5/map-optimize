import { useState, DragEvent } from "react"

interface BoxDragProps{
    elements:number[][]
    filter?: boolean
    onDragEnd?:({x,y}:{ x:number, y:number }, items:number[][])=>Promise<number[]>
    onDrag?:({x,y}:{ x:number, y:number }, items:number[][])=>Promise<number[]>
}


export default function BoxDrag({ elements, filter, onDragEnd, onDrag }:BoxDragProps ) {
    const [position, setPosition] = useState({ x: -5, y: 0 })
    const [dragging, setDragging] = useState(false)
    const [startPos, setStartPos] = useState({ x: 0, y: 0 })

    const handlerDragStart = (event:DragEvent<HTMLDivElement>) => {
        setDragging(true)
        setStartPos({ x: event.clientX, y: event.clientY })
        const img = new Image();
        img.src = "data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=";
        event?.dataTransfer?.setDragImage(img, 0, 0);
    }


    const handlerDrag = (event:DragEvent<HTMLDivElement>) => {
        if( !dragging ) return
        if(event.clientX===0 || event.clientY===0) return
        const deltaX = event.clientX - startPos.x
        const deltaY = event.clientY - startPos.y
        setPosition({
            x: position.x + deltaX / 10,
            y: position.y + deltaY / 10
        })
        onDrag && onDrag({ x: position.x + deltaX / 10, y: position.y + deltaY / 10 }, elements)
        setStartPos({ x: event.clientX, y: event.clientY })
    }

    const handlerDragEnd = async () => {
        if( onDragEnd ){
            const [x,y] = await onDragEnd(position, elements)
            setPosition({ x, y })
        }
        setDragging(false)
    }

    const handlerFilter = ([px,py]:number[]) => {
        const x = px + position.x
        const y = py + position.y
        if(!filter) return true
        if(x>0 && x<20 && y>0 && y<20) return true
        return false
    }

    return <div
            className="w-[31rem] h-[31rem] relative"
            style={{ left:`${position.x}rem`, top:`${position.y}rem`}}
            onDragStart={handlerDragStart}
            onDragEnd={handlerDragEnd}
            onDrag={handlerDrag}
            draggable
        >
            {elements.filter(handlerFilter).map(([x, y], i) => <div key={i} className="absolute" style={{ left: `${x}rem`, top: `${y}rem` }}>
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            </div>)}
        </div>
}
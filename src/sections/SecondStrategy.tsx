import { useEffect, useState } from "react";
import BoxDrag from "../components/BoxDrag";
import Title from "../components/Title";
import { getPoints } from "../services/fetchPoints";

export default function SecondtStrategy() {
    const [elements, setElements] = useState<number[][]>([])

    useEffect(()=>{
        (async()=>{
            const { data } = await getPoints(500) as { data:number[][] }
            setElements(data)
        })();
    },[])

    const handlerDragEnd = async ({ x, y }:{ x:number, y:number }, items:number[][]) => {
        setElements([])
        await getPoints(1000) as { data:number[][] }
        setElements(items.map( item => [item[0]+x+5, item[1]+y] ))
        return [-5, 1]
    }

    return <section className="w-screen h-screen bg-blue-400">
        <Title
            title="Ooootra Vez"
            description="La segunda estrategia usada volver a dibujar los elementos una vez nos movemos en el mapa" />
        <div className="flex justify-center items-center py-10">
            <div className="border border-black bg-white w-80 h-80 cursor-pointer">
                <BoxDrag elements={elements} onDragEnd={handlerDragEnd} />
            </div>
        </div>
        <p className="text-center text-lg mt-40 max-w-xl mx-auto" >Esto acentua aun más el problema que ocurria con la primera estrategia cuando se tienen muchos elementos, y aun con pocos elementos puede notarse el problema. Además de ofrecer una experiencia de usuario desagradable</p>
    </section>
}
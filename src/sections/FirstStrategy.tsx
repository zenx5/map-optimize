import { useEffect, useState } from "react";
import BoxDrag from "../components/BoxDrag";
import Title from "../components/Title";
import { getPoints } from "../services/fetchPoints";

export default function FirstStrategy() {
    const [elements, setElements] = useState<number[][]>([])

    useEffect(()=>{
        (async()=>{
            const { data } = await getPoints(1000) as { data:number[][] }
            setElements(data)
        })();
    },[])

    return <section className="w-screen h-screen bg-blue-400">
        <Title
            title="Vamos con Todo"
            description="La primera estrategia usada es lanzar dentro del componente todos los elementos 'sin miedo al exito'." />
        <div className="flex justify-center items-center py-10">
            <div className="border border-black bg-white w-80 h-80 cursor-pointer">
                <BoxDrag elements={elements} />
            </div>
        </div>
        <p className="text-center text-lg mt-40 max-w-xl mx-auto" >Esto no resulta en ningún problema cuando tenemos pocos elementos que mostrar y pocos detalles de los cuales hacer render en nuestro mapa, pero puede ser un gran problema cuando nuestro mapa maneja muchos detalles y se trata de muchos elementos.</p>
    </section>
}
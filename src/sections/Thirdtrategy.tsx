import { useEffect, useState } from "react";
import BoxDrag from "../components/BoxDrag";
import Title from "../components/Title";
import { getPoints } from "../services/fetchPoints";

export default function Thirdtrategy() {
    const [elements, setElements] = useState<number[][]>([])

    useEffect(()=>{
        (async()=>{
            const { data } = await getPoints(1000) as { data:number[][] }
            setElements(data)
        })();
    },[])


    return <section className="w-screen h-screen bg-blue-400 pb-20">
        <Title
            title="Vamos por partes"
            description="La tercera estrategia es hacer un fetch de los datos y solo mostrar aquellos que vamos necesitando" />
        <div className="flex justify-center items-center py-10">
            <div className="border border-black bg-white w-80 h-80 cursor-pointer">
                <BoxDrag elements={elements} filter />
            </div>
        </div>
        <p className="text-center text-lg mt-40 max-w-xl mx-auto" >Esto estrategia te permite renderizar una menor cantidad de elementos aun cuando el total sea inmenso.</p>
    </section>
}
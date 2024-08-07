import { pointsCoordinates } from "../tools/constants"

export const getPoints = async (timing:number) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({ data: pointsCoordinates })
        }, timing)
    })

}
import { atom, useAtom } from 'jotai'
import { atomWithImmer } from 'jotai-immer'
import { atomEffect } from 'jotai-effect'
import { io } from 'socket.io-client'
import { z } from 'zod'
import { useEffect } from 'react'
import {createStore} from 'zustand/vanilla'
import {immer} from 'zustand/middleware/immer'
import { atomWithStore } from 'jotai-zustand'
const planeDtoSchema = z.object({
    id:z.number(),
    lng: z.number(),
    lat: z.number(),
})

type planeDto = z.infer<typeof planeDtoSchema>
export type Plane = {
    id:number,
    lat: number,
    lng: number,
}

function fromDto(dto: planeDto): Plane {
    return {
        id: dto.id,
        lat: dto.lat,
        lng: dto.lng,
    }
}

type State = {
    value: Plane[]
}
type Action = {
    new:(data: Plane) => void
}

const planesStore = createStore<State & Action>()(
    immer((set) => ({
        value: [],
        new(data) {
            set((state) => {state.value.push(data)})
        },
    }))
)

const planesAtom = atomWithImmer<Plane[]>([])
// const planesAtom = atomWithStore(planesStore)
// const planesWsEffect = atomEffect((_get, set) => {
//     const socket = io("ws://localhost:3000")
//     socket.on('plane', (data: unknown) => {
//         const { data: dto, success } = planeDtoSchema.safeParse(data)
//         if (success) {
//             const newPlane = fromDto(dto)
//             set(planesAtom, (state) =>
//                 {state.push(newPlane)}
//             )
//         }

//     })
//     return () => {
//         socket.disconnect()
//     }
// })


const planesWsEffect = atomEffect((get, set) => {
    console.log('connect')
    const socket = io("ws://localhost:3001")
    socket.on('plane', (data: unknown) => {
        const { data: dto, success } = planeDtoSchema.safeParse(data)
        if (success) {
            const newPlane = fromDto(dto)
            // get(planesAtom).new(newPlane)            
            set(planesAtom, (state) =>
                {state.push(newPlane)}
            )
        }

    })
    return () => {
        console.log('disconnect')
        socket.disconnect()
    }
})


export const usePlaneWs = () => {
    const planes = useAtom(planesAtom)
    useAtom(planesWsEffect)


    // useEffect(() => {
    //     // console.log(planes)
    //     return () => {
    //         console.log('unmounted')
    //     }
    // }, [planes])
    return planes


}
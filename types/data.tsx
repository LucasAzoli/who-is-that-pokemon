import { Pokemon } from "./pokemon"

export interface Data {
    count: number
    next: string
    previous: any
    results: Pokemon[]
}
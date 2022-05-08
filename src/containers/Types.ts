export type Category = {
    title: string
    id: number
}

export type Word = {
    title: string
    translate: string
    category: number
    img?: string
    audio?: string
}
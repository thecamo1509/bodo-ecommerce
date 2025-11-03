export type CommonSliderItem = {
    title: string
    image: string
    isActive: boolean
}

export type CommonSliderProps = {
    items: CommonSliderItem[]
    intervalMs?: number
    pauseOnHover?: boolean
    baseHost?: string
}
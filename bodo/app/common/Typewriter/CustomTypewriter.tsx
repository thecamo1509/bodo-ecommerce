"use client"

import Typewriter from 'typewriter-effect'
import { CustomTypewriterProps } from './CustomTypewriter.type'


export const CustomTypewriter = (props: CustomTypewriterProps) => {
    const { strings, autoStart, loop, className } = props

    return (
        <div className={className}>
            <Typewriter
                options={{
                    strings: strings,
                    autoStart: autoStart,
                    loop: loop,
                    cursorClassName: 'text-secondary',
                    deleteSpeed: 100,
                    delay:70,
                }}
            />
        </div>
    )
}
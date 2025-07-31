import React, { useRef } from 'react'
import css from './css.module.css'
import * as motion from 'motion/react-client'
import { useAnimationFrame, useMotionValue, useTransform } from 'motion/react'

function Loading() {
    const radius = 20
    const angle = useMotionValue(0)
    const ref = useRef(null)

    useAnimationFrame((t) => {
        // t is in milliseconds, turn it into radians
        angle.set(t / 180) // tweak speed by changing denominator
    })
    const boxes = Array(3).fill(null).map((_, i) => {
        const localAngle = useTransform(angle, (a) => a + (i * (Math.PI * 2 / 3)))
        const x = useTransform(localAngle, (a) => radius * Math.cos(a))
        const y = useTransform(localAngle, (a) => radius * Math.sin(a))
        return (<motion.div className={css.box} key={i}
            initial={{ opacity: 0 }}
            animate={{
                opacity: 1
            }}
            style={{ x, y, }}
            ref={ref}
            transition={{ opacity: { duration: 1 }, delay: i * 0.2 }}
            exit={{ opacity: 0 }} />)
    })
    return (
        <div className={css.container}>
            {boxes}
        </div>
    )
}

export default Loading
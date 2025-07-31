import React from 'react'
import * as motion from 'motion/react-client'
import css from './css.module.css'

interface props {
    theme: 'dark' | 'light';
    setTheme: React.Dispatch<React.SetStateAction<"dark" | "light">>;
}

function Toggle(props: props) {
    return (
        <div className={css.container}>
            <div className={css.box} onClick={() => props.setTheme(prev => prev === 'light' ? 'dark' : 'light')}>
                <motion.div
                    animate={{
                        width: ['2rem', '3.5rem', '2rem'],
                        borderRadius: [100, 10, 100],
                        x: props.theme === 'dark' ? 0 : '1.5rem'
                    }}
                    className={css.switch}
                />
            </div>
            <span style={{ color: props.theme === 'dark' ? 'white' : 'rgb(100,100,100)' }}>{props.theme === 'dark' ? 'Dark' : 'Light'}</span>
        </div>
    )
}

export default Toggle
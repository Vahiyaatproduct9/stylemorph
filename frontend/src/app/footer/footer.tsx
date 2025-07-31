import React, { useState } from 'react'
import css from './css.module.css'
import Feedback from '../feedback/feedback'
import { AnimatePresence } from 'motion/react'

interface props {
    theme: string
}
function Footer(props: props) {
    const [feedbackShown, setFeedbackShown] = useState<boolean>(false)
    const dark = props.theme === 'dark' ? true : false
    return (
        <div style={{
            background: !dark ? '#3674B5' : '#9ECAD6',
            color: !dark ? '#FADA7A' : '#FFEAEA'
        }} className={css.container}>
            Hi! I'm Kishor, a dev in progress.
            <br />
            A feedback would be appreciated :{')'}
            <br />
            <button style={{
                background: dark ? '#3674B5' : '#9ECAD6',
                color: dark ? '#F5F0CD' : '#FFEAEA'
            }} className={css.feedback} onClick={() => setFeedbackShown(true)}>Give Feedback</button>
            <AnimatePresence>
                {feedbackShown && <Feedback feedbackShown={feedbackShown} setFeedbackShown={setFeedbackShown} />}
            </AnimatePresence>
        </div>
    )
}

export default Footer
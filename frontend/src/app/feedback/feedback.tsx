import React, { useState } from 'react'
import css from './css.module.css'
import sendFeedback from '@/api/feeedback'
import * as motion from 'motion/react-client'
import { AnimatePresence } from 'motion/react'

interface props {
    setFeedbackShown: React.Dispatch<React.SetStateAction<boolean>>
    feedbackShown: boolean
}
function Feedback(props: props) {
    const [sent, setSent] = useState<boolean | null | 'sending'>(null)
    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        setSent('sending')
        e.preventDefault()
        const formData = new FormData(e.currentTarget)
        const name = formData.get('name') as string | null
        const content = formData.get('content') as string
        const res = await sendFeedback(name, content)
        setSent(res)
    }
    return (
        <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => props.setFeedbackShown(false)} className={css.container}>
            <AnimatePresence>
                {props.feedbackShown && (<motion.div
                    initial={{ y: 400 }}
                    animate={{ y: 0 }}
                    exit={{ y: 400 }}
                    transition={{ duration: 0.4, ease: 'easeInOut', }}
                    className={css.boxContainer} onClick={(e) => e.stopPropagation()}>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor='name'>Name (optional):</label>
                        <input type='text' id='name' name='name' placeholder='Modi' />
                        <label htmlFor='content'>Feedback: </label>
                        <textarea id='content' name='content' placeholder='Advice, Criticism, Appreciation goes here ->' required />
                        <button
                            style={sent !== null ? { background: sent === 'sending' ? 'grey' : (sent ? 'green' : 'red') } : {}}
                            disabled={sent !== null}>
                            {sent === null ? 'Send' : (sent === 'sending' ? 'Sending...' : (sent ? 'Sent! :)' : 'Couldn\'t Send. Try Again?'))}
                        </button>
                    </form>
                </motion.div>)}
            </AnimatePresence>
        </motion.section>
    )
}

export default Feedback
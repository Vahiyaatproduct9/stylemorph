import React, { useState } from 'react'
import css from './css.module.css'
import checkConnection from '@/api/connection'
import send from '@/api/send'
import Loading from '../loading/loading'
import Footer from '../footer/footer'
import { AnimatePresence } from 'motion/react'
import * as motion from 'motion/react-client'

interface props {
    theme: string
}

function Main(props: props) {
    const [file, setFile] = useState<File | null>(null)
    const [connection, setConnection] = useState<boolean | null | 'connecting'>(null)
    const [loading, setLoading] = useState<boolean | null>(null)
    const dark = props.theme === 'dark' ? true : false
    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        setLoading(true)
        e.preventDefault()
        const formData = new FormData(e.currentTarget)
        const object = formData.get('object')
        const res = await send(file, object as string)
        // const resImgURL = URL.createObjectURL(res)
        setFile(res as File)
        setLoading(false)
    }
    async function start() {
        const conn = await checkConnection()
        setConnection(conn)
    }
    return (
        <motion.div
            initial={{ opacity: 0, }}
            animate={{ opacity: 1, }}
            exit={{ opacity: 0 }}
            className={css.main} style={{
                background: dark ? '#3674B5' : '#9ECAD6',
            }}>
            <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.4 }}
                className={css.container}>
                <div className={css.header}>
                    <span style={props.theme === 'dark' ? { color: '#EEEEEE' } : {}}>Welcome to</span>
                    <h1>
                        <span style={{ color: dark ? '#FADA7A' : '#FFEAEA' }} className={css.Style}>Style</span>
                        <span style={{ color: dark ? '#F5F0CD' : '#FFEAEA' }} className={css.Morph}>Morph</span>
                    </h1>
                </div>
                <div style={{ color: dark ? '#F5F0CD' : '#748DAE' }} className={css.body}>
                    <p>This is <b>StyleMorph</b>. An AI designed to transfer 'Style' from one object to another. <br />
                        Try Choosing an Image and type 'Mug' :D
                    </p>
                </div>
                <div className={css.foot}>
                    <AnimatePresence>
                        {connection === true ? (
                            <motion.div
                                key='div1'
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1, transition: { duration: 0.4 } }}
                                exit={{ opacity: 0 }}
                                className={css.inputGroup}>
                                {file ? (<div className={css.imageDiv}>
                                    <img src={URL.createObjectURL(file)} />
                                </div>) :
                                    (<div className={css.chooseImageDiv}>
                                        <input id='fileInput' multiple={false} type='file' accept='image/*' hidden onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)} />
                                        <button
                                            className={css.chooseButton}
                                            style={{
                                                background: dark ? '#578FCA' : '#748DAE',
                                                color: dark ? '#F5F0CD' : '#FFEAEA',
                                            }}
                                            onClick={() => document.getElementById('fileInput')?.click()}
                                        >Choose</button>
                                    </div>)}
                                {loading === null ? (<form onSubmit={handleSubmit}>
                                    <input name='object' type='text' placeholder='What we morphing to?' required />
                                    <button style={{
                                        background: dark ? '#578FCA' : '#748DAE',
                                        color: dark ? '#F5F0CD' : '#FFEAEA',
                                        borderColor: dark ? 'hsl(211, 52%, 30%)' : 'hsl(214, 26%, 30%)'
                                    }}>Morph</button>
                                </form>) : (
                                    loading === true ? <Loading /> : <div className={css.OnceMoreContainer}>
                                        <button
                                            style={{
                                                background: dark ? '#578FCA' : '#748DAE',
                                                color: dark ? '#F5F0CD' : '#FFEAEA',
                                            }}
                                            className={css.OnceMore} onClick={() => { setFile(null); setLoading(null); }}>Once More</button></div>
                                )}

                            </motion.div>
                        ) : (
                            <motion.button
                                key='div2'
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1, transition: { duration: 0.4 } }}
                                exit={{ opacity: 0 }}
                                style={{
                                    background: dark ? '#578FCA' : '#748DAE',
                                    color: dark ? '#F5F0CD' : '#FFEAEA',
                                }}
                                className={css.StartButton} onClick={() => { start(); setConnection('connecting') }}>
                                <img src={'./button_icon.svg'} />
                                {connection === null ? 'Start' : (connection === 'connecting' ? 'Connecting...' : (connection === false && 'Try Again :('))}</motion.button>
                        )}
                    </AnimatePresence>
                </div>
                {connection === true && <Footer theme={props.theme} />}
            </motion.section>
        </motion.div>
    )
}

export default Main
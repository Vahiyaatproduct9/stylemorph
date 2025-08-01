'use client'
import React from 'react'
import Main from '@/app/main/main'
import { useState, useEffect } from 'react'
import Toggle from './themeToggle/toggle'
// import Footer from './footer/footer'
function Page() {
  const [theme, setTheme] = useState<'dark' | 'light'>('light')
  useEffect(() => {
    const dark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setTheme(dark ? 'dark' : 'light')
  }, [])
  return (
    <>
      <Main theme={theme} />
      <Toggle theme={theme} setTheme={setTheme} />
      {/* <Footer theme={theme} /> */}
    </>
  )
}

export default Page
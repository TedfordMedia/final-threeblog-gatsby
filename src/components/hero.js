import React from "react"
import { Suspense, lazy } from 'preact/compat'
import heroStyles from "./styles/hero.module.sass"
console.log('heroStyles'+JSON.stringify(heroStyles))
const Scene = lazy(() => import("./scene"))

const Hero = props => {
  const isSSR = typeof window === "undefined"

  return (
    <section className={heroStyles.hero}>
      <div className={heroStyles.content}>
        {!isSSR && (
          <Suspense fallback={<div className={heroStyles.scenePlaceholder}/>}>
            <Scene />
          </Suspense>
        )}
        <span />

        <h1 style="user-select:none">{props.title}</h1>
        <p style="user-select:none">{props.description}</p>
      </div>
    </section>
  )
}

export default Hero


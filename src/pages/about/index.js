import React from "react"
import { graphql } from "gatsby"
import Layout from "../../components/layout"
import SEO from "../../components/SEO"
import Img from "gatsby-image"
import aboutStyles from "./about.module.sass"

import GitHubIcon from "../../../static/assets/svg/github.svg" 
import EmailIcon from "../../../static/assets/svg/email.svg"

export default ({ data }) => {
  return (
    <div>
      <SEO title="About" />
      <Layout>
        <h1>About <span className="brand-diamond">◆</span></h1>
        <div className={aboutStyles.grid}>
          <Img className={aboutStyles.image} fluid={data.fileName.childImageSharp.fluid} alt="Picture of Ted" />
          <div className={aboutStyles.rectangle}></div>
          <div className={aboutStyles.lineTop}></div>
          <div className={aboutStyles.textWrapper}>
            <div className={aboutStyles.text}>
              <h2>Hi, I'm Ted of TedfordMedia</h2>
              <p>Coming soon! </p> 
            </div>
          </div>
          <div className={aboutStyles.lineBottom}></div>

          <div className={aboutStyles.socialIcons}>
            <a href="https://github.com/tedfordmedia" target="_blank" rel="noopener noreferrer" aria-label="GitHub link"><GitHubIcon /></a> 
            <a href="mailto:ted@tedfordmedia.com" aria-label="Email Link"><EmailIcon /></a>
          </div>
        </div>
      </Layout>
    </div>
  )
}

export const query = graphql`
  query {
    fileName: file(relativePath: { eq: "about/profile-pic.png" }) {
      childImageSharp {
        fluid(maxWidth: 800) {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`

import React from "react"
import "./styles/footer.module.sass"

const Footer = props => {
  return(
    <footer>
        <span>This website is made with <a href="https://gatsbyjs.com" target="_blank" rel="noopener noreferrer">Gatsby JS</a></span> 
        &nbsp;—&nbsp;
        <span>
          <a href="https://github.com/tedfordmedia" target="_blank" rel="noopener noreferrer">github</a>&nbsp;·&nbsp; 
          <a href="mailto:ted@tedfordmedia.com" target="_blank" rel="noopener noreferrer">email</a>&nbsp;·&nbsp; 
        </span>
    </footer>
  )
}

export default Footer

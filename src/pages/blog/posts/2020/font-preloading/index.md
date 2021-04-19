---
title: Gatsby Font PreLoading
date: "2021-04-17T00:40:00.169Z"
videoSourceURL: https://www.youtube.com/embed/dQw4w9WgXcQ
videoTitle: "Gatsby is Never Gonna Give You Up"
description: React often has a font jump on itiial page load so... npm install gatsby-plugin-preload-fonts 
---

When creating this site, the Gatsby page load had a slight font jump when the page first loads.  

In order to remove the font jump, there is a tool :

[https://www.gatsbyjs.com/plugins/gatsby-plugin-preload-fonts](https://www.gatsbyjs.com/plugins/gatsby-plugin-preload-fonts)

which is installed like so:

```
npm install gatsby-plugin-preload-fonts 
```


Add the included script to your project’s *_scripts_* in package.json.  

_Because_: before building the application, you will need to _generate a font asset map_ using the included gatsby-preload-fonts script.
```
{
  "scripts": {
    "preload-fonts": "gatsby-preload-fonts"
  }
}
```  

## How to use

In your *gatsby-config.js*:

```
module.exports = {
  plugins: [`gatsby-plugin-preload-fonts`],
}
```
  

Then:

```bash 
npm run preload-fonts
```

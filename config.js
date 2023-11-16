/* global module */

const prefixPath = '/'
const prefixSource = '/'

// куда положить билд
let paths = {
  "js": `${prefixPath}js/`,
  "css": `${prefixPath}css/`,
  "img": `${prefixPath}img/`,
  "fonts": `${prefixPath}fonts/`,
  "pages": "/",
  "assets": `${prefixPath}assets/`,
  get icon() {
    return `${this.img}svgSprite.svg#`;
  }
}

// пути в разметке и стилях
let sources = {
  "js": `${prefixSource}js/`,
  "css": `${prefixSource}css/`,
  "img": `${prefixSource}img/`,
  "fonts": `${prefixSource}fonts/`,
  "pages": "/",
  "assets": `${prefixSource}assets/`,
  get icon() {
    return `${this.img}svgSprite.svg#`;
  }
}

let addAdditions = {
  "src/img/**/*.*": paths.img,
  "src/favicon/*.*": paths.img + '/favicon',
  // "node_modules/somePackage/images/*.{png,svg,jpg,jpeg}": "img/",
};

let config = {
  "notGetBlocks": [],
  "ignoredBlocks": [
    "no-js",
  ],
  "alwaysAddBlocks": [],
  "addStyleBefore": [
    "sanitize.css/sanitize.css",
    "sanitize.css/forms.css",
    "sanitize.css/assets.css",
    "sanitize.css/typography.css",
    "sanitize.css/reduce-motion.css",
    "src/scss/variables.scss",
    "src/scss/reboot.scss",
    // "src/scss/mixins.scss",
    // "src/scss/typography.scss",
    // "src/scss/vendor.scss",
    "src/scss/fonts.scss",
    // "src/scss/animations.scss"
    // "somePackage/dist/somePackage.css", // для "node_modules/somePackage/dist/somePackage.css",
  ],
  "addStyleAfter": [],
  "addJsBefore": [
    // "somePackage/dist/somePackage.js", // для "node_modules/somePackage/dist/somePackage.js",
  ],
  "addJsAfter": [
    "./script.js",
  ],
  "addAdditions": addAdditions,
  "dir": {
    "src": "src/",
    "data": "src/data/",
    "blocks": "src/blocks/",
    "svgAsBg": "src/symbols/svgAsBg.xml",
    "build": "build",
  },
  "sources": sources,
  "paths": paths
};

module.exports = config;

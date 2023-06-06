import{c as m,_ as A}from"./index-0b6b6c33.js";var j={exports:{}};(function(l,d){(function(i,r){r()})(m,function(){function i(e,n){return typeof n>"u"?n={autoBom:!1}:typeof n!="object"&&(console.warn("Deprecated: Expected third argument to be a object"),n={autoBom:!n}),n.autoBom&&/^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(e.type)?new Blob(["\uFEFF",e],{type:e.type}):e}function r(e,n,p){var t=new XMLHttpRequest;t.open("GET",e),t.responseType="blob",t.onload=function(){u(t.response,n,p)},t.onerror=function(){console.error("could not download file")},t.send()}function c(e){var n=new XMLHttpRequest;n.open("HEAD",e,!1);try{n.send()}catch{}return 200<=n.status&&299>=n.status}function a(e){try{e.dispatchEvent(new MouseEvent("click"))}catch{var n=document.createEvent("MouseEvents");n.initMouseEvent("click",!0,!0,window,0,0,0,80,20,!1,!1,!1,!1,0,null),e.dispatchEvent(n)}}var o=typeof window=="object"&&window.window===window?window:typeof self=="object"&&self.self===self?self:typeof m=="object"&&m.global===m?m:void 0,f=o.navigator&&/Macintosh/.test(navigator.userAgent)&&/AppleWebKit/.test(navigator.userAgent)&&!/Safari/.test(navigator.userAgent),u=o.saveAs||(typeof window!="object"||window!==o?function(){}:"download"in HTMLAnchorElement.prototype&&!f?function(e,n,p){var t=o.URL||o.webkitURL,s=document.createElement("a");n=n||e.name||"download",s.download=n,s.rel="noopener",typeof e=="string"?(s.href=e,s.origin===location.origin?a(s):c(s.href)?r(e,n,p):a(s,s.target="_blank")):(s.href=t.createObjectURL(e),setTimeout(function(){t.revokeObjectURL(s.href)},4e4),setTimeout(function(){a(s)},0))}:"msSaveOrOpenBlob"in navigator?function(e,n,p){if(n=n||e.name||"download",typeof e!="string")navigator.msSaveOrOpenBlob(i(e,p),n);else if(c(e))r(e,n,p);else{var t=document.createElement("a");t.href=e,t.target="_blank",setTimeout(function(){a(t)})}}:function(e,n,p,t){if(t=t||open("","_blank"),t&&(t.document.title=t.document.body.innerText="downloading..."),typeof e=="string")return r(e,n,p);var s=e.type==="application/octet-stream",b=/constructor/i.test(o.HTMLElement)||o.safari,g=/CriOS\/[\d]+/.test(navigator.userAgent);if((g||s&&b||f)&&typeof FileReader<"u"){var w=new FileReader;w.onloadend=function(){var v=w.result;v=g?v:v.replace(/^data:[^;]*;/,"data:attachment/file;"),t?t.location.href=v:location=v,t=null},w.readAsDataURL(e)}else{var y=o.URL||o.webkitURL,h=y.createObjectURL(e);t?t.location=h:location.href=h,t=null,setTimeout(function(){y.revokeObjectURL(h)},4e4)}});o.saveAs=u.saveAs=u,l.exports=u})})(j);var R=j.exports;const O=`<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" href="/favicon.ico" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Vant App</title>
  </head>
  <body>
    <div id="app"></div>
    <script type="module" src="/src/main.js"><\/script>
  </body>
</html>
`,S=`import { createApp } from 'vue'
import App from './App.vue'

createApp(App).mount('#app')
`,L=`{
  "name": "vant-starter",
  "version": "0.0.0",
  "scripts": {
    "build": "vite build",
    "dev": "vite",
    "serve": "vite preview"
  },
  "dependencies": {
    "@vant/popperjs": "1.3.0",
    "@vant/touch-emulator": "1.4.0",
    "@vant/use": "1.5.1",
    "vant": "4.4.1",
    "vue": "3.3.4"
  },
  "devDependencies": {
    "@vitejs/plugin-vue": "4.2.3",
    "@vue/compiler-sfc": "3.3.4",
    "vite": "4.3.9",
    "vite-plugin-style-import": "2.0.0"
  }
}`,T=`import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { createStyleImportPlugin, VantResolve } from 'vite-plugin-style-import'

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  plugins: [
    vue(),
    createStyleImportPlugin({
      resolves: [VantResolve()]
    })
  ]
})
`,k=`# Vite Vant Starter

This is a project template using [Vite](https://vitejs.dev/). It requires [Node.js](https://nodejs.org) v12+.

To start:

\`\`\`sh
npm install
npm run dev

# if using yarn:
yarn
yarn dev

# if using pnpm:
pnpm install
pnpm dev
\`\`\`
`,E="*";function x(l){return Object.entries(l).reduce((d,[i,r])=>{var a;const c=(a=r.match(/@((?=[\d^~]).+?)((?=\/)|$)/))==null?void 0:a[1];return d[i]=c??E,d},{})}function _(l,d){var c;let i={};try{i=JSON.parse(l)}catch(a){console.error("parse package.json error:",a)}const r=(c=d.getImportMap())==null?void 0:c.imports;if(r){const a=x(r);Object.entries(a).forEach(([o,f])=>{var u;i.dependencies={...i.dependencies,[o]:f!==E?f:((u=i.dependencies)==null?void 0:u[o])??f}})}return JSON.stringify(i,null,2)}async function U(l){if(!confirm("Download project files?"))return;const{default:d}=await A(()=>import("./jszip.min-449801f9.js").then(o=>o.j),["./jszip.min-449801f9.js","./index-0b6b6c33.js","./index-ad7d5f0c.css"],import.meta.url),i=new d;i.file("index.html",O),i.file("package.json",_(L,l)),i.file("vite.config.js",T),i.file("README.md",k);const r=i.folder("src");r.file("main.js",S);const c=l.getFiles();for(const o in c)r.file(o,c[o]);const a=await i.generateAsync({type:"blob"});R.saveAs(a,"vant-project.zip")}export{U as downloadProject};

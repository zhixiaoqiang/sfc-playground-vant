import{_ as A}from"./index-c5809973.js";var m=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{},y={},O={get exports(){return y},set exports(c){y=c}};(function(c,d){(function(i,r){r()})(m,function(){function i(e,n){return typeof n>"u"?n={autoBom:!1}:typeof n!="object"&&(console.warn("Deprecated: Expected third argument to be a object"),n={autoBom:!n}),n.autoBom&&/^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(e.type)?new Blob(["\uFEFF",e],{type:e.type}):e}function r(e,n,p){var t=new XMLHttpRequest;t.open("GET",e),t.responseType="blob",t.onload=function(){u(t.response,n,p)},t.onerror=function(){console.error("could not download file")},t.send()}function l(e){var n=new XMLHttpRequest;n.open("HEAD",e,!1);try{n.send()}catch{}return 200<=n.status&&299>=n.status}function a(e){try{e.dispatchEvent(new MouseEvent("click"))}catch{var n=document.createEvent("MouseEvents");n.initMouseEvent("click",!0,!0,window,0,0,0,80,20,!1,!1,!1,!1,0,null),e.dispatchEvent(n)}}var o=typeof window=="object"&&window.window===window?window:typeof self=="object"&&self.self===self?self:typeof m=="object"&&m.global===m?m:void 0,f=o.navigator&&/Macintosh/.test(navigator.userAgent)&&/AppleWebKit/.test(navigator.userAgent)&&!/Safari/.test(navigator.userAgent),u=o.saveAs||(typeof window!="object"||window!==o?function(){}:"download"in HTMLAnchorElement.prototype&&!f?function(e,n,p){var t=o.URL||o.webkitURL,s=document.createElement("a");n=n||e.name||"download",s.download=n,s.rel="noopener",typeof e=="string"?(s.href=e,s.origin===location.origin?a(s):l(s.href)?r(e,n,p):a(s,s.target="_blank")):(s.href=t.createObjectURL(e),setTimeout(function(){t.revokeObjectURL(s.href)},4e4),setTimeout(function(){a(s)},0))}:"msSaveOrOpenBlob"in navigator?function(e,n,p){if(n=n||e.name||"download",typeof e!="string")navigator.msSaveOrOpenBlob(i(e,p),n);else if(l(e))r(e,n,p);else{var t=document.createElement("a");t.href=e,t.target="_blank",setTimeout(function(){a(t)})}}:function(e,n,p,t){if(t=t||open("","_blank"),t&&(t.document.title=t.document.body.innerText="downloading..."),typeof e=="string")return r(e,n,p);var s=e.type==="application/octet-stream",E=/constructor/i.test(o.HTMLElement)||o.safari,h=/CriOS\/[\d]+/.test(navigator.userAgent);if((h||s&&E||f)&&typeof FileReader<"u"){var w=new FileReader;w.onloadend=function(){var v=w.result;v=h?v:v.replace(/^data:[^;]*;/,"data:attachment/file;"),t?t.location.href=v:location=v,t=null},w.readAsDataURL(e)}else{var j=o.URL||o.webkitURL,g=j.createObjectURL(e);t?t.location=g:location.href=g,t=null,setTimeout(function(){j.revokeObjectURL(g)},4e4)}});o.saveAs=u.saveAs=u,c.exports=u})})(O);const R=`<!DOCTYPE html>
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
`,T=`{
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
    "vant": "4.1.2",
    "vue": "3.2.47"
  },
  "devDependencies": {
    "@vitejs/plugin-vue": "4.1.0",
    "@vue/compiler-sfc": "3.2.47",
    "vite": "4.2.1",
    "vite-plugin-style-import": "2.0.0"
  }
}`,_=`import { defineConfig } from 'vite'
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
`,L=`# Vite Vant Starter

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
`,b="*";function k(c){return Object.entries(c).reduce((d,[i,r])=>{var a;const l=(a=r.match(/@((?=[\d^~]).+?)((?=\/)|$)/))==null?void 0:a[1];return d[i]=l??b,d},{})}function x(c,d){var l;let i={};try{i=JSON.parse(c)}catch(a){console.error("parse package.json error:",a)}const r=(l=d.getImportMap())==null?void 0:l.imports;if(r){const a=k(r);Object.entries(a).forEach(([o,f])=>{var u;i.dependencies={...i.dependencies,[o]:f!==b?f:((u=i.dependencies)==null?void 0:u[o])??f}})}return JSON.stringify(i,null,2)}async function M(c){if(!confirm("Download project files?"))return;const{default:d}=await A(()=>import("./jszip.min-a98146ad.js").then(o=>o.j),[],import.meta.url),i=new d;i.file("index.html",R),i.file("package.json",x(T,c)),i.file("vite.config.js",_),i.file("README.md",L);const r=i.folder("src");r.file("main.js",S);const l=c.getFiles();for(const o in l)r.file(o,l[o]);const a=await i.generateAsync({type:"blob"});y.saveAs(a,"vant-project.zip")}const F=Object.freeze(Object.defineProperty({__proto__:null,downloadProject:M},Symbol.toStringTag,{value:"Module"}));export{m as c,F as d};

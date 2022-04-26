var _=Object.defineProperty,k=Object.defineProperties;var L=Object.getOwnPropertyDescriptors;var j=Object.getOwnPropertySymbols;var S=Object.prototype.hasOwnProperty,x=Object.prototype.propertyIsEnumerable;var b=(i,r,n)=>r in i?_(i,r,{enumerable:!0,configurable:!0,writable:!0,value:n}):i[r]=n,E=(i,r)=>{for(var n in r||(r={}))S.call(r,n)&&b(i,n,r[n]);if(j)for(var n of j(r))x.call(r,n)&&b(i,n,r[n]);return i},A=(i,r)=>k(i,L(r));import{_ as M}from"./index.6d5c8f84.js";var m=typeof globalThis!="undefined"?globalThis:typeof window!="undefined"?window:typeof global!="undefined"?global:typeof self!="undefined"?self:{};function J(i){throw new Error('Could not dynamically require "'+i+'". Please configure the dynamicRequireTargets or/and ignoreDynamicRequires option of @rollup/plugin-commonjs appropriately for this require call to work.')}var R={exports:{}};(function(i,r){(function(n,s){s()})(m,function(){function n(e,t){return typeof t=="undefined"?t={autoBom:!1}:typeof t!="object"&&(console.warn("Deprecated: Expected third argument to be a object"),t={autoBom:!t}),t.autoBom&&/^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(e.type)?new Blob(["\uFEFF",e],{type:e.type}):e}function s(e,t,d){var o=new XMLHttpRequest;o.open("GET",e),o.responseType="blob",o.onload=function(){u(o.response,t,d)},o.onerror=function(){console.error("could not download file")},o.send()}function p(e){var t=new XMLHttpRequest;t.open("HEAD",e,!1);try{t.send()}catch{}return 200<=t.status&&299>=t.status}function c(e){try{e.dispatchEvent(new MouseEvent("click"))}catch{var t=document.createEvent("MouseEvents");t.initMouseEvent("click",!0,!0,window,0,0,0,80,20,!1,!1,!1,!1,0,null),e.dispatchEvent(t)}}var a=typeof window=="object"&&window.window===window?window:typeof self=="object"&&self.self===self?self:typeof m=="object"&&m.global===m?m:void 0,f=a.navigator&&/Macintosh/.test(navigator.userAgent)&&/AppleWebKit/.test(navigator.userAgent)&&!/Safari/.test(navigator.userAgent),u=a.saveAs||(typeof window!="object"||window!==a?function(){}:"download"in HTMLAnchorElement.prototype&&!f?function(e,t,d){var o=a.URL||a.webkitURL,l=document.createElement("a");t=t||e.name||"download",l.download=t,l.rel="noopener",typeof e=="string"?(l.href=e,l.origin===location.origin?c(l):p(l.href)?s(e,t,d):c(l,l.target="_blank")):(l.href=o.createObjectURL(e),setTimeout(function(){o.revokeObjectURL(l.href)},4e4),setTimeout(function(){c(l)},0))}:"msSaveOrOpenBlob"in navigator?function(e,t,d){if(t=t||e.name||"download",typeof e!="string")navigator.msSaveOrOpenBlob(n(e,d),t);else if(p(e))s(e,t,d);else{var o=document.createElement("a");o.href=e,o.target="_blank",setTimeout(function(){c(o)})}}:function(e,t,d,o){if(o=o||open("","_blank"),o&&(o.document.title=o.document.body.innerText="downloading..."),typeof e=="string")return s(e,t,d);var l=e.type==="application/octet-stream",O=/constructor/i.test(a.HTMLElement)||a.safari,g=/CriOS\/[\d]+/.test(navigator.userAgent);if((g||l&&O||f)&&typeof FileReader!="undefined"){var w=new FileReader;w.onloadend=function(){var v=w.result;v=g?v:v.replace(/^data:[^;]*;/,"data:attachment/file;"),o?o.location.href=v:location=v,o=null},w.readAsDataURL(e)}else{var h=a.URL||a.webkitURL,y=h.createObjectURL(e);o?o.location=y:location.href=y,o=null,setTimeout(function(){h.revokeObjectURL(y)},4e4)}});a.saveAs=u.saveAs=u,i.exports=u})})(R);var U=`<!DOCTYPE html>
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
`,D=`import { createApp } from 'vue'
import App from './App.vue'

createApp(App).mount('#app')
`,V=`{
  "name": "vant-starter",
  "version": "0.0.0",
  "scripts": {
    "build": "vite build",
    "dev": "vite",
    "serve": "vite preview"
  },
  "dependencies": {
    "@vant/popperjs": "1.1.0",
    "@vant/touch-emulator": "1.3.2",
    "@vant/use": "1.3.6",
    "vant": "3.4.8",
    "vue": "3.2.33"
  },
  "devDependencies": {
    "@vitejs/plugin-vue": "1.10.2",
    "@vue/compiler-sfc": "3.2.33",
    "vite": "2.9.5",
    "vite-plugin-style-import": "1.4.1"
  }
}`,F=`import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import styleImport, { VantResolve } from 'vite-plugin-style-import'

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  plugins: [
    vue(),
    styleImport({
      resolves: [VantResolve()]
    })
  ]
})
`,P=`# Vite Vant Starter

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
`;const T="*";function q(i){return Object.entries(i).reduce((r,[n,s])=>{var c;const p=(c=s.match(/@((?=[\d^~]).+?)((?=\/)|$)/))==null?void 0:c[1];return r[n]=p!=null?p:T,r},{})}function B(i,r){var p;let n={};try{n=JSON.parse(i)}catch(c){console.error("parse package.json error:",c)}const s=(p=r.getImportMap())==null?void 0:p.imports;if(s){const c=q(s);Object.entries(c).forEach(([a,f])=>{var u,e;n.dependencies=A(E({},n.dependencies),{[a]:f!==T?f:(e=(u=n.dependencies)==null?void 0:u[a])!=null?e:f})})}return JSON.stringify(n,null,2)}async function C(i){if(!confirm("Download project files?"))return;const{default:r}=await M(()=>import("./jszip.min.94458398.js").then(function(a){return a.j}),[]),n=new r;n.file("index.html",U),n.file("package.json",B(V,i)),n.file("vite.config.js",F),n.file("README.md",P);const s=n.folder("src");s.file("main.js",D);const p=i.getFiles();for(const a in p)s.file(a,p[a]);const c=await n.generateAsync({type:"blob"});R.exports.saveAs(c,"vant-project.zip")}var z=Object.freeze(Object.defineProperty({__proto__:null,downloadProject:C},Symbol.toStringTag,{value:"Module"}));export{J as a,m as c,z as d};

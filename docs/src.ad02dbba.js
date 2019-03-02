parcelRequire=function(e,r,n,t){var i="function"==typeof parcelRequire&&parcelRequire,o="function"==typeof require&&require;function u(n,t){if(!r[n]){if(!e[n]){var f="function"==typeof parcelRequire&&parcelRequire;if(!t&&f)return f(n,!0);if(i)return i(n,!0);if(o&&"string"==typeof n)return o(n);var c=new Error("Cannot find module '"+n+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[n][1][r]||r},p.cache={};var l=r[n]=new u.Module(n);e[n][0].call(l.exports,p,l,l.exports,this)}return r[n].exports;function p(e){return u(p.resolve(e))}}u.isParcelRequire=!0,u.Module=function(e){this.id=e,this.bundle=u,this.exports={}},u.modules=e,u.cache=r,u.parent=i,u.register=function(r,n){e[r]=[function(e,r){r.exports=n},{}]};for(var f=0;f<n.length;f++)u(n[f]);if(n.length){var c=u(n[n.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=c:"function"==typeof define&&define.amd?define(function(){return c}):t&&(this[t]=c)}return u}({"Iw//":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.setState=exports.dispatchUpdate=exports.getState=exports.addListener=void 0;const t=[];let e={googleSyncEnabled:!1};const s=()=>e;exports.getState=s;const o=t=>{e={...e,...t},p()};exports.setState=o;const p=()=>{t.forEach(t=>{t(s())})};exports.dispatchUpdate=p;const r=e=>{t.push(e)};exports.addListener=r;
},{}],"r5bP":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.init=exports.connect=void 0;const e="App-Personas",n=()=>new Promise((e,n)=>{gapi.load("client:auth2",()=>{t().then(e)})});exports.init=n;const t=()=>(console.info("👉","init google client"),new Promise((e,n)=>{gapi.client.init({apiKey:"AIzaSyBYItpNT8k2Y2AEHz2E2kI2EqMULh5C4m0",discoveryDocs:["https://www.googleapis.com/discovery/v1/apis/drive/v3/rest"],clientId:"614338309616-st9nui22tf3sa1cm9m1l3nd439n50frg.apps.googleusercontent.com",scope:"https://www.googleapis.com/auth/drive.file"}).then(()=>{gapi.auth2.getAuthInstance().isSignedIn.listen(i),gapi.auth2.getAuthInstance().isSignedIn.get()?(console.info("👉","already logged"),o().then(e)):e()})})),i=e=>{console.info("👉","logged?",gapi.auth2.getAuthInstance().currentUser.get())},o=()=>s().then(c).then(l),s=()=>new Promise((e,n)=>{gapi.client.drive.files.list({q:"name='App-Personas' and trashed=false"}).execute(n=>{0===n.files.length?a().then(e):e(n.files[0].id)})}),a=()=>new Promise((n,t)=>{console.info("👉","creating");const i={name:e,mimeType:"application/vnd.google-apps.folder"};gapi.client.drive.files.create({resource:i}).execute(e=>{console.info("👉","created",e),n(e.id)})}),c=e=>new Promise((n,t)=>{console.info("👉","folderId",e),gapi.client.drive.files.list({q:`name="persons.json" and '${e}' in parents`}).execute(e=>{console.info("👉","find file response",e),0===e.files.length?n(null):n(e.files[0])})}),l=e=>new Promise((n,t)=>{gapi.client.drive.files.get({fileId:e.id,alt:"media"}).execute(e=>{const t=e.result.map(e=>({...e,name:decodeURIComponent(escape(e.name))}));n(t)})}),g=()=>{console.info("👉","connect"),gapi.auth2.getAuthInstance().isSignedIn.get()?(console.info("👉","already logged"),gapi.auth2.getAuthInstance().currentUser.get(),o()):(console.info("👉","signign in..."),gapi.auth2.getAuthInstance().signIn())};exports.connect=g;
},{}],"qfPE":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.setup=exports.libLoaded=void 0;var e=require("./google-drive.js"),t=require("./state.js");const o=()=>{(0,t.addListener)(s),d().addEventListener("click",e.connect)};exports.setup=o;const s=e=>{n(e.googleSyncEnabled)},r=()=>{(0,e.init)().then(e=>{(0,t.setState)({googleSyncEnabled:!0,persons:e})})};exports.libLoaded=r;const n=e=>{e&&d().removeAttribute("disabled")},d=()=>document.querySelector('button[data-ps="googleDriveButton"]');
},{"./google-drive.js":"r5bP","./state.js":"Iw//"}],"xLSG":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.renderPersons=exports.clearPersons=void 0;const e=e=>{const n=document.querySelector(".persons");e.map(t).forEach(e=>n.appendChild(e))};exports.renderPersons=e;const t=e=>{const t=document.createElement("div");return t.classList.add("person"),[n(e.name),r(e.birthday),...a(e.customTexts)].filter(Boolean).forEach(e=>t.appendChild(e)),t},n=e=>{const t=document.createElement("div");return t.innerHTML=e,t},r=e=>{const t=Date.now(),n=new Date(e).getTime(),r=new Date(t-n),o=Math.abs(r.getUTCFullYear()-1970),a=document.createElement("div");return a.innerHTML=`Age: ${o}.<br />Birthday in ${(()=>{const t=new Date(e),n=(new Date).getUTCFullYear(),r=Date.now()-new Date(`${n}-${t.getMonth()+1}-${t.getDate()}`).getTime();let o;if(r<0)o=Math.abs(Math.ceil(r/1e3/60/60/24));else{const e=Date.now()-new Date(`${n+1}-${t.getMonth()+1}-${t.getDate()}`).getTime();o=Math.abs(Math.ceil(e/1e3/60/60/24))}return o})()} days (${e}).`,a},o=e=>{const t=Date.now(),n=new Date(e).getTime(),r=Math.round((t-n)/1e3/60/60/24),o=document.createElement("div"),a=document.createElement("button");return a.innerText="Dnes",a.addEventListener("click",()=>{console.info("👉","resettings")}),o.innerHTML=`Viděli jsme se před: ${r} dny.`,o.appendChild(a),o},a=e=>e?e.map(n):[],s=()=>{document.querySelector(".persons").innerHTML=""};exports.clearPersons=s;
},{}],"H99C":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),Object.defineProperty(exports,"googleLibLoaded",{enumerable:!0,get:function(){return r.libLoaded}}),exports.setup=void 0;var e=require("./state.js"),r=require("./google-model.js"),s=require("./persons-view.js");const o=()=>{(0,r.setup)(),(0,e.addListener)(t)};exports.setup=o;const t=e=>{n(e.persons)},n=e=>{(0,s.clearPersons)(),(0,s.renderPersons)(e)};
},{"./state.js":"Iw//","./google-model.js":"qfPE","./persons-view.js":"xLSG"}]},{},["H99C"], "Index")
//# sourceMappingURL=/personas/src.ad02dbba.map
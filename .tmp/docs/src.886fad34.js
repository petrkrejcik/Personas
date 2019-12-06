parcelRequire = function (e, r, n, t) { var i = "function" == typeof parcelRequire && parcelRequire, o = "function" == typeof require && require; function u(n, t) { if (!r[n]) {
    if (!e[n]) {
        var f = "function" == typeof parcelRequire && parcelRequire;
        if (!t && f)
            return f(n, !0);
        if (i)
            return i(n, !0);
        if (o && "string" == typeof n)
            return o(n);
        var c = new Error("Cannot find module '" + n + "'");
        throw c.code = "MODULE_NOT_FOUND", c;
    }
    p.resolve = function (r) { return e[n][1][r] || r; }, p.cache = {};
    var l = r[n] = new u.Module(n);
    e[n][0].call(l.exports, p, l, l.exports, this);
} return r[n].exports; function p(e) { return u(p.resolve(e)); } } u.isParcelRequire = !0, u.Module = function (e) { this.id = e, this.bundle = u, this.exports = {}; }, u.modules = e, u.cache = r, u.parent = i, u.register = function (r, n) { e[r] = [function (e, r) { r.exports = n; }, {}]; }; for (var f = 0; f < n.length; f++)
    u(n[f]); if (n.length) {
    var c = u(n[n.length - 1]);
    "object" == typeof exports && "undefined" != typeof module ? module.exports = c : "function" == typeof define && define.amd ? define(function () { return c; }) : t && (this[t] = c);
} return u; }({ "QH5V": [function (require, module, exports) {
            "use strict";
            Object.defineProperty(exports, "__esModule", { value: !0 }), exports.updateContent = exports.init = exports.fetchData = exports.connect = void 0;
            const e = "App-Personas", t = "persons.json";
            let n = Function, i = Function, s = Function, o = Object, r = Object, a = null;
            const p = (e = {}) => (l(e), new Promise((e, t) => { gapi.load("client:auth2", () => { c().then(e); }); }));
            exports.init = p;
            const l = ({ defaultContent: e, onError: t, onSignInChange: o, onUpdate: r }) => { o && (n = o), r && (i = r), t && (s = t), e && (a = e); }, c = () => new Promise((e, t) => { gapi.client.init({ apiKey: "AIzaSyBYItpNT8k2Y2AEHz2E2kI2EqMULh5C4m0", discoveryDocs: ["https://www.googleapis.com/discovery/v1/apis/drive/v3/rest"], clientId: "614338309616-st9nui22tf3sa1cm9m1l3nd439n50frg.apps.googleusercontent.com", scope: "https://www.googleapis.com/auth/drive.file" }).then(() => { gapi.auth2.getAuthInstance().isSignedIn.listen(d), d(gapi.auth2.getAuthInstance().isSignedIn.get()), e({ isInitiated: !0 }); }); }), d = e => { console.info("👉", { isLogged: e }), n(e); }, g = () => { gapi.auth2.getAuthInstance().isSignedIn.get() ? u() : gapi.auth2.getAuthInstance().signIn(); };
            exports.connect = g;
            const u = () => h().then(f).then(y);
            exports.fetchData = u;
            const h = () => new Promise((e, t) => { gapi.client.drive.files.list({ q: "name='App-Personas' and trashed=false" }).execute(t => { 0 === t.files.length ? m().then(e) : (r = t.files[0].id, e()); }); }), m = () => new Promise((t, n) => { const i = { name: e, mimeType: "application/vnd.google-apps.folder" }; gapi.client.drive.files.create({ resource: i }).execute(e => { r = e.id, t(); }); }), f = () => new Promise((e, t) => { gapi.client.drive.files.list({ q: `name="persons.json" and '${r}' in parents and trashed=false` }).execute(t => { 0 === t.files.length ? v().then(e) : (o = t.files[0].id, e()); }); }), v = () => new Promise((e, n) => { const i = "-------314159265358979323846", s = "\r\n--" + i + "\r\n", p = { name: t, mimeType: "application/json", parents: [r] }, l = s + "Content-Type: application/json\r\n\r\n" + JSON.stringify(p) + s + "Content-Type: application/json\r\n\r\n" + (a ? JSON.stringify(a) : "") + "\r\n---------314159265358979323846--"; gapi.client.request({ path: "/upload/drive/v3/files", method: "POST", params: { uploadType: "multipart" }, headers: { "Content-Type": 'multipart/related; boundary="' + i + '"' }, body: l }).execute(t => { o = t.id, e(); }); }), y = () => new Promise((e, t) => { gapi.client.drive.files.get({ fileId: o, alt: "media" }).execute(t => { t.error ? s(`Error during file download: ${t.error.message}`) : e(t.result); }); }), w = e => new Promise((t, n) => { gapi.client.request({ path: "/upload/drive/v2/files/" + o, method: "PUT", alt: "media", body: e }).execute(e => { e.error ? s(`Error during sync: ${e.error.message}`) : y().then(e => { i(e), t(e); }); }); });
            exports.updateContent = w;
        }, {}], "Iw//": [function (require, module, exports) {
            "use strict";
            Object.defineProperty(exports, "__esModule", { value: !0 }), exports.setState = exports.dispatchUpdate = exports.getState = exports.addListener = void 0;
            const e = [];
            let t = { googleSyncEnabled: !1, isSignedIn: !1, persons: [], isLoading: !0, view: "loading", editingPerson: null };
            const s = () => t;
            exports.getState = s;
            const o = e => { t = Object.assign(Object.assign({}, t), e), n(); };
            exports.setState = o;
            const n = () => { e.forEach(e => { e(s()); }); };
            exports.dispatchUpdate = n;
            const r = t => { e.push(t); };
            exports.addListener = r;
        }, {}], "thyU": [function (require, module, exports) {
            "use strict";
            Object.defineProperty(exports, "__esModule", { value: !0 }), exports.setup = exports.libLoaded = void 0;
            var e = require("./google-drive-api.js"), t = require("./state.js");
            const n = () => { (0, t.addListener)(r), g().addEventListener("click", e.connect), window.getState = t.getState; };
            exports.setup = n;
            const o = () => { const n = { onSignInChange: a, onUpdate: s, onError: i, defaultContent: [] }; (0, e.init)(n).then(e => { const { isInitiated: n } = e; (0, t.setState)({ googleSyncEnabled: n }); }); };
            exports.libLoaded = o;
            const r = e => { d(e.googleSyncEnabled); }, s = e => { Array.isArray(e) || i("Unknown reposonse from server"), e = e.map(e => (Object.assign(Object.assign({}, e), { name: unescape(e.name), id: Math.random().toString(36).substring(10) }))), (0, t.setState)({ persons: e, view: "persons" }); }, a = n => { n ? ((0, t.setState)({ isSignedIn: n, view: "loading" }), (0, e.fetchData)().then(s)) : (0, t.setState)({ isSignedIn: n, view: "signIn" }); }, i = e => { (0, t.setState)({ view: "error" }), alert(e); }, d = e => { e && g().removeAttribute("disabled"); }, g = () => document.querySelector('button[data-prs="googleDriveButton"]');
        }, { "./google-drive-api.js": "QH5V", "./state.js": "Iw//" }], "ufb7": [function (require, module, exports) {
            "use strict";
            Object.defineProperty(exports, "__esModule", { value: !0 }), exports.birthdayPicker = void 0;
            const e = ({ day: e, month: t, year: r }) => { const c = (e, t, r) => [...Array(t + 1).keys()].slice(e).map(e => { const t = document.createElement("option"); return t.innerText = e, t.value = e, r && e === r && (t.selected = !0), t; }), n = document.createElement("select"), o = document.createElement("select"), a = document.createElement("select"); c(1, 31, e).forEach(e => n.appendChild(e)), c(1, 12, t).forEach(e => o.appendChild(e)), c(1900, 2019, r).forEach(e => a.appendChild(e)); return [n, o, a]; };
            exports.birthdayPicker = e;
        }, {}], "byH2": [function (require, module, exports) {
            "use strict";
            Object.defineProperty(exports, "__esModule", { value: !0 }), exports.default = void 0;
            var t = { edit: '\n\t\t<svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"\n\t\t\t viewBox="0 0 469.331 469.331" style="enable-background:new 0 0 469.331 469.331;" xml:space="preserve">\n\t\t\t<g>\n\t\t\t\t<path d="M438.931,30.403c-40.4-40.5-106.1-40.5-146.5,0l-268.6,268.5c-2.1,2.1-3.4,4.8-3.8,7.7l-19.9,147.4\n\t\t\t\t\tc-0.6,4.2,0.9,8.4,3.8,11.3c2.5,2.5,6,4,9.5,4c0.6,0,1.2,0,1.8-0.1l88.8-12c7.4-1,12.6-7.8,11.6-15.2c-1-7.4-7.8-12.6-15.2-11.6\n\t\t\t\t\tl-71.2,9.6l13.9-102.8l108.2,108.2c2.5,2.5,6,4,9.5,4s7-1.4,9.5-4l268.6-268.5c19.6-19.6,30.4-45.6,30.4-73.3\n\t\t\t\t\tS458.531,49.903,438.931,30.403z M297.631,63.403l45.1,45.1l-245.1,245.1l-45.1-45.1L297.631,63.403z M160.931,416.803l-44.1-44.1\n\t\t\t\t\tl245.1-245.1l44.1,44.1L160.931,416.803z M424.831,152.403l-107.9-107.9c13.7-11.3,30.8-17.5,48.8-17.5c20.5,0,39.7,8,54.2,22.4\n\t\t\t\t\ts22.4,33.7,22.4,54.2C442.331,121.703,436.131,138.703,424.831,152.403z"/>\n\t\t\t</g>\n\t\t</svg>\n\t', remove: '\n\t\t<svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"\n\t\t\t viewBox="0 0 486.4 486.4" style="enable-background:new 0 0 486.4 486.4;" xml:space="preserve">\n\t\t\t<g>\n\t\t\t\t<g>\n\t\t\t\t\t<path d="M446,70H344.8V53.5c0-29.5-24-53.5-53.5-53.5h-96.2c-29.5,0-53.5,24-53.5,53.5V70H40.4c-7.5,0-13.5,6-13.5,13.5\n\t\t\t\t\t\tS32.9,97,40.4,97h24.4v317.2c0,39.8,32.4,72.2,72.2,72.2h212.4c39.8,0,72.2-32.4,72.2-72.2V97H446c7.5,0,13.5-6,13.5-13.5\n\t\t\t\t\t\tS453.5,70,446,70z M168.6,53.5c0-14.6,11.9-26.5,26.5-26.5h96.2c14.6,0,26.5,11.9,26.5,26.5V70H168.6V53.5z M394.6,414.2\n\t\t\t\t\t\tc0,24.9-20.3,45.2-45.2,45.2H137c-24.9,0-45.2-20.3-45.2-45.2V97h302.9v317.2H394.6z"/>\n\t\t\t\t\t<path d="M243.2,411c7.5,0,13.5-6,13.5-13.5V158.9c0-7.5-6-13.5-13.5-13.5s-13.5,6-13.5,13.5v238.5\n\t\t\t\t\t\tC229.7,404.9,235.7,411,243.2,411z"/>\n\t\t\t\t\t<path d="M155.1,396.1c7.5,0,13.5-6,13.5-13.5V173.7c0-7.5-6-13.5-13.5-13.5s-13.5,6-13.5,13.5v208.9\n\t\t\t\t\t\tC141.6,390.1,147.7,396.1,155.1,396.1z"/>\n\t\t\t\t\t<path d="M331.3,396.1c7.5,0,13.5-6,13.5-13.5V173.7c0-7.5-6-13.5-13.5-13.5s-13.5,6-13.5,13.5v208.9\n\t\t\t\t\t\tC317.8,390.1,323.8,396.1,331.3,396.1z"/>\n\t\t\t\t</g>\n\t\t\t</g>\n\t\t</svg>\n\t' };
            exports.default = t;
        }, {}], "xLSG": [function (require, module, exports) {
            "use strict";
            Object.defineProperty(exports, "__esModule", { value: !0 }), exports.renderPersons = exports.clearPersons = void 0;
            var e = require("./components/birthday-picker.js"), n = t(require("./components/icons.js"));
            function t(e) { return e && e.__esModule ? e : { default: e }; }
            const r = (e, n) => { const t = document.querySelector(".persons"); e.map(d).forEach(e => t.appendChild(e)), t.appendChild(u(n)); };
            exports.renderPersons = r;
            const d = e => { const t = document.createElement("div"); t.classList.add("person"), [o(e.name), a(e.birthday, e.age, e.daysToBirthday), c(e.seenBefore), ...s(e.customTexts)].filter(Boolean).forEach(e => t.appendChild(e)); const r = document.createElement("div"), d = document.createElement("div"); return r.classList.add("icon-edit", "icon"), d.classList.add("icon-remove", "icon"), r.addEventListener("click", e.handleEdit.bind(null, e.id)), d.addEventListener("click", e.handleRemove.bind(null, e.id)), r.innerHTML = n.default.edit, d.innerHTML = n.default.remove, t.appendChild(d), t.appendChild(r), t; }, o = e => { const n = i(e); return n.classList.add("person-title"), n; }, i = e => { const n = document.createElement("div"); return n.innerHTML = e, n; }, a = (e, n, t) => { if (!e)
                return null; const r = document.createElement("div"); return r.innerHTML = `Age: ${n}<br />Birthday in ${t} days (${e})`, r; }, c = e => { if (!e && 0 !== e)
                return null; const n = document.createElement("div"); document.createElement("button"); return n.innerHTML = `Seen before ${e} days`, n; }, s = e => e ? e.map(i) : [], l = () => { document.querySelector(".persons").innerHTML = ""; };
            exports.clearPersons = l;
            const u = n => { const t = document.createElement("div"), r = document.createElement("input"), [d, o, i] = (0, e.birthdayPicker)({ day: 1, month: 1, year: 1980 }), a = document.createElement("button"); return r.placeholder = "Name", a.innerText = "Save", a.addEventListener("click", () => { n(r.value, d.value, o.value, i.value); }), t.appendChild(r), t.appendChild(d), t.appendChild(o), t.appendChild(i), t.appendChild(a), t; };
        }, { "./components/birthday-picker.js": "ufb7", "./components/icons.js": "byH2" }], "6fRE": [function (require, module, exports) {
            "use strict";
            Object.defineProperty(exports, "__esModule", { value: !0 }), exports.createIso = exports.createDate = exports.parseDate = void 0;
            const e = e => { const t = new Date(e); return { day: t.getDate(), month: t.getMonth() + 1, year: t.getFullYear() }; };
            exports.parseDate = e;
            const t = (e, t, r) => new Date(r, t - 1, e);
            exports.createDate = t;
            const r = (e, t, r) => { const a = e.padStart(2, "0"); return `${r}-${t.padStart(2, "0")}-${a}`; };
            exports.createIso = r;
        }, {}], "pIMj": [function (require, module, exports) {
            "use strict";
            Object.defineProperty(exports, "__esModule", { value: !0 }), exports.setup = exports.resetSeen = exports.editPerson = void 0;
            var e = require("./state.js"), t = require("./google-drive-api.js"), r = a(require("./persons-view.js")), n = require("./utils/date.js");
            function a(e) { if (e && e.__esModule)
                return e; var t = {}; if (null != e)
                for (var r in e)
                    if (Object.prototype.hasOwnProperty.call(e, r)) {
                        var n = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(e, r) : {};
                        n.get || n.set ? Object.defineProperty(t, r, n) : t[r] = e[r];
                    } return t.default = e, t; }
            const o = () => { (0, e.addListener)(s); };
            exports.setup = o;
            const s = () => { i(); }, i = () => { r.clearPersons(), d((0, e.getState)().persons); }, d = e => { const t = e.map(e => (Object.assign(Object.assign({}, e), { age: u(e.birthday), daysToBirthday: c(e.birthday), seenBefore: p(e.seen), handleEdit: D, handleRemove: y }))).sort(l); r.renderPersons(t, g); }, l = (e, t) => e.birthday && t.birthday ? c(e.birthday) - c(t.birthday) : 0, u = e => { if (!e)
                return null; const t = Date.now(), r = new Date(e).getTime(), n = new Date(t - r); return Math.abs(n.getUTCFullYear() - 1970); }, p = e => { if (!e)
                return null; const t = Date.now(), r = new Date(e).getTime(); return Math.round((t - r) / 1e3 / 60 / 60 / 24); }, c = e => { if (!e)
                return null; const t = new Date(e), r = (new Date).getUTCFullYear(), n = Date.now() - new Date(`${r}-${t.getMonth() + 1}-${t.getDate()}`).getTime(); let a; if (n < 0)
                a = Math.abs(Math.ceil(n / 1e3 / 60 / 60 / 24));
            else {
                const e = Date.now() - new Date(`${r + 1}-${t.getMonth() + 1}-${t.getDate()}`).getTime();
                a = Math.abs(Math.ceil(e / 1e3 / 60 / 60 / 24));
            } return a; }, g = (r, a, o, s) => { const i = (0, n.createIso)(a, o, s), d = w(r, i); d ? alert(d) : ((0, e.setState)({ view: "loading" }), (0, t.updateContent)((0, e.getState)().persons.concat({ name: r, birthday: i }))); }, h = (r, a, o, s, i) => { const d = (0, n.createIso)(o, s, i), l = w(a, d); if (l)
                return void alert(l); const u = (0, e.getState)().persons.map(e => e.id !== r ? e : Object.assign(Object.assign({}, e), { name: a, birthday: d })); (0, e.setState)({ view: "loading" }), (0, t.updateContent)(u); };
            exports.editPerson = h;
            const w = (e, t) => e ? t.match(/^\d{4}-\d{2}-\d{2}$/) ? null : "Wrong birthday format. Use YYYY-MM-DD." : "Empty name", f = r => { const n = (0, e.getState)().persons.map(e => { if (r !== e.id)
                return e; const t = new Date, n = t.getUTCFullYear(), a = (t.getMonth() + 1 + "").padStart(2, "0"), o = (t.getDate() + "").padStart(2, "0"); return Object.assign(Object.assign({}, e), { seen: `${n}-${a}-${o}` }); }); (0, e.setState)({ view: "loading" }), (0, t.updateContent)(n); };
            exports.resetSeen = f;
            const D = t => { (0, e.setState)({ view: "edit", editingPerson: t }); }, y = r => { if (!confirm("Delete person?"))
                return; const n = (0, e.getState)().persons.filter(e => e.id !== r); (0, e.setState)({ view: "loading" }), (0, t.updateContent)(n); };
        }, { "./state.js": "Iw//", "./google-drive-api.js": "QH5V", "./persons-view.js": "xLSG", "./utils/date.js": "6fRE" }], "xFxm": [function (require, module, exports) {
            "use strict";
            Object.defineProperty(exports, "__esModule", { value: !0 }), exports.setup = void 0;
            var e = require("./state.js"), t = require("./persons-model.js"), n = require("./utils/date.js"), d = require("./components/birthday-picker.js");
            const i = { overlay: { selector: 'div[data-prs="overlay"]', show: "flex" }, loader: { selector: 'div[data-prs="loader"]', show: "block" }, singIn: { selector: 'button[data-prs="googleDriveButton"]', show: "block" }, edit: { selector: 'div[data-prs="edit"]', show: "block" } }, s = e => { o(i.loader, "loading" === e.view), o(i.singIn, "signIn" === e.view), o(i.edit, "edit" === e.view), o(i.overlay, ["loading", "edit", "signIn"].includes(e.view)), "edit" === e.view && e.editingPerson && r(e.persons.find(({ id: t }) => t === e.editingPerson)); }, r = s => { const r = document.querySelector(i.edit.selector); r.innerHTML = ""; const o = document.createElement("input"), [a, l, c] = (0, d.birthdayPicker)((0, n.parseDate)(s.birthday)), p = document.createElement("button"), u = document.createElement("button"), v = document.createElement("button"); u.classList.add("seen-save"), p.classList.add("edit-save"), p.innerText = "Save", u.innerText = "Seen today", v.innerText = "Cancel", o.value = s.name, p.addEventListener("click", () => { (0, t.editPerson)(s.id, o.value, a.value, l.value, c.value); }), u.addEventListener("click", () => { (0, t.resetSeen)(s.id); }), v.addEventListener("click", () => { (0, e.setState)({ view: "persons", editingPerson: null }); }), r.appendChild(o), r.appendChild(a), r.appendChild(l), r.appendChild(c), r.appendChild(u), r.appendChild(p), r.appendChild(v); }, o = (e, t) => { document.querySelector(e.selector).style.display = t ? e.show : "none"; }, a = () => { (0, e.addListener)(s); };
            exports.setup = a;
        }, { "./state.js": "Iw//", "./persons-model.js": "pIMj", "./utils/date.js": "6fRE", "./components/birthday-picker.js": "ufb7" }], "H99C": [function (require, module, exports) {
            "use strict";
            Object.defineProperty(exports, "__esModule", { value: !0 }), Object.defineProperty(exports, "googleLibLoaded", { enumerable: !0, get: function () { return e.libLoaded; } }), exports.setup = void 0;
            var e = require("./google-drive-model.js"), r = require("./persons-model.js"), o = require("./overlay.js");
            const t = () => { (0, e.setup)(), (0, o.setup)(), (0, r.setup)(); };
            exports.setup = t;
        }, { "./google-drive-model.js": "thyU", "./persons-model.js": "pIMj", "./overlay.js": "xFxm" }] }, {}, ["H99C"], "prs");
//# sourceMappingURL=/personas/src.886fad34.map

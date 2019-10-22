var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
parcelRequire = function (e, r, t, n) { var i, o = "function" == typeof parcelRequire && parcelRequire, u = "function" == typeof require && require; function f(t, n) { if (!r[t]) {
    if (!e[t]) {
        var i = "function" == typeof parcelRequire && parcelRequire;
        if (!n && i)
            return i(t, !0);
        if (o)
            return o(t, !0);
        if (u && "string" == typeof t)
            return u(t);
        var c = new Error("Cannot find module '" + t + "'");
        throw c.code = "MODULE_NOT_FOUND", c;
    }
    p.resolve = function (r) { return e[t][1][r] || r; }, p.cache = {};
    var l = r[t] = new f.Module(t);
    e[t][0].call(l.exports, p, l, l.exports, this);
} return r[t].exports; function p(e) { return f(p.resolve(e)); } } f.isParcelRequire = !0, f.Module = function (e) { this.id = e, this.bundle = f, this.exports = {}; }, f.modules = e, f.cache = r, f.parent = o, f.register = function (r, t) { e[r] = [function (e, r) { r.exports = t; }, {}]; }; for (var c = 0; c < t.length; c++)
    try {
        f(t[c]);
    }
    catch (e) {
        i || (i = e);
    } if (t.length) {
    var l = f(t[t.length - 1]);
    "object" == typeof exports && "undefined" != typeof module ? module.exports = l : "function" == typeof define && define.amd ? define(function () { return l; }) : n && (this[n] = l);
} if (parcelRequire = f, i)
    throw i; return f; }({ "FwEn": [function (require, module, exports) {
            "use strict";
            Object.defineProperty(exports, "__esModule", { value: !0 }), exports.save = exports.init = exports.fetchData = exports.connect = void 0;
            const e = "App-Personas", t = "persons.json";
            let n = Function, i = Object, s = Object, o = null;
            const r = (e = {}) => (a(e), console.info("👉", "init gdrive"), new Promise((e, t) => { gapi.load("client:auth2", () => { p().then(e); }); }));
            exports.init = r;
            const a = ({ defaultContent: e, onSignInChange: t }) => { t && (n = t), e && (o = e); }, p = () => new Promise((e, t) => { gapi.client.init({ apiKey: "AIzaSyBYItpNT8k2Y2AEHz2E2kI2EqMULh5C4m0", discoveryDocs: ["https://www.googleapis.com/discovery/v1/apis/drive/v3/rest"], clientId: "614338309616-st9nui22tf3sa1cm9m1l3nd439n50frg.apps.googleusercontent.com", scope: "https://www.googleapis.com/auth/drive.file" }).then(() => { gapi.auth2.getAuthInstance().isSignedIn.listen(l), l(gapi.auth2.getAuthInstance().isSignedIn.get()), e({ isInitiated: !0 }); }); }), l = e => { n(e); }, c = () => { gapi.auth2.getAuthInstance().isSignedIn.get() ? d() : gapi.auth2.getAuthInstance().signIn(); };
            exports.connect = c;
            const d = () => g().then(h).then(f);
            exports.fetchData = d;
            const g = () => new Promise((e, t) => { gapi.client.drive.files.list({ q: "name='App-Personas' and trashed=false" }).execute(t => { 0 === t.files.length ? u().then(e) : (s = t.files[0].id, e()); }); }), u = () => new Promise((t, n) => { const i = { name: e, mimeType: "application/vnd.google-apps.folder" }; gapi.client.drive.files.create({ resource: i }).execute(e => { s = e.id, t(); }); }), h = () => new Promise((e, t) => { gapi.client.drive.files.list({ q: `name="persons.json" and '${s}' in parents and trashed=false` }).execute(t => { 0 === t.files.length ? m().then(e) : (i = t.files[0].id, e()); }); }), m = () => new Promise((e, n) => { const r = "-------314159265358979323846", a = "\r\n--" + r + "\r\n", p = { name: t, mimeType: "application/json", parents: [s] }, l = a + "Content-Type: application/json\r\n\r\n" + JSON.stringify(p) + a + "Content-Type: application/json\r\n\r\n" + (o ? JSON.stringify(o) : "") + "\r\n---------314159265358979323846--"; gapi.client.request({ path: "/upload/drive/v3/files", method: "POST", params: { uploadType: "multipart" }, headers: { "Content-Type": 'multipart/related; boundary="' + r + '"' }, body: l }).execute(t => { i = t.id, e(); }); }), f = () => new Promise((e, t) => { gapi.client.drive.files.get({ fileId: i, alt: "media" }).execute(n => { n.error ? t(`Error during file download: ${n.error.message}`) : (console.log("response.result", n.result), e(n.result)); }); }), v = e => (console.info("👉", "API save"), new Promise((t, n) => { gapi.client.request({ path: "/upload/drive/v2/files/" + i, method: "PUT", alt: "media", body: e }).execute(e => { e.error ? n(`Error during sync: ${e.error.message}`) : f().then(e => { t(e); }); }); }));
            exports.save = v;
        }, {}], "EE7k": [function (require, module, exports) {
            "use strict";
            Object.defineProperty(exports, "__esModule", { value: !0 }), exports.save = exports.edit = exports.ACTIONS = void 0;
            const e = { edit: "person/edit", save: "person/save", SYNC: "person/sync", FETCH: "person/fetch", SET: "person/set", ADD: "person/add", REMOVE: "person/remove" };
            exports.ACTIONS = e;
            const s = (s, o) => ({ type: e.edit, payload: { field: s, value: o } });
            exports.edit = s;
            const o = s => ({ type: e.save, payload: s });
            exports.save = o;
        }, {}], "jROX": [function (require, module, exports) {
            "use strict";
            Object.defineProperty(exports, "__esModule", { value: !0 }), exports.ACTIONS = void 0;
            const e = { LIB_LOADED: "data-provider/lib-loaded", SYNC_ENABLED: "data-provider/sync-enabled", SYNC: "data-provider/sync", IS_LOGGED: "data-provider/is-logged", LOGIN: "data-provider/login" };
            exports.ACTIONS = e;
        }, {}], "AW4V": [function (require, module, exports) {
            "use strict";
            Object.defineProperty(exports, "__esModule", { value: !0 }), exports.getActiveElement = exports.storeActiveElement = exports.ACTIONS = void 0;
            var e = require("/store/store.js");
            const t = { setActiveElement: "utils/set-active-element" };
            exports.ACTIONS = t;
            const r = () => { const e = document.activeElement; if (!e)
                return { type: "" }; const r = e.getAttribute("data-prsKey"); return r ? { type: t.setActiveElement, payload: r } : { type: "" }; };
            exports.storeActiveElement = r;
            const s = () => { const t = (0, e.getState)().activeElement; return t ? document.querySelector(`[data-prsKey=${t}]`) : null; };
            exports.getActiveElement = s;
        }, { "/store/store.js": "sAcK" }], "uKcU": [function (require, module, exports) {
            "use strict";
            Object.defineProperty(exports, "__esModule", { value: !0 }), exports.reducer = void 0;
            var e = require("/person/person-actions.js"), r = require("/data-provider/actions.js"), a = require("/app/app-action.js");
            const s = (s, o) => { switch (o.type) {
                case e.ACTIONS.save: {
                    const e = Object.assign(Object.assign({}, s.persons), { [o.payload.id]: o.payload });
                    return Object.assign(Object.assign({}, s), { persons: e });
                }
                case e.ACTIONS.SET: return { persons: o.payload };
                case e.ACTIONS.ADD: {
                    const e = s.persons.concat(o.payload);
                    return Object.assign(Object.assign({}, s), { persons: e });
                }
                case e.ACTIONS.REMOVE: return o.payload ? Object.assign(Object.assign({}, s), { persons: s.persons.filter(e => e.id !== o.payload) }) : s;
                case e.ACTIONS.edit: return Object.assign(Object.assign({}, s), { personEdit: Object.assign(Object.assign({}, s.personEdit), { [o.payload.field]: o.payload.value }) });
                case r.ACTIONS.IS_LOGGED: {
                    const e = Object.assign(Object.assign({}, s.dataProvider), { isLogged: o.payload });
                    return Object.assign(Object.assign({}, s), { dataProvider: e });
                }
                case a.ACTIONS.setActiveElement: return Object.assign(Object.assign({}, s), { activeElement: o.payload });
            } };
            exports.reducer = s;
        }, { "/person/person-actions.js": "EE7k", "/data-provider/actions.js": "jROX", "/app/app-action.js": "AW4V" }], "sAcK": [function (require, module, exports) {
            "use strict";
            Object.defineProperty(exports, "__esModule", { value: !0 }), exports.getState = exports.dispatch = exports.subscribe = void 0;
            var e = require("/store/reducer.js");
            const t = [];
            let s = { googleSyncEnabled: !1, isSignedIn: !1, persons: {}, isLoading: !0, view: "loading", editingPerson: null, activeElement: null, personEdit: { name: "", day: "1", month: "1", year: "1980" } };
            const r = () => s;
            exports.getState = r;
            const o = e => { s = Object.assign(Object.assign({}, s), e); }, n = s => { const n = r(); if (!s.type)
                return; const i = (0, e.reducer)(n, s); o(i), t.forEach(e => { e(s); }); };
            exports.dispatch = n;
            const i = e => { t.push(e); };
            exports.subscribe = i;
        }, { "/store/reducer.js": "uKcU" }], "oZ3E": [function (require, module, exports) {
            "use strict";
            Object.defineProperty(exports, "__esModule", { value: !0 }), exports.default = v;
            var e = require("/data-provider/google-drive/google-drive-api.js"), o = require("/store/store.js"), t = require("/data-provider/actions.js"), n = require("/person/person-actions.js");
            const r = () => { (0, o.subscribe)(e => { e === t.ACTIONS.SYNC_ENABLED && (console.info("👉", "update google button", e.payload), p(e.payload)); }); const n = u(); n && n.addEventListener("click", e.connect); }, a = () => { const n = { onSignInChange: i, onError: l, defaultContent: [] }; (0, e.init)(n).then(e => { const { isInitiated: n } = e; (0, o.dispatch)({ type: t.ACTIONS.SYNC_ENABLED, payload: n }); }); }, i = e => { console.info("👉", "onSignInChange"), e ? (0, o.dispatch)({ type: n.ACTIONS.FETCH }) : (0, o.dispatch)({ type: t.ACTIONS.IS_LOGGED, payload: !1 }); }, s = o => (console.info("👉", "call GDrive API from model", o), (0, e.save)(o)), c = () => { (0, e.fetchData)().then(e => { if (!Array.isArray(e))
                return void l("Unknown reposonse from server"); return e.map(e => (Object.assign(Object.assign({}, e), { name: unescape(e.name) }))); }); }, d = () => { (0, e.connect)(); }, l = e => { alert(e); }, p = e => { if (e) {
                const e = u();
                e && e.removeAttribute("disabled");
            } }, u = () => document.querySelector('button[data-prs="googleDriveButton"]');
            function v(e) { return r(), { save: s, onLibLoaded: a, fetch: c, login: d }; }
        }, { "/data-provider/google-drive/google-drive-api.js": "FwEn", "/store/store.js": "sAcK", "/data-provider/actions.js": "jROX", "/person/person-actions.js": "EE7k" }], "xAPr": [function (require, module, exports) {
            "use strict";
            Object.defineProperty(exports, "__esModule", { value: !0 }), exports.birthdayPicker = void 0;
            const e = ({ day: e, month: t, year: a }, r) => { const n = (e, t, a) => [...Array(t + 1).keys()].slice(e).map(e => { const t = document.createElement("option"), r = e + ""; return t.innerText = r, t.value = r, a && r === a && (t.selected = !0), t; }), c = document.createElement("select"), d = document.createElement("select"), o = document.createElement("select"); n(1, 31, e).forEach(e => c.appendChild(e)), n(1, 12, t).forEach(e => d.appendChild(e)), n(1900, 2019, a).forEach(e => o.appendChild(e)); return c.addEventListener("change", e => r("day", e.target.value)), d.addEventListener("change", e => r("month", e.target.value)), o.addEventListener("change", e => r("year", e.target.value)), [c, d, o]; };
            exports.birthdayPicker = e;
        }, {}], "MtxU": [function (require, module, exports) {
            "use strict";
            Object.defineProperty(exports, "__esModule", { value: !0 }), exports.default = void 0;
            var t = { edit: '\n\t\t<svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"\n\t\t\t viewBox="0 0 469.331 469.331" style="enable-background:new 0 0 469.331 469.331;" xml:space="preserve">\n\t\t\t<g>\n\t\t\t\t<path d="M438.931,30.403c-40.4-40.5-106.1-40.5-146.5,0l-268.6,268.5c-2.1,2.1-3.4,4.8-3.8,7.7l-19.9,147.4\n\t\t\t\t\tc-0.6,4.2,0.9,8.4,3.8,11.3c2.5,2.5,6,4,9.5,4c0.6,0,1.2,0,1.8-0.1l88.8-12c7.4-1,12.6-7.8,11.6-15.2c-1-7.4-7.8-12.6-15.2-11.6\n\t\t\t\t\tl-71.2,9.6l13.9-102.8l108.2,108.2c2.5,2.5,6,4,9.5,4s7-1.4,9.5-4l268.6-268.5c19.6-19.6,30.4-45.6,30.4-73.3\n\t\t\t\t\tS458.531,49.903,438.931,30.403z M297.631,63.403l45.1,45.1l-245.1,245.1l-45.1-45.1L297.631,63.403z M160.931,416.803l-44.1-44.1\n\t\t\t\t\tl245.1-245.1l44.1,44.1L160.931,416.803z M424.831,152.403l-107.9-107.9c13.7-11.3,30.8-17.5,48.8-17.5c20.5,0,39.7,8,54.2,22.4\n\t\t\t\t\ts22.4,33.7,22.4,54.2C442.331,121.703,436.131,138.703,424.831,152.403z"/>\n\t\t\t</g>\n\t\t</svg>\n\t', remove: '\n\t\t<svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"\n\t\t\t viewBox="0 0 486.4 486.4" style="enable-background:new 0 0 486.4 486.4;" xml:space="preserve">\n\t\t\t<g>\n\t\t\t\t<g>\n\t\t\t\t\t<path d="M446,70H344.8V53.5c0-29.5-24-53.5-53.5-53.5h-96.2c-29.5,0-53.5,24-53.5,53.5V70H40.4c-7.5,0-13.5,6-13.5,13.5\n\t\t\t\t\t\tS32.9,97,40.4,97h24.4v317.2c0,39.8,32.4,72.2,72.2,72.2h212.4c39.8,0,72.2-32.4,72.2-72.2V97H446c7.5,0,13.5-6,13.5-13.5\n\t\t\t\t\t\tS453.5,70,446,70z M168.6,53.5c0-14.6,11.9-26.5,26.5-26.5h96.2c14.6,0,26.5,11.9,26.5,26.5V70H168.6V53.5z M394.6,414.2\n\t\t\t\t\t\tc0,24.9-20.3,45.2-45.2,45.2H137c-24.9,0-45.2-20.3-45.2-45.2V97h302.9v317.2H394.6z"/>\n\t\t\t\t\t<path d="M243.2,411c7.5,0,13.5-6,13.5-13.5V158.9c0-7.5-6-13.5-13.5-13.5s-13.5,6-13.5,13.5v238.5\n\t\t\t\t\t\tC229.7,404.9,235.7,411,243.2,411z"/>\n\t\t\t\t\t<path d="M155.1,396.1c7.5,0,13.5-6,13.5-13.5V173.7c0-7.5-6-13.5-13.5-13.5s-13.5,6-13.5,13.5v208.9\n\t\t\t\t\t\tC141.6,390.1,147.7,396.1,155.1,396.1z"/>\n\t\t\t\t\t<path d="M331.3,396.1c7.5,0,13.5-6,13.5-13.5V173.7c0-7.5-6-13.5-13.5-13.5s-13.5,6-13.5,13.5v208.9\n\t\t\t\t\t\tC317.8,390.1,323.8,396.1,331.3,396.1z"/>\n\t\t\t\t</g>\n\t\t\t</g>\n\t\t</svg>\n\t' };
            exports.default = t;
        }, {}], "ZbyX": [function (require, module, exports) {
            "use strict";
            Object.defineProperty(exports, "__esModule", { value: !0 }), exports.formatDMY = exports.createIso = exports.createDate = exports.parseDate = void 0;
            const t = t => { const e = new Date(t); return { day: e.getDate(), month: e.getMonth() + 1, year: e.getFullYear() }; };
            exports.parseDate = t;
            const e = (t, e, r) => new Date(r, e - 1, t);
            exports.createDate = e;
            const r = (t, e, r) => { const o = t.padStart(2, "0"); return `${r}-${e.padStart(2, "0")}-${o}`; };
            exports.createIso = r;
            const o = e => { const { day: r, month: o, year: a } = t(e); return `${r}. ${o}. ${a}`; };
            exports.formatDMY = o;
        }, {}], "zpKB": [function (require, module, exports) {
            "use strict";
            Object.defineProperty(exports, "__esModule", { value: !0 }), exports.default = p;
            var e = require("/components/birthday-picker.js"), t = r(require("/components/icons.js")), n = require("/utils/date.js");
            function r(e) { return e && e.__esModule ? e : { default: e }; }
            const s = e => { const t = document.createElement("div"); return t.classList.add("persons"), t.setAttribute("data-cy", "persons"), e.map(i).forEach(e => t.appendChild(e)), t; }, d = () => { const e = document.createElement("div"); return e.classList.add("personsEmpty"), e.setAttribute("data-cy", "personsEmpty"), e.innerText = "No persons created yet.", e; }, i = e => { const n = document.createElement("div"); n.classList.add("person"), n.setAttribute("data-cy", "person"), [o(e.name), c(e), u(e.seenBefore), ...l(e.customTexts)].filter(Boolean).forEach(e => n.appendChild(e)); const r = document.createElement("div"), s = document.createElement("div"); return r.classList.add("icon-edit", "icon"), s.classList.add("icon-remove", "icon"), r.addEventListener("click", e.handleEdit.bind(null, e.id)), s.addEventListener("click", e.handleRemove.bind(null, e.id)), s.setAttribute("data-cy", "remove"), r.innerHTML = t.default.edit, s.innerHTML = t.default.remove, n.appendChild(s), n.appendChild(r), n; }, o = e => { const t = a(e); return t.classList.add("person-title"), t; }, a = e => { const t = document.createElement("div"); return t.innerHTML = e, t; }, c = ({ birthday: e, age: t, daysToBirthday: r }) => { if (!e)
                return null; const s = document.createElement("div"), d = (0, n.formatDMY)(e); return s.innerHTML = `Age: ${t}<br />Birthday in ${r} days (${d})`, s; }, u = e => { if (!e && 0 !== e)
                return null; const t = document.createElement("div"); document.createElement("button"); return t.innerHTML = `Seen before ${e} days`, t; }, l = e => e ? e.map(a) : [], m = () => { const e = document.querySelector(".persons"); e && (e.innerHTML = ""); };
            function p(e) { return m(), e.persons.length ? s(e.persons) : d(); }
        }, { "/components/birthday-picker.js": "xAPr", "/components/icons.js": "MtxU", "/utils/date.js": "ZbyX" }], "nySV": [function (require, module, exports) {
            "use strict";
            Object.defineProperty(exports, "__esModule", { value: !0 }), exports.ROUTES = void 0;
            const e = { home: "/", login: "login", add: "add", edit: "edit" };
            exports.ROUTES = e;
        }, {}], "gdkB": [function (require, module, exports) {
            "use strict";
            Object.defineProperty(exports, "__esModule", { value: !0 }), exports.goToHome = exports.goToEdit = exports.goToAdd = exports.ACTIONS = void 0;
            var o = require("/router/routes.js");
            const e = { home: "", go: "router/go" };
            exports.ACTIONS = e;
            const t = () => ({ type: e.go, payload: o.ROUTES.add });
            exports.goToAdd = t;
            const r = t => ({ type: e.go, payload: `${o.ROUTES.edit}/${t}` });
            exports.goToEdit = r;
            const s = () => ({ type: e.go, payload: o.ROUTES.home });
            exports.goToHome = s;
        }, { "/router/routes.js": "nySV" }], "KW1q": [function (require, module, exports) {
            "use strict";
            Object.defineProperty(exports, "__esModule", { value: !0 }), exports.getProps = void 0;
            var e = require("/store/store.js"), t = i(require("/person/persons-view.js")), r = require("/utils/date.js"), n = require("/data-provider/actions.js"), a = require("/person/person-actions.js"), o = require("/router/router-actions.js");
            function s() { if ("function" != typeof WeakMap)
                return null; var e = new WeakMap; return s = function () { return e; }, e; }
            function i(e) { if (e && e.__esModule)
                return e; var t = s(); if (t && t.has(e))
                return t.get(e); var r = {}; if (null != e) {
                var n = Object.defineProperty && Object.getOwnPropertyDescriptor;
                for (var a in e)
                    if (Object.prototype.hasOwnProperty.call(e, a)) {
                        var o = n ? Object.getOwnPropertyDescriptor(e, a) : null;
                        o && (o.get || o.set) ? Object.defineProperty(r, a, o) : r[a] = e[a];
                    }
            } return r.default = e, t && t.set(e, r), r; }
            const u = () => { (0, e.subscribe)(p); }, p = () => { updatePersons(); }, d = () => { return { persons: Object.values((0, e.getState)().persons).map(t => (Object.assign(Object.assign({}, t), { age: c(t.birthday), daysToBirthday: g(t.birthday), seenBefore: h(t.seen), handleEdit: t => (0, e.dispatch)((0, o.goToEdit)(t)), handleRemove: b }))).sort(l) }; };
            exports.getProps = d;
            const l = (e, t) => e.birthday && t.birthday ? g(e.birthday) - g(t.birthday) : 0, c = e => { if (!e)
                return null; const t = Date.now(), r = new Date(e).getTime(), n = new Date(t - r); return Math.abs(n.getUTCFullYear() - 1970); }, h = e => { if (!e)
                return null; const t = Date.now(), r = new Date(e).getTime(); return Math.round((t - r) / 1e3 / 60 / 60 / 24); }, g = e => { if (!e)
                return null; const t = new Date(e), r = (new Date).getUTCFullYear(), n = Date.now() - new Date(`${r}-${t.getMonth() + 1}-${t.getDate()}`).getTime(); let a; if (n < 0)
                a = Math.abs(Math.ceil(n / 1e3 / 60 / 60 / 24));
            else {
                const e = Date.now() - new Date(`${r + 1}-${t.getMonth() + 1}-${t.getDate()}`).getTime();
                a = Math.abs(Math.ceil(e / 1e3 / 60 / 60 / 24));
            } return a; }, f = (e, t) => e ? t.match(/^\d{4}-\d{2}-\d{2}$/) ? null : "Wrong birthday format. Use YYYY-MM-DD." : "Empty name", y = t => { (0, e.getState)().persons.map(e => { if (t !== e.id)
                return e; const r = new Date, n = r.getUTCFullYear(), a = (r.getMonth() + 1 + "").padStart(2, "0"), o = (r.getDate() + "").padStart(2, "0"); return Object.assign(Object.assign({}, e), { seen: `${n}-${a}-${o}` }); }); (0, e.dispatch)({ type: a.ACTIONS.SYNC }); }, D = e => { }, b = t => { confirm("Delete person?") && ((0, e.dispatch)({ type: a.ACTIONS.REMOVE, payload: t }), (0, e.dispatch)({ type: a.ACTIONS.SYNC })); };
        }, { "/store/store.js": "sAcK", "/person/persons-view.js": "zpKB", "/utils/date.js": "ZbyX", "/data-provider/actions.js": "jROX", "/person/person-actions.js": "EE7k", "/router/router-actions.js": "gdkB" }], "XLab": [function (require, module, exports) {
            "use strict";
            Object.defineProperty(exports, "__esModule", { value: !0 }), exports.setup = void 0;
            var e = require("/store/store.js"), t = require("/person/persons-model.js"), s = require("/utils/date.js"), n = require("/components/birthday-picker.js");
            const i = { overlay: { selector: 'div[data-prs="overlay"]', show: "flex" }, loader: { selector: 'div[data-prs="loader"]', show: "block" }, singIn: { selector: 'button[data-prs="googleDriveButton"]', show: "block" }, edit: { selector: 'div[data-prs="edit"]', show: "block" } }, d = () => { a(i.loader, "loading" === state.view), a(i.singIn, "signIn" === state.view), a(i.edit, "edit" === state.view), a(i.overlay, ["loading", "edit", "signIn"].includes(state.view)), "edit" === state.view && state.editingPerson && r(state.persons.find(({ id: e }) => e === state.editingPerson)); }, r = d => { const r = document.querySelector(i.edit.selector); r.innerHTML = ""; const a = document.createElement("input"), [o, l, c] = (0, n.birthdayPicker)((0, s.parseDate)(d.birthday)), p = document.createElement("button"), u = document.createElement("button"), v = document.createElement("button"); u.classList.add("seen-save"), p.classList.add("edit-save"), p.innerText = "Save", u.innerText = "Seen today", v.innerText = "Cancel", a.value = d.name, p.addEventListener("click", () => { (0, t.editPerson)(d.id, a.value, o.value, l.value, c.value); }), u.addEventListener("click", () => { (0, t.resetSeen)(d.id); }), v.addEventListener("click", () => { (0, e.setState)({ view: "persons", editingPerson: null }); }), r.appendChild(a), r.appendChild(o), r.appendChild(l), r.appendChild(c), r.appendChild(u), r.appendChild(p), r.appendChild(v); }, a = (e, t) => { document.querySelector(e.selector).style.display = t ? e.show : "none"; }, o = () => { };
            exports.setup = o;
        }, { "/store/store.js": "sAcK", "/person/persons-model.js": "KW1q", "/utils/date.js": "ZbyX", "/components/birthday-picker.js": "xAPr" }], "JEGA": [function (require, module, exports) {
            "use strict";
            Object.defineProperty(exports, "__esModule", { value: !0 }), exports.setup = setup, exports.fetchLib = fetchLib;
            var _store = require("/store/store.js"), _actions = require("/data-provider/actions.js"), _personActions = require("/person/person-actions.js");
            const GDRIVE = "gdrive", getSelectedStorage = () => GDRIVE;
            function setup(e) { const s = e({ onReady: () => (0, _store.dispatch)(_actions.ACTIONS.FETCH) }); (0, _store.subscribe)((e) => __awaiter(this, void 0, void 0, function* () { switch (e.type) {
                case _personActions.ACTIONS.SYNC: {
                    const e = s.save((0, _store.getState)().persons);
                    console.info("👉", "persons synced", e);
                    break;
                }
                case _personActions.ACTIONS.FETCH: {
                    const e = yield s.fetch();
                    (0, _store.dispatch)({ type: _personActions.ACTIONS.SET, payload: e });
                    break;
                }
                case _actions.ACTIONS.LIB_LOADED:
                    s.onLibLoaded();
                    break;
                case _actions.ACTIONS.LOGIN: s.login();
            } })); }
            function fetchLib() {
                return __awaiter(this, void 0, void 0, function* () { const storageType = getSelectedStorage(); if (storageType === GDRIVE) {
                    const response = yield fetch("https://apis.google.com/js/api.js");
                    eval(yield response.text()), (0, _store.dispatch)({ type: _actions.ACTIONS.LIB_LOADED });
                } });
            }
        }, { "/store/store.js": "sAcK", "/data-provider/actions.js": "jROX", "/person/person-actions.js": "EE7k" }], "iUZI": [function (require, module, exports) {
            "use strict";
            function e(e) { const t = document.createElement("button"); t.innerText = "Login", t.addEventListener("click", () => { e.handleLoginClick(); }); const n = document.createElement("div"); return n.appendChild(t), n; }
            Object.defineProperty(exports, "__esModule", { value: !0 }), exports.default = e;
        }, {}], "oqER": [function (require, module, exports) {
            "use strict";
            Object.defineProperty(exports, "__esModule", { value: !0 }), exports.default = r;
            var e = require("/store/store.js"), t = require("/router/router-actions.js");
            function r() { const e = document.createElement("div"); return e.setAttribute("data-cy", "header"), [n(), d(), s()].map(t => e.appendChild(t)), e; }
            const n = () => { const e = document.createElement("div"); return e.innerHTML = "Persons", e; }, d = () => { const e = document.createElement("div"); return e.classList.add("header-button--sync"), e.setAttribute("data-cy", "header-button--sync"), e.innerHTML = "Sync", e; }, s = () => { const r = document.createElement("div"); return r.classList.add("header-button--add"), r.setAttribute("data-cy", "header-button--add"), r.addEventListener("click", () => (0, e.dispatch)((0, t.goToAdd)())), r.innerHTML = "Add", r; };
        }, { "/store/store.js": "sAcK", "/router/router-actions.js": "gdkB" }], "gYcl": [function (require, module, exports) {
            "use strict";
            Object.defineProperty(exports, "__esModule", { value: !0 }), exports.default = i;
            var e = require("/store/store.js"), t = require("/components/birthday-picker.js"), a = require("/person/person-actions.js"), r = require("/app/app-action.js"), n = require("/router/router-actions.js"), d = require("/utils/date.js");
            function i() { const t = document.createElement("div"), { personEdit: a } = (0, e.getState)(); return [s(a.name), o(a.day, a.month, a.year), c(a)].map(e => t.appendChild(e)), t; }
            const s = t => { const n = document.createElement("input"); return n.placeholder = "Name", n.classList.add("add-input--name"), n.setAttribute("data-cy", "add-input--name"), n.setAttribute("data-prsKey", "add-input--name"), n.value = t, n.addEventListener("input", t => { (0, e.dispatch)((0, r.storeActiveElement)()), (0, e.dispatch)((0, a.edit)("name", n.value)); }), n; }, o = (r, n, d) => { const i = document.createElement("div"); i.setAttribute("data-cy", "add-input--birthday"); const [s, o, c] = (0, t.birthdayPicker)({ day: r, month: n, year: d }, (t, r) => { (0, e.dispatch)((0, a.edit)(t, r)); }); return i.appendChild(s), i.appendChild(o), i.appendChild(c), i; }, c = t => { const r = document.createElement("button"); return r.innerText = "Save", r.addEventListener("click", () => { const { day: r, month: i, year: s } = t, o = __rest(t, ["day", "month", "year"]), c = Object.assign(Object.assign({ id: Math.random().toString(36).substring(10) }, o), { birthday: (0, d.createIso)(r, i, s) }); (0, e.dispatch)((0, a.save)(c)), (0, e.dispatch)((0, n.goToHome)()); }), r.classList.add("add-button--save"), r.setAttribute("data-cy", "add-button--save"), r; };
        }, { "/store/store.js": "sAcK", "/components/birthday-picker.js": "xAPr", "/person/person-actions.js": "EE7k", "/app/app-action.js": "AW4V", "/router/router-actions.js": "gdkB", "/utils/date.js": "ZbyX" }], "LLGg": [function (require, module, exports) {
            "use strict";
            Object.defineProperty(exports, "__esModule", { value: !0 }), exports.setup = void 0;
            var e = require("/store/store.js"), r = require("/data-provider/actions.js"), t = d(require("/login/login-view.js")), s = d(require("/header/header.js")), o = d(require("/person/persons-view.js")), i = d(require("/person/person-add.js")), a = require("/router/routes.js"), u = require("/router/router-actions.js"), p = require("/person/persons-model.js"), n = require("/app/app-action.js");
            function d(e) { return e && e.__esModule ? e : { default: e }; }
            const l = () => window.location.pathname.substring(1).split("/")[0], c = e => { e !== l() && history.pushState({}, "", e); }, h = d => { d.type === u.ACTIONS.go && c(d.payload); let h = []; switch (l()) {
                case a.ROUTES.login:
                    h.push((0, t.default)({ handleLoginClick: () => (0, e.dispatch)({ type: r.ACTIONS.LOGIN }) }));
                    break;
                case a.ROUTES.add:
                case a.ROUTES.edit:
                    h.push((0, s.default)(), (0, i.default)());
                    break;
                default: h = [(0, s.default)(), (0, o.default)((0, p.getProps)())];
            } const j = document.getElementById("app"); j.innerHTML = "", h.map(e => j.appendChild(e)); const f = (0, n.getActiveElement)(); f && f.focus(); }, j = () => { window.onpopstate = h, (0, e.subscribe)(h); };
            exports.setup = j;
        }, { "/store/store.js": "sAcK", "/data-provider/actions.js": "jROX", "/login/login-view.js": "iUZI", "/header/header.js": "oqER", "/person/persons-view.js": "zpKB", "/person/person-add.js": "gYcl", "/router/routes.js": "nySV", "/router/router-actions.js": "gdkB", "/person/persons-model.js": "KW1q", "/app/app-action.js": "AW4V" }], "Focm": [function (require, module, exports) {
            "use strict";
            Object.defineProperty(exports, "__esModule", { value: !0 }), exports.setup = void 0;
            var e = a(require("/data-provider/google-drive/google-drive-model.js")), r = require("/overlay.js"), t = require("/data-provider/data-provider.js"), o = require("/data-provider/actions.js"), i = s(require("/store/store.js")), n = require("/router/router.js");
            function u() { if ("function" != typeof WeakMap)
                return null; var e = new WeakMap; return u = function () { return e; }, e; }
            function s(e) { if (e && e.__esModule)
                return e; var r = u(); if (r && r.has(e))
                return r.get(e); var t = {}; if (null != e) {
                var o = Object.defineProperty && Object.getOwnPropertyDescriptor;
                for (var i in e)
                    if (Object.prototype.hasOwnProperty.call(e, i)) {
                        var n = o ? Object.getOwnPropertyDescriptor(e, i) : null;
                        n && (n.get || n.set) ? Object.defineProperty(t, i, n) : t[i] = e[i];
                    }
            } return t.default = e, r && r.set(e, t), t; }
            function a(e) { return e && e.__esModule ? e : { default: e }; }
            const p = () => { (0, t.fetchLib)(), (0, n.setup)(); };
            exports.setup = p, window.getState = i.getState, window.Cypress && (window.store = i);
        }, { "/data-provider/google-drive/google-drive-model.js": "oZ3E", "/overlay.js": "XLab", "/data-provider/data-provider.js": "JEGA", "/data-provider/actions.js": "jROX", "/store/store.js": "sAcK", "/router/router.js": "LLGg" }] }, {}, ["Focm"], "prs");
//# sourceMappingURL=/personas/src.bd3fff1e.js.map

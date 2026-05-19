/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise, SuppressedError, Symbol, Iterator */


function __decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}

typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
    var e = new Error(message);
    return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
};

/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t$2=globalThis,e$2=t$2.ShadowRoot&&(void 0===t$2.ShadyCSS||t$2.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,s$2=Symbol(),o$4=new WeakMap;let n$3 = class n{constructor(t,e,o){if(this._$cssResult$=true,o!==s$2)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e;}get styleSheet(){let t=this.o;const s=this.t;if(e$2&&void 0===t){const e=void 0!==s&&1===s.length;e&&(t=o$4.get(s)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),e&&o$4.set(s,t));}return t}toString(){return this.cssText}};const r$4=t=>new n$3("string"==typeof t?t:t+"",void 0,s$2),i$3=(t,...e)=>{const o=1===t.length?t[0]:e.reduce((e,s,o)=>e+(t=>{if(true===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+t[o+1],t[0]);return new n$3(o,t,s$2)},S$1=(s,o)=>{if(e$2)s.adoptedStyleSheets=o.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const e of o){const o=document.createElement("style"),n=t$2.litNonce;void 0!==n&&o.setAttribute("nonce",n),o.textContent=e.cssText,s.appendChild(o);}},c$2=e$2?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const s of t.cssRules)e+=s.cssText;return r$4(e)})(t):t;

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{is:i$2,defineProperty:e$1,getOwnPropertyDescriptor:h$1,getOwnPropertyNames:r$3,getOwnPropertySymbols:o$3,getPrototypeOf:n$2}=Object,a$1=globalThis,c$1=a$1.trustedTypes,l$1=c$1?c$1.emptyScript:"",p$1=a$1.reactiveElementPolyfillSupport,d$1=(t,s)=>t,u$1={toAttribute(t,s){switch(s){case Boolean:t=t?l$1:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t);}return t},fromAttribute(t,s){let i=t;switch(s){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t);}catch(t){i=null;}}return i}},f$1=(t,s)=>!i$2(t,s),b$1={attribute:true,type:String,converter:u$1,reflect:false,useDefault:false,hasChanged:f$1};Symbol.metadata??=Symbol("metadata"),a$1.litPropertyMetadata??=new WeakMap;let y$1 = class y extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t);}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,s=b$1){if(s.state&&(s.attribute=false),this._$Ei(),this.prototype.hasOwnProperty(t)&&((s=Object.create(s)).wrapped=true),this.elementProperties.set(t,s),!s.noAccessor){const i=Symbol(),h=this.getPropertyDescriptor(t,i,s);void 0!==h&&e$1(this.prototype,t,h);}}static getPropertyDescriptor(t,s,i){const{get:e,set:r}=h$1(this.prototype,t)??{get(){return this[s]},set(t){this[s]=t;}};return {get:e,set(s){const h=e?.call(this);r?.call(this,s),this.requestUpdate(t,h,i);},configurable:true,enumerable:true}}static getPropertyOptions(t){return this.elementProperties.get(t)??b$1}static _$Ei(){if(this.hasOwnProperty(d$1("elementProperties")))return;const t=n$2(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties);}static finalize(){if(this.hasOwnProperty(d$1("finalized")))return;if(this.finalized=true,this._$Ei(),this.hasOwnProperty(d$1("properties"))){const t=this.properties,s=[...r$3(t),...o$3(t)];for(const i of s)this.createProperty(i,t[i]);}const t=this[Symbol.metadata];if(null!==t){const s=litPropertyMetadata.get(t);if(void 0!==s)for(const[t,i]of s)this.elementProperties.set(t,i);}this._$Eh=new Map;for(const[t,s]of this.elementProperties){const i=this._$Eu(t,s);void 0!==i&&this._$Eh.set(i,t);}this.elementStyles=this.finalizeStyles(this.styles);}static finalizeStyles(s){const i=[];if(Array.isArray(s)){const e=new Set(s.flat(1/0).reverse());for(const s of e)i.unshift(c$2(s));}else void 0!==s&&i.push(c$2(s));return i}static _$Eu(t,s){const i=s.attribute;return  false===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=false,this.hasUpdated=false,this._$Em=null,this._$Ev();}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this));}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.();}removeController(t){this._$EO?.delete(t);}_$E_(){const t=new Map,s=this.constructor.elementProperties;for(const i of s.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t);}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return S$1(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(true),this._$EO?.forEach(t=>t.hostConnected?.());}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.());}attributeChangedCallback(t,s,i){this._$AK(t,i);}_$ET(t,s){const i=this.constructor.elementProperties.get(t),e=this.constructor._$Eu(t,i);if(void 0!==e&&true===i.reflect){const h=(void 0!==i.converter?.toAttribute?i.converter:u$1).toAttribute(s,i.type);this._$Em=t,null==h?this.removeAttribute(e):this.setAttribute(e,h),this._$Em=null;}}_$AK(t,s){const i=this.constructor,e=i._$Eh.get(t);if(void 0!==e&&this._$Em!==e){const t=i.getPropertyOptions(e),h="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:u$1;this._$Em=e;const r=h.fromAttribute(s,t.type);this[e]=r??this._$Ej?.get(e)??r,this._$Em=null;}}requestUpdate(t,s,i,e=false,h){if(void 0!==t){const r=this.constructor;if(false===e&&(h=this[t]),i??=r.getPropertyOptions(t),!((i.hasChanged??f$1)(h,s)||i.useDefault&&i.reflect&&h===this._$Ej?.get(t)&&!this.hasAttribute(r._$Eu(t,i))))return;this.C(t,s,i);} false===this.isUpdatePending&&(this._$ES=this._$EP());}C(t,s,{useDefault:i,reflect:e,wrapped:h},r){i&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,r??s??this[t]),true!==h||void 0!==r)||(this._$AL.has(t)||(this.hasUpdated||i||(s=void 0),this._$AL.set(t,s)),true===e&&this._$Em!==t&&(this._$Eq??=new Set).add(t));}async _$EP(){this.isUpdatePending=true;try{await this._$ES;}catch(t){Promise.reject(t);}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,s]of this._$Ep)this[t]=s;this._$Ep=void 0;}const t=this.constructor.elementProperties;if(t.size>0)for(const[s,i]of t){const{wrapped:t}=i,e=this[s];true!==t||this._$AL.has(s)||void 0===e||this.C(s,void 0,i,e);}}let t=false;const s=this._$AL;try{t=this.shouldUpdate(s),t?(this.willUpdate(s),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(s)):this._$EM();}catch(s){throw t=false,this._$EM(),s}t&&this._$AE(s);}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=true,this.firstUpdated(t)),this.updated(t);}_$EM(){this._$AL=new Map,this.isUpdatePending=false;}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return  true}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM();}updated(t){}firstUpdated(t){}};y$1.elementStyles=[],y$1.shadowRootOptions={mode:"open"},y$1[d$1("elementProperties")]=new Map,y$1[d$1("finalized")]=new Map,p$1?.({ReactiveElement:y$1}),(a$1.reactiveElementVersions??=[]).push("2.1.2");

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t$1=globalThis,i$1=t=>t,s$1=t$1.trustedTypes,e=s$1?s$1.createPolicy("lit-html",{createHTML:t=>t}):void 0,h="$lit$",o$2=`lit$${Math.random().toFixed(9).slice(2)}$`,n$1="?"+o$2,r$2=`<${n$1}>`,l=document,c=()=>l.createComment(""),a=t=>null===t||"object"!=typeof t&&"function"!=typeof t,u=Array.isArray,d=t=>u(t)||"function"==typeof t?.[Symbol.iterator],f="[ \t\n\f\r]",v=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,_=/-->/g,m=/>/g,p=RegExp(`>|${f}(?:([^\\s"'>=/]+)(${f}*=${f}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),g=/'/g,$=/"/g,y=/^(?:script|style|textarea|title)$/i,x=t=>(i,...s)=>({_$litType$:t,strings:i,values:s}),b=x(1),E=Symbol.for("lit-noChange"),A=Symbol.for("lit-nothing"),C=new WeakMap,P=l.createTreeWalker(l,129);function V(t,i){if(!u(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==e?e.createHTML(i):i}const N=(t,i)=>{const s=t.length-1,e=[];let n,l=2===i?"<svg>":3===i?"<math>":"",c=v;for(let i=0;i<s;i++){const s=t[i];let a,u,d=-1,f=0;for(;f<s.length&&(c.lastIndex=f,u=c.exec(s),null!==u);)f=c.lastIndex,c===v?"!--"===u[1]?c=_:void 0!==u[1]?c=m:void 0!==u[2]?(y.test(u[2])&&(n=RegExp("</"+u[2],"g")),c=p):void 0!==u[3]&&(c=p):c===p?">"===u[0]?(c=n??v,d=-1):void 0===u[1]?d=-2:(d=c.lastIndex-u[2].length,a=u[1],c=void 0===u[3]?p:'"'===u[3]?$:g):c===$||c===g?c=p:c===_||c===m?c=v:(c=p,n=void 0);const x=c===p&&t[i+1].startsWith("/>")?" ":"";l+=c===v?s+r$2:d>=0?(e.push(a),s.slice(0,d)+h+s.slice(d)+o$2+x):s+o$2+(-2===d?i:x);}return [V(t,l+(t[s]||"<?>")+(2===i?"</svg>":3===i?"</math>":"")),e]};class S{constructor({strings:t,_$litType$:i},e){let r;this.parts=[];let l=0,a=0;const u=t.length-1,d=this.parts,[f,v]=N(t,i);if(this.el=S.createElement(f,e),P.currentNode=this.el.content,2===i||3===i){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes);}for(;null!==(r=P.nextNode())&&d.length<u;){if(1===r.nodeType){if(r.hasAttributes())for(const t of r.getAttributeNames())if(t.endsWith(h)){const i=v[a++],s=r.getAttribute(t).split(o$2),e=/([.?@])?(.*)/.exec(i);d.push({type:1,index:l,name:e[2],strings:s,ctor:"."===e[1]?I:"?"===e[1]?L:"@"===e[1]?z:H}),r.removeAttribute(t);}else t.startsWith(o$2)&&(d.push({type:6,index:l}),r.removeAttribute(t));if(y.test(r.tagName)){const t=r.textContent.split(o$2),i=t.length-1;if(i>0){r.textContent=s$1?s$1.emptyScript:"";for(let s=0;s<i;s++)r.append(t[s],c()),P.nextNode(),d.push({type:2,index:++l});r.append(t[i],c());}}}else if(8===r.nodeType)if(r.data===n$1)d.push({type:2,index:l});else {let t=-1;for(;-1!==(t=r.data.indexOf(o$2,t+1));)d.push({type:7,index:l}),t+=o$2.length-1;}l++;}}static createElement(t,i){const s=l.createElement("template");return s.innerHTML=t,s}}function M(t,i,s=t,e){if(i===E)return i;let h=void 0!==e?s._$Co?.[e]:s._$Cl;const o=a(i)?void 0:i._$litDirective$;return h?.constructor!==o&&(h?._$AO?.(false),void 0===o?h=void 0:(h=new o(t),h._$AT(t,s,e)),void 0!==e?(s._$Co??=[])[e]=h:s._$Cl=h),void 0!==h&&(i=M(t,h._$AS(t,i.values),h,e)),i}class R{constructor(t,i){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=i;}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:i},parts:s}=this._$AD,e=(t?.creationScope??l).importNode(i,true);P.currentNode=e;let h=P.nextNode(),o=0,n=0,r=s[0];for(;void 0!==r;){if(o===r.index){let i;2===r.type?i=new k(h,h.nextSibling,this,t):1===r.type?i=new r.ctor(h,r.name,r.strings,this,t):6===r.type&&(i=new Z(h,this,t)),this._$AV.push(i),r=s[++n];}o!==r?.index&&(h=P.nextNode(),o++);}return P.currentNode=l,e}p(t){let i=0;for(const s of this._$AV) void 0!==s&&(void 0!==s.strings?(s._$AI(t,s,i),i+=s.strings.length-2):s._$AI(t[i])),i++;}}class k{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,i,s,e){this.type=2,this._$AH=A,this._$AN=void 0,this._$AA=t,this._$AB=i,this._$AM=s,this.options=e,this._$Cv=e?.isConnected??true;}get parentNode(){let t=this._$AA.parentNode;const i=this._$AM;return void 0!==i&&11===t?.nodeType&&(t=i.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,i=this){t=M(this,t,i),a(t)?t===A||null==t||""===t?(this._$AH!==A&&this._$AR(),this._$AH=A):t!==this._$AH&&t!==E&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):d(t)?this.k(t):this._(t);}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t));}_(t){this._$AH!==A&&a(this._$AH)?this._$AA.nextSibling.data=t:this.T(l.createTextNode(t)),this._$AH=t;}$(t){const{values:i,_$litType$:s}=t,e="number"==typeof s?this._$AC(t):(void 0===s.el&&(s.el=S.createElement(V(s.h,s.h[0]),this.options)),s);if(this._$AH?._$AD===e)this._$AH.p(i);else {const t=new R(e,this),s=t.u(this.options);t.p(i),this.T(s),this._$AH=t;}}_$AC(t){let i=C.get(t.strings);return void 0===i&&C.set(t.strings,i=new S(t)),i}k(t){u(this._$AH)||(this._$AH=[],this._$AR());const i=this._$AH;let s,e=0;for(const h of t)e===i.length?i.push(s=new k(this.O(c()),this.O(c()),this,this.options)):s=i[e],s._$AI(h),e++;e<i.length&&(this._$AR(s&&s._$AB.nextSibling,e),i.length=e);}_$AR(t=this._$AA.nextSibling,s){for(this._$AP?.(false,true,s);t!==this._$AB;){const s=i$1(t).nextSibling;i$1(t).remove(),t=s;}}setConnected(t){ void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t));}}class H{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,i,s,e,h){this.type=1,this._$AH=A,this._$AN=void 0,this.element=t,this.name=i,this._$AM=e,this.options=h,s.length>2||""!==s[0]||""!==s[1]?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=A;}_$AI(t,i=this,s,e){const h=this.strings;let o=false;if(void 0===h)t=M(this,t,i,0),o=!a(t)||t!==this._$AH&&t!==E,o&&(this._$AH=t);else {const e=t;let n,r;for(t=h[0],n=0;n<h.length-1;n++)r=M(this,e[s+n],i,n),r===E&&(r=this._$AH[n]),o||=!a(r)||r!==this._$AH[n],r===A?t=A:t!==A&&(t+=(r??"")+h[n+1]),this._$AH[n]=r;}o&&!e&&this.j(t);}j(t){t===A?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"");}}class I extends H{constructor(){super(...arguments),this.type=3;}j(t){this.element[this.name]=t===A?void 0:t;}}class L extends H{constructor(){super(...arguments),this.type=4;}j(t){this.element.toggleAttribute(this.name,!!t&&t!==A);}}class z extends H{constructor(t,i,s,e,h){super(t,i,s,e,h),this.type=5;}_$AI(t,i=this){if((t=M(this,t,i,0)??A)===E)return;const s=this._$AH,e=t===A&&s!==A||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,h=t!==A&&(s===A||e);e&&this.element.removeEventListener(this.name,this,s),h&&this.element.addEventListener(this.name,this,t),this._$AH=t;}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t);}}class Z{constructor(t,i,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=i,this.options=s;}get _$AU(){return this._$AM._$AU}_$AI(t){M(this,t);}}const B=t$1.litHtmlPolyfillSupport;B?.(S,k),(t$1.litHtmlVersions??=[]).push("3.3.2");const D=(t,i,s)=>{const e=s?.renderBefore??i;let h=e._$litPart$;if(void 0===h){const t=s?.renderBefore??null;e._$litPart$=h=new k(i.insertBefore(c(),t),t,void 0,s??{});}return h._$AI(t),h};

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const s=globalThis;class i extends y$1{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0;}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const r=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=D(r,this.renderRoot,this.renderOptions);}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(true);}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(false);}render(){return E}}i._$litElement$=true,i["finalized"]=true,s.litElementHydrateSupport?.({LitElement:i});const o$1=s.litElementPolyfillSupport;o$1?.({LitElement:i});(s.litElementVersions??=[]).push("4.2.2");

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t=t=>(e,o)=>{ void 0!==o?o.addInitializer(()=>{customElements.define(t,e);}):customElements.define(t,e);};

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const o={attribute:true,type:String,converter:u$1,reflect:false,hasChanged:f$1},r$1=(t=o,e,r)=>{const{kind:n,metadata:i}=r;let s=globalThis.litPropertyMetadata.get(i);if(void 0===s&&globalThis.litPropertyMetadata.set(i,s=new Map),"setter"===n&&((t=Object.create(t)).wrapped=true),s.set(r.name,t),"accessor"===n){const{name:o}=r;return {set(r){const n=e.get.call(this);e.set.call(this,r),this.requestUpdate(o,n,t,true,r);},init(e){return void 0!==e&&this.C(o,void 0,t,e),e}}}if("setter"===n){const{name:o}=r;return function(r){const n=this[o];e.call(this,r),this.requestUpdate(o,n,t,true,r);}}throw Error("Unsupported decorator location: "+n)};function n(t){return (e,o)=>"object"==typeof o?r$1(t,e,o):((t,e,o)=>{const r=e.hasOwnProperty(o);return e.constructor.createProperty(o,t),r?Object.getOwnPropertyDescriptor(e,o):void 0})(t,e,o)}

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function r(r){return n({...r,state:true,attribute:false})}

let MultiLightWheelCard = class MultiLightWheelCard extends i {
    constructor() {
        super(...arguments);
        this.markers = [];
        this.activeEntityId = null;
        this.activeEntityIds = [];
        this.expandedGroupId = null;
        this.brightnessExpanded = false;
        this.wheelMode = "color";
        this.wheelSize = 260;
        this.wheelRadius = 120;
        this.center = 130;
        this.groupDistancePx = 32;
        this.ignoreHassUpdatesUntil = 0;
    }
    setConfig(config) {
        if (!config.entities || !Array.isArray(config.entities)) {
            throw new Error("You need to define entities");
        }
        if (!config.entities.length) {
            throw new Error("You need to define at least one entity");
        }
        this.config = config;
    }
    updated(changedProps) {
        if (changedProps.has("hass")) {
            if (Date.now() < this.ignoreHassUpdatesUntil) {
                return;
            }
            this.updateMarkersFromEntities();
        }
    }
    pauseHassUpdates(ms = 900) {
        this.ignoreHassUpdatesUntil = Date.now() + ms;
    }
    getEntityId(entityConfig) {
        return typeof entityConfig === "string" ? entityConfig : entityConfig.entity;
    }
    getEntityIcon(entityConfig, stateObjIcon) {
        if (typeof entityConfig !== "string" && entityConfig.icon) {
            return entityConfig.icon;
        }
        if (this.config?.icon) {
            return this.config.icon;
        }
        return stateObjIcon ?? "mdi:lightbulb";
    }
    updateMarkersFromEntities() {
        if (!this.hass || !this.config?.entities)
            return;
        this.markers = this.config.entities
            .map((entityConfig) => {
            const entityId = this.getEntityId(entityConfig);
            const stateObj = this.hass.states[entityId];
            if (!stateObj)
                return null;
            const hs = stateObj.attributes.hs_color ?? [0, 0];
            const hue = Number(hs[0] ?? 0);
            const saturation = Number(hs[1] ?? 0);
            const brightness = Number(stateObj.attributes.brightness ?? 0);
            const colorTempKelvin = Number(stateObj.attributes.color_temp_kelvin ?? 0) || null;
            const minColorTempKelvin = Number(stateObj.attributes.min_color_temp_kelvin ??
                stateObj.attributes.min_mireds
                ? this.miredToKelvin(Number(stateObj.attributes.max_mireds))
                : 2000);
            const maxColorTempKelvin = Number(stateObj.attributes.max_color_temp_kelvin ??
                stateObj.attributes.max_mireds
                ? this.miredToKelvin(Number(stateObj.attributes.min_mireds))
                : 6500);
            const effectiveKelvin = colorTempKelvin ??
                Math.round((minColorTempKelvin + maxColorTempKelvin) / 2);
            const position = this.wheelMode === "white"
                ? this.kelvinToPosition(effectiveKelvin, minColorTempKelvin, maxColorTempKelvin)
                : this.hsToPosition(hue, saturation);
            return {
                entityId,
                name: stateObj.attributes.friendly_name ?? entityId,
                icon: this.getEntityIcon(entityConfig, stateObj.attributes.icon),
                hue,
                saturation,
                brightness,
                colorTempKelvin,
                minColorTempKelvin,
                maxColorTempKelvin,
                x: position.x,
                y: position.y,
                color: this.wheelMode === "white"
                    ? this.kelvinToCssColor(effectiveKelvin)
                    : `hsl(${hue}, ${saturation}%, 50%)`,
                state: stateObj.state,
            };
        })
            .filter(Boolean);
    }
    miredToKelvin(mired) {
        if (!mired)
            return 0;
        return Math.round(1000000 / mired);
    }
    hsToPosition(hue, saturation) {
        const angle = ((hue - 90) * Math.PI) / 180;
        const radius = (saturation / 100) * this.wheelRadius;
        return {
            x: this.center + radius * Math.cos(angle),
            y: this.center + radius * Math.sin(angle),
        };
    }
    positionToHs(clientX, clientY, rect) {
        const x = clientX - rect.left - this.center;
        const y = clientY - rect.top - this.center;
        const distance = Math.sqrt(x * x + y * y);
        const clampedDistance = Math.min(distance, this.wheelRadius);
        let hue = (Math.atan2(y, x) * 180) / Math.PI + 90;
        if (hue < 0) {
            hue += 360;
        }
        if (hue >= 360) {
            hue -= 360;
        }
        return {
            hue: Math.round(hue),
            saturation: Math.round((clampedDistance / this.wheelRadius) * 100),
        };
    }
    kelvinToPosition(kelvin, minKelvin, maxKelvin) {
        const safeMin = minKelvin || 2000;
        const safeMax = maxKelvin || 6500;
        const safeKelvin = this.clamp(kelvin, safeMin, safeMax);
        const ratio = (safeKelvin - safeMin) / (safeMax - safeMin);
        const x = this.center - this.wheelRadius + ratio * this.wheelRadius * 2;
        return {
            x,
            y: this.center,
        };
    }
    positionToKelvin(clientX, rect, minKelvin, maxKelvin) {
        const safeMin = minKelvin || 2000;
        const safeMax = maxKelvin || 6500;
        const relativeX = clientX - rect.left;
        const left = this.center - this.wheelRadius;
        const right = this.center + this.wheelRadius;
        const clampedX = this.clamp(relativeX, left, right);
        const ratio = (clampedX - left) / (right - left);
        return Math.round(safeMin + ratio * (safeMax - safeMin));
    }
    kelvinToCssColor(kelvin) {
        if (kelvin <= 2300)
            return "rgb(255, 168, 82)";
        if (kelvin <= 2700)
            return "rgb(255, 190, 115)";
        if (kelvin <= 3500)
            return "rgb(255, 220, 165)";
        if (kelvin <= 4500)
            return "rgb(255, 244, 220)";
        if (kelvin <= 5500)
            return "rgb(230, 242, 255)";
        return "rgb(200, 225, 255)";
    }
    clamp(value, min, max) {
        return Math.max(min, Math.min(max, value));
    }
    getMarkerGroups() {
        const groups = [];
        for (const marker of this.markers) {
            const existingGroup = groups.find((group) => {
                const dx = group.x - marker.x;
                const dy = group.y - marker.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                return distance <= this.groupDistancePx;
            });
            if (existingGroup) {
                existingGroup.markers.push(marker);
                existingGroup.entityIds.push(marker.entityId);
                existingGroup.count = existingGroup.markers.length;
                existingGroup.x =
                    existingGroup.markers.reduce((sum, item) => sum + item.x, 0) /
                        existingGroup.count;
                existingGroup.y =
                    existingGroup.markers.reduce((sum, item) => sum + item.y, 0) /
                        existingGroup.count;
                existingGroup.hue =
                    existingGroup.markers.reduce((sum, item) => sum + item.hue, 0) /
                        existingGroup.count;
                existingGroup.saturation =
                    existingGroup.markers.reduce((sum, item) => sum + item.saturation, 0) /
                        existingGroup.count;
                existingGroup.color =
                    this.wheelMode === "white"
                        ? this.kelvinToCssColor(existingGroup.markers.reduce((sum, item) => sum +
                            (item.colorTempKelvin ??
                                Math.round((item.minColorTempKelvin + item.maxColorTempKelvin) / 2)), 0) / existingGroup.count)
                        : `hsl(${existingGroup.hue}, ${existingGroup.saturation}%, 50%)`;
            }
            else {
                groups.push({
                    id: marker.entityId,
                    markers: [marker],
                    entityIds: [marker.entityId],
                    x: marker.x,
                    y: marker.y,
                    hue: marker.hue,
                    saturation: marker.saturation,
                    color: marker.color,
                    count: 1,
                });
            }
        }
        return groups;
    }
    isGroupActive(group) {
        if (this.activeEntityIds.length) {
            return group.entityIds.some((entityId) => this.activeEntityIds.includes(entityId));
        }
        if (!this.activeEntityId)
            return false;
        return group.entityIds.includes(this.activeEntityId);
    }
    isEntitySelected(entityId) {
        if (this.activeEntityIds.length) {
            return this.activeEntityIds.includes(entityId);
        }
        return this.activeEntityId === entityId;
    }
    toggleExpandedGroup(group) {
        if (group.count <= 1)
            return;
        this.expandedGroupId = this.expandedGroupId === group.id ? null : group.id;
    }
    getExpandedMarkerPosition(group, index) {
        const total = group.markers.length;
        const angle = (2 * Math.PI * index) / total - Math.PI / 2;
        const distance = 38;
        return {
            x: group.x + Math.cos(angle) * distance,
            y: group.y + Math.sin(angle) * distance,
        };
    }
    updateMarkersLocally(entityIds, hue, saturation) {
        this.markers = this.markers.map((marker) => {
            if (!entityIds.includes(marker.entityId))
                return marker;
            const position = this.hsToPosition(hue, saturation);
            return {
                ...marker,
                hue,
                saturation,
                x: position.x,
                y: position.y,
                color: `hsl(${hue}, ${saturation}%, 50%)`,
                state: "on",
            };
        });
    }
    updateWhiteMarkersLocally(entityIds, kelvin) {
        this.markers = this.markers.map((marker) => {
            if (!entityIds.includes(marker.entityId))
                return marker;
            const safeKelvin = this.clamp(kelvin, marker.minColorTempKelvin, marker.maxColorTempKelvin);
            const position = this.kelvinToPosition(safeKelvin, marker.minColorTempKelvin, marker.maxColorTempKelvin);
            return {
                ...marker,
                colorTempKelvin: safeKelvin,
                x: position.x,
                y: position.y,
                color: this.kelvinToCssColor(safeKelvin),
                state: "on",
            };
        });
    }
    async setLightColor(entityIds, hue, saturation) {
        await this.hass.callService("light", "turn_on", {
            entity_id: entityIds,
            hs_color: [hue, saturation],
        });
    }
    async setLightWhiteTemperature(entityIds, kelvin) {
        await this.hass.callService("light", "turn_on", {
            entity_id: entityIds,
            color_temp_kelvin: kelvin,
        });
    }
    async toggleLight(entityId) {
        await this.hass.callService("light", "toggle", {
            entity_id: entityId,
        });
    }
    getSelectedEntityIds() {
        if (this.activeEntityIds.length) {
            return this.activeEntityIds;
        }
        if (this.activeEntityId) {
            return [this.activeEntityId];
        }
        return this.markers.map((marker) => marker.entityId);
    }
    getSelectedBrightness() {
        const selectedIds = this.getSelectedEntityIds();
        const selectedMarkers = this.markers.filter((marker) => selectedIds.includes(marker.entityId));
        if (!selectedMarkers.length)
            return 100;
        const averageBrightness = selectedMarkers.reduce((sum, marker) => sum + marker.brightness, 0) /
            selectedMarkers.length;
        return Math.round((averageBrightness / 255) * 100);
    }
    setSelectedBrightnessLocally(value) {
        this.pauseHassUpdates();
        const selectedIds = this.getSelectedEntityIds();
        const brightness = Math.round((value / 100) * 255);
        this.markers = this.markers.map((marker) => {
            if (!selectedIds.includes(marker.entityId))
                return marker;
            return {
                ...marker,
                brightness,
                state: "on",
            };
        });
    }
    async setSelectedBrightness(value) {
        const selectedIds = this.getSelectedEntityIds();
        const brightness = Math.round((value / 100) * 255);
        this.pauseHassUpdates(1400);
        this.setSelectedBrightnessLocally(value);
        await this.hass.callService("light", "turn_on", {
            entity_id: selectedIds,
            brightness,
        });
        this.pauseHassUpdates(500);
    }
    getBrightnessFromPointer(clientY, rect) {
        const relativeY = clientY - rect.top;
        const ratio = 1 - relativeY / rect.height;
        const clampedRatio = Math.max(0.01, Math.min(1, ratio));
        return Math.round(clampedRatio * 100);
    }
    onBrightnessPointerDown(event) {
        event.preventDefault();
        event.stopPropagation();
        this.brightnessExpanded = true;
        const target = event.currentTarget;
        const rect = target.getBoundingClientRect();
        const applyFromPointer = (clientY, commit) => {
            const value = this.getBrightnessFromPointer(clientY, rect);
            this.setSelectedBrightnessLocally(value);
            if (commit) {
                void this.setSelectedBrightness(value);
            }
        };
        applyFromPointer(event.clientY, false);
        const move = (moveEvent) => {
            applyFromPointer(moveEvent.clientY, false);
        };
        const up = (upEvent) => {
            window.removeEventListener("pointermove", move);
            window.removeEventListener("pointerup", up);
            applyFromPointer(upEvent.clientY, true);
        };
        window.addEventListener("pointermove", move);
        window.addEventListener("pointerup", up);
    }
    toggleBrightnessExpanded(event) {
        event.preventDefault();
        event.stopPropagation();
        this.brightnessExpanded = !this.brightnessExpanded;
    }
    toggleWheelMode() {
        this.wheelMode = this.wheelMode === "color" ? "white" : "color";
        this.expandedGroupId = null;
        this.brightnessExpanded = false;
        this.updateMarkersFromEntities();
    }
    onMarkerGroupPointerDown(event, group) {
        event.preventDefault();
        event.stopPropagation();
        this.activeEntityId = group.entityIds[0];
        this.activeEntityIds = [...group.entityIds];
        this.expandedGroupId = null;
        this.brightnessExpanded = false;
        const wheel = this.shadowRoot?.querySelector(".wheel");
        if (!wheel)
            return;
        const rect = wheel.getBoundingClientRect();
        const move = (moveEvent) => {
            this.pauseHassUpdates();
            if (this.wheelMode === "white") {
                const firstMarker = group.markers[0];
                const kelvin = this.positionToKelvin(moveEvent.clientX, rect, firstMarker.minColorTempKelvin, firstMarker.maxColorTempKelvin);
                this.updateWhiteMarkersLocally(group.entityIds, kelvin);
                return;
            }
            const { hue, saturation } = this.positionToHs(moveEvent.clientX, moveEvent.clientY, rect);
            this.updateMarkersLocally(group.entityIds, hue, saturation);
        };
        const up = async (upEvent) => {
            window.removeEventListener("pointermove", move);
            window.removeEventListener("pointerup", up);
            this.pauseHassUpdates(1400);
            if (this.wheelMode === "white") {
                const firstMarker = group.markers[0];
                const kelvin = this.positionToKelvin(upEvent.clientX, rect, firstMarker.minColorTempKelvin, firstMarker.maxColorTempKelvin);
                this.updateWhiteMarkersLocally(group.entityIds, kelvin);
                await this.setLightWhiteTemperature(group.entityIds, kelvin);
                this.pauseHassUpdates(500);
                return;
            }
            const { hue, saturation } = this.positionToHs(upEvent.clientX, upEvent.clientY, rect);
            this.updateMarkersLocally(group.entityIds, hue, saturation);
            await this.setLightColor(group.entityIds, hue, saturation);
            this.pauseHassUpdates(500);
        };
        window.addEventListener("pointermove", move);
        window.addEventListener("pointerup", up);
    }
    onSingleMarkerPointerDown(event, marker) {
        event.preventDefault();
        event.stopPropagation();
        this.activeEntityId = marker.entityId;
        this.activeEntityIds = [marker.entityId];
        this.brightnessExpanded = false;
        const wheel = this.shadowRoot?.querySelector(".wheel");
        if (!wheel)
            return;
        const rect = wheel.getBoundingClientRect();
        const move = (moveEvent) => {
            this.pauseHassUpdates();
            if (this.wheelMode === "white") {
                const kelvin = this.positionToKelvin(moveEvent.clientX, rect, marker.minColorTempKelvin, marker.maxColorTempKelvin);
                this.updateWhiteMarkersLocally([marker.entityId], kelvin);
                return;
            }
            const { hue, saturation } = this.positionToHs(moveEvent.clientX, moveEvent.clientY, rect);
            this.updateMarkersLocally([marker.entityId], hue, saturation);
        };
        const up = async (upEvent) => {
            window.removeEventListener("pointermove", move);
            window.removeEventListener("pointerup", up);
            this.pauseHassUpdates(1400);
            if (this.wheelMode === "white") {
                const kelvin = this.positionToKelvin(upEvent.clientX, rect, marker.minColorTempKelvin, marker.maxColorTempKelvin);
                this.updateWhiteMarkersLocally([marker.entityId], kelvin);
                await this.setLightWhiteTemperature([marker.entityId], kelvin);
                this.pauseHassUpdates(500);
                this.expandedGroupId = null;
                return;
            }
            const { hue, saturation } = this.positionToHs(upEvent.clientX, upEvent.clientY, rect);
            this.updateMarkersLocally([marker.entityId], hue, saturation);
            await this.setLightColor([marker.entityId], hue, saturation);
            this.pauseHassUpdates(500);
            this.expandedGroupId = null;
        };
        window.addEventListener("pointermove", move);
        window.addEventListener("pointerup", up);
    }
    selectGroup(group) {
        this.activeEntityId = group.entityIds[0];
        this.activeEntityIds = [...group.entityIds];
        this.brightnessExpanded = false;
    }
    selectSingleEntity(entityId) {
        this.activeEntityId = entityId;
        this.activeEntityIds = [entityId];
        this.brightnessExpanded = false;
    }
    getShortName(name) {
        return name
            .replace("Hue jardin luces ", "")
            .replace("Hue Jardín Luces ", "")
            .replace("hue_jardin_luces_", "")
            .trim();
    }
    render() {
        if (!this.config)
            return b ``;
        const markerGroups = this.getMarkerGroups();
        const selectedBrightness = this.getSelectedBrightness();
        return b `
      <ha-card>
        <div class="card">
          ${this.config.title
            ? b `<div class="title">${this.config.title}</div>`
            : null}

          <div class="wheel-control-row">
            <div class="mode-side">
              <button
                class=${this.wheelMode === "color"
            ? "mode-button color"
            : "mode-button white"}
                @click=${() => this.toggleWheelMode()}
              >
                <span class="mode-icon">
                  ${this.wheelMode === "color" ? "🎨" : "☀"}
                </span>
                <span class="mode-label">
                  ${this.wheelMode === "color" ? "Color" : "White"}
                </span>
              </button>
            </div>

            <div class="wheel-wrapper">
              <div
                class=${this.wheelMode === "white"
            ? "wheel white-wheel"
            : "wheel color-wheel"}
                style="width:${this.wheelSize}px; height:${this.wheelSize}px;"
                @click=${() => {
            this.expandedGroupId = null;
            this.brightnessExpanded = false;
        }}
              >
                ${markerGroups.map((group) => {
            const isExpanded = this.expandedGroupId === group.id;
            return b `
                    <div
                      class=${this.isGroupActive(group)
                ? group.count > 1
                    ? "marker group active"
                    : "marker active"
                : group.count > 1
                    ? "marker group"
                    : "marker"}
                      style="
                        left: ${group.x}px;
                        top: ${group.y}px;
                        background: ${group.color};
                      "
                      title=${group.markers.map((marker) => marker.name).join(", ")}
                      @click=${(ev) => {
                ev.stopPropagation();
                this.selectGroup(group);
                this.toggleExpandedGroup(group);
            }}
                      @pointerdown=${(ev) => {
                if (group.count > 1 && this.expandedGroupId === group.id) {
                    this.onMarkerGroupPointerDown(ev, group);
                    return;
                }
                if (group.count > 1) {
                    return;
                }
                this.onMarkerGroupPointerDown(ev, group);
            }}
                    >
                      ${group.count > 1
                ? b `<span class="group-count">${group.count}</span>`
                : ""}
                    </div>

                    ${isExpanded && group.count > 1
                ? group.markers.map((marker, index) => {
                    const position = this.getExpandedMarkerPosition(group, index);
                    return b `
                            <div
                              class=${this.isEntitySelected(marker.entityId)
                        ? "marker expanded-single selected-single"
                        : "marker expanded-single"}
                              style="
                                left: ${position.x}px;
                                top: ${position.y}px;
                                background: ${marker.color};
                              "
                              title=${marker.name}
                              @pointerdown=${(ev) => this.onSingleMarkerPointerDown(ev, marker)}
                            ></div>
                          `;
                })
                : ""}
                  `;
        })}
              </div>
            </div>

            <div
              class=${this.brightnessExpanded
            ? "brightness-side expanded"
            : "brightness-side"}
            >
              <div class="brightness-value">${selectedBrightness} %</div>

              <div
                class=${this.brightnessExpanded
            ? "brightness-control expanded"
            : "brightness-control"}
                @click=${(ev) => this.toggleBrightnessExpanded(ev)}
                @pointerdown=${(ev) => {
            if (this.brightnessExpanded) {
                this.onBrightnessPointerDown(ev);
            }
        }}
              >
                <div
                  class="brightness-fill"
                  style="height: ${selectedBrightness}%;"
                ></div>

                <div class="brightness-icon">☼</div>
              </div>
            </div>
          </div>

          <div class="lights-row">
            ${this.markers.map((marker) => b `
                <button
                  class=${this.isEntitySelected(marker.entityId)
            ? "light-tile selected"
            : "light-tile"}
                  style=${marker.state === "on"
            ? `
                      --tile-color: ${marker.color};
                      background:
                        linear-gradient(
                          135deg,
                          color-mix(in srgb, var(--tile-color) 78%, white 10%),
                          color-mix(in srgb, var(--tile-color) 55%, black 18%)
                        );
                    `
            : `
                      --tile-color: rgba(255, 255, 255, 0.08);
                      background: rgba(255, 255, 255, 0.08);
                    `}
                  @click=${() => {
            this.selectSingleEntity(marker.entityId);
        }}
                  @dblclick=${() => this.toggleLight(marker.entityId)}
                >
                  <ha-icon
                    class=${marker.state === "on" ? "tile-icon on" : "tile-icon off"}
                    .icon=${marker.icon}
                    style=${marker.state === "on"
            ? `color: ${marker.color};`
            : "color: rgba(255, 255, 255, 0.45);"}
                  ></ha-icon>

                  <div class="name">${this.getShortName(marker.name)}</div>

                  <div class="brightness">
                    ${marker.state === "on"
            ? `${Math.round((marker.brightness / 255) * 100)} %`
            : "Off"}
                  </div>
                </button>
              `)}
          </div>
        </div>
      </ha-card>
    `;
    }
};
MultiLightWheelCard.styles = i$3 `
    .card {
      padding: 16px;
      background: var(--ha-card-background, var(--card-background-color));
      color: var(--primary-text-color);
      overflow: hidden;
    }

    .title {
      font-size: 20px;
      font-weight: 500;
      margin-bottom: 16px;
    }

    .wheel-control-row {
      display: grid;
      grid-template-columns: 76px 1fr 90px;
      align-items: center;
      gap: 18px;
      margin-bottom: 18px;
    }

    .mode-side {
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .mode-button {
      width: 66px;
      min-height: 68px;
      border: none;
      border-radius: 18px;
      background: rgba(255, 255, 255, 0.08);
      color: var(--primary-text-color);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 6px;
      cursor: pointer;
      box-shadow:
        inset 0 0 0 1px rgba(255, 255, 255, 0.08),
        0 4px 12px rgba(0, 0, 0, 0.22);
    }

    .mode-button.color {
      background:
        linear-gradient(
          135deg,
          rgba(255, 0, 120, 0.22),
          rgba(0, 160, 255, 0.22)
        );
    }

    .mode-button.white {
      background:
        linear-gradient(
          135deg,
          rgba(255, 185, 90, 0.28),
          rgba(205, 225, 255, 0.28)
        );
    }

    .mode-icon {
      font-size: 22px;
      line-height: 1;
    }

    .mode-label {
      font-size: 12px;
      opacity: 0.85;
    }

    .wheel-wrapper {
      display: flex;
      justify-content: center;
    }

    .wheel {
      position: relative;
      border-radius: 50%;
      touch-action: none;
      box-shadow:
        inset 0 0 24px rgba(0, 0, 0, 0.25),
        0 6px 18px rgba(0, 0, 0, 0.35);
    }

    .color-wheel {
      background:
        radial-gradient(circle, white 0%, transparent 65%),
        conic-gradient(red, yellow, lime, cyan, blue, magenta, red);
    }

    .white-wheel {
      background:
        radial-gradient(
          circle,
          rgba(255, 255, 255, 0.95) 0%,
          rgba(255, 255, 255, 0.35) 42%,
          transparent 70%
        ),
        linear-gradient(
          90deg,
          rgb(255, 170, 80),
          rgb(255, 245, 210),
          rgb(190, 220, 255)
        );
    }

    .brightness-side {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      min-width: 80px;
    }

    .brightness-value {
      font-size: 14px;
      font-weight: 500;
      margin-bottom: 8px;
      color: var(--primary-text-color);
      background: rgba(0, 0, 0, 0.25);
      padding: 3px 8px;
      border-radius: 999px;
      min-width: 42px;
      text-align: center;
    }

    .brightness-control {
      position: relative;
      width: 72px;
      height: 44px;
      border-radius: 999px;
      background: rgba(70, 70, 70, 0.75);
      box-shadow:
        inset 0 0 12px rgba(0, 0, 0, 0.22),
        0 4px 12px rgba(0, 0, 0, 0.28);
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
      cursor: pointer;
      touch-action: none;
      transition:
        width 160ms ease,
        height 160ms ease,
        border-radius 160ms ease;
    }

    .brightness-control.expanded {
      width: 82px;
      height: 220px;
      border-radius: 28px;
      align-items: flex-end;
    }

    .brightness-fill {
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      height: 100%;
      background: rgba(245, 245, 245, 0.9);
      pointer-events: none;
    }

    .brightness-icon {
      position: relative;
      z-index: 2;
      width: 26px;
      height: 26px;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.92);
      color: rgba(60, 60, 60, 0.85);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 18px;
      box-shadow:
        0 1px 4px rgba(0, 0, 0, 0.35),
        inset 0 0 4px rgba(255, 255, 255, 0.6);
      pointer-events: none;
      margin-bottom: 10px;
    }

    .brightness-control:not(.expanded) .brightness-icon {
      margin-bottom: 0;
    }

    .marker {
      position: absolute;
      width: 22px;
      height: 22px;
      border-radius: 50%;
      transform: translate(-50%, -50%);
      border: 2px solid white;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.45);
      cursor: grab;
      z-index: 2;
      box-sizing: border-box;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #222;
      font-size: 13px;
      font-weight: 700;
      user-select: none;
    }

    .marker.active {
      width: 38px;
      height: 38px;
      border: 3px solid white;
      z-index: 7;
      border-radius: 50% 50% 50% 8px;
      transform: translate(-50%, -50%) rotate(-45deg);
      box-shadow:
        0 0 0 3px rgba(255, 255, 255, 0.35),
        0 6px 16px rgba(0, 0, 0, 0.5);
    }

    .marker.group {
      width: 46px;
      height: 46px;
      border-radius: 50% 50% 50% 8px;
      transform: translate(-50%, -50%) rotate(-45deg);
      font-size: 15px;
      z-index: 4;
      color: #1f1f1f;
    }

    .marker.group.active {
      width: 52px;
      height: 52px;
      border: 3px solid white;
      z-index: 6;
    }

    .group-count {
      transform: rotate(45deg);
      display: inline-flex;
      align-items: center;
      justify-content: center;
    }

    .marker.expanded-single {
      width: 24px;
      height: 24px;
      border: 2px solid white;
      z-index: 10;
      box-shadow:
        0 0 0 3px rgba(255, 255, 255, 0.25),
        0 4px 10px rgba(0, 0, 0, 0.45);
    }
    
    .marker.expanded-single.selected-single {
      width: 38px;
      height: 38px;
      border: 3px solid white;
      border-radius: 50% 50% 50% 8px;
      transform: translate(-50%, -50%) rotate(-45deg);
      z-index: 14;
      box-shadow:
        0 0 0 3px rgba(255, 255, 255, 0.4),
        0 0 0 7px color-mix(in srgb, var(--primary-color) 60%, transparent),
        0 8px 18px rgba(0, 0, 0, 0.55);
    }

    .marker:active {
      cursor: grabbing;
    }

    .marker:not(.group):not(.active):active {
      transform: translate(-50%, -50%) scale(1.12);
    }

    .marker.active:not(.group):active {
      transform: translate(-50%, -50%) rotate(-45deg) scale(1.08);
    }

    .marker.group.active {
      width: 56px;
      height: 56px;
      border: 3px solid white;
      z-index: 8;
      box-shadow:
        0 0 0 4px rgba(255, 255, 255, 0.35),
        0 8px 18px rgba(0, 0, 0, 0.55);
    }

    .marker.expanded-single:not(.selected-single):active {
      transform: translate(-50%, -50%) scale(1.18);
    }

    .marker.expanded-single.selected-single:active {
      transform: translate(-50%, -50%) rotate(-45deg) scale(1.08);
    }

    .lights-row {
      display: grid;
      grid-template-columns: repeat(4, minmax(80px, 1fr));
      grid-auto-rows: 105px;
      gap: 10px;
      max-height: calc(105px * 2 + 18px);
      overflow-y: auto;
      padding-bottom: 6px;
    }

    .light-tile {
      min-width: 0;
      height: 105px;
      border: none;
      border-radius: 20px;
      background: rgba(255, 255, 255, 0.08);
      color: var(--primary-text-color);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 9px;
      text-align: center;
      font-size: 13px;
      cursor: pointer;
      padding: 8px;
      box-sizing: border-box;
      text-shadow: 0 1px 3px rgba(0, 0, 0, 0.45);
       transition:
        background 180ms ease,
        box-shadow 180ms ease,
        transform 120ms ease;
    }

    .light-tile.selected {
      outline: none;
      box-shadow:
        inset 0 0 0 2px rgba(255, 255, 255, 0.92),
        inset 0 0 0 6px color-mix(in srgb, var(--primary-color) 80%, transparent),
        0 6px 14px rgba(0, 0, 0, 0.34);
    }
    
    .light-tile:active {
      transform: scale(0.98);
    }

    .tile-icon {
      --mdc-icon-size: 30px;
      width: 34px;
      height: 34px;
      display: flex;
      align-items: center;
      justify-content: center;
      filter: drop-shadow(0 2px 5px rgba(0, 0, 0, 0.45));
    }

    .tile-icon.on {
      opacity: 1;
    }

    .tile-icon.off {
      opacity: 0.45;
      filter: none;
    }

    .name {
      max-width: 100%;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      font-weight: 500;
    }

    .brightness {
      font-size: 12px;
      opacity: 0.75;
    }

    @media (max-width: 500px) {
      .lights-row {
        grid-template-columns: repeat(3, minmax(80px, 1fr));
      }

      .wheel-control-row {
        grid-template-columns: 1fr;
        gap: 12px;
      }

      .mode-side {
        order: 1;
      }

      .wheel-wrapper {
        order: 2;
      }

      .brightness-side {
        order: 3;
        flex-direction: column;
        gap: 6px;
      }
    }
  `;
__decorate([
    n({ attribute: false })
], MultiLightWheelCard.prototype, "hass", void 0);
__decorate([
    r()
], MultiLightWheelCard.prototype, "config", void 0);
__decorate([
    r()
], MultiLightWheelCard.prototype, "markers", void 0);
__decorate([
    r()
], MultiLightWheelCard.prototype, "activeEntityId", void 0);
__decorate([
    r()
], MultiLightWheelCard.prototype, "activeEntityIds", void 0);
__decorate([
    r()
], MultiLightWheelCard.prototype, "expandedGroupId", void 0);
__decorate([
    r()
], MultiLightWheelCard.prototype, "brightnessExpanded", void 0);
__decorate([
    r()
], MultiLightWheelCard.prototype, "wheelMode", void 0);
MultiLightWheelCard = __decorate([
    t("multi-light-wheel-card")
], MultiLightWheelCard);

export { MultiLightWheelCard };

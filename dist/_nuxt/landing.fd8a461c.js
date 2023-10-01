import{ar as Me,ax as Ne,aG as Ve,aq as Le,aI as Ae,aP as je,aQ as Te,d as te,r as C,h as F,p as we,k as pe,L as T,F as V,i as fe,j as $e,l as ve,o as h,b as $,u,aR as K,D as R,aS as me,aT as qe,a as o,e as z,v as W,f as le,t as S,z as M,w as O,c as J,aU as Ie,aV as Ge,g as G,aW as ye,s as He,A as Ue,C as Ze,m as Re,a8 as De}from"./entry.e9b1aae4.js";import _e from"./Icon.ccd39237.js";import{_ as Ke}from"./nuxt-link.730a58df.js";import{u as N}from"./state.ffd18573.js";import{_ as We}from"./_plugin-vue_export-helper.c27b6911.js";import{i as Je,a as be,b as se,c as Qe,d as Ye,e as Xe,f as et,u as oe}from"./theme.e8421f41.js";import{m as he,o as d,E as ge,u as U,c as tt,l as Z,V as ot,d as nt,e as at,y as st,w as lt,f as rt,H as ne,t as H,b as it,n as ke,g as re,i as ie,p as Se,N as ee,P as I,j as A,a as q,k as j,T as ue,U as ut,h as ct,G as dt,q as pt,r as ft,S as vt}from"./XMarkIcon.a9259bd0.js";import{_ as ce}from"./lodash.8fd0f79c.js";import{_ as mt}from"./ContentRendererMarkdown.vue.6f750ced.js";import{_ as _t}from"./client-only.0b725bae.js";import{p as ht}from"./highlighter.c894814d.js";import"./index.288f722b.js";import"./index.749539fc.js";import"./preview.0ed70a73.js";import"./node.9aff2161.js";function xe(n,e,r){if(!Me(r))return!1;var l=typeof e;return(l=="number"?Ne(r)&&Je(e,r.length):l=="string"&&e in r)?Ve(r[e],n):!1}function gt(n,e){var r=n.length;for(n.sort(e);r--;)n[r]=n[r].value;return n}function yt(n,e){if(n!==e){var r=n!==void 0,l=n===null,s=n===n,t=be(n),a=e!==void 0,i=e===null,f=e===e,v=be(e);if(!i&&!v&&!t&&n>e||t&&a&&f&&!i&&!v||l&&a&&f||!r&&f||!s)return 1;if(!l&&!t&&!v&&n<e||v&&r&&s&&!l&&!t||i&&r&&s||!a&&s||!f)return-1}return 0}function bt(n,e,r){for(var l=-1,s=n.criteria,t=e.criteria,a=s.length,i=r.length;++l<a;){var f=yt(s[l],t[l]);if(f){if(l>=i)return f;var v=r[l];return f*(v=="desc"?-1:1)}}return n.index-e.index}function xt(n,e,r){e.length?e=se(e,function(t){return Le(t)?function(a){return Qe(a,t.length===1?t[0]:t)}:t}):e=[Ae];var l=-1;e=se(e,Ye(et));var s=Xe(n,function(t,a,i){var f=se(e,function(v){return v(t)});return{criteria:f,index:++l,value:t}});return gt(s,function(t,a){return bt(t,a,r)})}var wt=je(function(n,e){if(n==null)return[];var r=e.length;return r>1&&xe(n,e[0],e[1])?e=[]:r>2&&xe(e[0],e[1],e[2])&&(e=[e[0]]),xt(n,Te(e,1),[])});const de=wt;var $t=(n=>(n[n.Open=0]="Open",n[n.Closed=1]="Closed",n))($t||{});let Pe=Symbol("PopoverContext");function ae(n){let e=ve(Pe,null);if(e===null){let r=new Error(`<${n} /> is missing a parent <${Be.name} /> component.`);throw Error.captureStackTrace&&Error.captureStackTrace(r,ae),r}return e}let kt=Symbol("PopoverGroupContext");function ze(){return ve(kt,null)}let Ce=Symbol("PopoverPanelContext");function St(){return ve(Ce,null)}let Be=te({name:"Popover",inheritAttrs:!1,props:{as:{type:[Object,String],default:"div"}},setup(n,{slots:e,attrs:r,expose:l}){var s;let t=C(null);l({el:t,$el:t});let a=C(1),i=C(null),f=C(null),v=C(null),g=C(null),_=F(()=>he(t)),L=F(()=>{var c,m;if(!d(i)||!d(g))return!1;for(let X of document.querySelectorAll("body > *"))if(Number(X==null?void 0:X.contains(d(i)))^Number(X==null?void 0:X.contains(d(g))))return!0;let b=ge(),B=b.indexOf(d(i)),Y=(B+b.length-1)%b.length,Ee=(B+1)%b.length,Oe=b[Y],Fe=b[Ee];return!((c=d(g))!=null&&c.contains(Oe))&&!((m=d(g))!=null&&m.contains(Fe))}),P={popoverState:a,buttonId:C(null),panelId:C(null),panel:g,button:i,isPortalled:L,beforePanelSentinel:f,afterPanelSentinel:v,togglePopover(){a.value=U(a.value,{0:1,1:0})},closePopover(){a.value!==1&&(a.value=1)},close(c){P.closePopover();let m=(()=>c?c instanceof HTMLElement?c:c.value instanceof HTMLElement?d(c):d(P.button):d(P.button))();m==null||m.focus()}};we(Pe,P),tt(F(()=>U(a.value,{0:Z.Open,1:Z.Closed})));let D={buttonId:P.buttonId,panelId:P.panelId,close(){P.closePopover()}},E=ze(),x=E==null?void 0:E.registerPopover,[k,y]=ot(),p=nt({mainTreeNodeRef:E==null?void 0:E.mainTreeNodeRef,portals:k,defaultContainers:[i,g]});function w(){var c,m,b,B;return(B=E==null?void 0:E.isFocusWithinPopoverGroup())!=null?B:((c=_.value)==null?void 0:c.activeElement)&&(((m=d(i))==null?void 0:m.contains(_.value.activeElement))||((b=d(g))==null?void 0:b.contains(_.value.activeElement)))}return pe(()=>x==null?void 0:x(D)),at((s=_.value)==null?void 0:s.defaultView,"focus",c=>{var m,b;c.target!==window&&c.target instanceof HTMLElement&&a.value===0&&(w()||i&&g&&(p.contains(c.target)||(m=d(P.beforePanelSentinel))!=null&&m.contains(c.target)||(b=d(P.afterPanelSentinel))!=null&&b.contains(c.target)||P.closePopover()))},!0),st(p.resolveContainers,(c,m)=>{var b;P.closePopover(),lt(m,rt.Loose)||(c.preventDefault(),(b=d(i))==null||b.focus())},F(()=>a.value===0)),()=>{let c={open:a.value===0,close:P.close};return T(V,[T(y,{},()=>ne({theirProps:{...n,...r},ourProps:{ref:t},slot:c,slots:e,attrs:r,name:"Popover"})),T(p.MainTreeNode)])}}}),Pt=te({name:"PopoverButton",props:{as:{type:[Object,String],default:"button"},disabled:{type:[Boolean],default:!1},id:{type:String,default:()=>`headlessui-popover-button-${H()}`}},inheritAttrs:!1,setup(n,{attrs:e,slots:r,expose:l}){let s=ae("PopoverButton"),t=F(()=>he(s.button));l({el:s.button,$el:s.button}),fe(()=>{s.buttonId.value=n.id}),$e(()=>{s.buttonId.value=null});let a=ze(),i=a==null?void 0:a.closeOthers,f=St(),v=F(()=>f===null?!1:f.value===s.panelId.value),g=C(null),_=`headlessui-focus-sentinel-${H()}`;v.value||pe(()=>{s.button.value=g.value});let L=it(F(()=>({as:n.as,type:e.type})),g);function P(p){var w,c,m,b,B;if(v.value){if(s.popoverState.value===1)return;switch(p.key){case q.Space:case q.Enter:p.preventDefault(),(c=(w=p.target).click)==null||c.call(w),s.closePopover(),(m=d(s.button))==null||m.focus();break}}else switch(p.key){case q.Space:case q.Enter:p.preventDefault(),p.stopPropagation(),s.popoverState.value===1&&(i==null||i(s.buttonId.value)),s.togglePopover();break;case q.Escape:if(s.popoverState.value!==0)return i==null?void 0:i(s.buttonId.value);if(!d(s.button)||(b=t.value)!=null&&b.activeElement&&!((B=d(s.button))!=null&&B.contains(t.value.activeElement)))return;p.preventDefault(),p.stopPropagation(),s.closePopover();break}}function D(p){v.value||p.key===q.Space&&p.preventDefault()}function E(p){var w,c;n.disabled||(v.value?(s.closePopover(),(w=d(s.button))==null||w.focus()):(p.preventDefault(),p.stopPropagation(),s.popoverState.value===1&&(i==null||i(s.buttonId.value)),s.togglePopover(),(c=d(s.button))==null||c.focus()))}function x(p){p.preventDefault(),p.stopPropagation()}let k=ke();function y(){let p=d(s.panel);if(!p)return;function w(){U(k.value,{[j.Forwards]:()=>I(p,A.First),[j.Backwards]:()=>I(p,A.Last)})===ue.Error&&I(ge().filter(c=>c.dataset.headlessuiFocusGuard!=="true"),U(k.value,{[j.Forwards]:A.Next,[j.Backwards]:A.Previous}),{relativeTo:d(s.button)})}w()}return()=>{let p=s.popoverState.value===0,w={open:p},{id:c,...m}=n,b=v.value?{ref:g,type:L.value,onKeydown:P,onClick:E}:{ref:g,id:c,type:L.value,"aria-expanded":s.popoverState.value===0,"aria-controls":d(s.panel)?s.panelId.value:void 0,disabled:n.disabled?!0:void 0,onKeydown:P,onKeyup:D,onClick:E,onMousedown:x};return T(V,[ne({ourProps:b,theirProps:{...e,...m},slot:w,attrs:e,slots:r,name:"PopoverButton"}),p&&!v.value&&s.isPortalled.value&&T(re,{id:_,features:ie.Focusable,"data-headlessui-focus-guard":!0,as:"button",type:"button",onFocus:y})])}}}),zt=te({name:"PopoverOverlay",props:{as:{type:[Object,String],default:"div"},static:{type:Boolean,default:!1},unmount:{type:Boolean,default:!0}},setup(n,{attrs:e,slots:r}){let l=ae("PopoverOverlay"),s=`headlessui-popover-overlay-${H()}`,t=Se(),a=F(()=>t!==null?(t.value&Z.Open)===Z.Open:l.popoverState.value===0);function i(){l.closePopover()}return()=>{let f={open:l.popoverState.value===0};return ne({ourProps:{id:s,"aria-hidden":!0,onClick:i},theirProps:n,slot:f,attrs:e,slots:r,features:ee.RenderStrategy|ee.Static,visible:a.value,name:"PopoverOverlay"})}}}),Ct=te({name:"PopoverPanel",props:{as:{type:[Object,String],default:"div"},static:{type:Boolean,default:!1},unmount:{type:Boolean,default:!0},focus:{type:Boolean,default:!1},id:{type:String,default:()=>`headlessui-popover-panel-${H()}`}},inheritAttrs:!1,setup(n,{attrs:e,slots:r,expose:l}){let{focus:s}=n,t=ae("PopoverPanel"),a=F(()=>he(t.panel)),i=`headlessui-focus-sentinel-before-${H()}`,f=`headlessui-focus-sentinel-after-${H()}`;l({el:t.panel,$el:t.panel}),fe(()=>{t.panelId.value=n.id}),$e(()=>{t.panelId.value=null}),we(Ce,t.panelId),pe(()=>{var x,k;if(!s||t.popoverState.value!==0||!t.panel)return;let y=(x=a.value)==null?void 0:x.activeElement;(k=d(t.panel))!=null&&k.contains(y)||I(d(t.panel),A.First)});let v=Se(),g=F(()=>v!==null?(v.value&Z.Open)===Z.Open:t.popoverState.value===0);function _(x){var k,y;switch(x.key){case q.Escape:if(t.popoverState.value!==0||!d(t.panel)||a.value&&!((k=d(t.panel))!=null&&k.contains(a.value.activeElement)))return;x.preventDefault(),x.stopPropagation(),t.closePopover(),(y=d(t.button))==null||y.focus();break}}function L(x){var k,y,p,w,c;let m=x.relatedTarget;m&&d(t.panel)&&((k=d(t.panel))!=null&&k.contains(m)||(t.closePopover(),((p=(y=d(t.beforePanelSentinel))==null?void 0:y.contains)!=null&&p.call(y,m)||(c=(w=d(t.afterPanelSentinel))==null?void 0:w.contains)!=null&&c.call(w,m))&&m.focus({preventScroll:!0})))}let P=ke();function D(){let x=d(t.panel);if(!x)return;function k(){U(P.value,{[j.Forwards]:()=>{var y;I(x,A.First)===ue.Error&&((y=d(t.afterPanelSentinel))==null||y.focus())},[j.Backwards]:()=>{var y;(y=d(t.button))==null||y.focus({preventScroll:!0})}})}k()}function E(){let x=d(t.panel);if(!x)return;function k(){U(P.value,{[j.Forwards]:()=>{let y=d(t.button),p=d(t.panel);if(!y)return;let w=ge(),c=w.indexOf(y),m=w.slice(0,c+1),b=[...w.slice(c+1),...m];for(let B of b.slice())if(B.dataset.headlessuiFocusGuard==="true"||p!=null&&p.contains(B)){let Y=b.indexOf(B);Y!==-1&&b.splice(Y,1)}I(b,A.First,{sorted:!1})},[j.Backwards]:()=>{var y;I(x,A.Previous)===ue.Error&&((y=d(t.button))==null||y.focus())}})}k()}return()=>{let x={open:t.popoverState.value===0,close:t.close},{id:k,focus:y,...p}=n,w={ref:t.panel,id:k,onKeydown:_,onFocusout:s&&t.popoverState.value===0?L:void 0,tabIndex:-1};return ne({ourProps:w,theirProps:{...e,...p},attrs:e,slot:x,slots:{...r,default:(...c)=>{var m;return[T(V,[g.value&&t.isPortalled.value&&T(re,{id:i,ref:t.beforePanelSentinel,features:ie.Focusable,"data-headlessui-focus-guard":!0,as:"button",type:"button",onFocus:D}),(m=r.default)==null?void 0:m.call(r,...c),g.value&&t.isPortalled.value&&T(re,{id:f,ref:t.afterPanelSentinel,features:ie.Focusable,"data-headlessui-focus-guard":!0,as:"button",type:"button",onFocus:E})])]}},features:ee.RenderStrategy|ee.Static,visible:g.value,name:"PopoverPanel"})}}});const Bt=["src"],Et={__name:"Logo",props:{logo_url:{type:String}},setup(n){return(e,r)=>(h(),$("img",{tag:"img",to:"#",alt:"Logo",src:n.logo_url?n.logo_url:u(K)().logo_url?u(K)().logo_url:"/logo.svg",class:R([u(K)().logo_css?u(K)().logo_css:"h-10 mx-auto w-auto"])},null,10,Bt))}};const Q=n=>(Ie("data-v-7797bcd1"),n=n(),Ge(),n),Ot={class:"relative flex items-center"},Ft={class:"flex-shrink-0"},Mt={href:"/"},Nt=Q(()=>o("div",{class:"flex-grow"},null,-1)),Vt={class:"hidden md:flex md:items-center md:space-x-4"},Lt={class:"flex rounded-full bg-white/90 px-3 text-sm font-medium text-zinc-800 shadow-lg shadow-zinc-800/5 ring-1 ring-zinc-900/5 backdrop-blur dark:bg-zinc-800/90 dark:text-zinc-200 dark:ring-white/10"},At=["href"],jt={key:0,class:"absolute inset-x-1 -bottom-px h-px bg-gradient-to-r from-teal-500/0 via-teal-500/40 to-teal-500/0 dark:from-teal-400/0 dark:via-teal-400/40 dark:to-teal-400/0"},Tt=Q(()=>o("div",{class:"flex-grow"},null,-1)),qt={class:"flex items-center space-x-4 lg:hidden"},It={class:"flex flex-row-reverse items-center justify-between"},Gt={class:"-mr-2"},Ht=Q(()=>o("span",{class:"sr-only"},"Close menu",-1)),Ut=Q(()=>o("svg",{class:"h-6 w-6",xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor","aria-hidden":"true"},[o("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M6 18L18 6M6 6l12 12"})],-1)),Zt=[Ht,Ut],Rt=Q(()=>o("h2",{class:"text-sm font-medium text-zinc-600 dark:text-zinc-400"},"Navigation",-1)),Dt={class:"mt-6"},Kt={class:"-my-2 divide-y divide-zinc-100 text-base text-zinc-800 dark:divide-zinc-100/5 dark:text-zinc-300"},Wt={__name:"HeaderSpotLight",setup(n){N("isMobileNavVisible",()=>C(!1));const e=me().navigatioins_by_module("landing-page"),r=qe(),l=C(r.currentRoute.value.path);r.afterEach(a=>{l.value=a.path});const s=[{href:"/about",label:"About"},{href:"/articles",label:"Articles"},{href:"/projects",label:"Projects"},{href:"/speaking",label:"Speaking"},{href:"/uses",label:"Uses"}],t=a=>l.value===a;return C(!1),(a,i)=>{const f=Et,v=_e,g=Ke;return h(),$("div",Ot,[o("div",Ft,[o("a",Mt,[z(f,{logo_url:"/logo.svg"})])]),Nt,o("nav",Vt,[o("ul",Lt,[(h(!0),$(V,null,W(("useSortBy"in a?a.useSortBy:u(de))(u(e),["sort_order"]),(_,L)=>(h(),$("li",{key:`mnu_${L}`},[!_.is_action_button&&!_.children&&_.is_active?(h(),$("a",{key:0,href:_.href,class:R(["relative block px-3 py-2 transition hover:text-teal-500 dark:hover:text-teal-400",{"text-teal-500 dark:text-teal-400":t(_.href)}])},[le(S(_.name)+" ",1),t(_.href)?(h(),$("span",jt)):M("",!0)],10,At)):M("",!0)]))),128))])]),Tt,o("div",qt,[z(u(Be),{modelValue:("useState"in a?a.useState:u(N))("isMobileNavVisible").value,"onUpdate:modelValue":i[2]||(i[2]=_=>("useState"in a?a.useState:u(N))("isMobileNavVisible").value=_)},{default:O(()=>[z(u(Pt),{onClick:i[0]||(i[0]=_=>("useState"in a?a.useState:u(N))("isMobileNavVisible").value=!("useState"in a?a.useState:u(N))("isMobileNavVisible").value),class:"group flex items-center px-4 py-2 text-sm font-medium text-zinc-800 dark:bg-zinc-800/90 dark:text-zinc-200 dark:ring-white/10 dark:hover:ring-white/20"},{default:O(()=>[z(v,{name:"akar-icons:two-line-horizontal",class:"ml-3 h-8 w-8 stroke-zinc-500 group-hover:stroke-zinc-700 dark:group-hover:stroke-zinc-400"})]),_:1}),("useState"in a?a.useState:u(N))("isMobileNavVisible").value?(h(),J(u(zt),{key:0,class:"fixed inset-0 z-50 bg-zinc-800/40 backdrop-blur-sm dark:bg-black/80"})):M("",!0),("useState"in a?a.useState:u(N))("isMobileNavVisible").value?(h(),J(u(Ct),{key:1,class:"fixed inset-x-4 top-8 z-50 origin-top rounded-3xl bg-white p-8 ring-1 ring-zinc-900/5 dark:bg-zinc-900 dark:ring-zinc-800"},{default:O(()=>[o("div",It,[o("div",Gt,[o("button",{type:"button",onClick:i[1]||(i[1]=_=>("useState"in a?a.useState:u(N))("isMobileNavVisible").value=!("useState"in a?a.useState:u(N))("isMobileNavVisible").value),class:"bg-gray-200 rounded-full p-2 inline-flex items-center justify-center text-gray-700 hover:bg-gray-200 hover:rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-600"},Zt)]),Rt]),o("nav",Dt,[o("ul",Kt,[(h(),$(V,null,W(s,_=>o("li",{key:_.href},[z(g,{to:_.href,class:"block py-2"},{default:O(()=>[le(S(_.label),1)]),_:2},1032,["to"])])),64))])])]),_:1})):M("",!0)]),_:1},8,["modelValue"])])])}}},Jt=We(Wt,[["__scopeId","data-v-7797bcd1"]]),Qt={class:"grid grid-cols-2 gap-8 xl:col-span-2"},Yt={class:"grid auto-cols-max gap-y-8 md:gap-x-2 lg:gap-x-8 lg:grid-flow-col"},Xt={class:"text-md leading-5 font-bold tracking-wider text-white uppercase"},eo={class:"mt-4"},to=["href","onClick"],oo={__name:"ZynomiFooterLinks",props:["module_name"],setup(n){const e=n;console.log("--------------------------------------->>>>>ZynomiFooterLinks");const r=me().navigatioins_by_module(e.module_name);return(l,s)=>(h(),$("div",Qt,[o("div",Yt,[(h(!0),$(V,null,W(u(ce).filter(("useSortBy"in l?l.useSortBy:u(de))(u(r),["sort_order"]),t=>t.is_active==!0),(t,a)=>(h(),$("div",{key:`fl_${a}`,class:""},[o("h4",Xt,S(t.name),1),o("ul",eo,[(h(!0),$(V,null,W(u(ce).filter(("useSortBy"in l?l.useSortBy:u(de))(t.children,["sort_order"]),i=>i.is_active==!0),i=>(h(),$("li",{class:"mt-4",key:i.name},[o("a",{href:i.href,onClick:f=>("useNuxtApp"in l?l.useNuxtApp:u(G))().$bus.$emit(`${i.click_event}`),class:R(["text-base leading-6 text-white",[`hover:text-[${u(oe)().palette("600")}]`]])},S(i.name),11,to)]))),128))])]))),128))])]))}},no={key:0,class:"grid grid-flow-row auto-rows-max"},ao={class:"md:grid md:grid-cols-1"},so={class:""},lo={class:"mt-2 text-base text-white"},ro=o("h4",{class:"text-md leading-5 font-bold tracking-wider text-white uppercase pt-4 lg:pt-0"},"Contact",-1),io=o("dt",{class:"sr-only"},"Postal address",-1),uo={class:"pt-2"},co=o("dt",{class:"sr-only"},"Phone number",-1),po={class:"flex"},fo={key:0,class:"flex-shrink-0 h-5 w-5 text-white",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor"},vo=o("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"},null,-1),mo=[vo],_o={class:"ml-3"},ho=o("dt",{class:"sr-only"},"Email",-1),go={class:"flex"},yo=["href"],bo={__name:"ZynomiContactUs",props:["organization"],setup(n){const e=n;return(r,l)=>{const s=_e;return e.organization?(h(),$("div",no,[o("div",{class:R(["mt-8 xl:mt-0 pl-6 pr-4 pb-2 rounded-xl",[`bg-[${u(oe)().palette("600")}]`]])},[o("div",ao,[o("div",so,[o("dl",lo,[o("div",null,[ro,io,o("dd",uo,[o("p",null,S(e.organization.company_name),1),o("p",null,S(e.organization.address.apartment)+" "+S(e.organization.address.street),1),o("p",null,S(e.organization.address.city)+" "+S(e.organization.address.postal_code),1),o("p",null,S(e.organization.address.state)+" "+S(e.organization.address.country_name),1)]),co,o("dd",po,[e.organization.phone_number?(h(),$("svg",fo,mo)):M("",!0),o("span",_o,S(e.organization.phone_number),1)]),ho,o("dd",go,[z(s,{name:"fa:envelope",class:"h-4 w-4 mt-1"}),e.organization.company_email?(h(),$("a",{key:0,href:"mailto:"+e.organization.company_email,class:"ml-3"},S(e.organization.company_email),9,yo)):M("",!0)])])])])])],2)])):M("",!0)}}},xo={class:"flex md:order-2"},wo=["href"],$o={class:"sr-only"},ko={__name:"ZynomiSocialLinks",props:["module_name"],setup(n){const e=n;console.log("--------------------------------------->>>>>ZynomiSocialLinks");const r=me().navigatioins_by_module(e.module_name);return(l,s)=>{const t=_e;return h(),$("div",xo,[(h(!0),$(V,null,W(u(ce).filter(u(r),a=>a.is_active==!0),a=>(h(),$("a",{key:a.name,href:a.href,class:R(["ml-6 text-white",[`hover:text-[${u(oe)().palette("600")}]`]])},[o("span",$o,S(a.name),1),z(t,{name:a.icon,class:"h-6 w-6"},null,8,["name"])],10,wo))),128))])}}},So={class:"max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8"},Po={class:"xl:grid xl:grid-cols-3 xl:gap-3"},zo={class:"mt-8 border-t border-white pt-8 md:flex md:items-center md:justify-between"},Co={class:"mt-8 text-white text-base leading-6 md:mt-0 md:order-1"},Bo={__name:"Footer",setup(n){return console.log("organization control = ",JSON.stringify(ye().organization)),(e,r)=>{const l=oo,s=bo,t=ko;return h(),$("div",{class:R(["",[`bg-[${u(oe)().palette("800")}]`,"lg:max-w-8xl"]])},[o("div",So,[o("div",Po,[z(l,{module_name:"footer-links"}),z(s,{organization:u(ye)().organization},null,8,["organization"])]),o("div",zo,[z(t,{module_name:"social-media-links"}),o("p",Co,S(u(K)().app_copyright),1)])])],2)}}},Eo=o("div",{class:"fixed inset-0"},null,-1),Oo={class:"fixed inset-0 overflow-hidden"},Fo={class:"absolute inset-0 overflow-hidden"},Mo={class:"pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10 sm:pl-16"},No=["onSubmit"],Vo={class:"h-0 flex-1 overflow-y-auto"},Lo={class:"bg-gradient-to-r from-primary-900 via-secondary-700 to-primary-900 py-6 px-4 sm:px-6"},Ao={class:"flex items-center justify-between"},jo={class:"ml-3 flex h-7 items-center"},To=o("span",{class:"sr-only"},"Close panel",-1),qo={class:"mt-1"},Io={class:"text-sm text-primary-300"},Go={key:0,class:"z-50 h-full overflow-hidden flex flex-col items-center justify-center"},Ho=o("div",{class:"loader animate-ping text-indigo-900 ease-linear rounded-full border-4 border-t-4 border-primary-900 h-12 w-12 mb-4"},null,-1),Uo=[Ho],Zo={class:"flex-1 flex-col justify-between"},Ro={class:"min-w-0 max-w-2xl flex-auto px-4 py-4 lg:max-w-none lg:pr-0 lg:pl-8 xl:px-8"},Do={class:"mb-9 space-y-1"},Ko={class:"font-display text-sm font-medium text-sky-500"},Wo={class:"font-display text-3xl tracking-tight text-gray-900 dark:text-white"},Jo={class:"mt-8 text-sm text-zinc-600 prose prose-zinc max-w-none dark:prose-invert dark:text-zinc-400 prose-headings:scroll-mt-28 prose-headings:font-display prose-headings:font-normal lg:prose-headings:scroll-mt-[8.5rem] prose-lead:text-zinc-500 dark:prose-lead:text-zinc-400 prose-a:font-semibold dark:prose-a:text-sky-400 prose-a:no-underline dark:prose-pre:ring-1 dark:prose-pre:ring-zinc-300/10 dark:prose-hr:border-zinc-800"},Qo={__name:"SideBarGuide",props:{form_title:{type:String,required:!0},form_description:{type:String,required:!0}},setup(n){const e=C(!1),r=C(!1),l=C({});G().$bus.$on("evtSideBarGuide",async i=>{e.value=!e.value;const f=await $fetch(`${He().public.API_BASE_URL}/entities/blogs?title.eq=getting-started-with-duckdb-sql-ide`);f&&Array.isArray(f.data)&&(l.value=await ht(f.data[0].content)),r.value=!1});function s(){try{e.value=!1}catch(i){console.log(i)}return!1}async function t(i){try{if(!a(l.value)){G().$toast.show({type:"error",message:"Please fill all required inputs",timeout:10});return}r.value=!0,l.value.tenant="www.xyz-company.com",await Ze("/api/inquiries/create",{method:"post",body:l.value,initialCache:!1,onResponse({request:f,response:v,options:g}){console.log(JSON.stringify(v)),v._data&&(v._data.code==200?(G().$toast.show({type:"success",message:"Thank you for your inquiry, one of our associate will contact you soon",timeout:6}),e.value=!e.value):G().$toast.show({type:"error",message:"Failure during inquiry save",timeout:6}),r.value=!1)}},"$ZttVM9vEjn")}catch(f){G().$toast.show({type:"error",message:`Oops!... Something went wrong....<br/>[${f.message}]`,timeout:6}),r.value=!1}finally{}}function a(i){let f=l.value.name!=null&&l.value.name!="",v=l.value.phone_number!=null&&l.value.phone_number!="",g=l.value.email!=null&&l.value.email!="",_=l.value.description!=null&&l.value.description!="";return console.log("name && phone_number && email && description",f&&v&&g&&_),f&&v&&g&&_}return(i,f)=>{const v=mt,g=_t;return h(),J(u(vt),{as:"template",show:e.value},{default:O(()=>[z(u(ut),{as:"div",class:"relative z-10"},{default:O(()=>[Eo,o("div",Oo,[o("div",Fo,[o("div",Mo,[z(u(ct),{as:"template",enter:"transform transition ease-in-out duration-500 sm:duration-700","enter-from":"translate-x-full","enter-to":"translate-x-0",leave:"transform transition ease-in-out duration-500 sm:duration-700","leave-from":"translate-x-0","leave-to":"translate-x-full"},{default:O(()=>[z(u(dt),{class:"pointer-events-auto w-screen max-w-xl"},{default:O(()=>[o("form",{class:"flex h-full flex-col divide-y divide-gray-200 bg-white shadow-xl",onSubmit:Ue(t,["prevent"])},[o("div",Vo,[o("div",Lo,[o("div",Ao,[z(u(pt),{class:"text-lg font-medium text-white"},{default:O(()=>[le(S(n.form_title?n.form_title:"Contact us"),1)]),_:1}),o("div",jo,[o("button",{type:"button",class:"rounded-md bg-primary-700 text-primary-200 hover:text-white focus:outline-none focus:ring-2 focus:ring-white",onClick:f[0]||(f[0]=_=>e.value=!1)},[To,z(u(ft),{class:"h-6 w-6","aria-hidden":"true"})])])]),o("div",qo,[o("p",Io,S(n.form_description?n.form_description:"Find out how we can help you?"),1)])]),r.value?(h(),$("div",Go,Uo)):M("",!0),o("div",Zo,[o("div",Ro,[z(g,null,{default:O(()=>[o("article",null,[o("header",Do,[o("p",Ko,S(l.value.data.title),1),o("h1",Wo,S(l.value.data.pageTitle||l.value.data.title),1)]),o("div",Jo,[z(v,{value:l.value,ref:"doc_content"},null,8,["value"])])])]),_:1})])])]),o("div",{class:"flex flex-shrink-0 justify-end px-4 py-4"},[o("button",{type:"button",class:"border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2",onClick:s},"Cancel")])],40,No)]),_:1})]),_:1})])])])]),_:1})]),_:1},8,["show"])}}},Yo={class:"max-w-7xl mx-auto bg-white"},Xo={class:"mx-auto"},en={class:"min-h-screen relative"},tn={class:"h-full relative mt-16"},gn={__name:"landing",setup(n){const e=Re(),r=C(!0);return fe(()=>{e.query.print&&(r.value=!1)}),(l,s)=>{const t=Jt,a=Bo,i=Qo;return h(),$(V,null,[o("div",Yo,[u(r)?(h(),J(t,{key:0,class:"pt-6 pl-2 pr-2 sm:pl-0 sm:pr-0"})):M("",!0),o("div",Xo,[o("div",en,[o("div",tn,[De(l.$slots,"default")])])])]),u(r)?(h(),J(a,{key:0})):M("",!0),z(i,{form_title:"Online Help",form_description:"Handy SQL queries to practice against the sample Tickit database"})],64)}}};export{gn as default};

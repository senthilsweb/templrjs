import{d as r,j as n,a3 as c,Y as h,s as o,a4 as u,o as d,b as l,u as f}from"./entry.a3ad03e6.js";const g=["src","alt","width","height"],p=r({__name:"ProseImg",props:{src:{type:String,default:""},alt:{type:String,default:""},width:{type:[String,Number],default:void 0},height:{type:[String,Number],default:void 0}},setup(e){const t=e,i=n(()=>{var a;if((a=t.src)!=null&&a.startsWith("/")&&!t.src.startsWith("//")){const s=c(h(o().app.baseURL));if(s!=="/"&&!t.src.startsWith(s))return u(s,t.src)}return t.src});return(a,s)=>(d(),l("img",{src:f(i),alt:e.alt,width:e.width,height:e.height},null,8,g))}});export{p as default};
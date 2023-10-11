(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))r(t);new MutationObserver(t=>{for(const i of t)if(i.type==="childList")for(const d of i.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&r(d)}).observe(document,{childList:!0,subtree:!0});function e(t){const i={};return t.integrity&&(i.integrity=t.integrity),t.referrerPolicy&&(i.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?i.credentials="include":t.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function r(t){if(t.ep)return;t.ep=!0;const i=e(t);fetch(t.href,i)}})();const g=`1
00:00:03,400 --> 00:00:06,177
In this lesson, we're going to
be talking about finance. And

2
00:00:06,177 --> 00:00:10,009
one of the most important aspects
of finance is interest.

3
00:00:10,009 --> 00:00:13,655
When I go to a bank or some
other lending institution

4
00:00:13,655 --> 00:00:17,720
to borrow money, the bank is happy
to give me that money. But then I'm

5
00:00:17,900 --> 00:00:21,480
going to be paying the bank for the
privilege of using their money.
`;function y(o,n=200){let e;return r=>{clearTimeout(e),e=setTimeout(()=>o(r),n)}}let l,h="de";const a=document.querySelector("#key");localStorage.getItem("deeplApiKey")&&(a.value=localStorage.getItem("deeplApiKey"));a.addEventListener("input",y(()=>{localStorage.setItem("deeplApiKey",a.value)},500));const s=document.querySelector("#download-button");s.classList.add("disabled");const m=document.querySelector("#config-form");m.addEventListener("submit",async o=>{o.preventDefault(),s.classList.add("disabled"),p.innerHTML="";const e=await(await fetch("https://smarte-trans-api.onrender.com/api/",{method:"POST",body:JSON.stringify({target_lang:"de",key:a.value,items:u}),headers:{"Content-Type":"application/json"}})).json();c(e,p);const r=b(e);let t="text/plain";if(l){let i=l.name;s.download=i.substring(0,i.lastIndexOf(".srt"))+`_${h}.srt`,t=l.type}s.href=`data:${t};charset=utf-8,${r}`,s.classList.remove("disabled")});m.addEventListener("input",o=>{if(o.target.name==="srtFile"){let n=o.target.files[0];if(n){const e=new FileReader;e.onload=function(r){u=f(r.target.result),l=n,c(u)},e.onerror=()=>{c({index:0,timeframe:"--",subtitle:"Error reading file"})},e.readAsText(n,"UTF-8")}}});const f=(o=g)=>o.split(`

`).map(n=>{const e=n.split(`
`);return{index:e[0],timeframe:e[1],subtitle:e.slice(2).join(`
`)}});let u=f();const b=o=>o.reduce((n,e)=>n+`${e.index}
${e.timeframe}
${e.subtitle}

`,"").trim(),v=document.querySelector("#input"),p=document.querySelector("#output"),c=(o=u,n=v)=>{let e="";for(let r of o)e+=`
    <li class="list-group-item">
        <ul class="list-group" data-index="${r.index}">
            <li class="list-group-item list-group-item-dark">${r.index}</li>
            <li class="list-group-item">${r.timeframe}</li>
            <li class="list-group-item list-group-item-info preserve-white-space">${r.subtitle}</li>
        </ul>
    </li>
`;n.innerHTML=`<ul class="list-group list-group-flush">${e}</ul>`};c();

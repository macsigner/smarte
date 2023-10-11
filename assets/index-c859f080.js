(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))r(t);new MutationObserver(t=>{for(const o of t)if(o.type==="childList")for(const d of o.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&r(d)}).observe(document,{childList:!0,subtree:!0});function e(t){const o={};return t.integrity&&(o.integrity=t.integrity),t.referrerPolicy&&(o.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?o.credentials="include":t.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function r(t){if(t.ep)return;t.ep=!0;const o=e(t);fetch(t.href,o)}})();const g=`1
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
`;function y(i,n=200){let e;return r=>{clearTimeout(e),e=setTimeout(()=>i(r),n)}}let l,h="de";const a=document.querySelector("#key");localStorage.getItem("deeplApiKey")&&(a.value=localStorage.getItem("deeplApiKey"));a.addEventListener("input",y(()=>{localStorage.setItem("deeplApiKey",a.value)},500));const s=document.querySelector("#download-button");s.classList.add("disabled");const m=document.querySelector("#config-form");m.addEventListener("submit",async i=>{i.preventDefault(),s.classList.add("disabled"),p.innerHTML="";const e=await(await fetch("https://smarte-trans-api.onrender.com/api/",{method:"POST",body:JSON.stringify({target_lang:"de",key:a.value,items:u}),headers:{"Content-Type":"application/json"}}).catch(o=>{console.log(o)})).json();c(e,p);const r=b(e);let t="text/plain";if(l){let o=l.name;s.download=o.substring(0,o.lastIndexOf(".srt"))+`_${h}.srt`,t=l.type}s.href=`data:${t};charset=utf-8,${r}`,s.classList.remove("disabled")});m.addEventListener("input",i=>{if(i.target.name==="srtFile"){let n=i.target.files[0];if(n){const e=new FileReader;e.onload=function(r){u=f(r.target.result),l=n,c(u)},e.onerror=()=>{c({index:0,timeframe:"--",subtitle:"Error reading file"})},e.readAsText(n,"UTF-8")}}});const f=(i=g)=>i.split(`

`).map(n=>{const e=n.split(`
`);return{index:e[0],timeframe:e[1],subtitle:e.slice(2).join(`
`)}});let u=f();const b=i=>i.reduce((n,e)=>n+`${e.index}
${e.timeframe}
${e.subtitle}

`,"").trim(),v=document.querySelector("#input"),p=document.querySelector("#output"),c=(i=u,n=v)=>{let e="";for(let r of i)e+=`
    <li class="list-group-item">
        <ul class="list-group" data-index="${r.index}">
            <li class="list-group-item list-group-item-dark">${r.index}</li>
            <li class="list-group-item">${r.timeframe}</li>
            <li class="list-group-item list-group-item-info preserve-white-space">${r.subtitle}</li>
        </ul>
    </li>
`;n.innerHTML=`<ul class="list-group list-group-flush">${e}</ul>`};c();

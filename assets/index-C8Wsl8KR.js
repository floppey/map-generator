var X=Object.defineProperty;var R=t=>{throw TypeError(t)};var Y=(t,e,o)=>e in t?X(t,e,{enumerable:!0,configurable:!0,writable:!0,value:o}):t[e]=o;var B=(t,e,o)=>Y(t,typeof e!="symbol"?e+"":e,o),Z=(t,e,o)=>e.has(t)||R("Cannot "+o);var h=(t,e,o)=>(Z(t,e,"read from private field"),o?o.call(t):e.get(t)),m=(t,e,o)=>e.has(t)?R("Cannot add the same private member more than once"):e instanceof WeakSet?e.add(t):e.set(t,o),u=(t,e,o,s)=>(Z(t,e,"write to private field"),s?s.call(t,o):e.set(t,o),o);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))s(i);new MutationObserver(i=>{for(const l of i)if(l.type==="childList")for(const n of l.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&s(n)}).observe(document,{childList:!0,subtree:!0});function o(i){const l={};return i.integrity&&(l.integrity=i.integrity),i.referrerPolicy&&(l.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?l.credentials="include":i.crossOrigin==="anonymous"?l.credentials="omit":l.credentials="same-origin",l}function s(i){if(i.ep)return;i.ep=!0;const l=o(i);fetch(i.href,l)}})();const g=t=>(t??"").split("").reverse().join("");class q{constructor(e,o,s,i){B(this,"x");B(this,"y");B(this,"grid");B(this,"options");B(this,"collapsed");this.grid=e,this.x=o,this.y=s,this.options=i}collapse(){if(!this.collapsed)this.collapsed=this.options[Math.floor(Math.random()*this.options.length)];else throw console.log("Cell already collapsed",this),new Error("Cell already collapsed")}getNeighbors(){return{top:this.grid.cells.find(e=>e.x===this.x&&e.y===this.y-1),right:this.grid.cells.find(e=>e.x===this.x+1&&e.y===this.y),bottom:this.grid.cells.find(e=>e.x===this.x&&e.y===this.y+1),left:this.grid.cells.find(e=>e.x===this.x-1&&e.y===this.y)}}evaluate(){var o,s,i,l;if(this.collapsed)return;const e=this.getNeighbors();(o=e.top)!=null&&o.collapsed&&(this.options=this.options.filter(n=>{var p,f;return n.sockets.top===g((f=(p=e.top)==null?void 0:p.collapsed)==null?void 0:f.sockets.bottom)})),(s=e.right)!=null&&s.collapsed&&(this.options=this.options.filter(n=>{var p,f;return n.sockets.right===g((f=(p=e.right)==null?void 0:p.collapsed)==null?void 0:f.sockets.left)})),(i=e.bottom)!=null&&i.collapsed&&(this.options=this.options.filter(n=>{var p,f;return n.sockets.bottom===g((f=(p=e.bottom)==null?void 0:p.collapsed)==null?void 0:f.sockets.top)})),(l=e.left)!=null&&l.collapsed&&(this.options=this.options.filter(n=>{var p,f;return n.sockets.left===g((f=(p=e.left)==null?void 0:p.collapsed)==null?void 0:f.sockets.right)}))}}var E,b;class j{constructor(e,o){m(this,E);m(this,b);u(this,E,o),u(this,b,[]);for(let s=0;s<e;s++)for(let i=0;i<e;i++)h(this,b).push(new q(this,s,i,[...o]))}get tiles(){return h(this,E)}get cells(){return h(this,b)}collapseNextCell(){const e=this.cells.filter(i=>!i.collapsed).sort((i,l)=>i.options.length-l.options.length),o=e.filter(i=>i.options.length===e[0].options.length),s=o[Math.floor(Math.random()*o.length)];if(s.options.length===0)throw console.log("No options left",s),y(),new Error("No options left");s.collapse()}evaluate(){this.cells.forEach(e=>{e.evaluate()})}}E=new WeakMap,b=new WeakMap;var I,v,T,C;class a{constructor(e,o,s=0,i=null){m(this,I);m(this,v);m(this,T);m(this,C);u(this,v,e),u(this,I,o),u(this,T,s),u(this,C,i)}get sockets(){return h(this,I)}get image(){return h(this,v)}get rotation(){return h(this,T)}get flipDirection(){return h(this,C)}}I=new WeakMap,v=new WeakMap,T=new WeakMap,C=new WeakMap;const _=(t,e)=>{const{top:o,right:s,bottom:i,left:l}=t.sockets,{rotation:n,image:p,flipDirection:f}=t;if(f)throw new Error("Tile already flipped");const W={horizontal:{top:g(i),right:g(s),bottom:g(o),left:g(l)},vertical:{top:g(o),right:g(l),bottom:g(i),left:g(s)}};return new a(p,W[e],n,e)},N=t=>{const{top:e,right:o,bottom:s,left:i}=t.sockets,{rotation:l,image:n,flipDirection:p}=t;return new a(n,{top:i,right:e,bottom:o,left:s},(l+90)%360,p)},L=(t,e)=>{e==="horizontal"?t.scale(1,-1):e==="vertical"&&t.scale(-1,1)},H=[new a("0.png",{top:"AAA",right:"AAA",bottom:"AAA",left:"AAA"}),new a("1.png",{top:"ABA",right:"AAA",bottom:"ABA",left:"AAA"}),new a("2.png",{top:"ABA",right:"ABA",bottom:"ABA",left:"ABA"}),new a("3.png",{top:"ABA",right:"ABA",bottom:"AAA",left:"ABA"}),new a("4.png",{top:"ABA",right:"AAA",bottom:"AAA",left:"ABA"}),new a("5.png",{top:"AAA",right:"AAA",bottom:"AAA",left:"ABA"}),new a("6.png",{top:"AAA",right:"AAB",bottom:"AAA",left:"AAB"}),new a("7.png",{top:"AAA",right:"BAB",bottom:"AAA",left:"AAB"}),new a("8.png",{top:"AAA",right:"BAB",bottom:"AAA",left:"BAB"}),new a("9.png",{top:"AAA",right:"AAA",bottom:"AAA",left:"BAB"}),new a("10.png",{top:"AAA",right:"ABA",bottom:"AAA",left:"BAB"}),new a("11.png",{top:"ABA",right:"AAA",bottom:"AAA",left:"BAB"}),new a("12.png",{top:"AAA",right:"ABA",bottom:"AAA",left:"AAB"}),new a("13.png",{top:"AAA",right:"AAA",bottom:"ABA",left:"AAB"}),new a("14.png",{top:"ABA",right:"AAA",bottom:"ABA",left:"AAB"})],K=[];H.forEach(t=>{const e=N(t),o=N(e),s=N(o);K.push(t,e,o,s)});const J=[];K.forEach(t=>{const e=_(t,"horizontal"),o=_(t,"vertical");J.push(t,e,o)});const tt=J.sort((t,e)=>t.image.localeCompare(e.image)),w=[];tt.forEach(t=>{w.some(e=>e.image===t.image&&e.sockets.top===t.sockets.top&&e.sockets.right===t.sockets.right&&e.sockets.bottom===t.sockets.bottom&&e.sockets.left===t.sockets.left)||w.push(t)});const S=20,d=1e3,A=d/S,F=document.getElementById("map"),M=document.getElementById("debug"),c=F.getContext("2d"),r=M.getContext("2d");if(!c||!r)throw new Error("Could not get canvas context");F.height=d;F.width=d;M.height=1800;M.width=d;let x=new j(S,w),k=-1;const P={};H.forEach(t=>{const e=new Image;e.src=`./simple/${t.image}`,P[t.image]=e});const D=()=>{r.clearRect(0,0,d,d);const t=80;let e=w[0].image,o=0,s=-85;for(let i=0;i<w.length;i++){const l=w[i],n=P[l.image];e!==l.image||s>800?(o+=t+25,s=0,e=l.image):s+=t+5,r.save(),l.rotation&&l.flipDirection?(r.translate(s+t/2,o+t/2),L(r,l.flipDirection),r.rotate(l.rotation*Math.PI/180),r.drawImage(n,-80/2,-80/2,t,t)):l.rotation?(r.translate(s+t/2,o+t/2),r.rotate(l.rotation*Math.PI/180),r.drawImage(n,-80/2,-80/2,t,t)):l.flipDirection?(r.translate(s+t/2,o+t/2),L(r,l.flipDirection),r.drawImage(n,-80/2,-80/2,t,t)):r.drawImage(n,s,o,t,t),r.restore(),r.font="10px Arial",r.fillStyle="orange",r.textAlign="center",r.fillText(l.sockets.top[0],s+t/2-t/4,o+10),r.fillText(l.sockets.top[1],s+t/2,o+10),r.fillText(l.sockets.top[2],s+t/2+t/4,o+10),r.fillText(l.sockets.right[0],s+t-10,o+t/2-t/4),r.fillText(l.sockets.right[1],s+t-10,o+t/2),r.fillText(l.sockets.right[2],s+t-10,o+t/2+t/4),r.fillText(l.sockets.bottom[0],s+t/2+t/4,o+t-10),r.fillText(l.sockets.bottom[1],s+t/2,o+t-10),r.fillText(l.sockets.bottom[2],s+t/2-t/4,o+t-10),r.fillText(l.sockets.left[0],s+10,o+t/2+t/4),r.fillText(l.sockets.left[1],s+10,o+t/2),r.fillText(l.sockets.left[2],s+10,o+t/2-t/4),r.font="10px Arial",r.fillStyle="black",r.textAlign="center",r.fillText(`${l.rotation?`${l.rotation}°`:"0°"} - ${l.flipDirection?l.flipDirection:"original"}`,s+t/2,o+t+15)}},y=()=>{c.clearRect(0,0,d,d),x.cells.forEach(t=>{const e=t.x*A,o=t.y*A,s=t.collapsed;if(s){const i=P[s.image];s.rotation&&s.flipDirection?(c.save(),c.translate(e+A/2,o+A/2),L(c,s.flipDirection),c.rotate(s.rotation*Math.PI/180),c.drawImage(i,-50/2,-50/2,A,A),c.restore()):s.rotation?(c.save(),c.translate(e+A/2,o+A/2),c.rotate(s.rotation*Math.PI/180),c.drawImage(i,-50/2,-50/2,A,A),c.restore()):s.flipDirection?(c.save(),c.translate(e+A/2,o+A/2),L(c,s.flipDirection),c.drawImage(i,-50/2,-50/2,A,A),c.restore()):c.drawImage(i,e,o,A,A)}})},O=()=>{x.collapseNextCell(),x.evaluate()},Q=()=>{if(!x.cells.some(t=>!t.collapsed)){console.log("All cells collapsed"),cancelAnimationFrame(k);return}O(),y(),k=requestAnimationFrame(Q)},U=()=>{if(x.cells.some(t=>!t.collapsed))O(),U();else{console.log("All cells collapsed"),y();return}};var $;($=document.getElementById("collapseNext"))==null||$.addEventListener("click",()=>{O(),y(),D()});var z;(z=document.getElementById("collapseAllSlow"))==null||z.addEventListener("click",()=>{cancelAnimationFrame(k),Q(),D()});var G;(G=document.getElementById("collapseAllFast"))==null||G.addEventListener("click",()=>{cancelAnimationFrame(k),U(),D()});var V;(V=document.getElementById("reset"))==null||V.addEventListener("click",()=>{cancelAnimationFrame(k),x=new j(S,w),y(),D()});setTimeout(()=>{y(),D()},1e3);
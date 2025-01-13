var q=Object.defineProperty;var P=l=>{throw TypeError(l)};var J=(l,e,r)=>e in l?q(l,e,{enumerable:!0,configurable:!0,writable:!0,value:r}):l[e]=r;var k=(l,e,r)=>J(l,typeof e!="symbol"?e+"":e,r),S=(l,e,r)=>e.has(l)||P("Cannot "+r);var p=(l,e,r)=>(S(l,e,"read from private field"),r?r.call(l):e.get(l)),h=(l,e,r)=>e.has(l)?P("Cannot add the same private member more than once"):e instanceof WeakSet?e.add(l):e.set(l,r),d=(l,e,r,t)=>(S(l,e,"write to private field"),t?t.call(l,r):e.set(l,r),r);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const c of document.querySelectorAll('link[rel="modulepreload"]'))t(c);new MutationObserver(c=>{for(const o of c)if(o.type==="childList")for(const n of o.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&t(n)}).observe(document,{childList:!0,subtree:!0});function r(c){const o={};return c.integrity&&(o.integrity=c.integrity),c.referrerPolicy&&(o.referrerPolicy=c.referrerPolicy),c.crossOrigin==="use-credentials"?o.credentials="include":c.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function t(c){if(c.ep)return;c.ep=!0;const o=r(c);fetch(c.href,o)}})();const g=l=>(l??"").split("").reverse().join("");class z{constructor(e,r,t,c){k(this,"x");k(this,"y");k(this,"grid");k(this,"options");k(this,"collapsed");this.grid=e,this.x=r,this.y=t,this.options=c}collapse(){if(!this.collapsed)this.collapsed=this.options[Math.floor(Math.random()*this.options.length)];else throw console.log("Cell already collapsed",this),new Error("Cell already collapsed")}getNeighbors(){return{top:this.grid.cells.find(e=>e.x===this.x&&e.y===this.y-1),right:this.grid.cells.find(e=>e.x===this.x+1&&e.y===this.y),bottom:this.grid.cells.find(e=>e.x===this.x&&e.y===this.y+1),left:this.grid.cells.find(e=>e.x===this.x-1&&e.y===this.y)}}evaluate(){var r,t,c,o;if(this.collapsed)return;const e=this.getNeighbors();(r=e.top)!=null&&r.collapsed&&(this.options=this.options.filter(n=>{var B,i;return n.sockets.top===g((i=(B=e.top)==null?void 0:B.collapsed)==null?void 0:i.sockets.bottom)})),(t=e.right)!=null&&t.collapsed&&(this.options=this.options.filter(n=>{var B,i;return n.sockets.right===g((i=(B=e.right)==null?void 0:B.collapsed)==null?void 0:i.sockets.left)})),(c=e.bottom)!=null&&c.collapsed&&(this.options=this.options.filter(n=>{var B,i;return n.sockets.bottom===g((i=(B=e.bottom)==null?void 0:B.collapsed)==null?void 0:i.sockets.top)})),(o=e.left)!=null&&o.collapsed&&(this.options=this.options.filter(n=>{var B,i;return n.sockets.left===g((i=(B=e.left)==null?void 0:B.collapsed)==null?void 0:i.sockets.right)}))}}var y,m;class K{constructor(e,r,t,c){h(this,y);h(this,m);d(this,y,t),d(this,m,[]);for(let o=0;o<e;o++)for(let n=0;n<r;n++)if(!c&&(o===0||n===0||o===e-1||n===r-1)){let B=[...t];o===0&&(B=B.filter(i=>i.sockets.left==="BBB")),n===0&&(B=B.filter(i=>i.sockets.top==="BBB")),o===e-1&&(B=B.filter(i=>i.sockets.right==="BBB")),n===r-1&&(B=B.filter(i=>i.sockets.bottom==="BBB")),p(this,m).push(new z(this,o,n,[...B]))}else p(this,m).push(new z(this,o,n,[...t]))}get tiles(){return p(this,y)}get cells(){return p(this,m)}collapseNextCell(){const e=this.cells.filter(c=>!c.collapsed).sort((c,o)=>c.options.length-o.options.length),r=e.filter(c=>c.options.length===e[0].options.length),t=r[Math.floor(Math.random()*r.length)];if(t.options.length===0)throw console.log("No options left",t),new Error("No options left");return t.collapse(),t}evaluate(){this.cells.forEach(e=>{e.evaluate()})}}y=new WeakMap,m=new WeakMap;const s=80;var E,T,I,v;class a{constructor(e,r,t=0,c=null){h(this,E);h(this,T);h(this,I);h(this,v);d(this,T,e),d(this,E,r),d(this,I,t),d(this,v,c)}get sockets(){return p(this,E)}get image(){return p(this,T)}get rotation(){return p(this,I)}get flipDirection(){return p(this,v)}}E=new WeakMap,T=new WeakMap,I=new WeakMap,v=new WeakMap;const V=[new a("/dungeon/0.png",{top:"AAA",right:"AAA",bottom:"AAA",left:"AAA"}),new a("/dungeon/0.png",{top:"AAA",right:"AAA",bottom:"AAA",left:"AAA"}),new a("/dungeon/0.png",{top:"AAA",right:"AAA",bottom:"AAA",left:"AAA"}),new a("/dungeon/0.png",{top:"AAA",right:"AAA",bottom:"AAA",left:"AAA"}),new a("/dungeon/0.png",{top:"AAA",right:"AAA",bottom:"AAA",left:"AAA"}),new a("/dungeon/1.png",{top:"BBB",right:"BAB",bottom:"BAB",left:"BBB"}),new a("/dungeon/2.png",{top:"BBB",right:"BBB",bottom:"BAB",left:"BBB"}),new a("/dungeon/3.png",{top:"BBB",right:"BAB",bottom:"BAB",left:"BAB"}),new a("/dungeon/4.png",{top:"BAB",right:"BBB",bottom:"BAB",left:"BBB"}),new a("/dungeon/5.png",{top:"BAB",right:"BBB",bottom:"BBB",left:"BBB"}),new a("/dungeon/6.png",{top:"BBB",right:"BAB",bottom:"BAB",left:"BAB"}),new a("/dungeon/7.png",{top:"BAB",right:"BAB",bottom:"BAB",left:"BAB"}),new a("/dungeon/8.png",{top:"BBB",right:"BBB",bottom:"BBB",left:"BAB"}),new a("/dungeon/9.png",{top:"BBB",right:"BBB",bottom:"BBB",left:"BBB"}),new a("/dungeon/10.png",{top:"BBB",right:"BAA",bottom:"AAB",left:"BBB"}),new a("/dungeon/11.png",{top:"BAA",right:"AAA",bottom:"AAA",left:"AAB"}),new a("/dungeon/12.png",{top:"BBB",right:"BAA",bottom:"AAB",left:"BBB"}),new a("/dungeon/13.png",{top:"BAA",right:"AAA",bottom:"AAB",left:"BBB"}),new a("/dungeon/14.png",{top:"BAA",right:"AAA",bottom:"AAB",left:"BAB"}),new a("/dungeon/15.png",{top:"BAB",right:"BBB",bottom:"BAB",left:"BBB"}),new a("/dungeon/16.png",{top:"BAA",right:"AAB",bottom:"BBB",left:"BBB"}),new a("/dungeon/17.png",{top:"AAB",right:"BAB",bottom:"BBB",left:"BAA"}),new a("/dungeon/18.png",{top:"BAB",right:"BAB",bottom:"BBB",left:"BAB"}),new a("/dungeon/19.png",{top:"BAB",right:"BAB",bottom:"BAB",left:"BAB"}),new a("/dungeon/20.png",{top:"BAB",right:"BAB",bottom:"BAB",left:"BBB"}),new a("/dungeon/21.png",{top:"BAB",right:"BAA",bottom:"AAA",left:"AAB"}),new a("/dungeon/22.png",{top:"BAB",right:"BAB",bottom:"BAB",left:"BAB"}),new a("/dungeon/23.png",{top:"BAB",right:"BBB",bottom:"BAB",left:"BBB"}),new a("/dungeon/24.png",{top:"BAA",right:"AAB",bottom:"BAA",left:"AAB"}),new a("/dungeon/25.png",{top:"BAA",right:"AAB",bottom:"BAB",left:"BAB"}),new a("/dungeon/26.png",{top:"AAA",right:"AAB",bottom:"BAA",left:"AAA"})],L=(l,e)=>{e==="horizontal"?l.scale(1,-1):e==="vertical"&&l.scale(-1,1)},C=(l,e,r)=>{const t=l.getContext("2d");if(!t)throw new Error("Could not get canvas context");l.height=e.length*100,l.width=1e3,t.clearRect(0,0,l.width,l.height);let c=e[0].image,o=0,n=-85;for(let B=0;B<e.length;B++){const i=e[B],b=r[i.image];c!==i.image||n>800?(o+=s+25,n=0,c=i.image):n+=s+5,t.save(),i.rotation&&i.flipDirection?(t.translate(n+s/2,o+s/2),L(t,i.flipDirection),t.rotate(i.rotation*Math.PI/180),t.drawImage(b,-80/2,-80/2,s,s)):i.rotation?(t.translate(n+s/2,o+s/2),t.rotate(i.rotation*Math.PI/180),t.drawImage(b,-80/2,-80/2,s,s)):i.flipDirection?(t.translate(n+s/2,o+s/2),L(t,i.flipDirection),t.drawImage(b,-80/2,-80/2,s,s)):t.drawImage(b,n,o,s,s),t.restore(),t.font="10px Arial",t.fillStyle="orange",t.textAlign="center",t.fillText(i.sockets.top[0],n+s/2-s/4,o+10),t.fillText(i.sockets.top[1],n+s/2,o+10),t.fillText(i.sockets.top[2],n+s/2+s/4,o+10),t.fillText(i.sockets.right[0],n+s-10,o+s/2-s/4),t.fillText(i.sockets.right[1],n+s-10,o+s/2),t.fillText(i.sockets.right[2],n+s-10,o+s/2+s/4),t.fillText(i.sockets.bottom[0],n+s/2+s/4,o+s-10),t.fillText(i.sockets.bottom[1],n+s/2,o+s-10),t.fillText(i.sockets.bottom[2],n+s/2-s/4,o+s-10),t.fillText(i.sockets.left[0],n+10,o+s/2+s/4),t.fillText(i.sockets.left[1],n+10,o+s/2),t.fillText(i.sockets.left[2],n+10,o+s/2-s/4),t.font="10px Arial",t.fillStyle="black",t.textAlign="center",t.fillText(`${i.rotation?`${i.rotation}°`:"0°"} - ${i.flipDirection?i.flipDirection:"original"}`,n+s/2,o+s+15)}},D=(l,e,r)=>{const t=l.getContext("2d");if(!t)throw new Error("Could not get canvas context");t.clearRect(0,0,l.width,l.height),e.cells.forEach(c=>{const o=c.x*s,n=c.y*s,B=c.collapsed;if(B){const i=r[B.image];B.rotation&&B.flipDirection?(t.save(),t.translate(o+s/2,n+s/2),L(t,B.flipDirection),t.rotate(B.rotation*Math.PI/180),t.drawImage(i,-80/2,-80/2,s,s),t.restore()):B.rotation?(t.save(),t.translate(o+s/2,n+s/2),t.rotate(B.rotation*Math.PI/180),t.drawImage(i,-80/2,-80/2,s,s),t.restore()):B.flipDirection?(t.save(),t.translate(o+s/2,n+s/2),L(t,B.flipDirection),t.drawImage(i,-80/2,-80/2,s,s),t.restore()):t.drawImage(i,o,n,s,s)}else c.options.length===0&&(t.fillStyle="red",t.fillRect(o,n,s,s))})},R=(l,e)=>{const{top:r,right:t,bottom:c,left:o}=l.sockets,{rotation:n,image:B,flipDirection:i}=l;if(i)throw new Error("Tile already flipped");const b={horizontal:{top:g(c),right:g(t),bottom:g(r),left:g(o)},vertical:{top:g(r),right:g(o),bottom:g(c),left:g(t)}};return new a(B,b[e],n,e)},M=l=>{const{top:e,right:r,bottom:t,left:c}=l.sockets,{rotation:o,image:n,flipDirection:B}=l;return new a(n,{top:c,right:e,bottom:r,left:t},(o+90)%360,B)},Q=l=>{const e=[];l.forEach(o=>{const n=M(o),B=M(n),i=M(B);e.push(o,n,B,i)});const r=[];e.forEach(o=>{const n=R(o,"horizontal"),B=R(o,"vertical");r.push(o,n,B)});const t=r.sort((o,n)=>o.image.localeCompare(n.image)),c=[];return t.forEach(o=>{if(o.sockets.top==="AAA"&&o.sockets.right==="AAA"&&o.sockets.bottom==="AAA"&&o.sockets.left==="AAA"&&o.rotation===0&&o.flipDirection===null){c.push(o);return}c.some(n=>n.image===o.image&&n.sockets.top===o.sockets.top&&n.sockets.right===o.sockets.right&&n.sockets.bottom===o.sockets.bottom&&n.sockets.left===o.sockets.left)||c.push(o)}),console.log(c),c};let x=-1;const A={},w=Q(V);let f=new K(0,0,w,!0);const u=document.getElementById("map"),N=document.getElementById("debugCanvas"),F=()=>{const l=Number(document.getElementById("height").value),e=Number(document.getElementById("width").value),r=document.getElementById("allowOpenEdges").checked;f=new K(e,l,w,r),u.height=l*s,u.width=e*s};V.forEach(l=>{const e=new Image;e.src=`.${l.image}`,A[l.image]=e});const O=()=>{const e=f.collapseNextCell().getNeighbors();Object.values(e).forEach(r=>{r&&!r.collapsed&&r.evaluate()})},Z=()=>{if(!f.cells.some(l=>!l.collapsed)){console.log("All cells collapsed"),cancelAnimationFrame(x);return}O(),D(u,f,A),x=requestAnimationFrame(Z)},_=()=>{if(f.cells.some(l=>!l.collapsed))O(),_();else{console.log("All cells collapsed"),D(u,f,A);return}};var $;($=document.getElementById("collapseNext"))==null||$.addEventListener("click",()=>{O(),D(u,f,A),C(N,w,A)});var j;(j=document.getElementById("collapseAllSlow"))==null||j.addEventListener("click",()=>{cancelAnimationFrame(x),F(),Z(),C(N,w,A)});var G;(G=document.getElementById("collapseAllFast"))==null||G.addEventListener("click",()=>{cancelAnimationFrame(x),F(),_(),C(N,w,A)});var H;(H=document.getElementById("reset"))==null||H.addEventListener("click",()=>{cancelAnimationFrame(x),F(),D(u,f,A),C(N,w,A)});setTimeout(()=>{F(),D(u,f,A),C(N,w,A)},1e3);

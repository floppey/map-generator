var W=Object.defineProperty;var $=n=>{throw TypeError(n)};var X=(n,e,l)=>e in n?W(n,e,{enumerable:!0,configurable:!0,writable:!0,value:l}):n[e]=l;var E=(n,e,l)=>X(n,typeof e!="symbol"?e+"":e,l),j=(n,e,l)=>e.has(n)||$("Cannot "+l);var g=(n,e,l)=>(j(n,e,"read from private field"),l?l.call(n):e.get(n)),A=(n,e,l)=>e.has(n)?$("Cannot add the same private member more than once"):e instanceof WeakSet?e.add(n):e.set(n,l),h=(n,e,l,t)=>(j(n,e,"write to private field"),t?t.call(n,l):e.set(n,l),l);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))t(i);new MutationObserver(i=>{for(const o of i)if(o.type==="childList")for(const r of o.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&t(r)}).observe(document,{childList:!0,subtree:!0});function l(i){const o={};return i.integrity&&(o.integrity=i.integrity),i.referrerPolicy&&(o.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?o.credentials="include":i.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function t(i){if(i.ep)return;i.ep=!0;const o=l(i);fetch(i.href,o)}})();const p=n=>(n??"").split("").reverse().join("");class G{constructor(e,l,t,i){E(this,"x");E(this,"y");E(this,"grid");E(this,"options");E(this,"collapsed");this.grid=e,this.x=l,this.y=t,this.options=i}collapse(){if(!this.collapsed)this.collapsed=this.options[Math.floor(Math.random()*this.options.length)];else throw console.log("Cell already collapsed",this),new Error("Cell already collapsed")}getNeighbors(){return{top:this.grid.cells.find(e=>e.x===this.x&&e.y===this.y-1),right:this.grid.cells.find(e=>e.x===this.x+1&&e.y===this.y),bottom:this.grid.cells.find(e=>e.x===this.x&&e.y===this.y+1),left:this.grid.cells.find(e=>e.x===this.x-1&&e.y===this.y)}}evaluate(){var l,t,i,o;if(this.collapsed)return;const e=this.getNeighbors();(l=e.top)!=null&&l.collapsed&&(this.options=this.options.filter(r=>{var B,c;return r.sockets.top===p((c=(B=e.top)==null?void 0:B.collapsed)==null?void 0:c.sockets.bottom)})),(t=e.right)!=null&&t.collapsed&&(this.options=this.options.filter(r=>{var B,c;return r.sockets.right===p((c=(B=e.right)==null?void 0:B.collapsed)==null?void 0:c.sockets.left)})),(i=e.bottom)!=null&&i.collapsed&&(this.options=this.options.filter(r=>{var B,c;return r.sockets.bottom===p((c=(B=e.bottom)==null?void 0:B.collapsed)==null?void 0:c.sockets.top)})),(o=e.left)!=null&&o.collapsed&&(this.options=this.options.filter(r=>{var B,c;return r.sockets.left===p((c=(B=e.left)==null?void 0:B.collapsed)==null?void 0:c.sockets.right)}))}}var m,u,w,b,T,v;class q{constructor(e,l,t,i,o){A(this,m);A(this,u);A(this,w);A(this,b);A(this,T);A(this,v);h(this,m,t),h(this,u,[]),h(this,w,l),h(this,b,e),h(this,T,i),h(this,v,o),this.populate()}get tiles(){return g(this,m)}get cells(){return g(this,u)}populate(){for(let e=0;e<g(this,b);e++)for(let l=0;l<g(this,w);l++)if(!g(this,T)&&(e===0||l===0||e===g(this,b)-1||l===g(this,w)-1)){let t=[...g(this,m)];e===0&&(t=t.filter(i=>i.sockets.left==="BBB")),l===0&&(t=t.filter(i=>i.sockets.top==="BBB")),e===g(this,b)-1&&(t=t.filter(i=>i.sockets.right==="BBB")),l===g(this,w)-1&&(t=t.filter(i=>i.sockets.bottom==="BBB")),g(this,u).push(new G(this,e,l,[...t]))}else g(this,u).push(new G(this,e,l,[...g(this,m)]))}collapseNextCell(){const e=this.cells.filter(i=>!i.collapsed).sort((i,o)=>i.options.length-o.options.length),l=e.filter(i=>i.options.length===e[0].options.length),t=l[Math.floor(Math.random()*l.length)];if(t.options.length===0){if(console.log("No options left",t),g(this,v))return console.log("Restarting grid"),this.populate(),this.collapseNextCell();throw new Error("No options left")}return t.collapse(),t}evaluate(){this.cells.forEach(e=>{e.evaluate()})}}m=new WeakMap,u=new WeakMap,w=new WeakMap,b=new WeakMap,T=new WeakMap,v=new WeakMap;const s=80;var C,D,N,L;class a{constructor(e,l,t=0,i=null){A(this,C);A(this,D);A(this,N);A(this,L);h(this,D,e),h(this,C,l),h(this,N,t),h(this,L,i)}get sockets(){return g(this,C)}get image(){return g(this,D)}get rotation(){return g(this,N)}get flipDirection(){return g(this,L)}}C=new WeakMap,D=new WeakMap,N=new WeakMap,L=new WeakMap;const J=[new a("/dungeon/0.png",{top:"AAA",right:"AAA",bottom:"AAA",left:"AAA"}),new a("/dungeon/0.png",{top:"AAA",right:"AAA",bottom:"AAA",left:"AAA"}),new a("/dungeon/0.png",{top:"AAA",right:"AAA",bottom:"AAA",left:"AAA"}),new a("/dungeon/0.png",{top:"AAA",right:"AAA",bottom:"AAA",left:"AAA"}),new a("/dungeon/0.png",{top:"AAA",right:"AAA",bottom:"AAA",left:"AAA"}),new a("/dungeon/1.png",{top:"BBB",right:"BAB",bottom:"BAB",left:"BBB"}),new a("/dungeon/2.png",{top:"BBB",right:"BBB",bottom:"BAB",left:"BBB"}),new a("/dungeon/3.png",{top:"BBB",right:"BAB",bottom:"BAB",left:"BAB"}),new a("/dungeon/4.png",{top:"BAB",right:"BBB",bottom:"BAB",left:"BBB"}),new a("/dungeon/5.png",{top:"BAB",right:"BBB",bottom:"BBB",left:"BBB"}),new a("/dungeon/6.png",{top:"BBB",right:"BAB",bottom:"BAB",left:"BAB"}),new a("/dungeon/7.png",{top:"BAB",right:"BAB",bottom:"BAB",left:"BAB"}),new a("/dungeon/8.png",{top:"BBB",right:"BBB",bottom:"BBB",left:"BAB"}),new a("/dungeon/9.png",{top:"BBB",right:"BBB",bottom:"BBB",left:"BBB"}),new a("/dungeon/10.png",{top:"BBB",right:"BAA",bottom:"AAB",left:"BBB"}),new a("/dungeon/11.png",{top:"BAA",right:"AAA",bottom:"AAA",left:"AAB"}),new a("/dungeon/12.png",{top:"BBB",right:"BAA",bottom:"AAB",left:"BBB"}),new a("/dungeon/13.png",{top:"BAA",right:"AAA",bottom:"AAB",left:"BBB"}),new a("/dungeon/14.png",{top:"BAA",right:"AAA",bottom:"AAB",left:"BAB"}),new a("/dungeon/15.png",{top:"BAB",right:"BBB",bottom:"BAB",left:"BBB"}),new a("/dungeon/16.png",{top:"BAA",right:"AAB",bottom:"BBB",left:"BBB"}),new a("/dungeon/17.png",{top:"AAB",right:"BAB",bottom:"BBB",left:"BAA"}),new a("/dungeon/18.png",{top:"BAB",right:"BAB",bottom:"BBB",left:"BAB"}),new a("/dungeon/19.png",{top:"BAB",right:"BAB",bottom:"BAB",left:"BAB"}),new a("/dungeon/20.png",{top:"BAB",right:"BAB",bottom:"BAB",left:"BBB"}),new a("/dungeon/21.png",{top:"BAB",right:"BAA",bottom:"AAA",left:"AAB"}),new a("/dungeon/22.png",{top:"BAB",right:"BAB",bottom:"BAB",left:"BAB"}),new a("/dungeon/23.png",{top:"BAB",right:"BBB",bottom:"BAB",left:"BBB"}),new a("/dungeon/24.png",{top:"BAA",right:"AAB",bottom:"BAA",left:"AAB"}),new a("/dungeon/25.png",{top:"BAA",right:"AAB",bottom:"BAB",left:"BAB"}),new a("/dungeon/26.png",{top:"AAA",right:"AAB",bottom:"BAA",left:"AAA"})],R=(n,e)=>{e==="horizontal"?n.scale(1,-1):e==="vertical"&&n.scale(-1,1)},F=(n,e,l)=>{const t=n.getContext("2d");if(!t)throw new Error("Could not get canvas context");n.height=e.length*100,n.width=1e3,t.clearRect(0,0,n.width,n.height);let i=e[0].image,o=0,r=-85;for(let B=0;B<e.length;B++){const c=e[B],y=l[c.image];i!==c.image||r>800?(o+=s+25,r=0,i=c.image):r+=s+5,t.save(),c.rotation&&c.flipDirection?(t.translate(r+s/2,o+s/2),R(t,c.flipDirection),t.rotate(c.rotation*Math.PI/180),t.drawImage(y,-80/2,-80/2,s,s)):c.rotation?(t.translate(r+s/2,o+s/2),t.rotate(c.rotation*Math.PI/180),t.drawImage(y,-80/2,-80/2,s,s)):c.flipDirection?(t.translate(r+s/2,o+s/2),R(t,c.flipDirection),t.drawImage(y,-80/2,-80/2,s,s)):t.drawImage(y,r,o,s,s),t.restore(),t.font="10px Arial",t.fillStyle="orange",t.textAlign="center",t.fillText(c.sockets.top[0],r+s/2-s/4,o+10),t.fillText(c.sockets.top[1],r+s/2,o+10),t.fillText(c.sockets.top[2],r+s/2+s/4,o+10),t.fillText(c.sockets.right[0],r+s-10,o+s/2-s/4),t.fillText(c.sockets.right[1],r+s-10,o+s/2),t.fillText(c.sockets.right[2],r+s-10,o+s/2+s/4),t.fillText(c.sockets.bottom[0],r+s/2+s/4,o+s-10),t.fillText(c.sockets.bottom[1],r+s/2,o+s-10),t.fillText(c.sockets.bottom[2],r+s/2-s/4,o+s-10),t.fillText(c.sockets.left[0],r+10,o+s/2+s/4),t.fillText(c.sockets.left[1],r+10,o+s/2),t.fillText(c.sockets.left[2],r+10,o+s/2-s/4),t.font="10px Arial",t.fillStyle="black",t.textAlign="center",t.fillText(`${c.rotation?`${c.rotation}°`:"0°"} - ${c.flipDirection?c.flipDirection:"original"}`,r+s/2,o+s+15)}},M=(n,e,l)=>{const t=n.getContext("2d");if(!t)throw new Error("Could not get canvas context");t.clearRect(0,0,n.width,n.height),e.cells.forEach(i=>{const o=i.x*s,r=i.y*s,B=i.collapsed;if(B){const c=l[B.image];B.rotation&&B.flipDirection?(t.save(),t.translate(o+s/2,r+s/2),R(t,B.flipDirection),t.rotate(B.rotation*Math.PI/180),t.drawImage(c,-80/2,-80/2,s,s),t.restore()):B.rotation?(t.save(),t.translate(o+s/2,r+s/2),t.rotate(B.rotation*Math.PI/180),t.drawImage(c,-80/2,-80/2,s,s),t.restore()):B.flipDirection?(t.save(),t.translate(o+s/2,r+s/2),R(t,B.flipDirection),t.drawImage(c,-80/2,-80/2,s,s),t.restore()):t.drawImage(c,o,r,s,s)}else i.options.length===0&&(t.fillStyle="red",t.fillRect(o,r,s,s))})},H=(n,e)=>{const{top:l,right:t,bottom:i,left:o}=n.sockets,{rotation:r,image:B,flipDirection:c}=n;if(c)throw new Error("Tile already flipped");const y={horizontal:{top:p(i),right:p(t),bottom:p(l),left:p(o)},vertical:{top:p(l),right:p(o),bottom:p(i),left:p(t)}};return new a(B,y[e],r,e)},S=n=>{const{top:e,right:l,bottom:t,left:i}=n.sockets,{rotation:o,image:r,flipDirection:B}=n;return new a(r,{top:i,right:e,bottom:l,left:t},(o+90)%360,B)},Y=n=>{const e=[];n.forEach(o=>{const r=S(o),B=S(r),c=S(B);e.push(o,r,B,c)});const l=[];e.forEach(o=>{const r=H(o,"horizontal"),B=H(o,"vertical");l.push(o,r,B)});const t=l.sort((o,r)=>o.image.localeCompare(r.image)),i=[];return t.forEach(o=>{if(o.sockets.top==="AAA"&&o.sockets.right==="AAA"&&o.sockets.bottom==="AAA"&&o.sockets.left==="AAA"&&o.rotation===0&&o.flipDirection===null){i.push(o);return}i.some(r=>r.image===o.image&&r.sockets.top===o.sockets.top&&r.sockets.right===o.sockets.right&&r.sockets.bottom===o.sockets.bottom&&r.sockets.left===o.sockets.left)||i.push(o)}),console.log(i),i};let I=-1;const f={},x=Y(J);let d=new q(0,0,x,!0,!0);const k=document.getElementById("map"),O=document.getElementById("debugCanvas"),P=()=>{const n=Number(document.getElementById("height").value),e=Number(document.getElementById("width").value),l=document.getElementById("allowOpenEdges").checked,t=document.getElementById("autoRestart").checked;d=new q(e,n,x,l,t),k.height=n*s,k.width=e*s};J.forEach(n=>{const e=new Image;e.src=`.${n.image}`,f[n.image]=e});const z=()=>{const e=d.collapseNextCell().getNeighbors();Object.values(e).forEach(l=>{l&&!l.collapsed&&l.evaluate()})},Q=()=>{if(!d.cells.some(n=>!n.collapsed)){console.log("All cells collapsed"),cancelAnimationFrame(I);return}z(),M(k,d,f),I=requestAnimationFrame(Q)},U=()=>{if(d.cells.some(n=>!n.collapsed))z(),U();else{console.log("All cells collapsed"),M(k,d,f);return}};var K;(K=document.getElementById("collapseNext"))==null||K.addEventListener("click",()=>{z(),M(k,d,f),F(O,x,f)});var V;(V=document.getElementById("collapseAllSlow"))==null||V.addEventListener("click",()=>{cancelAnimationFrame(I),P(),Q(),F(O,x,f)});var Z;(Z=document.getElementById("collapseAllFast"))==null||Z.addEventListener("click",()=>{cancelAnimationFrame(I),P(),U(),F(O,x,f)});var _;(_=document.getElementById("reset"))==null||_.addEventListener("click",()=>{cancelAnimationFrame(I),P(),M(k,d,f),F(O,x,f)});setTimeout(()=>{P(),M(k,d,f),F(O,x,f)},1e3);

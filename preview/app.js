const posts=[{name:"mii",body:"この店よかった。また行きたい",tag:"カフェ",dist:"300m",insta:"mii",likes:2,liked:false,comments:["わかる、ここ気になってた"]},{name:"sora",body:"今日これ観てきた。普通に好き",tag:"映画",dist:"1.2km",insta:"sora",likes:5,liked:false,comments:[]},{name:"kei",body:"仕事終わり。ちょっとだけ飲む",tag:"酒",dist:"2.1km",insta:"kei",likes:1,liked:false,comments:[]}];
const feed=document.querySelector("#feed");
const photoInput=document.querySelector("#photo"), photoPreview=document.querySelector("#photoPreview");
let selectedPhoto="";
photoInput.onchange=()=>{const file=photoInput.files[0];if(!file)return;const reader=new FileReader();reader.onload=()=>{selectedPhoto=reader.result;photoPreview.src=selectedPhoto;photoPreview.classList.remove("hidden")};reader.readAsDataURL(file)};
function render(){feed.innerHTML=posts.map((p,i)=>`<article class="post"><div class="who"><div class="avatar">○</div><span class="name">${esc(p.name)}</span><span class="meta">${p.dist}</span></div>${p.image?`<img class="postImage" src="${p.image}">`:""}<div class="body">${esc(p.body)}</div><div class="tag">#${esc(p.tag)}</div><div class="actions"><button class="like ${p.liked?"liked":""}" data-i="${i}">${p.liked?"♥":"♡"} ${p.likes}</button><button class="comment" data-i="${i}">💬 ${p.comments.length}</button><button class="insta" data-user="${esc(p.insta)}">Instagram →</button></div>${p.comments.length?`<div class="comments">${p.comments.map(c=>`<div><b>you</b> ${esc(c)}</div>`).join("")}</div>`:""}</article>`).join("");
document.querySelectorAll(".like").forEach(b=>b.onclick=()=>{const p=posts[+b.dataset.i];p.liked=!p.liked;p.likes+=p.liked?1:-1;render()});
document.querySelectorAll(".comment").forEach(b=>b.onclick=()=>{const i=+b.dataset.i;openComment(i)});
document.querySelectorAll(".insta").forEach(b=>b.onclick=()=>window.open("https://instagram.com/"+b.dataset.user,"_blank"))}
function esc(s){return String(s).replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[m]))}
function openComment(i){const t=prompt("コメント");if(t&&t.trim()){posts[i].comments.push(t.trim());render()}}
render();
document.querySelector("#fab").onclick=()=>document.querySelector("#modal").classList.remove("hidden");
document.querySelector("#close").onclick=()=>document.querySelector("#modal").classList.add("hidden");
document.querySelector("#post").onclick=()=>{const t=document.querySelector("#text").value.trim();if(!t)return;posts.unshift({name:"you",body:t,tag:(document.querySelector("#tag").value.trim()||"日常"),dist:"今ここ",insta:"",image:selectedPhoto,likes:0,liked:false,comments:[]});document.querySelector("#text").value="";document.querySelector("#modal").classList.add("hidden");render()};
document.querySelectorAll("nav button").forEach(b=>b.onclick=()=>{if(b.dataset.tab==="home")render();else if(b.dataset.tab==="notice")alert("通知");else alert("プロフィール")});
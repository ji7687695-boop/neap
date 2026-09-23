const posts=[
{name:"のりゆき",body:"タップして撮影",tag:"日常",time:"18:00",image:"",likes:0,liked:false,comments:[]},
{name:"のぞみ",body:"",tag:"日常",time:"18:00",image:"",likes:0,liked:false,comments:[]}
];
const feed=document.getElementById("feed");
const modal=document.getElementById("modal");
const photo=document.getElementById("photo");
const preview=document.getElementById("photoPreview");
let selected="";
function esc(v){const d=document.createElement("div");d.textContent=v||"";return d.innerHTML}
function render(){
 feed.innerHTML="";
 posts.forEach((p,i)=>{
  const el=document.createElement("article");el.className="post";
  el.innerHTML='<div class="who"><div class="avatar">○</div><span class="name">'+esc(p.name)+'</span><span class="time">'+esc(p.time)+'</span></div>'+
   (p.image?'<img class="postImage" src="'+p.image+'">':"")+
   (p.body?'<div class="body">'+esc(p.body)+'</div>':"")+
   '<div class="tag">#'+esc(p.tag)+'</div><div class="actions">'+
   '<button class="like" data-i="'+i+'">'+(p.liked?"♥":"♡")+'</button><span class="count">'+p.likes+'</span>'+
   '<button class="comment" data-i="'+i+'">💬</button><span class="count">'+p.comments.length+'</span>'+
   '<button class="insta" data-i="'+i+'">Instagram ↗</button></div>'+
   (p.comments.length?'<div class="comments">'+p.comments.map(c=>'<div>you　'+esc(c)+'</div>').join("")+'</div>':"");
  feed.appendChild(el);
 });
}
feed.addEventListener("click",e=>{
 const b=e.target.closest("button");if(!b)return;const i=Number(b.dataset.i);
 if(b.classList.contains("like")){posts[i].liked=!posts[i].liked;posts[i].likes+=posts[i].liked?1:-1;render()}
 if(b.classList.contains("comment")){const t=window.prompt("コメント");if(t&&t.trim()){posts[i].comments.push(t.trim());render()}}
 if(b.classList.contains("insta")){window.open("https://www.instagram.com/","_blank")}
});
document.getElementById("fab").addEventListener("click",()=>modal.classList.remove("hidden"));
document.getElementById("close").addEventListener("click",()=>modal.classList.add("hidden"));
document.querySelector(".photo").addEventListener("click",()=>photo.click());
photo.addEventListener("change",()=>{
 const file=photo.files&&photo.files[0];if(!file)return;
 const reader=new FileReader();
 reader.onload=()=>{selected=reader.result;preview.src=selected;preview.classList.remove("hidden")};
 reader.readAsDataURL(file);
});
document.getElementById("post").addEventListener("click",()=>{
 const text=document.getElementById("text").value.trim();
 const tag=document.getElementById("tag").value.trim()||"日常";
 if(!text&&!selected){window.alert("写真か一言を追加してください");return}
 posts.unshift({name:"you",body:text,tag:tag,time:new Date().toLocaleTimeString("ja-JP",{hour:"2-digit",minute:"2-digit"}),image:selected,likes:0,liked:false,comments:[]});
 selected="";photo.value="";preview.src="";preview.classList.add("hidden");document.getElementById("text").value="";document.getElementById("tag").value="";modal.classList.add("hidden");render();
});
document.getElementById("mode").addEventListener("click",()=>window.alert("日常・映画・野球・飲み・カフェ"));
render();
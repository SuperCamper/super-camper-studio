const canvas = document.getElementById("canvas");

const bgImage = document.getElementById("bgImage");
const camperPhoto = document.getElementById("camperPhoto");

const camperName = document.getElementById("camperName");
const camperReason = document.getElementById("camperReason");
const camperGroup = document.getElementById("camperGroup");


// ---------------------
// Templates
// ---------------------

const templateSelect = document.getElementById("templateSelect");

if(templateSelect){

templateSelect.addEventListener("change", ()=>{

bgImage.src = templateSelect.value;

});

}


// ---------------------
// Upload Background
// ---------------------

const bgUpload = document.getElementById("bgUpload");

if(bgUpload){

bgUpload.addEventListener("change",(e)=>{

const file = e.target.files[0];

if(!file) return;

const reader = new FileReader();

reader.onload = function(ev){

bgImage.src = ev.target.result;

};

reader.readAsDataURL(file);

});

}


// ---------------------
// Upload Photo
// ---------------------

const photoUpload = document.getElementById("photoUpload");

if(photoUpload){

photoUpload.addEventListener("change",(e)=>{

const file = e.target.files[0];

if(!file) return;

const reader = new FileReader();

reader.onload = function(ev){

camperPhoto.src = ev.target.result;

};

reader.readAsDataURL(file);

});

}


// ---------------------
// Text Inputs
// ---------------------

const nameInput = document.getElementById("nameInput");
const reasonInput = document.getElementById("reasonInput");
const groupInput = document.getElementById("groupInput");

if(nameInput){

nameInput.addEventListener("input",()=>{

camperName.innerText=nameInput.value;

});

}

if(reasonInput){

reasonInput.addEventListener("input",()=>{

camperReason.innerText=reasonInput.value;

});

}

if(groupInput){

groupInput.addEventListener("input",()=>{

camperGroup.innerText=groupInput.value;

});

}


// ---------------------
// Font Size
// ---------------------

const fontSize = document.getElementById("fontSize");

if(fontSize){

fontSize.addEventListener("input",()=>{

camperName.style.fontSize = fontSize.value + "px";

});

}


// ---------------------
// Text Color
// ---------------------

const textColor = document.getElementById("textColor");

if(textColor){

textColor.addEventListener("input",()=>{

camperName.style.color = textColor.value;
camperReason.style.color = textColor.value;
camperGroup.style.color = textColor.value;

});

}


// ---------------------
// Drag Function
// ---------------------

function makeDraggable(el){

let isDown=false;
let offsetX=0;
let offsetY=0;

el.addEventListener("mousedown",(e)=>{

isDown=true;

offsetX=e.clientX-el.offsetLeft;
offsetY=e.clientY-el.offsetTop;

});

document.addEventListener("mousemove",(e)=>{

if(!isDown) return;

el.style.left=(e.clientX-offsetX)+"px";
el.style.top=(e.clientY-offsetY)+"px";

});

document.addEventListener("mouseup",()=>{

isDown=false;

});

}

makeDraggable(camperPhoto);
makeDraggable(camperName);
makeDraggable(camperReason);
makeDraggable(camperGroup);


// ---------------------
// Touch Mobile
// ---------------------

function makeTouchDraggable(el){

let startX=0;
let startY=0;

el.addEventListener("touchstart",(e)=>{

startX=e.touches[0].clientX-el.offsetLeft;
startY=e.touches[0].clientY-el.offsetTop;

});

el.addEventListener("touchmove",(e)=>{

e.preventDefault();

el.style.left=
(e.touches[0].clientX-startX)+"px";

el.style.top=
(e.touches[0].clientY-startY)+"px";

});

}

makeTouchDraggable(camperPhoto);
makeTouchDraggable(camperName);
makeTouchDraggable(camperReason);
makeTouchDraggable(camperGroup);


// ---------------------
// Export PNG
// ---------------------

const exportBtn = document.getElementById("exportPNG");

if(exportBtn){

exportBtn.addEventListener("click",()=>{

html2canvas(canvas,{
scale:2
}).then(c=>{

const link=document.createElement("a");

link.download="super-camper.png";

link.href=c.toDataURL();

link.click();

});

});

}


// ---------------------
// Print
// ---------------------

const printBtn = document.getElementById("printBtn");

if(printBtn){

printBtn.addEventListener("click",()=>{

window.print();

});

}

// ============================
// SUPER CAMPER STUDIO V8
// ============================

const canvas = document.getElementById("canvas");

const backgroundImage =
document.getElementById("backgroundImage");

const photo =
document.getElementById("photo");

const nameText =
document.getElementById("nameText");

const reasonText =
document.getElementById("reasonText");

const groupText =
document.getElementById("groupText");

let selectedObject = nameText;

// ============================
// SELECT OBJECT
// ============================

function selectObject(el){

    document
    .querySelectorAll(".draggable")
    .forEach(item=>{

        item.classList.remove("selected");

    });

    el.classList.add("selected");

    selectedObject = el;

    updatePositionInputs();
}

document
.querySelectorAll(".draggable")
.forEach(item=>{

    item.addEventListener("click",()=>{

        selectObject(item);

    });

});

// ============================
// DRAG ENGINE
// ============================

let dragging = false;
let offsetX = 0;
let offsetY = 0;

function startDrag(e){

    selectObject(this);

    dragging = true;

    const rect =
    this.getBoundingClientRect();

    const clientX =
    e.touches
    ? e.touches[0].clientX
    : e.clientX;

    const clientY =
    e.touches
    ? e.touches[0].clientY
    : e.clientY;

    offsetX =
    clientX - rect.left;

    offsetY =
    clientY - rect.top;
}

function drag(e){

    if(!dragging) return;

    const canvasRect =
    canvas.getBoundingClientRect();

    const clientX =
    e.touches
    ? e.touches[0].clientX
    : e.clientX;

    const clientY =
    e.touches
    ? e.touches[0].clientY
    : e.clientY;

    selectedObject.style.left =
    (clientX - canvasRect.left - offsetX)
    + "px";

    selectedObject.style.top =
    (clientY - canvasRect.top - offsetY)
    + "px";

    updatePositionInputs();
}

function stopDrag(){

    dragging = false;
}

document
.querySelectorAll(".draggable")
.forEach(item=>{

    item.addEventListener(
        "mousedown",
        startDrag
    );

    item.addEventListener(
        "touchstart",
        startDrag
    );

});

document.addEventListener(
    "mousemove",
    drag
);

document.addEventListener(
    "touchmove",
    drag
);

document.addEventListener(
    "mouseup",
    stopDrag
);

document.addEventListener(
    "touchend",
    stopDrag
);

// ============================
// TEMPLATE SWITCH
// ============================

document
.getElementById("templateSelect")
.addEventListener("change",e=>{

    backgroundImage.src =
    e.target.value;

});

// ============================
// BACKGROUND UPLOAD
// ============================

document
.getElementById("backgroundUpload")
.addEventListener("change",e=>{

    const file =
    e.target.files[0];

    if(!file) return;

    const reader =
    new FileReader();

    reader.onload = function(ev){

        backgroundImage.src =
        ev.target.result;

    }

    reader.readAsDataURL(file);

});

// ============================
// PHOTO UPLOAD
// ============================

document
.getElementById("photoUpload")
.addEventListener("change",e=>{

    const file =
    e.target.files[0];

    if(!file) return;

    const reader =
    new FileReader();

    reader.onload = function(ev){

        photo.src =
        ev.target.result;

    }

    reader.readAsDataURL(file);

});

// ============================
// TEXT INPUT
// ============================

document
.getElementById("nameInput")
.addEventListener("input",e=>{

    nameText.innerText =
    e.target.value;

});

document
.getElementById("reasonInput")
.addEventListener("input",e=>{

    reasonText.innerText =
    e.target.value;

});

document
.getElementById("groupInput")
.addEventListener("input",e=>{

    groupText.innerText =
    e.target.value;

});

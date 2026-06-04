// =========================
// SUPER CAMPER STUDIO V7 PRO
// =========================

const canvas = document.getElementById("canvas");

const photo = document.getElementById("photo");

const nameText = document.getElementById("nameText");
const reasonText = document.getElementById("reasonText");
const groupText = document.getElementById("groupText");

const backgroundImage =
document.getElementById("backgroundImage");

// =========================
// ACTIVE OBJECT
// =========================

let activeObject = nameText;

function setActive(element){

    document
    .querySelectorAll(".draggable")
    .forEach(el=>{
        el.classList.remove("active");
    });

    element.classList.add("active");

    activeObject = element;

    updatePositionSliders();
}

document
.querySelectorAll(".draggable")
.forEach(el=>{

    el.addEventListener("click",()=>{
        setActive(el);
    });

});

setActive(nameText);

// =========================
// TEXT INPUT
// =========================

document
.getElementById("nameInput")
.addEventListener("input",e=>{

    nameText.innerText = e.target.value;

});

document
.getElementById("reasonInput")
.addEventListener("input",e=>{

    reasonText.innerText = e.target.value;

});

document
.getElementById("groupInput")
.addEventListener("input",e=>{

    groupText.innerText = e.target.value;

});

// =========================
// TEMPLATE
// =========================

document
.getElementById("templateSelect")
.addEventListener("change",e=>{

    backgroundImage.src = e.target.value;

});

// =========================
// BACKGROUND UPLOAD
// =========================

document
.getElementById("backgroundUpload")
.addEventListener("change",e=>{

    const file = e.target.files[0];

    if(!file) return;

    const reader = new FileReader();

    reader.onload = function(evt){

        backgroundImage.src =
        evt.target.result;

    };

    reader.readAsDataURL(file);

});

// =========================
// PHOTO UPLOAD
// =========================

document
.getElementById("photoUpload")
.addEventListener("change",e=>{

    const file = e.target.files[0];

    if(!file) return;

    const reader = new FileReader();

    reader.onload = function(evt){

        photo.src = evt.target.result;

    };

    reader.readAsDataURL(file);

});

// =========================
// DRAG ENGINE
// =========================

let isDragging = false;

let offsetX = 0;
let offsetY = 0;

function dragStart(e){

    setActive(this);

    isDragging = true;

    const rect =
    this.getBoundingClientRect();

    const clientX =
    e.touches ? e.touches[0].clientX : e.clientX;

    const clientY =
    e.touches ? e.touches[0].clientY : e.clientY;

    offsetX = clientX - rect.left;
    offsetY = clientY - rect.top;
}

function dragMove(e){

    if(!isDragging || !activeObject)
        return;

    const canvasRect =
    canvas.getBoundingClientRect();

    const clientX =
    e.touches ? e.touches[0].clientX : e.clientX;

    const clientY =
    e.touches ? e.touches[0].clientY : e.clientY;

    let x =
    clientX -
    canvasRect.left -
    offsetX;

    let y =
    clientY -
    canvasRect.top -
    offsetY;

    activeObject.style.left =
    x + "px";

    activeObject.style.top =
    y + "px";

    updatePositionSliders();
}

function dragEnd(){

    isDragging = false;
}

document
.querySelectorAll(".draggable")
.forEach(el=>{

    el.addEventListener(
        "mousedown",
        dragStart
    );

    el.addEventListener(
        "touchstart",
        dragStart
    );

});

document.addEventListener(
    "mousemove",
    dragMove
);

document.addEventListener(
    "touchmove",
    dragMove
);

document.addEventListener(
    "mouseup",
    dragEnd
);

document.addEventListener(
    "touchend",
    dragEnd
);

// =========================
// POSITION SLIDERS
// =========================

const xPos =
document.getElementById("xPos");

const yPos =
document.getElementById("yPos");

function updatePositionSliders(){

    xPos.value =
    parseInt(activeObject.style.left)||0;

    yPos.value =
    parseInt(activeObject.style.top)||0;
}

xPos.addEventListener("input",()=>{

    activeObject.style.left =
    xPos.value + "px";

});

yPos.addEventListener("input",()=>{

    activeObject.style.top =
    yPos.value + "px";

});

// =========================
// TEXT SETTINGS
// =========================

function currentText(){

    return document.getElementById(
        document.getElementById(
        "selectedText").value
    );

}

document
.getElementById("fontFamily")
.addEventListener("change",e=>{

    currentText().style.fontFamily =
    e.target.value;

});

document
.getElementById("fontSize")
.addEventListener("input",e=>{

    currentText().style.fontSize =
    e.target.value + "px";

});

document
.getElementById("textColor")
.addEventListener("input",e=>{

    currentText().style.color =
    e.target.value;

});

document
.getElementById("shadowColor")
.addEventListener("input",e=>{

    currentText().style.textShadow =
    `3px 3px 4px ${e.target.value}`;

});

document
.getElementById("boldText")
.addEventListener("change",e=>{

    currentText().style.fontWeight =
    e.target.checked
    ? "700"
    : "400";

});

document
.getElementById("italicText")
.addEventListener("change",e=>{

    currentText().style.fontStyle =
    e.target.checked
    ? "italic"
    : "normal";

});

// =========================
// PHOTO SETTINGS
// =========================

document
.getElementById("photoSize")
.addEventListener("input",e=>{

    photo.style.width =
    e.target.value + "px";

});

document
.getElementById("photoRadius")
.addEventListener("input",e=>{

    photo.style.borderRadius =
    e.target.value + "%";

});

// =========================
// EXPORT PNG
// =========================

document
.getElementById("exportPNG")
.addEventListener("click",()=>{

    html2canvas(canvas)
    .then(c=>{

        const link =
        document.createElement("a");

        link.download =
        "super-camper.png";

        link.href =
        c.toDataURL();

        link.click();

    });

});

// =========================
// PRINT
// =========================

document
.getElementById("printBtn")
.addEventListener("click",()=>{

    window.print();

});

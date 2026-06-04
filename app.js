/* ==========================
   SUPER CAMPER STUDIO V10 PRO MAX
========================== */

const canvas = document.getElementById("canvas");

const photo = document.getElementById("photo");
const bg = document.getElementById("backgroundImage");

const nameText = document.getElementById("nameText");
const reasonText = document.getElementById("reasonText");
const groupText = document.getElementById("groupText");

const photoUpload = document.getElementById("photoUpload");
const backgroundUpload = document.getElementById("backgroundUpload");

const nameInput = document.getElementById("nameInput");
const reasonInput = document.getElementById("reasonInput");
const groupInput = document.getElementById("groupInput");

const layersPanel = document.getElementById("layersPanel");

const selectedText = document.getElementById("selectedText");

const fontFamily = document.getElementById("fontFamily");
const fontSize = document.getElementById("fontSize");

const textColor = document.getElementById("textColor");
const shadowColor = document.getElementById("shadowColor");

const boldText = document.getElementById("boldText");
const italicText = document.getElementById("italicText");

const photoSize = document.getElementById("photoSize");
const photoRadius = document.getElementById("photoRadius");

const xPos = document.getElementById("xPos");
const yPos = document.getElementById("yPos");

const exportPNG = document.getElementById("exportPNG");
const saveBtn = document.getElementById("saveBtn");
const loadProject = document.getElementById("loadProject");

let activeElement = null;

let undoStack = [];
let redoStack = [];

/* ==========================
   SELECT OBJECT
========================== */

function selectElement(el){

    document
        .querySelectorAll(".selected")
        .forEach(x=>x.classList.remove("selected"));

    activeElement = el;

    el.classList.add("selected");

    updatePositionPanel();
}

/* ==========================
   DRAG ENGINE
========================== */

document
.querySelectorAll(".draggable")
.forEach(enableDrag);

function enableDrag(el){

    let isDragging=false;
    let offsetX=0;
    let offsetY=0;

    el.addEventListener("mousedown",(e)=>{

        selectElement(el);

        isDragging=true;

        offsetX=e.offsetX;
        offsetY=e.offsetY;

    });

    document.addEventListener("mousemove",(e)=>{

        if(!isDragging) return;

        const rect=canvas.getBoundingClientRect();

        el.style.left=
            (e.clientX-rect.left-offsetX)+"px";

        el.style.top=
            (e.clientY-rect.top-offsetY)+"px";

        updatePositionPanel();

    });

    document.addEventListener("mouseup",()=>{

        isDragging=false;

        saveState();

    });

}

/* ==========================
   TEXT INPUTS
========================== */

nameInput.addEventListener("input",()=>{

    nameText.innerText=nameInput.value;

});

reasonInput.addEventListener("input",()=>{

    reasonText.innerText=reasonInput.value;

});

groupInput.addEventListener("input",()=>{

    groupText.innerText=groupInput.value;

});

/* ==========================
   PHOTO UPLOAD
========================== */

photoUpload.addEventListener("change",(e)=>{

    const file=e.target.files[0];

    if(!file) return;

    const reader=new FileReader();

    reader.onload=()=>{

        photo.src=reader.result;

        saveState();

    };

    reader.readAsDataURL(file);

});

/* ==========================
   BACKGROUND UPLOAD
========================== */

backgroundUpload.addEventListener("change",(e)=>{

    const file=e.target.files[0];

    if(!file) return;

    const reader=new FileReader();

    reader.onload=()=>{

        bg.src=reader.result;

        saveState();

    };

    reader.readAsDataURL(file);

});

/* ==========================
   FONT SETTINGS
========================== */

function currentText(){

    return document.getElementById(
        selectedText.value
    );
}

fontFamily.addEventListener("change",()=>{

    currentText().style.fontFamily=
        fontFamily.value;

});

fontSize.addEventListener("input",()=>{

    currentText().style.fontSize=
        fontSize.value+"px";

});

textColor.addEventListener("input",()=>{

    currentText().style.color=
        textColor.value;

});

shadowColor.addEventListener("input",()=>{

    currentText().style.textShadow=
        "3px 3px 5px "+shadowColor.value;

});

boldText.addEventListener("change",()=>{

    currentText().style.fontWeight=
        boldText.checked?"700":"400";

});

italicText.addEventListener("change",()=>{

    currentText().style.fontStyle=
        italicText.checked?"italic":"normal";

});

/* ==========================
   PHOTO SETTINGS
========================== */

photoSize.addEventListener("input",()=>{

    photo.style.width=
        photoSize.value+"px";

});

photoRadius.addEventListener("input",()=>{

    photo.style.borderRadius=
        photoRadius.value+"px";

});

/* ==========================
   POSITION
========================== */

xPos.addEventListener("input",()=>{

    if(!activeElement) return;

    activeElement.style.left=
        xPos.value+"px";

});

yPos.addEventListener("input",()=>{

    if(!activeElement) return;

    activeElement.style.top=
        yPos.value+"px";

});

function updatePositionPanel(){

    if(!activeElement) return;

    xPos.value=parseInt(
        activeElement.style.left||0
    );

    yPos.value=parseInt(
        activeElement.style.top||0
    );

}

/* ==========================
   LAYERS
========================== */

function refreshLayers(){

    layersPanel.innerHTML="";

    [
        nameText,
        reasonText,
        groupText,
        photo
    ].forEach(el=>{

        const item=document.createElement("div");

        item.className="layer-item";

        item.innerText=
            el.id.replace("Text","");

        item.onclick=()=>{

            selectElement(el);

        };

        layersPanel.appendChild(item);

    });

}

refreshLayers();

/* ==========================
   SAVE STATE
========================== */

function saveState(){

    const state=canvas.innerHTML;

    undoStack.push(state);

    if(undoStack.length>50){

        undoStack.shift();

    }

}

/* ==========================
   UNDO REDO
========================== */

document
.getElementById("undoBtn")
?.addEventListener("click",()=>{

    if(undoStack.length<2) return;

    redoStack.push(
        undoStack.pop()
    );

    canvas.innerHTML=
        undoStack[
            undoStack.length-1
        ];

});

document
.getElementById("redoBtn")
?.addEventListener("click",()=>{

    if(!redoStack.length) return;

    const state=
        redoStack.pop();

    undoStack.push(state);

    canvas.innerHTML=state;

});

/* ==========================
   SAVE PROJECT
========================== */

saveBtn.addEventListener("click",()=>{

    const data={

        canvas:canvas.innerHTML

    };

    const blob=new Blob(

        [JSON.stringify(data)],

        {type:"application/json"}

    );

    const a=document.createElement("a");

    a.href=URL.createObjectURL(blob);

    a.download="project.scs";

    a.click();

});

/* ==========================
   LOAD PROJECT
========================== */

loadProject.addEventListener("change",(e)=>{

    const file=e.target.files[0];

    if(!file) return;

    const reader=new FileReader();

    reader.onload=()=>{

        const data=
            JSON.parse(reader.result);

        canvas.innerHTML=
            data.canvas;

    };

    reader.readAsText(file);

});

/* ==========================
   EXPORT PNG
========================== */

exportPNG.addEventListener("click",()=>{

    html2canvas(canvas).then(c=>{

        const a=
            document.createElement("a");

        a.download=
            "certificate.png";

        a.href=
            c.toDataURL();

        a.click();

    });

});

/* ==========================
   INIT
========================== */

saveState();

selectElement(nameText);

console.log(
    "SUPER CAMPER STUDIO V10 PRO MAX READY"
);

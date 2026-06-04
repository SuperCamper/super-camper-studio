// ============================
// SUPER CAMPER STUDIO PRO
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

    autoSave();
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
// TEMPLATE
// ============================

document
.getElementById("templateSelect")
.addEventListener("change",e=>{

    backgroundImage.src =
    e.target.value;

    autoSave();
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

    reader.onload = ev=>{

        backgroundImage.src =
        ev.target.result;

        autoSave();
    };

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

    reader.onload = ev=>{

        photo.src =
        ev.target.result;

        autoSave();
    };

    reader.readAsDataURL(file);

});

// ============================
// TEXT INPUTS
// ============================

document
.getElementById("nameInput")
.addEventListener("input",e=>{

    nameText.innerText =
    e.target.value;

    autoSave();
});

document
.getElementById("reasonInput")
.addEventListener("input",e=>{

    reasonText.innerText =
    e.target.value;

    autoSave();
});

document
.getElementById("groupInput")
.addEventListener("input",e=>{

    groupText.innerText =
    e.target.value;

    autoSave();
});

// ============================
// SELECT DROPDOWN
// ============================

document
.getElementById("selectedText")
.addEventListener("change",e=>{

    selectObject(
        document.getElementById(
            e.target.value
        )
    );

});

// ============================
// FONT FAMILY
// ============================

document
.getElementById("fontFamily")
.addEventListener("change",e=>{

    selectedObject.style.fontFamily =
    e.target.value;

    autoSave();
});

// ============================
// FONT SIZE
// ============================

document
.getElementById("fontSize")
.addEventListener("input",e=>{

    selectedObject.style.fontSize =
    e.target.value + "px";

    autoSave();
});

// ============================
// TEXT COLOR
// ============================

document
.getElementById("textColor")
.addEventListener("input",e=>{

    selectedObject.style.color =
    e.target.value;

    autoSave();
});

// ============================
// SHADOW COLOR
// ============================

document
.getElementById("shadowColor")
.addEventListener("input",e=>{

    selectedObject.style.textShadow =
    `3px 3px 5px ${e.target.value}`;

    autoSave();
});

// ============================
// BOLD
// ============================

document
.getElementById("boldText")
.addEventListener("change",e=>{

    selectedObject.style.fontWeight =
    e.target.checked
    ? "700"
    : "400";

    autoSave();
});

// ============================
// ITALIC
// ============================

document
.getElementById("italicText")
.addEventListener("change",e=>{

    selectedObject.style.fontStyle =
    e.target.checked
    ? "italic"
    : "normal";

    autoSave();
});

// ============================
// PHOTO SIZE
// ============================

document
.getElementById("photoSize")
.addEventListener("input",e=>{

    photo.style.width =
    e.target.value + "px";

    autoSave();
});

// ============================
// PHOTO RADIUS
// ============================

document
.getElementById("photoRadius")
.addEventListener("input",e=>{

    photo.style.borderRadius =
    e.target.value + "px";

    autoSave();
});

// ============================
// POSITION
// ============================

const xPos =
document.getElementById("xPos");

const yPos =
document.getElementById("yPos");

function updatePositionInputs(){

    if(!selectedObject) return;

    xPos.value =
    parseInt(
        selectedObject.style.left || 0
    );

    yPos.value =
    parseInt(
        selectedObject.style.top || 0
    );
}

xPos.addEventListener("input",()=>{

    selectedObject.style.left =
    xPos.value + "px";

    autoSave();
});

yPos.addEventListener("input",()=>{

    selectedObject.style.top =
    yPos.value + "px";

    autoSave();
});

// ============================
// KEYBOARD MOVE
// ============================

document
.addEventListener("keydown",e=>{

    if(!selectedObject) return;

    let left =
    parseInt(
        selectedObject.style.left || 0
    );

    let top =
    parseInt(
        selectedObject.style.top || 0
    );

    switch(e.key){

        case "ArrowLeft":
            left--;
            break;

        case "ArrowRight":
            left++;
            break;

        case "ArrowUp":
            top--;
            break;

        case "ArrowDown":
            top++;
            break;

        default:
            return;
    }

    selectedObject.style.left =
    left + "px";

    selectedObject.style.top =
    top + "px";

    updatePositionInputs();

    autoSave();
});

// ============================
// SAVE PROJECT
// ============================

function autoSave(){

    const data = {

        name:nameText.innerText,
        reason:reasonText.innerText,
        group:groupText.innerText,

        photo:photo.src,

        background:
        backgroundImage.src
    };

    localStorage.setItem(
        "superCamperProject",
        JSON.stringify(data)
    );
}

// ============================
// LOAD PROJECT
// ============================

function loadProject(){

    const data =
    localStorage.getItem(
        "superCamperProject"
    );

    if(!data) return;

    const project =
    JSON.parse(data);

    nameText.innerText =
    project.name || "";

    reasonText.innerText =
    project.reason || "";

    groupText.innerText =
    project.group || "";

    if(project.photo)
        photo.src =
        project.photo;

    if(project.background)
        backgroundImage.src =
        project.background;
}

loadProject();

// ============================
// PNG EXPORT
// ============================

document
.getElementById("exportPNG")
.addEventListener("click",()=>{

    html2canvas(canvas).then(c=>{

        const link =
        document.createElement("a");

        link.download =
        "certificate.png";

        link.href =
        c.toDataURL();

        link.click();

    });

});

// ============================
// PDF EXPORT
// ============================

document
.getElementById("exportPDF")
.addEventListener("click",()=>{

    html2canvas(canvas).then(c=>{

        const img =
        c.toDataURL("image/png");

        const pdf =
        new jspdf.jsPDF(
            "p",
            "mm",
            "a4"
        );

        pdf.addImage(
            img,
            "PNG",
            0,
            0,
            210,
            297
        );

        pdf.save(
            "certificate.pdf"
        );

    });

});

// ============================
// PRINT
// ============================

document
.getElementById("printBtn")
.addEventListener("click",()=>{

    window.print();

});

// ============================
// START
// ============================

selectObject(nameText);
updatePositionInputs();

const state = {
background: null
};

const canvas = document.getElementById("designCanvas");
const ctx = canvas.getContext("2d");

const templateLibrary =
document.getElementById("templateLibrary");

const exportBtn =
document.getElementById("exportBtn");

/* ==========================
Templates
========================== */

const templates = [
"red.png",
"blue.png",
"green.png",
"pink.png",
"yellow.png",
"purple.png"
];

function loadTemplates() {

```
if (!templateLibrary) return;

templateLibrary.innerHTML = "";

templates.forEach(file => {

    const card =
        document.createElement("div");

    card.className =
        "template-card";

    card.innerHTML = `
        <img
        src="assets/templates/${file}"
        alt="${file}">
    `;

    card.addEventListener(
        "click",
        () => applyTemplate(file)
    );

    templateLibrary.appendChild(card);
});
```

}

/* ==========================
Apply Template
========================== */

function applyTemplate(file) {

```
const img = new Image();

img.onload = () => {

    state.background = img;

    redrawCanvas();
};

img.onerror = () => {

    console.error(
        "Cannot load template:",
        file
    );
};

img.src =
    `assets/templates/${file}`;
```

}

/* ==========================
Draw Canvas
========================== */

function redrawCanvas() {

```
ctx.clearRect(
    0,
    0,
    canvas.width,
    canvas.height
);

if (state.background) {

    ctx.drawImage(
        state.background,
        0,
        0,
        canvas.width,
        canvas.height
    );
}
```

}

/* ==========================
Export PNG
========================== */

function exportPNG() {

```
const link =
    document.createElement("a");

link.download =
    "super-camper-design.png";

link.href =
    canvas.toDataURL(
        "image/png"
    );

link.click();
```

}

/* ==========================
Events
========================== */

if (exportBtn) {

```
exportBtn.addEventListener(
    "click",
    exportPNG
);
```

}

/* ==========================
Start
========================== */

window.addEventListener(
"DOMContentLoaded",
() => {

```
    loadTemplates();

    console.log(
        "Super Camper Studio V12 Ready"
    );
}
```

);

const state = {
background: null,
layers: [],
selectedLayer: null
};

const canvas = document.getElementById("designCanvas");
const ctx = canvas.getContext("2d");

const templateLibrary =
document.getElementById("templateLibrary");

const layerList =
document.getElementById("layerList");

/* ======================
Templates
====================== */

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
templateLibrary.innerHTML = "";

templates.forEach(file => {

    const card =
        document.createElement("div");

    card.className = "template-card";

    card.innerHTML =
        `<img src="assets/templates/${file}">`;

    card.onclick = () =>
        applyTemplate(file);

    templateLibrary.appendChild(card);
});
```

}

/* ======================
Background
====================== */

function applyTemplate(file) {

```
const img = new Image();

img.onload = () => {

    state.background = img;

    redrawCanvas();
};

img.src =
    `assets/templates/${file}`;
```

}

/* ======================
Sticker
====================== */

function addSticker(file) {

```
state.layers.push({

    id: Date.now(),

    type: "sticker",

    file,

    x: 100,

    y: 100,

    width: 150,

    height: 150
});

redrawCanvas();
renderLayers();
```

}

/* ======================
Draw
====================== */

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

state.layers.forEach(layer => {

    if (layer.type === "sticker") {

        const img = new Image();

        img.onload = () => {

            ctx.drawImage(
                img,
                layer.x,
                layer.y,
                layer.width,
                layer.height
            );
        };

        img.src =
            `assets/stickers/${layer.file}`;
    }
});
```

}

/* ======================
Layers
====================== */

function renderLayers() {

```
layerList.innerHTML = "";

state.layers.forEach(layer => {

    const item =
        document.createElement("div");

    item.className =
        "layer-item";

    item.textContent =
        layer.file;

    layerList.appendChild(item);
});
```

}

/* ======================
Export
====================== */

function exportPNG() {

```
const link =
    document.createElement("a");

link.download =
    "super-camper.png";

link.href =
    canvas.toDataURL();

link.click();
```

}

/* ======================
Start
====================== */

window.addEventListener(
"DOMContentLoaded",
() => {

```
    loadTemplates();

    console.log(
        "Super Camper Studio Ready"
    );
}
```

);

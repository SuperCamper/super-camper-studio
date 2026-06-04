/* ==========================
   Super Camper Studio V11
   Core Engine
========================== */

const state = {
    layers: [],
    selectedLayer: null,
    undoStack: [],
    redoStack: []
};

/* ==========================
   DOM
========================== */

const fontSelect = document.getElementById("fontSelect");
const templateLibrary = document.getElementById("templateLibrary");
const stickerLibrary = document.getElementById("stickerLibrary");
const layerList = document.getElementById("layerList");

const canvas = document.getElementById("designCanvas");
const ctx = canvas.getContext("2d");

/* ==========================
   Font Loader
========================== */

async function loadFonts() {

    try {

        const response =
            await fetch("assets/fonts/fonts.json");

        const fonts =
            await response.json();

        fontSelect.innerHTML = "";

        for (const font of fonts) {

            try {

                const face = new FontFace(
                    font.name,
                    `url(assets/fonts/${font.file})`
                );

                await face.load();

                document.fonts.add(face);

            } catch (e) {
                console.warn(
                    "Font load failed:",
                    font.file
                );
            }

            const option =
                document.createElement("option");

            option.value = font.name;
            option.textContent = font.name;

            fontSelect.appendChild(option);
        }

        console.log(
            `Loaded ${fonts.length} fonts`
        );

    } catch (err) {

        console.error(
            "fonts.json error",
            err
        );
    }
}

/* ==========================
   Template Loader
========================== */

async function loadTemplates() {

    try {

        const response =
            await fetch(
                "assets/templates/templates.json"
            );

        const templates =
            await response.json();

        templateLibrary.innerHTML = "";

        templates.forEach(template => {

            const card =
                document.createElement("div");

            card.className =
                "template-card";

            card.innerHTML = `
                <img
                    src="assets/templates/${template.file}"
                    alt="${template.name}">
            `;

            card.onclick = () => {
                applyTemplate(template.file);
            };

            templateLibrary.appendChild(card);

        });

    } catch (err) {

        console.warn(
            "templates.json not found"
        );
    }
}

/* ==========================
   Sticker Loader
========================== */

async function loadStickers() {

    try {

        const response =
            await fetch(
                "assets/stickers/stickers.json"
            );

        const stickers =
            await response.json();

        stickerLibrary.innerHTML = "";

        stickers.forEach(sticker => {

            const item =
                document.createElement("div");

            item.className =
                "sticker-item";

            item.innerHTML = `
                <img
                    src="assets/stickers/${sticker.file}">
            `;

            item.onclick = () => {
                addSticker(sticker.file);
            };

            stickerLibrary.appendChild(item);

        });

    } catch (err) {

        console.warn(
            "stickers.json not found"
        );
    }
}

/* ==========================
   Layer System
========================== */

function addLayer(layer) {

    state.layers.push(layer);

    renderLayers();

    saveProject();
}

function renderLayers() {

    layerList.innerHTML = "";

    state.layers.forEach((layer, index) => {

        const div =
            document.createElement("div");

        div.className =
            "layer-item";

        if (
            state.selectedLayer === layer.id
        ) {
            div.classList.add("active");
        }

        div.textContent =
            layer.name || `Layer ${index}`;

        div.onclick = () => {

            state.selectedLayer =
                layer.id;

            renderLayers();
        };

        layerList.appendChild(div);

    });
}

/* ==========================
   Template Apply
========================== */

function applyTemplate(file) {

    const img = new Image();

    img.onload = () => {

        ctx.clearRect(
            0,
            0,
            canvas.width,
            canvas.height
        );

        ctx.drawImage(
            img,
            0,
            0,
            canvas.width,
            canvas.height
        );

        saveProject();
    };

    img.src =
        `assets/templates/${file}`;
}

/* ==========================
   Sticker Add
========================== */

function addSticker(file) {

    const layer = {

        id: Date.now(),

        type: "sticker",

        file: file,

        x: 100,

        y: 100,

        width: 150,

        height: 150,

        name: file

    };

    addLayer(layer);

    drawCanvas();
}

/* ==========================
   Draw Canvas
========================== */

function drawCanvas() {

    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );

    state.layers.forEach(layer => {

        if (
            layer.type === "sticker"
        ) {

            const img = new Image();

            img.src =
                `assets/stickers/${layer.file}`;

            img.onload = () => {

                ctx.drawImage(
                    img,
                    layer.x,
                    layer.y,
                    layer.width,
                    layer.height
                );
            };
        }

    });
}

/* ==========================
   Undo / Redo
========================== */

function saveHistory() {

    state.undoStack.push(
        JSON.stringify(state.layers)
    );

    if (
        state.undoStack.length > 50
    ) {
        state.undoStack.shift();
    }
}

function undo() {

    if (
        state.undoStack.length === 0
    ) return;

    const last =
        state.undoStack.pop();

    state.redoStack.push(
        JSON.stringify(state.layers)
    );

    state.layers =
        JSON.parse(last);

    drawCanvas();
    renderLayers();
}

function redo() {

    if (
        state.redoStack.length === 0
    ) return;

    const next =
        state.redoStack.pop();

    state.undoStack.push(
        JSON.stringify(state.layers)
    );

    state.layers =
        JSON.parse(next);

    drawCanvas();
    renderLayers();
}

/* ==========================
   Auto Save
========================== */

function saveProject() {

    localStorage.setItem(
        "superCamperProject",
        JSON.stringify(state.layers)
    );
}

function loadProject() {

    const data =
        localStorage.getItem(
            "superCamperProject"
        );

    if (!data) return;

    state.layers =
        JSON.parse(data);

    renderLayers();
    drawCanvas();
}

/* ==========================
   Init
========================== */

window.addEventListener(
    "DOMContentLoaded",
    async () => {

        await loadFonts();

        await loadTemplates();

        await loadStickers();

        loadProject();

        console.log(
            "Super Camper Studio V11 Ready"
        );
    }
);

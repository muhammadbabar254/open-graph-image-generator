const title = document.getElementById("title");
const description = document.getElementById("description");
const bgColor = document.getElementById("bgColor");
const textColor = document.getElementById("textColor");

const generateBtn = document.getElementById("generateBtn");
const downloadBtn = document.getElementById("downloadBtn");

const previewTitle = document.getElementById("previewTitle");
const previewDesc = document.getElementById("previewDesc");
const ogPreview = document.getElementById("ogPreview");

generateBtn.addEventListener("click", () => {

    previewTitle.textContent = title.value || "Your Title Here";
    previewDesc.textContent = description.value || "Your description will appear here...";

    ogPreview.style.background = bgColor.value;
    ogPreview.style.color = textColor.value;

});

downloadBtn.addEventListener("click", () => {

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    canvas.width = 1200;
    canvas.height = 630;

    // background
    ctx.fillStyle = bgColor.value;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // title
    ctx.fillStyle = textColor.value;
    ctx.font = "bold 60px Arial";
    ctx.fillText(title.value || "Your Title Here", 80, 250);

    // description
    ctx.font = "30px Arial";
    ctx.fillStyle = textColor.value;
    wrapText(ctx, description.value || "Your description here", 80, 330, 1000, 40);

    // download
    const link = document.createElement("a");
    link.download = "og-image.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
});

function wrapText(ctx, text, x, y, maxWidth, lineHeight) {
    const words = text.split(" ");
    let line = "";

    for (let n = 0; n < words.length; n++) {
        let testLine = line + words[n] + " ";
        let metrics = ctx.measureText(testLine);
        let testWidth = metrics.width;

        if (testWidth > maxWidth && n > 0) {
            ctx.fillText(line, x, y);
            line = words[n] + " ";
            y += lineHeight;
        } else {
            line = testLine;
        }
    }

    ctx.fillText(line, x, y);
}
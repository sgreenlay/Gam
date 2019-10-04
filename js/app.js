
// Initialize canvas
let canvas = document.getElementById("game");
let ctx = canvas.getContext("2d");

let size = { width: canvas.width, height: canvas.height };

// Adjust size to account for HiDPI
canvas.width = canvas.width * window.devicePixelRatio;
canvas.height = canvas.height * window.devicePixelRatio;
ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

// Fill background
ctx.globalAlpha = 1;
ctx.fillStyle = "#ffffff";
ctx.fillRect(0, 0, size.width, size.height);

// Draw a rectangle
ctx.fillStyle = 'rgba(255, 0, 0, 1.0)';
ctx.fillRect(size.width / 2 - 20, size.height / 2 - 20, 40, 40);

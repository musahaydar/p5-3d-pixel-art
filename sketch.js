let img;
let scale = 5;
let stretch = 0.01;
let outline = false;

function preload() {
    img = loadImage("sprite.png");
}

function setup() {
    let canvas = createCanvas(img.width * scale, img.height * scale, WEBGL);
    canvas.parent("p5-container");
    img.loadPixels();
}

function draw() {
    // set initial transform to be top left corner
    translate(-scale * (img.width / 2), -scale * (img.height / 2));

    background(255);
    for (let col = 0; col < img.height; col += 1) {
        for (let row = 0; row < img.width; row += 1) {
            let idx = (row + (col * img.width)) * 4;
            if (img.pixels[idx + 3] !== 0) {
                fill(img.pixels[idx], img.pixels[idx + 1], img.pixels[idx + 2]);
                if (outline === false) {
                    stroke(img.pixels[idx], img.pixels[idx + 1], img.pixels[idx + 2]);
                }
                box(scale, scale, mouseX * 0.05);
            }
            translate(scale, 0);
        }
        translate(-scale * img.width, scale);
        rotateX((mouseY - (img.width)) * 0.00002);
        rotateY((mouseX - (img.height)) * 0.00002);
    }
    // reset to origin for next iteration
    translate(0, -scale * img.height);
}
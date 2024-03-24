let img;
let scale = 10;

function preload() {
    img = loadImage("sprite.png");
}

function setup() {
    createCanvas(img.width * scale, img.height * scale, WEBGL);
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
                box(scale, scale, 1);
            }
            translate(scale, 0);
        }
        translate(-scale * img.width, scale);
    } 
    // reset to origin for next iteration
    translate(0, -scale * img.height);
}
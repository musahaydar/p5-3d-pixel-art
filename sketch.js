let img;
let cam;
let scale = 4;
let depth = 3;
let outline = false;

function preload() {
    img = loadImage("sprite.png");
}

function setup() {
    let canvas = createCanvas(img.width * scale * 2, img.height * scale * 2, WEBGL);
    canvas.parent("p5-container");
    img.loadPixels();
    angleMode(DEGREES);
    cam = createCamera();
    cam.camera(0, 0, 250, 0, 0, 0, 0, 1, 0);
    cam.perspective(60, 1, 5, 500);
}

function draw() {
    // uncomment me for mouse-look control :)
    // orbitControl();
    
    background(255);
    // set initial transform to be top left corner
    translate(-scale * (img.width / 2), -scale * (img.height / 2));

    for (let col = 0; col < img.height; col += 1) {
        for (let row = 0; row < img.width; row += 1) {
            let idx = (row + (col * img.width)) * 4;
            if (img.pixels[idx + 3] !== 0) {
                fill(img.pixels[idx], img.pixels[idx + 1], img.pixels[idx + 2], img.pixels[idx + 3]);
                if (outline === false) {
                    stroke(img.pixels[idx], img.pixels[idx + 1], img.pixels[idx + 2], img.pixels[idx + 3]);
                }
                push()
                // rotate about the middle, so we'll consider it the 0th row
                let rrow = ceil(row - (img.width/2));
                let angle = 25 * sin(frameCount);
                // TODO: no translation in the x plane means stretching for wider rotations
                translate(0, 0, tan(angle) * scale * rrow);
                rotateY(-angle);
                box(scale, scale, depth * scale);
                pop()
            }
            translate(scale, 0);
        }
        translate(-scale * img.width, scale);
    }
    // reset to origin for next iteration
    translate(0, -scale * img.height);
}
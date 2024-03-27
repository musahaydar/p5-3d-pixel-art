let img;
let depthmap;

//===------ parameters -------===//
let scale = 8;
let depth = 2; // pixels, if not using depth map
let rot_angle = 25; // degrees

//===----- feature flags -----===//
let outline = false;
let rotate = true;
let use_depth_map = false;

function preload() {
    img = loadImage("sprite.png");
    depthmap = loadImage("r_depth_map.png");
}

function setup() {
    let canvas = createCanvas(img.width * scale * 2, img.height * scale * 2, WEBGL);
    canvas.parent("p5-container");
    img.loadPixels();
    depthmap.loadPixels();
    angleMode(DEGREES);
}

function draw() {
    // uncomment me for mouse-look control :)
    orbitControl(1, 1, 1);
    
    background(255);

    // set initial transform to be top left corner
    translate(-scale * (img.width / 2), -scale * (img.height / 2));

    for (let col = 0; col < img.height; col += 1) {
        for (let row = 0; row < img.width; row += 1) {
            let idx = (row + (col * img.width)) * 4;

            // draw if the pixel has a non-zero transparency
            if (img.pixels[idx + 3] !== 0) {

                // set the color
                fill(img.pixels[idx], img.pixels[idx + 1], img.pixels[idx + 2], img.pixels[idx + 3]);
                if (outline === false) {
                    stroke(img.pixels[idx], img.pixels[idx + 1], img.pixels[idx + 2], img.pixels[idx + 3]);
                }

                // rotate the pixel
                push();
                // rotate about the middle, so we'll consider it the 0th row
                let rrow = row - (img.width/2);
                let angle = rot_angle * sin(frameCount);
                // TODO: no translation in the x plane means stretching for wider rotations
                if (rotate) {
                    translate(0, 0, tan(angle) * scale * rrow);
                    rotateY(-angle);
                }

                // draw the pixel
                if (use_depth_map) {
                    box(scale, scale, (((depthmap.pixels[idx] / 32) * 2) + 1) * scale);
                } else {
                    box(scale, scale, depth * scale);
                }
                pop();
            }
            translate(scale, 0);
        }
        translate(-scale * img.width, scale);
    }
    // reset to origin for next iteration
    translate(0, -scale * img.height);
}
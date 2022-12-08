function mandelbrotIteration(cx, cy, maxIter) {
    let x = 0.0;
    let y = 0.0;
    let xx = 0;
    let yy = 0;
    let xy = 0;
    let i = maxIter;
    while (i-- && xx + yy <= 4) {
        xy = x * y;
        xx = x * x;
        yy = y * y;
        x = xx - yy + cx;
        y = xy + xy + cy;
    }
    return maxIter - i;
}

function mandelbrot(canvas, xmin, xmax, ymin, ymax, iterations) {
    const width = canvas.width;
    const height = canvas.height;
    const context = canvas.getContext('2d');
    const image = context.getImageData(0, 0, width, height);
    const pixels = image.data;

    for (let ix = 0; ix < width; ++ix) {
        for (let iy = 0; iy < height; ++iy) {
            let x = xmin + (xmax - xmin) * ix / (width - 1);
            let y = ymin + (ymax - ymin) * iy / (height - 1);

            let i = mandelbrotIteration(x, y, iterations);

            let pixels_position = 4 * (width * iy + ix);

            if (i > iterations) {
                pixels[pixels_position] = 0;
                pixels[pixels_position + 1] = 0;
                pixels[pixels_position + 2] = 0;
            } else {
                let color = 3 * Math.log(i) / Math.log(iterations - 1.0);
                if (color < 1) {
                    pixels[pixels_position] = 255 * color;
                    pixels[pixels_position + 1] = 0;
                    pixels[pixels_position + 2] = 0;
                } else if (color < 2) {
                    pixels[pixels_position] = 255;
                    pixels[pixels_position + 1] = 255 * (color - 1);
                    pixels[pixels_position + 2] = 0;
                } else {
                    pixels[pixels_position] = 255;
                    pixels[pixels_position + 1] = 255;
                    pixels[pixels_position + 2] = 255 * (color - 2);
                }
            }
            pixels[pixels_position + 3] = 255;
        }
    }
    context.putImageData(image, 0, 0);
}

const canvas = document.querySelector('canvas');

const x = -0.645001;
const y = -0.4343;

const value = 1;

console.log(-2.1 / value);

mandelbrot(canvas, -2.1/ value + x, 2.1 / value + x, -2.1/ value + y, 2.1/ value + y, 20);

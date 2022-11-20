
const canvas = document.querySelector("canvas");
// resize the canvas to fill browser window dynamically
window.addEventListener('resize', resizeCanvas, false);

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

resizeCanvas();
const gl = canvas.getContext("webgl");


const program = await initWebGl('mandelbrotSet.vert', 'mandelbrotSet.frag')

const a_Position = gl.getAttribLocation(program, "a_Position");
const a_PointSize = gl.getAttribLocation(program, "a_PointSize");


gl.vertexAttrib1f(a_PointSize, 20.0,);

// Указываем цвет для очистки <canvas>
gl.clearColor(0.0, 1, 1.0, 1.0);


// Очищаем <canvas>
gl.clear(gl.COLOR_BUFFER_BIT);


canvas.addEventListener('click', setPoints(drawPoints))

function setPoints(callbackAfterClick) {
    const points = [];
    return function (evt) {
        const rec = evt.target.getBoundingClientRect();

        const x = 2 * evt.offsetX / rec.width - 1;
        const y = 1 - 2 * evt.offsetY / rec.height;

        points.push({x, y});

        callbackAfterClick(points)
    }
}


function drawPoints(points) {

    // Очищаем <canvas>
    gl.clear(gl.COLOR_BUFFER_BIT);

    points.forEach(point => {
        gl.vertexAttrib3f(a_Position, point.x, point.y, 0, 0)

        // Рисуем точку
        gl.drawArrays(gl.POINTS, 0, 1);
    });
}

/**
 *
 * @param source
 * @param type
 * @return {WebGLShader}
 */
function createShader(source, type) {
    // создаем пустой объект шейдера и возвращает ненулевое значение, по которому на него можно ссылаться
    const shader = gl.createShader(type);
    // Записываем исходный код шейдера в шейдерную программу
    gl.shaderSource(shader, source);
    // Скомпилируем шейдер
    gl.compileShader(shader);

    return shader;
}

/**
 *
 * @param vertexShader
 * @param fragmentShader
 */
function createProgram({vertexShader, fragmentShader}) {
    const program = gl.createProgram();

    // Прикрепляем уже существующие шейдеры
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);

    // Связываем программный объект
    gl.linkProgram(program);

    // Устанавливаем программу
    gl.useProgram(program);
    return program;
}

/**
 * @param vertexShaderSource
 * @param fragmentShaderSource
 */
async function initWebGl(vertexFileName, fragmentFileName) {
    // Загрузить шейдеры из файлов
    const vertexShaderSource = await loadShaderFile(vertexFileName);
    const fragmentShaderSource = await loadShaderFile(fragmentFileName);

    const vertexShader = createShader(vertexShaderSource, gl.VERTEX_SHADER);
    const fragmentShader = createShader(fragmentShaderSource, gl.FRAGMENT_SHADER);
    return createProgram({vertexShader, fragmentShader});
}

async function loadShaderFile (fileName, typeShader) {
    return  fetch(fileName).then((res)=>res.text());
}

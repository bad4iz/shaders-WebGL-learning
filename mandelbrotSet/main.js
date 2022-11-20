
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

const u_Resolution = gl.getUniformLocation(program, 'u_Resolution');
const u_Mouse = gl.getUniformLocation(program, 'u_Mouse');
const u_Time = gl.getUniformLocation(program, 'u_Time');
gl.uniform2f(u_Resolution, canvas.width,  canvas.height );


// треугольник
const verticesArr = [
    -1.0, 1.0,
    -1.0, -1.0,
    1., 1.,
    1.0, -1.0
];
const vertices = new Float32Array(verticesArr);
const n = verticesArr.length;
const vertexBuffer = gl.createBuffer();

gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
// Assign the buffer object to a_Position variable
gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 0, 0);

// Enable the assignment to a_Position variable
gl.enableVertexAttribArray(a_Position);



// Указываем цвет для очистки <canvas>
gl.clearColor(0.0, 1, 1.0, 1.0);


// Очищаем <canvas>
gl.clear(gl.COLOR_BUFFER_BIT);
// Рисуем треугольник
gl.drawArrays(gl.TRIANGLE_STRIP, 0, n);


const mouse = {x: 0.1, y: .1};


canvas.addEventListener('mousemove',(evt)=>{
    const evRect = evt.target.getBoundingClientRect();

    const dx = (2 * evt.offsetX) / evRect.width - 1 - mouse.x;
    const dy = 1 - (2 * evt.offsetY) / evRect.height - mouse.y;

    mouse.x += dx;
    mouse.y += dy;

})

const tick = function(timer) {
    // console.log(timer);
    // Очищаем <canvas>
    gl.clear(gl.COLOR_BUFFER_BIT);
    // Рисуем треугольник
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, n);
    gl.uniform1f(u_Time, timer/1000 );
    gl.uniform2f(u_Mouse, mouse.x, mouse.y );

    requestAnimationFrame(tick);   // Request that the browser ?calls tick
};
tick();







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

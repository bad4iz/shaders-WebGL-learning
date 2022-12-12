
const canvas = document.querySelector("canvas");
const gl = canvas.getContext("webgl");

const program = await initWebGl();

const n = initBuffer();

const u_Resolution = gl.getUniformLocation(program, "u_Resolution");
gl.uniform2f(u_Resolution, canvas.width, canvas.height);
const u_Time = gl.getUniformLocation(program, 'u_Time');

// получаем ссылку u_Translation
const u_Translation = gl.getUniformLocation(program, 'u_Translation');
// записываем в u_Translation
gl.uniform2f(u_Translation, 0.5, 0.0 )

gl.clear(gl.COLOR_BUFFER_BIT);
// Рисуем треугольник
gl.drawArrays(gl.TRIANGLE_STRIP, 0, n);


//
const tick = function(timer) {
  // Очищаем <canvas>

  gl.clear(gl.COLOR_BUFFER_BIT);
  // Рисуем треугольник
  gl.drawArrays(gl.TRIANGLE_STRIP, 0, n);
  gl.uniform1f(u_Time, timer/1000 );
  requestAnimationFrame(tick);   // Request that the browser ?calls tick
};
tick();






/////////////////////////////////////////////////
function initBuffer(){
  const array = [
    0.0, 0.5,
    -0.2, 0.2,
    // -0.4,0.0,
    // 0.4,0.0,
    0.2, 0.2,
  ];
  const vertex = new Float32Array(array);

  const buffer = gl.createBuffer();
  // Привязать объект буфера
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  // Записать дату в объект буфера
  gl.bufferData(gl.ARRAY_BUFFER, vertex, gl.STATIC_DRAW)

  const a_Position = gl.getAttribLocation(program, 'a_Position');

  //  Сохранить ссылку на буферный объект в переменной a_Position
  gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 0, 0);

  // Разрешение присваивания переменной-атрибуту a_Position
  gl.enableVertexAttribArray(a_Position);

  return array.length / 2
}










/////////////
/// Рабочие функции
//////////

function loadFile(path) {
 return fetch(path).then((response) => response.text())
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

  // Check the result of compilation
  const compiled = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
  if (!compiled) {
    const error = gl.getShaderInfoLog(shader);
    console.log('Failed to compile shader: ' + error);
    gl.deleteShader(shader);
    return null;
  }

  return shader;
}

/**
 *
 * @param vertexShader
 * @param fragmentShader
 */
function createProgram({ vertexShader, fragmentShader }) {
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
async function initWebGl() {
  const vertexShaderSource = await loadFile('vertex.vert');
  const fragmentShaderSource = await loadFile('fragment.frag');

  const vertexShader = createShader(vertexShaderSource, gl.VERTEX_SHADER);
  const fragmentShader = createShader(fragmentShaderSource, gl.FRAGMENT_SHADER);
  return createProgram({ vertexShader, fragmentShader });
}

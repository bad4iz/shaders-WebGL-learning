
const canvas = document.querySelector("canvas");
const gl = canvas.getContext("webgl");

const program = await initWebGl();

const n = initBuffer();

// Указываем цвет для очистки <canvas>
gl.clearColor(0.0, 1, 1.0, 1.0);
// Очищаем <canvas>
gl.clear(gl.COLOR_BUFFER_BIT);

gl.drawArrays(gl.POINTS, 0, n);







/////////////////////////////////////////////////
function initBuffer(){
  const array = [
    .0, .0,
    .5, .5,
    .5, .0,
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

  return array.length
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

const vertexShaderSource = `
attribute vec4 a_Position;
void main(void) {
  gl_Position = a_Position;
  gl_PointSize = 30.0;
}
`;

const fragmentShaderSource = `
void main(void) {
  gl_FragColor = vec4(.0, 1., 0.0, 1.0);
}
`;

const canvas = document.querySelector("canvas");
const gl = canvas.getContext("webgl");

const program = initWebGl(vertexShaderSource, fragmentShaderSource);

const a_Position = gl.getAttribLocation(program, "a_Position");

gl.vertexAttrib3f(a_Position, 0.0, 0.1, 0);

// Указываем цвет для очистки <canvas>
gl.clearColor(0.0, 1, 1.0, 1.0);

// Очищаем <canvas>
gl.clear(gl.COLOR_BUFFER_BIT);

// Рисуем точку
gl.drawArrays(gl.POINTS, 0, 1);

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
function initWebGl(vertexShaderSource, fragmentShaderSource) {
  const vertexShader = createShader(vertexShaderSource, gl.VERTEX_SHADER);
  const fragmentShader = createShader(fragmentShaderSource, gl.FRAGMENT_SHADER);
  return createProgram({ vertexShader, fragmentShader });
}

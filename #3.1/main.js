const vertexShaderSource = `
void main(void) {
  gl_Position = vec4(0.0, 0.0, 0.0, 1.0);
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


// создаем пустой объект шейдера и возвращает ненулевое значение, по которому на него можно ссылаться
const vertexShader = gl.createShader(gl.VERTEX_SHADER);
// Записываем исходный код шейдера в шейдерную программу
gl.shaderSource(vertexShader, vertexShaderSource);
// Скомпилируем шейдер
gl.compileShader(vertexShader);

// все тоже самое только для фрагментов
const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
gl.shaderSource(fragmentShader, fragmentShaderSource);
gl.compileShader(fragmentShader);

// создает и инициализирует WebGLProgram объект программы.
const program = gl.createProgram();

// Прикрепляем уже существующие шейдеры
gl.attachShader(program, vertexShader);
gl.attachShader(program, fragmentShader);

// Связываем программный объект
gl.linkProgram(program);

// Устанавливаем программу
gl.useProgram(program);

// Указываем цвет для очистки <canvas>
gl.clearColor(0.0, 1., 1.0, 1.0);

// Очищаем <canvas>
gl.clear(gl.COLOR_BUFFER_BIT);

// Рисуем точку
gl.drawArrays(gl.POINTS, 0, 1);

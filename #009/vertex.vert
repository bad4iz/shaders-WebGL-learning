attribute vec4 a_Position;

void main(void) {
    gl_Position = a_Position;
    gl_PointSize = 10.;
}
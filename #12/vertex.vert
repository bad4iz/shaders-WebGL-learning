attribute vec4 a_Position;

uniform float u_CosB, u_SinB;

void main(void) {
    gl_Position = a_Position;
    gl_Position.x = a_Position.x * u_CosB - a_Position.y * u_SinB;
    gl_Position.y = a_Position.x * u_SinB + a_Position.y * u_CosB;
}

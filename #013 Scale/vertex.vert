attribute vec4 a_Position;

uniform vec2 u_Scale;

void main(void) {
    gl_Position = vec4(1.);
    gl_Position.x = a_Position.x * u_Scale.x;
    gl_Position.y = a_Position.y * u_Scale.y;
    gl_Position.z = a_Position.z;
}

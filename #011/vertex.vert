attribute vec4 a_Position;

uniform vec2 u_Translation;

void main(void) {
    gl_Position = vec4(a_Position.xy + u_Translation, 0.0, 1.0);
}

#ifdef GL_ES
precision mediump float;
#endif

uniform float u_time;
uniform vec2 u_mouse;

void main() {
    gl_FragColor = vec4(abs(sin(u_time)),abs(sin(u_mouse.x)),abs(sin(u_mouse.y/110.0)),1.0);
//    gl_FragColor = vec4(.5, 1/1, 0.0, 1.0);
}
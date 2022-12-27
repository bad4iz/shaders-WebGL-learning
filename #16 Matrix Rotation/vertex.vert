attribute vec4 a_Position;

uniform vec2 u_Scale;


void main(void) {
    float u_CosB = cos(4.5);
    float u_SinB = sin(4.5);

    vec2 t = vec2(0.4, 0.0);

    gl_Position = vec4(1.);
    gl_Position.x = a_Position.x * u_CosB - a_Position.y * u_SinB + t.x;
    gl_Position.y = a_Position.x * u_SinB + a_Position.y * u_CosB + t.y;

//    gl_Position.x = (a_Position.x + t.x ) * u_CosB - (a_Position.y  + t.x) * u_SinB ;
//    gl_Position.y = (a_Position.x + t.x) * u_SinB + (a_Position.y + t.y) * u_CosB ;
    gl_Position.z = a_Position.z;
}

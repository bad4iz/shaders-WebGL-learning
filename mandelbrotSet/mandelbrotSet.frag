precision mediump float;
uniform vec2 u_Resolution;
uniform float u_Time;
uniform vec2 u_Mouse;

const float MAX_ITERATIONS = 999.0;

float mandelbrotSet(vec2 position) {
    vec2 c = 5.0 * position - vec2(0.7,0.0);
    c = c/pow(100.,4.0)  - vec2(0.645,0.4343);
//    c = c/pow(1,4.0);
    vec2 z = vec2(0.0);

    for(float i = 0.0; i < MAX_ITERATIONS; i++) {
        z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
        if(length(z)>2.0) {
            return i / MAX_ITERATIONS;
        }
    }
    return 0.0;
}

void main(void) {
    vec2 uv = (gl_FragCoord.xy - 0.5 * u_Resolution.xy )/ u_Resolution.xy;
    vec3 col = vec3(0.0);
    float m = mandelbrotSet(uv);

    col.rg += m;
    col  = pow(col, vec3(0.43));
    gl_FragColor = vec4(col, 1.0);
}

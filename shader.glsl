// Author:
// Title:

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

#define pi 3.14159

float glow(float x, float str, float dist){
    return dist / pow(x, str);
}

// Sinus Signed Distance Function (distance field)
float sinSDF(vec2 st, float A, float offset, float f, float phi){
    return abs((st.y - offset) + sin(st.x * f + phi) * A);
}

void main() {
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    st.x *= u_resolution.x/u_resolution.y;

    vec3 color = vec3(0.);
    color = vec3(st.x,st.y,abs(sin(u_time)));
    
    color = vec3(0.);
    float time = u_time/2.0;
    float str = 0.6; // Strength of the light
    float dist = 0.015; // Light propagation distance
    float nSin = 10.0; // Number of sinus functions drawn
    
    float timeHalfInv = -time*((0.5-step(st.x,0.5))*2.0);
    float am = sin(st.x*3.0+pi/2.0); // Amplitude modulation
    
    for(float i = 0.0; i<10. ; i++){
        color += vec3(glow(sinSDF(st, am*0.2, 0.5+sin(st.x*12.0+time)*am*0.05, 6.0, timeHalfInv+i*2.0*pi/nSin), str, dist));
    }
    
    color.r *= 0.5+cos(time)*0.5;
    color.g *= 0.;
    color.b *= 0.5;

    gl_FragColor = vec4(color,1.0);
}
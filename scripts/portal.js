(function() {
    const canvas = document.getElementById('portal-canvas');
    if (!canvas) return;

    // Ajusta o tamanho do canvas para ocupar a tela cheia
    function syncSize() {
        const w = window.innerWidth;
        const h = window.innerHeight;
        if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
        }
    }
    window.addEventListener('resize', syncSize);
    syncSize();

    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    if (!gl) return;

    const vs = `attribute vec2 a_position;
    varying vec2 v_texCoord;
    void main() {
        v_texCoord = a_position * 0.5 + 0.5;
        gl_Position = vec4(a_position, 0.0, 1.0);
    }`;

    const fs = `precision highp float;
    varying vec2 v_texCoord;
    uniform float u_time;
    uniform vec2 u_resolution;
    uniform vec2 u_mouse;

    vec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x, 289.0); }
    float snoise(vec2 v){
        const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
        vec2 i  = floor(v + dot(v, C.yy) );
        vec2 x0 = v -   i + dot(i, C.xx);
        vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
        vec4 x12 = x0.xyxy + C.xxzz; x12.xy -= i1; i = mod(i, 289.0);
        vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 )) + i.x + vec3(0.0, i1.x, 1.0 ));
        vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
        m = m*m ; m = m*m ;
        vec3 x = 2.0 * fract(p * C.www) - 1.0; vec3 h = abs(x) - 0.5; vec3 a0 = x - floor(x + 0.5);
        vec3 m0 = 1.0 - 1.5*(a0*a0 + h*h); vec3 g = a0*vec3(m0.x, m0.y, m0.z);
        return 130.0 * dot(m, vec3(dot(g, vec3(x0.x, x12.x, x12.z)), dot(g, vec3(x0.y, x12.y, x12.w)), 0.0));
    }

    void main() {
        vec2 uv = v_texCoord;
        vec2 center = vec2(0.2, 0.8);
        float n1 = snoise(uv * 2.0 - u_time * 0.1);
        float n2 = snoise(uv * 4.0 + u_time * 0.2);
        float finalNoise = n1 * 0.5 + n2 * 0.25;
        vec3 portalColor = vec3(0.224, 1.0, 0.078);
        float dist = distance(uv, center + finalNoise * 0.1);
        float mask = smoothstep(0.6, 0.0, dist);
        float leak = smoothstep(0.0, 0.5, uv.x) * smoothstep(1.0, 0.5, uv.y) * finalNoise;
        vec3 color = portalColor * (mask * 0.4 + leak * 0.2);
        vec3 bgColor = vec3(0.043, 0.055, 0.078);
        gl_FragColor = vec4(mix(bgColor, color, color.g), 1.0);
    }`;

    function cs(type, src) {
        const s = gl.createShader(type);
        gl.shaderSource(s, src);
        gl.compileShader(s);
        return s;
    }
    const prog = gl.createProgram();
    gl.attachShader(prog, cs(gl.VERTEX_SHADER, vs));
    gl.attachShader(prog, cs(gl.FRAGMENT_SHADER, fs));
    gl.linkProgram(prog);
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1, 1,-1, -1,1, 1,1]), gl.STATIC_DRAW);
    const pos = gl.getAttribLocation(prog, 'a_position');
    gl.enableVertexAttribArray(pos);
    gl.vertexAttribPointer(pos, 2, gl.FLOAT, false, 0, 0);

    const uTime = gl.getUniformLocation(prog, 'u_time');
    const uRes = gl.getUniformLocation(prog, 'u_resolution');
    const uMouse = gl.getUniformLocation(prog, 'u_mouse');

    let mouse = { x: canvas.width / 2, y: canvas.height / 2 };
    window.addEventListener('mousemove', (event) => {
        mouse.x = event.clientX;
        mouse.y = canvas.height - event.clientY;
    });

    function render(t) {
        gl.viewport(0, 0, canvas.width, canvas.height);
        if (uTime) gl.uniform1f(uTime, t * 0.001);
        if (uRes) gl.uniform2f(uRes, canvas.width, canvas.height);
        if (uMouse) gl.uniform2f(uMouse, mouse.x, mouse.y);
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
        requestAnimationFrame(render); // Mantém o loop infinito da animação rodando
    }
    requestAnimationFrame(render);
})();

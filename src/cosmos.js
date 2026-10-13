import * as THREE from 'three';

// 3D simplex noise — Ashima Arts / Stefan Gustavson (MIT)
const NOISE = /* glsl */ `
vec3 mod289(vec3 x){return x-floor(x*(1.0/289.0))*289.0;}
vec4 mod289(vec4 x){return x-floor(x*(1.0/289.0))*289.0;}
vec4 permute(vec4 x){return mod289(((x*34.0)+1.0)*x);}
vec4 taylorInvSqrt(vec4 r){return 1.79284291400159-0.85373472095314*r;}
float snoise(vec3 v){
  const vec2 C=vec2(1.0/6.0,1.0/3.0);
  const vec4 D=vec4(0.0,0.5,1.0,2.0);
  vec3 i=floor(v+dot(v,C.yyy));
  vec3 x0=v-i+dot(i,C.xxx);
  vec3 g=step(x0.yzx,x0.xyz);
  vec3 l=1.0-g;
  vec3 i1=min(g.xyz,l.zxy);
  vec3 i2=max(g.xyz,l.zxy);
  vec3 x1=x0-i1+C.xxx;
  vec3 x2=x0-i2+C.yyy;
  vec3 x3=x0-D.yyy;
  i=mod289(i);
  vec4 p=permute(permute(permute(i.z+vec4(0.0,i1.z,i2.z,1.0))+i.y+vec4(0.0,i1.y,i2.y,1.0))+i.x+vec4(0.0,i1.x,i2.x,1.0));
  float n_=0.142857142857;
  vec3 ns=n_*D.wyz-D.xzx;
  vec4 j=p-49.0*floor(p*ns.z*ns.z);
  vec4 x_=floor(j*ns.z);
  vec4 y_=floor(j-7.0*x_);
  vec4 x=x_*ns.x+ns.yyyy;
  vec4 y=y_*ns.x+ns.yyyy;
  vec4 h=1.0-abs(x)-abs(y);
  vec4 b0=vec4(x.xy,y.xy);
  vec4 b1=vec4(x.zw,y.zw);
  vec4 s0=floor(b0)*2.0+1.0;
  vec4 s1=floor(b1)*2.0+1.0;
  vec4 sh=-step(h,vec4(0.0));
  vec4 a0=b0.xzyw+s0.xzyw*sh.xxyy;
  vec4 a1=b1.xzyw+s1.xzyw*sh.zzww;
  vec3 p0=vec3(a0.xy,h.x);
  vec3 p1=vec3(a0.zw,h.y);
  vec3 p2=vec3(a1.xy,h.z);
  vec3 p3=vec3(a1.zw,h.w);
  vec4 norm=taylorInvSqrt(vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3)));
  p0*=norm.x;p1*=norm.y;p2*=norm.z;p3*=norm.w;
  vec4 m=max(0.6-vec4(dot(x0,x0),dot(x1,x1),dot(x2,x2),dot(x3,x3)),0.0);
  m=m*m;
  return 42.0*dot(m*m,vec4(dot(p0,x0),dot(p1,x1),dot(p2,x2),dot(p3,x3)));
}
float fbm(vec3 p){
  float f=0.0,a=0.5;
  for(int i=0;i<5;i++){f+=a*snoise(p);p*=2.03;a*=0.5;}
  return f;
}
`;

const sphereVert = /* glsl */ `
varying vec3 vObj;
varying vec3 vNormalW;
varying vec3 vPosW;
void main(){
  vObj = position;
  vNormalW = normalize(mat3(modelMatrix) * normal);
  vec4 w = modelMatrix * vec4(position, 1.0);
  vPosW = w.xyz;
  gl_Position = projectionMatrix * viewMatrix * w;
}
`;

// Purple gas giant: turbulent latitude bands + a storm, lit by a distant sun
const planetFrag = /* glsl */ `
uniform vec3 uLight;
uniform float uTime;
varying vec3 vObj;
varying vec3 vNormalW;
varying vec3 vPosW;
${NOISE}
void main(){
  vec3 p = normalize(vObj);
  float flow = uTime * 0.015;
  float warp = fbm(p * 1.6 + vec3(flow, 0.0, -flow));
  float lat = p.y + warp * 0.07;

  float bands = 0.5 + 0.5 * sin(lat * 16.0 + warp * 1.2);
  bands = mix(bands, 0.5 + 0.5 * sin(lat * 41.0 + warp * 2.0), 0.3);
  float streaks = fbm(vec3(p.x * 2.5, lat * 30.0, p.z * 2.5) + warp * 0.6);
  float tone = clamp(bands * 0.62 + streaks * 0.32 + 0.2, 0.0, 1.0);

  vec3 col = mix(vec3(0.07, 0.03, 0.14), vec3(0.33, 0.13, 0.62), smoothstep(0.05, 0.45, tone));
  col = mix(col, vec3(0.66, 0.47, 0.96), smoothstep(0.45, 0.78, tone));
  col = mix(col, vec3(0.96, 0.82, 1.0), smoothstep(0.82, 1.0, tone) * 0.7);

  // Oval storm — makes the rotation easy to read
  vec3 dp = p - normalize(vec3(0.75, -0.32, 0.58));
  dp.y *= 1.9;
  float d = length(dp) + warp * 0.03;
  float storm = smoothstep(0.30, 0.02, d);
  vec3 stormCol = mix(vec3(0.85, 0.35, 0.80), vec3(0.98, 0.78, 0.95), 0.5 + 0.5 * sin(d * 75.0));
  col = mix(col, stormCol, storm * 0.85);

  vec3 N = normalize(vNormalW);
  vec3 L = normalize(uLight);
  vec3 V = normalize(cameraPosition - vPosW);
  float ndl = dot(N, L);
  float day = smoothstep(-0.12, 0.55, ndl);
  vec3 color = col * (0.035 + 1.1 * day);
  color += vec3(0.09, 0.03, 0.18) * (1.0 - day) * 0.5;
  float rim = pow(1.0 - max(dot(N, V), 0.0), 3.0);
  color += vec3(0.62, 0.38, 1.0) * rim * (0.15 + 0.9 * smoothstep(-0.25, 0.6, ndl));
  vec3 H = normalize(L + V);
  color += vec3(0.5, 0.4, 0.7) * pow(max(dot(N, H), 0.0), 40.0) * 0.15 * day;
  gl_FragColor = vec4(color, 1.0);
}
`;

const moonFrag = /* glsl */ `
uniform vec3 uLight;
varying vec3 vObj;
varying vec3 vNormalW;
varying vec3 vPosW;
${NOISE}
void main(){
  vec3 p = normalize(vObj);
  float n = fbm(p * 3.5);
  float craters = smoothstep(0.55, 0.75, abs(snoise(p * 6.0)));
  vec3 col = mix(vec3(0.30, 0.26, 0.38), vec3(0.74, 0.68, 0.84), n * 0.5 + 0.5);
  col *= 1.0 - craters * 0.35;
  float day = smoothstep(-0.05, 0.4, dot(normalize(vNormalW), normalize(uLight)));
  gl_FragColor = vec4(col * (0.02 + day), 1.0);
}
`;

// Back-side shell around the planet: glow fades from the planet's edge outward
const atmosphereFrag = /* glsl */ `
uniform vec3 uLight;
varying vec3 vObj;
varying vec3 vNormalW;
varying vec3 vPosW;
void main(){
  vec3 N = normalize(vNormalW);
  vec3 V = normalize(cameraPosition - vPosW);
  float glow = pow(smoothstep(0.0, 0.5, -dot(N, V)), 2.2);
  float sun = 0.2 + 0.8 * smoothstep(-0.35, 0.5, dot(N, normalize(uLight)));
  gl_FragColor = vec4(vec3(0.6, 0.32, 1.0) * glow * sun * 1.3, 1.0);
}
`;

const ringVert = /* glsl */ `
varying vec3 vLocal;
varying vec3 vPosW;
varying vec3 vNormalW;
void main(){
  vLocal = position;
  vNormalW = normalize(mat3(modelMatrix) * vec3(0.0, 0.0, 1.0));
  vec4 w = modelMatrix * vec4(position, 1.0);
  vPosW = w.xyz;
  gl_Position = projectionMatrix * viewMatrix * w;
}
`;

const ringFrag = /* glsl */ `
uniform vec3 uLight;
uniform float uInner;
uniform float uOuter;
varying vec3 vLocal;
varying vec3 vPosW;
varying vec3 vNormalW;
float hash(float n){ return fract(sin(n) * 43758.5453123); }
float noise1(float x){ float i = floor(x); float f = fract(x); return mix(hash(i), hash(i + 1.0), f * f * (3.0 - 2.0 * f)); }
void main(){
  float t = (length(vLocal.xy) - uInner) / (uOuter - uInner);
  float bands = noise1(t * 40.0) * 0.6 + noise1(t * 130.0) * 0.4;
  float gap = smoothstep(0.52, 0.55, t) * (1.0 - smoothstep(0.58, 0.61, t));
  float edge = smoothstep(0.0, 0.06, t) * (1.0 - smoothstep(0.9, 1.0, t));
  float alpha = edge * (0.2 + 0.8 * bands) * (1.0 - gap * 0.9) * 0.85;
  vec3 col = mix(vec3(0.42, 0.24, 0.72), vec3(0.93, 0.82, 1.0), bands);

  // Planet casts a shadow across the rings (planet sits at the origin, radius 1)
  vec3 L = normalize(uLight);
  float along = dot(vPosW, L);
  float perp = length(vPosW - along * L);
  float shadow = along < 0.0 ? smoothstep(0.95, 1.05, perp) : 1.0;
  float lit = 0.35 + 0.65 * abs(dot(vNormalW, L));
  gl_FragColor = vec4(col * lit * (0.12 + 0.88 * shadow), alpha);
}
`;

const starVert = /* glsl */ `
attribute float aSize;
attribute float aSeed;
attribute vec3 aColor;
uniform float uTime;
uniform float uPixelRatio;
varying vec3 vColor;
varying float vTwinkle;
void main(){
  vec4 mv = modelViewMatrix * vec4(position, 1.0);
  gl_Position = projectionMatrix * mv;
  vTwinkle = 0.65 + 0.35 * sin(uTime * (0.8 + aSeed * 2.0) + aSeed * 40.0);
  vColor = aColor;
  gl_PointSize = max(1.0, aSize * uPixelRatio * (110.0 / -mv.z));
}
`;

const starFrag = /* glsl */ `
varying vec3 vColor;
varying float vTwinkle;
void main(){
  float d = length(gl_PointCoord - 0.5);
  float a = smoothstep(0.5, 0.0, d);
  gl_FragColor = vec4(vColor, a * a * vTwinkle);
}
`;

const STAR_COLORS = [
  [1, 1, 1],
  [0.91, 0.84, 1],
  [0.77, 0.71, 0.99],
  [0.75, 0.86, 1],
];

function createStars(count) {
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);
  const sizes = new Float32Array(count);
  const seeds = new Float32Array(count);
  for (let i = 0; i < count; i++) {
    const r = 60 + Math.random() * 120;
    const u = Math.random() * 2 - 1;
    const theta = Math.random() * Math.PI * 2;
    const s = Math.sqrt(1 - u * u);
    positions.set([r * s * Math.cos(theta), r * u, r * s * Math.sin(theta)], i * 3);
    colors.set(STAR_COLORS[(Math.random() * STAR_COLORS.length) | 0], i * 3);
    sizes[i] = Math.random() < 0.06 ? 3 + Math.random() * 2.5 : 0.8 + Math.random() * 1.6;
    seeds[i] = Math.random();
  }
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute('aColor', new THREE.BufferAttribute(colors, 3));
  geometry.setAttribute('aSize', new THREE.BufferAttribute(sizes, 1));
  geometry.setAttribute('aSeed', new THREE.BufferAttribute(seeds, 1));
  const material = new THREE.ShaderMaterial({
    uniforms: { uTime: { value: 0 }, uPixelRatio: { value: 1 } },
    vertexShader: starVert,
    fragmentShader: starFrag,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  });
  return new THREE.Points(geometry, material);
}

export function initCosmos(canvas) {
  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: 'high-performance' });
  } catch {
    document.documentElement.classList.add('no-webgl');
    return;
  }
  renderer.setClearColor(0x000000, 0);

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(40, 1, 0.1, 400);
  const light = { value: new THREE.Vector3(1, 0.35, 0.55).normalize() };

  // tilt = axial tilt (also carries rings + moon), spin = the planet's own rotation
  const tilt = new THREE.Group();
  const spin = new THREE.Group();
  tilt.add(spin);
  scene.add(tilt);

  const planetMaterial = new THREE.ShaderMaterial({
    uniforms: { uLight: light, uTime: { value: 0 } },
    vertexShader: sphereVert,
    fragmentShader: planetFrag,
  });
  spin.add(new THREE.Mesh(new THREE.SphereGeometry(1, 128, 128), planetMaterial));

  scene.add(
    new THREE.Mesh(
      new THREE.SphereGeometry(1.16, 96, 96),
      new THREE.ShaderMaterial({
        uniforms: { uLight: light },
        vertexShader: sphereVert,
        fragmentShader: atmosphereFrag,
        side: THREE.BackSide,
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      }),
    ),
  );

  const ring = new THREE.Mesh(
    new THREE.RingGeometry(1.45, 2.45, 256, 1),
    new THREE.ShaderMaterial({
      uniforms: { uLight: light, uInner: { value: 1.45 }, uOuter: { value: 2.45 } },
      vertexShader: ringVert,
      fragmentShader: ringFrag,
      side: THREE.DoubleSide,
      transparent: true,
      depthWrite: false,
    }),
  );
  ring.rotation.x = -Math.PI / 2;
  tilt.add(ring);

  const moon = new THREE.Mesh(
    new THREE.SphereGeometry(0.17, 64, 64),
    new THREE.ShaderMaterial({ uniforms: { uLight: light }, vertexShader: sphereVert, fragmentShader: moonFrag }),
  );
  tilt.add(moon);

  const stars = createStars(window.innerWidth < 900 ? 1800 : 3500);
  scene.add(stars);

  let target = 0; // whole-page scroll progress, 0..1
  let progress = 0;
  let heroTarget = 0; // 0 at the top, 1 once the hero has scrolled away
  let heroProgress = 0;
  let distance = 7.6;
  let view = { w: 1, h: 1, wide: true };
  const pointer = { x: 0, y: 0, tx: 0, ty: 0 };

  const readScroll = () => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    target = max > 0 ? Math.min(1, window.scrollY / max) : 0;
    heroTarget = Math.min(1, window.scrollY / window.innerHeight);
  };

  const resize = () => {
    const w = window.innerWidth;
    const h = window.innerHeight;
    view = { w, h, wide: w >= 900 };
    const pixelRatio = Math.min(window.devicePixelRatio, view.wide ? 2 : 1.5);
    renderer.setPixelRatio(pixelRatio);
    renderer.setSize(w, h, false);
    stars.material.uniforms.uPixelRatio.value = pixelRatio;
    camera.aspect = w / h;
    distance = view.wide ? 7.6 : 7.6 * Math.max(1, 0.85 / camera.aspect);
    readScroll();
  };

  // Desktop: planet stays to the right of the text.
  // Mobile: planet sits above the hero text, then drifts to the top-right corner so it doesn't cover content.
  const placePlanet = () => {
    const { w, h, wide } = view;
    if (wide) camera.setViewOffset(w, h, -w * 0.24, 0, w, h);
    else camera.setViewOffset(w, h, -w * 0.3 * heroProgress, h * (0.25 + 0.08 * heroProgress), w, h);
    camera.updateProjectionMatrix();
  };

  window.addEventListener('scroll', readScroll, { passive: true });
  window.addEventListener('resize', resize);
  window.addEventListener('pointermove', (e) => {
    if (e.pointerType !== 'mouse') return;
    pointer.tx = (e.clientX / window.innerWidth) * 2 - 1;
    pointer.ty = (e.clientY / window.innerHeight) * 2 - 1;
  });
  resize();

  const clock = new THREE.Clock();
  renderer.setAnimationLoop(() => {
    const time = clock.getElapsedTime();
    const ease = reduceMotion ? 1 : 0.06;
    progress += (target - progress) * ease;
    heroProgress += (heroTarget - heroProgress) * ease;
    placePlanet();
    pointer.x += (pointer.tx - pointer.x) * 0.04;
    pointer.y += (pointer.ty - pointer.y) * 0.04;
    const s = progress;
    const idle = reduceMotion ? 0 : time;

    // Scrolling turns the planet and sweeps the camera from its day side toward its night side
    spin.rotation.y = s * Math.PI * 4 + idle * 0.035;
    tilt.rotation.set(0.28 - s * 0.22, 0, 0.38);

    const orbit = 0.35 - s * 1.75;
    const dist = distance * (1 - 0.12 * Math.sin(s * Math.PI));
    camera.position.set(
      Math.sin(orbit) * dist + pointer.x * 0.35,
      0.9 - s * 0.6 - pointer.y * 0.25,
      Math.cos(orbit) * dist,
    );
    camera.lookAt(0, 0, 0);

    const m = s * Math.PI * 3 + idle * 0.09;
    moon.position.set(Math.cos(m) * 3.4, 0, Math.sin(m) * 3.4);

    stars.rotation.y = s * 0.5 + idle * 0.006;
    planetMaterial.uniforms.uTime.value = time;
    stars.material.uniforms.uTime.value = time;

    renderer.render(scene, camera);
  });
  canvas.classList.add('ready');
}

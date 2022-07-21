//This file is automatically rebuilt by the Cesium build process.
export default "varying vec3 v_outerPositionWC;\n\
uniform vec3 u_hsbShift;\n\
#ifndef PER_FRAGMENT_ATMOSPHERE\n\
varying vec3 v_mieColor;\n\
varying vec3 v_rayleighColor;\n\
varying float v_opacity;\n\
varying float v_translucent;\n\
#endif\n\
void main (void)\n\
{\n\
vec3 lightDirection = getLightDirection(v_outerPositionWC);\n\
vec3 mieColor;\n\
vec3 rayleighColor;\n\
float opacity;\n\
float translucent;\n\
#ifdef PER_FRAGMENT_ATMOSPHERE\n\
computeAtmosphereScattering(\n\
v_outerPositionWC,\n\
lightDirection,\n\
rayleighColor,\n\
mieColor,\n\
opacity,\n\
translucent\n\
);\n\
#else\n\
mieColor = v_mieColor;\n\
rayleighColor = v_rayleighColor;\n\
opacity = v_opacity;\n\
translucent = v_translucent;\n\
#endif\n\
vec4 color = computeAtmosphereColor(v_outerPositionWC, lightDirection, rayleighColor, mieColor, opacity);\n\
#ifndef HDR\n\
color.rgb = czm_acesTonemapping(color.rgb);\n\
color.rgb = czm_inverseGamma(color.rgb);\n\
#endif\n\
#ifdef COLOR_CORRECT\n\
vec3 hsb = czm_RGBToHSB(color.rgb);\n\
hsb.x += u_hsbShift.x;\n\
hsb.y = clamp(hsb.y + u_hsbShift.y, 0.0, 1.0);\n\
hsb.z = hsb.z > czm_epsilon7 ? hsb.z + u_hsbShift.z : 0.0;\n\
color.rgb = czm_HSBToRGB(hsb);\n\
#endif\n\
if (translucent == 0.0) {\n\
color.a = mix(color.b, 1.0, color.a) * smoothstep(0.0, 1.0, czm_morphTime);\n\
}\n\
gl_FragColor = color;\n\
}\n\
";

//This file is automatically rebuilt by the Cesium build process.
export default "int czm_unpackUint(float packedValue) {\n\
float rounded = czm_round(packedValue * 255.0);\n\
return int(rounded);\n\
}\n\
int czm_unpackUint(vec2 packedValue) {\n\
vec2 rounded = czm_round(packedValue * 255.0);\n\
return int(dot(rounded, vec2(1.0, 256.0)));\n\
}\n\
int czm_unpackUint(vec3 packedValue) {\n\
vec3 rounded = czm_round(packedValue * 255.0);\n\
return int(dot(rounded, vec3(1.0, 256.0, 65536.0)));\n\
}\n\
int czm_unpackUint(vec4 packedValue) {\n\
vec4 rounded = czm_round(packedValue * 255.0);\n\
return int(dot(rounded, vec4(1.0, 256.0, 65536.0, 16777216.0)));\n\
}\n\
";

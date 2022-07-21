//This file is automatically rebuilt by the Cesium build process.
export default "attribute vec3 position3DHigh;\n\
attribute vec3 position3DLow;\n\
attribute vec3 normal;\n\
attribute vec2 st;\n\
attribute float batchId;\n\
varying vec3 v_positionEC;\n\
varying vec3 v_normalEC;\n\
varying vec2 v_st;\n\
void main()\n\
{\n\
vec4 p = czm_computePosition();\n\
v_positionEC = (czm_modelViewRelativeToEye * p).xyz;\n\
v_normalEC = czm_normal * normal;\n\
v_st = st;\n\
gl_Position = czm_modelViewProjectionRelativeToEye * p;\n\
}\n\
";

//This file is automatically rebuilt by the Cesium build process.
export default "void geometryStage(inout ProcessedAttributes attributes, mat4 modelView, mat3 normal)\n\
{\n\
vec3 positionMC = attributes.positionMC;\n\
v_positionMC = positionMC;\n\
v_positionEC = (modelView * vec4(positionMC, 1.0)).xyz;\n\
#if defined(USE_2D_POSITIONS) || defined(USE_2D_INSTANCING)\n\
vec3 position2D = attributes.position2D;\n\
vec3 positionEC = (u_modelView2D * vec4(position2D, 1.0)).xyz;\n\
gl_Position = czm_projection * vec4(positionEC, 1.0);\n\
#else\n\
gl_Position = czm_projection * vec4(v_positionEC, 1.0);\n\
#endif\n\
#ifdef COMPUTE_POSITION_WC\n\
v_positionWC = (czm_model * vec4(positionMC, 1.0)).xyz;\n\
#endif\n\
#ifdef HAS_NORMALS\n\
v_normalEC = normal * attributes.normalMC;\n\
#endif\n\
#ifdef HAS_TANGENTS\n\
v_tangentEC = normalize(normal * attributes.tangentMC);\n\
#endif\n\
#ifdef HAS_BITANGENTS\n\
v_bitangentEC = normalize(normal * attributes.bitangentMC);\n\
#endif\n\
setDynamicVaryings(attributes);\n\
}\n\
";

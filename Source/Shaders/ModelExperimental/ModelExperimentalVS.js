//This file is automatically rebuilt by the Cesium build process.
export default "precision highp float;\n\
czm_modelVertexOutput defaultVertexOutput(vec3 positionMC) {\n\
czm_modelVertexOutput vsOutput;\n\
vsOutput.positionMC = positionMC;\n\
vsOutput.pointSize = 1.0;\n\
return vsOutput;\n\
}\n\
void main()\n\
{\n\
ProcessedAttributes attributes;\n\
initializeAttributes(attributes);\n\
#ifdef USE_DEQUANTIZATION\n\
dequantizationStage(attributes);\n\
#endif\n\
#ifdef HAS_MORPH_TARGETS\n\
morphTargetsStage(attributes);\n\
#endif\n\
#ifdef HAS_SKINNING\n\
skinningStage(attributes);\n\
#endif\n\
#ifdef HAS_PRIMITIVE_OUTLINE\n\
primitiveOutlineStage();\n\
#endif\n\
#ifdef HAS_BITANGENTS\n\
attributes.bitangentMC = normalize(cross(attributes.normalMC, attributes.tangentMC) * attributes.tangentSignMC);\n\
#endif\n\
FeatureIds featureIds;\n\
featureIdStage(featureIds, attributes);\n\
#ifdef HAS_SELECTED_FEATURE_ID\n\
SelectedFeature feature;\n\
selectedFeatureIdStage(feature, featureIds);\n\
cpuStylingStage(attributes.positionMC, feature);\n\
#endif\n\
#if defined(USE_2D_POSITIONS) || defined(USE_2D_INSTANCING)\n\
mat4 modelView = czm_modelView3D;\n\
mat3 normal = czm_normal3D;\n\
#else\n\
mat4 modelView = czm_modelView;\n\
mat3 normal = czm_normal;\n\
#endif\n\
#ifdef HAS_INSTANCING\n\
#ifdef USE_LEGACY_INSTANCING\n\
mat4 instanceModelView;\n\
mat3 instanceModelViewInverseTranspose;\n\
legacyInstancingStage(attributes, instanceModelView, instanceModelViewInverseTranspose);\n\
modelView = instanceModelView;\n\
normal = instanceModelViewInverseTranspose;\n\
#else\n\
instancingStage(attributes);\n\
#endif\n\
#ifdef USE_PICKING\n\
v_pickColor = a_pickColor;\n\
#endif\n\
#endif\n\
Metadata metadata;\n\
metadataStage(metadata, attributes);\n\
#ifdef HAS_CUSTOM_VERTEX_SHADER\n\
czm_modelVertexOutput vsOutput = defaultVertexOutput(attributes.positionMC);\n\
customShaderStage(vsOutput, attributes, featureIds, metadata);\n\
#endif\n\
geometryStage(attributes, modelView, normal);\n\
#ifdef HAS_SILHOUETTE\n\
silhouetteStage(attributes);\n\
#endif\n\
#ifdef PRIMITIVE_TYPE_POINTS\n\
#ifdef HAS_CUSTOM_VERTEX_SHADER\n\
gl_PointSize = vsOutput.pointSize;\n\
#elif defined(USE_POINT_CLOUD_ATTENUATION)\n\
gl_PointSize = pointCloudAttenuationStage(v_positionEC);\n\
#else\n\
gl_PointSize = 1.0;\n\
#endif\n\
#endif\n\
}\n\
";

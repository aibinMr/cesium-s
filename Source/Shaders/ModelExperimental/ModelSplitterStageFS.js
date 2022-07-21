//This file is automatically rebuilt by the Cesium build process.
export default "void modelSplitterStage()\n\
{\n\
#ifndef SHADOW_MAP\n\
if (model_splitDirection < 0.0 && gl_FragCoord.x > czm_splitPosition) discard;\n\
if (model_splitDirection > 0.0 && gl_FragCoord.x < czm_splitPosition) discard;\n\
#endif\n\
}\n\
";

//This file is automatically rebuilt by the Cesium build process.
export default "uniform vec3 u_radiiAndDynamicAtmosphereColor;\n\
uniform float u_atmosphereLightIntensity;\n\
uniform float u_atmosphereRayleighScaleHeight;\n\
uniform float u_atmosphereMieScaleHeight;\n\
uniform float u_atmosphereMieAnisotropy;\n\
uniform vec3 u_atmosphereRayleighCoefficient;\n\
uniform vec3 u_atmosphereMieCoefficient;\n\
const float ATMOSPHERE_THICKNESS = 111e3;\n\
const int PRIMARY_STEPS = 16;\n\
const int LIGHT_STEPS = 4;\n\
void computeScattering(\n\
czm_ray primaryRay,\n\
float primaryRayLength,\n\
vec3 lightDirection,\n\
float atmosphereInnerRadius,\n\
out vec3 rayleighColor,\n\
out vec3 mieColor,\n\
out float opacity\n\
) {\n\
rayleighColor = vec3(0.0);\n\
mieColor = vec3(0.0);\n\
opacity = 0.0;\n\
float atmosphereOuterRadius = atmosphereInnerRadius + ATMOSPHERE_THICKNESS;\n\
vec3 origin = vec3(0.0);\n\
czm_raySegment primaryRayAtmosphereIntersect = czm_raySphereIntersectionInterval(primaryRay, origin, atmosphereOuterRadius);\n\
if (primaryRayAtmosphereIntersect == czm_emptyRaySegment) {\n\
return;\n\
}\n\
primaryRayAtmosphereIntersect.start = max(primaryRayAtmosphereIntersect.start, 0.0);\n\
primaryRayAtmosphereIntersect.stop = min(primaryRayAtmosphereIntersect.stop, length(primaryRayLength));\n\
float rayStepLength = (primaryRayAtmosphereIntersect.stop - primaryRayAtmosphereIntersect.start) / float(PRIMARY_STEPS);\n\
float rayPositionLength = primaryRayAtmosphereIntersect.start;\n\
vec3 rayleighAccumulation = vec3(0.0);\n\
vec3 mieAccumulation = vec3(0.0);\n\
vec2 opticalDepth = vec2(0.0);\n\
vec2 heightScale = vec2(u_atmosphereRayleighScaleHeight, u_atmosphereMieScaleHeight);\n\
for (int i = 0; i < PRIMARY_STEPS; i++) {\n\
vec3 samplePosition = primaryRay.origin + primaryRay.direction * (rayPositionLength + rayStepLength);\n\
float sampleHeight = length(samplePosition) - atmosphereInnerRadius;\n\
vec2 sampleDensity = exp(-sampleHeight / heightScale) * rayStepLength;\n\
opticalDepth += sampleDensity;\n\
czm_ray lightRay = czm_ray(samplePosition, lightDirection);\n\
czm_raySegment lightRayAtmosphereIntersect = czm_raySphereIntersectionInterval(lightRay, origin, atmosphereOuterRadius);\n\
float lightStepLength = lightRayAtmosphereIntersect.stop / float(LIGHT_STEPS);\n\
float lightPositionLength = 0.0;\n\
vec2 lightOpticalDepth = vec2(0.0);\n\
for (int j = 0; j < LIGHT_STEPS; j++) {\n\
vec3 lightPosition = samplePosition + lightDirection * (lightPositionLength + lightStepLength * 0.5);\n\
float lightHeight = length(lightPosition) - atmosphereInnerRadius;\n\
lightOpticalDepth += exp(-lightHeight / heightScale) * lightStepLength;\n\
lightPositionLength += lightStepLength;\n\
}\n\
vec3 attenuation = exp(-((u_atmosphereMieCoefficient * (opticalDepth.y + lightOpticalDepth.y)) + (u_atmosphereRayleighCoefficient * (opticalDepth.x + lightOpticalDepth.x))));\n\
rayleighAccumulation += sampleDensity.x * attenuation;\n\
mieAccumulation += sampleDensity.y * attenuation;\n\
rayPositionLength += rayStepLength;\n\
}\n\
rayleighColor = u_atmosphereRayleighCoefficient * rayleighAccumulation;\n\
mieColor = u_atmosphereMieCoefficient * mieAccumulation;\n\
opacity = length(exp(-((u_atmosphereMieCoefficient * opticalDepth.y) + (u_atmosphereRayleighCoefficient * opticalDepth.x))));\n\
}\n\
vec4 computeAtmosphereColor(\n\
vec3 positionWC,\n\
vec3 lightDirection,\n\
vec3 rayleighColor,\n\
vec3 mieColor,\n\
float opacity\n\
) {\n\
vec3 cameraToPositionWC = positionWC - czm_viewerPositionWC;\n\
vec3 cameraToPositionWCDirection = normalize(cameraToPositionWC);\n\
float cosAngle = dot(cameraToPositionWCDirection, lightDirection);\n\
float cosAngleSq = cosAngle * cosAngle;\n\
float G = u_atmosphereMieAnisotropy;\n\
float GSq = G * G;\n\
float rayleighPhase = 3.0 / (50.2654824574) * (1.0 + cosAngleSq);\n\
float miePhase = 3.0 / (25.1327412287) * ((1.0 - GSq) * (cosAngleSq + 1.0)) / (pow(1.0 + GSq - 2.0 * cosAngle * G, 1.5) * (2.0 + GSq));\n\
vec3 rayleigh = rayleighPhase * rayleighColor;\n\
vec3 mie = miePhase * mieColor;\n\
vec3 color = (rayleigh + mie) * u_atmosphereLightIntensity;\n\
return vec4(color, opacity);\n\
}\n\
";

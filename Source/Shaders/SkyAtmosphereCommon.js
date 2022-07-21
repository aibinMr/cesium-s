//This file is automatically rebuilt by the Cesium build process.
export default "float interpolateByDistance(vec4 nearFarScalar, float distance)\n\
{\n\
float startDistance = nearFarScalar.x;\n\
float startValue = nearFarScalar.y;\n\
float endDistance = nearFarScalar.z;\n\
float endValue = nearFarScalar.w;\n\
float t = clamp((distance - startDistance) / (endDistance - startDistance), 0.0, 1.0);\n\
return mix(startValue, endValue, t);\n\
}\n\
vec3 getLightDirection(vec3 positionWC)\n\
{\n\
float lightEnum = u_radiiAndDynamicAtmosphereColor.z;\n\
vec3 lightDirection =\n\
positionWC * float(lightEnum == 0.0) +\n\
czm_lightDirectionWC * float(lightEnum == 1.0) +\n\
czm_sunDirectionWC * float(lightEnum == 2.0);\n\
return normalize(lightDirection);\n\
}\n\
void computeAtmosphereScattering(vec3 positionWC, vec3 lightDirection, out vec3 rayleighColor, out vec3 mieColor, out float opacity, out float underTranslucentGlobe)\n\
{\n\
float ellipsoidRadiiDifference = czm_ellipsoidRadii.x - czm_ellipsoidRadii.z;\n\
float distanceAdjustMin = czm_ellipsoidRadii.x / 4.0;\n\
float distanceAdjustMax = czm_ellipsoidRadii.x;\n\
float distanceAdjustModifier = ellipsoidRadiiDifference / 2.0;\n\
float distanceAdjust = distanceAdjustModifier * clamp((czm_eyeHeight - distanceAdjustMin) / (distanceAdjustMax - distanceAdjustMin), 0.0, 1.0);\n\
float radiusAdjust = (ellipsoidRadiiDifference / 4.0) + distanceAdjust;\n\
float atmosphereInnerRadius = (length(czm_viewerPositionWC) - czm_eyeHeight) - radiusAdjust;\n\
vec3 cameraToPositionWC = positionWC - czm_viewerPositionWC;\n\
vec3 cameraToPositionWCDirection = normalize(cameraToPositionWC);\n\
czm_ray primaryRay = czm_ray(czm_viewerPositionWC, cameraToPositionWCDirection);\n\
underTranslucentGlobe = 0.0;\n\
#if defined(GLOBE_TRANSLUCENT)\n\
czm_raySegment primaryRayEarthIntersect = czm_raySphereIntersectionInterval(primaryRay, vec3(0.0), atmosphereInnerRadius + radiusAdjust);\n\
if (primaryRayEarthIntersect.start > 0.0 && primaryRayEarthIntersect.stop > 0.0) {\n\
vec3 direction = normalize(positionWC);\n\
czm_ray ellipsoidRay = czm_ray(positionWC, -direction);\n\
czm_raySegment ellipsoidIntersection = czm_rayEllipsoidIntersectionInterval(ellipsoidRay, vec3(0.0), czm_ellipsoidInverseRadii);\n\
vec3 onEarth = positionWC - (direction * ellipsoidIntersection.start);\n\
float angle = dot(normalize(czm_viewerPositionWC), normalize(onEarth));\n\
opacity = interpolateByDistance(vec4(0.0, 1.0, czm_ellipsoidRadii.x, 0.0), length(czm_viewerPositionWC - onEarth));\n\
vec3 horizonColor = vec3(0.1, 0.2, 0.3);\n\
vec3 nearColor = vec3(0.0);\n\
rayleighColor = mix(nearColor, horizonColor, exp(-angle) * opacity);\n\
underTranslucentGlobe = 1.0;\n\
return;\n\
}\n\
#endif\n\
computeScattering(\n\
primaryRay,\n\
length(cameraToPositionWC),\n\
lightDirection,\n\
atmosphereInnerRadius,\n\
rayleighColor,\n\
mieColor,\n\
opacity\n\
);\n\
float cameraHeight = czm_eyeHeight + atmosphereInnerRadius;\n\
float atmosphereOuterRadius = atmosphereInnerRadius + ATMOSPHERE_THICKNESS;\n\
opacity = clamp((atmosphereOuterRadius - cameraHeight) / (atmosphereOuterRadius - atmosphereInnerRadius), 0.0, 1.0);\n\
float nightAlpha = (u_radiiAndDynamicAtmosphereColor.z != 0.0) ? clamp(dot(normalize(positionWC), lightDirection), 0.0, 1.0) : 1.0;\n\
opacity *= pow(nightAlpha, 0.5);\n\
}\n\
";

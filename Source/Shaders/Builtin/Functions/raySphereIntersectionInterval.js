//This file is automatically rebuilt by the Cesium build process.
export default "czm_raySegment czm_raySphereIntersectionInterval(czm_ray ray, vec3 center, float radius)\n\
{\n\
vec3 o = ray.origin;\n\
vec3 d = ray.direction;\n\
vec3 oc = o - center;\n\
float a = dot(d, d);\n\
float b = 2.0 * dot(d, oc);\n\
float c = dot(oc, oc) - (radius * radius);\n\
float det = (b * b) - (4.0 * a * c);\n\
if (det < 0.0) {\n\
return czm_emptyRaySegment;\n\
}\n\
float sqrtDet = sqrt(det);\n\
float t0 = (-b - sqrtDet) / (2.0 * a);\n\
float t1 = (-b + sqrtDet) / (2.0 * a);\n\
czm_raySegment result = czm_raySegment(t0, t1);\n\
return result;\n\
}\n\
";

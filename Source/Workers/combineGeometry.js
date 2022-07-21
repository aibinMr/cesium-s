/* This file is automatically rebuilt by the Cesium build process. */
define(['./PrimitivePipeline-28c26bf7', './createTaskProcessorWorker', './Transforms-cba329c8', './Matrix2-fc7e9822', './RuntimeError-c581ca93', './defaultValue-94c3e563', './ComponentDatatype-4a60b8d6', './WebGLConstants-7dccdc96', './_commonjsHelpers-3aae1032-f55dc0c4', './combine-761d9c3f', './GeometryAttribute-d3d8222f', './GeometryAttributes-7df9bef6', './GeometryPipeline-80e56d7a', './AttributeCompression-4d18cc04', './EncodedCartesian3-d3e254ea', './IndexDatatype-db156785', './IntersectionTests-11ecc105', './Plane-e20fba8c', './WebMercatorProjection-843df830'], (function (PrimitivePipeline, createTaskProcessorWorker, Transforms, Matrix2, RuntimeError, defaultValue, ComponentDatatype, WebGLConstants, _commonjsHelpers3aae1032, combine, GeometryAttribute, GeometryAttributes, GeometryPipeline, AttributeCompression, EncodedCartesian3, IndexDatatype, IntersectionTests, Plane, WebMercatorProjection) { 'use strict';

  function combineGeometry(packedParameters, transferableObjects) {
    const parameters = PrimitivePipeline.PrimitivePipeline.unpackCombineGeometryParameters(
      packedParameters
    );
    const results = PrimitivePipeline.PrimitivePipeline.combineGeometry(parameters);
    return PrimitivePipeline.PrimitivePipeline.packCombineGeometryResults(
      results,
      transferableObjects
    );
  }
  var combineGeometry$1 = createTaskProcessorWorker(combineGeometry);

  return combineGeometry$1;

}));

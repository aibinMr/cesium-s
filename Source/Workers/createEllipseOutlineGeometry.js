/* This file is automatically rebuilt by the Cesium build process. */
define(['./Matrix2-fc7e9822', './defaultValue-94c3e563', './EllipseOutlineGeometry-f07f23a6', './RuntimeError-c581ca93', './ComponentDatatype-4a60b8d6', './WebGLConstants-7dccdc96', './Transforms-cba329c8', './_commonjsHelpers-3aae1032-f55dc0c4', './combine-761d9c3f', './EllipseGeometryLibrary-73723484', './GeometryAttribute-d3d8222f', './GeometryAttributes-7df9bef6', './GeometryOffsetAttribute-ec11b721', './IndexDatatype-db156785'], (function (Matrix2, defaultValue, EllipseOutlineGeometry, RuntimeError, ComponentDatatype, WebGLConstants, Transforms, _commonjsHelpers3aae1032, combine, EllipseGeometryLibrary, GeometryAttribute, GeometryAttributes, GeometryOffsetAttribute, IndexDatatype) { 'use strict';

  function createEllipseOutlineGeometry(ellipseGeometry, offset) {
    if (defaultValue.defined(offset)) {
      ellipseGeometry = EllipseOutlineGeometry.EllipseOutlineGeometry.unpack(ellipseGeometry, offset);
    }
    ellipseGeometry._center = Matrix2.Cartesian3.clone(ellipseGeometry._center);
    ellipseGeometry._ellipsoid = Matrix2.Ellipsoid.clone(ellipseGeometry._ellipsoid);
    return EllipseOutlineGeometry.EllipseOutlineGeometry.createGeometry(ellipseGeometry);
  }

  return createEllipseOutlineGeometry;

}));

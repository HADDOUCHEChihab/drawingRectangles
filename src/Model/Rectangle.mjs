/**
 * Defining a rectangle and its parameters.
 */
class Rectangle {
  constructor(
    id,
    xOrigin,
    yOrigin,
    xEnd,
    yEnd,
    height,
    width,
    area,
    color,
    isUpdated,
    isRotated,
    lineHeight,
    lineColor
  ) {
    this.id = id;
    this.xOrigin = xOrigin;
    this.yOrigin = yOrigin;
    this.xEnd = xEnd;
    this.yEnd = yEnd;
    this.width = width;
    this.height = height;
    this.area = area;
    this.isUpdated = isUpdated;
    this.isRotated = isRotated;
    this.color = color;
    this.lineHeight = lineHeight;
    this.lineColor = lineColor;
  }
}

export default Rectangle;

/**
 * Cless handeling rectangles.
 */
class RectangleService {
  constructor() {
    this.rectangles = [];
    this.incrementId = 0;
  }

  /**
   * Adding a new rectangle.
   * @param {*} rectangle
   */
  addRectangle(rectangle) {
    rectangle.id = this.incrementId++;
    this.rectangles.push(rectangle);
  }

  /**
   * Delete a drawn rectangle.
   * @param {*} rectangle
   */
  deleteRectangle(rectangle) {
    this.rectangles = this.rectangles.filter(
      (rect) => rect.id !== rectangle.id
    );
  }

  /**
   * @returns drawn rectangles.
   */
  getRectangles() {
    return this.rectangles;
  }

  /**
   * Update a drawn rectangle.
   * @param {*} updatedRectangle
   */
  updateRectangle(updatedRectangle) {
    this.rectangles.forEach((rect) => {
      if (updatedRectangle && rect.id == updatedRectangle.id) {
        rect.isUpdated = true;
      }
    });
  }

  /**
   * Assign a new color to rectangle.
   */
  recolorRectangle(rectangle, color) {
    this.rectangles.forEach((rect) => {
      if (rectangle && rect.id == rectangle.id) {
        rect.color = color;
      }
    });
  }
}

export default RectangleService;

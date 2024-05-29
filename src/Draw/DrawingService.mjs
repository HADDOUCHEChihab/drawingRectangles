import Rectangle from "../Model/Rectangle.mjs";

/**
 * Service for drawing rectangles on canvas.
 */
class DrawingService {
  constructor(canvas, rectangleService) {
    const ctx = canvas.getContext("2d");
    if (!ctx) {
      throw new Error("Canvas rendering context is required");
    }
    this.rectangleService = rectangleService;
    this.context = ctx;
    this.canvas = canvas;
    this.xOrigin = 0;
    this.yOrigin = 0;
    this.xFinal = 0;
    this.yFinal = 0;
    this.drawingMarker = null;
    this.isDrawing = false;
    this.drawMode = false;
  }

  /**
   * Draw a new rectangle.
   * @param {*} rectangle
   */
  drawRectangle(rectangle) {
    this.context.beginPath();
    this.context.rect(
      rectangle.xOrigin,
      rectangle.yOrigin,
      rectangle.width,
      rectangle.height
    );
    this.context.fillStyle = rectangle.color;
    this.context.fill();
    this.context.lineWidth = rectangle.lineHeight;
    this.context.strokeStyle = rectangle.lineColor;
    this.context.stroke();
  }

  /**
   * Draw mode indicator.
   */
  startDrawMode() {
    this.drawMode = true;
  }

  /**
   * Handle start drawing action.
   * @param {*} event
   */
  startDrawing(event) {
    const rect = this.canvas.getBoundingClientRect();
    this.xOrigin = event.clientX - rect.left;
    this.yOrigin = event.clientY - rect.top;
    this.isDrawing = true;
  }

  /**
   * Handle drawing action.
   * @param {*} event
   */
  draw(event) {
    if (this.isDrawing && this.drawMode) {
      const rect = this.canvas.getBoundingClientRect();
      this.xFinal = event.clientX - rect.left;
      this.yFinal = event.clientY - rect.top;
      const width = this.xFinal - this.xOrigin;
      const height = this.yFinal - this.yOrigin;

      // Marker to display drawing.
      this.drawingMarker = new Rectangle(
        0,
        this.xOrigin,
        this.yOrigin,
        this.xFinal,
        this.yFinal,
        height,
        width,
        0,
        "rgba(173, 216, 230, 0.5)",
        false,
        2,
        "rgba(0, 0, 139, 0.1)"
      );

      // Delete all elements.
      this.clearCanvas();

      // Redraw drawn rectangles.
      this.rectangleService.getRectangles().forEach((rectangle) => {
        this.drawRectangle(rectangle);
      });

      // Draw the marker.
      this.drawRectangle(this.drawingMarker);
    }
  }

  /**
   * Handle finish drawing action.
   */
  endDrawing() {
    if (this.drawMode) {
      const width = this.xFinal - this.xOrigin;
      const height = this.yFinal - this.yOrigin;
      const color = this.generateRandomColor();
      const area = Math.abs(height) * Math.abs(width);
      const finalRectangle = new Rectangle(
        this.rectangleService.incrementId++,
        this.xOrigin,
        this.yOrigin,
        this.xFinal,
        this.yFinal,
        height,
        width,
        area,
        color,
        false,
        false,
        0,
        "rgba(0, 0, 0, 0.5)"
      );

      // Add a rectangle to the list.
      this.rectangleService.addRectangle(finalRectangle);

      // Reset parameters
      this.xOrigin = 0;
      this.yOrigin = 0;
      this.xFinal = 0;
      this.yFinal = 0;
      this.drawingMarker = null;

      // Delete elements.
      this.clearCanvas();

      // Redraw rectangles.
      this.rectangleService.getRectangles().forEach((rectangle) => {
        this.drawRectangle(rectangle);
      });
    }

    // Reset drawing mode.
    this.isDrawing = false;
    this.drawMode = false;
  }

  cancelDrawing() {

    // Reset parameters
    this.xOrigin = 0;
    this.yOrigin = 0;
    this.xFinal = 0;
    this.yFinal = 0;
    this.drawingMarker = null;

    // Delete elements.
    this.clearCanvas();

    // Redraw rectangles.
    this.rectangleService.getRectangles().forEach((rectangle) => {
      this.drawRectangle(rectangle);
    });

    // Reset drawing mode.
    this.isDrawing = false;
    this.drawMode = false;
  }

  /**
   * Delete all rectangles.
   */
  clearCanvas() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  /**
   * @returns a new random color.
   */
  generateRandomColor() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r},${g},${b})`;
  }

  /**
   * Rotate a rectangle by a given angle.
   * @param {*} rectangle
   * @param {*} angle
   */
  rotateRectangle(rectangle, angle) {
    const centerX = (rectangle.xOrigin + rectangle.xEnd) / 2;
    const centerY = (rectangle.yOrigin + rectangle.yEnd) / 2;
    const width = rectangle.width;
    const height = rectangle.height;

    // Save the current context state
    this.context.save();

    // Move the origin to the center of the rectangle
    this.context.translate(centerX, centerY);

    // Apply the rotation
    this.context.rotate((angle * Math.PI) / 180);

    // Draw the rectangle centered at the origin
    this.context.fillStyle = rectangle.color;
    this.context.fillRect(-width / 2, -height / 2, width, height);
    this.context.lineWidth = rectangle.lineHeight;
    this.context.strokeStyle = rectangle.lineColor;

    // Restore the context state
    this.context.restore();
  }
}

export default DrawingService;
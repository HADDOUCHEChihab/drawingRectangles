import DrawingService from "./Draw/DrawingService.mjs";
import RectangleService from "./Draw/RectangleService.mjs";

// Rotation process indicator.
let isRotateProcessing = false;

// Selected rectangles.
const selectedRectangles = [];

// Check and define canvas.
const drawButton = document.getElementById("drawButton");
document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("rectangles");
  if (!canvas) {
    throw new Error("Canvas element not found");
  }

  // Get services
  const rectangleService = new RectangleService();
  const drawingService = new DrawingService(canvas, rectangleService);

  // Handle mousedown.
  canvas.addEventListener("mousedown", (event) =>
    drawingService.startDrawing(event)
  );

  // Handle mousemove.
  canvas.addEventListener("mousemove", (event) => drawingService.draw(event));

  // Handle mouseUp.
  canvas.addEventListener("mouseup", () => {
    drawingService.endDrawing();
    drawButton.style.backgroundColor = "#eeeeee";
  });

  // Handle mouse when living canvas.
  canvas.addEventListener("mouseleave", () => {
    drawingService.cancelDrawing();
    drawButton.style.backgroundColor = "#eeeeee";
  });

  // Handle double click.
  canvas.addEventListener("dblclick", (event) => {
    event.preventDefault();
    handleDoubleClick(event, canvas, rectangleService, drawingService);
  });

  // Handle draw button click.
  drawButton.addEventListener("click", () => {
    drawingService.startDrawMode();
    drawButton.style.backgroundColor = "#8c8a8a";
  });

  // Handle recolor button click.
  document
    .getElementById("colorButton")
    .addEventListener("click", () =>
      recolorRectangles(rectangleService, drawingService)
    );
});

// Handle modal display.
document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("instructionModal");
  const closeModal = document.getElementById("closeModal");

  // Show the modal on page load
  modal.style.display = "block";

  // Close the modal when the user clicks the close button
  closeModal.addEventListener("click", () => {
    modal.style.display = "none";
  });

  // Close the modal when the user clicks anywhere outside of the modal
  window.addEventListener("click", (event) => {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  });
});

/**
 * Handle double click event to select a rectangle.
 * @param {Event} event - The double click event.
 * @param {HTMLElement} canvas - The canvas element.
 * @param {RectangleService} rectangleService - The rectangle service instance.
 * @param {DrawingService} drawingService - The drawing service instance.
 */
function handleDoubleClick(event, canvas, rectangleService, drawingService) {
  const rect = canvas.getBoundingClientRect();
  const coordX = event.clientX - rect.left;
  const coordY = event.clientY - rect.top;

  const selectedRectangle = getClickedRectangle(
    coordX,
    coordY,
    rectangleService
  );

  if (selectedRectangle && !selectedRectangle.isUpdated) {
    selectedRectangles.push(selectedRectangle);
    rectangleService.updateRectangle(selectedRectangle);
    if (!isRotateProcessing) {
      processRectangleQueue(rectangleService, drawingService);
    }
  }
}

/**
 * Get the rectangle clicked on.
 * @param {number} coordX - The X coordinate of the click.
 * @param {number} coordY - The Y coordinate of the click.
 * @param {RectangleService} rectangleService - The rectangle service instance.
 * @returns {Object|null} The clicked rectangle or null.
 */
function getClickedRectangle(coordX, coordY, rectangleService) {
  const rectangles = rectangleService.getRectangles();
  return (
    rectangles.find((rectangle) => {
      const xMin = Math.min(rectangle.xOrigin, rectangle.xEnd);
      const xMax = Math.max(rectangle.xOrigin, rectangle.xEnd);
      const yMin = Math.min(rectangle.yOrigin, rectangle.yEnd);
      const yMax = Math.max(rectangle.yOrigin, rectangle.yEnd);

      return (
        coordX >= xMin && coordX <= xMax && coordY >= yMin && coordY <= yMax
      );
    }) || null
  );
}

/**
 * Process the queue of rectangles to rotate them.
 * @param {RectangleService} rectangleService - The rectangle service instance.
 * @param {DrawingService} drawingService - The drawing service instance.
 */
async function processRectangleQueue(rectangleService, drawingService) {
  isRotateProcessing = true;

  while (selectedRectangles.length > 0) {
    const rectangle = selectedRectangles.shift();
    await rotateRectangle(rectangle, drawingService, rectangleService);
    rectangleService.addRectangle(rectangle);
  }

  drawingService.clearCanvas();

  rectangleService.getRectangles().forEach((rect) => {
    if (!rect.isRotated) {
      drawingService.drawRectangle(rect);
    } else {
      rectangleService.deleteRectangle(rect);
    }
  });

  isRotateProcessing = false;
}

/**
 * Rotate a rectangle.
 * @param {Object} rectangle - The rectangle to rotate.
 * @param {DrawingService} drawingService - The drawing service instance.
 * @param {RectangleService} rectangleService - The rectangle service instance.
 * @returns {Promise} A promise that resolves when the rotation is complete.
 */
function rotateRectangle(rectangle, drawingService, rectangleService) {
  return new Promise((resolve) => {
    let rotations = 0;
    let angle = 0;
    const interval = setInterval(() => {
      if (rotations < 180) {
        angle = (angle + 1) % 360;
        drawingService.clearCanvas();
        rectangleService.deleteRectangle(rectangle);
        drawingService.rotateRectangle(rectangle, angle);
        rectangleService
          .getRectangles()
          .forEach((rect) => drawingService.drawRectangle(rect));
        rotations++;
      } else {
        clearInterval(interval);
        rectangle.isRotated = true;
        resolve();
      }
    }, 10);
  });
}

/**
 * Recolor the two smallest rectangles.
 * @param {RectangleService} rectangleService - The rectangle service instance.
 * @param {DrawingService} drawingService - The drawing service instance.
 */
function recolorRectangles(rectangleService, drawingService) {
  const rectangles = rectangleService.getRectangles();
  const twoMinRectangles = rectangles
    .sort((a, b) => a.area - b.area)
    .slice(0, 2);

  const color = drawingService.generateRandomColor();
  twoMinRectangles.forEach((rect) =>
    rectangleService.recolorRectangle(rect, color)
  );

  drawingService.clearCanvas();
  rectangleService
    .getRectangles()
    .forEach((rect) => drawingService.drawRectangle(rect));
}

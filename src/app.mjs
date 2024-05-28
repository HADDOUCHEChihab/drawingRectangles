import DrawingService from "./Draw/DrawingService.mjs";
import RectangleService from "./Draw/RectangleService.mjs";

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
  });

  // Handle mouse when living canvas.
  canvas.addEventListener("mouseleave", () => {
    drawingService.cancelDrawing();
  });


  // Handle draw button click.
  drawButton.addEventListener("click", () => {
    drawingService.startDrawMode();
  });
});
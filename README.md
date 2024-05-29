# drawing rectangles
# Technical Test Project

## Description

This project aims to create a web interface in JavaScript or TypeScript that allows for various actions on colored rectangles. The interface is developed without using frameworks to appreciate the quality of the produced code. The proposed features are as follows:

1. Drawing rectangles with random colors using the mouse.
2. Rotating a rectangle 360° on double-click, followed by its deletion.
3. If multiple rectangles are double-clicked simultaneously, wait for all rotations to finish before deleting them.
4. A button to repaint the two rectangles with the smallest difference in area with the same random color.

## Project Structure

The project is structured as follows:
```
project-root/
├── src/
│   ├── app.mjs
│   ├── Draw/
│       ├── DrawingService.mjs
│       ├── RectangleService.mjs
│       ├── Model
│           ├── Rectangle.mjs
├── index.html
├── style.css
├── README.md
└── assets/
```
> The **.mjs** extension is used to denote ES6 modules in JavaScript. This ensures compatibility with module-based imports and exports.

## Features

### Drawing Rectangles

- Click on the drawing button, then move your mouse to the drawing board and drag it across the drawing area to create a rectangle with a random color.

### Rotation and Deletion of Rectangles

- Double-click on a rectangle to rotate it 360°. Once the rotation is complete, the rectangle will be deleted.

- If multiple rectangles are double-clicked simultaneously, wait for all rotations to finish before deleting them.

- A color button is present to enable recoloring of the two smallest rectangles on the drawing board.

## Install Instructions

1. Clone the Git repository:
    ```bash
    git clone <repository-url>
    cd project-root
    ```

2. Open the `index.html` file in your preferred web browser to launch the application.


## Contact

For any questions or clarifications, please contact:

Chihab HADDOUCHE

---



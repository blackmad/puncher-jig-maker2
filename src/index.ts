function generateSVG({
  height,
  width,
  holeSize = 0.15,
  maxHoles = 10,
  holeSpacing = 0.25,
}: {
  height: number;
  width: number;
  holeSize?: number;
  maxHoles?: number;
  holeSpacing?: number;
}): string {
  let svg = `<svg height="${height}in" width="${width}in" xmlns="http://www.w3.org/2000/svg">`;

  // Draw a box around the whole svg
  svg += `<rect x="0" y="0" width="${width}in" height="${height}in" fill="none" stroke="black" />`;

  let numHoles = 2;
  if (height / holeSize > 2) {
    numHoles = 3;
  }

  numHoles = Math.min(numHoles, maxHoles);

  // Calculate the number of holes that can fit in the width and height
  const holesHorizontal = Math.floor(width / (holeSize + holeSpacing));
  console.log(width / (holeSize + holeSpacing), width, holeSize, holeSpacing);
  console.log({ holesHorizontal });

  for (let x = holeSpacing; x < width; x += holeSpacing) {
    for (let yIndex = 0; yIndex < numHoles; yIndex++) {
      const extraSpace = (height - numHoles * holeSize) / (numHoles + 1);
      const y = (yIndex + 1) * extraSpace + yIndex * holeSize + holeSize / 2;

      svg += `<circle cx="${x}in" cy="${y}in" r="${holeSize / 2}in" stroke="black" fill="white" />`;
    }
  }

  svg += "</svg>";
  return svg;
}

const jigSvg = generateSVG({
  height: 1,
  width: 1,
  maxHoles: 2,
});

import fs from "fs";
fs.writeFileSync("x.svg", jigSvg);

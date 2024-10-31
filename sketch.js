let data = [
  { location: "UPL Plant", values: [7.37, 2138, 438, 307, 530, 7.8, 75, 263] },
  { location: "Excel Industries", values: [7.57, 1210, 518, 96, 520, 6.0, 65, 590] },
  { location: "Sayna Chemical", values: [7.44, 2046, 878, 470, 840, 6.3, 120, 668] },
  { location: "Ajmeri Farm", values: [7.19, 2272, 818, 124, 680, 6.5, 59, 668] }
];

let parameters = [
  { name: "pH", limit: 6.5, max: 8.5, unit: "" },
  { name: "TDS", limit: 500, max: 2500, unit: "mg/L" },
  { name: "Chlorides", limit: 250, max: 1000, unit: "mg/L" },
  { name: "Sulphates", limit: 200, max: 500, unit: "mg/L" },
  { name: "Hardness", limit: 300, max: 1000, unit: "mg/L" },
  { name: "Iron", limit: 0.3, max: 10, unit: "mg/L" },
  { name: "Calcium", limit: 75, max: 150, unit: "mg/L" },
  { name: "Nitrates", limit: 45, max: 700, unit: "mg/L" }
];

function setup() {
  createCanvas(800, 500);
  textAlign(CENTER, CENTER);
  noLoop(); // Only draw once
}

function draw() {
  background(255);
  let margin = 100;
  let barWidth = (width - 2 * margin) / data.length;

  // Title above locations
  textSize(16);
  fill(0);
  text("LOCATIONS", width / 2, 40);

  // Draw location labels at the top and bars below
  for (let i = 0; i < data.length; i++) {
    let x = margin + i * barWidth;

    // Draw location names below the title
    fill(0);
    textSize(12);
    text(data[i].location, x + barWidth / 2, 60); // Location names below "LOCATIONS"

    // Draw parameter bars for each location
    drawParameterBars(x, barWidth, data[i]);

    // Draw x-axis location labels at the bottom
    text(data[i].location, x + barWidth / 2, height - 30);
  }

  // Draw parameter names on y-axis
  for (let j = 0; j < parameters.length; j++) {
    let y = j * ((height - 150) / parameters.length) + 80;
    fill(0);
    textSize(12);
    text(parameters[j].name, 50, y); // Y-axis parameter labels
  }

  // Axis Titles
  textSize(16);
  textAlign(CENTER);
  text("Locations", width / 2, height - 10); // X-axis title
  textAlign(CENTER, CENTER);
  push();
  translate(20, height / 2);
  rotate(-HALF_PI);
  text("Parameters", 0, 0); // Y-axis title
  pop();
}

function drawParameterBars(x, barWidth, locationData) {
  let barHeight = (height - 150) / parameters.length;

  for (let j = 0; j < parameters.length; j++) {
    let param = parameters[j];
    let value = locationData.values[j];
    let y = j * barHeight + 70;

    // Determine if the value is within the safe limit
    let barColor = value > param.limit ? color(255, 100, 100) : color(100, 255, 100);
    fill(barColor);
    let barLength = map(value, 0, param.max, 0, barWidth - 20);

    // Draw the bar
    rect(x + 10, y, barLength, barHeight - 10, 5);

    // Show parameter value with units on hover
    if (
      mouseX > x + 10 &&
      mouseX < x + 10 + barLength &&
      mouseY > y &&
      mouseY < y + barHeight - 10
    ) {
      fill(0);
      textSize(10);
      text(
        `${param.name}: ${value} ${param.unit} (Limit: ${param.limit} ${param.unit})`,
        mouseX,
        mouseY - 10
      );
    }
  }
}

function mouseMoved() {
  // Redraw on mouse movement to update hover effects
  redraw();
}

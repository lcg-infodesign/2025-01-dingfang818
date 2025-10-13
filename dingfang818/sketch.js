let table;
let validRows = [];
let stats = {};
let col0 = [], col1 = [], col2 = [], col3 = [], col4 = [];

function preload() {
  table = loadTable("dataset.csv", "csv", "header");
}

function setup() {
  createCanvas(1000, 650);
  textSize(16);
  textAlign(LEFT, CENTER);
  noLoop();

  // Filter valid rows筛选有效行
  for (let r = 0; r < table.getRowCount(); r++) {
    let c3 = int(table.getNum(r, "column3"));
    if (c3 % 3 === 0 && c3 >= 30 && c3 < 42) {
      validRows.push(table.getRow(r));
    }
  }

  // Extract column data提取列数据
  col0 = validRows.map(r => Number(r.get("column0")));
  col1 = validRows.map(r => Number(r.get("column1")));
  col2 = validRows.map(r => Number(r.get("column2")));
  col3 = validRows.map(r => Number(r.get("column3")));
  col4 = validRows.map(r => Number(r.get("column4")));

  //  Calculating statistics计算统计量
  stats.mean0 = mean(col0);
  stats.std1 = standardDeviation(col1);
  stats.mode2 = mode(col2);
  stats.median3 = median(col3);
  stats.mean4 = mean(col4);
  stats.std4 = standardDeviation(col4);
}

function draw() {
  background(245);
  textAlign(CENTER);
  textSize(24);
  fill(50);
  text("Dataset Visualization Dashboard", width / 2, 40);
  textSize(16);
  textAlign(LEFT, CENTER);

  let colWidth = width / 5;

  // ==== Column0 (Mean as Circle) ====
  fill(220, 240, 255);
  rect(0, 70, colWidth, height - 70);
  fill(0);
  text("Column0 — Mean", 20, 100);
  let meanSize = map(stats.mean0, min(col0), max(col0), 30, 150);
  fill(80, 150, 255, 180);
  ellipse(colWidth / 2, height / 2, meanSize, meanSize);
  fill(0);
  text("Mean: " + stats.mean0.toFixed(2), colWidth / 2 - 50, height / 2 + meanSize / 2 + 25);

  // ==== Column1 (Std as Rectangle Bar) ====
  fill(255, 230, 200);
  rect(colWidth, 70, colWidth, height - 70);
  fill(0);
  text("Column1 — Standard Deviation", colWidth + 20, 100);
  let barHeight = map(stats.std1, 0, max(col1), 20, 200);
  fill(255, 180, 100);
  rect(colWidth + colWidth / 2 - 25, height / 2 - barHeight / 2, 50, barHeight);
  fill(0);
  text("Std: " + stats.std1.toFixed(2), colWidth + 60, height / 2 + barHeight / 2 + 25);

  // ==== Column2 (Mode as Text) ====
  fill(200, 255, 200);
  rect(colWidth * 2, 70, colWidth, height - 70);
  fill(0);
  text("Column2 — Mode", colWidth * 2 + 20, 100);
  textSize(40);
  fill(50, 160, 100);
  text(stats.mode2, colWidth * 2 + colWidth / 2, height / 2);
  textSize(16);
  fill(0);
  text("(Most frequent value)", colWidth * 2 + colWidth / 2 - 80, height / 2 + 50);

  // ==== Column3 (Median as Text) ====
  fill(255, 210, 230);
  rect(colWidth * 3, 70, colWidth, height - 70);
  fill(0);
  text("Column3 — Median", colWidth * 3 + 20, 100);
  textSize(40);
  fill(200, 60, 120);
  text(stats.median3, colWidth * 3 + colWidth / 2, height / 2);
  textSize(16);
  fill(0);
  text("(Middle value)", colWidth * 3 + colWidth / 2 - 60, height / 2 + 50);

  // ==== Column4 (Mean & Std as Dual Bar) ====
  fill(220, 230, 255);
  rect(colWidth * 4, 70, colWidth, height - 70);
  fill(0);
  text("Column4 — Mean & Std", colWidth * 4 + 20, 100);

  let meanBarH = map(stats.mean4, min(col4), max(col4), 50, 200);
  let stdBarH = map(stats.std4, 0, max(col4) - min(col4), 30, 150);

  // 双柱
  fill(100, 180, 250);
  rect(colWidth * 4 + 60, height / 2 - meanBarH / 2, 40, meanBarH);
  fill(255, 160, 100);
  rect(colWidth * 4 + 120, height / 2 - stdBarH / 2, 40, stdBarH);
  fill(0);
  text("Mean", colWidth * 4 + 60, height / 2 + meanBarH / 2 + 25);
  text("Std", colWidth * 4 + 120, height / 2 + stdBarH / 2 + 25);
}

// ---------- 工具函数 ----------
function mean(arr) {
  return arr.reduce((a, b) => a + b, 0) / arr.length;
}

function standardDeviation(arr) {
  let m = mean(arr);
  return Math.sqrt(arr.reduce((sum, v) => sum + (v - m) ** 2, 0) / arr.length);
}

function median(arr) {
  let s = [...arr].sort((a, b) => a - b);
  let mid = floor(s.length / 2);
  return s.length % 2 === 0 ? (s[mid - 1] + s[mid]) / 2 : s[mid];
}

function mode(arr) {
  let freq = {};
  arr.forEach(n => freq[n] = (freq[n] || 0) + 1);
  let maxF = 0, m = arr[0];
  for (let k in freq) {
    if (freq[k] > maxF) { maxF = freq[k]; m = k; }
  }
  return Number(m);
}

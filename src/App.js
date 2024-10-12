import React, { useState } from "react";
import BasicAlgorithmResults from "./components/basicAlgorithm";
import DDAAlgorithmResults from "./components/DDAAlgorithm";
import BresenhamAlgorithmResults from "./components/bressenhamAlgorithm";


function App() {
  const [x1, setX1] = useState(0);
  const [y1, setY1] = useState(0);
  const [x2, setX2] = useState(0);
  const [y2, setY2] = useState(0);
  const [pointsBasic, setPointsBasic] = useState([]);
  const [pointsDDA, setPointsDDA] = useState([]);
  const [pointsBresenham, setPointsBresenham] = useState([]); // State untuk menyimpan titik-titik Bresenham
  const [algorithm, setAlgorithm] = useState("basic");

  const handleRun = () => {
    let newPointsBasic = [];
    let newPointsDDA = [];
    let newPointsBresenham = []; // Variabel baru untuk menyimpan hasil Bresenham

    if (algorithm === "basic") {
      // Algoritma garis dasar (sudah ada sebelumnya)
      const m = (y2 - y1) / (x2 - x1);
      let currentYB = y1;
      const deltaX = x1 < x2 ? 1 : -1;

      for (let x = x1; deltaX > 0 ? x <= x2 : x >= x2; x += deltaX) {
        newPointsBasic.push({
          x: x.toFixed(1),
          dx: deltaX,
          currentYB: currentYB.toFixed(2),
          m: m.toFixed(2),
          y: currentYB.toFixed(2),
        });
        currentYB += m * deltaX;
      }

      setPointsBasic(newPointsBasic);
    } else if (algorithm === "dda") {
      // Algoritma DDA (sudah ada sebelumnya)
      const dx = x2 - x1;
      const dy = y2 - y1;
      const steps = Math.max(Math.abs(dx), Math.abs(dy));
      const incrementX = dx / steps;
      const incrementY = dy / steps;

      let currentX = x1;
      let currentY = y1;

      for (let i = 0; i <= steps; i++) {
        newPointsDDA.push({
          x: currentX,
          y: currentY,
          roundX: Math.round(currentX),
          roundY: Math.round(currentY),
        });

        currentX += incrementX;
        currentY += incrementY;
      }
      setPointsDDA(newPointsDDA);
    } else if (algorithm === "bresenham") {
      // Algoritma Bresenham baru ditambahkan
      let dx = Math.abs(x2 - x1); // Selisih absolut dari x1 dan x2
      let dy = Math.abs(y2 - y1); // Selisih absolut dari y1 dan y2
      let sx = x1 < x2 ? 1 : -1; // Tentukan langkah pada sumbu x
      let sy = y1 < y2 ? 1 : -1; // Tentukan langkah pada sumbu y
      let err = dx - dy; // Error awal

      let currentX = x1; // Mulai dari x1
      let currentY = y1; // Mulai dari y1

      // Looping hingga mencapai titik akhir (x2, y2)
      while (currentX !== x2 || currentY !== y2) {
        newPointsBresenham.push({
          x: currentX,
          y: currentY,
        });

        let e2 = 2 * err; // Hitung nilai error baru

        if (e2 > -dy) {
          err -= dy;
          currentX += sx; // Update x jika error memenuhi syarat
        }

        if (e2 < dx) {
          err += dx;
          currentY += sy; // Update y jika error memenuhi syarat
        }
      }

      // Tambahkan titik akhir (x2, y2) ke dalam daftar
      newPointsBresenham.push({ x: x2, y: y2 });

      setPointsBresenham(newPointsBresenham); // Simpan hasil ke state
    }
  };

  const handleClear = () => {
    setX1(0);
    setY1(0);
    setX2(0);
    setY2(0);
    setPointsBasic([]);
    setPointsDDA([]);
    setPointsBresenham([]); // Reset titik-titik Bresenham saat dihapus
    setAlgorithm("basic");
  };

  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex justify-center gap-6">
        <div className="bg-slate-600 p-4 rounded-lg">
          <h3 className="text-white mb-4">Input Koordinat</h3>
          <div className="flex flex-col gap-4">
            <input
              type="number"
              value={x1}
              onChange={(e) => setX1(parseFloat(e.target.value))}
              placeholder="X1"
              className="p-2 rounded"
              step="any"
            />
            <input
              type="number"
              value={y1}
              onChange={(e) => setY1(parseFloat(e.target.value))}
              placeholder="Y1"
              className="p-2 rounded"
              step="any"
            />
            <input
              type="number"
              value={x2}
              onChange={(e) => setX2(parseFloat(e.target.value))}
              placeholder="X2"
              className="p-2 rounded"
              step="any"
            />
            <input
              type="number"
              value={y2}
              onChange={(e) => setY2(parseFloat(e.target.value))}
              placeholder="Y2"
              className="p-2 rounded"
              step="any"
            />

            <div className="flex gap-2">
              <button
                onClick={() => {
                  setAlgorithm("basic");
                  handleRun();
                }}
                className="bg-blue-500 text-white p-2 rounded"
              >
                Jalankan Algoritma Dasar
              </button>
              <button
                onClick={() => {
                  setAlgorithm("dda");
                  handleRun();
                }}
                className="bg-green-500 text-white p-2 rounded"
              >
                Jalankan Algoritma DDA
              </button>
              <button
                onClick={() => {
                  setAlgorithm("bresenham"); // Tambahkan pilihan untuk menjalankan algoritma Bresenham
                  handleRun();
                }}
                className="bg-purple-500 text-white p-2 rounded"
              >
                Jalankan Algoritma Bresenham
              </button>
              <button
                onClick={handleClear}
                className="bg-red-500 text-white p-2 rounded"
              >
                Hapus
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Tampilkan hasil algoritma sesuai dengan pilihan */}
      {algorithm === "basic" && <BasicAlgorithmResults points={pointsBasic} />}
      {algorithm === "dda" && <DDAAlgorithmResults points={pointsDDA} />}
      {algorithm === "bresenham" && (
        <BresenhamAlgorithmResults points={pointsBresenham} /> // Tampilkan grafik Bresenham
      )}
    </div>
  );
}

export default App;

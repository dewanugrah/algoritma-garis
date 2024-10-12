// components/BresenhamAlgorithmResults.js
import React from 'react';
import { Line } from 'react-chartjs-2';

const BresenhamAlgorithmResults = ({ points }) => {
  const chartData = {
    labels: points.map((point) => point.x),
    datasets: [
      {
        label: 'Garis Koordinat (Bresenham)',
        data: points.map((point) => point.y),
        borderColor: 'rgba(255, 99, 132, 1)',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        fill: true,
      },
    ],
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="bg-gray-100 p-4 rounded-lg">
        <h3>Tabel Koordinat Garis (Bresenham):</h3>
        <table className="table-auto w-full border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="border border-gray-300 p-2">X</th>
              <th className="border border-gray-300 p-2">Y</th>
            </tr>
          </thead>
          <tbody>
            {points.map((point, index) => (
              <tr key={index}>
                <td className="border border-gray-300 p-2">{point.x}</td>
                <td className="border border-gray-300 p-2">{point.y}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="mt-4">
          <h4>Rumus Bresenham:</h4>
          <p>
            1. Hitung DX dan DY: DX = |x2 - x1|, DY = |y2 - y1|
            <br />
            2. Tentukan langkah X dan Y: Jika x1 &lt; x2 maka sx = 1, jika tidak sx = -1. Jika y1 &lt; y2 maka sy = 1, jika tidak sy = -1.
            <br />
            3. Tentukan nilai awal error: err = DX - DY
            <br />
            4. Untuk setiap titik, hitung error baru dan update nilai x atau y sesuai dengan hasil error.
          </p>
        </div>
      </div>

      {/* Grafik */} 
      <div className="bg-white p-4 rounded-lg">
        <h3>Grafik Koordinat:</h3>
        <Line data={chartData} />
      </div>
    </div>
  );
};

export default BresenhamAlgorithmResults;

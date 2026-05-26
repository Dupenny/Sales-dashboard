"use client";
import { useEffect, useRef } from "react";
import {
  Chart,
  LineElement,
  PointElement,
  LineController,
  CategoryScale,
  LinearScale,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";

Chart.register(
  LineElement,
  PointElement,
  LineController,
  CategoryScale,
  LinearScale,
  Filler,
  Tooltip,
  Legend,
);

const labels = ["Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const revenue = [8200, 9400, 11800, 10200, 13500, 14800, 18900];
const orders = [5100, 6800, 8200, 7400, 9800, 11200, 15600];

export default function SalesChart() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const chartRef = useRef<Chart | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    chartRef.current?.destroy();
    chartRef.current = new Chart(canvasRef.current, {
      type: "line",
      data: {
        labels,
        datasets: [
          {
            label: "Revenue",
            data: revenue,
            borderColor: "#5b5bd6",
            backgroundColor: "rgba(91,91,214,0.08)",
            fill: true,
            tension: 0.45,
            pointRadius: 0,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: "#5b5bd6",
            borderWidth: 2,
          },
          {
            label: "Order",
            data: orders,
            borderColor: "#93c5fd",
            backgroundColor: "rgba(147,197,253,0.08)",
            fill: true,
            tension: 0.45,
            pointRadius: 0,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: "#93c5fd",
            borderWidth: 2,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: { mode: "index", intersect: false },
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: "#0e0e0e",
            titleColor: "#a0a09c",
            bodyColor: "#ffffff",
            padding: 10,
            cornerRadius: 8,
            callbacks: {
              label: (ctx) =>
                `${ctx.dataset.label}: $${ctx.raw?.toLocaleString()}`,
            },
          },
        },
        scales: {
          x: {
            grid: { display: false },
            ticks: { color: "#9e9e9a", font: { size: 11.5 } },
          },
          y: {
            grid: { color: "rgba(0,0,0,.04)" },
            ticks: {
              color: "#9e9e9a",
              font: { size: 11.5 },
              callback: (v) => "$" + Number(v).toLocaleString(),
            },
            border: { display: false },
          },
        },
      },
    });
    return () => chartRef.current?.destroy();
  }, []);

  return (
    <div className="chart-card">
      <div className="card-header">
        <span className="card-title">Sales Overtime</span>
        <div className="card-actions">
          <span className="legend-label">
            <span className="legend-dot" style={{ background: "#5b5bd6" }} />
            Revenue
          </span>
          <span className="legend-label">
            <span className="legend-dot" style={{ background: "#93c5fd" }} />
            Order
          </span>
          <button className="more-btn">
            <i className="ti ti-dots" />
          </button>
        </div>
      </div>
      <div className="chart-area">
        <canvas
          ref={canvasRef}
          role="img"
          aria-label="Line chart showing revenue and orders June–December 2023"
        />
      </div>
    </div>
  );
}

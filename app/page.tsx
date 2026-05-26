"use client";

import { useEffect, useRef, useState, useCallback } from "react";
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

const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600&family=DM+Sans:wght@300;400;500;600&display=swap');
  @import url('https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@3.19.0/dist/tabler-icons.min.css');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --obsidian: #0b0c10;
    --surface: #111318;
    --surface2: #181b22;
    --surface3: #1f2330;
    --border: rgba(255,255,255,0.07);
    --border2: rgba(255,255,255,0.12);
    --gold: #c9a84c;
    --gold2: #e8c87a;
    --gold-dim: rgba(201,168,76,0.15);
    --gold-glow: rgba(201,168,76,0.08);
    --text-1: #f0ede6;
    --text-2: #9e9a91;
    --text-3: #5e5b54;
    --accent: #5b7fff;
    --accent-dim: rgba(91,127,255,0.12);
    --success: #3dba7e;
    --success-dim: rgba(61,186,126,0.12);
    --warn: #e8a83c;
    --warn-dim: rgba(232,168,60,0.12);
    --danger: #e0534a;
    --danger-dim: rgba(224,83,74,0.12);
    --sidebar-w: 256px;
    --topbar-h: 64px;
    --radius: 14px;
    --radius-sm: 8px;
    --transition: all 0.25s cubic-bezier(.4,0,.2,1);
  }

  html, body, #root { height: 100%; background: var(--obsidian); color: var(--text-1); font-family: 'DM Sans', sans-serif; }

  /* ── SCROLLBAR ── */
  ::-webkit-scrollbar { width: 4px; }
  ::-webkit-scrollbar-track { background: transparent; }
  ::-webkit-scrollbar-thumb { background: var(--surface3); border-radius: 2px; }

  /* ── SHELL ── */
  .shell { display: flex; min-height: 100vh; background: var(--obsidian); }
  .page-wrapper { flex: 1; display: flex; flex-direction: column; min-width: 0; margin-left: var(--sidebar-w); transition: margin-left 0.3s cubic-bezier(.4,0,.2,1); }
  @media (max-width: 900px) { .page-wrapper { margin-left: 0; } }

  /* ── OVERLAY ── */
  .overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.7); backdrop-filter: blur(2px); z-index: 98; opacity: 0; pointer-events: none; transition: opacity 0.3s ease; }
  .overlay.open { opacity: 1; pointer-events: all; }

  /* ── SIDEBAR ── */
  .sidebar {
    position: fixed; top: 0; left: 0; width: var(--sidebar-w); height: 100vh;
    background: var(--surface);
    border-right: 1px solid var(--border);
    display: flex; flex-direction: column;
    z-index: 99;
    overflow: hidden;
    transition: transform 0.3s cubic-bezier(.4,0,.2,1);
  }
  @media (max-width: 900px) {
    .sidebar { transform: translateX(-100%); box-shadow: none; }
    .sidebar.open { transform: translateX(0); box-shadow: 20px 0 60px rgba(0,0,0,0.6); }
  }

  .sidebar-logo {
    display: flex; align-items: center; gap: 10px;
    padding: 0 20px;
    height: var(--topbar-h);
    border-bottom: 1px solid var(--border);
    flex-shrink: 0;
  }
  .logo-mark {
    width: 32px; height: 32px; border-radius: 9px;
    background: linear-gradient(135deg, #c9a84c 0%, #8c6a1f 100%);
    display: flex; align-items: center; justify-content: center;
    flex-shrink: 0;
  }
  .logo-text { font-family: 'Playfair Display', serif; font-size: 15px; font-weight: 600; color: var(--text-1); letter-spacing: 0.01em; line-height: 1.2; }

  .sidebar-scroll { flex: 1; overflow-y: auto; padding: 16px 12px 12px; display: flex; flex-direction: column; gap: 2px; }
  .sidebar-label { font-size: 10px; font-weight: 600; color: var(--text-3); letter-spacing: 0.12em; text-transform: uppercase; padding: 12px 10px 6px; }
  .sidebar-divider { height: 1px; background: var(--border); margin: 10px 0; }

  .nav-item {
    display: flex; align-items: center; gap: 10px;
    padding: 9px 12px; border-radius: var(--radius-sm);
    border: none; background: transparent; cursor: pointer;
    color: var(--text-2); font-size: 13.5px; font-weight: 400; font-family: 'DM Sans', sans-serif;
    width: 100%; text-align: left;
    transition: var(--transition);
    position: relative;
    letter-spacing: 0.01em;
  }
  .nav-item i { font-size: 17px; flex-shrink: 0; transition: color 0.2s; }
  .nav-item:hover { background: var(--surface2); color: var(--text-1); }
  .nav-item.active {
    background: var(--gold-dim);
    color: var(--gold2);
    font-weight: 500;
  }
  .nav-item.active i { color: var(--gold); }
  .nav-item.active::before {
    content: '';
    position: absolute; left: 0; top: 20%; height: 60%; width: 2.5px;
    background: var(--gold);
    border-radius: 0 2px 2px 0;
  }

  .sidebar-bottom { padding: 12px; flex-shrink: 0; border-top: 1px solid var(--border); }
  .upgrade-card {
    border-radius: var(--radius);
    padding: 18px 16px;
    background: linear-gradient(135deg, #1a1508 0%, #0f1008 100%);
    border: 1px solid rgba(201,168,76,0.2);
    position: relative; overflow: hidden;
  }
  .upgrade-card::before {
    content: '';
    position: absolute; top: -30px; right: -30px;
    width: 80px; height: 80px;
    background: radial-gradient(circle, rgba(201,168,76,0.25) 0%, transparent 70%);
  }
  .upgrade-icon { font-size: 20px; color: var(--gold); margin-bottom: 8px; }
  .upgrade-title { font-family: 'Playfair Display', serif; font-size: 14px; font-weight: 600; color: var(--gold2); margin-bottom: 5px; }
  .upgrade-desc { font-size: 11.5px; color: var(--text-3); line-height: 1.5; margin-bottom: 12px; }
  .upgrade-btn {
    width: 100%; padding: 8px; border-radius: var(--radius-sm);
    background: linear-gradient(135deg, #c9a84c 0%, #8c6a1f 100%);
    border: none; cursor: pointer;
    font-size: 12px; font-weight: 600; font-family: 'DM Sans', sans-serif;
    color: #0b0c10; letter-spacing: 0.04em;
    transition: var(--transition);
  }
  .upgrade-btn:hover { filter: brightness(1.1); transform: translateY(-1px); }

  /* ── TOPBAR ── */
  .topbar {
    height: var(--topbar-h);
    background: var(--surface);
    border-bottom: 1px solid var(--border);
    display: flex; align-items: center; gap: 12px;
    padding: 0 20px; flex-shrink: 0;
    position: sticky; top: 0; z-index: 50;
  }
  .menu-toggle {
    display: none; background: none; border: none; cursor: pointer;
    color: var(--text-2); font-size: 20px; padding: 4px;
    border-radius: 6px; transition: var(--transition);
    flex-shrink: 0;
  }
  .menu-toggle:hover { color: var(--text-1); background: var(--surface3); }
  @media (max-width: 900px) { .menu-toggle { display: flex; align-items: center; } }

  .search-wrap {
    display: flex; align-items: center; gap: 8px;
    background: var(--surface2); border: 1px solid var(--border);
    border-radius: var(--radius-sm); padding: 0 12px; height: 36px;
    transition: var(--transition); min-width: 0; flex: 1; max-width: 320px;
  }
  .search-wrap.focused { border-color: var(--border2); background: var(--surface3); }
  .search-wrap i { color: var(--text-3); font-size: 15px; flex-shrink: 0; }
  .search-wrap input { background: none; border: none; outline: none; color: var(--text-1); font-size: 13px; font-family: 'DM Sans', sans-serif; width: 100%; }
  .search-wrap input::placeholder { color: var(--text-3); }
  .kbd { font-size: 10px; color: var(--text-3); background: var(--surface3); border: 1px solid var(--border2); border-radius: 4px; padding: 2px 5px; flex-shrink: 0; white-space: nowrap; }
  @media (max-width: 480px) { .kbd { display: none; } }

  .header-spacer { flex: 1; }

  .topbar-right { display: flex; align-items: center; gap: 8px; }
  .notif-btn {
    width: 36px; height: 36px; border-radius: var(--radius-sm);
    background: var(--surface2); border: 1px solid var(--border);
    display: flex; align-items: center; justify-content: center;
    cursor: pointer; position: relative; transition: var(--transition); flex-shrink: 0;
    color: var(--text-2);
  }
  .notif-btn:hover { border-color: var(--border2); color: var(--text-1); }
  .notif-dot {
    position: absolute; top: 7px; right: 7px; width: 6px; height: 6px;
    background: var(--gold); border-radius: 50%;
    box-shadow: 0 0 0 2px var(--surface);
  }

  .user-pill {
    display: flex; align-items: center; gap: 8px;
    padding: 4px 10px 4px 4px;
    border-radius: 100px; cursor: pointer;
    border: 1px solid var(--border);
    background: var(--surface2);
    transition: var(--transition);
  }
  .user-pill:hover { border-color: var(--border2); }
  .user-avatar-img { width: 28px; height: 28px; border-radius: 50%; object-fit: cover; flex-shrink: 0; }
  .user-name { font-size: 12.5px; font-weight: 500; color: var(--text-1); white-space: nowrap; }
  .user-email { font-size: 10.5px; color: var(--text-3); white-space: nowrap; display: none; }
  .user-pill i { color: var(--text-3); flex-shrink: 0; }
  @media (min-width: 600px) { .user-email { display: block; } }
  @media (max-width: 480px) { .user-name { display: none; } }

  /* ── MAIN ── */
  .main { flex: 1; padding: 28px 24px; display: flex; flex-direction: column; gap: 24px; min-width: 0; }
  @media (max-width: 640px) { .main { padding: 20px 16px; gap: 18px; } }

  /* ── PAGE HEADING ── */
  .ov-heading { }
  .ov-title { font-family: 'Playfair Display', serif; font-size: 26px; font-weight: 600; color: var(--text-1); letter-spacing: -0.01em; }
  .ov-sub { font-size: 13.5px; color: var(--text-2); margin-top: 3px; }
  @media (max-width: 640px) { .ov-title { font-size: 22px; } }

  /* ── STAT CARDS ── */
  .stats-row { display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 14px; }
  .stat-card {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: var(--radius);
    padding: 20px;
    transition: var(--transition);
    position: relative; overflow: hidden;
  }
  .stat-card::after {
    content: ''; position: absolute; bottom: 0; left: 0; right: 0; height: 1px;
    background: linear-gradient(90deg, transparent, var(--border2), transparent);
  }
  .stat-card:hover { border-color: var(--border2); transform: translateY(-2px); }
  .stat-card.dark {
    background: linear-gradient(135deg, #181408 0%, #0f1008 100%);
    border-color: rgba(201,168,76,0.18);
  }
  .stat-card.dark:hover { border-color: rgba(201,168,76,0.35); }
  .stat-top { display: flex; align-items: center; justify-content: space-between; margin-bottom: 14px; }
  .stat-label { font-size: 12px; font-weight: 500; color: var(--text-2); letter-spacing: 0.03em; text-transform: uppercase; }
  .stat-icon-box {
    width: 34px; height: 34px; border-radius: var(--radius-sm);
    background: var(--surface2); border: 1px solid var(--border);
    display: flex; align-items: center; justify-content: center;
    color: var(--text-2); font-size: 16px;
  }
  .stat-icon-box.dark-icon { background: rgba(201,168,76,0.1); border-color: rgba(201,168,76,0.2); color: var(--gold); }
  .stat-icon-box.round { border-radius: 50%; }
  .stat-value { font-family: 'Playfair Display', serif; font-size: 30px; font-weight: 500; color: var(--text-1); letter-spacing: -0.02em; margin-bottom: 8px; }
  .stat-card.dark .stat-value { color: var(--gold2); }
  .stat-change { font-size: 12px; color: var(--text-2); display: flex; align-items: center; gap: 5px; flex-wrap: wrap; }
  .change-pct { font-weight: 600; padding: 2px 7px; border-radius: 100px; font-size: 11px; }
  .change-pct.up { color: var(--success); background: var(--success-dim); }
  .change-pct.down { color: var(--danger); background: var(--danger-dim); }

  /* ── DASH GRID ── */
  .dash-grid { display: grid; grid-template-columns: 1fr 340px; gap: 18px; align-items: start; }
  @media (max-width: 1100px) { .dash-grid { grid-template-columns: 1fr 300px; } }
  @media (max-width: 860px) { .dash-grid { grid-template-columns: 1fr; } }

  /* ── CARDS ── */
  .chart-card, .products-card, .orders-card {
    background: var(--surface); border: 1px solid var(--border);
    border-radius: var(--radius); overflow: hidden;
  }
  .card-header {
    display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 10px;
    padding: 18px 20px 14px;
    border-bottom: 1px solid var(--border);
  }
  .card-title { font-family: 'Playfair Display', serif; font-size: 16px; font-weight: 600; color: var(--text-1); letter-spacing: 0.01em; }
  .card-actions { display: flex; align-items: center; gap: 10px; flex-wrap: wrap; }
  .legend-label { display: flex; align-items: center; gap: 5px; font-size: 12px; color: var(--text-2); }
  .legend-dot { width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0; }
  .more-btn { background: none; border: none; cursor: pointer; color: var(--text-3); font-size: 18px; padding: 3px; border-radius: 6px; transition: var(--transition); display: flex; }
  .more-btn:hover { color: var(--text-1); background: var(--surface3); }

  .chart-area { padding: 16px 20px 8px; height: 240px; }
  @media (max-width: 640px) { .chart-area { height: 200px; } }

  /* ── TOP PRODUCTS ── */
  .products-card { }
  .product-row {
    display: flex; align-items: center; gap: 12px; padding: 14px 20px;
    border-bottom: 1px solid var(--border);
    transition: var(--transition);
  }
  .product-row:last-child { border-bottom: none; }
  .product-row:hover { background: var(--surface2); }
  .product-img { width: 42px; height: 42px; border-radius: var(--radius-sm); object-fit: cover; border: 1px solid var(--border); flex-shrink: 0; }
  .product-info { flex: 1; min-width: 0; }
  .product-name { font-size: 12.5px; font-weight: 500; color: var(--text-1); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .product-sales { font-size: 11.5px; color: var(--text-2); margin-top: 2px; }
  .product-right { text-align: right; flex-shrink: 0; }
  .avail-badge { font-size: 10.5px; font-weight: 600; padding: 2px 8px; border-radius: 100px; letter-spacing: 0.03em; }
  .avail-badge.available { color: var(--success); background: var(--success-dim); }
  .product-stock { font-size: 11px; color: var(--text-3); margin-top: 3px; }
  .see-all-btn {
    font-size: 12px; font-weight: 500; color: var(--gold);
    background: none; border: none; cursor: pointer; padding: 4px 0;
    transition: var(--transition);
  }
  .see-all-btn:hover { color: var(--gold2); }

  /* ── TABLE ── */
  .orders-card table { width: 100%; border-collapse: collapse; }
  .orders-card th {
    text-align: left; padding: 11px 20px;
    font-size: 11px; font-weight: 600; color: var(--text-3);
    letter-spacing: 0.08em; text-transform: uppercase;
    border-bottom: 1px solid var(--border);
    white-space: nowrap;
  }
  .orders-card td { padding: 13px 20px; font-size: 13px; color: var(--text-1); border-bottom: 1px solid var(--border); white-space: nowrap; }
  .orders-card tr:last-child td { border-bottom: none; }
  .orders-card tbody tr { transition: background 0.15s; }
  .orders-card tbody tr:hover { background: var(--surface2); }
  .order-id { font-family: 'DM Mono', monospace; font-size: 12px; color: var(--text-2); }

  .table-wrap { overflow-x: auto; }

  .table-actions { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; }
  .btn-sm {
    display: flex; align-items: center; gap: 5px;
    padding: 6px 12px; border-radius: var(--radius-sm);
    background: var(--surface2); border: 1px solid var(--border);
    color: var(--text-2); font-size: 12px; font-weight: 500; font-family: 'DM Sans', sans-serif;
    cursor: pointer; transition: var(--transition); white-space: nowrap;
  }
  .btn-sm:hover { color: var(--text-1); border-color: var(--border2); background: var(--surface3); }

  /* ── STATUS BADGES ── */
  .status-txt { font-size: 11.5px; font-weight: 600; padding: 3px 10px; border-radius: 100px; letter-spacing: 0.02em; }
  .status-txt.delivered { color: var(--success); background: var(--success-dim); }
  .status-txt.completed { color: var(--accent); background: var(--accent-dim); }
  .status-txt.pending { color: var(--warn); background: var(--warn-dim); }
  .status-txt.cancelled { color: var(--danger); background: var(--danger-dim); }

  /* ── PLACEHOLDER ── */
  .placeholder-section {
    background: var(--surface); border: 1px solid var(--border);
    border-radius: var(--radius); padding: 64px 20px;
    display: flex; flex-direction: column; align-items: center; text-align: center; gap: 12px;
  }
  .placeholder-icon { font-size: 40px; color: var(--gold); opacity: 0.5; }
  .placeholder-title { font-family: 'Playfair Display', serif; font-size: 20px; color: var(--text-1); }
  .placeholder-sub { font-size: 14px; color: var(--text-2); max-width: 340px; }

  /* ── MOBILE TABLE SCROLL ── */
  @media (max-width: 700px) {
    .orders-card th, .orders-card td { padding: 11px 14px; }
    .card-header { padding: 14px 16px 12px; }
    .product-row { padding: 12px 16px; }
  }

  /* ── ANIMATIONS ── */
  @keyframes fadeSlideUp {
    from { opacity: 0; transform: translateY(14px); }
    to { opacity: 1; transform: translateY(0); }
  }
  .anim-in { animation: fadeSlideUp 0.4s cubic-bezier(.4,0,.2,1) both; }
  .anim-in:nth-child(1) { animation-delay: 0ms; }
  .anim-in:nth-child(2) { animation-delay: 60ms; }
  .anim-in:nth-child(3) { animation-delay: 120ms; }
  .anim-in:nth-child(4) { animation-delay: 180ms; }
  .anim-in:nth-child(5) { animation-delay: 220ms; }

  /* ── MOBILE BOTTOM NAV ── */
  .mobile-bottom-nav {
    display: none;
    position: fixed; bottom: 0; left: 0; right: 0; z-index: 90;
    background: var(--surface); border-top: 1px solid var(--border);
    padding: 8px 0 env(safe-area-inset-bottom, 8px);
  }
  .mobile-bottom-nav-inner { display: flex; justify-content: space-around; align-items: center; }
  .mob-nav-btn {
    display: flex; flex-direction: column; align-items: center; gap: 3px;
    background: none; border: none; cursor: pointer; padding: 6px 10px;
    color: var(--text-3); font-size: 10px; font-family: 'DM Sans', sans-serif;
    transition: var(--transition); border-radius: var(--radius-sm);
    font-weight: 500;
  }
  .mob-nav-btn i { font-size: 21px; }
  .mob-nav-btn.active { color: var(--gold); }
  .mob-nav-btn:hover { color: var(--text-1); }
  @media (max-width: 600px) {
    .mobile-bottom-nav { display: block; }
    .main { padding-bottom: 80px; }
  }
`;

// ─── Types ────────────────────────────────────────────────────────────────────
type Page =
  | "overview"
  | "products"
  | "customer"
  | "orders"
  | "shipment"
  | "store"
  | "partner"
  | "feedback"
  | "help";

// ─── Data ─────────────────────────────────────────────────────────────────────
const CHART_LABELS = ["Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const REVENUE = [8200, 9400, 11800, 10200, 13500, 14800, 18900];
const ORDERS_DATA = [5100, 6800, 8200, 7400, 9800, 11200, 15600];

const TOP_PRODUCTS = [
  {
    name: "New Balance FuelCell Men's Running Shoes",
    sales: "12,429 Sales",
    stock: "132 stocks remaining",
    available: true,
    img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=64&h=64&fit=crop",
  },
  {
    name: "Jaket Utilitas (Denim)",
    sales: "11,021 Sales",
    stock: "92 stocks remaining",
    available: true,
    img: "https://images.unsplash.com/photo-1544642899-f0d6e5f6ed6f?w=64&h=64&fit=crop",
  },
  {
    name: "605's Black Shirt Limited Edition",
    sales: "10,321 Sales",
    stock: "72 stocks remaining",
    available: true,
    img: "https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=64&h=64&fit=crop",
  },
];

const ORDERS = [
  {
    id: "#A38829KL",
    product: "Nike Sportwear",
    date: "Jan 12, 12:23 pm",
    price: "$189.00",
    payment: "Transfer",
    status: "Delivered",
  },
  {
    id: "#A73289JH",
    product: "New Balance Sneakers",
    date: "Jan 12, 08:39 am",
    price: "$210.00",
    payment: "Credit Card",
    status: "Completed",
  },
  {
    id: "#B12034PQ",
    product: "Adidas Ultraboost",
    date: "Jan 11, 03:14 pm",
    price: "$160.00",
    payment: "Transfer",
    status: "Pending",
  },
  {
    id: "#C98271MN",
    product: "Puma RS-X Sneakers",
    date: "Jan 11, 10:05 am",
    price: "$95.00",
    payment: "Credit Card",
    status: "Delivered",
  },
  {
    id: "#D45512XZ",
    product: "Jordan Air Max 1",
    date: "Jan 10, 07:50 pm",
    price: "$230.00",
    payment: "Transfer",
    status: "Cancelled",
  },
];

const CUSTOMERS = [
  {
    name: "Amara Osei",
    email: "amara@example.com",
    orders: 12,
    spent: "$1,024",
    joined: "Jan 2024",
    status: "Active",
  },
  {
    name: "Chidi Eze",
    email: "chidi@example.com",
    orders: 7,
    spent: "$680",
    joined: "Mar 2024",
    status: "Active",
  },
  {
    name: "Fatima Bello",
    email: "fatima@example.com",
    orders: 3,
    spent: "$135",
    joined: "Apr 2024",
    status: "Inactive",
  },
  {
    name: "Kofi Mensah",
    email: "kofi@example.com",
    orders: 9,
    spent: "$820",
    joined: "Feb 2024",
    status: "Active",
  },
  {
    name: "Ngozi Adeyemi",
    email: "ngozi@example.com",
    orders: 5,
    spent: "$310",
    joined: "May 2024",
    status: "Active",
  },
  {
    name: "Emeka Nwosu",
    email: "emeka@example.com",
    orders: 2,
    spent: "$90",
    joined: "May 2024",
    status: "Inactive",
  },
];

const PRODUCTS_LIST = [
  {
    name: "Wireless Earbuds",
    sku: "SKU-001",
    category: "Audio",
    price: "$89.99",
    stock: 142,
    status: "In Stock",
  },
  {
    name: "Smart Watch",
    sku: "SKU-002",
    category: "Wearables",
    price: "$199.00",
    stock: 58,
    status: "In Stock",
  },
  {
    name: "Laptop Stand",
    sku: "SKU-003",
    category: "Accessories",
    price: "$45.00",
    stock: 0,
    status: "Out of Stock",
  },
  {
    name: "USB-C Hub",
    sku: "SKU-004",
    category: "Accessories",
    price: "$62.50",
    stock: 23,
    status: "Low Stock",
  },
  {
    name: "Phone Case",
    sku: "SKU-005",
    category: "Accessories",
    price: "$24.99",
    stock: 310,
    status: "In Stock",
  },
  {
    name: "Bluetooth Speaker",
    sku: "SKU-006",
    category: "Audio",
    price: "$119.00",
    stock: 76,
    status: "In Stock",
  },
];

const SHIPMENTS = [
  {
    id: "#SHP-001",
    order: "#ORD-001",
    carrier: "DHL",
    tracking: "1Z999AA101234567",
    status: "Delivered",
    eta: "May 22",
  },
  {
    id: "#SHP-002",
    order: "#ORD-002",
    carrier: "FedEx",
    tracking: "7489234895",
    status: "In Transit",
    eta: "May 27",
  },
  {
    id: "#SHP-003",
    order: "#ORD-003",
    carrier: "UPS",
    tracking: "1Z9999999999",
    status: "In Transit",
    eta: "May 28",
  },
  {
    id: "#SHP-004",
    order: "#ORD-004",
    carrier: "DHL",
    tracking: "1Z111AA1012",
    status: "Cancelled",
    eta: "—",
  },
  {
    id: "#SHP-005",
    order: "#ORD-005",
    carrier: "FedEx",
    tracking: "3489234896",
    status: "Delivered",
    eta: "May 24",
  },
  {
    id: "#SHP-006",
    order: "#ORD-006",
    carrier: "Aramex",
    tracking: "ARX-998877",
    status: "Pending",
    eta: "May 30",
  },
];

const NAV_MAIN: { id: Page; icon: string; label: string }[] = [
  { id: "overview", icon: "ti-layout-dashboard", label: "Overview" },
  { id: "products", icon: "ti-box", label: "Products" },
  { id: "customer", icon: "ti-users", label: "Customer" },
  { id: "orders", icon: "ti-shopping-bag", label: "Orders" },
  { id: "shipment", icon: "ti-truck", label: "Shipment" },
];

const NAV_SETTINGS: { id: Page; icon: string; label: string }[] = [
  { id: "store", icon: "ti-settings", label: "Store Setting" },
  { id: "partner", icon: "ti-affiliate", label: "Platform Partner" },
  { id: "feedback", icon: "ti-message-circle", label: "Feedback" },
  { id: "help", icon: "ti-help-circle", label: "Help & Support" },
];

const MOB_NAV = NAV_MAIN.slice(0, 5);

// ─── StatusBadge ──────────────────────────────────────────────────────────────
function StatusBadge({ status }: { status: string }) {
  const cls =
    status === "Delivered"
      ? "delivered"
      : status === "Completed" || status === "In Transit"
        ? "completed"
        : status === "Pending"
          ? "pending"
          : "cancelled";
  return <span className={`status-txt ${cls}`}>{status}</span>;
}

// ─── Header ───────────────────────────────────────────────────────────────────
function Header({ onMenuClick }: { onMenuClick: () => void }) {
  const [searchFocused, setSearchFocused] = useState(false);
  return (
    <header className="topbar">
      <button
        className="menu-toggle"
        onClick={onMenuClick}
        aria-label="Toggle menu">
        <i className="ti ti-menu-2" />
      </button>
      <div className={`search-wrap${searchFocused ? " focused" : ""}`}>
        <i className="ti ti-search" />
        <input
          type="text"
          placeholder="Search products, orders..."
          onFocus={() => setSearchFocused(true)}
          onBlur={() => setSearchFocused(false)}
        />
        <span className="kbd">⌘K</span>
      </div>
      <div className="header-spacer" />
      <div className="topbar-right">
        <div className="notif-btn">
          <i className="ti ti-bell" style={{ fontSize: 17 }} />
          <div className="notif-dot" />
        </div>
        <div className="user-pill">
          <img
            className="user-avatar-img"
            src="https://i.pravatar.cc/40?img=11"
            alt="User"
          />
          <div>
            <div className="user-name">Abosede's Jewel</div>
            <div className="user-email">ajewel@gmail.com</div>
          </div>
          <i className="ti ti-chevron-down" style={{ fontSize: 13 }} />
        </div>
      </div>
    </header>
  );
}

// ─── Sidebar ─────────────────────────────────────────────────────────────────
function Sidebar({
  open,
  onClose,
  activePage,
  onNavigate,
}: {
  open: boolean;
  onClose: () => void;
  activePage: Page;
  onNavigate: (p: Page) => void;
}) {
  function handleNav(page: Page) {
    onNavigate(page);
    onClose();
  }
  return (
    <>
      <div className={`overlay${open ? " open" : ""}`} onClick={onClose} />
      <nav className={`sidebar${open ? " open" : ""}`}>
        <div className="sidebar-logo">
          <div className="logo-mark">
            <svg viewBox="0 0 24 24" fill="none" width="18" height="18">
              <rect x="3" y="3" width="9" height="9" rx="2.5" fill="white" />
              <rect x="13" y="3" width="8" height="8" rx="2" fill="white" />
              <rect x="3" y="13" width="8" height="8" rx="2" fill="white" />
              <rect
                x="13"
                y="13"
                width="8"
                height="8"
                rx="2"
                fill="rgba(0,0,0,0.4)"
              />
            </svg>
          </div>
          <span className="logo-text">Abosede's Jewel</span>
        </div>
        <div className="sidebar-scroll">
          <div className="sidebar-label">Main Menu</div>
          {NAV_MAIN.map(({ id, icon, label }) => (
            <button
              key={id}
              onClick={() => handleNav(id)}
              className={`nav-item${activePage === id ? " active" : ""}`}>
              <i className={`ti ${icon}`} />
              <span>{label}</span>
            </button>
          ))}
          <div className="sidebar-divider" />
          <div className="sidebar-label">Settings</div>
          {NAV_SETTINGS.map(({ id, icon, label }) => (
            <button
              key={id}
              onClick={() => handleNav(id)}
              className={`nav-item${activePage === id ? " active" : ""}`}>
              <i className={`ti ${icon}`} />
              <span>{label}</span>
            </button>
          ))}
        </div>
        <div className="sidebar-bottom">
          <div className="upgrade-card">
            <div className="upgrade-icon">
              <i className="ti ti-sparkles" />
            </div>
            <div className="upgrade-title">Upgrade to Pro</div>
            <div className="upgrade-desc">
              Unlock detailed analytics, reports & premium integrations.
            </div>
            <button className="upgrade-btn">Upgrade Now →</button>
          </div>
        </div>
      </nav>
    </>
  );
}

// ─── SalesChart ───────────────────────────────────────────────────────────────
function SalesChart() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const chartRef = useRef<Chart | null>(null);
  useEffect(() => {
    if (!canvasRef.current) return;
    chartRef.current?.destroy();
    chartRef.current = new Chart(canvasRef.current, {
      type: "line",
      data: {
        labels: CHART_LABELS,
        datasets: [
          {
            label: "Revenue",
            data: REVENUE,
            borderColor: "#c9a84c",
            backgroundColor: (ctx) => {
              const gradient = ctx.chart.ctx.createLinearGradient(
                0,
                0,
                0,
                ctx.chart.height,
              );
              gradient.addColorStop(0, "rgba(201,168,76,0.2)");
              gradient.addColorStop(1, "rgba(201,168,76,0)");
              return gradient;
            },
            fill: true,
            tension: 0.45,
            pointRadius: 0,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: "#c9a84c",
            borderWidth: 2,
          },
          {
            label: "Orders",
            data: ORDERS_DATA,
            borderColor: "#5b7fff",
            backgroundColor: (ctx) => {
              const gradient = ctx.chart.ctx.createLinearGradient(
                0,
                0,
                0,
                ctx.chart.height,
              );
              gradient.addColorStop(0, "rgba(91,127,255,0.15)");
              gradient.addColorStop(1, "rgba(91,127,255,0)");
              return gradient;
            },
            fill: true,
            tension: 0.45,
            pointRadius: 0,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: "#5b7fff",
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
            backgroundColor: "#181b22",
            titleColor: "#9e9a91",
            bodyColor: "#f0ede6",
            borderColor: "rgba(255,255,255,0.08)",
            borderWidth: 1,
            padding: 12,
            cornerRadius: 10,
            callbacks: {
              label: (ctx) =>
                ` ${ctx.dataset.label}  $${Number(ctx.raw).toLocaleString()}`,
            },
          },
        },
        scales: {
          x: {
            grid: { display: false },
            ticks: { color: "#5e5b54", font: { size: 11 } },
            border: { display: false },
          },
          y: {
            grid: { color: "rgba(255,255,255,0.04)" },
            ticks: {
              color: "#5e5b54",
              font: { size: 11 },
              callback: (v) => "$" + (Number(v) / 1000).toFixed(0) + "K",
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
            <span className="legend-dot" style={{ background: "#c9a84c" }} />
            Revenue
          </span>
          <span className="legend-label">
            <span className="legend-dot" style={{ background: "#5b7fff" }} />
            Orders
          </span>
          <button className="more-btn">
            <i className="ti ti-dots" />
          </button>
        </div>
      </div>
      <div className="chart-area">
        <canvas ref={canvasRef} />
      </div>
    </div>
  );
}

// ─── Sections ─────────────────────────────────────────────────────────────────
function OverviewSection() {
  return (
    <>
      <div className="ov-heading anim-in">
        <h1 className="ov-title">Welcome back, Blessing ✦</h1>
        <p className="ov-sub">Here's your current sales overview</p>
      </div>
      <div className="stats-row">
        {[
          {
            dark: true,
            label: "Avg. Order Value",
            icon: "ti-database",
            value: "$72.98",
            pct: "+3.16%",
            sub: "from last month",
          },
          {
            dark: false,
            label: "Total Orders",
            icon: "ti-receipt",
            value: "$2,219",
            pct: "+1.18%",
            sub: "from last month",
          },
          {
            dark: false,
            label: "Lifetime Value",
            icon: "ti-coin",
            value: "$560",
            pct: "+2.42%",
            sub: "from last month",
          },
        ].map((c, i) => (
          <div key={i} className={`stat-card${c.dark ? " dark" : ""} anim-in`}>
            <div className="stat-top">
              <div className="stat-label">{c.label}</div>
              <div className={`stat-icon-box${c.dark ? " dark-icon" : ""}`}>
                <i className={`ti ${c.icon}`} />
              </div>
            </div>
            <div className="stat-value">{c.value}</div>
            <div className="stat-change">
              <span className="change-pct up">{c.pct}</span> {c.sub}
            </div>
          </div>
        ))}
      </div>
      <div className="dash-grid anim-in">
        <SalesChart />
        <div className="products-card">
          <div className="card-header">
            <span className="card-title">Top Selling</span>
            <button className="see-all-btn">See All →</button>
          </div>
          {TOP_PRODUCTS.map((p) => (
            <div key={p.name} className="product-row">
              <img src={p.img} alt={p.name} className="product-img" />
              <div className="product-info">
                <div className="product-name">{p.name}</div>
                <div className="product-sales">{p.sales}</div>
              </div>
              <div className="product-right">
                <div
                  className={`avail-badge${p.available ? " available" : ""}`}>
                  {p.available ? "● Available" : "Out of Stock"}
                </div>
                <div className="product-stock">{p.stock}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="orders-card anim-in">
        <div className="card-header">
          <span className="card-title">Latest Orders</span>
          <div className="table-actions">
            <button className="btn-sm">
              <i className="ti ti-adjustments" style={{ fontSize: 13 }} />{" "}
              Customize
            </button>
            <button className="btn-sm">
              <i className="ti ti-filter" style={{ fontSize: 13 }} /> Filter
            </button>
            <button className="btn-sm">
              <i className="ti ti-download" style={{ fontSize: 13 }} /> Export
            </button>
          </div>
        </div>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Product</th>
                <th>Date</th>
                <th>Price</th>
                <th>Payment</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {ORDERS.map((o) => (
                <tr key={o.id}>
                  <td className="order-id">{o.id}</td>
                  <td>{o.product}</td>
                  <td style={{ color: "var(--text-2)" }}>{o.date}</td>
                  <td style={{ fontWeight: 500 }}>{o.price}</td>
                  <td>{o.payment}</td>
                  <td>
                    <StatusBadge status={o.status} />
                  </td>
                  <td>
                    <button className="more-btn">
                      <i className="ti ti-dots" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

function ProductsSection() {
  return (
    <>
      <div className="ov-heading anim-in">
        <h1 className="ov-title">Products</h1>
        <p className="ov-sub">Manage your product catalogue</p>
      </div>
      <div className="orders-card anim-in">
        <div className="card-header">
          <span className="card-title">All Products</span>
          <div className="table-actions">
            <button className="btn-sm">
              <i className="ti ti-plus" style={{ fontSize: 13 }} /> Add Product
            </button>
            <button className="btn-sm">
              <i className="ti ti-filter" style={{ fontSize: 13 }} /> Filter
            </button>
            <button className="btn-sm">
              <i className="ti ti-download" style={{ fontSize: 13 }} /> Export
            </button>
          </div>
        </div>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>SKU</th>
                <th>Category</th>
                <th>Price</th>
                <th>Stock</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {PRODUCTS_LIST.map((p) => (
                <tr key={p.sku}>
                  <td style={{ fontWeight: 500 }}>{p.name}</td>
                  <td
                    style={{
                      color: "var(--text-2)",
                      fontFamily: "monospace",
                      fontSize: 12,
                    }}>
                    {p.sku}
                  </td>
                  <td>{p.category}</td>
                  <td>{p.price}</td>
                  <td>{p.stock}</td>
                  <td>
                    <span
                      className={`status-txt ${p.status === "In Stock" ? "delivered" : p.status === "Low Stock" ? "pending" : "cancelled"}`}>
                      {p.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

function CustomerSection() {
  return (
    <>
      <div className="ov-heading anim-in">
        <h1 className="ov-title">Customers</h1>
        <p className="ov-sub">View and manage your customer base</p>
      </div>
      <div className="stats-row">
        {[
          {
            label: "Total Customers",
            icon: "ti-users",
            value: "6",
            pct: "+4",
            sub: "this month",
            dark: false,
          },
          {
            label: "Active",
            icon: "ti-user-check",
            value: "4",
            pct: "66.7%",
            sub: "of total",
            dark: false,
          },
          {
            label: "Inactive",
            icon: "ti-user-off",
            value: "2",
            pct: "33.3%",
            sub: "of total",
            dark: true,
          },
        ].map((c, i) => (
          <div key={i} className={`stat-card${c.dark ? " dark" : ""} anim-in`}>
            <div className="stat-top">
              <div className="stat-label">{c.label}</div>
              <div className={`stat-icon-box${c.dark ? " dark-icon" : ""}`}>
                <i className={`ti ${c.icon}`} />
              </div>
            </div>
            <div className="stat-value">{c.value}</div>
            <div className="stat-change">
              <span className="change-pct up">{c.pct}</span> {c.sub}
            </div>
          </div>
        ))}
      </div>
      <div className="orders-card anim-in">
        <div className="card-header">
          <span className="card-title">All Customers</span>
          <div className="table-actions">
            <button className="btn-sm">
              <i className="ti ti-filter" style={{ fontSize: 13 }} /> Filter
            </button>
            <button className="btn-sm">
              <i className="ti ti-download" style={{ fontSize: 13 }} /> Export
            </button>
          </div>
        </div>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Orders</th>
                <th>Spent</th>
                <th>Joined</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {CUSTOMERS.map((c) => (
                <tr key={c.email}>
                  <td style={{ fontWeight: 500 }}>{c.name}</td>
                  <td style={{ color: "var(--text-2)" }}>{c.email}</td>
                  <td>{c.orders}</td>
                  <td>{c.spent}</td>
                  <td>{c.joined}</td>
                  <td>
                    <span
                      className={`status-txt ${c.status === "Active" ? "delivered" : "cancelled"}`}>
                      {c.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

function OrdersSection() {
  return (
    <>
      <div className="ov-heading anim-in">
        <h1 className="ov-title">Orders</h1>
        <p className="ov-sub">Track and manage all customer orders</p>
      </div>
      <div className="stats-row">
        {[
          {
            label: "Total Orders",
            icon: "ti-shopping-bag",
            value: "6",
            pct: "+1.18%",
            sub: "from last month",
            dark: false,
          },
          {
            label: "Completed",
            icon: "ti-check",
            value: "3",
            pct: "50%",
            sub: "completion rate",
            dark: false,
          },
          {
            label: "Pending",
            icon: "ti-clock",
            value: "2",
            pct: "↻",
            sub: "awaiting fulfilment",
            dark: true,
          },
        ].map((c, i) => (
          <div key={i} className={`stat-card${c.dark ? " dark" : ""} anim-in`}>
            <div className="stat-top">
              <div className="stat-label">{c.label}</div>
              <div className={`stat-icon-box${c.dark ? " dark-icon" : ""}`}>
                <i className={`ti ${c.icon}`} />
              </div>
            </div>
            <div className="stat-value">{c.value}</div>
            <div className="stat-change">
              <span className="change-pct up">{c.pct}</span> {c.sub}
            </div>
          </div>
        ))}
      </div>
      <div className="orders-card anim-in">
        <div className="card-header">
          <span className="card-title">All Orders</span>
          <div className="table-actions">
            <button className="btn-sm">
              <i className="ti ti-adjustments" style={{ fontSize: 13 }} />{" "}
              Customize
            </button>
            <button className="btn-sm">
              <i className="ti ti-filter" style={{ fontSize: 13 }} /> Filter
            </button>
            <button className="btn-sm">
              <i className="ti ti-download" style={{ fontSize: 13 }} /> Export
            </button>
          </div>
        </div>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Product</th>
                <th>Date</th>
                <th>Price</th>
                <th>Payment</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {ORDERS.map((o) => (
                <tr key={o.id}>
                  <td className="order-id">{o.id}</td>
                  <td>{o.product}</td>
                  <td style={{ color: "var(--text-2)" }}>{o.date}</td>
                  <td style={{ fontWeight: 500 }}>{o.price}</td>
                  <td>{o.payment}</td>
                  <td>
                    <StatusBadge status={o.status} />
                  </td>
                  <td>
                    <button className="more-btn">
                      <i className="ti ti-dots" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

function ShipmentSection() {
  return (
    <>
      <div className="ov-heading anim-in">
        <h1 className="ov-title">Shipments</h1>
        <p className="ov-sub">Monitor delivery status and tracking</p>
      </div>
      <div className="orders-card anim-in">
        <div className="card-header">
          <span className="card-title">All Shipments</span>
          <div className="table-actions">
            <button className="btn-sm">
              <i className="ti ti-filter" style={{ fontSize: 13 }} /> Filter
            </button>
            <button className="btn-sm">
              <i className="ti ti-download" style={{ fontSize: 13 }} /> Export
            </button>
          </div>
        </div>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Shipment ID</th>
                <th>Order</th>
                <th>Carrier</th>
                <th>Tracking</th>
                <th>Status</th>
                <th>ETA</th>
              </tr>
            </thead>
            <tbody>
              {SHIPMENTS.map((s) => (
                <tr key={s.id}>
                  <td>{s.id}</td>
                  <td style={{ color: "var(--text-2)" }}>{s.order}</td>
                  <td>{s.carrier}</td>
                  <td
                    style={{
                      fontFamily: "monospace",
                      fontSize: 12,
                      color: "var(--text-2)",
                    }}>
                    {s.tracking}
                  </td>
                  <td>
                    <StatusBadge status={s.status} />
                  </td>
                  <td>{s.eta}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

function PlaceholderSection({
  title,
  sub,
  icon,
}: {
  title: string;
  sub: string;
  icon: string;
}) {
  return (
    <>
      <div className="ov-heading anim-in">
        <h1 className="ov-title">{title}</h1>
        <p className="ov-sub">{sub}</p>
      </div>
      <div className="placeholder-section anim-in">
        <div className="placeholder-icon">
          <i className={`ti ${icon}`} />
        </div>
        <div className="placeholder-title">{title}</div>
        <div className="placeholder-sub">{sub}</div>
      </div>
    </>
  );
}

// ─── App ──────────────────────────────────────────────────────────────────────
export default function OverviewPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activePage, setActivePage] = useState<Page>("overview");

  const navigate = useCallback((page: Page) => {
    setActivePage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  function renderSection() {
    switch (activePage) {
      case "overview":
        return <OverviewSection />;
      case "products":
        return <ProductsSection />;
      case "customer":
        return <CustomerSection />;
      case "orders":
        return <OrdersSection />;
      case "shipment":
        return <ShipmentSection />;
      case "store":
        return (
          <PlaceholderSection
            title="Store Settings"
            sub="Configure your store preferences and details."
            icon="ti-settings"
          />
        );
      case "partner":
        return (
          <PlaceholderSection
            title="Platform Partner"
            sub="Manage partner integrations and affiliate links."
            icon="ti-affiliate"
          />
        );
      case "feedback":
        return (
          <PlaceholderSection
            title="Feedback"
            sub="Review customer feedback and product reviews."
            icon="ti-message-circle"
          />
        );
      case "help":
        return (
          <PlaceholderSection
            title="Help & Support"
            sub="Browse documentation or contact our support team."
            icon="ti-help-circle"
          />
        );
    }
  }

  return (
    <>
      <style>{STYLES}</style>
      <div className="shell">
        <Sidebar
          open={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          activePage={activePage}
          onNavigate={navigate}
        />
        <div className="page-wrapper">
          <Header onMenuClick={() => setSidebarOpen(true)} />
          <main className="main">{renderSection()}</main>
        </div>
      </div>
      {/* Mobile bottom nav */}
      <nav className="mobile-bottom-nav">
        <div className="mobile-bottom-nav-inner">
          {MOB_NAV.map(({ id, icon, label }) => (
            <button
              key={id}
              className={`mob-nav-btn${activePage === id ? " active" : ""}`}
              onClick={() => navigate(id)}>
              <i className={`ti ${icon}`} />
              {label}
            </button>
          ))}
        </div>
      </nav>
    </>
  );
}

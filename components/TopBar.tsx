"use client";

export default function Topbar({ onMenuClick }: { onMenuClick: () => void }) {
  return (
    <div className="topbar">
      <button
        className="menu-toggle"
        onClick={onMenuClick}
        aria-label="Toggle menu">
        <i className="ti ti-menu-2" />
      </button>

      <div className="search-wrap">
        <i className="ti ti-search" />
        <input type="text" placeholder="Search..." />
        <span className="kbd">⌘K</span>
      </div>

      <div className="topbar-right">
        <div className="notif-btn">
          <i
            className="ti ti-bell"
            style={{ fontSize: 17, color: "var(--text2)" }}
          />
          <div className="notif-dot" />
        </div>
        <div className="user-pill">
          <div className="user-avatar">CV</div>
          <div>
            <div className="user-name">Cooper Vaccaro</div>
            <div className="user-email">coopervacc@gmail.com</div>
          </div>
          <i
            className="ti ti-chevron-down"
            style={{ fontSize: 14, color: "var(--text3)" }}
          />
        </div>
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import clsx from "clsx";

export function Header({ onMenuClick }: { onMenuClick: () => void }) {
  const [searchFocused, setSearchFocused] = useState(false);

  return (
    <header className="topbar">
      <button
        className="menu-toggle"
        onClick={onMenuClick}
        aria-label="Toggle menu">
        <i className="ti ti-menu-2" />
      </button>

      <div className={clsx("search-wrap", searchFocused && "focused")}>
        <i className="ti ti-search" />
        <input
          type="text"
          placeholder="Search..."
          onFocus={() => setSearchFocused(true)}
          onBlur={() => setSearchFocused(false)}
        />
        <span className="kbd">⌘K</span>
      </div>

      <div className="header-spacer" />

      <div className="topbar-right">
        <div className="notif-btn">
          <i className="ti ti-bell" style={{ fontSize: 18 }} />
          <div className="notif-dot" />
        </div>
        <div className="user-pill">
          <img
            className="user-avatar-img"
            src="https://i.pravatar.cc/40?img=11"
            alt="Abosede's Jewel"
          />
          <div>
            <div className="user-name">Abosede&apos;s Jewel</div>
            <div className="user-email">ajewel77@gmail.com</div>
          </div>
          <i className="ti ti-chevron-down" style={{ fontSize: 14 }} />
        </div>
      </div>
    </header>
  );
}

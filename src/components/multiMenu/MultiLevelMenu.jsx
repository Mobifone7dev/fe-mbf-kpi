"use client";
import { useState, useRef, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";

export default function MultiLevelMenu({ menuData }) {
  const [openIndex, setOpenIndex] = useState(null);
  const [localMenuData, setLocalMenuData] = useState(menuData);
  const menuRef = useRef(null);

  const router = useRouter();
  const pathname = usePathname();

  /* ✅ Load user 1 lần khi mount */
  useEffect(() => {
    try {
      const userString = localStorage.getItem("user");
      const user = userString ? JSON.parse(userString) : null;

      if (user) {
        console.log("User:", user);
        // Nếu cần filter menu theo role thì làm ở đây
        // setLocalMenuData(...)
      }
    } catch (err) {
      console.error("Parse user error:", err);
    }
  }, []);

  /* ✅ Click ngoài menu → đóng dropdown */
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpenIndex(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <ul className="multi-level-menu" ref={menuRef}>
      {localMenuData.map((item, index) => {
        const hasChildren = item.children?.length > 0;
        const isOpen = openIndex === index;

        const isActive =
          pathname === item.link ||
          (pathname === "/report-code" && item.link === "/report") ||
          (pathname === "/" && item.link === "/report");

        return (
          <li
            key={index}
            className="menu-item"
            onClick={() => {
              if (hasChildren) {
                setOpenIndex(isOpen ? null : index);
              } else {
                setOpenIndex(null);
                router.push(item.link);
              }
            }}
          >
            <span className={`menu-title ${isActive ? "active" : ""}`}>
              {item.label}
              {hasChildren && (
                <span className={`arrow ${isOpen ? "open" : ""}`}>
                  ▼
                </span>
              )}
            </span>

            {hasChildren && isOpen && (
              <ul className="sub-menu">
                {item.children.map((child, cIdx) => (
                  <li key={cIdx}>
                    <a
                      href={child.link}
                      className={`menu-link ${
                        pathname === child.link ? "active" : ""
                      }`}
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        setOpenIndex(null);
                        router.push(child.link);
                      }}
                    >
                      {child.label}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </li>
        );
      })}
    </ul>
  );
}

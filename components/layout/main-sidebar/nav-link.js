"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import classes from "./nav-link.module.css";

export default function NavLink({ href, name }) {
  const path = usePathname();
  const customClass = path.startsWith(href) ? `nav-item p-2 ${classes.active}` : "nav-item p-2";

  return (
    <li className={customClass}>
      <Link href={href}>{name}</Link>
    </li>
  );
}

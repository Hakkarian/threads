"use client";

import { sidebarLinks } from "@/constants"
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRouter } from "next/router";

function Bottombar() {
  const pathname = usePathname();
  return (
    <section className="bottombar">
      <ul className="bottombar_container">
        {sidebarLinks.map((link) => {
          const isActive =
            (pathname.includes(link.route) && link.route.length > 1) ||
            pathname === link.route;

          return (
            <li key={link.label}>
              <Link
                href={link.route}
                className={`bottombar_link ${isActive && "bg-primary-500"}`}
              >
                <Image
                  src={link.imgURL}
                  alt={link.label}
                  width={24}
                  height={24}
                />
                <p className="text-subtle-medium text-light-1 max-sm:hidden">
                  {link.label.split(/\s+/)[0]}
                </p>
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

export default Bottombar
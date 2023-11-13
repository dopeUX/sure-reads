import React, { useLayoutEffect, useState } from "react";
import "./Navbar.css";
import { usePathname } from "next/navigation";
export interface NavbarProps {
  items?: Array<any>;
}

const Navbar: React.FC<NavbarProps> = ({ items }) => {
  let inx: number = 0;
  const pathName = usePathname();
  console.log(process.env.USER, "ppppp");

  useLayoutEffect(() => {
    const _index = items?.findIndex((x) => x.route === pathName)!;
    inx = _index !== -1 ? _index : 0;
  }, []);
  const [activeIndex, setActiveIndex] = useState<number>(inx);

  return (
    <div className="navbar">
      <ul className="navbar-list">
        {items?.map((item, index) => {
          return (
            <li
              key={item.id}
              onClick={() => {
                setActiveIndex(index);
              }}
            >
              <p className={`${activeIndex === index && "active"}`}>
                {item.title}
              </p>
              {activeIndex === index && <div className="dot"></div>}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Navbar;

export async function getServerSideProps() {
  console.log(process.env.USER, "pppppp");
}

import React, { useLayoutEffect, useState } from "react";
import "./Navbar.css";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
export interface NavbarProps {
  items?: Array<any>;
}

const Navbar: React.FC<NavbarProps> = ({ items }) => {
  let inx: number = 0;
  const pathName = usePathname();
  const [activeIndex, setActiveIndex] = useState<number>();

  useLayoutEffect(() => {
    const _index = items?.findIndex((x) => x.route === pathName)!;
    inx = _index !== -1 ? _index : 0;
    setActiveIndex(inx);
  }, []);
  const router = useRouter();
  return (
    <div className="navbar">
      <ul className="navbar-list">
        {items?.map((item, index) => {
          return (
            <li
              key={item.id}
              onClick={() => {
                setActiveIndex(index);
                router.push(item.route);
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

}

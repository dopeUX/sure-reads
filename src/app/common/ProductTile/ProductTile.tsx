import Image from "next/image";
import React from "react";
import "./ProductTiles.css";

export interface ProductTileProps {
  children?: React.ReactNode;
  image: string;
  title: string;
  author?: string;
}

const ProductTile: React.FC<ProductTileProps> = ({ image, title, author }) => {
  return (
    <div className="product-tile">
      <Image width={150} height={150} className="image" src={image} alt="" />
      <h4>{title}</h4>
    </div>
  );
};

export default ProductTile;

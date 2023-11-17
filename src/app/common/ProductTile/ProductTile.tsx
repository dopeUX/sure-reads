import Image from "next/image";
import React from "react";
import "./ProductTiles.css";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store/store";

export interface ProductTileProps {
  children?: React.ReactNode;
  image: string;
  title: string;
  author?: string;
  click:any;
}

const ProductTile: React.FC<ProductTileProps> = ({ image, title, author, click }) => {
  const showDialog = useSelector((state:RootState) => {
    return state.AppReducer.showDialog
  })
  return (
    <div className="product-tile" onClick={()=>{
      if(!showDialog) {
       click(); 
      }
    }}>
      <Image loading="lazy" width={150} height={150} className="image" src={image} alt="" />
      <h4>{title}</h4>
    </div>
  );
};

export default ProductTile;

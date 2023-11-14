"use client";
import React, { useEffect, useState } from "react";
import "./DialogLayout.component.css";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import getAllBooks from "@/app/helpers/booksService";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store/store";
import _ from "lodash";
export interface DialogLayoutProps {
  children?: React.ReactNode;
}

const DialogLayout: React.FC<DialogLayoutProps> = ({}) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const currentId = useSelector((state: RootState) => {
    return state.AppReducer.currentBookId;
  });
  const [bookItem, setBookItem] = useState<any>({});
  useEffect(() => {
    setIsLoading(true);
    getData();
  }, []);
  const getData = async () => {
    const response: any = await getAllBooks(currentId);
    console.log(response, "jjjjj");
    setBookItem(response.data);
    setIsLoading(false);
  };
  return (
    <div className="dialog-layout index-99">
      <div className="dialog-content">
        <div className="dialog-layer-wrapper">
          <div className="wrapper-content">
            {_.isEmpty(bookItem) && isLoading ? (
              <div className="skeleton-loading">
                <Skeleton count={5} width={"80%"} height={50} />
              </div>
            ) : (
              <div className="book-item-details">
                <h1>{bookItem.volumeInfo.title}</h1>
                {bookItem.volumeInfo.subtitle && (
                  <p>{bookItem.volumeInfo.subtitle}</p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DialogLayout;

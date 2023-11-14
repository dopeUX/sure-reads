"use client";
import React, { useEffect, useRef, useState } from "react";
import "./DialogLayout.component.css";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import getAllBooks from "@/app/helpers/booksService";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/store/store";
import _ from "lodash";
import Image from "next/image";
import FilledButton from "@/app/common/FilledButton/FilledButton";
import { updateDialogState } from "@/app/store/AppSlice";
export interface DialogLayoutProps {
  children?: React.ReactNode;
}

const DialogLayout: React.FC<DialogLayoutProps> = ({}) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const currentId = useSelector((state: RootState) => {
    return state.AppReducer.currentBookId;
  });
  const dispatch = useDispatch();
  const dialogRef: any = useRef();
  const wrapperContentRef:any = useRef();
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
    <div ref={dialogRef} className="dialog-layout index-99">
      <div className="dialog-content">
        <div ref={wrapperContentRef} className="dialog-layer-wrapper">
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
                <p className="authors">by {bookItem.volumeInfo.authors.join(',')}, {bookItem.volumeInfo?.publishedDate.split('-')[0]}</p>
                <p className="publication">{bookItem.volumeInfo.publisher}</p>
                <p className="categories"><span>Categories : </span>{bookItem.volumeInfo?.categories.join(',')}</p>
                <p className="categories"><span>Language : </span>{bookItem.volumeInfo?.language}</p>
                <p className="description">{bookItem.volumeInfo?.description}</p>
                <section className="img-section">
                 <Image className="image" width={100} height={100} src={bookItem.volumeInfo.imageLinks.thumbnail} alt=""/>
                 <p className={`${bookItem?.saleInfo?.saleability === 'FOR_SALE' ? 'p-green' : 'p-red'}`}>{bookItem.saleInfo.saleability === 'FOR_SALE' ? 'For sale' : 'Not for sale'}</p>
                </section>
                {
                  bookItem?.saleInfo?.saleability === 'FOR_SALE' &&           <FilledButton classN='button' title="Add To Cart" click = {()=>{
                    console.log('iiii')
                  }}/>
                }
                <div className="close-btn" onClick={() => {
                  console.log('hhhh')
                  wrapperContentRef.current.style.animation = 'slide-down cubic-bezier(0.77, 0, 0.175, 1) 1s forwards';
                  setTimeout(() => {
                    dialogRef.current.style.opacity = 0;
                    dispatch(updateDialogState(false));
                  },1000)
                }}></div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DialogLayout;

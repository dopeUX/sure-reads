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
import { useRouter } from "next/navigation";
import toast, {Toaster} from "react-hot-toast";
export interface DialogLayoutProps {
  children?: React.ReactNode;
}

const DialogLayout: React.FC<DialogLayoutProps> = ({}) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const currentId = useSelector((state: RootState) => {
    return state.AppReducer.currentBookId;
  });
  const dialogState = useSelector((state: RootState) => {
    return state.AppReducer.showDialog;
  })
  const router = useRouter()
  const dispatch = useDispatch();
  const dialogRef: any = useRef();
  const wrapperContentRef:any = useRef();
  const [bookItem, setBookItem] = useState<any>({});
  useEffect(() => {
    setIsLoading(true);
    getData();
  }, []);

  const getData = async () => {
    const response: any = await getAllBooks({},'',undefined, currentId);
    setBookItem(response.data);
    setIsLoading(false);
  };

  const closeDialog = () => {
    if(dialogState) {
    wrapperContentRef.current.style.animation = 'slide-down cubic-bezier(0.77, 0, 0.175, 1) 1s forwards';
    setTimeout(() => {
      dialogRef.current.style.opacity = 0;
      setTimeout(() => {
        dispatch(updateDialogState(false));
      }, 500)
    },1000)
   }
  }
  return (
    <div ref={dialogRef} className="dialog-layout">
      <div className="dialog-content">
      <div className="close-btn" onClick={() => {
            closeDialog();
        }}></div>
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
                {bookItem.volumeInfo?.authors && <p className="authors">by {bookItem.volumeInfo.authors.join(', ')}, {bookItem.volumeInfo?.publishedDate && bookItem.volumeInfo?.publishedDate.split('-')[0]}</p>}
                {bookItem.volumeInfo?.publisher && <p className="publication">{bookItem.volumeInfo.publisher}</p>}
                {bookItem.volumeInfo?.categories && <p className="categories"><span>Categories : </span>{bookItem.volumeInfo?.categories.join(',')}</p>}
                {bookItem.volumeInfo?.pageCount && <p className="categories"><span>Pages: </span>{bookItem.volumeInfo.pageCount}</p>}
                {bookItem.volumeInfo?.language && <p className="categories"><span>Language : </span>{bookItem.volumeInfo?.language}</p>}
                {bookItem.volumeInfo?.description && <p className="description">{bookItem.volumeInfo?.description}</p>}
                {bookItem.accessInfo?.pdf?.isAvailable && (<section className="pdf-section">
                    <h4>Pdf is available for this book</h4>
                    <div>
                      {/* <button>Download Pdf</button> */}
                      <button className="read-now" onClick={() => {
                        window.open(`${bookItem.accessInfo.webReaderLink}`, '_blank');
                      }}>Read now</button>
                    </div>
                </section>)}
                <section className="img-section">
                 <Image loading="lazy" className="image" width={100} height={100} src={bookItem.volumeInfo.imageLinks.thumbnail} alt=""/>
                 <p className={`${bookItem?.saleInfo?.saleability === 'FOR_SALE' ? 'p-green' : 'p-red'}`}>{bookItem.saleInfo.saleability === 'FOR_SALE' ? `${bookItem.saleInfo.listPrice.amount} INR` : 'Not for sale'}</p>
                </section>
                {
                  bookItem?.saleInfo?.saleability === 'FOR_SALE' &&          
                   <FilledButton classN='button' title="Add To Cart" click = {()=>{
                      const isLoggedIn = Boolean(localStorage.getItem('isLoggedIn'));
                      if(isLoggedIn) {
                         const items:any = localStorage.getItem('cartItems');
                         let it= [];
                         let isItemAlready = false;
                         if(items) {
                          it = JSON.parse(items);
                        }
                         const item = it.find((x:any) => x.id == bookItem.id)
                         if(item) {
                           toast.error('Book already in cart!')
                         } else {
                           it.unshift({id:bookItem.id, quantity:1});
                           localStorage.setItem('cartItems', JSON.stringify(it));
                           toast('Saving items to your cart...');
                           setTimeout(() => {
                            toast.success('Product added to cart');
                            setTimeout(() => {
                               closeDialog();
                            },1000)
                           }, 2000)
                       }
                      } else {
                        router.push('/login')
                      }
                  }}/>
                }
 
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DialogLayout;

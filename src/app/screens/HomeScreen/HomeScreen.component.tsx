"use client";
import AppLayout from "@/app/layouts/AppLayout/AppLayout.component";
import React, { useEffect, useState } from "react";
import "./HomeScreen.component.css";
import DesktopHeader from "@/app/layouts/DesktopHeader/DesktopHeader.component";
import { RootState } from "@/app/store/store";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import heroImage from "../../../../public/assets/hero-image.svg";
import getAllBooks from "@/app/helpers/booksService";
import ProductTile from "@/app/common/ProductTile/ProductTile";
import FilledButton from "@/app/common/FilledButton/FilledButton";
import bookImage from "../../../../public/assets/bible.svg";
import { updateCurrentBookId, updateDialogState } from "@/app/store/AppSlice";

export interface HomeScreenProps {}

const HomeScreen: React.FC<HomeScreenProps> = () => {
  // const name = useSelector((state: RootState) => {
  //   return state.AppReducer.name;
  // });
  const [books, setBooks] = useState<Array<any>>([]);
  const randomWeeklyTopics = [1, 2, 3];
  const recommendedTopics = [5, 6, 7];
  useEffect(() => {
    getBooks();
  }, []);
  const dispatch = useDispatch();
  const getBooks = async () => {
    const response: any = await getAllBooks();
    console.log(response, "oooooo");
    setBooks([...response.data]);
  };
  return (
    <div className="home-screen">
      <div className="home-screen-content">
        <DesktopHeader />
        <section className="hero-section global-container">
          <Image className="hero-image" src={heroImage} alt="" />
          <div className="right-col">
            <p>
              “Love all, trust a few,Do wrong to none: be able for thine
              enemyRather in power than use; and keep thy friendUnder thy own
              life's key: be check'd for silence,But never tax'd for speech.”
            </p>
            <h4>- William Shakespeare</h4>
          </div>
        </section>
        <section className="readscape-sec global-container">
          <h2>
            Readscape: <span>Your Journey</span> into Endless Stories.
          </h2>
          <p>
            Sure Reads, where every click opens the door to a world of literary
            wonders. Immerse yourself in a curated collection of captivating
            stories, timeless classics, and undiscovered gems. Whether you're a
            seasoned reader or just starting your literary journey, our Book
            Haven is designed to cater to every book lover's dream.
          </p>
        </section>
        <section className="top-reads">
          <h3>
            <span>Weekly</span> Top Reads.
          </h3>
          <div className="tiles">
            {books.length > 0 &&
              randomWeeklyTopics.map((item: number, index: number) => {
                const it = books[item];
                return (
                  <ProductTile
                    key={index}
                    image={it.volumeInfo.imageLinks.thumbnail}
                    title={it.volumeInfo.title}
                    click={() => {
                      dispatch(updateCurrentBookId(it.id));
                      setTimeout(() => {
                        dispatch(updateDialogState(true));
                      },50)
                    }}
                  />
                );
              })}
          </div>
          <FilledButton title="Explore library" />
        </section>
        <section className="top-reads">
          <h3>
            Most <span>Recommended.</span>
          </h3>
          <div className="tiles">
            {books.length > 0 &&
              recommendedTopics.map((item: number, index: number) => {
                const it = books[item];
                return (
                  <ProductTile
                    key={index}
                    image={it.volumeInfo.imageLinks.thumbnail}
                    title={it.volumeInfo.title}
                    click={() => {
                      dispatch(updateCurrentBookId(it.id));
                      setTimeout(() => {
                        dispatch(updateDialogState(true));
                      },50)
                    }}
                  />
                );
              })}
          </div>
          <FilledButton title="Explore library" />
        </section>
        <section className="bottom-section global-container">
          <div>
            <Image className="image" src={bookImage} alt="" />
            <h2>Explore, Immerse, Read.</h2>
          </div>
          <h3>
            Find a <span>perfect</span> book for your shelf, today!
          </h3>
        </section>
      </div>
    </div>
  );
};

export default HomeScreen;

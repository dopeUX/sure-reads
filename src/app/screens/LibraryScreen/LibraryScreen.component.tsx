'use client';
import AppLayout from "@/app/layouts/AppLayout/AppLayout.component";
import DesktopHeader from "@/app/layouts/DesktopHeader/DesktopHeader.component";
import React, {useEffect, useState} from "react";
import './LibraryScreen.component.css';
import InputBox from "@/app/common/InputBox/InputBox";
import getAllBooks from "@/app/helpers/booksService";
import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css'

export interface LibraryScreenProps {
	children?: React.ReactNode;
}

const LibraryScreen:React.FC<LibraryScreenProps> = ({}) => {
	const [bookslist, setBooksList] = useState<Array<any>>();
	const [isLoading, setIsLoading] = useState(true);
	useEffect(() => {
    //    getData();
	},[]);

	const getData = async () => {
	  const response:any = await getAllBooks();
	  setBooksList([...response.data]);
	}
	return (
	  <AppLayout>
		<div className="library-screen">
		 <DesktopHeader/>
		 <div className="library-content global-container">
			<div className="left-filter-col"></div>
			<div className="right-col">
			  <InputBox holderText="search library..." classN="input"/>
              <p>search results ....</p>
			  <div className="loading-screen">
			  { isLoading && <Skeleton count={1} width={200} height={300}/> }
			  </div>
			  {/* <div className="books-tile">
				<ul className="books-list">
				   	
				</ul>
			  </div> */}
			</div>
		 </div>
		</div>
	  </AppLayout>
	)
}

export default LibraryScreen;
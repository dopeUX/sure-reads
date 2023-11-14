'use client';
import AppLayout from "@/app/layouts/AppLayout/AppLayout.component";
import DesktopHeader from "@/app/layouts/DesktopHeader/DesktopHeader.component";
import React, {useEffect, useState} from "react";
import './LibraryScreen.component.css';
import InputBox from "@/app/common/InputBox/InputBox";
import getAllBooks from "@/app/helpers/booksService";
import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css';
import Multiselect from 'multiselect-react-dropdown';
import icon from '../../../../public/assets/arrow-down.svg';
import Select from "react-select";
import ProductTile from "@/app/common/ProductTile/ProductTile";
import { useDispatch } from "react-redux";
import { updateCurrentBookId, updateDialogState } from "@/app/store/AppSlice";

export interface LibraryScreenProps {
	children?: React.ReactNode;
}

const LibraryScreen:React.FC<LibraryScreenProps> = ({}) => {
	const [booksList, setBooksList] = useState<Array<any>>();
	const [isLoading, setIsLoading] = useState(true);
	const [displayState, setDisplayState] = useState(false);
	const dispatch = useDispatch();
	useEffect(() => {
       getData();
	},[]);

	const getData = async () => {
	  const response:any = await getAllBooks();
	  setBooksList([...response.data]);
	  console.log(response, 'bbbbbb')
	  setIsLoading(false);
	}
	const options = [{name: 'Option 1', id: 1},{name: 'Option 2', id: 2}]
	const options2 = [
		{ value: "React", label: "React" },
		{ value: "Vue", label: "Vue" },
		{ value: "Angular", label: "Angular" },
		{ value: "Java", label: "Java" }
	  ];
	return (
	  <AppLayout>
		<div className="library-screen">
		 <DesktopHeader/>
		 <div className="library-content global-container">
			<div className="left-filter-col">
			<div className="dropdown-selector">
			<p>category</p>
			<Select
              options={options2}
            //   onChange={handleChange}
            //   value={skills}
              isMulti
               />
			  </div>
			  <div className="dropdown-selector">
			  <p>Price</p>
               <Select
			    placeholder=""
                options={options2}
                //   onChange={handleChange}
               //   value={skills}
               />
			  </div>
			  <div className="dropdown-selector">
			  <p>Year of release</p>
			  <div className="year">
               <Select
			    className="multiselect"
			    placeholder="From"
                options={options2}
                //   onChange={handleChange}
               //   value={skills}
               />
               <Select
			    className="multiselect"
			    placeholder="To"
                options={options2}
                //   onChange={handleChange}
               //   value={skills}
               />
			   </div>
			  </div>
			  <div className="dropdown-selector">
			  <p>Price</p>
               <Select
			    placeholder=""
                options={options2}
                //   onChange={handleChange}
               //   value={skills}
                isMulti
               />
			  </div>
			  <div className="dropdown-selector">
			  <p>Saleability</p>
               <Select
			    placeholder=""
                options={options2}
               />
			  </div>
			  <div className="dropdown-selector">
			  <p>Page Count</p>
               <Select
			    placeholder=""
                options={options2}
               />
			  </div>
			</div>
			<div className="right-col">
			  <InputBox holderText="search library..." classN="input"/>
              <p>search results ....</p>
			  { isLoading ? (<div className="skeleton-grid">
			   <Skeleton className="item" count={1} width={200} height={300}/> 
			   <Skeleton className="item" count={1} width={200} height={300}/> 
			   <Skeleton className="item" count={1} width={200} height={300}/> 
			   <Skeleton className="item" count={1} width={200} height={300}/> 
			   <Skeleton className="item" count={1} width={200} height={300}/> 
			   <Skeleton className="item" count={1} width={200} height={300}/> 
			  </div>) : (<div className="books-tile">
				<ul className="books-list">
				  {
				   booksList &&	booksList?.map((item:any, index:any) => {
					  return (
						<ProductTile image={item.volumeInfo.imageLinks?.thumbnail} 
						title={item.volumeInfo.title} click={() => {
							dispatch(updateCurrentBookId(item.id));
							setTimeout(() => {
							  dispatch(updateDialogState(true));
							},50)
						}}/>
					  )	
					})
				  }
				</ul>
			  </div>) }
			</div>
		 </div>
		</div>
	  </AppLayout>
	)
}

export default LibraryScreen;
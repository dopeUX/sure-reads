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
import { useDispatch, useSelector } from "react-redux";
import { updateCurrentBookId, updateDialogState, updateTotalBooksCount } from "@/app/store/AppSlice";
import { RootState } from "@/app/store/store";
import getAllCategories from "@/app/helpers/categoriesService";
import { pageCountOptions, pdfAvailable, saleabilityOptions, yearOptions } from "@/app/Statics/dropdownOptions";
import FilledButton from "@/app/common/FilledButton/FilledButton";

export interface LibraryScreenProps {
	children?: React.ReactNode;
}

const LibraryScreen:React.FC<LibraryScreenProps> = ({}) => {
	const [booksList, setBooksList] = useState<Array<any>>();
	const [isLoading, setIsLoading] = useState(true);
	const [displayState, setDisplayState] = useState(false);
	const [pagesCount, setPagesCount] = useState(0);
	const [isPaginationOn, setIsPagination] = useState(true);
	const dispatch = useDispatch();
	const totalBooksCount = useSelector((state:RootState) => {
		return state.AppReducer.totalBooksCount;
	})
	const [searchVal, setSearchVal] = useState('');
	const [currentPageIndex, setCurrentPageIndex] = useState(1);
	useEffect(() => {
	setIsLoading(true);	
       getData('',0);
	   getCats();
	},[]);
	const [categories, setCategories] = useState<any>([]);

	useEffect(() => {
      setPagesCount(Math.round(totalBooksCount/12));
	  console.log(totalBooksCount, 'ttttttt')
	},[totalBooksCount])

	useEffect(() => {
	  setIsLoading(true);
      getData('',currentPageIndex * 12);
	},[currentPageIndex])

	const getCats = async () => {
		setIsLoading(true);
		const response: any = await getAllCategories();
		const res = response.data.map((item: any) => {
		  return {value:item, label: item}	
		})
		setCategories([...res]);
		setIsLoading(false);
	}
	const getData = async (search: string, skip?:number) => {
	  const response:any = await getAllBooks(search,skip);
	  setBooksList([...response.data]);
	//   setPagesCount(Math.round([...response.data].length/12));
	  dispatch(updateTotalBooksCount(response.totalCount))
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
			  options={categories}
              placeholder={isLoading && 'loading...'}
            //   onChange={handleChange}
            //   value={skills}
              isMulti
               />
			  </div>
			  <div className="dropdown-selector">
			  <p>Price</p>
               <Select
			    placeholder={isLoading && 'loading...'}
                options={options2}
				isClearable
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
                options={yearOptions}
				isClearable
                //   onChange={handleChange}
               //   value={skills}
               />
               <Select
			    className="multiselect"
			    placeholder="To"
                options={yearOptions}
				isClearable
                //   onChange={handleChange}
               //   value={skills}
               />
			   </div>
			  </div>
			  <div className="dropdown-selector">
			  <p>Pdf</p>
               <Select
			    placeholder=""
                options={pdfAvailable}
				isClearable
                //   onChange={handleChange}
               //   value={skills}
               />
			  </div>
			  <div className="dropdown-selector">
			  <p>Saleability</p>
               <Select
			    placeholder=""
                options={saleabilityOptions}
               />
			  </div>
			  <div className="dropdown-selector">
			  <p>Page Count</p>
               <Select
			    placeholder=""
                options={pageCountOptions}
               />
			  </div>
			  <FilledButton classN="left-btn" title="search"/>
			</div>
			<div className="right-col">
			  <InputBox holderText="search library..." icon change={(e:any)=>{
				console.log(e.target.value, 'xxxxx')
				setSearchVal(e.target.value);
				setTimeout(() => {
					if(e.target.value===''){
						getData('',0)
						setIsPagination(true);
					} else {
						setIsPagination(false);
					  getData(e.target.value);
					}
				},1000)	
				
			  }} classN="input" value={searchVal}/>
              {searchVal && <p className="search">search results based on "{searchVal}"</p>}
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
				<div className="pages-count-sec">
				  {
				   isPaginationOn && Array(pagesCount).fill(0).map((_, index) => index + 1).map((item) => {
                      return(
						<button className={`${item===currentPageIndex && 'active'}`} onClick={()=>{
							setCurrentPageIndex(item);
						}}>{item}</button>
					  )
					})
				  }
				</div>
			  </div>) }
			</div>
		 </div>
		</div>
	  </AppLayout>
	)
}

export default LibraryScreen;
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
import _ from 'lodash';
import sortIcon from '../../../../public/assets/sort.svg';
import refreshIcon from '../../../../public/assets/refresh.svg';
import Image from "next/image";
import toast, { Toaster } from 'react-hot-toast';
export interface LibraryScreenProps {
	children?: React.ReactNode;
}

function sanitizeAdvanceFilter(advanceFilter:any) {
	let obj :any;
	Object.keys(advanceFilter).forEach((_key) => {
		if(!advanceFilter[_key]) {
		  delete advanceFilter[_key];
		} else if(
		  typeof advanceFilter[_key] && advanceFilter[_key].length===0
		) {
		  delete advanceFilter[_key]
		}
	  })
	  if(!_.isEmpty(advanceFilter)) {
		 obj = advanceFilter;
	  }
	return obj  
}

const LibraryScreen:React.FC<LibraryScreenProps> = ({}) => {
	const [booksList, setBooksList] = useState<Array<any>>([]);
	const [nonSortedList, setNonSortedList] = useState<any>([]);
	const [sortCount, setSortCount] = useState<number>(0);
	const [isLoading, setIsLoading] = useState(true);
	const [displayState, setDisplayState] = useState(false);
	const [pagesCount, setPagesCount] = useState(0);
	const [isPaginationOn, setIsPagination] = useState(true);
	const dispatch = useDispatch();
	const totalBooksCount = useSelector((state:RootState) => {
		return state.AppReducer.totalBooksCount;
	})
	const dialogState = useSelector((state:RootState) => {
		return state.AppReducer.showDialog;
	})
	const [searchVal, setSearchVal] = useState('');
	const [currentPageIndex, setCurrentPageIndex] = useState(1);
	const defaultAdvanceFilterValue = {
		categories:[],
		price:null,
		yearFrom:null,
		yearTo:null,
		pdf:null,
        saleability:null,
		pageCount:null
	}
	const [advanceFilter, setAdvanceFilter] = useState<any>({
		categories:[],
		price:null,
		yearFrom:null,
		yearTo:null,
		pdf:null,
        saleability:null,
		pageCount:null
	})
	const [advanceFilterToDisplay, setAdvanceFilterToDisplay] = useState<any>({
		categories:[],
		price:null,
		yearFrom:null,
		yearTo:null,
		pdf:null,
        saleability:null,
		pageCount:null
	})
	useEffect(() => {
	setIsLoading(true);	
       getData({},'',0);
	   getCats();
	},[]);
	const [categories, setCategories] = useState<any>([]);

	useEffect(() => {
      setPagesCount(Math.round(totalBooksCount/12));
	},[totalBooksCount])

	useEffect(() => {
	  setIsLoading(true);
      getData({},'',(currentPageIndex-1) * 12);
	},[currentPageIndex])
    
	const resetAdvanceFilter = () => {
		setAdvanceFilter({
			categories:[],
			price:null,
			yearFrom:null,
			yearTo:null,
			pdf:null,
			saleability:null,
			pageCount:null
		})
		setAdvanceFilterToDisplay({
			categories:[],
			price:null,
			yearFrom:null,
			yearTo:null,
			pdf:null,
			saleability:null,
			pageCount:null
		})
	}
	const getCats = async () => {
		setIsLoading(true);
		const response: any = await getAllCategories();
		const res = response.data.map((item: any) => {
		  return {value:item, label: item}	
		})
		setCategories([...res]);
		setIsLoading(false);
	}
	const getData = async (advanceSearch:any,search: string, skip?:number) => {
	  const response:any = await getAllBooks(advanceSearch,search,skip);
	  setBooksList([...response.data]);
	  setNonSortedList([...response.data]);
	  dispatch(updateTotalBooksCount(response.totalCount))
	  setIsLoading(false);
	}
	
	const sortBooksList = () => {
		const arr:any = [...booksList];
		if(sortCount === 0) {
	      const sorted = arr.sort((a: any, b: any) => a.volumeInfo?.pageCount - b.volumeInfo?.pageCount);
		  setBooksList([...sorted])
		  setSortCount(pre => pre+1);
		  showSortOrderToast('List sorted in ascending order with pages count')
		} else if (sortCount === 1) {
			const sorted = arr.sort((a: any, b: any) => b.volumeInfo?.pageCount - a.volumeInfo?.pageCount);
			setBooksList([...sorted])
			setSortCount(pre => pre+1);
			showSortOrderToast('List sorted in descending order with pages count')
		} else if(sortCount === 2) {
			const sorted = [...nonSortedList];
			setBooksList([...sorted])
			setSortCount(0);
	        showSortOrderToast('List sorted in its original order with pages count')
		}
	}

	const showSortOrderToast = (msg: string) => {
		toast.success(msg, {
			style: {
			  textAlign:'center',	
			  border: '1px solid #22A699',
			  padding: '16px',
			  color: '#22A699',
			},
			iconTheme: {
			  primary: '#22A699',
			  secondary: '#FFFFFF',
			},
		  });
	}
	const resetAllFilters = () => {
		setIsLoading(true);
		showSortOrderToast('All Filters Removed')
		resetAdvanceFilter();
		setSearchVal('');
		getData({},'',0);
	}
	return (
	  <AppLayout>
		<div className="library-screen">
		 <DesktopHeader/>
		 <Toaster position={`${dialogState ? 'top-center' : 'bottom-center'}`}/>
		 <div className="library-content global-container">
			<div className="left-filter-col">
			<div className="dropdown-selector">
			<p>category</p>
			<Select
			  options={categories}
			  value={advanceFilterToDisplay['categories']}
              placeholder={isLoading && 'loading...'}
              onChange={(e) =>{
				const vals = e.map((item: any) => {
				  return item.value;	
				})
				// const _val = vals.length > 0 ? vals : [] 
				setAdvanceFilter({...advanceFilter, 'categories':[...vals]})
			    setAdvanceFilterToDisplay({...advanceFilterToDisplay, 'categories':[...e]}); 
			}}
            //   value={skills}
              isMulti
               />
			  </div>
			  <div className="dropdown-selector">
			  <p>Year of release</p>
			  <div className="year">
               <Select
			    className="multiselect"
			    placeholder="From"
                options={yearOptions}
				value={advanceFilterToDisplay['yearFrom']}
				isClearable
                onChange={(e: any) => {
					const _val = e?.value ? e.value : null
					setAdvanceFilter({...advanceFilter, 'yearFrom': _val})
					setAdvanceFilterToDisplay({...advanceFilterToDisplay, 'yearFrom':e});
				}}
               />
               <Select
			    className="multiselect"
			    placeholder="To"
				value={advanceFilterToDisplay['yearTo']}
                options={yearOptions}
				isClearable
                onChange={(e: any) => {
					const _val = e?.value ? e.value : null
					setAdvanceFilter({...advanceFilter, 'yearTo': _val})
				    setAdvanceFilterToDisplay({...advanceFilterToDisplay, 'yearTo':e});
				}}
               //   value={skills}
               />
			   </div>
			  </div>
			  <div className="dropdown-selector">
			  <p>Pdf</p>
               <Select
			    placeholder=""
                options={pdfAvailable}
				value={advanceFilterToDisplay['pdf']}
				isClearable
                onChange={(e: any) => {
					const _val = e?.value ? e.value : null
					setAdvanceFilter({...advanceFilter, 'pdf': _val})
				    setAdvanceFilterToDisplay({...advanceFilterToDisplay, 'pdf':e})
				}}
               //   value={skills}
               />
			  </div>
			  <div className="dropdown-selector">
			  <p>Saleability</p>
               <Select
			    placeholder=""
                options={saleabilityOptions}
				value={advanceFilterToDisplay['saleability']}
				isClearable
				onChange={(e: any) => {
					const _val = e?.value ? e.value : null
					setAdvanceFilter({...advanceFilter, 'saleability':_val});
				    setAdvanceFilterToDisplay({...advanceFilterToDisplay, 'saleability':e});
				}}
               />
			  </div>
			  <div className="dropdown-selector">
			  <p>Page Count</p>
               <Select
			    placeholder=""
                options={pageCountOptions}
				isClearable
				value={advanceFilterToDisplay['pageCount']}
				onChange={(e: any) => {
					const _val = e?.value ? e.value : null
					setAdvanceFilter({...advanceFilter, 'pageCount':_val})
					setAdvanceFilterToDisplay({...advanceFilterToDisplay, 'pageCount':e});
				}}
               />
			  </div>
			  <FilledButton classN="left-btn" title="search" click={()=>{
				const filter = sanitizeAdvanceFilter(advanceFilter);
				if(filter) {
					setIsLoading(true);
					setSearchVal('');
					getData(advanceFilter, searchVal)
					setIsPagination(false);
				} else {
					setIsLoading(true)
					getData({}, '', 0);
					setIsPagination(true);
				}
			  }}/>
			</div>
			<div className="right-col">
			  <div className="search-box-wrapper">	
			  <InputBox holderText="search library..." icon change={(e:any)=>{
				setSearchVal(e.target.value);
				setTimeout(() => {
					if(e.target.value == "") {
						setIsLoading(true);
						getData({},'',0)
						setIsPagination(true);
					}
				},1000)	
				
			  }} classN="input" value={searchVal}/>
			  <FilledButton title="search" click={()=>{
				    resetAdvanceFilter();
                 if(searchVal===''){
					setIsLoading(true);
                 	getData({},'',0)
                 	setIsPagination(true);
                 } else {
					setIsLoading(true);
                 	setIsPagination(false);
                    getData({},searchVal);
                 }
			  }}/>
			  <Image loading="lazy" className="cart-icon" src={sortIcon} alt="" onClick={() => {
				sortBooksList()
			  }}/>
			  <Image loading="lazy" className="refresh-icon" src={refreshIcon} alt="" onClick={() => {
				if(_.isEqual(advanceFilter, defaultAdvanceFilterValue) && searchVal === '') {
				  toast.error('No Filters Applied')
				} else {
				  resetAllFilters();
				}
			  }}/>
			  </div>
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
				   isPaginationOn && Array(pagesCount+1).fill(0).map((_, index) => index + 1).map((item) => {
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
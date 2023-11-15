import { NextRequest, NextResponse } from "next/server";
import booksData from '../../Statics/booksData';
import _ from 'lodash';

export function GET(request: Request) {
  const {searchParams} = new URL(request.url)
  const id = searchParams.get('id');
  // const limit = searchParams.get('limit');
  const skip = searchParams.get('skip');
  const searchQuery = searchParams.get('search');
  let advanceFilter:any = searchParams.get('advanceFilter');
  let books = [];
  advanceFilter = JSON.parse(advanceFilter);
  console.log(advanceFilter, 'hhhh')

  if (id) {
    const bookItem = booksData.find(x => x.id.toString() === id.toString())
    return NextResponse.json({data: bookItem});  
  } else {
    if(skip) {
      let count = 0;
      let datas:Array<any> = [];
      // let len = booksData.length;
      booksData.forEach((im, index) => {
        if(index>=Number(skip) && count<12) {
          datas.push(im)
          count++;
        }
      })
     return NextResponse.json({data: datas, totalCount:booksData.length});
    }
    if(searchQuery) {
      let datas :Array<any> = [];
      booksData.forEach((im, index) => {
        if(im.volumeInfo.title.toLowerCase().includes(searchQuery.toLowerCase()) 
        || im.volumeInfo.authors.join(',').toLowerCase().includes(searchQuery.toLowerCase())
        || im.volumeInfo.publisher?.toLowerCase().includes(searchQuery.toLowerCase())) {
          datas.push(im)
        }
      })
      return NextResponse.json({data:datas, totalCount:datas.length});
    }
    if(advanceFilter) {
      console.log(advanceFilter,'hhhhhh')
      let datas:Array<any>=[]
      const objMapping:any = {
        pdf: 'accessInfo.pdf.isAvailable',
        saleability:'saleInfo.saleability',
        pageCount:'volumeInfo.pageCount',
        yearFrom:'volumeInfo.publishedDate',
        yearTo:'volumeInfo.publishedDate',
        categories:'volumeInfo.categories'
      }
      booksData.forEach((itembook:any, index: number) => {
         Object.keys(advanceFilter).forEach((item:any,index:number)=>{
            const keys = objMapping[item].split('.')
            let value:any = itembook;
            keys.forEach((_key:any) => {
               value = value[_key];
            })
            // console.log(value,itembook,keys, 'oooooo333333')
            if(value === (advanceFilter[item])){
               datas.push(itembook);
            }
         })
      })
      // console.log(datas,'mmmmmm')
      return NextResponse.json({data:datas, totalCount:datas.length});
    }
    return NextResponse.json({data:booksData, totalCount: booksData.length});
  }
}
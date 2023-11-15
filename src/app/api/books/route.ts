import { NextRequest, NextResponse } from "next/server";
import booksData from '../../Statics/booksData';

export function GET(request: Request) {
  const {searchParams} = new URL(request.url)
  const id = searchParams.get('id');
  // const limit = searchParams.get('limit');
  const skip = searchParams.get('skip');
  const searchQuery = searchParams.get('search');
  const advanceFilter:any = searchParams.get('advanceFilter');
  let books = [];

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
      booksData.forEach((item:any, index: number) => {
        if(advanceFilter.categories) {
          
        }
      })
    }
    return NextResponse.json({data:booksData, totalCount: booksData.length});
  }
}
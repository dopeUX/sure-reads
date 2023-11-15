import { NextRequest, NextResponse } from "next/server";
import booksData from '../../Statics/booksData';

export function GET(request: Request) {
  let categoriesMapp: any = {};	
  booksData.forEach((item: any) => {
	const ct = item?.volumeInfo?.categories;
	 if(ct) {
	   ct.forEach((i: any) => {
	    if(!categoriesMapp[i])	{
		 categoriesMapp[i] = true;
	   }
	  })
    }
  })
  const categories = Object.keys(categoriesMapp);
  return NextResponse.json({data:categories});
}
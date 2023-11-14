import { NextRequest, NextResponse } from "next/server";
import booksData from '../../Statics/booksData';

export function GET(request: Request) {
  const {searchParams} = new URL(request.url)
  const id = searchParams.get('id');
  // const limit = searchParams.get('limit');
  const skip = searchParams.get('skip');

  if (id) {
    const bookItem = booksData.find(x => x.id.toString() === id.toString())
    return NextResponse.json({data: bookItem});  
  } else {
    if(skip) {
      let count = 0;
      let datas:Array<any> = [];
      booksData.forEach((im, index) => {
        if(index>=Number(skip) && count<12) {
          datas.push(im)
          count++;
        }
      })
     return NextResponse.json({data: datas});
    }
    return NextResponse.json({data:booksData});
  }
}
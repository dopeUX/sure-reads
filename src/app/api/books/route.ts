import { NextRequest, NextResponse } from "next/server";
import booksData from '../../Statics/booksData';

export function GET(request: Request) {
  const {searchParams} = new URL(request.url)
  const id = searchParams.get('id');
  if (id) {
    const bookItem = booksData.find(x => x.id.toString() === id.toString())
    return NextResponse.json({data: bookItem});  
  } else {
    return NextResponse.json({data:booksData});
  }
}
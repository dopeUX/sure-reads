import { NextRequest, NextResponse } from "next/server";
import booksData from '../../statics/booksData';

export function GET(request: NextRequest) {
  return NextResponse.json({data: booksData});  
}
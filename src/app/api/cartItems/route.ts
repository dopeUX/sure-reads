import { NextRequest, NextResponse } from "next/server";
import booksData from '../../Statics/booksData';

export function GET(request: Request) {
  const {searchParams} = new URL(request.url)
  let ids:any = searchParams.get('ids');
  let dataItems:Array<any> = [];
  // const limit = searchParams.get('limit');

  if (ids) {
	ids = JSON.parse(ids)
    // ids = ids.split(','); 
	ids.forEach((_id: any) => {
	 if(_id) {	
       let item: any = booksData.find(x=>x.id === Number(_id.id));
	   item['saleInfo']['listPrice']['amount'] = Number(item?.saleInfo.listPrice?.amount) * Number(_id.quantity) ;
	   dataItems.push(item);
	 }
	})
	return NextResponse.json({data:dataItems}, {status:200});
  } else {
	return NextResponse.json({ error: 'Ids cannot be null' }, { status: 404 })
  }
}
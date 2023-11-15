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
      const objMappingOperators:any = {
        pdf:'equals',
        saleability:'equals',
        pageCount:'between',
        yearFrom:'greaterThanEqualTo',
        yearTo:'lessThanEqualTo',
        categories:'includes'
      }
      const objMapping:any = {
        pdf: 'accessInfo.pdf.isAvailable',
        saleability:'saleInfo.saleability',
        pageCount:'volumeInfo.pageCount',
        yearFrom:'volumeInfo.publishedDate',
        yearTo:'volumeInfo.publishedDate',
        categories:'volumeInfo.categories'
      }
      booksData.forEach((itembook:any, index: number) => {
         let checkPass = false;
         Object.keys(advanceFilter).forEach((item:any,index:number)=>{
            const keys = objMapping[item].split('.')
            let value:any = itembook;
            keys.forEach((_key:any) => {
               value = value[_key];
            })
            // console.log(value,itembook,keys, 'oooooo333333')
            if(objMappingOperators[item] === 'equals') {
             if(value === (advanceFilter[item])){
               checkPass = true;
             }
            } else if(objMappingOperators[item] === 'includes') {
                if(value && advanceFilter[item]) {
                  advanceFilter[item].forEach((ix:any) => {
                    value.join('').includes(ix);
                    checkPass = true;
                  });
                }
            } else if(objMappingOperators[item] === 'between') {
               const from = advanceFilter[item].split(' - ')[0];
               const to = advanceFilter[item].split(' - ')[1];
               if(value) {
                if(Number(value) >=from && Number(value)<=to) {
                  checkPass = true;
                }
              }
            } else if(objMappingOperators[item] === 'greaterThanEqualTo') {
              if(value) {
               if(Number(value.split('-')[0]) >= Number(advanceFilter[item])) {
                 checkPass = true;
               }
              }
            } else if(objMappingOperators[item] === 'lessThanEqualTo') {
              if(value) {
                if(Number(value.split('-')[0]) <= Number(advanceFilter[item])) {
                  checkPass = true;
                }
              }
            }
         })
         if(checkPass) {
           datas.push(itembook);
         }
      })
      // console.log(datas,'mmmmmm')
      return NextResponse.json({data:datas, totalCount:datas.length});
    }
    return NextResponse.json({data:booksData, totalCount: booksData.length});
  }
}
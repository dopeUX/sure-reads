import axios from "axios";
import _ from 'lodash';

const getAllBooks = async (advanceFilter: any, searchQuery?: string, skip?:number|undefined, id?: string|undefined) => {
   const url = process.env.SERVICE_URL!
   let axiosConfig:any = {}
   if(id) {
     axiosConfig = {
       id: id
     }
   }
   if(skip || skip==0) {
    axiosConfig = {
      skip:skip
    }
   }
   if(searchQuery) {
    axiosConfig = {
      search: searchQuery
    }
   }
   if(!_.isEmpty(advanceFilter)) {
    Object.keys(advanceFilter).forEach((_key) => {
      if(!advanceFilter[_key]) {
        delete advanceFilter[_key];
      } else if(
        typeof advanceFilter[_key] && advanceFilter[_key].length===0
      ) {
        delete advanceFilter[_key]
      }
    })
    axiosConfig = {
      advanceFilter: advanceFilter
    }
    if(searchQuery) {
      axiosConfig['search'] = searchQuery
    }
   }
   console.log(axiosConfig,'yyyyy33333333')
   const promise = await new Promise(async(resolve,  reject)=>{
    const res:any = await axios.get('http://localhost:3000/api/books', {params:axiosConfig});
    if(res.status===200){
     return resolve(res.data);
    }else{
     return reject('error fetching products');
    }
  });

  return promise;
}

export default getAllBooks;
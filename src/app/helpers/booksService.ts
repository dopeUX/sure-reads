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
    axiosConfig = {
      advanceFilter : JSON.stringify(advanceFilter)
    }  
    if(searchQuery) {
      axiosConfig['search'] = searchQuery
    }
   }
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
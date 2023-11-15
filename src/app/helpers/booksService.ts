import axios from "axios";

const getAllBooks = async (searchQuery?: string, skip?:number|undefined, id?: string|undefined) => {
   const url = process.env.SERVICE_URL!
   let axiosConfig = {}
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
   console.log(axiosConfig,skip,'yyyyy')
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
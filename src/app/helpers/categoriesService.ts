import axios from "axios";

const getAllCategories = async () => {
   const promise = await new Promise(async(resolve,  reject)=>{
    const res:any = await axios.get('http://localhost:3000/api/categories');
    if(res.status===200){
     return resolve(res.data);
    }else{
     return reject('error fetching products');
    }
  });

  return promise;
}

export default getAllCategories;
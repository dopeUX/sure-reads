import axios from "axios";

const getAllCategories = async () => {
  const url = process.env.SERVICE_URL!
   const promise = await new Promise(async(resolve,  reject)=>{
    const res:any = await axios.get(`${url}/categories`);
    if(res.status===200){
     return resolve(res.data);
    }else{
     return reject('error fetching products');
    }
  });

  return promise;
}

export default getAllCategories;
import axios from "axios";

const getAllCartItems = async (ids:string) => {
   const url = process.env.SERVICE_URL!
   let axiosConfig = {}
   if(ids) {
	axiosConfig = {
		ids:ids
	}
   }
   console.log(axiosConfig, 'uuuu2')
   const promise = await new Promise(async(resolve,  reject)=>{
    const res:any = await axios.get('http://localhost:3000/api/cartItems', {params:axiosConfig});
    if(res.status===200){
     return resolve(res.data);
    }else{
     return reject('error fetching products');
    }
  });

  return promise;
}

export default getAllCartItems;
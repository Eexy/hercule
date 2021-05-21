import axios from "axios"

const getUser = async (token: string): Promise<any> => {
  try{
    const {data} = await axios.get('https://api.github.com/user', {
      headers: {
        Authorization: `token ${token}`
      }
    })
    return data;
  }catch(e){
    throw new Error("Unable to get user");
  }
}

export default getUser;
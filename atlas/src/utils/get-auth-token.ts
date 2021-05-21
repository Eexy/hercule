import axios from 'axios';

const getAuthToken = async (code: string): Promise<string> => {
  const clientId = process.env.CLIENT_ID!;
  const clientSecret = process.env.CLIENT_SECRET!;
  const redirectUri = process.env.REDIRECT_URI!;

  try{
    const { data } = await axios.post(
      'https://github.com/login/oauth/access_token',
      {
        client_id: clientId,
        client_secret: clientSecret,
        redirect_uri: redirectUri,
        code,
      }
    );
    // token's form = acess_token=<token>&....
    const token = data.toString().split('&')[0].slice(13);;
    return token;
  }catch(e){
    throw new Error('Unable to get auth token');
  }
};

export default getAuthToken;

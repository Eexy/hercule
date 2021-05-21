import axios from 'axios';
import React, { ReactElement, useContext } from 'react';
import { Redirect } from 'react-router-dom';
import { UserContext } from '../../context/user-context';

const Home: React.FC = (): ReactElement => {
  const {user} = useContext(UserContext);

  if(user.token === ""){
    return <Redirect to='/login' />
  }

  const handleClick = async () => {
    try{
      const res = await axios.post('/api/project/new', {
        name: 'test project',
      }, {
        headers: {
          Authorization: `Bearer ${user.token}`
        }
      })
      console.log(res);
    }catch(e){
      console.log(e);
    }
  }

  return <div className="home">
    <button type="button" onClick={handleClick}>Create new project</button>
  </div>;
};

export default Home;

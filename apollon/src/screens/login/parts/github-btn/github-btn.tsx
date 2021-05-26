import React, { ReactElement, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { Button } from 'antd';
import { GithubOutlined } from '@ant-design/icons';

const auth = async (code: string): Promise<any> => {
  try {
    const res = await axios.post('/api/auth', {
      code,
    });
    const { data } = res;
    return data;
  } catch (e) {
    return e;
  }
};

interface GithubBtnProps {
  getAuth(user: any): void;
}

const GithubBtn: React.FC<GithubBtnProps> = ({ getAuth }): ReactElement => {
  const history = useHistory();
  const redirectUri: string = process.env.REACT_APP_REDIRECT_URI!;
  const clientId: string = process.env.REACT_APP_CLIENT_ID!;

  useEffect(() => {
    const { search } = history.location;
    if (!search.includes('?code=')) {
      return;
    }

    (async () => {
      const code = search.slice(6);
      const user = await auth(code);
      getAuth(user);
    })();
  }, []);

  return (
    <Button
      type="primary"
      icon={<GithubOutlined />}
      style={{ backgroundColor: '#141414', alignSelf: 'start' }}
    >
      <a
        style={{ paddingLeft: 8, color: 'white' }}
        href={`https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=user%20repo`}
      >
        Login with Github
      </a>
    </Button>
  );
};

export default GithubBtn;

import React, { ReactElement, useContext } from 'react';
import Title from 'antd/lib/typography/Title';
import { Redirect, useHistory } from 'react-router-dom';
import { Col, Image, Row } from 'antd';
import GithubBtn from './parts/github-btn/github-btn';
import { ClientContext } from '../../context/client-context';
import { UserContext } from '../../context/user-context';
import Screen from '../../components/screen';
import illustration from '../../assets/freelancer.svg';

const Login: React.FC = (): ReactElement => {
  const { user, setUser } = useContext(UserContext);
  const { client } = useContext(ClientContext);
  const history = useHistory();

  if (user.token !== '') {
    client.connect();
    return <Redirect to="/" />;
  }

  const getAuth = (data: any) => {
    setUser({ token: data.token, user: data.user, projects: data.projects });
    client.connect();
    history.push('/');
  };

  return (
    <Screen className="login">
      <Row style={{ height: '100%' }}>
        <Col span={12} style={{ height: '100%' }}>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              height: '100%',
              padding: 16,
            }}
          >
            <Title level={3}>Work together, work simpler</Title>
            <GithubBtn getAuth={getAuth} />
          </div>
        </Col>
        <Col
          span={12}
          style={{
            background: '#096dd9',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            padding: 8,
          }}
        >
          <Image src={illustration} preview={false} width={420} />
        </Col>
      </Row>
    </Screen>
  );
};
export default Login;

import React, {ReactElement} from 'react';
import { Image, Avatar, Row } from "antd";

interface UserProps{
  user: User;
}

const User: React.FC<UserProps> = ({user}): ReactElement => (
  <div className="user" style={{paddingBottom: 16}}>
    <Row align="middle">
      <Avatar size={32} shape="circle" src={<Image src={user.avatar} preview={false}/>}/>
      <span className="user__name" style={{paddingLeft: 16}}>{user.name}</span>
    </Row>
  </div>
)

export default User;
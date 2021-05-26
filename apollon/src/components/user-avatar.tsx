import Avatar from 'antd/lib/avatar/avatar';
import { Image } from 'antd';
import React, { ReactElement } from 'react';
import { UserOutlined } from '@ant-design/icons';

interface UserAvatarProps {
  user: User | null;
}

const UserAvatar: React.FC<UserAvatarProps> = ({ user }): ReactElement => (
  <Avatar
    shape="square"
    src={user ? <Image src={user.avatar} /> : <UserOutlined />}
  />
);
export default UserAvatar;

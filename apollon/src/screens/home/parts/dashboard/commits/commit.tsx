import React, { ReactElement } from 'react';
import { Comment } from 'antd';
import UserAvatar from '../../../../../components/shared-components/user-avatar';

interface CommitProps {
  commit: Commit;
}

const Commit: React.FC<CommitProps> = ({ commit }): ReactElement => (
  <Comment
    content={commit.message}
    author={commit.user.name}
    avatar={<UserAvatar user={commit.user} />}
  />
);

export default Commit;

import React, { ReactElement } from 'react';
import User from '../../../../../components/shared-components/user';

interface ContributorsListProps {
  contributors: User[];
}

const ContributorsList: React.FC<ContributorsListProps> = ({
  contributors,
}): ReactElement => (
  <section style={{ padding: '1rem 0' }}>
    <h2
      className="section-title"
      style={{ color: '#bfbfbf', fontSize: 16, paddingBottom: 8 }}
    >
      Contributors :
    </h2>
    <ul className="contributors-list" style={{ margin: 0, padding: 0 }}>
      {contributors.map((contributor: User) => (
        <User key={contributor.id} user={contributor} />
      ))}
    </ul>
  </section>
);

export default ContributorsList;

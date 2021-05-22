import React, { ReactElement} from 'react';
import User from '../user/user';

interface ContributorsListProps {
  contributors: User[];
}

const ContributorsList: React.FC<ContributorsListProps> = ({
  contributors,
}): ReactElement => (
  <section style={{ padding: '1rem 0' }}>
    <h3 className="section-title" style={{ color: 'white' }}>
      Contributors:{' '}
    </h3>
    <ul className="contributors-list" style={{ margin: 0, padding: 0 }}>
      {contributors.map((contributor: User) => (
        <User key={contributor.id} user={contributor} />
      ))}
    </ul>
  </section>
);

export default ContributorsList;

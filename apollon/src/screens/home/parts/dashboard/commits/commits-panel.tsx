import React, { ReactElement, useContext, useEffect, useState } from 'react';
import { ProjectContext } from '../../../../../context/project-context';
import getCommit from '../../../../../services/get-commits';
import Panel from '../../../../../components/shared-components/panel/panel';

const CommitsPanel: React.FC = (): ReactElement => {
  const { project } = useContext(ProjectContext);
  const [commits, setCommits] = useState<Commit[]>([]);

  const loadCommit = async () => {
    const newCommits = await getCommit(project.repoName, project.ownerName);

    if (newCommits) {
      setCommits(newCommits);
    }
  };

  useEffect(() => {
    if (project.id !== '') {
      loadCommit();
    }
  }, [project]);

  return (
    <Panel title="commits">
      <p>test</p>
    </Panel>
  );
};

export default CommitsPanel;

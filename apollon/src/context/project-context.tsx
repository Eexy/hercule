import React, { createContext, ReactElement, useState } from 'react';

interface IProjectContext {
  project: Project;
  setProject: React.Dispatch<React.SetStateAction<Project>>;
}

export const ProjectContext = createContext<IProjectContext>({
  project: {
    id: '',
    owner: '',
    ownerName: '',
    repoName: '',
    channelId: '',
    contributors: [],
    name: '',
    githubUrl: '',
  },
  setProject: () => {
    // update project
  },
});

interface ProjectProviderProps {
  children: React.ReactNode;
}

const ProjectProvider: React.FC<ProjectProviderProps> = ({
  children,
}): ReactElement => {
  const [project, setProject] = useState<Project>({
    id: '',
    owner: '',
    ownerName: '',
    repoName: '',
    channelId: '',
    contributors: [],
    name: '',
    githubUrl: '',
  });

  return (
    <ProjectContext.Provider value={{ project: { ...project }, setProject }}>
      {children}
    </ProjectContext.Provider>
  );
};

export default ProjectProvider;

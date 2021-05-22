import React, { createContext, ReactElement, useState } from 'react';

interface IProjectContext {
  project: IProject;
  setProject: React.Dispatch<React.SetStateAction<IProjectState>>;
}

export const ProjectContext = createContext<IProjectContext>({
  project: {
    id: '',
    owner: '',
    channelId: '',
    contributors: [],
    name: '',
  },
  setProject: () => {
    // update project
  },
});

interface ProjectProviderProps {
  children: React.ReactNode;
}

interface IProjectState {
  id: string;
  owner: string;
  contributors: string[];
  name: string;
  channelId: string;
}

const ProjectProvider: React.FC<ProjectProviderProps> = ({
  children,
}): ReactElement => {
  const [project, setProject] = useState<IProjectState>({
    id: '',
    owner: '',
    channelId: '',
    contributors: [],
    name: '',
  });

  return (
    <ProjectContext.Provider value={{project: {...project}, setProject}}>
      {children}
    </ProjectContext.Provider>
  )
};

export default ProjectProvider;

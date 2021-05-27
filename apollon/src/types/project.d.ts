interface Project {
  id: string;
  owner: string;
  ownerName: string;
  repoName: string;
  contributors: string[];
  name: string;
  channelId: string;
  githubUrl: string;
}

interface ProjectResponse {
  data: {
    ok: boolean;
    project: Project;
    err?: string;
  };
}

interface DeleteProjectResponse {
  data: {
    ok: boolean;
    err?: string;
    message: string;
  };
}

interface NewProjectForm {
  name: string;
}

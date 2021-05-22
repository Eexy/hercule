interface IProject {
  id: string;
  owner: string;
  contributors: string[];
  name: string;
  channelId: string;
}

interface ProjectForm {
  name: string;
}

interface IProject {
  id: string;
  owner: string;
  contributors: string[];
  name: string;
}

interface ProjectForm {
  name: string;
}

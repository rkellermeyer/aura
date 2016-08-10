import server from 'server';

export class ProjectProfile {
  constructor() {
  }

  activate(params) {
    if (params.projectId) {
      return server.get(`/api/project_profiles/${params.projectId}`).then(response => {
        this.profile = response.content;
      })
    }
  }
}

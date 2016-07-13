import {endpoint} from './decorators';

const PROJECT_STATUS = {
    'evaluated':                    'project_evaluated',
    'accepted':                     'project_accepted',
    'pending':                      'project_pending',
    'rejected':                     'project_rejected',
    'accepting_funds':              'project_accepting_funds',
    'accepting_mentors':            'project_accepting_mentors',
    'in need of attorney':          'project_in_need_of_attorney',
    'in need of service providers': 'project_in_need_of_service_providers',
    'patent eligible':              'project_patent_eligible',
    'copyright eligible':           'project_copyright_eligible',
    'trademark eligible':           'project_trademark_eligible',
    'qualifies for trade secret':   'project_qualifies_for_trade_secret',
    'prebuild':                     'prebuild',
    'active':                       'active',
    'archived':                     'archived'
}

@endpoint('idyuh', 'project_profiles')
export class Project {

  statusTypes = Object.keys(PROJECT_STATUS);

  configure(config) {
    config.getKey('project_profiles');
    config.findKey('project_profile');
  }

  initialize(client) {
    this.client = client;
    this.get  = (...args)=> client.get(...args).then(configureProjects);
    this.find = (...args)=> client.find(...args).then(configureProject);
  }

  create(payload) {
    return this.client.post(payload.user_id, payload);
  }

  current(id) {
    if (this._currentProject) {
      return Promise.resolve(this._currentProject);
    }
    return this.find(id).then(project => {
      this._currentProject = project;
      return this._currentProject;
    })
  }
}

function configureProject(project) {
  if (!project) return project;
  project.statuses.forEach(status => {
    project.statuses[status] = true;
  })
  return project;
}

function configureProjects(projects) {
  return projects.map(configureProject);
}

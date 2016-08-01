import {PortalState} from 'core/actions';
import channel from 'core/channel';


export class ProjectOverview {
  /**
   *   description
   */
  project:ProjectModel = null;

  activate(params) {
    channel.push(new PortalState({
      title: 'New Project'
    }))
  }
}

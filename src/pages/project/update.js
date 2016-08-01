import {PortalState} from 'core/actions';
import channel from 'core/channel';


export class ProjectUpdate {
  /**
   *   description
   */
  project:ProjectModel = null;

  activate(params) {
    channel.push(new PortalState({
      title: 'Update Project'
    }))
  }
}

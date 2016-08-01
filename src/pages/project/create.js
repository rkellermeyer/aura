import {Container, inject} from 'aurelia-dependency-injection';
import {Router} from 'aurelia-router';
import {PortalState} from 'core/actions';
import channel from 'core/channel';


@inject(Router)
export class ProjectCreate {

  category:Object = null;
  overview:String = null;
  teaser: String = null;

  constructor(router) {
    this.router = router;
  }

  canActivate(params) {
    if (parseFloat(params.id) !== Auth.user.id) {
      return false;
    }
  }

  activate() {
    channel.push(new PortalState({
      title: 'New Project'
    }))
  }

  submit() {
    let category_id = this.category.id;
    let overview    = this.overview;
    let teaser      = this.teaser;
    // let user_id     = Auth.user.id;
  }
}

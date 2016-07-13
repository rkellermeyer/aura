import {Container, inject} from 'aurelia-dependency-injection';
import {Auth} from 'services/auth';
import {Router} from 'aurelia-router';
import {Category} from 'request/idyuh-category';
import {Project} from 'request/idyuh-project';

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
    Category.instance.get().then(categories => {
      this.categories = categories;
    })
  }

  submit() {
    let category_id = this.category.id;
    let overview    = this.overview;
    let teaser      = this.teaser;
    let user_id     = Auth.user.id;

   Project.instance.create({category_id, overview, teaser, user_id}).then(responce => {
     console.log(responce);
   })
  }
}

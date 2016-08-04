import {Container, inject} from 'aurelia-dependency-injection';
import {Redirect} from 'aurelia-router';
import {User} from 'services/user';
import portal from 'app-portal';
import {Project} from 'services/project';

@inject(User, Project)
export class ProjectProfile {

  constructor(user, project) {
    this.user = user
    this.project = project;
  }

  canActivate(params, config) {
    if (!this.user.projects.selectedProject) {
      return new Redirect('#/portal/projects');
    }

    this.projectModel = this.user.projects.selectedProject;

    this.project.setModel(this.projectModel);

    portal.setConfig('portalContext', 'project');

    portal.navAction = {
      title: 'Add Field',
      method: ()=> this.project.addField()
    }

    // if (this.project.points) {
    //   this.project.points.forEach((point)=> {
    //     this.handleField(point);
    //   })
    // }
  }

  canDeactivate() {
    portal.navAction = null;
  }

  setStatus(event, project) {
    let value = event.target.value;
  }

  handleField(field) {
    const project = this.project;
    let contentRef = {};

    field.hasContent = 'content' in field;

    Object.defineProperty(field, 'contentRef', {
      get() {
        return contentRef;
      },
      set(node) {
        contentRef = node;

        node.onchange = ()=> {
          project.update();
        }

        node.onblur = ()=> {
          if (!node.value) {
            field.hasContent = false;
          }
        }
      }
    })

    field.addContent = ()=> {
      field.hasContent = true;
      field.content = '';
      const id = setTimeout(()=> {
        clearTimeout(id);
        field.contentRef.focus();
      }, 0);
    }

    field.removePoint = (point)=> {
      let index = field.points.indexOf(point);
      if (~index) {
        field.points.splice(index, 1);
      }
      project.update();
    }

    field.addPoint = ()=> {
      field.points.push(createPoint());
      project.update();
    }

    function createPoint() {
      const point = {text: ''};
      let node;
      Object.defineProperty(point, 'nodeRef', {
        set(nodeRef) {
          node = nodeRef;
          node.onchange = ()=> {
            project.update();
          }
          node.onblur = ()=> {
            if (!node.value) {
              field.removePoint(point);
            }
          }
          const id = setTimeout(()=> {
            clearTimeout(id);
            node.focus();
          }, 0);
        },
        get() {
          return node;
        }
      })
      return point;
    }
  }
}

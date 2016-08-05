import {observable} from 'aurelia-binding';
import sockets from 'sockets';
import server from 'server';

function onEventQueue(callback) {
  const id = setTimeout(()=> {
    clearTimeout(id);
    callback();
  }, 0);
}

class Project {
  @observable title;
  @observable overview;
  @observable teaser;

  setModel(model) {
    this.model    = null;
    this.fields   = [];
    this.title    = model.title;
    this.teaser   = model.teaser;
    this.overview = model.overview;

    this.model  = model;
    this.fields = model.points.map(f => new Field(f, this));
  }

  update() {
    sockets.publish('project-profile:update', this.model);
  }

  addField() {
    const url  = `/api/project_profiles/${this.model._id}/point`;
    const data = {title: 'New Field', content: '', points: []};
    return server.put(url, data).then((response)=> {
      const model = response.content;
      const field = new Field(model, this);
      this._isNewField = true;
      this.model.points.push(model);
      this.fields.push(field);
    });
  }

  removeField(field) {
    const url = `/api/project_profiles/${this.model._id}/point/${field.model._id}`;

    let index = this.fields.indexOf(field);
    if (~index) {
      this.fields.splice(index, 1);

      index = this.model.points.indexOf(field.model);

      if (~index) {
        this.model.points.splice(index, 1);
      }

      return server.delete(url).then(response => {
        this.model.archivedPoints.push(response.content);
        this.update();
      })
    }
  }

  titleChanged(value) {
    if (this.model) {
      this.model.title = value;
      this.update();
    }
  }

  teaserChanged(value) {
    if (this.model) {
      this.model.teaser = value;
      this.update();
    }
  }

  overviewChanged(value) {
    if (this.model) {
      this.model.overview = value;
      this.update();
    }
  }
}


class Field {

  @observable title;
  @observable summary;
  @observable summaryRef;
  @observable titleRef;

  constructor(model, project) {
    this.hasSummary = !!model.content;
    this.summary    = model.content;
    this.title      = model.title;
    this.project    = project;
    this.model      = model;

    this.points = model.points.map(p => {
      return new Point(p, this, project);
    })
  }

  addSummary() {
    this.summary    = '';
    this.hasSummary = true;
    onEventQueue(()=> {
      if (this.summaryRef) {
        this.summaryRef.focus();
      }
    })
  }

  removePoint(point, model) {
    let index = this.points.indexOf(point);
    if (~index) {
      this.points.splice(index, 1);
    }

    index = this.model.points.indexOf(model);

    if (~index) {
      this.model.points.splice(index, 1);
    }

    this.project.update();
  }

  addPoint() {
    const model = {text: ''};
    const point = new Point(model, this, this.project);

    this._isNewPoint = true;
    this.points.push(point);
    this.model.points.push(model);
    this.project.update();
  }

  summaryRefChanged(node) {
    if (node) {
      node.onblur = ()=> {
        if (!this.summary) {
          this.hasSummary = false;
        }
      }
    }
  }

  titleRefChanged(node) {
    if (node) {
      onEventQueue(()=> {
        if (this.project._isNewField) {
          this.project._isNewField = false;
          node.focus();
        }
      })
    }
  }

  titleChanged(value) {
    if (this.model) {
      this.model.title = value;
      this.project.update();
    }
  }

  summaryChanged(value) {
    if (this.model) {
      this.model.content = value;
      this.project.update();
    }
  }
}

class Point {

  @observable text = null;
  @observable nodeRef = null;

  constructor(model, field, project) {
    this.text    = model.text;
    this.model   = model;
    this.field   = field;
    this.project = project;
  }

  textChanged(value) {
    if (this.model) {
      this.model.text = value;
      this.project.update();
    }
  }

  nodeRefChanged(node) {
    if (node) {
      node.onblur = ()=> {
        if (!this.text) {
          this.field.removePoint(this, this.model);
        }
      }
      onEventQueue(()=> {
        if (this.field._isNewPoint) {
          this.field._isNewPoint = false;
          node.focus();
        }
      })
    }
  }
}

export { Project, Field, Point }

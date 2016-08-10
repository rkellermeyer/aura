
import server from 'server';

export class ProjectSearch {
  searchValue = '';

  constructor() {
  }

  activate() {
    return server.get('/api/projects').then(response => {
      this.projects = response.content.map(model => {
        const href = `#/investor/projects/${model._id}`;
        return {href, model}
      })
    })
  }
}


const RegExpCache = {}

export class SearchFilterValueConverter {
  toView(list, value) {
    const regexp = RegExpCache[value] = RegExpCache[value] || new RegExp(value, 'g');
    return list.filter(project => {
      let pass = false;
      pass = regexp.test(project.model.title);
      return pass;
    })
  }
}

'use strict';

// import users from './users';
const projects       = require('./projects');
const Category       = require('../../api/category/category.model');
const Status         = require('../../api/status/status.model');
const User           = require('../../api/user/user.model');
const UserProfile    = require('../../api/user-profile/user-profile.model');
const Project        = require('../../api/project/project.model');
const ProjectProfile = require('../../api/project-profile/project-profile.model');
const request        = require('request');

const PROJECT_STATUS = Status.PROJECT_STATUS;

Promise.resolve()
  .then(seedCategories)
  .then(seedStatuses)
  .then(seedUsers)
  .then(seedProjects)
  .then(report)


function report() {
    console.log({Category: Category.count()})
    console.log({Status: Status.count()})
    console.log({Project: Project.count()})
    console.log({ProjectProfile: ProjectProfile.count()})
    console.log({User: User.count()})
    console.log({UserProfile: UserProfile.count()})
}


function seedCategories() {
  return new Promise(resolve => {
    Category.find({}).remove(()=> {
      request('http://api.idyuh.com/categories', (err, response, body)=> {
        let categories = JSON.parse(response.body).categories;
        categories.forEach(category => {
          let model = new Category(category);
          model.save();
        })
        resolve();
      })
    })
  })
}

function seedStatuses() {
  return new Promise(resolve => {
    Status.find({}).remove(()=> {
      Object.keys(PROJECT_STATUS).forEach(stat => {
        let model = new Status({
          name: stat,
          key: PROJECT_STATUS[stat],
        })
        model.save();
      })

      resolve();
    })
  })
}


function seedUsers() {
  return new Promise(resolve => {
    UserProfile.find({}).remove(()=> {
      User.find({}).remove(() => {
        request('http://api.idyuh.com/users', (err, response, body)=> {
          let users = JSON.parse(response.body).users;
          users.push(defaultUser())

          users.forEach(user => {

            let profile = new UserProfile(user.user_profile);

            user.user_profile = profile._id;

            let model = new User(user);

            profile.user_id = model.id;
            profile.user = model._id;

            profile.save();
            model.save();
          })
          resolve();
        })
      });
    })
  })
}


function seedProjects() {
  return new Promise(resolve => {
    ProjectProfile.find({}).remove(()=> {
      Project.find({}).remove(()=> {
        request('http://api.idyuh.com/project_profiles', (err, response, body)=> {
          let projectProfiles = JSON.parse(response.body).project_profiles;
          let all = [];
          projectProfiles.forEach(profile => {
            let promises = [];

            let category_id = profile.category_id;
            let user_id     = profile.user_id;

            let project  = new Project(profile.project);
            let model = new ProjectProfile(profile);

            model.project   = project._id;
            project.profile = model._id;

            promises.push(
              User.find({id: user_id}).then(user => {
                model.user = user._id;
                user.projects.push(model._id);
                user.save()
                return;
              }),
              Category.find({id: category_id}).then(category => {
                model.category = category._id;
                return;
              })
            );

            project.save()
            model.save()

            all.push(Promise.all(promises));
          })

          Promise.all(all).then(()=> resolve())
        })
      })
    })
  })
}

function defaultUser() {
  return {
    id: 100,
    provider: 'local',
    role: 'admin',
    name: 'Admin',
    email: 'admin@example.com',
    password: 'admin',
    user_profile: {
          user_id: 100,
          id: 10000,
          first_name: "John",
          middle_initial: "R",
          last_name: "Doe",
          prefix: "Mr.",
          suffix: "PhD",
          bio: "UI/UX",
          created_at: "2016-06-03T19:41:17.000Z",
          updated_at: "2016-06-03T19:41:17.000Z"
      }
  }
}

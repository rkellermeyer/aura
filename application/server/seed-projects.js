const Project = require('./api/project-profile/project-profile.model');
const projectData = require('./json/project-data.json').projects;

var http = require('http')
  , fs = require('fs');

module.exports = function(user) {
  var index = 0;
  Project.find({generated: true}).remove(()=> {

    projectData.forEach(project => {
      delete project._id;
      const imageId = index++;
      const options = {
          host: 'www.google.com'
        , port: 80
        , path: 'http://lorempixel.com/640/320/technics/'+imageId
      }

      const model = new Project(project);
      model.generated = true;
      model.user  = user._id;
      user.projects.push(model._id);
      model.save()
      model.image = '/json/temp/'+imageId + '.jpg';

      const request = http.get(options, function(res){
          var imagedata = ''
          res.setEncoding('binary')

          res.on('data', function(chunk){
            imagedata += chunk
          })

          res.on('end', function() {
            fs.writeFile(__dirname + model.image, imagedata, 'binary', function(err){
                if (err) throw err
                console.log('File saved.')
            })
          })
      })
    })
  })
}

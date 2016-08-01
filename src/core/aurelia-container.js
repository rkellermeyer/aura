import {Container} from 'aurelia-dependency-injection';

Container.get           = (...args)=> Container.instance.get(...args);
Container.register      = (...args)=> Container.instance.registerInstance(...args);

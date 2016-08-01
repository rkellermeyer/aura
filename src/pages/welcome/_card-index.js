//import {computedFrom} from 'aurelia-framework';

const cards = [
  {
    title: 'dreamer',
    image: 'resources/images/dreamer.png',
    background: 'resources/images/bg-dreamer.jpg',
    text: 'Are you an idea maker, looking for a team to help jump start your project?',
  },
  {
    title: 'mentor',
    image: 'resources/images/mentor.png',
    background: 'resources/images/bg-mentor.jpg',
    text: 'Are you an experienced leader who can give direction to a creative team?',
  },
  {
    title: 'investor',
    image: 'resources/images/investor.png',
    background: 'resources/images/bg-investor.jpg',
    text: 'Are you a venture capitalist or hobby investor looking to fund the next great idea?',
  },
  {
    title: 'service provider',
    image: 'resources/images/developer.png',
    background: 'resources/images/bg-developer.jpg',
    text: 'Are you looking to help create the next big idea or add value to a project with your specialized skills?',
  }
];

export class Welcome {
  topcards = cards.slice(0, 2);
  bottomcards = cards.slice(2);
  cards = cards;
}

export class UpperValueConverter {
  toView(value) {
    return value && value.toUpperCase();
  }
}

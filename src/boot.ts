import {
  add
} from './externalApi';

function speak(message: string) {
  console.log(message);
}

speak('Ready fox! I\'m listening...');

console.debug(add(5, 2));
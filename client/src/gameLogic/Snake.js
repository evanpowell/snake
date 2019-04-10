import { upKeys, downKeys, leftKeys, rightKeys } from '../constants/directionalKeys';
import { timingSafeEqual } from 'crypto';

export class SnakeBlock {
  constructor (x, y, direction) {
    this.x = x;
    this.y =  y;
    this.direction = direction;
    this.prev = null;
    this.next = null;
  }
}

export class SnakeBlockList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  advanceHead = (direction) => {
    let x = this.head.x;
    let y = this.head.y;

    switch(direction) {
      case 'U': {
        y--;
        break;
      }
      case 'R': {
        x++;
        break;
      }
      case 'D': {
        y++;
        break;
      }
      default: {
        x--;
      }
    }

    const newHead = new SnakeBlock(x, y, direction);
    newHead.prev = this.head;
    this.head.next = newHead;
    this.head = newHead;

    this.length++;
  }

  advanceTail = () => {
    const previousTail = this.tail;

    this.tail = this.tail.next;
    this.tail.prev = null;

    this.length--;

    return previousTail;
  }

  removeHead = () => {
    this.head = this.head.prev;
    this.head.next = null;
    this.length--;
  }
}

export class Snake {
  constructor() {
    this.blocks = new SnakeBlockList();
    this.direction = 'R';
    this.nextDirection = 'R';
    this.init();
  }

  init = () => {
    this.blocks.head = new SnakeBlock(0, 15, 'R');
    this.blocks.tail = this.blocks.head;
    for (let x = 0; x < 4; x++) {
      this.blocks.advanceHead('R');
    }
  }

  handleDirectionKeyDown = ({ key }) => {
    if (upKeys[key] && this.direction !== 'D') {
      this.nextDirection = 'U';
    } else if (rightKeys[key] && this.direction !== 'L') {
      this.nextDirection = 'R';
    } else if (downKeys[key] && this.direction !== 'U') {
      this.nextDirection = 'D';
    } else if (leftKeys[key] && this.direction !== 'R') {
      this.nextDirection = 'L';
    }
  }

  updateDirection = () => {
    this.direction = this.nextDirection;
    this.nextDirection = this.direction;
  }

  advanceHead = () => {
    this.blocks.advanceHead(this.direction);
  }

  popTail = () => {
    return this.blocks.advanceTail();
  }
}

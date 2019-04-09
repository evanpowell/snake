import { Snake } from './Snake';
import { Food } from './Food';

export class GameLogic {
  contructor(props) {
    this.lengthInBlocks = 40
    this.isWall = props.isWall;
    this.fullLength = props.canvas.width;
    this.blockSize = props.canvas.width / this.lengthInBlocks - 2; // Detract 1 pixel from each side for pixel padding
    this.speedInterval = [150, 100, 50][props.speed - 1];
    this.snakeColor = props.snakeColor;
    this.foodColor = props.foodColor;
    this.ctx = props.canvas.getContext('2d');
    this.snake = null;
    this.food = null;
  }

  init = () => {
    this.snake = new Snake();
    this.renderSnakeInit();

    this.food = new Food();
    this.placeFood(true);

    // add event listener for keydown
    // initiate mainloop
  }

  renderSnakeInit = () => {
    let snakeBlock = this.snake.blocks.head;

    while(snakeBlock) {
      this.renderSnakeBlock(block);
      
      snakeBlock = snakeBlock.prev;
    }
  }

  renderSnakeBlock = (block) => {
    // render snakeblock based on its own direction and the direction of the next block
    const trueCoordinates = this.getTrueCoordinates(block);
    let width = this.blockSize;
    let height = this.blockSize;
    
    if (block.prev) {
      switch (block.direction) {
        case 'U': {
          height += 3;
          break;
        }
        case 'R': {
          width += 3;
          trueCoordinates.x -= 3;
          break;
        }
        case 'D': {
          height += 3;
          trueCoordinates.y -= 3;
          break;
        }
        default: {
          width += 3;
        }
      }
    }

    this.renderBlock(trueCoordinates.x, trueCoordinates.y, width, height, this.snakeColor);
  }

  placeFood = (isInit) => {
    let randomBlock = this.generateRandomBlockCoordinates();

    while (!isFoodPlaceable(randomBlock)) {
      randomBlock = this.generateRandomBlockCoordinates();
    }

    this.food.updateCoordinates(randomBlock);

    if (!isInit) {
      this.clearBlock(this.food.prevBlock);
    }
    
    this.renderFoodBlock(this.food.currentBlock);
  }

  isFoodPlaceable = (block) => {
    let snakeBlock = this.snake.blocks.head;

    while (snakeBlock) {
      if (areSameCoordinates(block, snakeBlock)) {
        return false;
      }

      snakeBlock = snakeBlock.prev;
    }

    return true;
  }

  areSameCoordinates = (block1, block2) => {
    return block1.x === block2.x && block1.y === block2.y;
  }

  renderFoodBlock = (block) => {
    const trueCoordinates = this.getTrueCoordinates(block);
    this.renderBlock(trueCoordinates.x, trueCoordinates.y, this.blockSize, this.blockSize, this.foodColor);
  }

  getTrueCoordinates = (block) => {
    return {
      x: block.x * blockSize + 1,
      y: block.y * blockSize + 1
    };
  }

  generateRandomBlockCoordinates = () => {
    return {
      x: Math.floor(Math.random() * (this.lengthInBlocks - 1)),
      y: Math.floor(Math.random() * (this.lengthInBlocks - 1))
    };
  }

  renderBlock = (x, y, width, height, color) => {
    this.ctx.fillStyle = color;
    this.ctx.fillRect(x, y, width, height);
  }

  clearBlock = (block) => {
    const trueCoordinates = this.getTrueCoordinates(block);
    
    // clear the block plus the surrounding pixel padding
    this.ctx.clearRect(trueCoordinates.x - 2, trueCoordinates.y - 2, this.blockSize + 4, this.blockSize + 4);
  }
}

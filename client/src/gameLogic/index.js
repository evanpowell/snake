import { Snake } from './Snake';
import { Food } from './Food';

export class GameRunner {
  constructor(config, gameOverCallBack) {
    this.lengthInBlocks = 40;
    this.isWall = config.isWall;
    this.fullLength = config.canvas.width;
    this.blockSize = (config.canvas.width / this.lengthInBlocks) - 2; // Detract 1 pixel from each side for pixel padding
    this.speedInterval = [150, 100, 50][config.speed - 1];
    this.endLoopInterval = [2300, 2000, 1700][config.speed - 1];
    this.snakeColor = config.snakeColor;
    this.foodColor = config.foodColor;
    this.textColor = config.textColor;
    this.ctx = config.canvas.getContext('2d');
    this.incScore = config.incScore;
    this.snake = null;
    this.food = null;
    this.endGameLoop = null;
    this.gameOverCallBack = gameOverCallBack;
  }

  init = () => {
    this.snake = new Snake();
    this.renderSnakeInit();

    this.food = new Food();
    this.placeFood(true);

    document.addEventListener('keydown', this.snake.handleDirectionKeyDown);

    this.runMainLoop();
  }

  runMainLoop = () => {
    this.snake.updateDirection();
    this.snake.advanceHead();

    if (!this.isWall) {
      this.moveHeadToOppositeWallConditionally();
    } else if (this.isWallCollision()) {
      this.endGame();
      return;
    }

    if (this.isSelfCollision()) {
      this.endGame();
      return;
    }

    if (this.doesSnakeEatFood()) {
      this.incScore();
      this.placeFood();
    } else {
      this.clearBlock(this.snake.popTail())
    }

    this.renderSnakeBlock(this.snake.blocks.head);
    
    setTimeout(() => {
      this.runMainLoop();
    }, this.speedInterval);
  }

  isWallCollision = () => {
    const { x, y } = this.snake.blocks.head;

    return x < 0 || x >= this.lengthInBlocks || y < 0 || y >= this.lengthInBlocks;
  }

  isSelfCollision = () => {
    const { head } =  this.snake.blocks;

    // The head can only collide with blocks it can turn to face (4 blocks from itself)
    let block = this.snake.blocks.head.prev.prev.prev.prev;

    while (block) {

      if (this.areSameCoordinates(block, head)) {
        return true;
      }

      block = block.prev;
    }

    return false;
  }

  doesSnakeEatFood = () => {
    return this.areSameCoordinates(this.snake.blocks.head, this.food.currentBlock);
  }

  moveHeadToOppositeWallConditionally = () => {
    const { head } = this.snake.blocks;

    if (head.x < 0) {
      head.x += this.lengthInBlocks;
    } else if (head.y < 0) {
      head.y += this.lengthInBlocks;
    } else if (head.x >= this.lengthInBlocks) {
      head.x -= this.lengthInBlocks;
    } else if (head.y >= this.lengthInBlocks) {
      head.y -= this.lengthInBlocks;
    }
  }

  renderSnakeInit = () => {
    let snakeBlock = this.snake.blocks.head;

    while(snakeBlock) {
      this.renderSnakeBlock(snakeBlock);
      
      snakeBlock = snakeBlock.prev;
    }
  }

  renderSnakeBlock = (block, color = this.snakeColor) => {
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

    this.renderBlock(trueCoordinates.x, trueCoordinates.y, width, height, color);
  }

  placeFood = (isInit) => {
    let randomBlock = this.generateRandomBlockCoordinates();

    while (!this.isFoodPlaceable(randomBlock)) {
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
      if (this.areSameCoordinates(block, snakeBlock)) {
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
      // add 2px to blockSize to for true blockSize (without px padding) to get true location,
      // then add 1px to each starting coordinate for px padding
      x: block.x * (this.blockSize + 2) + 1,
      y: block.y * (this.blockSize + 2) + 1
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

  endGame = () => {
    document.removeEventListener('keydown', this.snake.handleDirectionKeyDown);

    let color = this.textColor;
    let isFirstLoop = true;

    this.snake.blocks.removeHead();
    
    let interval = this.endLoopInterval / this.snake.blocks.length;
    let counter, counterLimit = Math.floor(this.snake.blocks.length / 4);
    let block = this.snake.blocks.head.prev;

    this.renderSnakeBlock(this.snake.blocks.head, color);

    this.endGameLoop = setInterval(() => {
      if (counter < counterLimit) {
        counter++;
        return;
      }

      this.renderSnakeBlock(block, color);

      if (block === this.snake.blocks.tail) {
        if (isFirstLoop) {
          this.gameOverCallBack();
          isFirstLoop = false;
        }
        block = this.snake.blocks.head;
        color = color === this.textColor ? this.snakeColor : this.textColor;
        counter = 0;
        return;
      }

      block = block.prev;
      
    }, interval);
  }

  clearEndGameLoop = () => {
    clearInterval(this.endGameLoop);
    this.ctx.clearRect(0, 0, this.fullLength, this.fullLength);
  }
}

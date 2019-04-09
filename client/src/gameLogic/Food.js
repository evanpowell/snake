class FoodBlock {
  constructor() {
    this.prevBlock = {
      x: null,
      y: null
    }

    this.currentBlock = {
      x: null,
      y: null
    }
  }

  updateCoordinates = (block) => {
    this.prevBlock = this.currentBlock;
    this.currentBlock = block;
  }
}

export default Food;

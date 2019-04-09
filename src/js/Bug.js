const bugStore = []

class Bug{
  constructor(){
    this.img = new Image();
    this.color = `#${Math.floor(Math.random() * 16777216).toString(16)}`;
    this.size = 50;
    this.posX = Math.floor(Math.random() * (gameScreen.width - this.size));
    this.posY = 0 - this.size * 2;
    this.hp = 15;
    this.str = this.hp/3;
    this.speed = 1;
  }
  draw(){
    this.posY += this.speed;
    ctx.fillStyle = this.color;
    this.img.src = 'src/img/spotted-bug.png'
    ctx.drawImage(this.img, this.posX, this.posY, this.size, this.size)
  }
}

const createBugs = () => {
  if(frames % 120 === 0){
    bugStore.push(new Bug);
  }
};

const drawBugs = () => bugStore.forEach( enemy => enemy.draw());

const clearBugs = () => bugStore.forEach(enemy => {
  if(enemy.posY === 600){
    bugStore.shift();
  }
});

const bugHit = () => {
  bugStore.forEach(enemy => {
    if(hero.heroHit(enemy)) {
      hero.hp -= enemy.str;
      hero.posY < 400 ? hero.posY += 100 : hero.posX += 100;
      if(hero.hp <= 0){
        gameOver();
      }
    }
  })
}
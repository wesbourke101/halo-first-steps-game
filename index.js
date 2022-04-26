    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = 800;
    canvas.height = 500;
    const keys =[];
    const spaceBar =[];
    const bullets =[];
    let position = 0;
    const playerSprite = new Image();
    playerSprite.src = "single_guy.png";
    const backGround  = new Image();
    backGround.src = "halo.png";
    const bulletSprite = new Image();
    bulletSprite.src = 'yeahNo.png'
    let fps, fpsInterval, startTime, now, then, elapsed;
    const player = {
        x: 200,
        y: 400,
        width: "32",
        height: "32",
        frameX: 0,
        framY: 0,
        speed: 5,
        moving: false
    };

    class chiefProjectile {
        constructor( x, y, width, height, velocity){
        this.img = bulletSprite;  
        this.x = x;
        this.y = y;
        this.width = width
        this.velocity = velocity;
        bullets.push(this)
        this.deleteBullet = 0;
        }

        draw() {
            ctx.drawImage(this.img, this.x, this.y)
        }

        update() {
                console.log(this.velocity)
            this.x = this.x + this.velocity;
            this.deleteBullet = this.deleteBullet + this.velocity;
                console.log(this.x) 
            if (this.deleteBullet > 1000) {
                delete this;
                bullets.shift();
            }


        }
    }
    
    function drawSprite(img, sX, sY, sW, sH, dX, dY, dW, dH) {
        ctx.drawImage(img, sX, sY, sW, sH, dX, dY, dW, dH);
    }


    window.addEventListener("keydown", function(e){
        keys[e.keyCode] = true;
        console.log(keys);
    })
    window.addEventListener("keyup", function(e){
        delete keys[e.keyCode];
    })
    window.addEventListener("keydown", function(e){
        spaceBar[e.keyCode] = true;
    })
    window.addEventListener("keyup", function(e){
        delete spaceBar[e.keyCode];
    })


    function movePlayer(){
        // W key
        if(keys[87] && player.y > 20) {
            player.y -= player.speed;
        }
        // D key
        if(keys[68] && player.x < 700) {
            player.x += player.speed;   
        }
        // S key
        if(keys[83] && player.y < 460) {
            player.y += player.speed;   
        }
        // A key
        if(keys[65] && player.x > 20) {
            player.x -= player.speed;   
        }
        if(spaceBar[32]){
            console.log('shoot')
            const bullet = new chiefProjectile(
                player.x + 20, 
                player.y - 3, 
                32,
                32,
                15
            )
        }
    }


    function startAnimateing(fps) {
        fpsInterval = 1000/fps;
        then = Date.now();
        startTime = then;
        animate();
    }
// ......................Main Function................
    function animate(){
        requestAnimationFrame(animate);
        
        now = Date.now();
        elapsed = now - then;
        if (elapsed > fpsInterval) {
            then = now -(elapsed % fpsInterval);
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(backGround, position, 0, canvas.width, canvas.height);
            drawSprite(playerSprite, 0, 0, player.width, player.height, player.x, player.y, player.width, player.height);
            movePlayer();
            // drawBullet(bulletSprite, 0, 0, bullet.width, bullet.height, bullet.x, bullet.y, bullet.width, bullet.height)
            bullets.forEach((bullet) => {
                bullet.draw();
                bullet.update();
            })
        }
    }
animate();
startAnimateing(30);
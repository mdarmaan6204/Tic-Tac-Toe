 const boxes = document.querySelectorAll(".box");
 const gameInfo = document.querySelector(".game-info");
 const newGameBtn = document.querySelector(".btn");


 let currPlayer;
 let gameGrid;

 const winningPos = [
    [0, 1 ,2] ,
    [3, 4, 5] ,
    [6 ,7, 8] ,
    [0 ,3, 6],
    [1 ,4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
 ];

//  Let's create the fucntion to insitalise the game
function initGame()
{
    currPlayer = "X";
    gameGrid = ["" , "" ,"" , "" , "", "" ,"" , "" , "" ];

    //  Empty the box in web page
    boxes.forEach((box , index) =>{
        box.innerText = "";
        boxes[index].style.pointerEvents ="all";
        //  Initialise the css propteties again
        box.classList = `box box${index+1}`;
    });


    newGameBtn.classList.remove("active");
    gameInfo.innerText = `Current Player - ${currPlayer}`;
}

initGame();

function swapTurn()
{
    if(currPlayer === "X")
    {
        currPlayer = "O";
    }
    else
    {
        currPlayer = "X";
    }
    gameInfo.innerText = `Current Player ${currPlayer}`;
}

function checkGameOver()
{
    let ans = "";
    // console.log("First");
    winningPos.forEach((pos) =>
    {
        // console.log(pos);
        if((gameGrid[pos[0]] !== "" && gameGrid[pos[1] !=="" && gameGrid[pos[2]]] !== "")
        && (gameGrid[pos[0]] === gameGrid[pos[1]] ) && (gameGrid[pos[1]] === gameGrid[pos[2]]) )
        {
            console.log("Done");
            if(gameGrid[pos[0]] === "X")
            {
                ans = "X";
            }
            else{
                ans = "O";
            }

            // Disable pointer events
            boxes.forEach((box) =>
            {
                box.style.pointerEvents = "none";
            })
            boxes[pos[0]].classList.add("win");
            boxes[pos[1]].classList.add("win");
            boxes[pos[2]].classList.add("win");
        }
        else
        {
            console.log("Else");
        }
    })
    


    if(ans !== "")
    {
        gameInfo.innerHTML = `Winner Player- ${ans}`;
        newGameBtn.classList.add('active');
        return;
    }
    
    let count = 0;
    gameGrid.forEach((box)=>
    {
        if(box !== "")
        count++;
    })

    if(count === 9)
    {
        gameInfo.innerText = `Game Tied`;
        newGameBtn.classList.add("active");
    }
}


function handleClick(index)
{
    if(gameGrid[index] === "")
    {
        boxes[index].innerText = currPlayer;
        gameGrid[index] = currPlayer;
        boxes[index].style.pointerEvents = "none";
        // Swapping the turn
        swapTurn();
        // Check is anyone win the game?
        checkGameOver();
    }
    
}


boxes.forEach((box , index) =>{
    box.addEventListener('click' , () =>{
        
        handleClick(index);
    })
});


newGameBtn.addEventListener('click' , initGame);




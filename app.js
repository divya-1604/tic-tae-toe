let quit=document.querySelector('#quit');
let btn=document.querySelectorAll('.btn');
const buttons=document.querySelector('.buttons');
let container=document.querySelector('.container');
let info=document.querySelector('h2');
let play=document.querySelector('#play');
let player1,player2;
let chooseBox=document.createElement('div');
let value;
let turn0=true;
quit.disabled=true;
function reset() {
    info.innerHTML="You Quit the Game,<br>click on new game to start";
    quit.disabled=true;
    btn.forEach(b => {
        b.style.backgroundColor = "white";
        b.disabled = false;
        b.innerText = "";
    });
    play.disabled = false;
    value = null;
    turn0 = true;
    if (chooseBox) {
        chooseBox.remove();
    }
}
play.addEventListener('click',()=>{
    reset();
  chooseBox.innerHTML="";
    quit.disabled=false;
    play.disabled=true;
    info.innerText="Game Has Started";
    buttons.append(info);
    // let chooseBox=document.createElement('div');
    let choice=document.createElement('p');
    choice.classList.add('text');
    choice.innerText="Choose your turn(0/X):"
    let input= document.createElement('input');
    input.setAttribute('class','inputVal');
    input.setAttribute('maxlength', '1');
    input.addEventListener('change',(e)=>{
    value=e.target.value.toUpperCase();
    if(value!='0'&& value!='X'){
       console.log("You can only enter 0 or X");
       value="";
    }
    else{
        if(value=='0'){
            player1='0';
            player2='X';
           
        }else{
            player1='X';
            player2='0';
        }
        console.log(`player1 chooses ${player1}`);
        console.log(`player2 chooses ${player2}`);
        chooseBox.remove(); 
    }
   

});
chooseBox.append(choice);
chooseBox.append(input);
container.append(chooseBox);
});

const patterns=[[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
btn.forEach((btn)=>{
    btn.addEventListener('click',()=>{
        if(!value){
           info.innerText='First choose your choice!!';
            return;
        }
            if(btn.innerText===''){
                info.innerText='Game started!!';
                if(turn0){
                    btn.innerText=player1;
                }
                else{
                    btn.innerText=player2;
                }
                turn0 = !turn0;
                btn.disabled=true;
                checkWin();
            }
         
    });
});
function disabledBoxes(){
    play.disabled = false;
    quit.disabled=true;
    for(let box of btn){
        box.disabled=true;
    }
}
function checkWin() {
    let win = false;
    patterns.forEach(pattern => {
        const [a, b, c] = pattern;
        if (btn[a].innerText && 
            btn[a].innerText === btn[b].innerText && 
            btn[a].innerText === btn[c].innerText) {
            win = true;
            btn[a].style.backgroundColor = btn[b].style.backgroundColor = btn[c].style.backgroundColor = '#F6DCAC';
            info.innerHTML=`Congratulations player ${btn[a].innerText} wins!,<br>Click on New Game to Start the game`;
            disabledBoxes();
        }
    });
    if (!win && Array.from(btn).every(button => button.innerText)) {
        info.innerText="It's a draw, Click on new game to start";
        disabledBoxes();
    }
}

quit.addEventListener('click',()=>{
    if (chooseBox) {
        chooseBox.remove();
    }
    reset();
})

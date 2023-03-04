let scores = JSON.parse(localStorage.getItem("User-Name-Score")) || [];

scores.sort(function(x,y){
    return y.score - x.score;
});

for (let i=0; i<scores.length; i++){
    let li = document.createElement("li");
    li.textContent = scores[i].Initials + " -- " + scores[i].score;

    let ol = document.getElementById("highscores");
    ol.appendChild(li);
}

document.getElementById("clear").onclick = clearScores;

function clearScores(){
    localStorage.removeItem("User-Name-Score");
    window.location.reload();
}
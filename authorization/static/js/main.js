

let x = new XMLHttpRequest();

function updateTable(json) {
    let table = document.getElementById("convTable");
    let convStates = JSON.parse(json)
    for (let i = 0, cell; cell = table.cells[i]; i++) {
        if (convStates[i].status == "active") {
            cell.style.background = "#FFAE50"
        }
        else if (convStates[i].status == "success") {
            cell.style.background = "#09AC54"
        }
        else {
            cell.style.background = "#C92A2D"
        }
    }
}

x.onload = function (){
    // updateTable(x.responseText);
}

function get_convState() {
    x.open("GET", "http://localhost:8000/api/v1/conveyor-state/", true);
    x.send(null);
}
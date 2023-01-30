document.querySelector("#leaguesubmitform").addEventListener("submit", checkSubmit);

function checkSubmit(event) {
    event.preventDefault();
    if (document.getElementById("setName").value.length > 0 && document.getElementById("yearEst").value.length > 0)
        setLeaguename();
    else
        console.log("not filled out");

    return false;
}

function setLeaguename() {
    var svgLeaguename = document.getElementById("setName").value;
    var yearEstablished = document.getElementById("yearEst").value;
    setTimeout("load_template()", 500);
}

function load_template() {
    console.log("Pass");
}
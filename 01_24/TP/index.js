function mInit() {
    ReprintData();
}

function mReset() {
    localStorage.clear();
    location.reload();
}

function Plus() {
    let num1 = parseInt(document.getElementById("number1").value);
    let num2 = parseInt(document.getElementById("number2").value);
    let res = num1 + num2;
    document.getElementById("demo").innerHTML = res;
}

function InsertDataToTable(firstName, lastName, email) {
    let table = document.getElementById("table");
    let row = table.insertRow(-1);

    let cellFirstName = row.insertCell(0);
    let cellLastName = row.insertCell(1);
    let cellEmail = row.insertCell(2);
    let cellOption = row.insertCell(-1);

    cellFirstName.innerHTML = firstName;
    cellLastName.innerHTML = lastName;
    cellEmail.innerHTML = email;

    let checkbox = document.createElement("INPUT");
    checkbox.setAttribute("type", "checkbox");
    cellOption.appendChild(checkbox);
}

function SubmitName() {
    let firstName = document.getElementById("fname").value;
    let lastName = document.getElementById("lname").value;
    let email = document.getElementById("email").value;

    InsertDataToTable(firstName, lastName, email);
}

function DeleteRow() {
    let table = document.getElementById("table");
    let tableRows = table.rows;
    let numRow = tableRows.length;
    // table.deleteRow(numRow - 1);
    for (let i = 1; i < numRow; i++) {
        let checkbox = tableRows[i].cells[3].firstChild;
        if (checkbox.checked == true) {
            table.deleteRow(i);
            i--;
            numRow--;
        }
    }
}

function SaveData() {
    let table = document.getElementById("table");
    let tableRows = table.rows;
    let numRow = tableRows.length;

    for (let i = 1; i < numRow; i++) {
        let record = { fname: "fname", lname: "lname" };
        let key = tableRows[i].cells[2].innerHTML;
        record["fname"] = tableRows[i].cells[0].innerHTML;
        record["lname"] = tableRows[i].cells[1].innerHTML;
        localStorage.setItem(key, JSON.stringify(record));
    }
}

function ReprintData() {
    for (let i = 0; i < localStorage.length; i++) {
        let key = localStorage.key(i);
        let record = JSON.parse(localStorage.getItem(key));
        InsertDataToTable(record.fname, record.lname, key);
    }
}

function mReset() {
    localStorage.clear();
    location.reload();
}
mInit();

function filterData() {
    clearTable();
    let records = filterRecordsByMonth();
    records.forEach(insertIntoJournal);

    loadDataOfTable(records);
}

function CorrigerMontant() {
    let montantReel = parseInt(document.getElementById("montantReel").value);
    localStorage.setItem("montantDisponible", parseInt(montantReel));
    loadMontant();
}

function loadDataOfTable(records) {
    loadInOfTable(calIn(records));
    loadOutOfTable(calOut(records));
    loadMontantOfTable(calMontant(records));
}

function loadInOfTable(num) {
    document.getElementById("inByMonth").innerHTML = num + " €";
}

function loadOutOfTable(num) {
    document.getElementById("outByMonth").innerHTML = num + " €";
}

function loadMontantOfTable(num) {
    document.getElementById("montantByMonth").innerHTML = num + " €";
}

function calMontant(records) {
    return calIn(records) - calOut(records);
}

function calIn(records) {
    let result = 0;
    records.forEach(record => {
        if (record.depense == "Provision") {
            result += parseInt(record.montant);
        }
    });
    return result;
}

function calOut(records) {
    let result = 0;
    records.forEach(record => {
        if (record.depense == "Dépense") {
            result += parseInt(record.montant);
        }
    });
    return result;
}

function filterRecordsByMonth() {
    let month = document.getElementById("mois").value;
    month = dateToMonth(month);

    let records = getRecords();
    let new_records = [];

    records.forEach(record => {
        if (dateToMonth(record.date) == month) {
            new_records.push(record);
        }
    });

    return new_records;
}

function dateToMonth(date) {
    return date.slice(0, 7);
}

function clearTable() {
    let old_tbody = document.getElementById("dataList")
    old_tbody.innerHTML = "";
}

function saveData() {
    let record = {
        date: document.getElementById("date").value,
        montant: parseInt(document.getElementById("montant").value),
        depense: document.getElementById("depense").value,
        beneficiaire: document.getElementById("beneficiaire").value,
        libelle: document.getElementById("libelle").value,
        justificatif: document.getElementById("justificatif").value
    }
    insertIntoJournal(record);
    saveInLocal(record);
    updateMontant(record);
}

function saveInLocal(record) {
    let records = getRecords();
    records.push(record);
    records.sort(function (a, b) { return b.date >= a.date });
    localStorage.setItem("records", JSON.stringify(records));
}

function updateMontant(record) {
    let montantDisponible = getMontantDisponible();

    if (record.depense == "Dépense") {
        montantDisponible -= parseInt(record.montant);
    } else {
        montantDisponible += parseInt(record.montant);
    }

    localStorage.setItem("montantDisponible", parseInt(montantDisponible));
    // loadMontant();
}

function mInit() {
    loadData();
    addEventListeners();
    initDatePicker();
}

function initDatePicker() {
    document.getElementById("date").valueAsDate = new Date();
    document.getElementById("mois").valueAsDate = new Date();
}

function loadData() {
    loadMontant();
    loadJournal();
}

function addEventListeners() {
    document.getElementById("montantReel").addEventListener("input", calDifference);
    window.addEventListener("storage", loadMontant);
    window.addEventListener("storage", loadJournal);
    addEventListenersToForm();
}

function addEventListenersToForm() {
    let form = document.getElementById("mForm");
    form.addEventListener("submit", event => {
        if (form.checkValidity() && document.getElementById("montant").value > 0) {
            saveData();
        } else {
            event.preventDefault();
            event.stopPropagation();
        }
        form.classList.add('was-validated');
    }, false);

    // const forms = document.querySelectorAll('.needs-validation');
    // forms.forEach(form => {
    //     form.addEventListener('submit', event => {
    //         if (!form.checkValidity()) {
    //             event.preventDefault();
    //             event.stopPropagation();
    //         }
    //         form.classList.add('was-validated');
    //     }, false);
    // });
}

function calDifference() {
    let montantReel = parseInt(document.getElementById("montantReel").value);
    let montantDisponible = getMontantDisponible();
    document.getElementById("montantDifference").value = montantDisponible - montantReel;
}

function getMontantDisponible() {
    let montantDisponible = parseInt(localStorage.getItem("montantDisponible"));
    if (!montantDisponible) {
        montantDisponible = 0;
        localStorage.setItem("montantDisponible", 0);
    }
    return montantDisponible;
}

function getRecords() {
    let records = JSON.parse(localStorage.getItem("records"));
    if (!records) {
        records = [];
        localStorage.setItem("records", JSON.stringify(records));
    }
    return records;
}

function loadMontant() {
    document.getElementById("montantDisponible").innerHTML = getMontantDisponible() + " €";
    calDifference();
}

function loadJournal() {
    let records = getRecords();
    records.forEach(insertIntoJournal);
    loadDataOfTable(records);
}

function insertIntoJournal(record) {
    let dataList = document.getElementById("dataList");
    let index = findInsertIndex(record.date);
    let newRow = dataList.insertRow(index);

    newRow.insertCell(0).innerHTML = record.date;
    newRow.insertCell(1).innerHTML = record.montant;
    newRow.insertCell(2).innerHTML = record.depense;
    newRow.insertCell(3).innerHTML = record.beneficiaire;
    newRow.insertCell(4).innerHTML = record.libelle;
    newRow.insertCell(5).innerHTML = record.justificatif;
}

function findInsertIndex(date) {
    let dataList = document.getElementById("dataList");
    let mRows = dataList.rows;
    let numRow = mRows.length;
    for (let i = 0; i < numRow; i++) {
        if (mRows[i].cells[0].innerHTML <= date) {
            return i;
        }
    }
    return -1;
}

/*
const record = {
    date:"2023-01-20", 
    montant:5000,
    depense:"Dépense",
    beneficiaire:"Murex",
    libelle:"Tax",
    justificatif:"Oui"
}

Keys for localStorage:
montantDisponible : only for montantDisponible
records : an array of record
*/
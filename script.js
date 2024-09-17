

const chemicalSupplies =JSON.parse(localStorage.getItem('chemicalSupplies')) || [
    { id: 1, chemicalName: "Ammonium Persulfate", vendor: "LG Chem", density: 3525.92, viscosity: 60.631, packaging: "Bag", packSize: "100.00 kg", unit: "kg", quantity: 6495.18 },
    { id: 2, chemicalName: "Caustic Potash", vendor: "Formosa", density: 3172.15, viscosity: 48.22, packaging: "Bag", packSize: "100.00 kg", unit: "kg", quantity: 8751.90 },
    { id: 3, chemicalName: "Dimethylaminopropylamino", vendor: "LG Chem", density: 8435.37, viscosity: 12.62, packaging: "Barrel", packSize: "75.00 L", unit: "L", quantity: 5964.61 },
    { id: 4, chemicalName: "Mono Ammonium Phosphate", vendor: "Sinopec", density: 1597.66, viscosity: 76.54, packaging: "Bag", packSize: "105.00 kg", unit: "kg", quantity: 8183.73 },
    { id: 5, chemicalName: "Ferric Nitrate", vendor: "DowDuPont", density: 364.04, viscosity: 14.90, packaging: "Bag", packSize: "105.00 kg", unit: "kg", quantity: 4154.33 },
    { id: 6, chemicalName: "n-Pentane", vendor: "Sinopec", density: 4535.26, viscosity: 66.76, packaging: "N/A", packSize: "N/A", unit: "L", quantity: 6727.34 },
    { id: 7, chemicalName: "Glycol Ether PM", vendor: "LG Chem", density: 6495.18, viscosity: 72.12, packaging: "Bag", packSize: "250.00 kg", unit: "kg", quantity: 8749.54 },
    { id: 8, chemicalName: "Ethylene Glycol", vendor: "Sinopec", density: 1112.5, viscosity: 34.78, packaging: "Drum", packSize: "200.00 L", unit: "L", quantity: 3254.10 },
    { id: 9, chemicalName: "Sulfuric Acid", vendor: "BASF", density: 1840.00, viscosity: 26.75, packaging: "Barrel", packSize: "150.00 L", unit: "L", quantity: 7529.48 },
    { id: 10, chemicalName: "Sodium Hydroxide", vendor: "Formosa", density: 2195.42, viscosity: 50.15, packaging: "Bag", packSize: "100.00 kg", unit: "kg", quantity: 6548.26 },
    { id: 11, chemicalName: "Acetic Acid", vendor: "LG Chem", density: 1050.12, viscosity: 12.63, packaging: "Barrel", packSize: "125.00 L", unit: "L", quantity: 4910.87 },
    { id: 12, chemicalName: "Hydrogen Peroxide", vendor: "DowDuPont", density: 1450.74, viscosity: 28.55, packaging: "Canister", packSize: "50.00 L", unit: "L", quantity: 8451.00 },
    { id: 13, chemicalName: "Phosphoric Acid", vendor: "Sinopec", density: 1503.33, viscosity: 65.72, packaging: "Drum", packSize: "210.00 L", unit: "L", quantity: 5542.65 },
    { id: 14, chemicalName: "Chloroform", vendor: "LG Chem", density: 1467.88, viscosity: 53.20, packaging: "Bottle", packSize: "10.00 L", unit: "L", quantity: 1247.50 },
    { id: 15, chemicalName: "Ammonia", vendor: "BASF", density: 682.40, viscosity: 8.90, packaging: "Cylinder", packSize: "15.00 L", unit: "L", quantity: 3901.73 },
    { id: 16, chemicalName: "Potassium Nitrate", vendor: "Formosa", density: 2230.55, viscosity: 44.10, packaging: "Bag", packSize: "120.00 kg", unit: "kg", quantity: 6245.12 },
    { id: 17, chemicalName: "Sodium Carbonate", vendor: "LG Chem", density: 1535.00, viscosity: 11.90, packaging: "Bag", packSize: "100.00 kg", unit: "kg", quantity: 7495.36 },
    { id: 18, chemicalName: "Toluene", vendor: "Sinopec", density: 867.30, viscosity: 40.11, packaging: "Barrel", packSize: "180.00 L", unit: "L", quantity: 5821.25 },
    { id: 19, chemicalName: "Methanol", vendor: "BASF", density: 792.00, viscosity: 24.36, packaging: "Canister", packSize: "50.00 L", unit: "L", quantity: 4132.88 },
    { id: 20, chemicalName: "Isopropyl Alcohol", vendor: "DowDuPont", density: 786.60, viscosity: 22.80, packaging: "Bottle", packSize: "25.00 L", unit: "L", quantity: 3825.19 }
  ];




let selectedRow = null;
let editingRow = null;
let currentSelectedRow = -1;
let currentSortColumn = -1;
let sortAscending = true;  

function loadTableData() {
    const tableBody = document.getElementById("tableBody");
    tableBody.innerHTML = "";
    chemicalSupplies.forEach((row, index) => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td><input type="checkbox" class="checkbox" data-index="${index}" ${selectedRow === index ? "checked" : ""}></td>
            <td>${row.id}</td>
            <td>${row.chemicalName}</td>
            <td>${row.vendor}</td>
            <td>${row.density}</td>
            <td>${row.viscosity}</td>
            <td>${row.packaging}</td>
            <td>${row.packSize}</td>
            <td>${row.unit}</td>
            <td>${row.quantity}</td>
        `;
        if (selectedRow === index) {
            tr.classList.add('selected');
        }
        tableBody.appendChild(tr);
    });

    document.querySelectorAll('.checkbox').forEach((checkbox) => {
        checkbox.addEventListener('change', handleCheckboxChange);
    });

    localStorage.setItem('chemicalSupplies', JSON.stringify(chemicalSupplies));
}

function handleCheckboxChange(event) {
    const checkbox = event.target;
    const rowIndex = parseInt(checkbox.getAttribute('data-index'));

    if (checkbox.checked) {
        selectedRow = rowIndex;
    } else {
        selectedRow = null;
    }
}

function makeRowEditable(rowIndex) {
    const row = document.querySelectorAll("tbody tr")[rowIndex];
    const cells = row.querySelectorAll('td');
    cells.forEach((cell, i) => {
        if (i > 0) {  
            const value = cell.innerText;
            cell.innerHTML = `<input type="text" value="${value}" />`;
        }
    });

    row.classList.add('selected');
    editingRow = rowIndex;
}

function saveEditedData(rowIndex) {
    const row = chemicalSupplies[rowIndex];
    const inputs = document.querySelectorAll("tbody tr")[rowIndex].querySelectorAll('input');

    row.id = inputs[1].value !== "" ? parseInt(inputs[1].value) : row.id;
    row.chemicalName = inputs[2].value !== "" ? inputs[2].value : row.chemicalName;
    row.vendor = inputs[3].value !== "" ? inputs[3].value : row.vendor;
    row.density = inputs[4].value !== "" ? parseFloat(inputs[4].value) : row.density;
    row.viscosity = inputs[5].value !== "" ? parseFloat(inputs[5].value) : row.viscosity;
    row.packaging = inputs[6].value !== "" ? inputs[6].value : row.packaging;
    row.packSize = inputs[7].value !== "" ? inputs[7].value : row.packSize;
    row.unit = inputs[8].value !== "" ? inputs[8].value : row.unit;
    row.quantity = inputs[9].value !== "" ? parseFloat(inputs[9].value) : row.quantity;

    localStorage.setItem('chemicalSupplies', JSON.stringify(chemicalSupplies));
}

function deleteSelectedRow() {
    if (selectedRow === null) return alert("Select a row to delete.");
    chemicalSupplies.splice(selectedRow, 1);
    selectedRow = null;
    loadTableData();
}

function addRow() {
    if (editingRow !== null) {
        alert("Please save the current row before adding a new one.");
        return;
    }

    const tableBody = document.getElementById("tableBody");
    const newRow = document.createElement("tr");

    newRow.innerHTML = `
     <td><input type="checkbox" class="checkbox"></td>
        <td><input type="text" value="${chemicalSupplies.length + 1}" readonly></td>
        <td><input type="text" placeholder="Chemical Name"></td>
        <td><input type="text" placeholder="Vendor"></td>
        <td><input type="number" placeholder="Density"></td>
        <td><input type="number" placeholder="Viscosity"></td>
        <td><input type="text" placeholder="Packaging"></td>
        <td><input type="number" placeholder="Pack Size"></td>
        <td><input type="text" placeholder="Unit"></td>
        <td><input type="number" placeholder="Quantity"></td>
    `;

    tableBody.appendChild(newRow);
    editingRow = newRow;
}

function moveRow(direction) {
    if (selectedRow === null) return alert("Select a row to move.");

    if (direction === "up" && selectedRow > 0) {
        [chemicalSupplies[selectedRow], chemicalSupplies[selectedRow - 1]] = [chemicalSupplies[selectedRow - 1], chemicalSupplies[selectedRow]];
        selectedRow--;
    } else if (direction === "down" && selectedRow < chemicalSupplies.length - 1) {
        [chemicalSupplies[selectedRow], chemicalSupplies[selectedRow + 1]] = [chemicalSupplies[selectedRow + 1], chemicalSupplies[selectedRow]];
        selectedRow++;
    }
    loadTableData();
}

function editSelectedRow() {
    if (selectedRow !== null) {
        makeRowEditable(selectedRow);
    } else {
        alert("Select a row to edit.");
    }
}

function saveSelectedRow() {
    if (editingRow !== null) {
        saveEditedData(editingRow);
        editingRow = null;
        loadTableData();
    } else {
        alert("No row is being edited.");
    }
}




function sortTable(columnIndex) {
    
      const sortKey = Object.keys(chemicalSupplies[0])[columnIndex];  
  
      if (currentSortColumn === columnIndex) {
          sortAscending = !sortAscending;  
      } else {
          sortAscending = true;  
      }
  
      
      chemicalSupplies.sort((a, b) => {
          const valA = a[sortKey];
          const valB = b[sortKey];
          if (valA < valB) return sortAscending ? -1 : 1;
          if (valA > valB) return sortAscending ? 1 : -1;
          return 0;
      });
  
      currentSortColumn = columnIndex;
      updateSortIcons();  
      loadTableData();
  }
  
  function updateSortIcons() {
     
      for (let i = 0; i < 9; i++) {
          document.getElementById(`sortIcon${i}`).textContent = "▲";
      }
  
      const sortIcon = document.getElementById(`sortIcon${currentSortColumn}`);
      sortIcon.textContent = sortAscending ? "▲" : "▼";
  }

function refreshTable() {
    window.location.reload();
}



document.getElementById("addRow").onclick = addRow;
document.getElementById("moveUp").onclick = () => moveRow('up');
document.getElementById("moveDown").onclick = () => moveRow('down');
document.getElementById("deleteRow").onclick = deleteSelectedRow;
document.getElementById("editRow").onclick = editSelectedRow;
document.getElementById("save").onclick = saveSelectedRow;
document.getElementById("refresh").onclick = refreshTable;


loadTableData();

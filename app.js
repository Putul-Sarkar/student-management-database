// let data = [];
let data = JSON.parse(localStorage.getItem('studentData')) || [];
    
function addStudent() {
    const name = document.getElementById('name').value;
    const grade = document.getElementById('grade').value;

    if (name === "" || grade === "") {
        alert('All fields are required');
        return;
    }

    const studentid = data.length + 1;
    data.push({
        id: studentid,
        name: name,
        grade: grade
    });
    saveData();
    clearForm();
    displayData();
}

function clearForm() {
    document.getElementById('name').value = "";
    document.getElementById('grade').value = "";
}

function displayData() {
    const tbody = document.getElementById('tbody');
    tbody.innerHTML = "";

    data.forEach((student, index) => {
        const row = tbody.insertRow();
        const idcell = row.insertCell(0);
        const namecell = row.insertCell(1);
        const gradecell = row.insertCell(2);
        const actioncell = row.insertCell(3);

        idcell.textContent = student.id;
        namecell.textContent = student.name;
        gradecell.textContent = student.grade;

        // EDIT BUTTON SECTION //
        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.addEventListener("click", () => editData(index));
        actioncell.appendChild(editButton);

        // DELETE BUTTON SECTION //
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', () => deleteData(index));
        actioncell.appendChild(deleteButton);
    });
}

function editData(index){
    const student = data[index];
    const newName = prompt('Enter new name:', student.name);
 
    const newGrade = prompt('Enter new grade:', student.grade);

    if(newName!==null && newGrade!==null ){
        data[index].name=newName;
        data[index].grade = newGrade;
        saveData();
        displayData();
    }
    
}
function deleteData(index) {
    data.splice(index, 1);
    saveData();
    displayData();
}


//SEARCH SECTION//

function search() {
    const searchText = document.getElementById('search').value.toLowerCase();
    const filteredData = data.filter(student => student.name.toLowerCase().includes(searchText));
    displayFilteredData(filteredData);
}

function displayFilteredData(filteredData) {
    const tbody = document.getElementById('tbody');
    tbody.innerHTML = "";

    filteredData.forEach((student, index) => {
        const row = tbody.insertRow();
        const idcell = row.insertCell(0);
        const namecell = row.insertCell(1);
        const gradecell = row.insertCell(2);
        const actioncell = row.insertCell(3);

        idcell.textContent = student.id;
        namecell.textContent = student.name;
        gradecell.textContent = student.grade;

        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.addEventListener("click", () => editData(index));
        actioncell.appendChild(editButton);

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', () => deleteData(index));
        actioncell.appendChild(deleteButton);
    });
}

function saveData() {
    localStorage.setItem('studentData', JSON.stringify(data));
}

window.onload = function() {
    displayData();
};


 


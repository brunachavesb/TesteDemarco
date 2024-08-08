let people = [
    {
        name: "Bruna Chaves Barreto",
        email: "brunachavesb@gmail.com",
        phone: "85997333826"
    }
]
let editIndex = -1
let deleteIndex = -1

function showForm(person = null) {
    document.getElementById("cadastroForm").style.display = 'block'
    if (person) {
        document.getElementById("index").value = person.index
        document.getElementById("name").value = person.name
        document.getElementById("email").value = person.email
        document.getElementById("phone").value = person.phone
    } else {
        document.getElementById("formcadastro").reset()
        document.getElementById("index").value = ''
    }
}

function closeForm() {
    document.getElementById("cadastroForm").style.display = 'none'
}

function savePerson() {
    const index = document.getElementById("index").value
    const name = document.getElementById("name").value.trim()
    const email = document.getElementById("email").value.trim()
    const phone = document.getElementById("phone").value.trim()

    const nameRegex = /^[a-zA-Z\s]+$/
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    const phoneRegex = /^\(?[1-9]{2}\)?(?:[2-8]|9[1-9])[0-9]{3}-?[0-9]{4}$/

    if (!nameRegex.test(name)) {
        alert('Por favor, insira um nome válido. Apenas letras e espaços são permitidos.')
        return
    }

    if (!emailRegex.test(email)) {
        alert('Por favor, insira um email válido.')
        return
    }

    if (!phoneRegex.test(phone)) {
        alert('Por favor, insira um número de telefone válido.')
        return
    }

    const person = { name, email, phone }
    if (index === '') {
        if(people.some(person => person.name === name && person.email === email && person.phone === phone)) {
            alert('Esse contato já existe!')
            return
        }
        people.push(person)
    } else people[index] = person

    closeForm()
    renderTable()
}

function editPerson(index) {
    const person = people[index]
    person.index = index
    showForm(person)
}

function showDeleteConfirm(index) {
    deleteIndex = index
    document.getElementById("deleteConfirm").style.display = 'block'
}

function closeDeleteConfirm() {
    document.getElementById("deleteConfirm").style.display = 'none'
}

function confirmDelete() {
    if (deleteIndex !== -1) {
        deletePerson(deleteIndex)
        closeDeleteConfirm()
    }
}

function deletePerson(index) {
    people.splice(index, 1)
    renderTable()
}

function renderTable() {
    const table = document.getElementById("peopleTable").getElementsByTagName('tbody')[0]
    table.innerHTML = ''
    

    people.forEach((person, index) => {
        const row = table.insertRow()
        row.insertCell(0).innerText = index + 1
        row.insertCell(1).innerText = person.name
        row.insertCell(2).innerText = person.email
        row.insertCell(3).innerText = person.phone
        const actionCell = row.insertCell(4)
        actionCell.innerHTML = `<button id="edit" onclick="editPerson(${index})">Editar</button> <button class="delete-button" onclick="showDeleteConfirm(${index})">Deletar</button>`;
    })
    
}

//
renderTable()

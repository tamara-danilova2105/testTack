const userFields = document.querySelectorAll('.user');
const userFieldsTwo = document.querySelectorAll('userweektwo');
const nameTasks = document.querySelectorAll('.nameTask');
const searchInput = document.querySelector('#search');
const divsSearch = document.querySelectorAll('.task');
const dateFields = document.querySelectorAll('.dateCalendar');
const btnLeft = document.querySelector('#left');
const btnRight = document.querySelector('#right');
const tableOne = document.querySelectorAll('#weekOne');
const tableTwo = document.querySelectorAll('#weekTwo');

// доступы к API

async function getUser() {
    const resOne = await fetch('https://varankin_dev.elma365.ru/api/extensions/2a38760e-083a-4dd0-aebc-78b570bfd3c7/script/users');
    const resultUser = await resOne.json();

    let i = 0;

    for (let userField of userFields) {
        userName = `${resultUser[i].firstName} ${resultUser[i].surname}`;
        userField.textContent = userName;
        i++;
    }

}

getUser()

async function getTask() {
    const resTwo = await fetch('https://varankin_dev.elma365.ru/api/extensions/2a38760e-083a-4dd0-aebc-78b570bfd3c7/script/tasks');
    const resultTask = await resTwo.json();

    let i = 0;

    for (let nameTask of nameTasks) {
        task = `${resultTask[i].subject}`;
        nameTask.textContent = task;
        i++;
    }
}

getTask()


// ПОИСК ЗАДАЧ

searchInput.addEventListener('keyup', function(event){
    const word = event.target.value.toLowerCase();

    divsSearch.forEach (item => {
        item.querySelector('.nameTask').textContent.toLowerCase().includes(word) ? (item.style.display = 'block') : (item.style.display='none')
    })
})

// КАЛЕНДАРЬ

function calendar() {
    let myDate = new Date();
    let nowyear  = myDate.getFullYear();

    const months = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"];
    nowMonths = months[myDate.getMonth()]

    let showDate = document.querySelector('#date');
    showDate.textContent = `${nowMonths}, ${nowyear} год`;

    let nowDate = document.querySelector('.datenow')
    nowDate.textContent = myDate.getDate();

    let i = 0;

    for (let dateField of dateFields) {
        dataCalendar = myDate.setDate(myDate.getDate()+1);
        msInDays = new Date(dataCalendar);       
        dateField.textContent = msInDays.getDate();
        i++;
    }

// ПЕРЕЛИСТЫВАНИЕ КАЛЕНДАРЯ
    btnRight.addEventListener('click', ()=>{

        tableTwo.forEach(item => {
        item.style.display = 'block';
        })

        tableOne.forEach(item => {
            item.style.display = 'none';
            })
    })

    btnLeft.addEventListener('click', ()=>{

        tableTwo.forEach(item => {
        item.style.display = 'none';
        })

        tableOne.forEach(item => {
            item.style.display = 'block';
            })
    })
    
}

calendar()


// ПЕРЕТАСКИВАНИЕ ЗАДАЧ

const cell = document.querySelectorAll('.td');
const numberOne = document.querySelector('.numberOne');


for (let item of cell) {
    item.addEventListener ('dragover', dragOver);
    item.addEventListener ('dragenter', dragEnter);
    item.addEventListener ('dragleave', dragLeave);
    item.addEventListener ('drop', dragDrop);
}


function dragOver(e) {
    e.preventDefault();
}

function dragEnter(e) {
    e.preventDefault();
}

function dragLeave() {
    this.className = 'td';
}

function dragDrop() {
    this.className = 'td';
    this.append(numberOne);
}






















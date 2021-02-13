
let saveUsers = [];
let members = [];
// -------------Get elements------------
let content = document.querySelector('.popup__content');
let newEvent = document.querySelector('.title-input-button');
let popup = document.querySelector('.popup');
let popupClose = document.querySelector('.popup__close');
let cancel = document.querySelector('.popup__cancel');
let create = document.querySelector('.popup__create');
// -----------Event Listener---------------
newEvent.addEventListener('click', showPopup);
popupClose.addEventListener('click', closePopup);
cancel.addEventListener('click', closePopup);
popup.addEventListener('click', ovarlayClick);

function showPopup (e) {
    e.preventDefault();
    popup.classList.add('showEvent');
    
}

function closePopup () {  
    popup.classList.remove('showEvent');
    
}

function ovarlayClick (e) {
    if(!e.target.closest('.popup__content')) {
        closePopup();
    }
}
  
// ---------------Multiselect---------------

let button = document.querySelector('.check');
let body = document.querySelector('body');
let check = document.querySelector('.checkselect');
let checkbox = document.querySelectorAll("input[type='checkbox']");
let out = document.querySelector('.check__out');

button.addEventListener('click', showSelect);

body.addEventListener('click', function (e) {
    if (!e.target.closest('.wrap')) {
        check.classList.remove('show');
    }
});

function showSelect (e) { 
    check.classList.toggle('show');
}
   
    for (let item of checkbox) {
       item.addEventListener('change', choise);
    }   
       function choise (e) {
        
        let now = this.closest('label').textContent;
        

        if (this.checked) { 
            saveUsers.push(now);  
        } else {
            saveUsers.splice(saveUsers.indexOf(now, 0), 1);
        }
        out.innerHTML = saveUsers.join(', ');
        
    }


// ---------------Table--------------------

let table = document.querySelector('.calendar__table');
let eventName = document.querySelector('.popup__select_name');
let dayEvent = document.querySelector('.popup__select_day');
let timeEvent = document.querySelector('.popup__select_time');
let errEvent = document.querySelector('.error');
let errClose = document.querySelector('.error__close')




function AddEvent (name, users, day, time) {
    this.name = name;
    this.day = day;
    this.time = time;
    this.users = users;
    this.coord = day+time;
}


function createEvent(obj) {
    
    let cell = table.rows[obj.time].cells[obj.day];
        cell.appendChild(setEventMark(obj));
        cell.querySelector('.event-text').innerHTML = obj.name;
       
        delEventMark();
        
}



create.addEventListener('click', setEvent);


let eventObj;
function setEvent (e) {
    let copySaveUsers = saveUsers.slice();
    if (timeEvent.value == 0) {
        const message = 'Please, choose the time of the event!';
        setError (message);
    } 
    else if (dayEvent.value == 0) {
        setError ('Please, choose the day of the event!')
    } 
    else if (eventName.value == '') {
        setError ('Please, write the name of the event!');
    }
    else if (copySaveUsers.length == 0) {
        setError ('Please, choose a members of the event!');
    } 
    else {
        eventObj = new AddEvent (
            eventName.value,
            copySaveUsers,
            dayEvent.value,
            timeEvent.value
        );
    
            if(members.length == 0) {
                members.push(eventObj);
                createEvent(eventObj);
                closePopup();
            } else {
                eventRender(eventObj);
            }
        }
}

function eventRender (obj) {
    let eventRepeat = null;
   members.map( (item) => {
       if (item.coord == obj.coord) {
        eventRepeat = true;
       }
   });

    if (!eventRepeat) {
        members.push(obj);
        createEvent(obj);
        closePopup();
    } else {
        const message = 'Failed to create an event. Time slot is already blocked';
        setError (message);
    }
}

function setError (message) {
    errEvent.children[0].innerHTML = message;
    errEvent.classList.add('showEvent');
    errClose.addEventListener('click', () => errEvent.classList.remove('showEvent'));
}
// ------------------------------------------


function setEventMark (obj) {
    
    let eventContainer = document.createElement('div');
    eventContainer.classList.add('event-mark', 'showEvent');
    eventContainer.setAttribute('coord', obj.coord);

    let eventText = document.createElement('span');
    eventText.classList.add('event-text');
    eventContainer.appendChild(eventText);
    
    let eventDel = document.createElement('a');
    eventDel.classList.add('event-del');
    eventDel.innerHTML ='x';
    eventContainer.appendChild(eventDel);
    
    return eventContainer;
}

let popupDel = document.querySelector('.popup-del');
const thisEventName = document.querySelector('.this-event-name');

let curentElement;
function delEventMark (e) {
    
    let eventDelBtn =document.querySelectorAll('.event-del');
    for (let i=0; i<eventDelBtn.length; i++) {
        eventDelBtn[i].addEventListener('click', (e) => {
            curentElement = e.target;
            thisEventName.innerHTML = `"${eventDelBtn[i].previousElementSibling.textContent}"`;
            popupDel.classList.add('showEvent');
            
        });   
    }
}

document.querySelector('#btn-yes').addEventListener('click', () => {
    eventDelete(curentElement);
} );

document.querySelector('#btn-no').addEventListener('click', () => {
    closeDelWindow();
});

function eventDelete(elem) {
    let currentDelElement = elem.parentNode;
    const currentCoord = currentDelElement.getAttribute('coord');
    members.splice(members.findIndex(elem => elem.coord == currentCoord), 1);
    currentDelElement.remove();
    
    closeDelWindow();

}

function closeDelWindow () {
    popupDel.classList.remove('showEvent');
}

// -------------------------------------------
const eventByUser = document.querySelector('.title__select');

eventByUser.addEventListener('change', () => {
    getEventByUser(members);
});

function getEventByUser (arr) {
    for (let i = 0; i<arr.length; i++) {
        let currentEventBlock = table.rows[arr[i].time].cells[arr[i].day].firstChild;
        if (eventByUser.value == 'All members') {
            currentEventBlock.classList.add('showEvent');
        } else {
            console.log('вибрано '+ eventByUser.value);
            let userr = arr[i].users.find(item => item == eventByUser.value);
            if (userr) {
                if (!currentEventBlock.classList.contains('.showEvent')) {
                    currentEventBlock.classList.add('showEvent');
                }
            } else {
                currentEventBlock.classList.remove('showEvent');
            }
        }
    }
}






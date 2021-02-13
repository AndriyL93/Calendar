#Project information
The project "Calendar" was implemented with the help of HTML, CSS and JS. Adding a new event is implemented using a pop-up window.

The project has the following functions:
* creating events
    * display an event mark
    * the meeting can be successfully created if and only if the time slot for that day and time is free
    * show an error if the event cannot be created
* deleting events
* sorting events by members

## Information about the project files
The file index.html includes all page markup. Table and pop-ups.
The  file style.css includes all project style.
The file script.js includes all program logic of the project.

### Creating events

1. After pressing the button "New event +" the function "showPopup" that displays pop-up is called. Selected participants are saved to the array "saveUsers".
2. After pressing the button "Create" the function "setEvent" that creates an object "eventObj" based on data selected by the user. This object is saved to the array "members".
    ##### The object includes the following data:
    1. name of hte event;
    2. day of the event;
    3. time of the event;
    4. participants;
    5. cell coordinates

3. If all data is filled correctly, the function that created event "createEvent (eventObj)" is called.This function determines the coordinates of the cell and creates a mark about the event "setEventMark (obj)".
4. If the data is entered incorrectly, a function that displays error information is called and the event is not created.

### Deleting events

After clicking the button on the event mark, the function that shows a pop-up with information about deleting the event and buttons "Yes" and "Cancel" is called (delEventMark()).
If the user presses a button "Yes", the function "eventDelete" is called. The event mark is deleted and the event object is deleted from the array "members".

### Sorting events by members

The value of the selected participant is passed to the function "getEventByUser". The array of objects is moved. The value of each event object is compared with the selected value. If the values match, a class "showEvent is added to the event elements and this event is displayed. In other cases the class ""showEvent is deleted and event is not displayed.


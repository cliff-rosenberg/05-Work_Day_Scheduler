// Javascript

// Hours for day are in 24hr format
var dayHourStart = 7;
var dayHourEnd = 18;

// Get current time for top of calendar sheet
var todaysDate = $("#currentDay").text(moment().format("dddd, MMMM Do"));

// Local storage for saved items recall
function rowRecall(whichRow) {
    return localStorage.getItem(whichRow);
};

// Local storage written for row content
function saveRow(rowid, content) {
  if (content === null) {
    // if it's blank, remove the item
    localStorage.removeItem(rowid);
  } else {
    // else, save the content as the item
    localStorage.setItem(rowid, content);
  }
};

// This is the function for putting day calendar on page
function createDayCalendar () {
    // variables for function
    var time;
    var row;
    var hours;
    var timeBlocs;
    var saveButton;
    var currentHour = moment().format("HH");
    // This loop builds out the rows for display
    for (i = dayHourStart; i<= dayHourEnd; i++) {
      time = moment(i, "HH").format("HH");
      row = $("<div class='row hour-" + i + "'></div>");
      hours = $("<div class='hour-" + i + " col-sm-1 hour py-3 text-right'>" + moment(i, "HH").format("hh a") + "</div>");
      timeBlocs = $("<div contenteditable=true id='hour-" + i + "' class='hour-" + i + " col-sm-9 time-block '>");
      var savedDataRow = rowRecall("hour-" + i);
      // Logic for background colors (past = gray, current = red, future = green)
      if (time < currentHour) {
        timeBlocs.addClass("past");
        } else if (time === currentHour) {
          timeBlocs.addClass("present");
        } else {
            timeBlocs.addClass("future");
        };
        // add in any saved data for this row
        timeBlocs.append(savedDataRow);
      // Create the "save" button on the right end of the row      
      saveButton = $("<div id='saver-" + i + "' class='hour-" + i + " saveBtn py-4 col-sm-2 text-center'>&#x1F4BE;</div>");
      // combine everything together on the line
      row.append(hours, timeBlocs, saveButton);
      // add to the "container" class in HTML
      $(".container").append(row);
    }; //end of FOR loop
}; //end of function

// call function to create day schedule
createDayCalendar();

// Event handler for "time-block" clicks
$(".time-block").on("click", function(event) {
  event.preventDefault();
  //console.log(event);
  var myItem = this.id;
  const x = document.getElementById(myItem);
  if (x.contentEditable == "false") {
    x.contentEditable = "true";
  };
});

// Event handler for "saveBtn" clicks
$(".saveBtn").on("click", function(event) {
  event.preventDefault();
  var myItem = this.id;
  myItem = myItem.substr(5);
  myItem = "hour" + myItem;
  //console.log(myItem);
  const x = document.getElementById(myItem);
  //console.log(x.innerHTML);
  var dataForSave = x.innerHTML;
  saveRow(myItem, dataForSave);
  
});

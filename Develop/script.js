// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html. DONE
$(document).ready(function () {
  const currentDayEl = $("#currentDay");
  const currentDay = dayjs();
  $("#currentDay").text(currentDay.format("dddd, MMMM D, YYYY"));
  const currentTime = dayjs().hour();
  const timeBlocks = $("#time-blocks");
  const textBox = timeBlocks.find("textarea");

  timeBlocks.children().each(function () {
    const timeBlock = $(this);
    const hour = parseInt(timeBlock.attr("data-hour"));
    const saveBtn = timeBlock.find(".saveBtn"); // Define saveBtn within the loop

    if (hour > currentTime) {
      timeBlock.addClass("future");
      saveBtn.prop("disabled", false);
    } else if (hour === currentTime) {
      timeBlock.addClass("present");
      saveBtn.prop("disabled", false);
    } else {
      timeBlock.addClass("past");
      saveBtn.prop("disabled", true);
      timeBlock.find("textarea").prop("disabled", true);
    }

    // Event listener for saveBtn elements
    saveBtn.click(function () {
      const textAreaValue = timeBlock.find("textarea").val(); // Access textarea within this timeBlock
      const hour = parseInt(timeBlock.attr("data-hour"));
      saveEvent(textAreaValue, hour);
    });
  });

  function saveEvent(text, hour) {
    // Save the text value to local storage with a key based on the hour
    localStorage.setItem(`savedText${hour}`, text);
  }

  window.onload = function () {
    // Loop through the hours and retrieve saved values
    for (let hour = 9; hour <= 17; hour++) {
      const savedText = localStorage.getItem(`savedText${hour}`);

      // Check if there is a saved value
      if (savedText) {
        // Set the value of the corresponding textarea
        const textarea = document.getElementById(`textbox${hour}`);
        if (textarea) {
          textarea.value = savedText;
        }
      }
    }
  };
});


console.log()


// TODO: Add a listener for click events on the save button. This code should
// use the id in the containing time-block as a key to save the user input in
// local storage. HINT: What does `this` reference in the click listener
// function? How can DOM traversal be used to get the "hour-x" id of the
// time-block containing the button that was clicked? How might the id be
// useful when saving the description in local storage?

//
// TODO: Add code to get any user input that was saved in localStorage and set
// the values of the corresponding textarea elements. HINT: How can the id
// attribute of each time-block be used to do this?

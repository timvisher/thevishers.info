/* Author: 

 */

function activateOrDeactivateClickZone(clickZone) {
  if ($(clickZone).hasClass('s-active')) {
    $(clickZone).removeClass('s-active');
    $('.s-inactive').removeClass('s-inactive');
    $(clickZone).next('.bio').removeClass('s-active');
    $('#direction').removeClass('s-active');
  } else {
    $('.christmas-kid-toss, .click-zone').addClass('s-inactive');
    $(clickZone).removeClass('s-inactive');
    $(clickZone).addClass('s-active');
    $(clickZone).next('.bio').addClass('s-active');
    $('#direction').addClass('s-active');
  }
}

function watchMakingOf() {
  $('#making-of').toggleClass('active');
}

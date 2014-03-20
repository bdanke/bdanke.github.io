var is_leap_year = function(yr) {return !((yr % 4) || (!(yr % 100) && (yr % 400)));};

var months = ["January", "February", "March",
							"April", "May", "June", "July",
							"August", "September", "October",
							"November", "December"];

var num_days = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

var days = ["Sunday", "Monday", "Tuesday", "Wednesday",
						"Thursday", "Friday", "Saturday"];

var today = new Date();

var current_year = today.getFullYear();
var current_date = today.getDate();
var current_month = today.getMonth();
var current_weekday = days[today.getDay()];
var current_month_name = months[current_date];

var year = current_year;
var month = current_month;

var date_grid = $('<div id="date-grid" class="hidden">\
								<div id="Sunday" class="column">\
									<div class="date-grid-day">S</div>\
								</div>\
								<div id="Monday" class="column column-border">\
									<div class="date-grid-day">M</div>\
								</div>\
								<div id="Tuesday" class="column column-border">\
									<div class="date-grid-day">T</div>\
								</div>\
								<div id="Wednesday" class="column column-border">\
									<div class="date-grid-day">W</div>\
								</div>\
								<div id="Thursday" class="column column-border">\
									<div class="date-grid-day">T</div>\
								</div>\
								<div id="Friday" class="column column-border">\
									<div class="date-grid-day">F</div>\
								</div>\
								<div id="Saturday" class="column column-border">\
									<div class="date-grid-day">S</div>\
								</div>\
							</div>');

var set_calendar = function(year, month) {
	$(".grid-box").remove();
	$("#date-grid").remove();

	$("#calendar").append(date_grid);

	$("#month-and-year").html(months[month] + " " + year);
	num_days[1] = is_leap_year(year) ? 29 : 28;

	var first_of_month = new Date(year, month, 1);
	var first_day = first_of_month.getDay();
	var day_num = 1;

	var i = 0;
	while(i < first_day) {
		var el = $('<div class="grid-box empty"></div>');
		$("#" + days[i]).append(el);
		i++;
	}

	i = first_day;
	var j = 1;
	while(j <= num_days[month]) {
		var el = $('<div class="grid-box date-grid-number">' + j + '</div>');
		$("#" + days[i]).append(el);
		if( year == current_year && month == current_month && j == current_date) {
			el.addClass("current-date");
		}
		i = (i + 1) % 7;
		j++;
	}
};

$(document).ready(function () {
	$("#current-day-name").html(current_weekday);
	$("#current-day-number").html(current_date);
	
	set_calendar(current_year, current_month);
	// $("#calendar").append(date_grid);
	$("#date-grid").animate({left: "+=433"}).removeClass("hidden");

	$("#previous-month").on("click", function() {
		month -= 1;
		if( month < 0 ) {
			month = 11;
			year -= 1;
		}
		set_calendar(year, month);
		$("#date-grid").css("left", -433);
		$("#date-grid").animate({left: "+=433"}).removeClass("hidden");
	});

	$("#next-month").on("click", function() {
		month += 1;
		if( month > 11 ) {
			month = 0;
			year += 1;
		}
		set_calendar(year, month);
		$("#date-grid").css("left", 433);
		$("#date-grid").animate({left: "-=433"}).removeClass("hidden");
	});
});
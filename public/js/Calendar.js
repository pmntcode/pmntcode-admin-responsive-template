"use strict";
var ptBRConfig = {
    monthNames: [
        "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
        "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
    ],
    dayNamesShort: ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"],
    locale: 'pt-br'
};
// Defina configurações para diferentes idiomas
var enUSConfig = {
    monthNames: [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ],
    dayNamesShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    locale: 'en-US'
};
var esESConfig = {
    monthNames: [
        "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
        "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
    ],
    dayNamesShort: ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"],
    locale: 'es-ES'
};
var Calendar = /** @class */ (function () {
    function Calendar(container, inputId, config) {
        this.currentMonth = new Date().getMonth();
        this.currentYear = new Date().getFullYear();
        this.container = document.getElementById(container);
        this.config = config;
        this.isVisible = false; // Inicialmente, o calendário está oculto
        this.container.style.display = 'none';
        this.inputId = inputId;
    }
    Calendar.prototype.render = function () {
        var _this = this;
        var monthNames = this.config.monthNames;
        var dayNamesShort = this.config.dayNamesShort;
        var firstDay = new Date(this.currentYear, this.currentMonth, 1);
        var lastDay = new Date(this.currentYear, this.currentMonth + 1, 0);
        var calendarHTML = "\n            <div class=\"calendar-header\">\n                <button type=\"button\" id=\"prevMonth\">\n                    <i class=\"pmntcode-icon pmntcode-icon--navigate_before\"></i>\n                </button>\n                <span>".concat(monthNames[this.currentMonth], "</span>\n                <button type=\"button\" id=\"nextMonth\">\n                    <i class=\"pmntcode-icon pmntcode-icon--navigate_next\"></i>\n                </button>\n                <div class=\"year-selector\">\n                    <select id=\"yearSelect\">\n                        ").concat(this.generateYearOptions(), "\n                    </select>\n                </div>\n            </div>");
        if (this.isVisible) {
            calendarHTML += "\n                <table class=\"calendar-table\">\n                    <thead>\n                        <tr>";
            for (var _i = 0, dayNamesShort_1 = dayNamesShort; _i < dayNamesShort_1.length; _i++) {
                var day_1 = dayNamesShort_1[_i];
                calendarHTML += "<th>".concat(day_1, "</th>");
            }
            calendarHTML += "\n                        </tr>\n                    </thead>\n                    <tbody>";
            var day = 1;
            for (var i = 0; i < 6; i++) {
                calendarHTML += "<tr>";
                for (var j = 0; j < 7; j++) {
                    if (i === 0 && j < firstDay.getDay()) {
                        calendarHTML += "<td></td>";
                    }
                    else if (day > lastDay.getDate()) {
                        break;
                    }
                    else {
                        var date = new Date(this.currentYear, this.currentMonth, day);
                        calendarHTML += "<td>".concat(day, "</td>");
                        day++;
                    }
                }
                calendarHTML += "</tr>";
            }
            calendarHTML += "\n                    </tbody>\n                </table>";
        }
        this.container.innerHTML = calendarHTML;
        var td = document.querySelectorAll(".".concat(this.container.classList, " td"));
        td.forEach(function (item) {
            item.addEventListener('click', function () { return _this.selectDate(Number(item.innerText)); });
        });
        var prevMonth = document.querySelector(".".concat(this.container.classList, " #prevMonth"));
        prevMonth.addEventListener('click', function () { return _this.prevMonth(); });
        var nextMonth = document.querySelector(".".concat(this.container.classList, " #nextMonth"));
        nextMonth.addEventListener('click', function () { return _this.nextMonth(); });
        var yearSelect = document.querySelector(".".concat(this.container.classList, " #yearSelect"));
        yearSelect.addEventListener('change', function () { return _this.changeYear(); });
    };
    Calendar.prototype.selectDate = function (day) {
        var date = new Date(this.currentYear, this.currentMonth, day);
        var selectedDate = new Date(date.getTime());
        var options = { day: '2-digit', month: '2-digit', year: 'numeric' };
        var dateString = selectedDate.toLocaleDateString(this.config.locale, options);
        var inputElement = document.getElementById(this.inputId);
        inputElement.value = dateString;
        this.toggleVisibility();
    };
    Calendar.prototype.toggleVisibility = function () {
        this.isVisible = !this.isVisible;
        if (this.isVisible) {
            this.container.style.display = 'block';
            this.render();
        }
        else {
            this.container.innerHTML = '';
            this.container.style.display = 'none';
        }
    };
    Calendar.prototype.generateYearOptions = function () {
        var currentYear = new Date().getFullYear();
        var options = '';
        for (var i = currentYear - 100; i <= currentYear + 10; i++) {
            options += "<option value=\"".concat(i, "\" ").concat(i === this.currentYear ? 'selected' : '', ">").concat(i, "</option>");
        }
        return options;
    };
    Calendar.prototype.changeYear = function () {
        var yearSelect = document.querySelector(".".concat(this.container.classList, " #yearSelect option:checked"));
        var selectedYear = parseInt(yearSelect.value);
        this.currentYear = selectedYear;
        this.render();
    };
    Calendar.prototype.nextMonth = function () {
        this.currentMonth++;
        if (this.currentMonth > 11) {
            this.currentMonth = 0;
            this.currentYear++;
        }
        this.render();
    };
    Calendar.prototype.prevMonth = function () {
        this.currentMonth--;
        if (this.currentMonth < 0) {
            this.currentMonth = 11;
            this.currentYear--;
        }
        this.render();
    };
    return Calendar;
}());

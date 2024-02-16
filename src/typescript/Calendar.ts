const ptBRConfig: CalendarConfig = {
    monthNames: [
        "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
        "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
    ],
    dayNamesShort: ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"],
    locale: 'pt-br'
};

// Defina configurações para diferentes idiomas
const enUSConfig: CalendarConfig = {
    monthNames: [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ],
    dayNamesShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    locale: 'en-US'
};

const esESConfig: CalendarConfig = {
    monthNames: [
        "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
        "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
    ],
    dayNamesShort: ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"],
    locale: 'es-ES'
};

interface CalendarConfig {
    monthNames: string[];
    dayNamesShort: string[];
    locale: string
}

class Calendar {
    private currentMonth: number;
    private currentYear: number;
    private container: HTMLElement;
    private config: CalendarConfig;
    private isVisible: boolean;
    private inputId: string;

    constructor(container: string, inputId: string, config: CalendarConfig) {
        this.currentMonth = new Date().getMonth();
        this.currentYear = new Date().getFullYear();
        this.container = document.getElementById(container)!;
        this.config = config;
        this.isVisible = false; // Inicialmente, o calendário está oculto
        this.container.style.display = 'none';
        this.inputId = inputId;
    }

    render() {
        const monthNames = this.config.monthNames;
        const dayNamesShort = this.config.dayNamesShort;

        const firstDay: Date = new Date(this.currentYear, this.currentMonth, 1);
        const lastDay: Date = new Date(this.currentYear, this.currentMonth + 1, 0);

        let calendarHTML: string = `
            <div class="calendar-header">
                <button type="button" id="prevMonth">
                    <i class="pmntcode-icon pmntcode-icon--navigate_before"></i>
                </button>
                <span>${monthNames[this.currentMonth]}</span>
                <button type="button" id="nextMonth">
                    <i class="pmntcode-icon pmntcode-icon--navigate_next"></i>
                </button>
                <div class="year-selector">
                    <select id="yearSelect">
                        ${this.generateYearOptions()}
                    </select>
                </div>
            </div>`;

        if (this.isVisible) {
            calendarHTML += `
                <table class="calendar-table">
                    <thead>
                        <tr>`;
            for (const day of dayNamesShort) {
                calendarHTML += `<th>${day}</th>`;
            }
            calendarHTML += `
                        </tr>
                    </thead>
                    <tbody>`;

            let day = 1;
            for (let i = 0; i < 6; i++) {
                calendarHTML += "<tr>";
                for (let j = 0; j < 7; j++) {
                    if (i === 0 && j < firstDay.getDay()) {
                        calendarHTML += "<td></td>";
                    } else if (day > lastDay.getDate()) {
                        break;
                    } else {
                        const date = new Date(this.currentYear, this.currentMonth, day);
                        calendarHTML += `<td>${day}</td>`;
                        day++;
                    }
                }
                calendarHTML += "</tr>";
            }

            calendarHTML += `
                    </tbody>
                </table>`;
        }
        this.container.innerHTML = calendarHTML;
        const td = document.querySelectorAll(`.${this.container.classList} td`) as NodeList;
        td.forEach(item => {
            item.addEventListener('click', () => this.selectDate(Number((item as HTMLElement).innerText)));
        });
        const prevMonth = document.querySelector(`.${this.container.classList} #prevMonth`) as HTMLInputElement;
        prevMonth.addEventListener('click', () => this.prevMonth());
        const nextMonth = document.querySelector(`.${this.container.classList} #nextMonth`) as HTMLInputElement;
        nextMonth.addEventListener('click', () => this.nextMonth());
        const yearSelect = document.querySelector(`.${this.container.classList} #yearSelect`) as HTMLSelectElement;
        yearSelect.addEventListener('change', () => this.changeYear());
    }

    selectDate(day: number) {
        const date = new Date(this.currentYear, this.currentMonth, day);
        const selectedDate = new Date(date.getTime());
        const options: Intl.DateTimeFormatOptions = { day: '2-digit', month: '2-digit', year: 'numeric' };
        const dateString = selectedDate.toLocaleDateString(this.config.locale, options);
        const inputElement = document.getElementById(this.inputId) as HTMLInputElement;
        inputElement.value = dateString;
        this.toggleVisibility();
    }

    toggleVisibility() {
        this.isVisible = !this.isVisible;
        if (this.isVisible) {
            this.container.style.display = 'block';
            this.render();
        } else {
            this.container.innerHTML = '';
            this.container.style.display = 'none';
        }
    }

    generateYearOptions() {
        const currentYear = new Date().getFullYear();
        let options = '';
        for (let i = currentYear - 100; i <= currentYear + 10; i++) {
            options += `<option value="${i}" ${i === this.currentYear ? 'selected' : ''}>${i}</option>`;
        }
        return options;
    }

    changeYear() {
        const yearSelect = document.querySelector(`.${this.container.classList} #yearSelect option:checked`) as HTMLSelectElement;
        const selectedYear = parseInt(yearSelect.value);
        this.currentYear = selectedYear;
        this.render();
    }

    nextMonth() {
        this.currentMonth++;
        if (this.currentMonth > 11) {
            this.currentMonth = 0;
            this.currentYear++;
        }
        this.render();
    }

    prevMonth() {
        this.currentMonth--;
        if (this.currentMonth < 0) {
            this.currentMonth = 11;
            this.currentYear--;
        }
        this.render();
    }
}
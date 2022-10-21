const el = (tag, attrs = {}, children = []) => {
    const elem = document.createElement(tag);
    for (const [key, value] of Object.entries(attrs))
        elem.setAttribute(key, value);

    elem.append(...children);

    return elem;
};

const elDiv = el.bind(null, 'div');

const dateFormater = new Intl.DateTimeFormat('en', {
    year: 'numeric',
    month: 'long',
});

function createCalendar(date = new Date()) {
    const back = elDiv({ class: 'step_back' });
    const next = elDiv({ class: 'step_next' });
    const dateElem = elDiv({ class: 'year' });
    const reset = elDiv({ class: 'reset' }, ['Reset']);

    const daysNames = ['пн', 'вт', 'ср', 'чт', 'пт', 'сб', 'вс'].map((name) =>
        elDiv({ class: 'calendar__weeksDay_name' }, [name])
    );

    const items = Array(49)
        .fill(0)
        .map(() => elDiv({ class: 'calendar__weeksDay_item' }));

    const wrapper = elDiv({ class: 'calendar-wrapper' }, [
        elDiv({ class: 'menu' }, [back, dateElem, next]),
        elDiv({ class: 'calendar' }, [].concat(daysNames, items)),
        reset,
    ]);

    const fillCalc = () => {
        let firstDayOfWeek = new Date(
            date.getFullYear(),
            date.getMonth(),
            0
        ).getDay();

        if (firstDayOfWeek === 0) firstDayOfWeek = 7;

        const lotDayOfMonth = new Date(
            date.getFullYear(),
            date.getMonth() + 1,
            0
        ).getDate();

        let day = 1;
        for (const [i, item] of items.entries()) {
            if (i >= firstDayOfWeek && i < lotDayOfMonth + firstDayOfWeek) {
                item.textContent = day;

                if (
                    day++ === new Date().getDate() &&
                    date.getFullYear() == new Date().getFullYear() &&
                    date.getMonth() == new Date().getMonth()
                )
                    item.classList.add('color_lBlue');
                else {
                    item.classList.add('color_turquoise');
                    item.classList.remove('color_lBlue');
                }
            } else item.textContent = '';
        }
    };

    const mutateDate = (newDate) => {
        date = newDate;
        dateElem.textContent = dateFormater.format(date);
    };

    const makeReset = () => mutateDate(new Date());

    const step = (to = 1) => {
        let newMonth = date.getMonth() + to;
        let newYear = date.getFullYear();

        if (newMonth > 11) {
            newMonth = 0;
            newYear++;
        } else if (newMonth < 0) {
            newMonth = 11;
            newYear--;
        }

        mutateDate(new Date(newYear, newMonth));
    };

    const observer = new MutationObserver(fillCalc);
    observer.observe(dateElem, { childList: true });

    const stepBack = step.bind(null, -1);
    const stepNext = step.bind(null, 1);

    next.addEventListener('click', stepNext);
    back.addEventListener('click', stepBack);

    reset.addEventListener('click', makeReset);

    mutateDate(date);
    document.body.appendChild(wrapper);

    return () => {
        next.removeEventListener('click', stepBack);
        back.removeEventListener('click', stepNext);
        reset.removeEventListener('click', makeReset);

        wrapper.remove();
    };
}

const btn = el('button', {}, ['Delete calendar']);
document.body.appendChild(btn);
btn.addEventListener('click', createCalendar());

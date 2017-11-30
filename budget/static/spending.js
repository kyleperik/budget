vue_utils.push_component('spending', {
    props: ['budgets'],
    created: function () {
        this.load(5);
    },
    data: function () {
        return {
            budget_categoryid: '',
            amount: 0,
            description: '',
            day_of_month: new Date().getDate(),
            spending: [],
            days_loaded: 0,
        };
    },
    computed: {
        groupedSpending: function () {
            if (!this.spending) return [];
            return this.spending.reduce((r, s) => {
                var existingDay = r.filter(d => d.day === s.day_of_month)[0];
                var newDay = {
                    day: s.day_of_month,
                    spending: [s].concat(existingDay ? existingDay.spending : []) 
                };
                return r.filter(d => d.day !== s.day_of_month).concat([newDay]);
            }, []).sort(
                (a, b) => b.day - a.day
            );
        }
    },
    methods: {
        load: function (days_to_load) {
            fetch(`spending/${this.days_loaded}-${this.days_loaded + days_to_load}`)
            .then(r => r.json())
            .then(s => {
                this.spending = this.spending.concat(s);
                this.days_loaded += days_to_load
            });
        },
        ordinal: moment.localeData().ordinal,
        time: function (day_of_month) {
            var today_day_of_month = new Date().getDate();
            if (day_of_month === today_day_of_month) {
                return 'today';
            } else if (day_of_month > today_day_of_month) {
                return 'future';
            } else {
                return (today_day_of_month - day_of_month) + 'd';
            }
        },
        add: function () {
            var data = {
                budget_categoryid: this.budget_categoryid,
                amount: parseInt(this.amount).toFixed(2),
                description: this.description,
                day_of_month: this.day_of_month
            };
            fetch('spending/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            })
            .then(() => {
                this.budget_categoryid = '';
                this.amount = 0;
                this.description = '';
                this.spending.unshift(data);
            });
        }
    }
});

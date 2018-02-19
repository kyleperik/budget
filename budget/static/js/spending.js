vue_utils.push_component('spending', {
    props: ['budgets', 'timeperiod'],
    created: function () {
        this.load(5);
    },
    data: function () {
        var data = {
            budget_categoryid: '',
            amount: null,
            description: '',
            all_days_loaded: {},
            all_spending: {},
            today: new Date(),
            hovered_id: null,
        };
        return data;
    },
    computed: {
        is_this_period: function () {
            return (
                this.timeperiod.month == this.today.getMonth() + 1 &&
                this.timeperiod.year == this.today.getFullYear()
            )
        },
        day_of_month: function () {
            return this.today.getDate();
        },
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
        },
        spending: function () {
            return this.all_spending[this.timeperiod.id];
        },
        days_loaded: function () {
            return this.all_days_loaded[this.timeperiod.id];
        },
        all_loaded: function () {
            return this.days_loaded >= moment(new Date(
                this.timeperiod.year,
                this.timeperiod.month - 1
            )).daysInMonth();
        }
    },
    watch: {
        timeperiod: function () {
            if (!this.all_days_loaded[this.timeperiod.id]) this.load(5)
        }
    },
    methods: {
        load: function (days_to_load) {
            Vue.set(
                this.all_days_loaded,
                this.timeperiod.id,
                this.all_days_loaded[this.timeperiod.id] || 0
            );
            var loaded = this.all_days_loaded[this.timeperiod.id];
            var tp = this.timeperiod.id;
            fetch(`spending/${tp}/${loaded}-${loaded + days_to_load}`)
            .then(r => r.json())
            .then(s => {
                Vue.set(
                    this.all_spending,
                    this.timeperiod.id,
                    (this.all_spending[
                        this.timeperiod.id
                    ] || []).concat(s)
                );
                this.all_days_loaded[this.timeperiod.id] += days_to_load;
                if (s.length === 0 && !this.all_loaded) this.load(days_to_load);
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
            if (!this.budget_categoryid || !this.amount || !this.day_of_month) return;
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
            .then(x => x.json())
            .then(id => {
                this.budget_categoryid = '';
                this.amount = null;
                this.description = '';
                data.id = id;
                this.spending.unshift(data);
                this.$emit('load');
            });
        },
        del: function (s) {
            fetch(`spending/${s.id}`, {
                method: 'DELETE',
            })
            .then(r => {
                this.all_spending[
                    this.timeperiod.id
                ] = this.all_spending[
                    this.timeperiod.id
                ].filter(
                    x => x.id !== s.id
                );
            });
        }
    }
});

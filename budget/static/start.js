vue_utils.push_component('app', {
    data: function () {
        return {
            all_budgets: {},
            timeperiodid: null,
            timeperiods: null
        }
    },
    created: function () {
        this.load();
    },
    computed: {
        budgets: function () {
            if (!this.timeperiod) return null;
            return this.all_budgets[this.timeperiod.id] || [];
        },
        timeperiod: function () {
            if (!this.timeperiods) return null;
            return this.timeperiods.filter(t => t.id == this.timeperiodid)[0];
        },
        isfirstperiod: function () {
            if (!this.timeperiods) return false;
            return this.timeperiodid === this.timeperiods[0].id;
        },
        islastperiod: function () {
            if (!this.timeperiods) return false;
            return this.timeperiodid === this.timeperiods[this.timeperiods.length - 1].id;
        },
        timeperiod_date: function () {
            if (!this.timeperiod) return null;
            var date = moment(new Date(
                this.timeperiod.year,
                this.timeperiod.month - 1
            ));
            var is_current_year = date.year() === moment().year();
            return date.format(
                is_current_year ? 'MMMM' : 'MMMM YYYY'
            );
        }
    },
    methods: {
        load: function () {
            fetch(`timeperiod/`)
            .then(r => r.json())
            .then(d => {
                this.timeperiods = d;
                this.timeperiodid = d.concat().sort(t =>
                    Math.abs(Math.abs(t.month - new Date().getMonth() - 1
                    + (t.year - new Date().getFullYear()) * 12))
                )[0].id;
                this.load_budgets();
            });
        },
        load_budgets: function () {
            var tp = this.timeperiod;
            fetch(`budget/${tp.id}`)
            .then(r => r.json())
            .then(d => {
                Vue.set(this.all_budgets, tp.id, d);
            });
        },
        moveperiod: function (d) {
            var tps = this.timeperiods.sort(
                (a, b) => (
                    a.year * 12 + a.month - (b.year * 12 + b.month)
                )
            );
            this.timeperiodid = tps[tps.indexOf(this.timeperiod) + d].id;
            this.load_budgets()
        },
        addperiod: function () {
            var tp = this.timeperiod;
            var data = {
                month: (tp.month + 1) % 12,
                year: tp.year + Math.floor(tp.month / 12),
            };
            fetch(`timeperiod/`, {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json',
                }
            }).then(r => r.json()) 
            .then(r => {
                this.timeperiods.push({
                    month: data.month,
                    year: data.year,
                    id: r,
                });
            });
        }
    }
});

Array.prototype.groupBy = function(key) {
    return this.reduce(function(rv, x) {
        (rv[x[key]] = rv[x[key]] || []).push(x);
        return rv;
    }, {});
};

function start () {
    new Vue({ el: '.wrapper' });
}

window.addEventListener('load', function () {
    vue_utils.register_components(start);
});

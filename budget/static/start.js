vue_utils.push_component('app', {
    data: function () {
        return {
            budgets: null
        }
    },
    created: function () {
        this.load();
    },
    methods: {
        load: function () {
            fetch('budget/')
            .then(r => r.json())
            .then(budgets => {
                this.budgets = budgets;
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

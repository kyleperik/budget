vue_utils.push_component('app', {
    data: function () {
        return {
            budgets: null
        }
    },
    created: function () {
        fetch('budget/')
        .then(r => r.json())
        .then(budgets => {
            this.budgets = budgets;
        });
    },
});

function start () {
    new Vue({ el: '.wrapper' });
}

window.addEventListener('load', function () {
    vue_utils.register_components(start);
});

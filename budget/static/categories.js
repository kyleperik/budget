vue_utils.push_component('categories', {
    props: ['categories']
});

function start () {
    new Vue({
        created: function () {
            fetch('budget/')
            .then(r => r.json())
            .then(budgets => {
                this.categories = budgets;
            });
        },
        el: '.wrapper',
        data: {
            categories: null
        }
    });
}

window.addEventListener('load', function () {
    vue_utils.register_components(start);
});

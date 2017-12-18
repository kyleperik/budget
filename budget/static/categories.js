vue_utils.push_component('categories', {
    props: ['categories'],
    data: function () {
        return {
            edit_budget: null
        }
    },
    methods: {
        add: function () {
            this.edit_budget = {
                name: null,
                amount: null,
            };
        },
        confirm_add: function () {
            var data = {
                name: this.edit_budget.name,
                amount: this.edit_budget.amount,
                timeperiodid: 1,
            };
            this.edit_budget = null;
            fetch('budget/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            })
            .then(() => {
                this.$emit('load');
            });
        }
    }
});

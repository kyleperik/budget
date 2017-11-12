vue_utils.push_component('spending', {
    props: ['budgets'],
    data: function () {
        return {
            budget_categoryid: '',
            amount: null,
            description: '',
            day_of_month: null,
        };
    },
    methods: {
        add: function () {
            fetch('spending', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    budget_categoryid: this.budget_categoryid,
                    amount: this.amount,
                    description: this.description,
                    day_of_month: this.day_of_month
                })
            });
        }
    }
});

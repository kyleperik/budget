vue_utils.push_component('categories', {
    props: ['categories', 'timeperiod'],
    data: function () {
        return {
            edit_budget: null
        }
    },
    computed: {
        budget_data: function () {
            return  {
                labels: this.categories.map(c => c.name),
                datasets: [{
                    backgroundColor: ['#ff8888', '#8888ff', '#ffddaa', '#aaffaa', '#ffccaa'],
                    data: this.categories.map(c => c.amount)
                }]
            }
        }
    },
    methods: {
        add: function () {
            this.edit_budget = {
                name: null,
                amount: null,
            };
            this.$nextTick(() => this.$refs.edit_focus.focus())
        },
        exit_edit: function (e) {
            if (!this.$refs.edit_dialog || !this.$refs.edit_dialog.contains(e.target)) {
                this.edit_budget = null;
            }
        },
        confirm_add: function () {
            var data = {
                name: this.edit_budget.name,
                amount: this.edit_budget.amount,
                timeperiodid: this.timeperiod.id,
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

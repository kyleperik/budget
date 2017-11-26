vue_utils.push_component('spending', {
    props: ['budgets'],
    created: function () {
	fetch('spending')
        .then(r => r.json())
        .then(s => this.spending = s);
    },
    data: function () {
        return {
            budget_categoryid: '',
            amount: 0,
            description: '',
            day_of_month: null,
	    	spending: null,
        };
    },
    computed: {
        groupedSpending: function () {
        	if (!this.spending) return {};
        	return this.spending.sort(
				(a, b) => b.day_of_month - a.day_of_month
        	).reduce((r, x) => {
        		if (r[x.day_of_month] == undefined) {
        			r[x.day_of_month] = [x];
        		} else {
        			
        			r[x.day_of_month].push(x);
        		}
        		return r;
        	}, {});
        }
    },
    methods: {
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
				amount: this.amount,
				description: this.description,
				day_of_month: this.day_of_month
			};
            fetch('spending', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            })
            .then(() => {
            	this.budget_categoryid = '';
            	this.amount = 0;
            	this.description = '';
            	this.day_of_month = null;
				this.spending.unshift(data);
			});
        }
    }
});

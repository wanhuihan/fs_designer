
// 

app.service("design", function() {

	return {

		switchShow: function(a,b) {
			if (a == 1) {
				return true;
			} else {
				return false;
			}
		},

		removeItem: function(arr, i) {
			arr.splice(i,1);
			console.log(this.switchShow)
		},

		showSwitch: function(name, val) {

			jQuery('input[name='+name+']').parent(".col-md-12").find(".additional_info");

			if (this.switchShow(val)) {

				jQuery('input[name='+name+']').parent(".col-md-12").find(".additional_info").show();

			} else {

				jQuery('input[name='+name+']').parent(".col-md-12").find(".additional_info").hide();
			}
		}
	}

})
module.exports = {
	normalizeErrors: function(errors) {
		let normalizeErrors = [];
		for (let properties in errors) {
			if(errors.hasOwnProperty(properties)){
				normalizeErrors.push({title: properties, detail: errors[properties].message});
			}
		}

		return normalizeErrors;
	}
}
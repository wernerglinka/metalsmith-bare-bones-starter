module.exports = {
	extends: ['stylelint-config-standard-scss'],
	rules: {
		'selector-class-pattern': [
			'^.[a-z]([-]?[a-z0-9]+)*(__[a-z0-9]([-]?[a-z0-9]+)*)?(--[a-z0-9]([-]?[a-z0-9]+)*)?$',
			{ message: 'Expected custom property name "%s" to be BEM case' },
		],
	},
};


// Import node modules.

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

exports.handler = async function( event, context ) {

	console.log( "Probe-cron called." );

	return({
		statusCode: 200,
		body: ""
	});

};

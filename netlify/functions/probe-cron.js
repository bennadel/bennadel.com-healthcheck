
// Import node modules.
var axios = require( "axios" );

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

exports.handler = async function( event, context ) {

	try {

		var apiResponse = await axios({
			method: "get",
			url: "https://www.bennadel.com/index.cfm?event=probe.healthcheck",
			timeout: 3000
		});

		console.log( "Healthcheck passed." );

	} catch ( error ) {

		if ( error.response ) {

			console.log( `Healthcheck returned with non-200 status code [${ error.response.status }].` );
			console.log( "TODO: Call postmark API." );

		} else {

			console.log( "Healthcheck could not make outbound request." );
			console.log( error.message );

		}

	}

	return({
		statusCode: 200,
		body: ""
	});

};

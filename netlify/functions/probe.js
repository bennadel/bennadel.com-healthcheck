
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
		var statusText = "All systems are OK.";

	} catch ( error ) {

		var statusText = ( error.response )
			? `Probe responded with status code [${ error.response.status }].`
			: `Unexpected error [${ error.message }].`
		;

		// If the response exists on the error object, it means that the request was made
		// and the origin server responded with a status code. As such, let's only log the
		// errors if there was a problem with the actual request itself (ie, an Axios
		// configuration problem).
		if ( ! error.response ) {

			console.error( error );

		}

	}

	return({
		statusCode: 200,
		headers: {
			"Content-Type": "application/x-json; charset=utf-8"
		},
		body: JSON.stringify({
			statusText: statusText
		})
	});

};

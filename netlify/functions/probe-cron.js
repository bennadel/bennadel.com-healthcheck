
// Using the dotenv package allows us to have local-versions of our ENV variables in a
// .env file while still using different build-time ENV variables in production.
require( "dotenv" ).config();

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

// Import node modules.
var axios = require( "axios" );

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

/**
* I provide the Netlify serverless function logic.
*/
exports.handler = async function( event, context ) {

	try {

		var apiResponse = await axios({
			method: "get",
			url: "https://www.bennadel.com/index.cfm?event=probe.healthcheck",
			timeout: 3000
		});

	} catch ( error ) {

		if ( error.response ) {

			console.log( `Healthcheck returned with non-200 status code [${ error.response.status }].` );
			// CAUTION: Even though we don't care about the underlying API call to
			// Postmark, we still have to AWAIT the call otherwise the Postmark API call
			// will timeout. I assume this has to do with the Function being torn-down
			// once the handler() returns.
			await sendEmail( error.response.status );

		} else {

			console.log( "Probe could not make outbound request." );
			console.log( error.message );

		}

	}

	return({
		statusCode: 200,
		body: ""
	});

};

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

/**
* I send an alert email to the boss.
*/
async function sendEmail( statusCode ) {

	try {

		var apiResponse = await axios({
			method: "post",
			headers: {
				"Accept": "application/json",
				"Content-Type": "application/json",
				"X-Postmark-Server-Token": process.env.POSTMARK_SERVER_TOKEN
			},
			url: "https://api.postmarkapp.com/email",
			data: {
				From: "ben@bennadel.com",
				To: "ben@bennadel.com",
				Subject: "!! BenNadel.com Down !! - Healthcheck failed with non-200 status code.",
				HtmlBody: `
					<h1>
						BenNadel.com Not Responding
					</h1>
					<p>
						The healthcheck has responded with a non-200 status code
						[${ statusCode }]. You best check the site to see if it is up.
					</p>
				`,
				MessageStream: "outbound"
			},
			timeout: 5000
		});

	} catch ( error ) {

		console.log( "Failed to send alert email." );
		console.log( error );

	}

}

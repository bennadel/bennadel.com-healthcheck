
var statusNode = document.querySelector( ".status" );

checkStatus();

// --------------------------------------------------------------------------- //
// --------------------------------------------------------------------------- //

async function checkStatus() {

	try {

		var apiResponse = await fetch( "/.netlify/functions/probe" );

		if ( ! apiResponse.ok ) {

			setStatusText( "Error" );
			return;

		}

		var response = await apiResponse.json();

		setStatusText( response.statusText );

	} catch ( error ) {

		setStatusText( "Error" );
		console.error( error );

	}

}


function setStatusText( value ) {

	statusNode.textContent = value;

}

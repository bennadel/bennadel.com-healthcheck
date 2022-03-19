
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

		var data = await apiResponse.json();
		setStatusText( data.statusText );

	} catch ( error ) {

		setStatusText( "Error" );
		console.error( error );

	}

}


function setStatusText( value ) {

	statusNode.textContent = value;

}

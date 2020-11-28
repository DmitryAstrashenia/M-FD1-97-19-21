function filterRequest(response) {
    let goods = {};
    for (i = 1; i < response.length; i++) {
        let good = {};
        for (j = 1; j < response[i].length; j++) {
            good[response[0][j]] = response[i][j];
        }
        goods[response[i][0]] = good;
    }
    console.log(goods);
}

function makeApiCall() {
    var params = {
        // The ID of the spreadsheet to retrieve data from.
        spreadsheetId: '1O-3EId-cgt_W8keu3oAdDINPjUf-QvYzNhwoBiDaNLg', // TODO: Update placeholder value.

        // The A1 notation of the values to retrieve.
        range: 'sheet1!A1:G100', // TODO: Update placeholder value.
    };

    var request = gapi.client.sheets.spreadsheets.values.get(params);
    request.then(function(response) {
            // TODO: Change code below to process the `response` object:
            filterRequest(response.result.values);
        },
        function(reason) {
            console.error('error: ' + reason.result.error.message);
        });
}

function initClient() {
    var API_KEY = 'AIzaSyAyusiypz_hXWbTBBgpL_GKtWw2WW98xH4'; // TODO: Update placeholder with desired API key.

    var CLIENT_ID =
        '251344779521-3m95r1vhpl3b6k6576hggb7ie5ckualb.apps.googleusercontent.com'; // TODO: Update placeholder with desired client ID.

    // TODO: Authorize using one of the following scopes:
    //   'https://www.googleapis.com/auth/drive'
    //   'https://www.googleapis.com/auth/drive.file'
    //   'https://www.googleapis.com/auth/drive.readonly'
    //   'https://www.googleapis.com/auth/spreadsheets'
    //   'https://www.googleapis.com/auth/spreadsheets.readonly'
    var SCOPE = 'https://www.googleapis.com/auth/spreadsheets.readonly';

    gapi.client.init({
        'apiKey': API_KEY,
        'clientId': CLIENT_ID,
        'scope': SCOPE,
        'discoveryDocs': ['https://sheets.googleapis.com/$discovery/rest?version=v4'],
    }).then(function() {
        gapi.auth2.getAuthInstance().isSignedIn.listen(updateSignInStatus);
        updateSignInStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
    });
}

function handleClientLoad() {
    gapi.load('client:auth2', initClient);
}

function updateSignInStatus(isSignedIn) {
    if (isSignedIn) {
        makeApiCall();
    }
}

function handleSignInClick(event) {
    gapi.auth2.getAuthInstance().signIn();
}

function handleSignOutClick(event) {
    gapi.auth2.getAuthInstance().signOut();
}
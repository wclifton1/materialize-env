<script type="text/javascript">
    // this apiKey is managed in shane's google developer account
    var apiKey = 'AIzaSyA7vutcePGMNNPpjnuUW3JxuCHDy_4_Mm0';
    var scopes = 'https://www.googleapis.com/auth/calendar';

    function handleClientLoad() {
        gapi.client.setApiKey(apiKey);
        makeApiCall();
    }

    function milToStandard(value) {
        if (value !== null && value !== undefined) { //If value is passed in
            if (value.indexOf('AM') > -1 || value.indexOf('PM') > -1) { //If time is already in standard time then don't format.
                return value;
            } else {
                if (value.length == 8) { //If value is the expected length for military time then process to standard time.
                    var hour = value.substring(0, 2); //Extract hour
                    var minutes = value.substring(3, 5); //Extract minutes
                    var identifier = 'AM'; //Initialize AM PM identifier

                    if (hour == 12) { //If hour is 12 then should set AM PM identifier to PM
                        identifier = 'PM';
                    }
                    if (hour == 0) { //If hour is 0 then set to 12 for standard time 12 AM
                        hour = 12;
                    }
                    if (hour > 12) { //If hour is greater than 12 then convert to standard 12 hour format and set the AM PM identifier to PM
                        hour = hour - 12;
                        identifier = 'PM';
                    }
                    return hour + ':' + minutes + ' ' + identifier; //Return the constructed standard time
                } else { //If value is not the expected length than just return the value as is
                    return value;
                }
            }
        }
    };


    function makeApiCall() {
        gapi.client.load('calendar', 'v3', function() {
            var request = gapi.client.calendar.events.list({
                // calendar id specific to enventure calendar
                'calendarId': '40gskl3c1kh46nrbeg9p1gnlj0@group.calendar.google.com',
                // look up only future events (after current time)
                'timeMin': new Date().toISOString()
            });
            request.execute(function(resp) {
                var futureEvents = resp.items
                    // make sure future events are sorted by date from now
                futureEvents.sort(function(a, b) {
                    return new Date(a.start.dateTime) - new Date(b.start.dateTime);
                });

                var featuredFutureEvents = []
                for (var i = 0; i < futureEvents.length; i++) {
                    if (futureEvents[i].description) {
                        if (futureEvents[i].description.indexOf('[featured]') > -1) {
                            featuredFutureEvents.push(futureEvents[i])
                        }
                    }
                }

                var html = []

                var maxLength = featuredFutureEvents.length < 3 ? featuredFutureEvents.length : 3

                for (var i = 0; i < maxLength; i++) {
                    var summary = featuredFutureEvents[i].summary
                    var description = featuredFutureEvents[i].description.slice(0, featuredFutureEvents[i].description.indexOf('\n'))
                    var location = featuredFutureEvents[i].location
                    var linkStart = featuredFutureEvents[i].description.indexOf('Link: ') + 5
                    var linkPlus = featuredFutureEvents[i].description.slice(linkStart)
                    var link = linkPlus.slice(0, linkPlus.indexOf('\n'))
                    var dateRaw = featuredFutureEvents[i].start.dateTime
                    var dateStr = new Date(dateRaw).toString()
                    var day = dateStr.slice(0, 3)
                    var month = dateStr.slice(4, 7)
                    var dayNum = dateStr.slice(8, 10)
                    var timeRaw = milToStandard(new Date(dateRaw).toLocaleTimeString()).toString().trim()
                    var ampm = timeRaw.indexOf('AM') > -1 ? 'AM' : 'PM'
                    var time = timeRaw.slice(0, timeRaw.length - 6) + ' ' + ampm

                    html.push("<div class=\"col m2 hide-on-small-only\">")
                    html.push("<h3>" + dayNum + "</h3>")
                    html.push("<h5>" + month + "</h5>")
                    html.push("</div>")
                    html.push("<div class=\"col s12 hide-on-med-and-up\">")
                    html.push("<h5>" + day + ', ' + month + ' ' + dayNum + "</h5>")
                    html.push("</div>")
                    html.push("<div class=\"col s12 m10\">")
                    html.push("<a href=\"" + link + "\"" + " target=\"_blank\">")
                    html.push("<div class=\"card-panel\">")
                    html.push("<h5 class=\"medium\">" + summary + "</h5>")
                    html.push("<p>" + time + ' at ' + location + "</p>")
                    html.push("<p class=\"thin\">" + description + "</p>")
                    html.push("<button class=\"waves-effect waves-light btn\">Learn More + RSVP</button>")
                    html.push("</div>")
                    html.push("</a>")
                    html.push("</div>")

                    document.getElementById("myEvent").innerHTML = html.join("")

                }
            });
        })
    }
</script>
<script src="https://apis.google.com/js/client.js?onload=handleClientLoad"></script>
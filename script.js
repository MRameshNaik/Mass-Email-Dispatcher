(function(){
    //replace it with your emailjs userID
    emailjs.init("ZNLlDJQrh77TnSOHb");
})();

function sendEmails() {
    var senderEmail = document.getElementById("senderEmail").value;
    var message = document.getElementById("message").value;
    var subject = document.getElementById("subject").value;

    var validEmails = [];
    var invalidEmails = [];

    // To read from csv file
    var file = document.getElementById("csvfile").files[0];
    var reader = new FileReader();
    reader.readAsText(file);
    reader.onload = function(event) {
        var csv = event.target.result;
        var lines = csv.split('\n');
        for (var i = 0; i < lines.length; i++) {
            var email = lines[i].trim();
            var emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,3}$/;
            if (emailRegex.test(email)) {
                validEmails.push(email);
            } else {
                invalidEmails.push(email);
            }
        }

        // Code to send emails to valid email addresses
        for (var j = 0; j < validEmails.length; j++) {
            var templateParams = {
                to_name: validEmails[j],
                from_name: senderEmail,
                message_html: message,
                subject_html: subject
            };

            // Replace your service ID and Template ID below
            emailjs.send('service_u8jkmlk', 'template_8r05fzo', templateParams)
                .then(function(response) {
                    console.log("Success", response);
                }, function(error) {
                    console.log('Failed', error);
                });
        }
        alert("Emails sent to valid email addresses.");
    };
}

document.getElementById("csvfile").addEventListener("change", function() {
    var validEmails = [];
    var invalidEmails = [];

    // Read content of csv file
    var file = document.getElementById("csvfile").files[0];
    var reader = new FileReader();
    reader.readAsText(file);
    reader.onload = function(event) {
        var csv = event.target.result;
        var lines = csv.split('\n');
        for (var i = 0; i < lines.length; i++) {
            var email = lines[i].trim();
            var emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,3}$/;
            if (emailRegex.test(email)) {
                validEmails.push(email);
            } else {
                invalidEmails.push(email);
            }
        }
        // Display valid and invalid emails
        document.getElementById("validEmails").innerHTML = validEmails.join("<br><br>");
        document.getElementById("invalidEmails").innerHTML = invalidEmails.join("<br><br>");
        document.getElementById("validEmailCount").innerText = "(" + validEmails.length + ")";
        document.getElementById("invalidEmailCount").innerText = "(" + invalidEmails.length + ")";
    };
});

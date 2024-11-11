<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Retrieve form data and sanitize inputs
    $patient_name = htmlspecialchars($_POST['patient_name']);
    $dob = htmlspecialchars($_POST['dob']);
    $address = htmlspecialchars($_POST['address']);
    $city_state_zip = htmlspecialchars($_POST['city_state_zip']);
    $phone = htmlspecialchars($_POST['phone']);
    $email = filter_var($_POST['email'], FILTER_SANITIZE_EMAIL);
    $insurance_plan = htmlspecialchars($_POST['insurance_plan']);
    $member_id = htmlspecialchars($_POST['member_id']);
    $group_number = htmlspecialchars($_POST['group_number']);

    $reason_for_referral = htmlspecialchars($_POST['reason_for_referral']);
    $other_comments = htmlspecialchars($_POST['other_comments']);
    $urgency = htmlspecialchars($_POST['urgency']);

    $eye = isset($_POST['eye']) ? implode(", ", $_POST['eye']) : '';

    $doctor_name = htmlspecialchars($_POST['doctor_name']);
    $practice_name = htmlspecialchars($_POST['practice_name']);
    $office_address = htmlspecialchars($_POST['office_address']);
    $doctor_phone = htmlspecialchars($_POST['doctor_phone']);
    $doctor_fax = htmlspecialchars($_POST['doctor_fax']);

    // Validate email
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo "Invalid email format";
        exit;
    }

    // Prepare the email content
    $to = "juliefurlan@cascaderetina.com";
    $subject = "New Patient Referral from Dr. " . $doctor_name;
    $message = "
    <html>
    <head>
        <title>Patient Referral Form</title>
    </head>
    <body>
        <h2>Patient Information</h2>
        <p><strong>Name:</strong> {$patient_name}</p>
        <p><strong>DOB:</strong> {$dob}</p>
        <p><strong>Address:</strong> {$address}</p>
        <p><strong>City, State, Zip:</strong> {$city_state_zip}</p>
        <p><strong>Phone:</strong> {$phone}</p>
        <p><strong>Email:</strong> {$email}</p>
        <p><strong>Insurance Plan:</strong> {$insurance_plan}</p>
        <p><strong>Member ID:</strong> {$member_id}</p>
        <p><strong>Group Number:</strong> {$group_number}</p>

        <h2>Reason for Referral</h2>
        <p>{$reason_for_referral}</p>

        <h2>Other Comments</h2>
        <p>{$other_comments}</p>

        <h2>Urgency</h2>
        <p>{$urgency}</p>

        <h2>Eye</h2>
        <p>{$eye}</p>

        <h2>Referring Doctor</h2>
        <p><strong>Name:</strong> Dr. {$doctor_name}</p>
        <p><strong>Practice Name:</strong> {$practice_name}</p>
        <p><strong>Office Address:</strong> {$office_address}</p>
        <p><strong>Phone:</strong> {$doctor_phone}</p>
        <p><strong>Fax:</strong> {$doctor_fax}</p>
    </body>
    </html>
    ";

    // Set content-type header for HTML email
    $headers = "MIME-Version: 1.0" . "\r\n";
    $headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";

    // Additional headers
    $headers .= 'From: <'.$email.'>' . "\r\n";

    // Send the email
    if (mail($to, $subject, $message, $headers)) {
        echo "<h2>Referral form submitted successfully.</h2>";
    } else {
        echo "<h2>There was an error sending the referral form. Please try again later.</h2>";
    }
}
?>

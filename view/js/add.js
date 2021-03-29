$(document).ready(function(){
    /**
     * This function will create a valid object to send to the server (which will send it to the database)
     */
     function assemble(){
        let c = {};
        c.id = $("#add-id").val();
        c.bday = $("#add-bday").val();
        c.dday = $("#add-dday").val();
        c.ssn = $("#add-ssn").val();
        c.drivers = $("#add-drivers").val();
        c.passport = $("#add-passport").val();
        c.prefix = $("#add-prefix").val();
        c.first = $("#add-first").val();
        c.last = $("#add-last").val();
        c.suffix = $("#add-suffix").val();
        c.maiden = $("#add-maiden").val();
        c.marital = $("#add-marital").val();
        c.race = $("#add-race").val();
        c.ethnicity = $("#add-ethnicity").val();
        c.gender = $("#add-gender").val();
        c.birthplace = $("#add-birthplace").val();
        c.address = $("#add-address").val();
        c.city = $("#add-city").val();
        c.state = $("#add-state").val();
        c.county = $("#add-county").val();
        c.zip = $("#add-zip").val();
        c.lat = $("#add-lat").val();
        c.lon = $("#add-lon").val();
        c.healthExpenses = $("#add-healthExpenses").val();
        c.healthCoverage = $("#add-healthCoverage").val();
        c.symptoms = $("#add-symptoms").val();
        return c;
    }
	
	$("#add-patient-btn").click(function(event){
        event.preventDefault();
        let patient = assemble();
        $.ajax({
            url: '/system',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(patient),
            success: function(response){
                console.log(JSON.stringify(response.msg));
                $("#add-out").text(response.msg);
            },        
            error: function(xhr, status, error){
                var errorMessage = xhr.status + ': ' + xhr.statusText
                alert('Error - ' + errorMessage);
            }
        });
    });
  });

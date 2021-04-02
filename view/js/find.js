$(document).ready(function(){
    /**
     * This method will be reused everytime a new event happens in this tab.
     * If there's data to be showed, it will fill the form values,
     * otherwise it will clean it. 
     * It will mainly clean if the user searches for a user that does not 
     * exists
     * @param {*} data 
     */
    function fillFindContainer(data){
        if (data){
            $("#find-id").val(data.id);
            $("#find-bday").val(data.bday);
            $("#find-dday").val(data.dday);
            $("#find-ssn").val(data.ssn);
            $("#find-drivers").val(data.drivers);
            $("#find-passport").val(data.passport);
            $("#find-prefix").val(data.prefix);
            $("#find-first").val(data.first);
            $("#find-last").val(data.last);
            $("#find-suffix").val(data.suffix);
            $("#find-maiden").val(data.maiden);
            $("#find-marital").val(data.marital);
            $("#find-race").val(data.race);
            $("#find-ethnicity").val(data.ethnicity);
            $("#find-gender").val(data.gender);
            $("#find-birthplace").val(data.birthplace);
            $("#find-address").val(data.address);
            $("#find-city").val(data.city);
            $("#find-state").val(data.state);
            $("#find-county").val(data.county);
            $("#find-zip").val(data.zip);
            $("#find-lat").val(data.lat);
            $("#find-lon").val(data.lon);
            $("#find-healthExpense").val(data.healthExpenses);
            $("#find-healthCoverage").val(data.healthCoverage);
            $("#find-symptoms").val(data.symptoms);
        }else{
            $("#find-id").val("");
            $("#find-bday").val("");
            $("#find-dday").val("");
            $("#find-ssn").val("");
            $("#find-drivers").val("");
            $("#find-passport").val("");
            $("#find-prefix").val("");
            $("#find-first").val("");
            $("#find-last").val("");
            $("#find-suffix").val("");
            $("#find-maiden").val("");
            $("#find-marital").val("");
            $("#find-race").val("");
            $("#find-ethnicity").val("");
            $("#find-gender").val("");
            $("#find-birthplace").val("");
            $("#find-address").val("");
            $("#find-city").val("");
            $("#find-state").val("");
            $("#find-county").val("");
            $("#find-zip").val("");
            $("#find-lat").val("");
            $("#find-lon").val("");
            $("#find-healthExpense").val("");
            $("#find-healthCoverage").val("");
            $("#find-symptoms").val("");
        }      
    }
    /**
     * This is an aux function to assemble the object contact.
     * It will be used mainly to the update function
     */
     function assemble(){
        let c = {};
        c.id = $("#find-id").val();
        c.bday = $("#find-bday").val();
        c.dday = $("#find-dday").val();
        c.ssn = $("#find-ssn").val();
        c.drivers = $("#find-drivers").val();
        c.passport = $("#find-passport").val();
        c.prefix = $("#find-prefix").val();
        c.first = $("#find-first").val();
        c.last = $("#find-last").val();
        c.suffix = $("#find-suffix").val();
        c.maiden = $("#find-maiden").val();
        c.marital = $("#find-marital").val();
        c.race = $("#find-race").val();
        c.ethnicity = $("#find-ethnicity").val();
        c.gender = $("#find-gender").val();
        c.birthplace = $("#find-birthplace").val();
        c.address = $("#find-address").val();
        c.city = $("#find-city").val();
        c.state = $("#find-state").val();
        c.county = $("#find-county").val();
        c.zip = $("#find-zip").val();
        c.lat = $("#find-lat").val();
        c.lon = $("#find-lon").val();
        c.healthExpenses = $("#find-healthExpense").val();
        c.healthCoverage = $("#find-healthCoverage").val();
        c.symptoms = $("#find-symptoms").val();
        
        return c;
    }
    /**
     * This function binds an event to the find contact button.
     */
    $("#btn-find-patient").click(function(event){
        event.preventDefault();
        let patient_id = $("#find-id-search").val();
        $.ajax({
            url: '/system/'+patient_id,
            type: 'GET',
            contentType: 'application/json',                        
            success: function(response){
                console.log(response);
                $("#find-out").text(response.msg);
                fillFindContainer(response.patients);              
            },                   
            error: function(xhr, status, error){
                var errorMessage = xhr.status + ': ' + xhr.statusText
                alert('Error - ' + errorMessage);
            }
        });
    });
    /**
     * This function will bind an event to the update button.
     */
    $("#btn-update-patient").click(function(event){
        event.preventDefault();
        console.log("clicked once");
        let patient_id = $("#find-id-search").val();
        let patient = assemble();
        console.log("Patient: from within find.js: " + JSON.stringify(patient));
        $.ajax({
            url: 'system/'+patient_id,
            type: 'PUT',
            data: JSON.stringify(patient),
            contentType: 'application/json',                        
            success: function(response){
                console.log("Patient ID: " + patient_id);
                console.log(response);
                $("#update-delete-out").text(response.msg);                
            },                   
            error: function(xhr, status, error){
                console.log("Patient ID: " + patient_id);
                var errorMessage = xhr.status + ': ' + xhr.statusText
                alert('Error - ' + errorMessage);
            }
        });
    });
    /**
     * This function will bind an event to the delete button
     */
    $("#btn-delete-patient").click(function(event){
        event.preventDefault();
        let patient_id = $("#find-id-search").val();
        $.ajax({
            url: '/system/'+patient_id,
            type: 'DELETE',
            contentType: 'application/json',                        
            success: function(response){
                console.log(response);
                $("#update-delete-out").text(response.msg);

                fillFindContainer(null);              
            },                   
            error: function(xhr, status, error){
                var errorMessage = xhr.status + ': ' + xhr.statusText
                alert('Error - ' + errorMessage);
            }
        });
    });
});

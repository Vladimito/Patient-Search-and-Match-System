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
            $("#financial-id").val(data.id);
            $("#financial-bday").val(data.bday);
            $("#financial-dday").val(data.dday);
            $("#financial-ssn").val(data.ssn);
            $("#financial-drivers").val(data.drivers);
            $("#financial-passport").val(data.passport);
            $("#financial-prefix").val(data.prefix);
            $("#financial-first").val(data.first);
            $("#financial-last").val(data.last);
            $("#financial-suffix").val(data.suffix);
            $("#financial-maiden").val(data.maiden);
            $("#financial-marital").val(data.marital);
            $("#financial-race").val(data.race);
            $("#financial-ethnicity").val(data.ethnicity);
            $("#financial-gender").val(data.gender);
            $("#financial-birthplace").val(data.birthplace);
            $("#financial-address").val(data.address);
            $("#financial-city").val(data.city);
            $("#financial-state").val(data.state);
            $("#financial-county").val(data.county);
            $("#financial-zip").val(data.zip);
            $("#financial-lat").val(data.lat);
            $("#financial-lon").val(data.lon);
            $("#financial-healthExpense").val(data.healthExpenses);
            $("#financial-healthCoverage").val(data.healthCoverage);
            $("#financial-total").val((data.healthExpenses > data.healthCoverage) ? (data.healthExpenses - data.healthCoverage) : 0);
        }else{
            $("#financial-id").val("");
            $("#financial-bday").val("");
            $("#financial-dday").val("");
            $("#financial-ssn").val("");
            $("#financial-drivers").val("");
            $("#financial-passport").val("");
            $("#financial-prefix").val("");
            $("#financial-first").val("");
            $("#financial-last").val("");
            $("#financial-suffix").val("");
            $("#financial-maiden").val("");
            $("#financial-marital").val("");
            $("#financial-race").val("");
            $("#financial-ethnicity").val("");
            $("#financial-gender").val("");
            $("#financial-birthplace").val("");
            $("#financial-address").val("");
            $("#financial-city").val("");
            $("#financial-state").val("");
            $("#financial-county").val("");
            $("#financial-zip").val("");
            $("#financial-lat").val("");
            $("#financial-lon").val("");
            $("#financial-healthExpense").val("");
            $("#financial-healthCoverage").val("");
            $("#financial-total").val("");
        }      
    }
    /**
     * This is an aux function to assemble the object contact.
     * It will be used mainly to the update function
     */
     function assemble(){
        let c = {};
        c.id = $("#financial-id").val();
        c.bday = $("#financial-bday").val();
        c.dday = $("#financial-dday").val();
        c.ssn = $("#financial-ssn").val();
        c.drivers = $("#financial-drivers").val();
        c.passport = $("#financial-passport").val();
        c.prefix = $("#financial-prefix").val();
        c.first = $("#financial-first").val();
        c.last = $("#financial-last").val();
        c.suffix = $("#financial-suffix").val();
        c.maiden = $("#financial-maiden").val();
        c.marital = $("#financial-marital").val();
        c.race = $("#financial-race").val();
        c.ethnicity = $("#financial-ethnicity").val();
        c.gender = $("#financial-gender").val();
        c.birthplace = $("#financial-birthplace").val();
        c.address = $("#financial-address").val();
        c.city = $("#financial-city").val();
        c.state = $("#financial-state").val();
        c.county = $("#financial-county").val();
        c.zip = $("#financial-zip").val();
        c.lat = $("#financial-lat").val();
        c.lon = $("#financial-lon").val();
        c.healthExpenses = $("#financial-healthExpense").val();
        c.healthCoverage = $("#financial-healthCoverage").val();
        c.symptoms = $("#financial-symptoms")
        
        return c;
    }
    /**
     * This function binds an event to the find contact button.
     */
    $("#btn-financial-patient").click(function(event){
        event.preventDefault();
        let patient_id = $("#financial-id-search").val();
        $.ajax({
            url: '/system/'+patient_id,
            type: 'GET',
            contentType: 'application/json',                        
            success: function(response){
                console.log(response);
                $("#financial-out").text(response.msg);
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
        let patient_id = $("#financial-id-search").val();
        let patient = assemble();
        $.ajax({
            url: '/system/update/'+patient_id,
            type: 'PUT',
            data: JSON.stringify(patient),
            contentType: 'application/json',                        
            success: function(response){
                console.log(response);
                $("#update-delete-out").text(response.msg);                
            },                   
            error: function(xhr, status, error){
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
        let patient_id = $("#financial-id-search").val();
        $.ajax({
            url: '/system/delete/'+patient_id,
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

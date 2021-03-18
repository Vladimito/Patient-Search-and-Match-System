(document).ready(function(){
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
            $("#race").val(data.race);
            $("#ethnicity").val(data.ethnicity);
            $("#gender").val(data.gender);
            $("#birthplace").val(data.birthplace);
            $("#address").val(data.address);
            $("#city").val(data.city);
            $("#state").val(data.state);
            $("#county").val(data.county);
            $("#zip").val(data.zip);
            $("#lat").val(data.lat);
            $("#lon").val(data.lon);
            $("#healthExpenses").val(data.healthExpenses);
            $("#healthCoverage").val(data.healthCoverage);
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
            $("#race").val("");
            $("#ethnicity").val("");
            $("#gender").val("");
            $("#birthplace").val("");
            $("#address").val("");
            $("#city").val("");
            $("#state").val("");
            $("#county").val("");
            $("#zip").val("");
            $("#lat").val("");
            $("#lon").val("");
            $("#healthExpenses").val("");
            $("#healthCoverage").val("");
        }      
    }
    /**
     * This is an aux function to assemble the object contact.
     * It will be used mainly to the update function
     */
     function assemble(){
        let c = {};
        c.id = $("#add-id").val();
        c.bday = $("add-bday").val();
        c.dday = $("add-dday").val();
        c.ssn = $("add-ssn").val();
        c.drivers = $("add-drivers").val();
        c.passport = $("add-passport").val();
        c.prefix = $("add-prefix").val();
        c.first = $("add-first").val();
        c.last = $("add-last").val();
        c.suffix = $("add-suffix").val();
        c.maiden = $("add-maiden").val();
        c.marital = $("add-marital").val();
        c.race = $("add-race").val();
        c.ethnicity = $("add-ethnicity").val();
        c.gender = $("add-gender").val();
        c.birthplace = $("add-birthplace").val();
        c.address = $("add-address").val();
        c.city = $("add-city").val();
        c.state = $("add-state").val();
        c.county = $("add-county").val();
        c.zip = $("add-zip").val();
        c.lat = $("add-lat").val();
        c.lon = $("add-lon").val();
        c.healthExpenses = $("add-healthExpenses").val();
        c.healthCoverage = $("add-healthCoverage").val();
        
        return c;
    }
    /**
     * This function binds an event to the find contact button.
     */
    $("#btn-find-patient").click(function(event){
        event.preventDefault();
        let contact_id = $("#find-id-search").val();
        $.ajax({
            url: '/patients/'+contact_id,
            type: 'GET',
            contentType: 'application/json',                        
            success: function(response){
                console.log(response);
                $("#find-out").text(response.msg);
                fillFindContainer(response.data);              
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
        let contact_id = $("#find-id-search").val();
        let contact = assemble();
        $.ajax({
            url: '/patients/'+patient_id,
            type: 'PUT',
            data: JSON.stringify(contact),
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
        let contact_name = $("#find-id-search").val();
        $.ajax({
            url: '/patients/'+patient_id,
            type: 'DELETE',
            contentType: 'application/json',                        
            success: function(response){
                // console.log(JSON.stringify(response));
                console.log(response);
                $("#update-delete-out").text(response.msg);
                // We clear the fields after the data is deleted
                fillFindContainer(null);              
            },                   
            error: function(xhr, status, error){
                var errorMessage = xhr.status + ': ' + xhr.statusText
                alert('Error - ' + errorMessage);
            }
        });
    });
});

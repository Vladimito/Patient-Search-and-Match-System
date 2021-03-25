/**
 * This script manages the LIST tab
 */

$(document).ready(function(){
    $("#btn-list-all").click(function(event){
        event.preventDefault();
        $("#list-patients").empty();
        
        //$("#list-patients").append(tbl);
        // Here we query the server-side
        $.ajax({
            url: '/system/all',
            type: 'GET',
            contentType: 'application/json',                        
            success: function(response){
                console.log(response);
				let tbl_line='';
                for(let i = 0; i < response["patients"].length; i++) {
                    let obj = response["patients"][i];
                    /**  To add an effect in the table, we can apply
                         even and odd classes. */                    
                    if (i%2 ==0){
                        tbl_line = '<tr class="even-row"><td>'+obj.last+'</td><td>'+obj.first+'</td><td>'+obj.bday+'</td><td>'+obj.dday+'</td><td>'+obj.drivers+'</td><td>'+obj.passport+'</td><td>'+obj.race+'</td><td>'+obj.ethnicity+'</td><td>'+obj.gender+'</td><td>'+obj.birthplace+'</td><td>'+obj.address+'</td><td>'+obj.city+'</td><td>'+obj.county+'</td><td>'+obj.zip+'</td><td>'+obj.healthExpenses+'</td><td>'+obj.healthCoverage+'</td><tr/>';
                    }else{
                        tbl_line = '<tr class="odd-row"><td>'+obj.last+'</td><td>'+obj.first+'</td><td>'+obj.bday+'</td><td>'+obj.dday+'</td><td>'+obj.drivers+'</td><td>'+obj.passport+'</td><td>'+obj.race+'</td><td>'+obj.ethnicity+'</td><td>'+obj.gender+'</td><td>'+obj.birthplace+'</td><td>'+obj.address+'</td><td>'+obj.city+'</td><td>'+obj.county+'</td><td>'+obj.zip+'</td><td>'+obj.healthExpenses+'</td><td>'+obj.healthCoverage+'</td><tr/>';
                    }                    
                    $("#table-list").append(tbl_line)
                }
				let tbl = '<table id="table-list"><tr><th>Surname</th><th>Given Name</th><th>SSN</th><th>Birthday</th><th>Date of Death</th><th>Drivers License</th><th>Passport</th><th>Race</th><th>Ethnicity</th><th>Gender</th><th>Birthplace</th><th>Address</th><th>City</th><th>County/Region</th><th>Postal Code</th><th>Expenses</th><th>Coverage</th></tr></table>';
            $("#list-patients").append(tbl);
			},
            // If there's an error, we can use the alert box to make sure we understand the problem
            error: function(xhr, status, error){
                var errorMessage = xhr.status + ': ' + xhr.statusText
                alert('Error - ' + errorMessage);
            }
        });
    });

    /*
    $("#search-patient-btn").click(function(event){
        event.preventDefault();
        $("#list-symptoms").empty();
    });*/
    
});  
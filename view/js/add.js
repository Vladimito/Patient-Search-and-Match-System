$(document).ready(function(){
    /**
     * This function will create a valid object to send to the server (which will send it to the database)
     */
	 function assemble(){
        let c = {};
        c.first = $("#add-firstname").val();
        c.last = $("#add-lastname").val();
        c.ssn = $("#add-ssn").val();
        c.bday = $("#add-bday").val();
		c.race = $("#add-race").val();
		c.ethnicity = $("#add-ethnicity").val();
		c.gender = $("#add-gender").val();
		c.birthplace = $("#add-birthplace").val();
		c.address = $("#add-address").val();
		c.city = $("#add-city").val();
		c.county = $("#add-county").val();
		c.zip = $("#add-zip").val();
        return c;
    }
	
	$("#add-contact-btn").click(function(event){
        event.preventDefault();
        let book = assemble();
        $.ajax({
            url: '/system',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(book),
            success: function(response){
                console.log(JSON.stringify(response));
                $("#add-out").text(response);
            },        
            error: function(xhr, status, error){
                var errorMessage = xhr.status + ': ' + xhr.statusText
                alert('Error - ' + errorMessage);
            }
        });
    });
  });

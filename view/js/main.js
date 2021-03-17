/**
 * This script allows for the tabs to be changed
 */
$(document).ready(function(){
    function changeDivComponents(tab_element_clicked){
        $(".tabcontent").each(function(index){
            let this_id = $(this).attr('id');
            if (this_id.includes(tab_element_clicked.toLowerCase())){
                $(this).show();
            }else{
                $(this).hide();
            }                    
        });
    }
    $(".tablinks").click(function(){
        changeDivComponents($(this).text());
    });
});

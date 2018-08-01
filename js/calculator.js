/*--------------------------------------------------------------------------------
------------------------  Variables Globales-------------------------------------
--------------------------------------------------------------------------------*/ 
    var ambulation = 0;
	var pyramidal = 0;
	var cerebellar = 0;
	var brainstem = 0;
	var sensory = 0;
	var bowel = 0;
	var visual = 0;
	var cerebral = 0;
	var other = 0;
	var fs = 0;
	var activeAmbulation = false;

/*--------------------------------------------------------------------------------
------------------------Function Conditionals-------------------------------------
--------------------------------------------------------------------------------*/

function seleted(e) {
    var id = e.target.id;
    var categoryAmbulation = id.substring(0, 10);
	var category = id.substring(0, id.length - 2);
    $(e.target.id).addClass( "seleted" );
    $( "#" + category).addClass( "seleted" );
    $( ".w--open a:not(.seleted)").removeClass("opt-seleted");
	$( "#" + id).addClass( "opt-seleted" );
	setTimeout(function(){ 
		$('.dropdownback.w-dropdown-list').removeClass("w--open");
	}, 500);
	

/*------------ Calculate Ambulation score & FS score----------------------------*/

    if (categoryAmbulation == 'ambulation'){
    	var content = $( "#" + id).text();
    	var val = parseFloat(content.substring(0, content.search("-") - 1));
		ambulation = val;
		valor2 = ambulation.toString();
    	
    	if (val != 0){
			activeAmbulation = true;
			$("#points-result").text(ambulation);
			$("#block-ambulation").text(valor2).addClass("seleted-text-bloq2");
			$("#" + category + ".seleted .text-block-2").addClass( "seleted-text-bloq2" );

			
    	}else{
			activeAmbulation = false;
    		$("#points-result").text(fs);
			$("#block-ambulation").text("0").removeClass("seleted-text-bloq2");
			
    	}	
    }else{
    	var val = id.substring(id.length - 2, id.length);
    	var value = parseInt(val.replace('-',''))-1;
    	$( "#" + category + ".seleted .text-block-2" ).html( value );

    	if(category == 'pyramidal'){
	    	pyramidal = value;	    	
	    }
	    if(category == 'cerebellar'){
	    	cerebellar = value;
	    }
	    if(category == 'brainstem'){
	    	brainstem = value;
	    }
	    if(category == 'sensory'){
	    	sensory = value;
	    }
	    if(category == 'bowel'){
	    	bowel = value;
	    }
	    if(category == 'visual'){
	    	visual = value;
	    }
	    if(category == 'cerebral'){
	    	cerebral = value;
	    }
	    if(category == 'other'){
	    	other = value;
	    }

	    if (value > 0){
	    	$("#" + category + ".seleted .text-block-2").addClass( "seleted-text-bloq2" );
	    }else{
			$("#" + category + ".seleted .text-block-2").removeClass( "seleted-text-bloq2" );	    	
	    }

	    var array = [pyramidal,cerebellar,brainstem,sensory,bowel,visual,cerebral,other];
		var gmenor = 0;
		var g0 = 0;
		var g1 = 0;
	    var g2 = 0;
	    var g3 = 0;
	    var g4 = 0;
	    var g5 = 0;
		var g6 = 0;
		var g7 = 0;

	    for (let i = 0; i <= array.length - 1; i++){
			if(array[i] == 0){
	    		g0++;
			}
			else if(array[i] == 1){
	    		g1++;
	    	}
			else if(array[i] == 2){
	    		g2++;
	    	}else if(array[i] == 3){
	    		g3++;
	    	}else if(array[i] == 4){
	    		g4++;
	    	}else if(array[i] == 5){
	    		g5++;
	    	}else if(array[i] == 6){
	    		g6++;
			}
			else if(array[i] == 7){
	    		g7++;
	    	}
		}

		console.log(g1);
		console.log(cerebral);

/*---------------------------- Calculate Points FS-------------------------------*/	
		
		if((pyramidal == 0) && (cerebellar == 0) && (brainstem==0) && (sensory==0) && (bowel==0) && (visual==0)
		&& (other == 0) && ((cerebral == 0)||(cerebral == 1))){
			fs = '0';
		}else if(((g1 == 1) && (cerebral == 0) && ((g2 + g3 + g4 +g5 +g6 +g7)==0)) || 
		((g1 == 2) && (cerebral == 1) && ((g2 + g3 + g4 +g5 +g6 +g7)==0))){
			fs = '1';
		}else if((g1 >= 2) && ((cerebral == 0)||(cerebral == 1)) && ((g2 + g3 + g4 +g5 +g6 +g7)==0)){
			fs = '1.5';
		}else if((g2 == 1) && ((g1+g0 == 7)) || (visual == 3) && ((g1 + g0) == 7)){
			fs = '2';					
		}else if((g2 == 2) && ((g1+g0 == 6))){
			fs = '2.5';			
		}else if(((g3 == 1) && ((g1+g0) == 7)) || (((g2 == 3) ||(g2 == 4 )) && ((g3 + g4 +g5 +g6 +g7)==0)) || (((visual == 4) ||
		 (visual == 5))	&& ((g1 + g0) == 7))){
			fs = '3';			
		}else if(((visual == 4) && (g3 == 1) && ((g1 + g0) == 6)) || ((visual == 4) && (g2 == 2) && ((g1 + g0) == 5)) || 
		((g3 == 1) && ((g2 == 1) || (g2 == 2)) && ((g4 +g5 +g6 +g7)==0)) || ((g3 == 2) && (g2 <= 1) && ((g4 +g5 +g6 +g7)==0))
		 || ((g2 = 5) && ((g3 + g4 +g5 +g6 +g7)==0))){
			fs = '3.5';
		}else if(((g4 == 1) && ((g5 +g6 +g7)==0) && (visual != 4)) || ((g3 == 3) && ((g1 + g0)==5)) || ((g3 == 1) && (g2 >= 3) && 
		((g4 +g5 +g6 +g7)==0)) || (((g3 >= 2) || (g3 <= 5)) && (g2 >= 2)&& ((g4 +g5 +g6 +g7)==0)) || (visual == 6) && 
		((g1 + g0) == 7)){
			fs = '4';			
		}else if((g4 == 1) && ((g2 + g3) >= 1) && (visual < 4) && ((g4 +g5 +g6 +g7)==0) || (g3 == 5) && (visual < 3) 
		&& ((g4 +g5 +g6 +g7)==0) || (g4 == 1) && (g3 == 2) && ((g5 +g6 +g7)==0 || ((g4 == 2) && (g3 == 1) && ((g5 +g6 +g7)==0)))){
			fs = '4.5';			
		}else if((g6 == 1) || ((g4 >= 2) && (visual < 4))|| ((g5 >= 1)) && (g6 == 0) && (visual < 5)){
			fs = '5';			
		}	
		if (!activeAmbulation){
			$("#points-result").text(fs);
		}  
	}  
}







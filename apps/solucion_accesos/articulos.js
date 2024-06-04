let selectLocation;

window.onload = function(){
	setValueUserLocation('articulos');
	changeButtonColor();
	fillCatalogs();
	selectLocation= document.getElementById("selectLocation");
	selectLocation.onchange = function(){
    let response = fetchOnChangeLocation()
  };
 selectCaseta= document.getElementById("selectCaseta")
    selectCaseta.onchange = function() {
        let response = fetchOnChangeLocation()
    };
	setSpinner(true, 'divSpinner');
	let user = getCookie("userId");
	let jw = getCookie("userJwt");
	if(user !='' && jw!=''){
		//----QUery
		drawTable('tableArticles', columsData1, dataTable1);
		drawTable('tableArticlesLose', columsData2, dataTable2);
	}else{
		redirectionUrl('login',false)
	}
}

//funcion Escojer modales
function setModal(type = 'none',id){
	if(type == 'NewArticle'){
		$('#newArticleModal').modal('show');
	}else if(type == 'EditArticle'){
		$('#editArticleModal').modal('show');
	}else if(type == 'ViewArticle'){
		$('#viewArticleModal').modal('show');
	}else if(type == 'OutArticle'){
		$('#outArticleModal').modal('show');
	}else if(type == 'NewArticleConse'){
		$('#newArticleConModal').modal('show');
	}else if(type == 'ViewArticleConse'){
		$('#viewArticleConModal').modal('show');
	}else if(type == 'EditArticleConse'){
		$('#editArticleConModal').modal('show');
	}else if(type == 'OutArticleConse'){
		$('#outArticleConModal').modal('show');
	}
}




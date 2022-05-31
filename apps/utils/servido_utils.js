
// Funciones Genericas Servido

function urlParamstoJson() {
	var query_string = {};
	var query = window.location.search.substring(1);
	var vars = query.split("&");
	for (var i=0;i<vars.length;i++) {
		var pair = vars[i].split("=");
		if (typeof query_string[pair[0]] === "undefined") {
			query_string[pair[0]] = pair[1];
		} else if (typeof query_string[pair[0]] === "string") {
			var arr = [ query_string[pair[0]], pair[1] ];
			query_string[pair[0]] = arr;
		} else {
			query_string[pair[0]].push(pair[1]);
		}
	}
	return query_string;
};

function getAllElementsWithAttribute(rootNode, attribute, value){
	var matchingElements = [];
	var allElements = document.getElementsByTagName('*');
	for (var i = 0, n = allElements.length; i < n; i++){
		if (allElements[i].getAttribute(attribute) !== null &&
			allElements[i].getAttribute(attribute) === value){
			matchingElements.push(allElements[i]);
		}
	}
	return matchingElements;
}

function reset() {
  loading.style.display = 'flex';
  const user = document.getElementById('user');
  user.value = '';
  const pass = document.getElementById('pass');
  pass.value = '';

  hideLoading()
};

function hideElement(elementId) {
    const element = document.getElementById(elementId);
    // element.style.visibility = 'hidden';
    if(element){
        element.style.display = 'none';
    }
};

function unhideElement(elementId) {
    const element = document.getElementById(elementId);
    // element.style.visibility = 'visible';
    if(element){
        element.style.display = 'block';
    }
};

function hideLoading() {
  setTimeout(() => {
    loading.style.display = 'none';
  }, 1000);
};

function login() {
  loading.style.display = 'flex';
  var mensage = "Es necesario ingresar:<br /><br />";
  let err = 0;
  if(user.value == ""){
    err = 1;
    mensage += "- Usuario.<br />";
  }
  if(pass.value == ""){
    err = 1;
    mensage += "- Contraseña.<br />";
  }
  if(err == 0){
    //fetch('https://app.linkaform.com/api/infosync/user_admin/login/', {
    fetch(url + 'infosync/user_admin/login/', {
      method: 'POST',
      body: JSON.stringify({
        username: user.value,
        password: pass.value,
      }),
      headers:{
        'Content-Type': 'application/json',
      },
    })
    .then((res) => res.json())
    .then((res) => {
      if(res.code == 2){
        hideElement("inicio_ses");
        unhideElement("close_sesion");
        userId = res.user.id;
        userJwt = res.jwt;
        sessionId = res.session_id;
        userName = res.user.first_name;
        userParentId = res.user.parent_info.id;
        setCookie("sessionid", sessionId, 7);
        setCookie("userId", userId, 7);
        setCookie("userJwt", userJwt, 7);
        setCookie("userName", userName, 7);
        setCookie("userParentId", userParentId,7);
        hideLoading();
        unHideReportElements();
        if (scriptId == null) {
          console.log('Loding Demo Data');
          loadDemoData();
        }
        //---IMAGE
        if (userParentId!=null && userParentId!="")
        {
          document.getElementById("image_log").setAttribute("src", "https://f001.backblazeb2.com/file/lkf-media/company_pictures/company_pic_"+userParentId+".thumbnail")
          document.getElementById("image_log").setAttribute("width","125");
          document.getElementById("image_log").setAttribute("height","75");
        }
        // data = getFirstElementJson(date_from, date_to )
        // firstElement = drawFirstElement(userJwt);


      } else {
        hideLoading();
        Swal.fire({
          title: 'Error',
          html: res.error
        })
      }
    })
  } else {
    loading.style.display = 'none';
    Swal.fire({
      title: 'Error',
      html: mensage
    });
  }

}

function changeColor() {
  $("#tableComisiones tr").find('td:eq(6)').each(function () {
    if ($(this).text() == '3' || $(this).text() > '3') {
      $(this).closest('tr').css('background-color', '#fffb97');
    }
  })
  $("#tableComisiones tr").find('td:eq(8)').each(function () {
    if ($(this).text() == 'Fuera') {
      $(this).closest('tr').css('background-color', '#ff0000');
    }
  })
}

function setCookie(cname, cvalue, exdays) {
	var d = new Date();
	d.setTime(d.getTime() + (exdays*24*60*60*1000));
	var expires = "expires="+d.toUTCString();
	document.cookie = cname + "=" + cvalue + "; " + expires;
}

function getCookie(cname) {
	var name = cname + "=";
	 var ca = document.cookie.split(';');
	 for(var i=0; i<ca.length; i++) {
		 var c = ca[i];
		 while (c.charAt(0)==' ') c = c.substring(1);
		 if (c.indexOf(name) == 0) return c.substring(name.length,c.length);
	 }
	 return "";
}

function closeSession(){
  var cookies = document.cookie.split(";"); for (var i = 0; i < cookies.length; i++){ var spcook = cookies[i].split("="); document.cookie = spcook[0] + "=;expires=Thu, 21 Sep 1979 00:00:01 UTC;"; }
  location.reload();
}

function generarLetra(){
  var letras = ["a","b","c","d","e","f","0","1","2","3","4","5","6","7","8","9"];
  var numero = (Math.random()*15).toFixed(0);
  return letras[numero];
}

function colorHEX(){
  var coolor = "";
  for(var i=0;i<3;i++){
    coolor = coolor + generarLetra() ;
  }
  return "#005" + coolor;
}

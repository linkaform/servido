window.onload = async function(){
	setValueUserLocation('menu')
    user = getCookie("userId_soter");
    userJwt=getCookie('userJwt_soter');
    validSession(user, userJwt);
    // setCookie("menus_soter", JSON.stringify(["turnos", "accesos", "bitacoras", "notas", "incidencias", "pases"]),7)
    $("#imageUserNavbar").attr("src", localStorage.getItem("imagenURL"));
    if(getCookie('menus_soter')==""){
    	await getMenus()
    }else{
    	let menus = JSON.parse(getCookie('menus_soter'))
    	showCustomMenu(menus, 'customMenu')
    }
    customNavbar(getValueUserLocation(), getStatusTurn());
}


async function getMenus(){
	let menus= await getMenuFetch()
	setCookie("menus_soter", JSON.stringify(menus), 7);
	showCustomMenu(menus, 'customMenu') 
}



function showCustomMenu(menus, idHtmlMenu){
	$("#spinner").hide()
	let divMenu = document.getElementById(idHtmlMenu)
	let addHtml= ''
  let htmlPase=''
  let htmlTurnos=''
	for (let menu of menus ){

		if(menu=='pases'){
			htmlPase=`<div class="col">
              <div class="menu-grid-item text-center p-4"  onclick="redirectionUrl('pases');return false;">
                <i class="fa-solid fa-passport fs-1 mb-3"></i>
                <p>Pases de Entrada</p>
              </div>
            </div>`
		}
		if(menu=='bitacoras'){
			addHtml+=`<div class="col">
               <div class="menu-grid-item text-center p-4" onclick="redirectionUrl('bitacora');return false;">
                 <i class="fa-solid fa-book fs-1 mb-3"></i>
                 <p>Bitacoras</p>
               </div>
             </div>`

		}
		if(menu=='turnos'){
			htmlTurnos=`<div class="col">
              <div class="menu-grid-item text-center p-4" onclick="redirectionUrl('turnos');return false;">
                <i class="fa-solid fa-shield-halved fs-1 mb-3"></i>
                <p>Turnos / Accesos</p>
              </div>
            </div>`
		}
		if(menu=='accesos' && !menus.includes('turnos')){
			//de momento se quedara que si tienes acceso a turnos puedes entrar a accesos y viceversa, solo se habilitar la card de turnos,
			//ya que para entrar a acessos tienes que tener turno iniciado
			addHtml+=`<div class="col">
              <div class="menu-grid-item text-center p-4" onclick="redirectionUrl('turnos');return false;">
                <i class="fa-solid fa-shield-halved fs-1 mb-3"></i>
                <p>Turnos / Accesos</p>
              </div>
            </div>`
		}
		if(menu=='rondines'){
			addHtml+=`<div class="col">
               <div class="menu-grid-item text-center p-4" onclick="redirectionUrl('rondines');return false;">
                 <i class="fa-solid fa-route fs-1 mb-3"></i>
                 <p>Rondines</p>
               </div>
             </div>`
		}
		if(menu=='notas'){
			addHtml+= `<div class="col">
               <div class="menu-grid-item text-center p-4" onclick="redirectionUrl('notas');return false;">
                 <i class="fa-regular fa-note-sticky fs-1 mb-3"></i>
                 <p>Notas</p>
               </div>
             </div>`
		}
		if(menu=='articulos'){
			addHtml+=`<div class="col">
               <div class="menu-grid-item text-center p-4" onclick="redirectionUrl('articulos');return false;">
                 <i class="fa-solid fa-glasses fs-1 mb-3"></i>
                 <p>Objetos Perdidos</p>
               </div>
             </div>`
		}
        if(menu=='articulos'){
            addHtml+=`<div class="col">
               <div class="menu-grid-item text-center p-4" onclick="redirectionUrl('articulos');return false;">
                 <i class="fa-solid fa-hammer fs-1 mb-3"></i>
                 <p>Articulos consesionados</p>
               </div>
             </div>`
        }
		if(menu=='incidencias'){
			addHtml+=`<div class="col">
               <div class="menu-grid-item text-center p-4" onclick="redirectionUrl('incidencias');return false;">
                 <i class="fa-solid fa-triangle-exclamation fs-1 mb-3"></i>
                 <p>Incidencias</p>
               </div>
             </div>
             `
		}
        if(menu == "fallas"){
            addHtml+= `<div class="col">
               <div class="menu-grid-item text-center p-4" onclick="redirectionUrl('incidencias');return false;">
                 <i class="fa-regular fa-rectangle-xmark fs-1 mb-3"></i>
                 <p>Fallas</p>
               </div>
             </div>`
        }
             // `<div class="col">
             //   <div class="menu-grid-item text-center p-4">
             //     <i class="fa-solid fa-cube fs-1 mb-3"></i>
             //     <p>Paquetes</p>
             //   </div>
             // </div>`
	}
    if(!menus.length>0){
        errorAlert("No se encontraron los menus, revisa la configuracion")
    }
	divMenu.innerHTML = htmlPase + htmlTurnos + addHtml
}
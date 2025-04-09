window.onload = async function(){
  // getAllData()
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
  let htmlAccesos=''
	for (let menu of menus ){

		if(menu=='pases'){
			htmlPase=`<div class="col">
              <div class="menu-grid-item text-center p-4 d-flex flex-column align-items-center justify-content-center"  onclick="redirectionUrl('pases');return false;">
                <div>
                  <i class="fa-solid fa-passport fs-1 mb-3"></i>
                  <p>Pases de Entrada</p>
                </div>  
              </div>
            </div>`
		}
		if(menu=='bitacoras'){
			addHtml+=`<div class="col">
               <div class="menu-grid-item text-center p-4 d-flex flex-column align-items-center justify-content-center" onclick="redirectionUrl('bitacora');return false;">
                <div>
                  <i class="fa-solid fa-book fs-1 mb-3"></i>
                  <p>Bitacoras</p>
                </div>  
               </div>
             </div>`

		}
		if(menu=='turnos'){
			htmlTurnos=`<div class="col">
              <div class="menu-grid-item text-center p-4 d-flex flex-column align-items-center justify-content-center" onclick="redirectionUrl('turnos');return false;">
                <div>
                  <i class="fa-solid fa-shield-halved fs-1 mb-3"></i>
                  <p>Turnos</p>
                </div>  
              </div>
            </div>`
		}
		if(menu=='accesos'){
			//de momento se quedara que si tienes acceso a turnos puedes entrar a accesos y viceversa, solo se habilitar la card de turnos,
			//ya que para entrar a acessos tienes que tener turno iniciado
			htmlAccesos=`<div class="col">
              <div class="menu-grid-item text-center p-4 d-flex flex-column align-items-center justify-content-center" onclick="redirectionUrl('accesos');return false;">
                <div>
                  <i class="fa-solid fa-user-lock fs-1 mb-3"></i>
                  <p>Accesos</p>
                </div>  
              </div>
            </div>`
		}
		if(menu=='rondines'){
			addHtml+=`<div class="col">
               <div class="menu-grid-item text-center p-4 d-flex flex-column align-items-center justify-content-center" onclick="redirectionUrl('rondines');return false;">
                  <div>
                    <i class="fa-solid fa-route fs-1 mb-3"></i>
                    <p>Rondines</p>
                  </div>  
               </div>
             </div>`
		}
		if(menu=='notas'){
			addHtml+= `<div class="col">
               <div class="menu-grid-item text-center p-4 d-flex flex-column align-items-center justify-content-center" onclick="redirectionUrl('notas');return false;">
                  <div>
                    <i class="fa-regular fa-note-sticky fs-1 mb-3"></i>
                    <p>Notas</p>
                  </div>
               </div>
             </div>`
		}
		if(menu=='articulos'){
			addHtml+=`<div class="col">
               <div class="menu-grid-item text-center p-4 d-flex flex-column align-items-center justify-content-center" onclick="redirectionUrl('articulos');return false;">
                  <div>
                    <i class="fa-solid fa-glasses fs-1 mb-3"></i>
                    <p>Articulos Perdidos / Consesionados</p>
                  </div>  
               </div>
             </div>`
		}
		if(menu=='incidencias'){
			addHtml+=`<div class="col">
               <div class="menu-grid-item text-center p-4 d-flex flex-column align-items-center justify-content-center" onclick="redirectionUrl('incidencias');return false;">
                  <div>
                    <i class="fa-solid fa-triangle-exclamation fs-1 mb-3"></i>
                    <p>Incidencias / Fallas</p>
                  </div>
               </div>
             </div>
             `
		}
             // `<div class="col">
             //   <div class="menu-grid-item text-center p-4">
             //     <i class="fa-solid fa-cube fs-1 mb-3"></i>
             //     <p>Paquetes</p>
             //   </div>
             // </div>`
	}
    if(!menus.length>0){
      $('#buttonTurnos').hide();
      $('#buttonNotas').hide();
      Swal.fire({
        type:"warning",
        title: "Menús no configurados",
        html: `
          Actualmente no tienes menús configurados.<br>
          Por favor, solicita al administrador que los registre para continuar.<br><br>
          <small style="color: gray;">
            Nota: una vez que se configuren tus menús, cierra e inicia sesión nuevamente para cargarlos correctamente.
          </small>
        `,
        showConfirmButton:true,
      })
    }
	divMenu.innerHTML = htmlPase + htmlTurnos + htmlAccesos + addHtml
}

async function getAllData(area="", location=""){
  await fetch(url + urlScripts, {
      method: 'POST',
      body: JSON.stringify({
          script_name:'script_turnos.py',
          option:'load_shift',
          area:area,
          location:location
      }),
      headers:
      {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer '+userJwt
      },
  })
  .then(res => res.json())
  .then(res => {
    if (res.success) {
      let data=res.response.data
      if(res.response){
        let guard= data.guard
        if(guard.picture){
            localStorage.setItem("imagenURL", guard.picture);
            $("#imageUserNavbar").attr("src", localStorage.getItem("imagenURL"))
        }
      }
    }
  })
}
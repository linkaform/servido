function changeView(view){
	if(view=="continue"){
		let protocol = window.location.protocol;
		let host = window.location.host;
		let urlNew = `${protocol}//${host}/solucion_accesos/admin/contratos.html`
		window.location.href =urlNew
	}else if(view=="cancel"){
		let protocol = window.location.protocol;
		let host = window.location.host;
		let urlNew = `${protocol}//${host}/solucion_accesos/admin/login.html`
		window.location.href =urlNew
	}
}
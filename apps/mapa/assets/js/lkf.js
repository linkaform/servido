// Get data from Linkaform


function login() {
  // loading.style.display = 'flex';
  // fetch('http://192.168.0.20:8000/api/infosync/scripts/run/', {
  fetch('https://app.linkaform.com/api/infosync/user_admin/login/', {
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
    if (res.success) {
      var jwt = res.jwt
      var formNode = document.getElementById("botones");
      var mapButton = document.createElement("div");
      mapButton.setAttribute('id','test2');
      mapButton.setAttribute('onclick','drawMap()');
      mapButton.setAttribute('class','btn btn-primary');
       mapButton.textContent = 'Cargar Mapa';
      formNode.appendChild(mapButton);
      sectores = getCatalog(jwt, 81913,sectoresBase)
    }
  })
}

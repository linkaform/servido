const user = document.querySelector('#user');
const pass = document.querySelector('#pass');
const ambulancia = document.querySelector('#ambulancia');
const image = document.querySelector('#user-image');
const name = document.querySelector('#name');
const company = document.querySelector('#company');
const date = document.querySelector('#date');
const logText = document.querySelector('#log-text');
const logIcon = document.querySelector('#log-icon');
const locationText = document.querySelector('#location-text');
const authContainer = document.querySelector('.auth-status');
const authText = document.querySelector('#auth-text');
const urlParms = new URLSearchParams(window.location.search);
const locationParam = urlParms.get('location');
const loading = document.querySelector('.loading-container');
const idSolicitado = document.querySelector('#idCampo');
//
// var farmJson = {
//       'ambu': ['09', '11'],
//       'farmacos': [
//             {'nombre': 'Guantes', 'cant': ["0", "0"], 'total': "85", 'familia': 'EQUIPO DE PROTECCION PERSONAL'},
//             {'nombre': 'Tyvek l', 'cant': ["0", "0"], 'total': "21", 'familia': 'EQUIPO DE PROTECCION PERSONAL'},
//             {'nombre': 'Sol. hartman 250 ml', 'cant': ["0", "0"], 'total': "3", 'familia': 'CANALIZACION'},
//             {'nombre': 'Tyvek xxl', 'cant': ["0", "0"], 'total': "21", 'familia': 'EQUIPO DE PROTECCION PERSONAL'},
//             {'nombre': 'Alcohol pads', 'cant': ["0", "0"], 'total': "2", 'familia': 'CANALIZACION'},
//             {'nombre': 'Bolsas amarillas', 'cant': ["0", "0"], 'total': "23", 'familia': 'EQUIPO DE PROTECCION PERSONAL'},
//             {'nombre': 'Batas', 'cant': ["0", "0"], 'total': "26", 'familia': 'EQUIPO DE PROTECCION PERSONAL'},
//             {'nombre': 'Venda elástica de 30 cm (por pieza)', 'cant': ["0", "0"], 'total': "1", 'familia': 'INMOVILIZACION Y CURACIONES'},
//             {'nombre': 'Venda elástica de 10 cm (por pieza)', 'cant': ["0", "0"], 'total': "1", 'familia': 'INMOVILIZACION Y CURACIONES'},
//             {'nombre': 'Gasas normales estériles', 'cant': ["0", "0"], 'total': "9", 'familia': 'INMOVILIZACION Y CURACIONES'},
//             {'nombre': 'Tyvek xl', 'cant': ["0", "0"], 'total': "21", 'familia': 'EQUIPO DE PROTECCION PERSONAL'},
//             {'nombre': 'Cubrebocas n95', 'cant': ["0", "0"], 'total': "56", 'familia': 'EQUIPO DE PROTECCION PERSONAL'},
//             {'nombre': 'Punzs #22', 'cant': ["0", "0"], 'total': "1", 'familia': 'CANALIZACION'}
//             ]
//           };
//

loading.style.display = 'none';

function reset() {
  // user.value = '';
  // pass.value = '';
  // ambulancia.value = '';
  // name.textContent = '';
  // company.textContent = '';
  // date.textContent = '';
  // logText.textContent = '';
  // authText.textContent = '';
  // authContainer.classList.remove('unauthorized','autorized');
  // logIcon.classList.remove('fa-sign-in', 'fa-sign-out');

  loading.style.display = 'flex';

   // prTablaMax = document.getElementById("myDynamicFamily"); //Borrar tabla
   // inputs = document.getElementsByTagName('input');
   // if (prTablaMax){
   //      prTablaMax.remove();          
   //      for (var i=2; i < inputs.length; i++) {
   //        if (inputs[i].value != null ){
   //            inputs[i].value = '';    
   //        }
   //      }
   //  }

  inputs = document.getElementsByTagName('input');  //Borrar valor de inputs
  for (var i=3; i < inputs.length; i++) {
    if (inputs[i].value != null ){
      inputs[i].value = '';    
    }
  }
  
  setTimeout(() => {
      loading.style.display = 'none';
        }
    , 1000);
}


function onClick() {
  loading.style.display = 'flex';
  // fetch('http://192.168.0.20:8000/api/infosync/scripts/run/', {
  fetch('https://app.linkaform.com/api/infosync/scripts/run/', {
    method: 'POST',
    body: JSON.stringify({
      script_id: 71016,
      user: user.value,
      pass: pass.value,
      ambulancia: ambulancia.value,      
    }),
    headers:{
      'Content-Type': 'application/json',
    },
  })
  .then((res) => res.json())
  .then((res) => {
    if (res.success) {
      prTablaMax = document.getElementById("myDynamicFamily");

      if (prTablaMax){
        prTablaMax.remove();
      }

      appDiv = document.getElementById("appCont");
      const tabla = document.createElement("div");
      const tabla1 = document.createElement("div");
      const tabla2 = document.createElement("div");
      const tabla3 = document.createElement("div");
      const tabla4 = document.createElement("div");      
      const npTotal = document.createElement("p");    //p total
      const ntotaltext = document.createElement("b"); //b total

      npTotal.setAttribute('id', 'parrafTotal');
      npTotal.setAttribute('class', 'card-text');
      ntotaltext.setAttribute('id', 'tot');

      tabla.setAttribute('class', 'row');
      tabla.setAttribute('id', 'myDynamicFamily');
      tabla1.setAttribute('class', 'row');
      tabla1.setAttribute('id', 'myDynamicTable');
      tabla2.setAttribute('class', 'row');
      tabla2.setAttribute('id', 'myDynamicTable2');
      tabla3.setAttribute('class', 'row');
      tabla3.setAttribute('id', 'myDynamicTable3');
      tabla4.setAttribute('class', 'row');
      tabla4.setAttribute('id', 'myDynamicTable4');

      appDiv.appendChild(tabla);
      npTotal.appendChild(ntotaltext);
      tabla1.appendChild(npTotal);
      tabla.appendChild(tabla1);
      tabla.appendChild(tabla2);
      tabla.appendChild(tabla3);
      tabla.appendChild(tabla4);
      

      var farmJson = res.response;      

      //name.textContent = Object.keys(res.response);

      //Encabezado Familia
      tableFam = document.getElementById("myDynamicFamily");
            
      var i;

      const family = document.createElement("p");
      const bFamily = document.createElement("b");
      const familiaFarm = document.createTextNode("FAMILIA");

      bFamily.appendChild(familiaFarm);
      family.appendChild(bFamily);
      tableFam.appendChild(family);

      family.style.width = "23%";
      family.style.marginTop = "65px";
      bFamily.style.marginLeft = "15px";
      tableFam.style.width = "100%";

      if( farmJson.ambu[0] == null ){
        family.remove();
      }

      //Encabezado Total
      table = document.getElementById("myDynamicTable");

      const pTotal = document.getElementById("parrafTotal"); //p total
      const totaltext = document.getElementById("tot"); //b total
      const strtotal = document.createTextNode("TOTAL");

      totaltext.appendChild(strtotal);
      pTotal.appendChild(totaltext);

      pTotal.style.textAlign = "center";
      pTotal.style.width = "10%";
      pTotal.style.marginTop = "25px";

      if( farmJson.ambu[0] == null ){
        pTotal.remove();
      }

      //Encabezado Ambulancias
      for (i = 0; i < farmJson.ambu.length; i++){
          const newDiv = document.createElement("div");
          const newrow = document.createElement("div");
          const sol = document.createElement("div");
          const surtido = document.createElement("div");
          const newContent = document.createTextNode(farmJson.ambu[i]);
          colSol = document.createTextNode('Sol');
          colSurt = document.createTextNode('Surt');

          newDiv.setAttribute('class', 'col');
          newrow.setAttribute('class', 'row');
          sol.setAttribute('class', 'col');
          surtido.setAttribute('class', 'col');

          sol.appendChild(colSol);
          newrow.appendChild(sol);
          surtido.appendChild(colSurt);
          newrow.appendChild(surtido);
          newDiv.appendChild(newContent);
          newDiv.appendChild(newrow);
          table.appendChild(newDiv);
          tableFam.appendChild(table);

          table.style.width = "77%";
          table.style.marginLeft = "2.3px";
          newDiv.style.textAlign = "center";
          newDiv.style.backgroundColor = "#5c7490";
          newDiv.style.color = "#edf2fb";
          newDiv.style.padding = "5px";
          newDiv.style.margin = "1px";
          table.style.marginTop = "40px";
      }

      table2 = document.getElementById("myDynamicTable2");

      if( farmJson.ambu[0] == null ){
        const pAviso = document.createElement("p");
        const bAviso = document.createElement("b");
        const aviso = document.createTextNode("LA AMBULANCIA NO TIENE REGISTROS ");

        bAviso.appendChild(aviso);
        pAviso.appendChild(bAviso);
        table2.appendChild(pAviso);

        pAviso.style.textAlign = "center";
        pAviso.style.width = "100%";
        bAviso.style.fontSize = "16px";
        pAviso.style.marginTop = "32px";
        table2.style.width = "100%";
        table2.style.marginLeft = "10%";
      }

      //*** COLUMNAS: FAMILIA, FARMACOS Y TOTAL***
      for (i = 0; i < farmJson.farmacos.length; i++){

          const filaMayor = document.createElement("div");
          const column = document.createElement("div");

          filaMayor.setAttribute('class', 'row');
          column.setAttribute('class', 'col');

          filaMayor.style.width = "70%";
          filaMayor.style.marginLeft = "2px";

          //Familia
          const parrafoFam = document.createElement("p"); //p familia
          const textoFam = document.createElement("span"); //span familia
          const newContentFam = document.createTextNode(farmJson.farmacos[i].familia); //familia

          textoFam.appendChild(newContentFam);
          parrafoFam.appendChild(textoFam);

          parrafoFam.style.width = "15.4%";
          parrafoFam.style.marginBottom = "6%";
          parrafoFam.style.backgroundColor = "#f7f9f9";

          //Farmacos
          const parrafo = document.createElement("p"); //p farmaco
          const texto = document.createElement("span"); //span farmaco
          const newContent = document.createTextNode(farmJson.farmacos[i].nombre); //farmaco          

          texto.appendChild(newContent);
          parrafo.appendChild(texto);          

          parrafo.style.width = "9.4%";
          parrafo.style.textAlign = "center";

          //Total
          const parrafTotal = document.createElement("p"); //p total
          const textTotal = document.createElement("span"); //span total
          textott = document.createTextNode( farmJson.farmacos[i].total ); //total

          textTotal.appendChild(textott);
          parrafTotal.appendChild(textTotal);

          parrafTotal.style.width = "5.2%";
          parrafTotal.style.textAlign = "center";

          table2.appendChild(parrafoFam);
          table2.appendChild(parrafo);
          table2.appendChild(parrafTotal);

          if(screen.width <= 700){
            const pFarmTot = document.createElement("p"); //p farmaco y total
            const txtFarmTot = document.createElement("span"); //span farmaco y total
            FarmTot = document.createTextNode(farmJson.farmacos[i].nombre +": (" + farmJson.farmacos[i].total + ")" );            

            parrafo.remove();
            parrafTotal.remove();
            
            txtFarmTot.appendChild(FarmTot);
            pFarmTot.appendChild(txtFarmTot);
            table2.appendChild(pFarmTot);          

            parrafoFam.style.fontSize = "12px";
            parrafoFam.style.width = "18%";
            parrafoFam.style.marginBottom = "12%";
            pFarmTot.style.fontSize = "14px";
            pFarmTot.style.textAlign = "left";
            pFarmTot.style.width = "12%";
            pFarmTot.style.marginBottom = "10px";
          }

          table2.style.width = "100%";
          table2.style.marginLeft = "2.3px";

          // *** COLUMNAS: CANTIDADES ***
          for (var y = 0; y < farmJson.ambu.length; y++){

              // ** ASIGNACIÓN DE ID**
              var familiaInput = farmJson.farmacos[i].familia.replace(/ /g, "_");
              var cadena = farmJson.farmacos[i].nombre.replace(/ /g, "_");
              idCampo = farmJson.ambu[y] + "_" + familiaInput + "|" + cadena;

              // ** CANTIDADES SOL - SURT**
              const newDiv = document.createElement("div");
              const newrow = document.createElement("div");
              const sol = document.createElement("div");
              const surtido = document.createElement("div");
              const newInput = document.createElement("input");
              colSol = document.createTextNode( farmJson.farmacos[i].cant[y] );

              newDiv.setAttribute('class', 'col');
              newrow.setAttribute('class', 'row');
              sol.setAttribute('class', 'col');
              surtido.setAttribute('class', 'col');
              newInput.setAttribute('type', 'text');
              newInput.setAttribute('class', 'form-control');
              newInput.setAttribute('id', idCampo);

              sol.appendChild(colSol);
              surtido.appendChild(newInput);
              newrow.appendChild(sol);
              newrow.appendChild(surtido);
              newDiv.appendChild(newrow);
              filaMayor.appendChild(newDiv);
              table2.appendChild(filaMayor);
              tableFam.appendChild(table2);

              sol.style.width = "20%";
              surtido.style.width = "80%";
              newInput.style.width = "43px";
              newDiv.style.textAlign = "center";
              newDiv.style.backgroundColor = "#f7f9f9";
              newDiv.style.padding = "1%";
              newDiv.style.margin = "1px";
          }
        }


      //  *** FILA BOTONES ***
      table3 = document.getElementById("myDynamicTable3");

      for (i = 0; i < 1; i++){

          //Columna 1 (Espacio vacío)
          const parrafo = document.createElement("p");
          table3.appendChild(parrafo);
          parrafo.style.width = "30%";

          for (var j = 0; j < farmJson.ambu.length; j++){

              // ** ID DE BUTTON **
              var idBtn = farmJson.ambu[j];
              console.log('idtb', idBtn)
              var cadenaSol = "mandarInfo('" + idBtn + "')";
              console.log('cadenaSol', cadenaSol)

              //** BOTONES **
              const newDiv = document.createElement("div");
              const newButton = document.createElement("button");
              textBtn = document.createTextNode("Surtir");
              textBtn2 = document.createTextNode(" Amb " + farmJson.ambu[j] );

              newDiv.setAttribute('class', 'col');
              newDiv.setAttribute('id', idBtn+'div');
              newButton.setAttribute('class', 'btn');
              newButton.setAttribute('id', idBtn);
              newButton.setAttribute('type', 'submit');
              newButton.setAttribute('onclick',cadenaSol );

              newButton.appendChild(textBtn);
              newDiv.appendChild(newButton);
              table3.appendChild(newDiv);
              tableFam.appendChild(table3);

              table3.style.width = "100%";
              table3.style.marginLeft = "2.3px";
              newDiv.style.textAlign = "center";
              newDiv.style.backgroundColor = "#f7f9f9";
              newDiv.style.padding = "1%";
              newDiv.style.margin = "1px";
              newButton.style.background = "#334769";
              newButton.style.color = "white";
              newButton.style.borderRadius = "4px";
              newButton.style.width = "80%";
              newButton.style.fontSize = "12px";

               if(screen.width <= 700){
                newDiv.style.padding = "0%";
                newDiv.style.margin = "0.5px";
                newDiv.style.height = "100%";
                newDiv.style.width = "20%";
                newButton.style.padding = "0.5%";
                newButton.style.width = "70%";
                newButton.style.fontSize = "10px";
             }

          }
        }

        //  *** Botón Mandar Todo ***
        table4 = document.getElementById("myDynamicTable4");        

        var cadenaAll = "mandarTodo(" + farmJson + ")";
        const newDiv = document.createElement("div");
        const newButton = document.createElement("button");
        textBtn = document.createTextNode("Surtir Todo");
        const parrafo = document.createElement("p");

        newDiv.setAttribute('class', 'col');
        newDiv.setAttribute('id', 'surtAllDiv');
        newButton.setAttribute('class', 'btn');
        newButton.setAttribute('id', 'surtAll');
        newButton.setAttribute('type', 'submit');
        newButton.setAttribute('onclick','mandarTodo()' );

        table4.appendChild(parrafo);
        newButton.appendChild(textBtn);
        newDiv.appendChild(newButton);
        table4.appendChild(newDiv);
        tableFam.appendChild(table4);

        table4.style.width = "100%";
        table4.style.marginLeft = "2.3px";
        parrafo.style.width = "30%";
        newDiv.style.textAlign = "center";
        newDiv.style.backgroundColor = "#f7f9f9";
        newDiv.style.padding = "1%";
        newDiv.style.marginTop = "3px";
        newDiv.style.width = "80%";
        newButton.style.background = "#334769";
        newButton.style.color = "white";
        newButton.style.borderRadius = "4px";
        newButton.style.width = "95%";
        newButton.style.fontSize = "14px";

        if( farmJson.ambu[0] == null ){
          table4.remove();
        }

        if(screen.width <= 700){
        }

    // and give it some content

    // add the text node to the newly created div
    // add the newly created element and its content into the DOM
    const currentDiv = document.getElementById("div1");
    // document.body.insertBefore(table, currentDiv);
      //name.textContent = 'test';

      // if (res.response.log_type === 'check-in') {
      //   logText.textContent = 'Entrada';
      //   logIcon.classList.remove('fa-sign-out');
      //   logIcon.classList.add('fa-sign-in');
      // } else {
      //   logText.textCcadenaSolontent = 'Salida';
      //   logIcon.classList.remove('fa-sign-in');
      //   logIcon.classList.add('fa-sign-out');
      // }
      //
      // if (res.response.status === 'Authorized') {
      //   authText.textContent = 'Autorizado';
      //   authContainer.classList.remove('unauthorized');
      //   authContainer.classList.add('autorized');
      // } else {
      //   authText.textContent = 'Desautorizado';
      //   authContainer.classList.remove('autorized');
      //   authContainer.classList.add('unauthorized');
      // }

  }
  else{
      appDiv = document.getElementById("errorLog");
      errUser = document.getElementById("user");
      errPass = document.getElementById("pass");
                  
      appDiv.style.width = "80%";
      appDiv.style.margin = "auto";      

      //Campos vacíos      
      if( errUser.value == '' ){
        const errorTxt = document.createTextNode('El campo "Usuario" debe ser llenado');
        const errorDiv = document.createElement("div");
        const errorP = document.createElement("p"); 
        errorDiv.style.backgroundColor = "#f4989c";
        errorDiv.style.marginBottom = "18px";
        errorDiv.style.height = "35px";
        errorDiv.style.padding = "5px";     
        errorP.style.textAlign = "center";
        errorP.style.color = "red";            
        errUser.style.borderColor = "#e63946";
        errorP.appendChild(errorTxt);
        errorDiv.appendChild(errorP);
        appDiv.appendChild(errorDiv);

        setTimeout(() => {         
              if (errorDiv != null ){
                  errorDiv.remove();
                  errUser.style.borderColor = "gray";
                  }              
            }
        , 8000);      
      }    
      if( errPass.value == '' ){
        const errorTxt = document.createTextNode('El campo "Contraseña" debe ser llenado');
        const errorDiv = document.createElement("div");
        const errorP = document.createElement("p");      
        errorP.style.textAlign = "center";
        errorP.style.color = "red";
        errPass.style.borderColor = "#e63946";
        errorDiv.style.backgroundColor = "#f4989c";
        errorDiv.style.marginBottom = "18px";
        errorDiv.style.height = "35px";
        errorDiv.style.padding = "5px";
        errorP.appendChild(errorTxt);
        errorDiv.appendChild(errorP);
        appDiv.appendChild(errorDiv);

        setTimeout(() => {         
              if (errorDiv != null ){
                  errorDiv.remove();
                  errPass.style.borderColor = "gray";
                  }              
            }
        , 8000);
      }

      //Campos incorrectos
      if( errUser.value != '' && errUser.value != 'op@hatzalah.mx' ){
          const errorTxt = document.createTextNode('Usuario incorrecto');
          const errorDiv = document.createElement("div");
          const errorP = document.createElement("p"); 
          errorDiv.style.backgroundColor = "#f4989c";
          errorDiv.style.marginBottom = "18px";
          errorDiv.style.height = "35px";
          errorDiv.style.padding = "5px";     
          errorP.style.textAlign = "center";
          errorP.style.color = "red";            
          errUser.style.borderColor = "#e63946";
          errorP.appendChild(errorTxt);
          errorDiv.appendChild(errorP);
          appDiv.appendChild(errorDiv);

          setTimeout(() => {         
                if (errorDiv != null ){
                    errorDiv.remove();
                    errUser.style.borderColor = "gray";
                    }              
              }
          , 8000);
      } 
    if( errPass.value != '' && errPass.value != 'linkaform' ){
        const errorTxt = document.createTextNode('Contraseña incorrecta');
        const errorDiv = document.createElement("div");
        const errorP = document.createElement("p");      
        errorP.style.textAlign = "center";
        errorP.style.color = "red";
        errPass.style.borderColor = "#e63946";
        errorDiv.style.backgroundColor = "#f4989c";
        errorDiv.style.marginBottom = "18px";
        errorDiv.style.height = "35px";
        errorDiv.style.padding = "5px";
        errorP.appendChild(errorTxt);
        errorDiv.appendChild(errorP);
        appDiv.appendChild(errorDiv);

        setTimeout(() => {         
          if (errorDiv != null ){
              errorDiv.remove();
              errPass.style.borderColor = "gray";
            }              
         }
          , 8000);
    }
      
  }
  })
  .finally(() => {
      loading.style.display = 'none';

  }  );
  //   loading.style.display = 'none';
  //   setTimeout(() => {
  //     reset();
  //   }, 5000);
  // });
};

function capitalize(string) {

};



function mostrarMsg(respo){
    if (respo.success) {
        var res = respo.response;
        var ambus = Object.keys(res)
        for (i = 0; i < ambus.length; i++){
            resViewParentDiv = document.getElementById( ambus[i]+'div');
            const resViewDiv = document.createElement("div");
            const resData = document.createElement("p"); //p familia
            const newContentFam = document.createTextNode('Registro de la Ambulancia: ' + ambus[i] + ' OK!!!'); //familia

            resViewDiv.setAttribute('id', 'reponse'+ambus[i]);

            resData.appendChild(newContentFam);
            resViewDiv.appendChild(resData);
            resViewParentDiv.appendChild(resViewDiv);

            resViewDiv.style.width = "100%";
            resData.style.textAlign = "center";

            if(screen.width <= 700){
              resViewDiv.style.width = "90%";
              resData.style.fontSize = "12px";
            }

        }

      setTimeout(() => {
          for (i = 0; i < ambus.length; i++){
              resViewDiv = document.getElementById( 'reponse'+ambus[i]);
              if (resViewDiv != null ){
                  resViewDiv.remove();
                  }
              }
            }
        , 5000);
    } else {
      resViewParentDiv = document.getElementById( 'surtAllDiv');
      const resViewDiv = document.createElement("div");
      const resData = document.createElement("p"); //p familia
      const newContentFam = document.createTextNode('Error 2 on response, Code:' + respo.code); //familia
      resData.appendChild(newContentFam);
      resViewDiv.appendChild(resData);
      resViewParentDiv.appendChild(resViewDiv);
    }

}



function mandarInfo(colId) {

  const idAmbu = colId;
  console.log('idamub', idAmbu)
  boton = document.getElementById(idAmbu);
  boton.disabled = true;

  inputs = document.getElementsByTagName('input');
  const data = {};
  data[colId] = {}

  for (var i=0; i < inputs.length; i++) {
    var idBusqueda = inputs[i].id.slice(0,2);
     if (idBusqueda == idAmbu) {
         const fam = inputs[i].id.slice(3).split('|')[0];
         const key = inputs[i].id.slice(3).split('|')[1];
         const val = inputs[i].value;
         if (val != null && val != undefined  && val != ""){
             if (Object.keys(data[colId]).indexOf(fam) < 0 ){
                 data[colId][fam] = {}
             }
             data[colId][fam][key] = val ;
         }
     }
  }

  //console.log(data);

  // fetch('http://192.168.0.20:8000/api/infosync/scripts/run/', {
  fetch('https://app.linkaform.com/api/infosync/scripts/run/', {
    method: 'POST',
    body: JSON.stringify({
      script_id: 71016,
      action: "submit",
      user: user.value,
      pass: pass.value,
      data
    }),
    headers:{
      'Content-Type': 'application/json',
    },
  })
  .then((respo) => respo.json())
  .then((respo) => {
    boton.disabled = false;
    mostrarMsg(respo);
  })
};


function mandarTodo() {

  boton = document.getElementById("surtAll");
  boton.disabled = true;

  inputs = document.getElementsByTagName('input');
  const data = {};

  for (var j=2; j < inputs.length; j++) {
    var colId = inputs[j].id.slice(0,2);
    data[colId] = {};

    for (var i=0; i < inputs.length; i++) {
      var idBusqueda = inputs[i].id.slice(0,2);
       if (idBusqueda == colId) {
           const fam = inputs[i].id.slice(3).split('|')[0];
           const key = inputs[i].id.slice(3).split('|')[1];
           const val = inputs[i].value;
           if (val != null && val != undefined  && val != ""){
               if (Object.keys(data[colId]).indexOf(fam) < 0 ){
                   data[colId][fam] = {}
               }
               data[colId][fam][key] = val ;
           }
       }
      //console.log('data-',data)
  }}
  //console.log('data-',data);

      // fetch('http://192.168.0.20:8000/api/infosync/scripts/run/', {
      fetch('https://app.linkaform.com/api/infosync/scripts/run/', {
        method: 'POST',
        body: JSON.stringify({
          script_id: 71016,
          action: "submit",
          user: user.value,
          pass: pass.value,
          data
        }),
        headers:{
          'Content-Type': 'application/json',
        },
      })
      .then((respo) => respo.json())
      .then((respo) => {
        boton.disabled = false;
        mostrarMsg(respo);

      })

};

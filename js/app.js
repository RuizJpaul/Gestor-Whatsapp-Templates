const templateMessageEditor = document.querySelector("#template-message-editor");
const templateMessageView = document.querySelector("#template-message-view");

templateMessageEditor.addEventListener("input", ()=>{
   templateMessageView.value = templateMessageEditor.value;
});

const btnSave = document.querySelector("#save-template-btn")

btnSave.addEventListener("click", function () {

   // 💚  Capturar los elements e insertarlos a mi arreglo
   const inputTitle = document.querySelector("#template-title");
   const inputHashtag = document.querySelector("#template-hashtag");
   const inputMessage = document.querySelector("#template-message-editor");

   if(inputTitle.value!=="" && inputHashtag.value!=="" && inputMessage.value!==""){
      const newTemplate = new Template(inputTitle.value.trim(), inputMessage.value, inputHashtag.value.trim())
      window.templateStore.addTemplate(newTemplate);
   }
   else{
      alert("Ingrese los datos completos");
   }

   //Limpiamos los inputs
   inputTitle.value = "";
   inputHashtag.value = "";
   inputMessage.value = "";
   // Limpiamos el textarea de la vista previa
   templateMessageView.value = "";
})

function eliminarPlantilla(index) {
   plantillas = plantillas.filter((elmt, i) => i !== index)

   // Volver a renderizar
   renderizarUI();
}

const btnLimpiarStorage = document.querySelector("#btn-limpiarStorage");

btnLimpiarStorage.addEventListener("click", function(){
   window.templateStore.clearStorage();
});

function renderizarUI(state){
   // 💚 Renderizar el arreglo dentro de mi contenedor div
   const containerTemplate = document.querySelector("#templates-container")
   // Limpiar el contenedor
   containerTemplate.innerHTML = ""
   // Vamos a renderizarlo
   state.forEach((elmt, index) => {
      containerTemplate.innerHTML += `
         <div class="bg-gray-50 rounded-lg p-6 border border-gray-200 hover:border-purple-300 transition duration-300 hover:shadow-md">
               <div class="flex flex-col lg:flex-row lg:items-center gap-4">
                  <div class="flex-1">
                     <div class="flex items-start justify-center mb-3">
                        <div class="flex items-center gap-20">
                           <h3 class="text-6xl font-semibold text-gray-800 mb-1">${elmt.titulo}</h3>
                           <div class="">
                              <span class="inline-block bg-blue-300 text-black-800 text-sm px-5 py-2 rounded-full">${elmt.hashtag}
                              </span>
                           </div>
                        </div>
                     </div>
                  </div>
                  
                  <div class="flex flex-row lg:flex-col justify-center gap-10 lg:ml-4">
                     <button class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300 flex items-center gap-2 text-sm" onclick="mostrarOcultarModal(${index})">
                        <i class="fas fa-copy"></i>
                        <span class="hidden sm:inline">Visualizar</span>
                     </button>
                     <button onclick="eliminarPlantilla(${index})" class="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-300 flex items-center gap-2 text-sm">
                        <i class="fas fa-trash"></i>
                        <span class="hidden sm:inline">Eliminar</span>
                     </button>
                  </div>

                  <!-- Modal -->
                  <div id="miModal${index}" class="modal-cuadro">
                     <div class="cuadro-titulo">
                        <p>${elmt.titulo}</p>
                     </div>
                     <div class="modal-contenido">
                        <div class="ventana-chat">
                           <div class="encabezado-chat">
                              <div class="avatar-chat">
                                 <img src="Images/pngwing.com.png"></img>
                              </div>
                              <div class="usuario-chat">
                                 <p class="titulo-encabezado">McDonald's</p>
                                 <p class="cuenta-encabezado">Bussines Acount</p>
                              </div>
                           </div>
                           <div class="cuerpo-chat">
                              <div id="cuadro-texto-chat${index}"    class="cuadro-texto">
                                 <textarea name="" id="" class="mensaje-chat" placeholder="La vista previa aparecerá aquí mientras escribes..." disabled>${elmt.mensaje}</textarea>
                              </div>
                           </div>
                        </div>
                        <div class="cuadro-botones">
                           <button onclick="mostrarOcultarModal(${index})" class="boton-cerrar">
                              Cerrar
                           </button>
                           <button class="boton-editar">
                              Editar
                           </button>
                           <button class="boton-copiar">
                              Copiar
                           </button>
                        </div>
                     </div>
                  </div>
               </div>
         </div>
      `
   })
}

let mostrar = false;
function mostrarOcultarModal(index){
   mostrar =! mostrar;
   if(mostrar){
      document.getElementById(`miModal${index}`).style="display:flex;";
   }
   else{
      document.getElementById(`miModal${index}`).style="display:none";
   }
}

window.templateStore.suscribe(renderizarUI);
window.templateStore.suscribe(savePersistanceData);
renderizarUI(window.templateStore.getState())


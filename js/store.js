function createStore(initialStore = []) {
   // Vamos a crear el estado principal de mi Store
   let state = initialStore;
   // Observers => Funciones que se encargaran de los cambios
   const listeners = [];


   // Vamos a usar un metodo para mostrar el valor del state
   function getState() {
      return state;
   }

   // Esta funcion se va encargar de manipular el nuevo estado
   function setState(newState){
      state = newState;
      listeners.forEach(function (listener){
        listener(state);
      });
   }

   function addTemplate(newTemplate) {
      // Insertar este nuevo elemento en el array state
      const newState = [...state, newTemplate]
      setState(newState)
   }

   function suscribe(listener){
    listeners.push(listener);

    return ()=> {
        const index = listeners.indexOf(listener);
        if(index > -1){
         listeners.splice(index,1);
        }
    }
   }

   return {
      getState,
      addTemplate,
      setState,
      suscribe,
   }
}


const templateStore = createStore(getPersistanceData());

// Para crear una variable de manera global en todos mis archivos
window.templateStore = templateStore;
// Example starter JavaScript for disabling form submissions if there are invalid fields
(() => {
    'use strict'
  
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    const forms = document.querySelectorAll('.needs-validation')
  
    // Loop over them and prevent submission
    Array.from(forms).forEach(form => {
      form.addEventListener('submit', event => {
        if (!form.checkValidity()) {
          event.preventDefault()
          event.stopPropagation()
        }
  
        form.classList.add('was-validated')
      }, false)
    })
  })()


  //Index.ejs file GST toggle button
  let taxSwitch = document.getElementById("flexSwitchCheckDefault");
  let taxInfo = document.getElementsByClassName("tax-info");
  taxSwitch.addEventListener("click", ()=>{
    for(info of taxInfo){
        if(info.style.display != "inline"){
            info.style.display= "inline";
        }
        else{
            info.style.display= "none";
        }
        
    }
  });
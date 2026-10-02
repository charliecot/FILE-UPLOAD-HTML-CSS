
const fileInput = document.querySelector("#fileInput");
const saveButton = document.querySelector("#saveButton");
const message = document.querySelector("#message");

// Get the image element

const preview = document.querySelector("#preview");





// =====================================================
 // DJANGO SERVER 
 // =====================================================
 const API_URL = "http://127.0.0.1:8000"; 
 // ===================================================== 
 // 1. LOAD THE SAVED IMAGE WHEN PAGE OPENS 
 // =====================================================
  async function loadSavedImage() { try { /* IMPORTANT: You need a GET endpoint that returns the currently saved user's image. Example response: { "cv": "/media/cvs/nzegge.dev.png", "upload_at": "2026-09-30T10:20:01Z" } */ 
    const response = await fetch( `${API_URL}/file_demo/profile/` );
     const data = await response.json(); 
     if (!response.ok) { 
        console.log( "Could not load saved image:", data ); 
        return; } 
        // ========================================== 
        // If Django has a saved image
         // ========================================== 
         if (data.cv) { preview.src = `${API_URL}${data.cv}`; }
         } catch (error) {
             console.error( "Error loading saved image:", error ); 
        } } 
            // Run when page loads
              loadSavedImage();

































// ------------------------------------
// 1. Detect when user selects a file
// ------------------------------------

fileInput.addEventListener("change", function () {

    // FileList
    console.log(fileInput.files);

    // Get the first selected file
    const file = fileInput.files[0];

    if (!file) {
        return;
    }



    // ========================================
    // Check that the selected file is an image 
    // ========================================



if (!file.type.startsWith("image/"))
     {
         message.style.display = "block"; message.classList.add("message");
          message.textContent = "Please select an image."; 

          setTimeout(() => { message.style.display = "none"; message.
         classList.remove("message"); }, 2000); 
          // Clear the selected file  
           fileInput.value = ""

           return 

  }



  // ======================================== 
  // Create temporary URL for the image 
  // ======================================== 
   const imageURL = URL.createObjectURL(file); 
  // ======================================== 
  // Display the selected image // ======================================== 
   preview.src = imageURL;


    

    console.log("File name:", file.name);
    console.log("File size:", file.size);
    console.log("File type:", file.type);
});


// ------------------------------------
// 2. Send file to Django
// ------------------------------------

saveButton.addEventListener("click", async function () {

    const file = fileInput.files[0];

    // Make sure user selected a file
    if (!file) {
        message.style.display='block'
        message.classList.add('message')
        message.textContent = "Please select a file first.";
        
        setTimeout(()=>{
        message.style.display='none'
        message.classList.remove('message')
        },2000)

        return;
    }


    // --------------------------------
    // Create FormData
    // --------------------------------

    const formData = new FormData();

    formData.append("cv", file);


    try {

        const response = await fetch(
            "http://127.0.0.1:8000/file_demo/upload-cv/",
            {
                method: "POST",
                // IMPORTANT:
                // Do NOT manually set Content-Type.
                body: formData
            }
        );


        const data = await response.json();


        if (!response.ok) {

            console.log(data);
            message.style.display='block'
            message.classList.add('message')
            message.textContent ="Upload failed.";
        setTimeout(()=>{
        message.style.display='none'
        message.classList.remove('message')
        },2000)

            return;
        }

       // Display the image saved by Django

         preview.src = `http://127.0.0.1:8000${data.cv}`;

        console.log("Success:", data);

        message.style.display='block'
        message.classList.add('success')
        message.textContent =
            "CV uploaded successfully!";

         setTimeout(()=>{
        message.style.display='none'
        message.classList.remove('success')
        },2000)    

    } catch (error) {

        console.error(error);

        message.style.display='block'
        message.classList.add('message')
        message.textContent =
            "Something went wrong.";
        
            setTimeout(()=>{
        message.style.display='none'
        message.classList.remove('message')
        },2000)

    }

});

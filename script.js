const token = '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'; 
const inputTxt = document.getElementById("input");
const image = document.getElementById("image");
const button = document.getElementById("btn");

async function query() {
    
    image.src = 'loading.gif';

   
    const response = await fetch(
        "https://api-inference.huggingface.co/models/ZB-Tech/Text-to-Image",
        {
            headers: {
                Authorization: `Bearer ${token}`, 
            },
            method: "POST",
            body: JSON.stringify({
                inputs: inputTxt.value
            }),
        }
    );

    if (!response.ok) {
        throw new Error("Failed to fetch the image. Please try again.");
    }

    const result = await response.blob();
    return result;
}


button.addEventListener('click', async function () {
    
    if (!inputTxt.value.trim()) {
        alert("Please enter a text prompt.");
        return;
    }

    try {
   
        const response = await query();
        const objectURL = URL.createObjectURL(response);
        image.src = objectURL;
        
        let downloadBtn = document.getElementById("downloadBtn");

        // Check if the download button already exists
        if (!downloadBtn) {
            downloadBtn = document.createElement("button");
            downloadBtn.id = "downloadBtn";
            downloadBtn.innerText = "Download Image";
            document.body.appendChild(downloadBtn); // Append the download button to the page
        }

        // Set the download functionality
        downloadBtn.addEventListener("click", () => {
            const a = document.createElement("a"); // Create a temporary link element
            a.href = image.src; // Set the href to the generated image source
            a.download = "generated_image.png"; // Set the file name for the downloaded image
            document.body.appendChild(a); 
            a.click(); // Trigger the download
            document.body.removeChild(a); // Remove the link element after download
        });
    } catch (error) {
        console.error("Error:", error);
        alert("Error generating image: " + error.message);
    }
});
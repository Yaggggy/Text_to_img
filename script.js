const token = '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'; 
const inputTxt = document.getElementById("input");
const image = document.getElementById("image");
const button = document.getElementById("btn");

async function query() {
    
    image.src = 'loading.gif';

   
    const response = await fetch(
        "https://router.huggingface.co/fal-ai/fal-ai/qwen-image",
		{
			headers: {
				Authorization: `Bearer ${process.env.HF_TOKEN}`,
				"Content-Type": "application/json",
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

        
        if (!downloadBtn) {
            downloadBtn = document.createElement("button");
            downloadBtn.id = "downloadBtn";
            downloadBtn.innerText = "Download Image";
            document.body.appendChild(downloadBtn); 
        }

        
        downloadBtn.addEventListener("click", () => {
            const a = document.createElement("a"); 
            a.href = image.src; 
            a.download = "generated_image.png"; 
            document.body.appendChild(a); 
            a.click(); // Download the Image locally 
            document.body.removeChild(a); 
        });
    } catch (error) {
        console.error("Error:", error);
        alert("Error generating image: " + error.message);
    }
});



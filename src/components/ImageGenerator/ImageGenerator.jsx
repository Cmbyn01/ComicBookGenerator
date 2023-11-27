import React, { useState, createRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { FacebookShareButton, TwitterShareButton, WhatsappShareButton } from 'react-share';
import { FaFacebook, FaTwitter, FaWhatsapp } from 'react-icons/fa';
import './ImageGenerator.css'; // Make sure to adjust the path based on your project structure
import default_image from '../Assets/42d7b6851d52188fbea0d725a6887680.jpg';

const ImageGenerator = () => {
    const [panelImages, setPanelImages] = useState(Array(10).fill({ imageUrl: default_image, text: '' }));
    const inputRefs = Array(10).fill(null).map(() => createRef());
    const navigate = useNavigate();

    const query = async (data) => {
        try {
            const response = await fetch(
                "https://xdwvg9no7pefghrn.us-east-1.aws.endpoints.huggingface.cloud",
                {
                    headers: {
                        "Accept": "image/png",
                        "Authorization": "Bearer VknySbLLTUjbxXAXCjyfaFIPwUTCeRXbFSOjwRiCxsxFyhbnGjSFalPKrpvvDAaPVzWEevPljilLVDBiTzfIbWFdxOkYJxnOPoHhkkVGzAknaOulWggusSFewzpqsNWM",
                        "Content-Type": "application/json"
                    },
                    method: "POST",
                    body: JSON.stringify(data),
                }
            );
            const result = await response.blob();
            return URL.createObjectURL(result);
        } catch (error) {
            console.error("Error generating image:", error);
            throw error;
        }
    };

    const generateComicStrip = async (index) => {
        const inputRef = inputRefs[index];
        const data = { "inputs": inputRef.current.value };

        if (inputRef.current.value === "") {
            setPanelImages(prevImages => {
                const newImages = [...prevImages];
                newImages[index] = { imageUrl: default_image, text: '' };
                return newImages;
            });
        } else {
            const imageUrl = await query(data);
            setPanelImages(prevImages => {
                const newImages = [...prevImages];
                newImages[index] = { imageUrl, text: inputRef.current.value };
                return newImages;
            });
        }
    };

    const showComic = () => {
        if (panelImages.filter(panel => panel.text.trim() !== '').length < 10) {
            alert("You must generate text for all 10 panels before showing the comic.");
        } else {
            // Navigate to the "Show Comic" page
            navigate('/show-comic');
        }
    };

    return (
        <div className='image-generator'>
            <div className='header'>Comic Book <span>Generator</span></div>
            <h3>Please wait 10-20 seconds for the generation of your comic panel!</h3>
            <div className='share-buttons'>
                <FacebookShareButton url={window.location.href}>
                    <FaFacebook className='share-icon' />
                    Share on Facebook
                </FacebookShareButton>
                <TwitterShareButton url={window.location.href}>
                    <FaTwitter className='share-icon' />
                    Share on Twitter
                </TwitterShareButton>
                <WhatsappShareButton url={window.location.href}>
                    <FaWhatsapp className='share-icon' />
                    Share on WhatsApp
                </WhatsappShareButton>
            </div>
            <div className='comic-strip'>
                {panelImages.map((panel, index) => (
                    <div key={index} className='comic-panel'>
                        <h3>PANEL {index + 1}</h3>
                        <img src={panel.imageUrl} alt={`Panel ${index + 1}`} />
                        <input
                            type='text'
                            ref={inputRefs[index]}
                            className='search-input'
                            placeholder={`Panel ${index + 1} Text`}
                        />
                        <div className='generate-btn' onClick={() => generateComicStrip(index)}>
                            Generate
                        </div>
                        <div className='text-box'>{panel.text}</div>
                    </div>
                ))}
            </div>
            
           
        </div>
    );
}

export default ImageGenerator;










// import React, { useState, createRef } from 'react';
// import { useNavigate } from 'react-router-dom';
// import './ImageGenerator.css';
// import default_image from '../Assets/42d7b6851d52188fbea0d725a6887680.jpg';
// import ComicDisplayPage from './ComicDisplayPage';

// const ImageGenerator = () => {
//     const [panelImages, setPanelImages] = useState(Array(10).fill({ imageUrl: default_image, text: '' }));
//     const inputRefs = Array(10).fill(null).map(() => createRef());
//     const navigate = useNavigate();

//     const query = async (data) => {
//         try {
//             const response = await fetch(
//                 "https://xdwvg9no7pefghrn.us-east-1.aws.endpoints.huggingface.cloud",
//                 {
//                     headers: {
//                         "Accept": "image/png",
//                         "Authorization": "Bearer VknySbLLTUjbxXAXCjyfaFIPwUTCeRXbFSOjwRiCxsxFyhbnGjSFalPKrpvvDAaPVzWEevPljilLVDBiTzfIbWFdxOkYJxnOPoHhkkVGzAknaOulWggusSFewzpqsNWM",
//                         "Content-Type": "application/json"
//                     },
//                     method: "POST",
//                     body: JSON.stringify(data),
//                 }
//             );
//             const result = await response.blob();
//             return URL.createObjectURL(result);
//         } catch (error) {
//             console.error("Error generating image:", error);
//             throw error;
//         }
//     };

//     const generateComicStrip = async (index) => {
//         const inputRef = inputRefs[index];
//         const data = { "inputs": inputRef.current.value };

//         if (inputRef.current.value === "") {
//             setPanelImages(prevImages => {
//                 const newImages = [...prevImages];
//                 newImages[index] = { imageUrl: default_image, text: '' };
//                 return newImages;
//             });
//         } else {
//             const imageUrl = await query(data);
//             setPanelImages(prevImages => {
//                 const newImages = [...prevImages];
//                 newImages[index] = { imageUrl, text: inputRef.current.value };
//                 return newImages;
//             });
//         }
//     };

//     const showComic = () => {
//         // Navigate to the Comic Display Page and pass the panel images as state
//         navigate('/comic-display', { state: { panelImages } });
//     };

//     return (
//         <div className='image-generator'>
//             <div className='header'>Comic Book <span>Generator</span></div>
//             {/* <div className='show-comic-btn'>
//                 <button onClick={showComic} className='large-button'>
//                     Show the Comic
//                 </button>
//             </div> */}
//             <div className='comic-strip'>
//                 {panelImages.map((panel, index) => (
//                     <div key={index} className='comic-panel'>
//                         <h3>PANEL {index + 1}</h3>
//                         <img src={panel.imageUrl} alt={`Panel ${index + 1}`} />
//                         <input
//                             type='text'
//                             ref={inputRefs[index]}
//                             className='search-input'
//                             placeholder={`Panel ${index + 1} Text`}
//                         />
//                         <div className='generate-btn' onClick={() => generateComicStrip(index)}>
//                             Generate
//                         </div>
//                         <div className='text-box'>{panel.text}</div>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// }

// export default ImageGenerator;



















// import React, { useState, createRef } from 'react';
// import './ImageGenerator.css'; // Make sure to adjust the path based on your project structure
// import default_image from '../Assets/42d7b6851d52188fbea0d725a6887680.jpg';

// const ImageGenerator = () => {
//     const [panelImages, setPanelImages] = useState(Array(10).fill({ imageUrl: default_image, text: '' }));
//     const inputRefs = Array(10).fill(null).map(() => createRef());

//     const query = async (data) => {
//         try {
//             const response = await fetch(
//                 "https://xdwvg9no7pefghrn.us-east-1.aws.endpoints.huggingface.cloud",
//                 {
//                     headers: {
//                         "Accept": "image/png",
//                         "Authorization": "Bearer VknySbLLTUjbxXAXCjyfaFIPwUTCeRXbFSOjwRiCxsxFyhbnGjSFalPKrpvvDAaPVzWEevPljilLVDBiTzfIbWFdxOkYJxnOPoHhkkVGzAknaOulWggusSFewzpqsNWM",
//                         "Content-Type": "application/json"
//                     },
//                     method: "POST",
//                     body: JSON.stringify(data),
//                 }
//             );
//             const result = await response.blob();
//             return URL.createObjectURL(result);
//         } catch (error) {
//             console.error("Error generating image:", error);
//             throw error;
//         }
//     };

//     const generateComicStrip = async (index) => {
//         const inputRef = inputRefs[index];
//         const data = { "inputs": inputRef.current.value };

//         if (inputRef.current.value === "") {
//             setPanelImages(prevImages => {
//                 const newImages = [...prevImages];
//                 newImages[index] = { imageUrl: default_image, text: '' };
//                 return newImages;
//             });
//         } else {
//             const imageUrl = await query(data);
//             setPanelImages(prevImages => {
//                 const newImages = [...prevImages];
//                 newImages[index] = { imageUrl, text: inputRef.current.value };
//                 return newImages;
//             });
//         }
//     };

//     return (
//         <div className='image-generator'>
//             <div className='header'>Comic Book <span>Generator</span></div>
//             <div className='comic-strip'>
//                 {panelImages.map((panel, index) => (
//                     <div key={index} className='comic-panel'>
//                         <h3>PANEL {index + 1}</h3>
//                         <img src={panel.imageUrl} alt={`Panel ${index + 1}`} />
//                         <input
//                             type='text'
//                             ref={inputRefs[index]}
//                             className='search-input'
//                             placeholder={`Panel ${index + 1} Text`}
//                         />
//                         <div className='generate-btn' onClick={() => generateComicStrip(index)}>
//                             Generate
//                         </div>
//                         <div className='text-box'>{panel.text}</div>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// }

// export default ImageGenerator;













// import React, { useRef, useState } from 'react';
// import './ImageGenerator.css';
// import default_image from '../Assets/42d7b6851d52188fbea0d725a6887680.jpg';

// const ImageGenerator = () => {
//     const [image_url, setImage_url] = useState('/');
//     const [loading, setLoading] = useState(false);
//     const inputRef = useRef(null);

//     const query = async (data) => {
//         const response = await fetch(
//             "https://xdwvg9no7pefghrn.us-east-1.aws.endpoints.huggingface.cloud",
//             {
//                 headers: {
//                     "Accept": "image/png",
//                     "Authorization": "Bearer VknySbLLTUjbxXAXCjyfaFIPwUTCeRXbFSOjwRiCxsxFyhbnGjSFalPKrpvvDAaPVzWEevPljilLVDBiTzfIbWFdxOkYJxnOPoHhkkVGzAknaOulWggusSFewzpqsNWM",
//                     "Content-Type": "application/json"
//                 },
//                 method: "POST",
//                 body: JSON.stringify(data),
//             }
//         );
//         const result = await response.blob();
//         return result;
//     };

//     const imageGenerator = async () => {
//         if (inputRef.current.value === "") {
//             return 0;
//         }

//         try {
//             const data = { "inputs": inputRef.current.value };
//             setLoading(true); // Set loading to true
//             console.log("Request Data:", data); // Log request data
//             const result = await query(data);
//             console.log("Image Blob:", result); // Log image blob
//             setImage_url(URL.createObjectURL(result));
//             console.log("Image URL:", image_url); // Log image URL
//         } catch (error) {
//             console.error("Error generating image:", error);
//         } finally {
//             setLoading(false); // Set loading back to false when done
//         }
//     };

//     return (
//         <div className='image-generator'>
//             <div className='header'>Comic Book <span>Generator</span></div>
//             <div className='img-loading'>
//                 {loading ? (
//                     <p>Loading...</p>
//                 ) : (
//                     <div className='image'><img src={image_url === "/" ? default_image : image_url} alt="" /></div>
//                 )}
//             </div>
//             <div className='search-box'>
//                 <input type='text' ref={inputRef} className='search-input' placeholder='Describe Your panel Story' />
//                 <div className="generate-btn" onClick={imageGenerator}>Generate</div>
//             </div>
//         </div>
//     );
// }

// export default ImageGenerator;

















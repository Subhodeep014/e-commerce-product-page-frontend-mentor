import React, {useContext, useEffect, useState} from "react";
const Carousal = ()=>{
    const [selectedThumbnail, setSelectedThumbnail] = useState(0);
    const [lightboxSelectedThumbnail, setLightboxSelectedThumbnail] = useState(0);
    const [isMobile, setIsMobile] = useState(window.innerWidth<=750);
    const [lightBox, setLightBox] = useState(false)
    const images = [
        {thumbnail: "/assets/image-product-1-thumbnail.jpg", main: "/assets/image-product-1.jpg"},
        {thumbnail: "/assets/image-product-2-thumbnail.jpg", main: "/assets/image-product-2.jpg"},
        {thumbnail: "/assets/image-product-3-thumbnail.jpg", main: "/assets/image-product-3.jpg"},
        {thumbnail: "/assets/image-product-4-thumbnail.jpg", main: "/assets/image-product-4.jpg"},
    ]
    useEffect(()=>{
        const body = document.querySelector("body");

        const handleResize=()=>{
            setIsMobile(window.innerWidth<=750);
        }
        window.addEventListener("resize", handleResize);
        if(lightBox){
            body.classList.add('lightbox-open')
        }else{
            body.classList.remove('lightbox-open')
        }
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    },[lightBox])


    const handleClick = (index)=>{
        const mainImage = document.getElementById("main-image");
        mainImage.src=images[index].main;
        setSelectedThumbnail(index)
    }
    const handleLightboxClick = (index) => {
        let nextIndex;
        if (index < 0) {
            nextIndex = images.length - 1;
        } else if (index >= images.length) {
            nextIndex = 0;
        } else {
            nextIndex = index;
        }
        setLightboxSelectedThumbnail(nextIndex);
        const mainImage = document.getElementById("main-image-lightbox");
        mainImage.src = images[nextIndex].main;
    };
    
    
    return(
        <div>
            {!isMobile &&(
                    <div>
                    <div className="product-image-main">
                        <img onClick={()=>setLightBox(true)} id="main-image" src={images[0].main} alt="" />
                    </div>
                    <div className="other-product-image">
                        {images.map((image, index) =>(
                            <div className={`other-product-image-small ${selectedThumbnail===index ? "selected" : ""}`}  
                                key={index} onClick={()=>handleClick(index)}>
                                <img src={image.thumbnail}/>
                            </div>
                        ))}
                    </div>
                    {lightBox && (
                        <div className="light-box">
                            <div className="close"><svg className="btn-close" onClick={()=> setLightBox(false)} width="14" height="15" xmlns="http://www.w3.org/2000/svg"><path d="m11.596.782 2.122 2.122L9.12 7.499l4.597 4.597-2.122 2.122L7 9.62l-4.595 4.597-2.122-2.122L4.878 7.5.282 2.904 2.404.782l4.595 4.596L11.596.782Z" fill="#69707D" fillRule="evenodd"/></svg></div>
                            <div className="product-image-main">
                                <img id="main-image-lightbox" src={images[0].main} alt="" />
                                <button className="next"onClick={()=> handleLightboxClick(lightboxSelectedThumbnail+1)}><svg width="13" height="18" xmlns="http://www.w3.org/2000/svg"><path d="m2 1 8 8-8 8" stroke="#1D2026" strokeWidth="3" fill="none" fillRule="evenodd"/></svg></button>
                                <button className="previous" onClick={()=> handleLightboxClick(lightboxSelectedThumbnail-1)}><svg width="12" height="18" xmlns="http://www.w3.org/2000/svg"><path d="M11 1 3 9l8 8" stroke="#1D2026" strokeWidth="3" fill="none" fillRule="evenodd"/></svg></button>
                                
                            </div>
                            <div className="other-product-image">
                                {images.map((image, index) =>(
                                    <div className={`other-product-image-small ${lightboxSelectedThumbnail===index ? "selected" : ""}`}  
                                        key={index} onClick={()=>handleLightboxClick(index)}>
                                        <img src={image.thumbnail}/>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            )}
            {isMobile && (
                <div className="light-box-mobile">
                    <div className="product-image-main">
                        <img id="main-image-lightbox" src={images[0].main} alt="" />
                        <button className="next"onClick={()=> handleLightboxClick(lightboxSelectedThumbnail+1)}><svg width="13" height="18" xmlns="http://www.w3.org/2000/svg"><path d="m2 1 8 8-8 8" stroke="#1D2026" strokeWidth="3" fill="none" fillRule="evenodd"/></svg></button>
                        <button className="previous" onClick={()=> handleLightboxClick(lightboxSelectedThumbnail-1)}><svg width="12" height="18" xmlns="http://www.w3.org/2000/svg"><path d="M11 1 3 9l8 8" stroke="#1D2026" strokeWidth="3" fill="none" fillRule="evenodd"/></svg></button>
                        
                    </div>
                </div>
            )}
        </div>
        

    )
}
export default Carousal;
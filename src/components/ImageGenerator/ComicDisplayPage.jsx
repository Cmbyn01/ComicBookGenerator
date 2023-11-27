// ComicDisplayPage.js
import React from 'react';

const ComicDisplayPage = ({ panelImages }) => {
    return (
        <div className='comic-display-page'>
            <h1>Comic Display Page</h1>
            <div className='comic-strip'>
                {panelImages.map((panel, index) => (
                    <div key={index} className='comic-panel'>
                        <h3>PANEL {index + 1}</h3>
                        <img src={panel.imageUrl} alt={`Panel ${index + 1}`} />
                        <div className='text-box'>{panel.text}</div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ComicDisplayPage;

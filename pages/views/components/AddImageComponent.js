import React from 'react';

function AddImageComponent() {
    return (
        <div className="imagePicker">
            <input type="file" accept="image/x-png,image/gif,image/jpeg" />
            <div className="circle">
                <img src="/images/plus.png" alt="image" />
            </div>
        </div>
    )
}
export default AddImageComponent;
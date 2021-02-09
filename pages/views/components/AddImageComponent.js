import React from 'react';

function AddImageComponent({setImage}) {
    function readURL(event) {
        if (event.target.files && event.target.files[0]) {
            var reader = new FileReader();

            reader.onload = function (e) {
                setImage(e.target.result)
            };

            reader.readAsDataURL(event.target.files[0]);
        }
    }
    return (
        <div className="imagePicker">
            <input type="file" accept="image/x-png,image/gif,image/jpeg" 
                onChange={(e) => {
                    readURL(e);
                }}
            />
            <div className="circle">
                <img src="/images/plus.png" alt="image" />
            </div>
        </div>
    )
}
export default AddImageComponent;
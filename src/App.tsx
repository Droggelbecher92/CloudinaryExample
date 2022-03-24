import React, {useState} from 'react';
import './App.css';

function App() {

    const [img, setImg] = useState({} as File)
    const [url, setUrl] = useState('')

    const handleUpload = () => {
            const formData = new FormData()
            formData.append('file', img)
            formData.append('upload_preset', 'testUpload')

            fetch('https://api.cloudinary.com/v1_1/droggelbecher/image/upload',{
                method: 'POST',
                body: formData
            })
                .then(response => response.json())
                .then(data => setUrl(data.secure_url))
    }

  return (
    <div className="App">
        <input type="file" onChange={ev => {
            if(ev.target.files!=null){
                setImg(ev.target.files[0]);
            }
        }}/>
        {img.size>0 && <button onClick={handleUpload}>upload</button>}
        {url && <img src={url} alt="uploaded pic"/>}
    </div>
  );
}

export default App;

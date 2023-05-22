import { useState } from 'react';


const App = () => {
  const [images, setImages] = useState(null)
  const [value, setValue] = useState(null)
  const [error, setError] = useState(null)
  const surpriseOptions = [
    'a dog in a car',
    'a cat in a hat',
    'a bird in a tree',
    'a fish tank',
    'a horse in a field',
  ];

  const surpriseMe = () => {
    setImages(null)
    const randomValue = surpriseOptions[Math.floor(Math.random() * surpriseOptions.length)]
    setValue(randomValue)
  }

  const getImages = async () => {
    setImages(null)
    if (value == null) {
      setError('Error! Must have a search term')
      return
    }
    try {
      const response = await fetch('http://localhost:8000/images', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt: value }),
      });
      const data = await response.json();
      console.log(data);
      setImages(data);
    } catch (error) {
      console.error(error);
    }
  }

  console.log(value);

  return (
    <div className="App">
      <section className="search-section">
        <p>Start with a detailed description 
          <span className='surprise' onClick={surpriseMe}>Surprise me</span>
          </p>
          <div className='input-container'>
            <input
            value={value} 
            placeholder='An impressionist oil painting of a sunflower in a purple vase' onChange={(e) => setValue(e.target.value)}/>
            <button onClick={getImages}>Generate</button>
          </div>  
          {error && <p className='error'>{error}</p>}
      </section>
      
      <section className="image-section">
        {images?.map((image, index) => (
          <img key={index} src={image.url} alt={`Generated image of ${value}`}/>))
        }
      </section>

    </div>
  );
}

export default App;

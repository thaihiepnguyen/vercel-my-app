import './App.css';
import {useEffect, useState} from "react";
import { BottomScrollListener } from 'react-bottom-scroll-listener';

function SearchBar({filterText, onFilterTextChange, onClick}) {
  return (
    <>
      <input type="text" value={filterText} placeholder="Search..." onChange={(e) => onFilterTextChange(e.target.value)}/>
      <button onClick={onClick}>Search</button>
    </>
  );
}


function App() {
  const [images, setImages] = useState([]);
  const [filterText, setFilterText] = useState('');
  const [keyword, setKeyword] = useState('');
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  function handleBottomScroll() {
    setPage(page + 1)
  }

  useEffect(() => {
    if (!keyword) return;
    const url = `https://api.unsplash.com/search/photos?query=${keyword}&per_page=${page * 10}&client_id=OsAWarHjio0fOpI2O9Ysr_lILm32dalXJkVqoDEx-Js`;

    async function fetchData() {
      setLoading(true)
      const response = await fetch(url)
      const data = await response.json()
      setImages(data.results);
      setLoading(false)
    }

    fetchData()
  }, [keyword, page])

  return (
    <>
      <div className='search-bar'>
        <SearchBar filterText={filterText}
                   onFilterTextChange={setFilterText}
                   onClick={() => {
                      setKeyword(filterText)
                      setPage(1)
                   }
                  }
        />
      </div>
      {loading && <div>Loading...</div>}
      {
        images && <div className='image-container'>
        {images.map((image, index) => (
          <div key={index}>
            <img width="500" height="500" src={image.urls.small} alt={image.alt_description} />
          </div>
        ))}
      </div>
      }
      <BottomScrollListener onBottom={handleBottomScroll} />
    </>
  );
}

export default App;

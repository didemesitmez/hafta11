import React, { useState, useEffect } from 'react'
import axios from 'axios'

function App() {
  const [veri, veriGuncelle] = useState({ hits: [] })
  const [anahtar, anahtarGuncelle] = useState("ankara")

  useEffect(() => {
    const haberCek = async () => {
      const result = await axios(
        'https://hn.algolia.com/api/v1/search?query=istanbul',
      );

      veriGuncelle(result.data);
    };

    haberCek()
  }, []);

  return (
    <>
      <input type='text' value={anahtar} onChange={ olay=>anahtarGuncelle(olay.target.value) } />

      <ul>
        {
          veri.hits.map( haber => (
            <li key={haber.objectID}>
              <a target='_blank' href={haber.url}>{haber.title}</a>
            </li>
          ) )
        }
      </ul>
    </>
  );
}

export default App;
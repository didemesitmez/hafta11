import React, { useState, useEffect } from 'react'
import axios from 'axios'

function App() {
  const [veri, veriGuncelle] = useState({ hits: [] })
  const [anahtar, anahtarGuncelle] = useState("ankara")
  const [url, urlGuncelle] = useState(`https://hn.algolia.com/api/v1/search?query=ankara`)
  const [yukleniyor, yukleniyorGuncelle] = useState(false)
  const [hata, hataGuncelle] = useState(false)

  useEffect(() => {
    const haberCek = async () => {

      yukleniyorGuncelle(true)
      hataGuncelle(false)
      
      try {
        const result = await axios(url)
        veriGuncelle(result.data)
      } catch(error) {
        hataGuncelle(true)
      }

      yukleniyorGuncelle(false)
    }

    haberCek()
  }, [url]);

  function tusaBasildi(olay) {
    if (olay.key === "Enter") {
      urlDegisimi()
    }
  }

  function urlDegisimi() {
    urlGuncelle(`https://hn.algol.com/api/v1/search?query=${anahtar}`)
  }

  console.log("App render edildi")

  return (
    <>
      <section className='container'>
        <input type='text' value={anahtar} onKeyUp={tusaBasildi} onChange={olay => anahtarGuncelle(olay.target.value)} />
        <button type='button' onClick={urlDegisimi}> Ara </button>

        {
          yukleniyor === true ?
            (
              <div class="spinner-border" role="status">
                <span class="visually-hidden">Loading...</span>
              </div>
            )
            :
              !hata && 
                <ul>
                  {
                    veri.hits.map(haber => (
                      <li key={haber.objectID}>
                        <a target='_blank' href={haber.url}>{haber.title}</a>
                      </li>
                    ))
                  }
              </ul>
            
        }

        { hata && <p className='alert alert-danger'>Hata oluştu.</p>}

      </section>

    </>
  );
}

export default App;
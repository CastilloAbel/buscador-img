import { Field , Formik, Form } from 'formik';
import {useState} from "react";
import './header.css';
import './container.css';

function App() {
  const [photos, setPhotos] = useState([])
  console.log(photos)
  return (
    <div>
      <header>
        <Formik
          initialValues={{search: ""}}
          onSubmit={async value=>{
            const response = await fetch(`https://api.unsplash.com/search/photos?per_page=20&query=${value.search}`, 
          {
            headers: {
              "Authorization": "Client-ID 3S-2BjafykQdN7Hpuu4eP3fCFK8PMj_e40v5VQwWBkc"
            }
          })
          const data = await response.json()
          setPhotos(data.results)
        }}
        >
          <Form>
            <Field name="search"></Field>
          </Form>
          
        </Formik>
      </header>
      <div className='container'>
        <div className='center'>
          {
          photos.map(el=>
              <article key={el.id} onClick={()=>window.open(el.links.html)}>
                <img src={el.urls.regular}></img>
                <p>{el.alt_description}</p>
              </article>
            )
          }
        </div>
      </div>
    </div>
  );
}

export default App;

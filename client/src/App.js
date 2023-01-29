import React, { useState } from 'react'

const App = () => {

  const [prompt, setPrompt] = useState('');
  const [size, setSize] = useState('large');

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(prompt,size);
  }

  return (
    <div>
      <section className='bg-[#52A5BE] text-white text-center p-10'>
        <h1 className='text-4xl'>Welcome to the AI Image Generator</h1>
        <h2 className='text-xl mt-4'>Describe An Image</h2>
        <form className='text-black mt-4' onSubmit={onSubmit}>
          <input
            className='w-[250px] h-[30px]'
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          /><br />
          <select className='mt-4 w-[250px] h-[30px] p-1 bg-white'>
            <option value='large' onClick={(e) => setSize(e.target.value)}>Large</option>
            <option value='meduim' onClick={(e) => setSize(e.target.value)}>Medium</option>
            <option value='small' onClick={(e) => setSize(e.target.value)}>Small</option>
          </select><br />
          <button
            type='submit' 
            className='mt-4 bg-[#ACC8E5] text-[#112A46] hover:bg-[#112A46] hover:text-white p-1'
            >Generate Image</button>
        </form>
      </section>
      <section className='m-10 p-10 h-[120px]'>
        <img src='' />
      </section>
    </div>
  )
}

export default App

import React, { useEffect, useState } from 'react'
import axios from 'axios'

const App = () => {

  const [prompt, setPrompt] = useState('');
  const [size, setSize] = useState('large');
  const [response, setResponse] = useState();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (error?.success === false || response?.success === true) {
      setLoading(false);
    }
  }, [error, response]);

  const onSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setResponse('');
    setResponse('');

    axios
      .post("http://localhost:5000/openai/generateimage", {
        prompt: prompt,
        size: size
      })
      .then((response) => setResponse(response?.data))
      .catch((err) => setError(err?.response?.data));
    console.log(error?.response?.data?.success);
    console.log(response?.success);
  }

  return (
    <div>
      <section className='bg-[#52A5BE] text-white text-center p-10'>
        <h1 className='text-4xl'>Welcome to the AI Image Generator</h1>
        <h2 className='text-xl mt-4'>Describe An Image</h2>
        <form className='text-black mt-4' onSubmit={onSubmit}>
          <input
            required
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
      <section className='p-10 flex justify-center'>
        {
          loading ?

            <div class="w-[512px] h-[300px] relative items-center block max-w-sm p-6 bg-white border border-gray-100 rounded-lg shadow-md dark:bg-gray-300 dark:border-gray-300 dark:hover:bg-gray-400">
              <p class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white opacity-20"></p>
              <p class="font-normal text-gray-700 dark:text-gray-400 opacity-20"></p>
              <div role="status" class="absolute -translate-x-1/2 -translate-y-1/2 top-2/4 left-1/2">
                <svg aria-hidden="true" class="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" /><path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" /></svg>
                <span class="sr-only">Loading...</span>
              </div>
            </div>
            :
            response?.success === true ? <img src={response.data} alt='failed to load' />
              :
              error?.success === false ?
                <div class="w-[512px] h-[300px] relative items-center block max-w-sm p-6 bg-white border border-gray-100 rounded-lg shadow-md dark:bg-gray-300 dark:border-gray-300 dark:hover:bg-gray-400">
                  <h5 class="mb-2 text-xl font-bold tracking-tight text-black dark:text-black opacity-20">
                    {error?.error}. As an AI we can not draw this.
                  </h5>
                  <p class="font-normal text-gray-700 dark:text-gray-400 opacity-20"></p>
                  <div role="status" class="absolute -translate-x-1/2 -translate-y-1/2 top-2/4 left-1/2">
                  </div>
                </div>
                :
                <div class="w-[512px] h-[300px] relative items-center block max-w-sm p-6 bg-white border border-gray-100 rounded-lg shadow-md dark:bg-gray-300 dark:border-gray-300 dark:hover:bg-gray-400">
                  <p class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white opacity-20"></p>
                  <p class="font-normal text-gray-700 dark:text-gray-400 opacity-20"></p>
                  <div role="status" class="absolute -translate-x-1/2 -translate-y-1/2 top-2/4 left-1/2">
                  </div>
                </div>
        }
      </section >
    </div >
  )
}

export default App

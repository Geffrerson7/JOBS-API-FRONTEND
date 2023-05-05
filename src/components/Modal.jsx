import React from 'react'

const Modal = () => {

  const handleChange = () => {
    console.log("changing")
  }
  const mode = "edit"
  return (
    <div className='overlay'>
      <div className='modal'>
        <div className='form-title-container'>
          <h3>Let&#39;s {mode} you task</h3>
          <button>X</button>
        </div>

        <form>
          <input
          required
          name='name'
          value={""}
          placeholder='name'
          type='string'
          onChange={handleChange}
          />
          <br />
          <input
          required
          name='url'
          value={""}
          placeholder='url'
          type='string'
          onChange={handleChange}
          />
          <br />
          <input
          required
          name='company'
          value={""}
          placeholder='company'
          type='string'
          onChange={handleChange}
          />
          <br />
          <input
          required
          name='modality'
          value={""}
          placeholder='modality'
          type='string'
          onChange={handleChange}
          />
          <br />
          <input
          required
          name='publication date'
          value={""}
          type='date'
          onChange={handleChange}
          />
          <br />
          <input className={mode} type='submit'/>
        </form>
      </div>
    </div>
  )
}

export default Modal
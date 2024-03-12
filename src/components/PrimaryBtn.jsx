function PrimaryBtn({title, handleClick}) {
  return (
    <button className='border-2 text-green-600 mx-2 px-3 py-2 hover:text-black hover:bg-green' onClick={handleClick}>{title}</button>
  )
}

export default PrimaryBtn;
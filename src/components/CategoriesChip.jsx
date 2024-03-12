function CategoriesChip({ icon, title, handleClick }) {
  return (
    <div className='w-32 h-32 bg-green-100 flex flex-col justify-center items-center rounded-full cursor-pointer hover:scale-105' onClick={()=>handleClick(title)}>
        <img className='w-16' src={icon} alt="icon" />
        <span className='text-black font-bold'>{title}</span>
    </div>
  )
}

export default CategoriesChip;
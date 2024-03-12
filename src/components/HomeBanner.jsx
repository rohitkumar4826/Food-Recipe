import bannerImg from '../assets/images/ban.png'

function HomeBanner() {
  return (
    <div className='flex-col-reverse bg-green-50 sm:flex-row  flex justify-evenly items-center w-full '>
        <div className='flex flex-col justify-center items-center sm:items-start sm:ml-8'>
            <h1 className='text-5xl font-bold my-5'>Discover Culinary Delights</h1>
            <p className='text-xl my-5 text-grey'>Discover the art of cooking nutritious and <br/> mouthwatering dishes with me</p>
        </div>
        <img className=' xl:w-2/5 md:w-1/2' src={bannerImg} alt="img" />
    </div>
  )
}

export default HomeBanner;
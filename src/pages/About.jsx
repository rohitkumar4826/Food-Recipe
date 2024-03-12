import Navbar from "../components/Navbar";

function About() {
  return (
    <>
      <Navbar />
      <div className="bg-green-100 py-1">
        <h1 className="font-semibold text-3xl m-5 text-center">About Us</h1>
        <div className="bg-green-200 px-20 py-5 child:my-5 child:w-3/4">
            <h3 className="font-bold text-2xl text-green-600 ">Welcome to CulinaShare !</h3>
            <p className="text-justify w-2/3 py-2">At CulinaShare, we're passionate about food and the joy it brings to our lives. Whether you're a seasoned chef or just starting out in the kitchen, our goal is to inspire you with delicious recipes, helpful cooking tips, and creative ideas to elevate your culinary experience.</p>
            <p className="text-justify w-2/3 py-2">Our team of food enthusiasts scours the globe to bring you a diverse collection of recipes spanning various cuisines, dietary preferences, and occasions. From quick and easy weeknight dinners to gourmet delights for special celebrations, we've got you covered.</p>
            <p className="text-justify w-2/3 py-2">But we're more than just a recipe repository. We believe that cooking is about more than just following instructions—it's about creativity, experimentation, and sharing meals with loved ones. That's why we provide detailed instructions, step-by-step photos, and helpful videos to guide you through each recipe, ensuring your success in the kitchen.</p>
            <p className="text-justify w-2/3 py-2">Whether you're looking for healthy meal ideas, decadent desserts, or crowd-pleasing appetizers, CulinaShare is your go-to resource for all things culinary. Join our community of food lovers, and let's embark on a delicious journey together!</p>
            <h2 className="text-green-800 py-2">Happy cooking!</h2>
            <p>The CulinaShare Team</p>
        </div>
      </div>
    </>
  );
}

export default About;

// ICONS IMPORTS
import instagram from "../assets/icons/inst.png";
import twitter from "../assets/icons/twi.png";
import facebook from "../assets/icons/faceb.png";

function Footer() {
  return (
    <footer className="flex flex-col ">
      <h1 className="text-3xl font-bold cursor-pointer my-5 px-20">
        CulinaShare
      </h1>
      <div className="flex justify-between items-center px-20 py-5">
        <div>
          <h3 className="font-semibold text-lg">Follow Us</h3>
          <ul className="text-grey cursor-pointer text-sm my-4">
            <li className="hover:underline flex items-center mt-2">
              <img className="w-6 mr-2" src={twitter} alt="icon" />
              Twitter
            </li>
            <li className="hover:underline flex items-center mt-2">
              <img className="w-6 mr-2" src={facebook} alt="icon" />
              Facebook
            </li>
            <li className="hover:underline flex items-center mt-2">
              <img className="w-6 mr-2" src={instagram} alt="icon" />
              Instagram
            </li>
          </ul>
        </div>
        <div>
          <h3 className="font-semibold text-lg">Subscribe Us</h3>
        </div>
      </div>
      <div className="p-5 bg-black text-white text-center text-sm font-bold w-full">
        @rohit4826.in
      </div>
    </footer>
  );
}

export default Footer;

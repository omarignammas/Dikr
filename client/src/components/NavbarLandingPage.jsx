import { NavLink } from "react-router-dom";
import { HashLink } from 'react-router-hash-link';


export default function NavbarLandingPage() {
      return (
        <div className='flex gap-20 text-xl lg:gap-20 text-red-500'>
          <HashLink>
            <p className='nav_link font-Kodchasan 
             duration-200'>Home</p>
          </HashLink>
          <HashLink to="/#RecitersSection">
            <p className='nav_link font-Kodchasan 
             duration-200' >Reciters</p>
          </HashLink>
          <HashLink to="/#AboutSection" >
            <p className='nav_link font-Kodchasan 
             duration-200'>About</p>
          </HashLink>
          <HashLink to="/#FooterSection">
            <p className='nav_link font-Kodchasan 
             duration-200'>Contact Us</p>
          </HashLink>
        </div>
      );
    }

import Benefits from "./BenefitsComponent/Benefits";
import Description from "./DescriptionComponent/Description";
import Navbar from "./NavbarComponent/Navbar";
import { Presentation } from "./PresentationComponent/Presentation";


export default function App() {
  return (
    <div>
      <Presentation/>
      <Navbar/>
      <Description/>
      <Benefits/>
    </div>
  )
}


import { StrictMode } from "react" 
import { createRoot} from "react-dom/client"
import HallConfig from "./admin/HallConfig"
import Timelines from "./admin/Timelines"
import Navigation from "../user/Navigation"
import Movies from "../user/Movies"

// if(document.getElementById('root')){
//     createRoot(document.getElementById('root')).render(
//     <StrictMode>
//       <App />
//     </StrictMode>,
//   )
// }

// if(document.querySelector('.ticket')){
//     createRoot(document.querySelector('.ticket')).render(
//         <StrictMode>
//           <TicketPage />
//         </StrictMode>,
//     )
    
// }

// if(document.querySelector('.payment')){
//     createRoot(document.querySelector('.ticket')).render(
//         <StrictMode>
//           <TicketPage />
//         </StrictMode>,
//     )
    
// }

// if(document.querySelector('.user-index')){
//   createRoot(document.querySelector('.user-index')).render(
//       <StrictMode>
//         <UserIndex />
//       </StrictMode>,
//   )
//}
if(document.querySelector(".config-halls")){
  createRoot(document.querySelector(".config-halls")).render(
    <StrictMode>
      <HallConfig ref={HallConfig => { window.HallConfig = HallConfig }}/>
    </StrictMode>
  )
}
if(document.querySelector(".conf-step__seances")){
  createRoot(document.querySelector(".conf-step__seances")).render(
    <StrictMode>
      <Timelines/>
    </StrictMode>
  )
}
if(document.querySelector(".navigation-wrapper")){
  createRoot(document.querySelector(".navigation-wrapper")).render(
    <StrictMode>
      <Navigation />
      <Movies ref={Movies => {window.Movies = Movies}}/>
    </StrictMode>
  )
}




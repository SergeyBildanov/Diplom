import App from "./admin/index"
import TicketPage from "../user/TicketPage" 

import { StrictMode } from "react" 
import { createRoot} from "react-dom/client"
import UserIndex from "../user"

if(document.getElementById('root')){
    createRoot(document.getElementById('root')).render(
    <StrictMode>
      <App />
    </StrictMode>,
  )
}

if(document.querySelector('.ticket')){
    createRoot(document.querySelector('.ticket')).render(
        <StrictMode>
          <TicketPage />
        </StrictMode>,
    )
    
}

if(document.querySelector('.payment')){
    createRoot(document.querySelector('.ticket')).render(
        <StrictMode>
          <TicketPage />
        </StrictMode>,
    )
    
}

if(document.querySelector('.user-index')){
  createRoot(document.querySelector('.user-index')).render(
      <StrictMode>
        <UserIndex />
      </StrictMode>,
  )
  
}



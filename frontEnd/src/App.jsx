import './App.css'
import { createBrowserRouter,  RouterProvider } from "react-router-dom";
import Login from './components/Login'
import Register from './components/Register'
import Home from "./components/Home";
import EventList from './components/EventList';
import EventDetails from "./components/EventDetails";
import EventCard from './components/EventCard';
import MyBookings from "./components/MyBookings";
import AdminDashboard from "./components/AdminDashboard";
import ManageEvents from "./components/ManageEvents";
import ViewBookings from "./components/ViewBookings";
import Navbar from './components/Navbar';
import Payment from './components/Payment';

const router = createBrowserRouter(
  [
    {
      path:"/",
      element:<div>
        <Navbar/>
        <Home/>
      </div>
    },
    {
      path:"/login",
      element:<div>
        <Navbar/>
        <Login />
      </div>
    },
    
    {
      path:"/register",
      element:<div>
        <Navbar/>
        <Register />
      </div>
    },
    {
      path:"/add-event",
      element:<div>
        <Navbar/>
        <EventCard />
      </div>
    },
    {
      path:"/eventlist",
      element:<div>
        <Navbar/>
        <EventList />
      </div>
    },
    {
      path:"/payment",
      element:<div>
        <Navbar/>
        <Payment />
      </div>
    },
    {
      path:"/eventdetails",
      element:<div>
        <Navbar/>
        <EventDetails />
      </div>
    },
    
    {
      path:"/mybookings",
      element:<div>
        <Navbar/>
        <MyBookings />
      </div>
    },
    {
      path:"/admindashboard",
      element:<div>
        <Navbar/>
        <AdminDashboard />
      </div>
    },
    {
      path:"/admin/events",
      element:<div>
        <Navbar/>
        <ManageEvents />
      </div>
    },
    {
      path:"/admin/bookings",
      element:<div>
        <Navbar/>
        <ViewBookings />
      </div>
    },
  ]
)
function App() {

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App

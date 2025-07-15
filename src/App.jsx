import DashboardLayout from './Admin/Layout/Layout'
import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import LoginForm from './common/Auth/Login';
import RegisterForm from './common/Auth/Register';
import MovieComingSoon from './common/Page/MovieComingSoon';
import MovieAnalytics from './Admin/page/HomePage';
import MoviesList from './Admin/page/MoviesList';
import Navbar from './common/Navbar/NavbarNav';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import SliderGallery from './Admin/page/SliderGallery';
import PremiumPlans from './Admin/page/PremiumPlans';
import Orders from './Admin/page/Orders';
import Trials from './Admin/page/Trials';
import HomeScreen from './user/Homescreen';
import Header from './common/Navbar/Navbar';
import TrialScreen from './common/Navbar/TrialScreen';
import MovieScreen from './user/Movisescreen';
import SupportScreen from './user/SupportScreen';
import SubscriptionsScreen from './user/SubscriptionsScreen';
import VideoUploadPreview from './user/VideoUploadPreview';
import Footer from './common/Navbar/Footer';
import UserScreen from './common/Auth/UserProfile';
// import VideoUploadPreview from './user/localuploderscreen';


function App() {
  const DeshbordLayouts = ({ children }) => (
    <>
      <DashboardLayout>
        {children}
      </DashboardLayout>
    </>
  );

  const Userpage = ({children}) =>(
    <div className='bg-black'>
    <Header/>
    {children}
    <TrialScreen/>
    <Footer/>
    </div>
  )
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <BrowserRouter>
        <Routes>
          <Route path='/admin' element={<DeshbordLayouts>
            <MovieAnalytics/>
          </DeshbordLayouts>} />
          <Route path='/login' element={<LoginForm/>}/>
          <Route path='/register' element={<RegisterForm/>}/>
          <Route path='*' element={<DeshbordLayouts>
            <MovieComingSoon/>
          </DeshbordLayouts>} /> 
          <Route path='/movies' element={<DeshbordLayouts>
            <MoviesList/>
          </DeshbordLayouts>} /> 
          <Route path='/Gallary' element={<DeshbordLayouts>
            <SliderGallery/>
          </DeshbordLayouts>} /> 
          <Route path='/login'element={<Userpage>
            <LoginForm/>
          </Userpage>}/>
          <Route path="/premium" element={<DeshbordLayouts>
            <PremiumPlans/>
          </DeshbordLayouts>}/>
          <Route path="/order" element={<DeshbordLayouts>
            <Orders/>
          </DeshbordLayouts>}/>
          <Route path="/trials" element={<DeshbordLayouts>
            <Trials/>
          </DeshbordLayouts>}/>
          <Route path='/' element={<Userpage>
            <HomeScreen/>
          </Userpage>} />
          <Route path='/movie' element={<Userpage>
            <MovieScreen/>
          </Userpage>} />
          <Route path='/supports' element={<Userpage>
            <SupportScreen/>
          </Userpage>} />
          <Route path='/subscription' element={<Userpage>
            <SubscriptionsScreen/>
          </Userpage>} />
          <Route path='/video-upload' element={<Userpage>
            <VideoUploadPreview/>
          </Userpage>} />
          <Route path='/userprofile' element={<Userpage>
            <UserScreen/>
          </Userpage>} />
        </Routes>
      </BrowserRouter>
    </LocalizationProvider>
  )
}

export default App

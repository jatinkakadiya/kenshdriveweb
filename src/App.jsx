import DashboardLayout from './Admin/Layout/Layout'
import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import LoginForm from './common/Auth/Login';
import RegisterForm from './common/Auth/Register';
import MovieComingSoon from './common/Page/MovieComingSoon';
import MovieAnalytics from './Admin/page/HomePage';
import MoviesList from './Admin/page/MoviesList';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import PremiumPlans from './Admin/page/PremiumPlans';
import Orders from './Admin/page/Orders';
import Trials from './Admin/page/Trials';
import HomeScreen from './user/Homescreen';
import Header from './common/Navbar/Navbar';
import TrialScreen from './common/Navbar/TrialScreen';
// import MovieScreen from './user/Movisescreen';
import SupportScreen from './user/SupportScreen';
import SubscriptionsScreen from './user/SubscriptionsScreen';
import VideoUploadPreview from './user/VideoUploadPreview';
import Footer from './common/Navbar/Footer';
import UserScreen from './common/Auth/UserProfile';
import MovieDetailsScreen from './user/MovieDetailsScreen';
import Historys from './common/Navbar/History';
// import MovieForm from './Admin/page/MovieCreateForm';
// import VideoUploadPreview from './user/localuploderscreen';
import PrivateRoute from './common/Auth/PrivateRoute';


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
          <Route path='/admin' element={<PrivateRoute><DeshbordLayouts>
            <MovieAnalytics/>
          </DeshbordLayouts></PrivateRoute>} />
          <Route path='/login' element={<LoginForm/>}/>
          <Route path='/register' element={<RegisterForm/>}/>
          <Route path='*' element={<PrivateRoute><DeshbordLayouts>
            <MovieComingSoon/>
          </DeshbordLayouts></PrivateRoute>} /> 
          <Route path='/movies' element={<PrivateRoute><DeshbordLayouts>
            <MoviesList/>
          </DeshbordLayouts></PrivateRoute>} /> 
         
          <Route path='/login'element={<Userpage>
            <LoginForm/>
          </Userpage>}/>
          <Route path="/premium" element={<PrivateRoute><DeshbordLayouts>
            <PremiumPlans/>
          </DeshbordLayouts></PrivateRoute>}/>
          <Route path="/order" element={<PrivateRoute><DeshbordLayouts>
            <Orders/>
          </DeshbordLayouts></PrivateRoute>}/>
          <Route path="/trials" element={<PrivateRoute><DeshbordLayouts>
            <Trials/>
          </DeshbordLayouts></PrivateRoute>}/>
          <Route path='/' element={<PrivateRoute><Userpage>
            <HomeScreen/>
          </Userpage></PrivateRoute>} />
          <Route path='/supports' element={<PrivateRoute><Userpage>
            <SupportScreen/>
          </Userpage></PrivateRoute>} />
          <Route path='/subscription' element={<PrivateRoute><Userpage>
            <SubscriptionsScreen/>
          </Userpage></PrivateRoute>} />
          <Route path='/video-upload' element={<PrivateRoute><Userpage>
            <VideoUploadPreview/>
          </Userpage></PrivateRoute>} />
          <Route path='/userprofile' element={<PrivateRoute><Userpage>
            <UserScreen/>
          </Userpage></PrivateRoute>} />
          <Route path='/watch' element={<PrivateRoute><Userpage>
            <MovieDetailsScreen/>
          </Userpage></PrivateRoute>} />
          <Route path='/history' element={<PrivateRoute><Userpage>
            <Historys/>
          </Userpage></PrivateRoute>} />
        </Routes>
      </BrowserRouter>
    </LocalizationProvider>
  )
}

export default App

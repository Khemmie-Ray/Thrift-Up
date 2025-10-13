import React from 'react'
import {
  createBrowserRouter,
  Route,
  createRoutesFromElements,
  RouterProvider,
} from "react-router";
import Home from './pages/Home';
import HomeLayout from './Layout/HomeLayout';
import Dashboard from './pages/Dashboard/Dashboard';
import DashboardLayout from './Layout/DashboardLayout';
import IndividualSavings from './pages/Dashboard/Savings/IndividualSavings';
import AllSavings from './pages/Dashboard/Savings/AllSavings';
import CreateModule from './pages/Dashboard/CreateModule';
import GroupSavings from './pages/Dashboard/Savings/GroupSavings';
import CreateGroupModule from './pages/Dashboard/CreateGroupModule';
import InProgress from './components/dashboard/InProgress';
import IndividualSavingsDetail from './pages/Dashboard/Savings/IndividualSavingsDetail';
import GroupDetails from './pages/Dashboard/Savings/GroupDetails';
import './connection'
import { ThriftContextProvider } from './context/ThriftContextProvider';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path='/' element={<HomeLayout />}>
      <Route index element={<Home />} />
      </Route>
      <Route path='/dashboard' element={<DashboardLayout />}>
      <Route index element={<Dashboard />} />
      <Route path='/dashboard/individual-savings' element={<IndividualSavings />} />
      <Route path='/dashboard/individual-savings/:id' element={<IndividualSavingsDetail />} />
      <Route path='/dashboard/individual-savings/create-module' element={<CreateModule />} />
      <Route path='/dashboard/group-savings' element={<GroupSavings />} />
      <Route path='/dashboard/group-savings/:id' element={<GroupDetails />} />
      <Route path='/dashboard/group-savings/create-module' element={<CreateGroupModule />} />
      <Route path='/dashboard/allsavings' element={<AllSavings />} />
      <Route path='/dashboard/portfolio/under-construction' element={<InProgress />} />
      <Route path='/dashboard/profile/under-construction' element={<InProgress />} />
      <Route path='/dashboard/under-construction' element={<InProgress />} />
      <Route path='/dashboard/transaction/under-construction' element={<InProgress />} />
      </Route>
    </Route>
  )
);

const App = () => {
  return (
     <div className="contain mx-auto font-dmsans text-[16px] text-dark w-[100%]">
      <ThriftContextProvider>
         <RouterProvider router={router} />
         </ThriftContextProvider>
       </div>
  )
}

export default App
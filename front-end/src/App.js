import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Nav from './components/Nav';
import Footer from './components/Footer';
import Private from './components/Private';
import Register from './components/Register';
import Login from './components/Login';
import AddProduct from './components/AddProduct';
import Products from './components/Products';
import UpdateProduct from './components/UpdateProduct';
function App() {
  	return (
    <div className="App">
      	<BrowserRouter>
			<Nav/>
			<div className="Content">
				<Routes>
						<Route path='/' element={<h1>HOME PAGE</h1>}/>
						<Route path='/login' element={<Login/>}/>
						<Route path='/register' element={<Register/>}/>
					<Route element={<Private/>}>
						<Route path='/products' element={<Products/>}/>
						<Route path='/add' element={<AddProduct/>}/>
						<Route path='/update/:id' element={<UpdateProduct/>}/>
						<Route path='/profile' element={<h1>Profile Component</h1>}/>
						<Route path='/logout' element={<h1>Logout Component</h1>}/>
						<Route path='*'/>
					</Route>
				</Routes>
			</div>
      	</BrowserRouter>
		<Footer/>
    </div>
  );
}

export default App;

import { DynamicForm } from "components";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
	return (
		<div className='App'>
			<ToastContainer
				position='top-right'
				autoClose={3000}
				draggable={false}
				hideProgressBar
				closeButton={false}
				className='react-toastify-component'
			/>
			<DynamicForm />
		</div>
	);
}

export default App;

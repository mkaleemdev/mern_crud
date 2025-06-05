import { Toaster } from "react-hot-toast";
import { Curd } from "./componets/Curd";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {

  return (
    <>
      <Toaster
        position="top-center"
        reverseOrder={false}
      />
      <Curd />
    </>
  )
}

export default App

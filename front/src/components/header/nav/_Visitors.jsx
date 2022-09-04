import { Link } from "react-router-dom"
import { Logo } from "../Header"

const Visitors = ()=>{
    const Button = ({to, children,className})=>{
        return  <Link className={"py-2 px-4  rounded-full mr-2 "+ className} to={to}>{children}</Link>
    }
    return  (
    <>
        <Logo className={' h-full w-[50%] sm:p-3'}/>
        <div>
          <Button to='Login'>Login</Button>
          <Button to="SignIn" className='border'>SignIn</Button>
        </div>
    </>)
}
export default  Visitors
import { Link } from 'react-router-dom'
import { useLogout } from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useAuthContext'


const Navbar = () => {
    const { logout } = useLogout()
    const { user } = useAuthContext()

    const handleClick = () => {
        logout()
    }


    return (
        <header>
            <div className="p-10 flex">
                <div className='grow'>
                    <Link to="/">
                        <h1 className='text-6xl grow font-f1'>Workout Buddy</h1>
                    </Link>
                </div>
                <nav>
                    {user && (
                        <div className="text-4xl font-f1 mr-16">
                            <button className='font-f1' onClick={handleClick}>Log out</button>
                            {/* <span>{user.email}</span> */}
                        </div>
                    )}{
                        !user && (
                            <div className="flex gap-4 text-4xl mr-16 font-f1">
                                <Link to="/login">Login</Link>
                                <Link to="/signup">Signup</Link>
                            </div>
                        )}
                </nav>
            </div >
        </header >
    )
}

export default Navbar
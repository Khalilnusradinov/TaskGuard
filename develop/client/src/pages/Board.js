import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { isAuthenticated, logout } from '../utils/auth';
const Board = () => {
    const navigate = useNavigate();
    useEffect(() => {
        if (!isAuthenticated()) {
            navigate('/login'); // Redirect to login if not authenticated
        }
    }, [navigate]);
    return (<div>
            <h2>Kanban Board</h2>
            <button onClick={() => logout()}>Logout</button>
        </div>);
};
export default Board;

import { useWorkoutsContext } from '../hooks/useWorkoutsContext'
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import { useAuthContext } from '../hooks/useAuthContext'
import { useNavigate } from 'react-router-dom';

const WorkoutDetails = ({ workout }) => {
    console.log('eree');
    const navigate = useNavigate();

    const { dispatch } = useWorkoutsContext()
    const { user } = useAuthContext()

    const handleClick = async () => {
        if (!user) {
            return
        }
        const response = await fetch('/api/workouts/' + workout._id, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        })
        const json = await response.json()

        if (response.ok) {
            dispatch({ type: 'DELETE_WORKOUT', payload: json })
            navigate("/login")
        }
    }

    return (

        <div className="bg-white max-w-3xl grid grid-cols-3 border-2 border-blue-950 my-10 p-4 justify-items-center font-f3 text-2xl">

            <div className="col-span-3 gap-2 w-full flex mb-4  font-semibold text-center text-3xl">

                <div className="text-base">
                    {formatDistanceToNow(new Date(workout.createdAt), { addSuffix: true })}
                </div>

                <div className='grow mr-24'>
                    {workout.title}
                </div>
                <div>
                    <span className="material-symbols-outlined   cursor-pointer" onClick={handleClick}>
                        Delete
                    </span>
                </div>

            </div>

            <div className="flex flex-col gap-2 items-center">
                <div>Exercise 1</div>
                <div>{workout.exercise1}</div>
                <div>{workout.weight1}Kg</div>
            </div>
            <div className="flex flex-col gap-2 items-center">
                <div>Exercise 2</div>
                <div>{workout.exercise2}</div>
                <div>{workout.weight2}Kg</div>
            </div>
            <div className="flex flex-col gap-2 items-center">
                <div>Exercise 3</div>
                <div>{workout.exercise3}</div>
                <div>{workout.weight3}Kg</div>
            </div>

        </div>


    )
}

export default WorkoutDetails
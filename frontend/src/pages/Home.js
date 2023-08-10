import { useEffect, useRef, useState } from "react"
import { useWorkoutsContext } from "../hooks/useWorkoutsContext"
import { useAuthContext } from "../hooks/useAuthContext"
import WorkoutDetails from "../components/WorkoutDetails"
import { Link } from "react-router-dom"

//
import LineChart from "../components/LineChart";

const Home = () => {

    const { user } = useAuthContext()
    const { workouts, dispatch } = useWorkoutsContext()
    let score = [];
    let score1 = []

    const [dataChart, setDataChart] = useState({
        labels: score,
        datasets: [{
            label: 'Confirmed cases',
            data: score1,
            backgroundColor: "rgba(255, 99, 132, 0.2)",
            borderColor: "black",
            borderWidth: 2,
        }]
    });

    useEffect(() => {
        const fetchWorkouts = async () => {
            let score = [];
            let score1 = []
            let idx = 0;
            const response = await fetch('/api/workouts', {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                },
            })
            const json = await response.json()
            if (response.ok) {
                dispatch({ type: 'SET_WORKOUTS', payload: json })

                json.forEach(el => {
                    score1.push(el.weight1 + el.weight2 + el.weight3)
                    score.push(++idx)
                });

                setDataChart({
                    labels: score,
                    datasets: [{
                        label: 'Confirmed cases',
                        data: score1,
                        backgroundColor: "rgba(255, 99, 132, 0.2)",
                        borderColor: "black",
                        borderWidth: 2,
                    }]
                });
            }
        }
        if (user) {
            fetchWorkouts()
        }
    }, [dispatch, user])
    //external function which are not defined in the useEffect have to be placed inside the dependencies array, as these functions may update state
    return (
        <div className="home">

            <Link className="flex flex-row-reverse -mr-16 text-4xl font-f3" to="/form">Add New Workout</Link>

            <div className="grid grid-cols-5">

                <div className="col-span-3">
                    {workouts && workouts.map(workout => (
                        <WorkoutDetails workout={workout} key={workout._id} />
                    ))}
                </div>

                <div className="col-span-2 my-auto">
                    {< LineChart chartValues={dataChart} />}
                </div>
            </div>
        </div>
    )
}

export default Home
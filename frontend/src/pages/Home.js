import { useEffect, useState } from "react"
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
                        label: 'progressive Overload',
                        data: score1,
                        backgroundColor: "rgba(255, 99, 132, 0.2)",
                        borderColor: "rgba(255, 99, 132, 1)",
                        borderWidth: 2,
                        pointBackgroundColor: "rgba(0,0,0)",
                        pointBorderColor: "rgba(41, 40, 39)"
                    }]
                });
            }
        }
        if (user) {
            fetchWorkouts()
        }
    }, [dispatch, user])
    //external function which are not defined in the useEffect have to be placed inside the dependencies array, as these functions may update state
    console.log(user);
    // console.log(user.user.name);

    return (
        <div className="home">
            {/* <h1 className="text-xl font-bold -ml-14"> Welcome back {user.user.name ? user.user.name : ""} !!</h1> */}
            <div className="grid grid-cols-7">


                <div className="col-span-4">
                    {workouts && workouts.map(workout => (
                        <WorkoutDetails workout={workout} key={workout._id} />
                    ))}
                </div>

                <div className="col-span-3 my-10 items-center">
                    <div>
                        {< LineChart chartValues={dataChart} />}
                        <div className="text-center mt-6 text-3xl">
                            <span className="font-f3"> Your Progress</span>
                        </div>
                        <div className="text-center mt-12 text-3xl ">
                            <button className="text-3xl rounded-lg">
                                <Link className="font-f3 text-center" to="/form">Add New Workout</Link>
                            </button>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home
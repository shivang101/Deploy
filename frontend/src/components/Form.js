import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useWorkoutsContext } from '../hooks/useWorkoutsContext'
import { useAuthContext } from '../hooks/useAuthContext'


export default function Form() {
    const navigate = useNavigate();
    const { dispatch } = useWorkoutsContext()
    const [title, setTitle] = useState("");
    const [exercise1, setExercise1] = useState("");
    const [weight1, setWeight1] = useState("");
    const [exercise2, setExercise2] = useState("");
    const [weight2, setWeight2] = useState("");
    const [exercise3, setExercise3] = useState("");
    const [weight3, setWeight3] = useState("");
    const [error, setError] = useState("");
    const [emptyFields, setEmptyFields] = useState([])
    const { user } = useAuthContext()

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!user) {
            setError('You must be logged in')
            return
        }
        const workout = { title, exercise1, weight1, exercise2, weight2, exercise3, weight3 }

        const response = await fetch('/api/workouts', {
            method: 'POST',
            body: JSON.stringify(workout),
            headers: {
                "Content-Type": 'application/json',
                'Authorization': `Bearer ${user.token}`
            }
        })
        const json = await response.json()
        if (!response.ok) {
            console.log("Not ok");

            setError(json.error)
            console.log(json);

            setEmptyFields(json.emptyFields)
            console.log(emptyFields);

        }
        if (response.ok) {
            setEmptyFields([])
            setTitle("")

            setExercise1("")
            setWeight1("")

            setExercise2("")
            setWeight2("")

            setExercise3("")
            setWeight3("")

            setError(null);
            console.log("new Workout added", json);
            dispatch({ type: 'CREATE_WORKOUT', payload: json })
            navigate("/")
            // Somewhere in your code, e.g. inside a handler:

        }
    }
    return (
        <>
            <form onSubmit={handleSubmit}>
                <div className="mt-5 max-w-7xl mx-auto p-5 pt-10 bg-white">

                    <div class="relative z-0 w-full mb-14 group">

                        <input type="text" id="text_title" class={` block pt-3.5 w-full h-16  text-3xl text-gray-900 bg-transparent border-0  border-r-2 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer ${emptyFields.includes("title")
                            ? " dark:border-red-600 border-r-4 border-b-4 "
                            : ""
                            } `}
                            placeholder=" "

                            onChange={(e) => setTitle(e.target.value)}
                            value={title} />

                        <label for="text_title" class={`pl-10 peer-focus:font-medium absolute text-3xl text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-1 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6`}>Muscle Group Targeted</label>
                    </div>

                    <div className="flex gap-10">
                        <div class="relative z-0 w-full mb-14 group">

                            <input type="text" id="text_title" class={`block pt-3.5 w-full h-16 border-r-2  text-3xl text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer ${emptyFields.includes("exercise1")
                                ? " dark:border-red-600 border-r-4 border-b-4 "
                                : ""
                                } `} placeholder=" " onChange={(e) => setExercise1(e.target.value)}
                                value={exercise1} />

                            <label for="text_title" class="h-0 pl-10 peer-focus:font-medium absolute text-3xl text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-1 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Exercise Name</label>
                        </div>
                        <div class="relative z-0 w-full mb-6 group">

                            <input type="number" id="text_title" class={`block border-r-2 pt-3.5 w-full h-16  text-3xl text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer ${emptyFields.includes("weight1")
                                ? " dark:border-red-600 border-r-4 border-b-4 "
                                : ""
                                } `}
                                placeholder=" " onChange={(e) => setWeight1(e.target.value)}
                                value={weight1} />

                            <label for="text_title" class="h-0 pl-10 peer-focus:font-medium absolute text-3xl text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-1 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Weight in KG</label>
                        </div>

                    </div>

                    <div className="flex gap-10">
                        <div class="relative z-0 w-full mb-14 group">

                            <input type="text" id="text_title" class={`block pt-3.5 w-full h-16  text-3xl text-gray-900 bg-transparent border-0 border-b-2 border-r-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer ${emptyFields.includes("exercise2")
                                ? " dark:border-red-600 border-r-4 border-b-4 "
                                : ""
                                } `} placeholder=" " onChange={(e) => setExercise2(e.target.value)} value={exercise2} />

                            <label for="text_title" class="h-0 pl-10 peer-focus:font-medium absolute text-3xl text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-1 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Exercise Name</label>
                        </div>
                        <div class="relative z-0 w-full mb-6 group">

                            <input type="number" id="text_title" class={`block pt-3.5 w-full h-16  text-3xl text-gray-900 bg-transparent border-0 border-b-2 border-r-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer ${emptyFields.includes("weight2")
                                ? " dark:border-red-600 border-r-4 border-b-4 "
                                : ""
                                } `} placeholder=" " onChange={(e) => setWeight2(e.target.value)}
                                value={weight2}
                            />

                            <label for="text_title" class="h-0 pl-10 peer-focus:font-medium absolute text-3xl text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-1 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Weight in KG</label>
                        </div>

                    </div>

                    <div className="flex gap-10">
                        <div class="relative z-0 w-full mb-10 group">

                            <input type="text" id="text_title" class={`block pt-3.5 w-full h-16  text-3xl text-gray-900 bg-transparent border-0 border-b-2 border-r-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer ${emptyFields.includes("exercise3")
                                ? " dark:border-red-600 border-r-4 border-b-4 "
                                : ""
                                } `} placeholder=" " onChange={(e) => setExercise3(e.target.value)}
                                value={exercise3} />

                            <label for="text_title" class="h-0 pl-10 peer-focus:font-medium absolute text-3xl text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-1 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Exercise Name</label>
                        </div>
                        <div class="relative z-0 w-full mb-10 group">

                            <input type="number" id="text_title" class={`block pt-3.5 w-full h-16  text-3xl text-gray-900 bg-transparent border-0 border-b-2 border-r-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer ${emptyFields.includes("weight3")
                                ? " dark:border-red-600 border-r-4 border-b-4 "
                                : ""
                                } `}
                                placeholder=" " onChange={(e) => setWeight3(e.target.value)}
                                value={weight3} />

                            <label for="text_title" class="h-0 pl-10 peer-focus:font-medium absolute text-3xl text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-1 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Weight in KG</label>
                        </div>

                    </div>

                    <div className='text-center my-6' >
                        <button type="submit" class="mx-auto text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-2xl w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
                    </div>
                    {error && <div className='text-center border-2 text-xl text-red-500 mx-auto'>{error}</div>}
                </div>
            </form>
        </>
    )
}

import React, { useEffect, useState } from 'react';

function Exercises() {
    const [exercises, setExercises] = useState([{
        date: new Date(),
        title: '',
        sets: [],
        content: ''
    }])

    useEffect(() => {
        fetch('/exercises').then(res => {
            if (res.ok) {
                return res.json()
            }
        }).then(jsonRes => {
            console.dir(jsonRes);
            setExercises(jsonRes);
        });
    }, []);

    function datePretty(date) {
        // Makes the date in dd/mm/yyyy format. Screw UTC!
        // The new date is a string so don't use it in comparisons. 
        let newDate = new Date(date);

        let dd = newDate.getDate();
        var mm = newDate.getMonth() + 1;
        var yyyy = newDate.getFullYear();
        if (dd < 10) {
            dd = '0' + dd;
        }

        if (mm < 10) {
            mm = '0' + mm;
        }
        newDate = `${dd}/${mm}/${yyyy}`;
        return newDate;
    }

    return <div className='container'>
        <h1>Exercises page</h1>
        {exercises.map((exercise, i) => {

            return (
                <div key={i}>
                    <h1>{datePretty(exercise.date)}</h1>
                    <h2>{exercise.title}</h2>
                    <div>{exercise.sets.map((set, i) => {
                        return (
                            <div key={i}>
                                <p>Set {i + 1}: {set[0]} reps @ {set[1]}kg</p>
                            </div>
                        )
                    })}</div>
                    <p>{exercise.content}</p>
                </div>)
        }
        )}
    </div>

}

export default Exercises;
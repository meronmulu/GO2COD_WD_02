import React, { useRef, useState } from 'react';

const questions = [
    {
        question: "Which device is required for an internet connection?",
        options1: "Modem",
        options2: "Router",
        options3: "LAN Cable",
        options4: "Pen Drive",
        ans: 1 
    },
    {
        question: "Which protocol is used for sending emails?",
        options1: "HTTP",
        options2: "SMTP",
        options3: "FTP",
        options4: "TCP",
        ans: 2
    },
    {
        question: "Which of these is a programming language?",
        options1: "HTML",
        options2: "CSS",
        options3: "JavaScript",
        options4: "Markdown",
        ans: 3
    },
    {
        question: "What type of network topology connects all devices to a central hub?",
        options1: "Star Topology",
        options2: "Ring Topology",
        options3: "Bus Topology",
        options4: "Mesh Topology",
        ans: 1
    },
    {
        question: "What is the main function of a firewall?",
        options1: "To cool down a server",
        options2: "To block unauthorized access",
        options3: "To increase internet speed",
        options4: "To manage network traffic",
        ans: 2 
    },
];

function Quiz() {
    const [index, setIndex] = useState(0);
    const [lock, setLock] = useState(false);
    const [score, setScore] = useState(0);
    const [result, setResult] = useState(false);

    const optionsRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];

    const checkAns = (e, ans) => {
        if (!lock) {
            if (questions[index].ans === ans) {
                e.target.classList.add("bg-green-300");
                setScore(prev => prev + 1);
            } else {
                e.target.classList.add("bg-red-300");
                optionsRefs[questions[index].ans - 1].current.classList.add("bg-green-300");
            }
            setLock(true);
        }
    };

    const handleNext = () => {
        if (lock) {
            if (index === questions.length - 1) {
                setResult(true);
                return 0;
            } else {
                setIndex(index + 1);
                setLock(false);
                optionsRefs.forEach(ref => {
                    ref.current.classList.remove("bg-green-300", "bg-red-300");
                });
            }
        }
    };

    const handleReset = () => {
        setIndex(0);
        setScore(0);
        setLock(false);
        setResult(false);
        optionsRefs.forEach(ref => {
            ref.current.classList.remove("bg-green-300", "bg-red-300");
        });
    };

    return (
        <div className="flex flex-col items-center bg-slate-500 min-h-screen p-10">
            <div className="w-full max-w-[600px] h-auto bg-white p-10 rounded-lg shadow-lg">
                <h1 className="text-3xl font-bold text-center text-slate-500 mb-4">
                    Quiz App
                </h1>
                {!result ? (
                    <>
                        <hr className="mb-4 border-t-2 border-slate-500" />
                        <h2 className="text-xl font-semibold mb-4 text-slate-500">
                            {index + 1}. {questions[index].question}
                        </h2>
                        <ul className="space-y-4">
                            <li ref={optionsRefs[0]} onClick={(e) => { checkAns(e, 1) }} className="h-[50px] pl-5 py-2 border border-gray-300 rounded-lg text-xl text-gray-700 cursor-pointer transition-colors">
                                {questions[index].options1}
                            </li>
                            <li ref={optionsRefs[1]} onClick={(e) => { checkAns(e, 2) }} className="h-[50px] pl-5 py-2 border border-gray-300 rounded-lg text-xl text-gray-700 cursor-pointer transition-colors">
                                {questions[index].options2}
                            </li>
                            <li ref={optionsRefs[2]} onClick={(e) => { checkAns(e, 3) }} className="h-[50px] pl-5 py-2 border border-gray-300 rounded-lg text-xl text-gray-700 cursor-pointer transition-colors">
                                {questions[index].options3}
                            </li>
                            <li ref={optionsRefs[3]} onClick={(e) => { checkAns(e, 4) }} className="h-[50px] pl-5 py-2 border border-gray-300 rounded-lg text-xl text-gray-700 cursor-pointer transition-colors">
                                {questions[index].options4}
                            </li>
                        </ul>
                        <button onClick={handleNext} className="flex flex-col items-center mt-6 mx-auto w-[200px] bg-slate-500 text-white text-lg font-semibold py-2 rounded-lg transition-colors">
                            Next
                        </button>
                        <div className="mt-4 text-center text-gray-600">
                            {index + 1} of {questions.length} questions
                        </div>
                    </>
                ) : (
                    <>
                    <div  className='flex flex-col items-center'>
                         <h2 className="text-xl font-semibold mb-4 text-slate-500">
                            You scored {score} out of {questions.length}
                        </h2>
                        <button onClick={handleReset} className="mt-4 mx-auto w-[200px] bg-slate-500 text-white text-lg font-semibold py-2 rounded-lg transition-colors">
                            Reset
                        </button>
                    </div>
                       
                    </>
                )}
            </div>
        </div>
    );
}

export default Quiz;
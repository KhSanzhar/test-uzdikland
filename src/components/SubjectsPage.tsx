import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Subject } from "../types/types";

const SubjectsPage: React.FC = () => {
    const [subjects, setSubjects] = useState<Subject[]>([]);

    useEffect(() => {
        fetch('/data/subjects.json')
            .then(response => response.json())
            .then(data => setSubjects(data))
            .catch(error => console.error('Error loading the subjects', error));
    }, []);

    return (
        <>
            <nav className="bg-white border-gray-200 dark:bg-gray-900">
                <div className="max-w-screen-xl mx-auto px-4 py-2.5 flex justify-center items-center">
                    <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
                        <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">Subjects</span>
                    </Link>
                </div>
            </nav>
            <div className="container mx-auto px-4 mt-4">
                <h1 className="text-xl font-bold text-center mb-4"> Available Subjects</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {subjects.map(subject => (
                        <div key={subject.id} className="p-4 border rounded-lg shadow-lg hover:shadow-2xl transition duration-300">
                            <Link to={`/topics/${subject.id}`} className="text-lg text-blue-700 hover:text-blue-900">
                                {subject.name}
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default SubjectsPage;

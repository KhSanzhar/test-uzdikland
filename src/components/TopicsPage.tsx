import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Topic } from "../types/types";

const TopicsPage: React.FC = () => {

    const [topics, setTopics] = useState<Topic[]>([]);
    const {subjectId} = useParams<{subjectId: string}>();

    useEffect(() => {
        fetch(`/data/topics.json`)
            .then(response => response.json())
            .then(data => {
                const relatedTopics = data.filter((topic: Topic) => topic.subjectId.toString() === subjectId);
                setTopics(relatedTopics);
            })
            .catch(error => console.error('Error loading the topics:', error));
    }, [subjectId]);

    return(
        <>
            <nav className="bg-white border-gray-200 dark:bg-gray-900">
                <div className="max-w-screen-xl mx-auto px-4 py-2.5 flex justify-center items-center">
                    <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
                        <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">Subjects</span>
                    </Link>
                </div>
            </nav>
            <div className="container mx-auto px-4">
                <h1 className="text-xl font-bold text-center my-4">Available Topics</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {topics.map(topic => (
                        <div key={topic.id} className="p-4 border rounded-lg shadow-lg hover:shadow-2xl transition duration-300">
                            <Link to={`/quiz/${topic.id}`} className="text-lg text-blue-700 hover:text-blue-900">
                                {topic.name}
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default TopicsPage;
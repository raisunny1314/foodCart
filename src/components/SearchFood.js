import { useParams } from "react-router";

export default function SearchFood() {
    let { id } = useParams();

    return (
        <>
            <h1 className="text-3xl font-bold text-gray-800 mt-10 text-center">
                Hello, I am routed to <span className="text-orange-500">{id}</span>
            </h1>
        </>
    );    
}

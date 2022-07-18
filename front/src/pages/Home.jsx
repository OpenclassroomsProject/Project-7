// import Header from "../App";
import { useEffect } from "react";
import { addHeaderJWT } from "../components/fetch/addHeaderJWT";
import { server } from "../server";

export default function Home({title}) {
    useEffect(() => {
        document.title = title
    }, [title]);

    useEffect(()=>{
        fetch(server+'api/Post/',{headers:addHeaderJWT()})
    },[])

    return (
        <>
            <p>Accueil</p>
        </>
    );
}

import { useState ,useEffect} from 'react';
import { addHeaderJWT } from '../../components/fetch/addHeaderJWT';
import { server } from '../../server';

// import Footer from './components/Footer'

export default function CreatePost({title}) {
    useEffect(() => {
        document.title=title;
    }, [title]);

    const [image, setImage] = useState(null);
    const [createObjectURL, setCreateObjectURL] = useState(null);

    const uploadToClient = (event) => {
        if (event.target.files && event.target.files[0]) {
            const i = event.target.files[0];

            setImage(i);
            setCreateObjectURL(URL.createObjectURL(i));
        }
    };
    const uploadToServer = async (event) => {
        event.preventDefault();

        const title = document.getElementById('title').value;
        const textArea = document.getElementById('textArea').value;

        console.log('tile =>', title, 'texteAeea => ', textArea);
        const body = new FormData();
        body.append('title', title);
        body.append('textArea', textArea);

        body.append('file', image);
        console.log(event.target);
        fetch(server+'api/Post/create', {
            method: 'POST',
            mode: "cors",
            headers:addHeaderJWT(),
            body,
        }).then((data,err)=>{
            console.log(data);
            if(err) console.log(err);
        })
    };
    return (
        <>
            <main className="pageContent ">
                <form id="form" className="flex flex-col  bg-white w-full h-[inherit] items-center text-center p-4 rounded-2xl ">
                    <div className="h-20 flex items-center">
                        <h1> Création d'un post :</h1>
                    </div>

                    <label className="flex flex-col">
                        Titre :<input className="bg-gray-200" type="text" id="title" />
                    </label>

                    <textarea className="bg-gray-200 w-full h-full mt-2 resize-none min-h-[100px] " id="textArea"></textarea>

                    <div>
                        <input className="m-2" type="file" id="file" onChange={uploadToClient} />
                        <img src={createObjectURL} alt='preview before upload form'/>
                        <button type="submit" className="bg-tertiary-black text-white h-10 w-full rounded-md" onClick={uploadToServer}>
                            Envoyer
                        </button>
                    </div>
                </form>
            </main>
        </>
    );
}

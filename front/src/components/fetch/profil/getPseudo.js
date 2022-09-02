import { server } from "../../../server"


const getPseudo = ( id, cb )=> {
    fetch(server+'api/profil/pseudo/'+id )
        .then( res => res.json())
        .then( ({pseudo}) => cb(pseudo))
}

export default getPseudo
export default function Avatar ({src,className, wrapper}){
    const Img = () =>{
        // return <img src={src} className={"rounded-full h-full "+{className}}   height={'100%'} alt="user profil" />;
         return <img src={src} alt="profil" className="shadow rounded-full h-[inherit]  align-middle border-none aspect-square" />
    }
    // const WrapperImg = ({children}) =>{ 

    //     const defaultClassName = ' rounded-full aspect-square ' ;
    //     const className = wrapper.className ? wrapper.className + defaultClassName : defaultClassName ;
        
    //     return <div className="flex flex-wrap justify-center">
    //         <div className="w-3/12 sm:w-4/12 px-4">
    //             <Img/>
    //         </div>
    //     </div>
    // } 

    return <img src={src} alt="profil" className="shadow rounded-full h-[inherit]  align-middle border-none aspect-square" />
}


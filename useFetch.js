import { useState, useEffect, useRef } from "react"

export const useFetch = ( url ) => {

  const isMounted = useRef(true);

  const [ state, setState ] = useState({
    data: null,
    loading: true,
    error: null
  })

  useEffect( () =>{

    return () =>{
      //  para desmontar
      isMounted.current = false;
    }

  //  esta vacio porque lo hace solo una vez y es cuando el componente se carga  
  },[])
  
  useEffect( () =>{
    
    setState({ data: null, loading: true, error: null }); 

    fetch( url )
        .then( resp => resp.json() )
        .then( data => {
          
          // ESTE setTimeOut() ERA PARA DEMOSTRAR COMO UTILIZAR EL useRef()
          // setTimeout( () =>{
            
            if( isMounted.current ){
              setState({
                loading: false,
                error: null,
                data: data
              })
            }else{
              console.log('setState no se llamo')
            }

          // },4000);
          
        })

  },[url]);
  
  return state;

}

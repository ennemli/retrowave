import gifLoading from '../images/minto-dance.gif'

export default function Loading({clicked,handleClick}:{clicked:boolean,handleClick:()=>void}){
    return (<>
    <div  className='loading'>
    {!clicked&&<div className='spinner'>
      <a href="https://bit.ly/3jtvaSO" target="_blink"> <img src={gifLoading} alt="Loading"/></a>
      </div>
      }
    {clicked&&<button onClick={handleClick}>Begin Experience</button>}
    
    </div>
    </>
    )
}
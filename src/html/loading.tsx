import gifLoading from '../images/l1.gif'

export default function Loading({clicked,handleClick}:{clicked:boolean,handleClick:()=>void}){
    return (<>
    <div  className='loading'>
    {clicked&&<div className='spinner'>
      <img src={gifLoading} alt="Loading"/>
      </div>
      }
    {!clicked&&<button onClick={handleClick}>Begin Experience</button>}
    
    </div>
    </>
    )
}
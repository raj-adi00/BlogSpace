import React, {useState,useEffect} from 'react'
import service from '../../appwrite/config'
import { Container,Postcard } from '../Index'
function Allpost() {
    const [posts,setposts]=useState([])
    useEffect(()=>{
        service.getPosts().then((res)=>{
            if(res)
            setposts(res.documents)
        })
    },[])
  return (
    <div className='w-full py-8'>
        <Container>
            <div className=' flex flex-wrap'>
                {
                    posts.length>=1 && posts.map((post)=>(
                        <div key={post.$id} className='p-2 w-1/4'>
                            <Postcard {...post}/>
                        </div>
                    ))
                }
            </div>
        </Container>
    </div>
  )
}

export default Allpost
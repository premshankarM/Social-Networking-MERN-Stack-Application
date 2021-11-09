import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../App";
import appService from "../../services/app.service";

const Profile = () => {
    const [posts,setPosts] = useState([])
    const {state,dispath} = useContext(UserContext);
    useEffect(()=>{
        appService.fetchSingleUserPosts().then((result) => {
            setPosts(result);
        }).catch((err) => {
            
        });
    },[])
    return (
        <div>
        <div class="container mx-auto profile-container pt-5">
        <div class="row border-bottom pb-5">
            <div class="col-sm-4 col-md-4 col-lg-4 col-xs-12" >
                <img src='https://cdn.pixabay.com/photo/2017/09/20/12/12/girl-2768346__340.jpg' className=' rounded-circle d-block m-auto user-profile-image'  />
            </div>
            <div class="col-sm-8 col-md-8 col-lg-8 col-xs-12">
                <h2>{state?state.email:null}</h2>
                <div className='row row-cols-auto mb-1 mt-4'>
                    <div className='col'><p><b>{posts?.length}</b> posts</p></div>
                    <div className='col'><p><b>{state?.followers?.length}</b> followers</p></div>
                    <div className='col'><p><b>{state?.following?.length}</b> following</p></div>
                </div>
                <p className='fw-bold'>{state?.name}</p>
            </div>
        </div>
        <div className='row row-cols-xs-1 row-cols-lg-3 mt-5'>
            {posts.map((item,index)=>{
                return <img src={item.photo} className='col col-xs-12 mb-4 user-profile-image' />;
            })}
        </div>
        </div>
        </div>
    );
}

export default Profile;
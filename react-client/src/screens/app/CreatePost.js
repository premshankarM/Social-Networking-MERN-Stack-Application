import { useState } from "react";
import { useHistory } from "react-router";
import appService from "../../services/app.service";

const CreatePost = () => {
    const [title,setTitle] = useState('');
    const [body,setBody] = useState('');
    const [file,setFile] = useState('');
    const history = useHistory()

    return (
        <div className='container row mx-auto mt-5'>
            <div className='col-lg-3 col-md-3 col-sm-2 col-xs-0'></div>
            <div className='col-lg-6 col-md-6 col-sm-8 col-xs-12'>
                <div class="card p-5">
                    <input value={title} onChange={(e)=>{setTitle(e.target.value)}} type="text" placeholder='Title' />
                    <input value={body} onChange={(e)=>{setBody(e.target.value)}} type="text" placeholder='Body' />
                    <div class="file-field input-field">
                    <div class="btn waves-effect waves-light #1e88e5 blue darken-1 text-light">
                        <span>Upload Image</span>
                        <input type="file" onChange={(e)=>{setFile(e.target.files[0])}}/>
                    </div>
                    <div class="file-path-wrapper">
                        <input class="file-path validate" type="text" placeholder="Upload one or more files" />
                    </div>
                    </div>
                    <button 
                    onClick={()=>{
                    var formData = new FormData();
                    formData.append('post-image', file);
                    formData.append('title',title);
                    formData.append('body',body);  
                    appService.createPost(formData).then((result) => {
                        console.log(result);
                        history.push('/')
                    }).catch((err) => {
                        console.log(err);
                    });  
                    }}
                    className="btn waves-effect waves-light mt-3 #1e88e5 blue darken-1 text-light">
                        Submit Post
                    </button>
                </div>
            </div>
            <div className='col-lg-3 col-md-3 col-sm-2 col-xs-0' ></div>
        </div>
    );
}

export default CreatePost;
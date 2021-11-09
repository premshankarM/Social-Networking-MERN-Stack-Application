import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../App";
import appService from "../../services/app.service";

const Home = () => {
  const [posts, setposts] = useState([]);
  const { state, dispath } = useContext(UserContext);
  useEffect(() => {
    appService
      .fetchAllPosts()
      .then((result) => {
        console.log(result);
        setposts(result);
      })
      .catch((err) => {
        // window.alert(err);
      });
  }, []);
  return (
    <div>
      <div className="container row mx-auto mt-5">
        <div className="col-lg-8 col-md-8 col-sm-8 col-xs-12">
          {posts.map((item, index) => {
            return (
              <div class="card">
                <div class="row my-3">
                  <div class="col-1  px-0">
                    <img
                      src="https://cdn.pixabay.com/photo/2017/09/20/12/12/girl-2768346__340.jpg"
                      alt=""
                      class="post-card-profile-image d-block ms-auto"
                    />
                  </div>
                  <div class="col-11 d-flex align-items-center justify-content-between">
                  <span class="black-text fw-bold">
                    <Link to={item.postedBy._id==state._id?`/profile`:`/profile/${item.postedBy._id}`}>
                            {item.postedBy.name}
                    </Link>
                    </span>
                    {state._id==item.postedBy._id?
                    <i 
                    onClick={()=>{
                        appService.deletePost({post_id:item._id}).then((result) => {
                            console.log(result);
                            var newPosts = posts.filter(item=>item._id !== result._id);
                            setposts(newPosts)
                        }).catch((err) => {
                            
                        });
                    }}
                    class="material-icons me-3">delete</i>:null}
                  </div>
                </div>
                <div class="card-image">
                  <img src={item.photo} />
                </div>
                <div class="card-content">
                  {item.likes.includes(state._id) ? null : (
                    <i
                      onClick={() => {
                        appService
                          .likePost({ post_id: item._id })
                        // .getOtherProfileDetails({_id:state._id})
                          .then((result) => {
                            var newData = posts.map((item) => {
                              if (item._id == result._id) {
                                return result;
                              } else return item;
                            });
                            setposts(newData);
                          })
                          .catch((err) => {});
                      }}
                      class="material-icons text-success me-3 mb-4"
                    >
                      thumb_up
                    </i>
                  )}
                  {item.likes.includes(state._id) ? (
                    <i
                      onClick={() => {
                        appService
                          .unlikePost({ post_id: item._id })
                          .then((result) => {
                            var newData = posts.map((item) => {
                              if (item._id == result._id) {
                                return result;
                              } else return item;
                            });
                            setposts(newData);
                          })
                          .catch((err) => {});
                      }}
                      class="material-icons text-danger"
                    >
                      thumb_down
                    </i>
                  ) : null}
                  <h5>{item.likes.length}</h5>
                  <h5>{item.title}</h5>
                  <p>{item.body}</p>
                  {item.comments.map((i, index) => {
                    return (
                      <p>
                        <span className="fw-bold">{i.postedBy.name}</span>{" "}
                        {i.text}
                      </p>
                    );
                  })}
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      appService
                        .commentPost({
                          post_id: item._id,
                          text: e.target[0].value,
                        })
                        .then((result) => {
                          var newData = posts.map((item) => {
                            if (item._id == result._id) {
                              return result;
                            } else return item;
                          });
                          setposts(newData);
                        })
                        .catch((err) => {});
                    }}
                  >
                    <input type="text" placeholder="Comment" />
                  </form>
                </div>
              </div>
            );
          })}
        </div>
        <div className="col-lg-4 col-md-4 col-sm-4 col-xs-0"></div>
      </div>
    </div>
  );
};

export default Home;

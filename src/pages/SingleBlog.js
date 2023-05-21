import React from 'react'
import Meta from '../components/Meta';
import { Link } from 'react-router-dom';
import {HiOutlineArrowLeft,HiOutlineArrowRight} from 'react-icons/hi';
import {useLocation} from 'react-router-dom';
import { useDispatch,useSelector } from 'react-redux';
import BreadCrumb from '../components/BreadCrumb'
import { getBlog } from '../features/blog/blogSlice';
const SingleBlog = () => {
  const location = useLocation();
  const blogId = location.pathname.split('/')[2];
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(getBlog(blogId))
  },[blogId])
  const blogSel = useSelector((state) => state.blog.blog);
  console.log(blogSel);
  return (
    <>
      <Meta title={blogSel?.title}/>
      <BreadCrumb title={blogSel?.title}/>
      <div className="blog-wrapper home-wrapper-2 py-5">
            <div className="container-xxl">
              <div className="row">
                <div className="col-12">
                  <div className="single-blog-card">
                    
                    <Link to='/blogs' className="d-flex gap-1 align-items-center">
                    <HiOutlineArrowLeft className="fs-5"/>
                      Go Back to Blogs
                      </Link>
                    <h3 className="title">
                      {blogSel?.title}
                    </h3>
                    <div className="row">
                      {
                        blogSel?.images?.map((image) => {
                          return  (
                          <div className="col-sm-6 col-md-4 col-lg-3">
                            <img src={image.url} 
                            style={{height:'400px',objectFit:'cover',objectPosition:'top left'}} 
                            className="img-fluid my-4 w-100" alt="blog"/>
                          </div>
                          )
                        })
                      }
                    </div>
                    <p dangerouslySetInnerHTML={{__html : blogSel?.description}}></p>
                  </div>
                </div>
              </div>
            </div>
        </div>
    </>
  )
}

export default SingleBlog
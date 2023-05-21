import React from 'react'
import BreadCrumb from '../components/BreadCrumb';
import Meta from '../components/Meta';
import BlogCard from '../components/BlogCard';
import {useSelector,useDispatch} from 'react-redux';
import { getAllBlogs } from '../features/blog/blogSlice';
import BlogCardPlaceholder from '../components/BlogCardPlaceholder';
const Blog = () => {
  const dispatch = useDispatch();
  React.useEffect (() => {
    dispatch(getAllBlogs());
  },[])
  const [blogs,setBlogs] = React.useState([]);
  const blogsSel = useSelector((state) => state.blog);
  React.useEffect(() => {
    if(blogsSel) {
      setBlogs(blogsSel.blogs);
    }
  },[blogsSel])
  return (
    <div>
        <Meta title={"Blogs"} />
        <BreadCrumb title={"Blogs"}/>
        <div className="blog-wrapper home-wrapper-2 py-5">
            <div className="container-xxl">
              <div className="row">
                <div className="col-3">
                  <div className="filter-card mb-3">
                    <h3 className="filter-title">Find By Categories</h3>
                    <div>
                      <ul className='ps-0'>
                        <li>Watch</li>
                        <li>TV</li>
                        <li>Camera</li>
                        <li>Laptop</li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="col-9">
                  {
                    blogs.length > 0 ?
                      <div className="row">
                        {

                          blogs?.map((blog,i) => {
                            return (
                              <div key={i} className="col-sm-12 col-md-6 ">
                                <BlogCard blog={blog}/>
                              </div>
                            )
                          })
                        }
                      </div>
                      :
                      <div className="row  mt-4">
                        <div className="col-sm-12 col-md-6">
                          <BlogCardPlaceholder/>
                        </div>
                        <div className="col-sm-12 col-md-6">
                          <BlogCardPlaceholder/>
                        </div>
                        <div className="col-sm-12 col-md-6">
                          <BlogCardPlaceholder/>
                        </div>
                        <div className="col-sm-12 col-md-6">
                          <BlogCardPlaceholder/>
                        </div>
                        <div className="col-sm-12 col-md-6">
                          <BlogCardPlaceholder/>
                        </div>
                        <div className="col-sm-12 col-md-6">
                          <BlogCardPlaceholder/>
                        </div>
                      </div>
                  }
                </div>
              </div>
            </div>
        </div>
    </div>
  )
}

export default Blog
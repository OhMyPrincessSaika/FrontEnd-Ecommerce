import React from 'react'
import { Link } from 'react-router-dom'
import LazyImage from './LazyImage';
import BlogCardPlaceholder from './BlogCardPlaceholder';
const BlogCard = (props) => {
    const {blog} = props;
    const [isLoading,setIsLoading] = React.useState(true);
    const date = new Date(blog.createdAt).toLocaleString('en-US' , {
        day : 'numeric',
        month : 'short',
        year : 'numeric'
    });
    const handleLoaded = () => {
        setIsLoading(false);
    }
  return (
        <>
            {isLoading && <BlogCardPlaceholder/>}
            <div className="blog-card"  style={{display: isLoading ? 'none' : 'block'}}>
                <div className="card-image">
                    <LazyImage  
                    handleLoaded={handleLoaded}
                    src={blog.images[0].url} 
                    className="img-fluid w-100" alt="blog"
                    />
                </div>
                <div className="blog-content">
                    <p className="date">{date}</p>
                    <h5 className="title">
                        {blog.title}
                    </h5>
                    <p className="desc" dangerouslySetInnerHTML={{__html : blog.description}}>
                        
                    </p>
                    <Link to={`/blog/${blog._id}`} className="button">Read More</Link>
                </div>
            </div>
        </>
   
  )
}

export default BlogCard
import React from 'react'
const LazyImage = (props) => {
  const [inView,setInView] = React.useState(false);
  const ref = React.useRef();
  React.useEffect(() => {
     let callback = (entries,obsever) => {
        entries.forEach((entry) => {
            if(entry.isIntersecting) {
                setInView(true);
            }
        })
     }
     let observer = new IntersectionObserver(callback);
     if(ref?.current) {
         observer.observe(ref.current);
     }

     return () => {
        observer.disconnect()
     }
  },[])
 

  return (
    
        // inView ? 
        <img
        // loading='lazy'
        onLoad={props.handleLoaded}
        width={props?.width}
        height={props?.height}
        src={props.src}
        style={{objectFit:'cover',objectPosition:'left top'}}
        className={`${props.width || props.height ? '' : props.className}`}
        />
        // :
        
      
        // <div
        // id={props.id}
        // ref={ref}
        // style={{width:'240px',height:'150px'}}
        // />
    
  )
}

export default LazyImage
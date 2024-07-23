import React, { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
const InfinteScroll = () => {
  const [start, setStart] = useState(0);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);
  const [postData, setPostData] = useState([]);
  const [ref, inView] = useInView();
  const getData = async ({ start, limit }) => {
    const fetchData = await fetch(
      `https://jsonplaceholder.typicode.com/photos?_start=${start}&_limit=${limit}`
    );

    const newData = await fetchData.json();
    setPostData((prevData) => [...prevData, ...newData]);
  };

  useEffect(() => {
    if (inView) {
      setPage((prevPage) => prevPage + 1);
    }
  }, [inView]);

  console.log(postData);
 useEffect(() => {
    if (page > 0) {
      const start = (page - 1) * limit;
      setStart(start);
      getData({ start, limit });
    }
  }, [page, limit]);
  return (
    <>
      <section>
        <div className="mainContainer">
          <div className=" w-full">
            {postData &&
              postData.map((data, index) => (
                // console.log(data)
                <>
                  <div className="postcontainer" key={index}>
                    <img
                      src={data.thumbnailUrl}
                      alt={data.title}
                      className="postimage"
                    />
                    <h2>{data.id}</h2>
                    <h1>{data.title}</h1>
                  </div>
                </>
              ))}

            <h2 ref={ref}>Loadding....</h2>
          </div>
        </div>
      </section>
    </>
  );
};

export default InfinteScroll;

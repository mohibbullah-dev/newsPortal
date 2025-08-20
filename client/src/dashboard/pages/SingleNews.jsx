import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { base_url } from "../../config/config";
import { storeContext } from "../../context/storeContext";

const SingleNews = () => {
  const { news_id } = useParams();
  const { store } = useContext(storeContext);
  const [title, setTitle] = useState("");
  const [description, setDescripton] = useState("");
  const [image, setImage] = useState({});

  const getSinglenews = async () => {
    try {
      const { data } = await axios.get(
        `${base_url}/api/v1/single-news/${news_id}`,
        {
          headers: {
            Authorization: `Bearer ${store.token}`,
          },
        }
      );

      const { title, description, image } = data.data;

      setTitle(title);
      setImage(image);
      setDescripton(description);
    } catch (error) {}
  };

  useEffect(() => {
    getSinglenews();
  }, []);

  return (
    <div className=" flex bg-white h-screen w-screen">
      <div className="flex flex-col bg-gray-50 w-[60%] p-5 gap-5">
        <div>
          <h2 className="text-5xl font-bold text-black">{title}</h2>
        </div>
        <div>{image?.url && <img src={image.url} alt={title} />}</div>
        <div>
          <div
            className="prose max-w-none"
            dangerouslySetInnerHTML={{ __html: description }}
          />
        </div>
      </div>
    </div>
  );
};

export default SingleNews;

// import axios from "axios";
// import React, { useContext, useEffect, useState } from "react";
// import { useParams } from "react-router";
// import { base_url } from "../../config/config";
// import { storeContext } from "../../context/storeContext";

// const SingleNews = () => {
//   const { news_id } = useParams();
//   const { store } = useContext(storeContext);
//   const [title, setTitle] = useState("");
//   const [description, setDescripton] = useState("");
//   const [image, setImage] = useState({});

//   const getSinglenews = async () => {
//     try {
//       const { data } = await axios.get(
//         `${base_url}/api/v1/single-news/${news_id}`,
//         {
//           headers: {
//             Authorization: `Bearer ${store.token}`,
//           },
//         }
//       );

//       const { title, description, image } = data.data;

//       setTitle(title);
//       setImage(image);
//       // ❌ convert(description) ব্যবহার কোরো না
//       setDescripton(description);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   useEffect(() => {
//     getSinglenews();
//   }, []);

//   return (
//     <div className="flex bg-white min-h-screen w-screen">
//       <div className="flex flex-col bg-gray-50 w-[60%] p-5 gap-5">
//         <h2 className="text-5xl font-bold text-black">{title}</h2>

//         {image?.url && <img src={image.url} alt={title} />}

//         {/* এখানে ভিডিও + ইমেজ + টেক্সট সব শো করবে */}
//         <div
//           className="prose max-w-none"
//           dangerouslySetInnerHTML={{ __html: description }}
//         />
//       </div>
//     </div>
//   );
// };

// export default SingleNews;

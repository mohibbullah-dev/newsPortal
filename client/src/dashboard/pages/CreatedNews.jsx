import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router";
import { MdCloudUpload } from "react-icons/md";
import JoditEditor from "jodit-react";
import Gellary from "../components/Gellary";
import toast from "react-hot-toast";
import axios from "axios";
import { useContext } from "react";
import { storeContext } from "../../context/storeContext";
import { base_url } from "../../config/config";

const CreatedNews = () => {
  const [show, setShow] = useState(false);
  const [loader, setLoader] = useState(false);
  const { store } = useContext(storeContext);
  const editor = useRef(null);

  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [img, setImg] = useState("");
  const [description, setDescription] = useState("");

  // গ্যালারি আইটেমগুলো একই শেপে রাখবো:
  // { tempId?, dbId?, preview, url? }
  const [galleryImages, setGalleryImages] = useState([]);

  const imageHandler = (e) => {
    const { files } = e.target;
    if (files.length > 0) {
      setImg(URL.createObjectURL(files[0]));
      setImage(files[0]);
      console.log("news-image", img);
      console.log("news-image", files[0]);
    } else {
      console.log("please select a img");
    }
  };

  const added = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("image", image);
    formData.append("description", description);
    try {
      setLoader(true);
      const { data } = await axios.post(
        `${base_url}/api/v1/news-create`,
        formData,
        {
          headers: { Authorization: `Bearer ${store.token}` },
        }
      );
      setLoader(false);

      setTitle("");
      setImage("");
      setDescription("");
      setImg("");

      if (!data) {
        toast.error("server error");
      } else {
        toast.success(data.message);
      }
    } catch (error) {
      setLoader(false);
      toast.error(error?.response?.data?.message || "Error");
    }
  };

  // DB থেকে পুরনো গ্যালারি আনবো
  const getGalleries = async () => {
    try {
      const { data } = await axios.get(`${base_url}/api/v1/get-gelleries`, {
        headers: { Authorization: `Bearer ${store.token}` },
      });

      const mapped = (data?.data || []).map((g) => ({
        dbId: g._id,
        preview: g.image.url, // দেখানোর জন্যও এটা
        url: g.image.url, // কপি করার আসল URL
      }));

      // লোকাল প্রিভিউ থাকলে সেগুলো রেখে DB গুলো **append/merge**
      setGalleryImages((prev) => {
        const existingDbIds = new Set(
          prev.filter((p) => p.dbId).map((p) => p.dbId)
        );
        const merged = [
          ...prev,
          ...mapped.filter((m) => !existingDbIds.has(m.dbId)),
        ];
        return merged;
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getGalleries();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const imageHandle = async (e) => {
    const filesArray = Array.from(e.target.files);

    // লোকাল প্রিভিউ + tempId
    const now = Date.now();
    const previewFiles = filesArray.map((file, idx) => ({
      tempId: String(now + Math.random() + "_" + idx), // string tempId
      file,
      preview: URL.createObjectURL(file), // blob url
    }));

    // আগে প্রিভিউ দেখানো
    setGalleryImages((prev) => [...prev, ...previewFiles]);

    try {
      const formData = new FormData();
      previewFiles.forEach((img) => {
        formData.append("images", img.file);
        formData.append("tempIds", img.tempId); // tempId আলাদা key-তে
      });

      const { data } = await axios.post(
        `${base_url}/api/v1/add-gellery`,
        formData,
        {
          headers: { Authorization: `Bearer ${store.token}` },
        }
      );

      // data এর শেপ: [{ tempId: "string", url: "...", id: "...", public_id: "..." }, ...]
      const serverList = Array.isArray(data) ? data : [];

      setGalleryImages((prev) =>
        prev.map((item) => {
          // tempId দুইপাশেই string করছি
          const match = serverList.find(
            (dbImg) => String(dbImg.tempId) === String(item.tempId)
          );
          if (!match) return item;

          // পুরনো blob URL revoke করে নতুন cloud URL বসানো
          if (item.preview && item.preview.startsWith("blob:")) {
            try {
              URL.revokeObjectURL(item.preview);
            } catch (_) {}
          }

          return {
            ...item,
            dbId: match.id,
            url: match.url,
            preview: match.url, // UI-তেও এখন থেকে cloud URL
          };
        })
      );

      // চাইলে DB গ্যালারি fresh করে আনতে পারো (append merge হবে)
      // await getGalleries();
    } catch (error) {
      console.log(error);
      toast.error("Upload failed");
    }
  };

  return (
    <div className="bg-white rounded-md p-4">
      <div className="bg-white flex justify-between items-center text-lg rounded-sm pb-4">
        <h2 className="text-2xl text-black font-semibold">Add news</h2>
        <Link
          className="bg-blue-500 rounded-sm text-white px-3 py-2 hover:bg-blue-600"
          to="/dashboard/news"
        >
          News
        </Link>
      </div>

      <div className="">
        <form onSubmit={added} className="flex flex-col gap-6">
          <div className="flex min-w-full flex-col items-start gap-1">
            <label className="text-xl text-gray-500" htmlFor="title">
              Title
            </label>
            <input
              required
              onChange={(e) => setTitle(e.target.value)}
              value={title}
              className="outline-none border min-w-full px-3 py-2 rounded-sm border-gray-200 focus:border-indigo-200"
              type="text"
              name="title"
              id="title"
              placeholder="title"
            />
          </div>

          <div className="flex items-start justify-center flex-col">
            <label
              htmlFor="img"
              className="border border-gray-200 hover:border-3 border-dashed w-full h-[250px] flex flex-col items-center justify-center cursor-pointer gap-3"
            >
              {img ? (
                <img className="h-full w-full object-cover" src={img} alt="" />
              ) : (
                <>
                  <span>
                    <MdCloudUpload className="text-4xl" />
                  </span>
                  <span className="text-lg">Select Image</span>
                </>
              )}
            </label>
            <input
              required
              onChange={imageHandler}
              className="hidden"
              type="file"
              name="img"
              id="img"
            />
          </div>

          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-start gap-3">
              <span>Descritpion</span>
              <MdCloudUpload
                onClick={() => setShow(true)}
                className="text-3xl cursor-pointer"
              />
            </div>

            <JoditEditor
              ref={editor}
              value={description}
              onChange={() => {}}
              onBlur={(valu) => setDescription(valu)}
              tabIndex={1}
            />

            {/* গ্যালারিতে যুক্ত করার ইনপুট */}
            <input
              className="hidden"
              onChange={imageHandle}
              type="file"
              name="image"
              multiple
              id="image"
            />

            {show && <Gellary setShow={setShow} images={galleryImages} />}
          </div>

          <div>
            <button
              disabled={loader}
              className="bg-blue-500 rounded-sm text-white px-3 py-2 hover:bg-blue-600 text-lg disabled:opacity-60"
            >
              {loader ? "Saving..." : "Add news"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatedNews;

import React, { useRef, useState } from "react";
import { AiFillFileImage } from "react-icons/ai";
import { BsTrash3Fill } from "react-icons/bs";

const ImageGallery = () => {
  const [images, setImages] = useState([]);
  const [selectedImages, setSelectedImages] = useState([]);

  //   adding image to the images array
  const addImage = (e) => {
    const files = e.target.files;
    if (files.length > 0) {
      const imageUrls = Array.from(files).map((file) =>
        URL.createObjectURL(file)
      );
      setImages([...images, ...imageUrls]);
    }
  };
  // Select Image
  const selectImage = (index) => {
    if (selectedImages.includes(index)) {
      setSelectedImages(selectedImages.filter((i) => i !== index));
    } else {
      setSelectedImages([...selectedImages, index]);
    }
  };
  //   Delete selected Images
  const deleteSelectedImages = () => {
    const remainingImages = images.filter(
      (_, index) => !selectedImages.includes(index)
    );
    setImages(remainingImages);
    setSelectedImages([]);
  };

  let imageItemDrag = useRef();
  let imageItemDragOver = useRef();

  const dragStart = (e, index) => {
    imageItemDrag.current = index;
    // console.log(e, " Drag Start>>>>>>", index);
  };
  const dragEnter = (e, index) => {
    imageItemDragOver.current = index;

    // console.log(e, "Drag Enter>>>>>>", index);
  };

  const dragEnd = (e, index) => {
    const arr1 = [...images];

    const image_item_main = arr1[imageItemDrag.current];
    arr1.splice(imageItemDrag.current, 1);
    arr1.splice(imageItemDragOver.current, 0, image_item_main);

    imageItemDrag.current = null;
    imageItemDragOver.current = null;
    setImages(arr1);
    // console.log(e, "Drag End>>>>>>", index);
  };

  const dragOver = (e) => {
    e.preventDefault();
    // console.log("drag over==>>");
  };

  // console.log(images);
  // console.log(selectedImages);

  return (
    <div className=" sm:min-h-[600px] h-full pb-6 sm:pb-10 md:w-[600px] xl:w-[1000px] bg-white mx-2 sm:mx-auto my-5 rounded-md shadow-md">
      <div className=" my-5 border-b-2 border-black/50 flex justify-between p-4">
        {/* Heading will change when any item will select */}
        {selectedImages.length > 0 ? (
          <div className=" flex gap-2 items-center text-sm sm:text-xl font-bold">
            <input
              type="checkbox"
              className=" w-4 h-4"
              checked
              onChange={() => setSelectedImages([])}
            />
            <p>{selectedImages.length} Files Selected</p>
          </div>
        ) : (
          <h1 className=" text-xl font-bold ">Photo Gallery</h1>
        )}
        {/* Delete button based on selected length */}

        {selectedImages.length > 0 && (
          <div
            onClick={deleteSelectedImages}
            className=" flex items-center text-red-600 px-2 py-1 gap-2 border bg-slate-200 rounded-sm hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <BsTrash3Fill className=" w-5 h-5" />
            <button className=" font-semibold">Delete</button>
          </div>
        )}
      </div>

      {/* dran and drop */}

      <div
        onDragOver={dragOver}
        className=" grid gap-2 sm:gap-3 xl:gap-4 grid-cols-3 sm:grid-cols-5 items-center sm:mx-4 mx-2 "
      >
        {images.map((image, index) => {
          return (
            <div
              onDragStart={(e) => dragStart(e, index)}
              onDragEnter={(e) => dragEnter(e, index)}
              onDragEnd={(e) => dragEnd(e, index)}
              draggable
              key={index}
              className={` w-full h-full sm:border border-black p-0 rounded-lg sm:rounded-md cursor-pointer shadow-sm relative group transition-all ${
                selectedImages.includes(index)
                  ? " border-2 border-blue-600 "
                  : ""
              }  ${index === 0 ? " col-span-2 row-span-2" : ""}`}
            >
              <div
                className={` w-full h-full bg-blue-950 p-0 rounded-lg sm:rounded-md absolute top-0 left-0 opacity-0 group-hover:opacity-70 transition-all duration-300 ${
                  selectedImages.includes(index) ? " !opacity-30 " : ""
                }`}
              ></div>
              <img
                className=" w-full h-full rounded-lg sm:rounded-md bg-black hover:opacity-50"
                src={image}
                alt={`Image ${index}`}
              />
              <input
                className={`absolute top-2 left-2 sm:top-4 sm:left-4 hidden cursor-pointer group-hover:block sm:w-5 sm:h-5 h-4 w-4 ${
                  selectedImages.includes(index) ? " !block " : ""
                }`}
                type="checkbox"
                checked={selectedImages.includes(index)}
                onChange={() => selectImage(index)}
              />
            </div>
          );
        })}

        {/* Add image button */}
        <div
          className=" h-full w-full min-w-[100px] min-h-[100px] flex justify-center flex-col items-center bg-neutral-100 cursor-pointer rounded-md border-neutral-600 border-dashed border hover:bg-neutral-200 transition-colors"
          onClick={() => document.querySelector("#image_input").click()}
        >
          <input
            id="image_input"
            type="file"
            accept="image/*"
            multiple
            onChange={(e) => addImage(e)}
            hidden
          />
          <AiFillFileImage className=" w-8 h-8" />
          <p className=" font-semibold">Add Images</p>
        </div>
      </div>
      {/* Image upload alert */}
      {images.length <= 0 && (
        <p className=" text-center animate-pulse text-red-500 text-lg sm:text-2xl sm:pt-20 pt-10">
          Please upload images to see the collage
        </p>
      )}
    </div>
  );
};

export default ImageGallery;

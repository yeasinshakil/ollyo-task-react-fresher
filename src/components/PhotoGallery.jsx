import React, { useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { AiFillFileImage } from "react-icons/ai";
import { BsTrash3Fill } from "react-icons/bs";

const PhotoGallery = () => {
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

  // Drag and sorting function
  const handleDragEnd = (result) => {
    if (!result.destination) return;
    const items = Array.from(images);
    const [reOrderItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reOrderItem);
    setImages(items);
    console.log(result);
  };
  //   console.log(images);
  //   console.log(selectedImages);

  return (
    <div className=" min-h-[600px] h-full pb-10 w-[1000px] bg-white mx-auto my-5 rounded-md shadow-md">
      <div className=" my-5 border-b-2 border-black/50 flex justify-between p-4">
        {/* Heading will change when any item will select */}
        {selectedImages.length > 0 ? (
          <div className=" flex gap-2 items-center text-xl font-bold">
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
      <DragDropContext onDragEnd={handleDragEnd}>
        {/* Droppable from react beautiful dnd */}

        <Droppable droppableId="imageGrid" type="PERSON">
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className="gridImages grid gap-4 grid-cols-5 items-center mx-4 "
            >
              <span style={{ display: "none" }}>{provided.placeholder}</span>
              {images.map((image, index) => {
                return (
                  // Draggable from react beautiful dnd
                  <Draggable
                    type="PERSON"
                    key={index}
                    draggableId={index.toString()}
                    index={index}
                  >
                    {(provided) => (
                      <div
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                        id="gridImages"
                        className={` gridImages w-full h-full border border-black p-0 rounded-md shadow-sm relative group transition-all ${
                          selectedImages.includes(index)
                            ? " border-2 border-blue-600 "
                            : ""
                        }  ${index === 0 ? " col-span-2 row-span-2" : ""}`}
                      >
                        <div
                          className={` w-full h-full bg-blue-950 absolute top-0 left-0 opacity-0 group-hover:opacity-70 transition-all ${
                            selectedImages.includes(index)
                              ? " !opacity-30 "
                              : ""
                          }`}
                        ></div>
                        <img
                          className=" w-full h-full rounded-md bg-black hover:opacity-50"
                          src={image}
                          alt={`Image ${index}`}
                          onClick={() => setFeatureImage(image)}
                        />
                        <input
                          className={`absolute top-4 left-4 hidden cursor-pointer group-hover:block w-5 h-5 ${
                            selectedImages.includes(index) ? " !block " : ""
                          }`}
                          type="checkbox"
                          checked={selectedImages.includes(index)}
                          onChange={() => selectImage(index)}
                        />
                        {provided.placeholder}
                      </div>
                    )}
                  </Draggable>
                );
              })}
              {/* Add image button */}
              <div
                className=" h-full w-full min-w-[100px] min-h-[100px] flex justify-center flex-col items-center bg-neutral-100 cursor-pointer rounded-md border-neutral-600 border-dashed border"
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
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default PhotoGallery;

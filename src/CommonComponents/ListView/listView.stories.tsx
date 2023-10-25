import React from "react";
import ListView from "./ListView";

export default {
    title: 'List-View',
    component: ListView
}

const cardData = {
    imageUrl: "../../assets/images/norway.jpg",
    imageLabel: "Norway",
    description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quod, ea?",
    folderId: "0",
    url: "google.com",
    id: "0"
}

export const Primary = () => {
    return(
        <>
            <ListView 
                foldersPath="Folder 1/Folder 2/Folder 3" 
                changeHandler={() => {}}
                onCopy={() => {}}
                onEdit={() => {}}
                onDelete={() => {}}
                onFavourite={() => {}}
                cardData={cardData}
            />
        </>
    );
    
}
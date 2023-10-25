import Card from "./Card";

export default {
    title: 'Card',
    component: Card
}

const path = "Folder 1/Folder 2/Folder 3"

const cardData = {
    imageUrl: "../../assets/images/norway.jpg",
    imageLabel: "Norway",
    description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quod, ea?",
    folderId: "0",
    url: "google.com",
    id: "0"
}

const onEdit = (id: string) => {
    console.log("Edit!")
}

const onDelete = (id: string) => {
    console.log("Delete!")
}

const onSelect = (id: string) => {
    console.log("Select!")
    console.log(id)
}

const onFav = (id: string) => {
    console.log("Favourite!")
}

export const Primary = ()=> <Card cardId="" path={path} cardData={cardData} onEdit={onEdit} onDelete={onDelete} onSelect={(id) => onSelect(id)} onFav={onFav}></Card>
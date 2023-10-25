import { ColoredTag } from "./tag-colored";


export default {
    title: 'Colored Tags',
    component: ColoredTag,
}


export const Color1 = () => {
    return(
        <>
        <ColoredTag tagColor="#C9F4FB" label="Tag 1"/>{' '}
        <ColoredTag tagColor="#FFFAC9" label="Tag 2"/>{' '}
        <ColoredTag tagColor="#D7FF33" label="Tag 3"/>
        </>
    );
    
} 

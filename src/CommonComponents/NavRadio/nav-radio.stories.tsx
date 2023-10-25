import NavRadio from "./nav-radio";

export default {
    title: 'NavRadio',
    component: NavRadio
}

export const Primary = () => 
    <>
        <NavRadio title="All Projects" checked={true} onSelect={() => {}}>
            All Projects
        </NavRadio>
        <NavRadio title="Root" onSelect={() => {}}>
            Root
        </NavRadio>
        <NavRadio title="Favourites" onSelect={() => {}}>
            Favourites
        </NavRadio>
    </>

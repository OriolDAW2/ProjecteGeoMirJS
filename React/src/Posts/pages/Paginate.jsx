import { useSelector } from "react-redux";
import { PaginateLink } from "./PaginateLink";

export const Paginate = ({}) => {

    const { pages } = useSelector((state) => state.posts);

    return (
        <>
            <ul className="py-5 flex flex-row">
            { pages.map ( (page)=> (
                
                <PaginateLink page={page}/>
                
            ) ) }
            </ul>
        </>
    )
}
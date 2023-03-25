import { useSelector } from "react-redux";
import styles from './Paginate.module.css'

export const Pagination = ({ page, setPage }) => {
    const allProducts = useSelector((state) => state.products);

    let maxPage = Math.ceil(allProducts.length / 15);

    const handlerNext = () => {
        setPage(page + 1);
    };

    const handlerPreview = () => {
        if (page > 1) setPage(page - 1);
    };

    return (        
        <div >
            <button onClick={() => { handlerPreview() }} >
                PREVIUS
            </button>
            <p>{page} of {maxPage}</p>
            <button onClick={() => { handlerNext() }} >
                NEXT
            </button>
        </div>
    );
};
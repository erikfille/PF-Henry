import styles from './Paginate.module.css'

export const Pagination = ({ page, setPage }) => {
    //... traer los productos del store

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
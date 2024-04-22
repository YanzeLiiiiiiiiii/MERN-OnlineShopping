import { Link } from 'react-router-dom'
import { Carousel, Image } from 'react-bootstrap'
import Message from './Message'
import { useGetProductsQuery } from '../slices/productsApiSlice'



const TopProducts = () => {
    const { data, isLoading, isError } = useGetProductsQuery(1)
    console.log(data)
    return isLoading ? null : isError ? (
        <Message variant='danger'>{isError?.data?.message || isError.error}</Message>
    ) : (
        <Carousel pause='hover' className='bg-primary mb-4'>
            {data.products.map((product) => (
                <Carousel.Item key={product._id}>
                    <Link to={`/product/${product._id}`}>
                        <Image src={product.image} alt={product.name} fluid />
                        <Carousel.Caption className='carousel-caption'>
                            <h2 className='text-white text-right'>
                                {product.name} (${product.price})
                            </h2>
                        </Carousel.Caption>

                    </Link>
                </Carousel.Item>
            ))}
        </Carousel>
    );
};

export default TopProducts
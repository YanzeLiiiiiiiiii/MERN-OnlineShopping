import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Rating from '../components/Rating'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useGetProductDetailsQuery, useCreateReviewMutation } from '../slices/productsApiSlice'
import { addToCart } from '../slices/cartSlice'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { Form, Row, Col, Image, ListGroup, Card, Button } from 'react-bootstrap'
import { toast } from 'react-toastify'


const ProductDetail = () => {
    const { id } = useParams()
    const [rating, setRating] = useState(0)
    const [comment, setComment] = useState('')
    const { userInfo } = useSelector((state) => state.auth)

    // const [product, setProducts] = useState([])
    // useEffect(() => {
    //     const getProducts = async () => {
    //         const data = await axios.get(`/products/${id}`)

    //         setProducts(data.data)
    //     }
    //     getProducts()

    // }, [id])
    const dispatch = useDispatch()
    const nevigate = useNavigate()

    const { data: product, isLoading, isError, refetch } = useGetProductDetailsQuery(id)

    const [createReview, { isLoading: loadingProductReview }] = useCreateReviewMutation()

    const [qty, setQty] = useState(1)

    const addToCartHandler = () => {
        dispatch(addToCart({ ...product, qty }))
        nevigate('/cart')
    }


    const submitHandler = async (e) => {
        e.preventDefault()
        try {
            await createReview({
                id,
                rating,
                comment,
            }).unwrap()
            refetch()
            toast.success('Review created successfully');
        } catch (err) {
            toast.error(err?.data?.message || err.error);
        }
    };
    return (
        <>
            {isLoading ? (<Loader />) : isError ? (<Message variant='danger'>Something Went Wrong</Message>) : (
                <>
                    <Link className='btn btn-light my-3' to='/'>
                        Back
                    </Link>
                    <>
                        <Row>
                            <Col md={5}>
                                <Image src={product.image} alt={product.name} fluid></Image>

                            </Col>
                            <Col md={4}>
                                <ListGroup variant='flush'>
                                    <ListGroup.Item>
                                        <h3> {product.name}</h3>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <Rating value={product.rating} text={`${product.numReviews} reviews`} />
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <h3> Price: ${product.price}</h3>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        {product.description}
                                    </ListGroup.Item>
                                </ListGroup>
                            </Col>

                            <Col md={3}>
                                <Card>

                                    <ListGroup variant='flush'>
                                        <ListGroup.Item>
                                            <Row>
                                                <Col>Price</Col>
                                                <Col> ${product.price}</Col>
                                            </Row>

                                        </ListGroup.Item>
                                        <ListGroup.Item>
                                            <Row>
                                                <Col>Status</Col>
                                                <Col> {product.countInStock ? 'In Stock' : 'Out Of Stock'}</Col>
                                            </Row>
                                        </ListGroup.Item>

                                        {product.countInStock > 0 && (
                                            <ListGroup.Item>
                                                <Row>
                                                    <Col>Qty</Col>
                                                    <Col>
                                                        <Form.Control
                                                            as='select'
                                                            value={qty}
                                                            onChange={e => setQty(Number(e.target.value))}
                                                        >

                                                            {[...Array(product.countInStock).keys()].map(item => {
                                                                return (
                                                                    <option key={item + 1} value={item + 1}>{item + 1}</option>
                                                                )
                                                            })}
                                                        </Form.Control>

                                                    </Col>
                                                </Row>
                                            </ListGroup.Item>
                                        )}
                                        <ListGroup.Item>
                                            <Button
                                                onClick={addToCartHandler}
                                                className='btn-block'
                                                type='button'
                                                disabled={product.countInStock === 0}
                                            >
                                                Add To Cart
                                            </Button>
                                        </ListGroup.Item>

                                    </ListGroup>

                                </Card>
                            </Col>

                        </Row>
                    </>
                    <Row className='review'>
                        <Col md={6}>
                            <h2>Reviews</h2>
                            {product.reviews.length === 0 && <Message>No Reviews</Message>}
                            <ListGroup variant='flush'>
                                {product.reviews.map((review) => (
                                    <ListGroup.Item key={review._id}>
                                        <strong>{review.name}</strong>
                                        <Rating value={review.rating} />
                                        <p>{review.createdAt.substring(0, 10)}</p>
                                        <p>{review.comment}</p>
                                    </ListGroup.Item>
                                ))}

                            </ListGroup>
                        </Col>
                        <Col md={6}>
                            <h2>Write a Customer Review</h2>
                            <ListGroup variant='flush'>
                                <ListGroup.Item>
                                    {loadingProductReview && <Loader />}
                                    {userInfo ? (
                                        <Form onSubmit={submitHandler}>
                                            <Form.Group controlId='rating'>
                                                <Form.Label>Rating</Form.Label>
                                                <Form.Control
                                                    as='select'
                                                    required
                                                    value={rating}
                                                    onChange={(e) => setRating(e.target.value)}
                                                >
                                                    <option value=''>Select...</option>
                                                    <option value='1'>1 - Poor</option>
                                                    <option value='2'>2 - Fair</option>
                                                    <option value='3'>3 - Good</option>
                                                    <option value='4'>4 - Very Good</option>
                                                    <option value='5'>5 - Excellent</option>
                                                </Form.Control>
                                            </Form.Group>
                                            <Form.Group className='my-2' controlId='comment'>
                                                <Form.Label>Comment</Form.Label>
                                                <Form.Control
                                                    as='textarea'
                                                    row='3'
                                                    required
                                                    value={comment}
                                                    onChange={(e) => setComment(e.target.value)}
                                                ></Form.Control>
                                            </Form.Group>
                                            <Button
                                                disabled={loadingProductReview}
                                                type='submit'
                                                variant='primary'
                                            >
                                                Submit
                                            </Button>
                                        </Form>
                                    ) : (
                                        <Message>
                                            Please <Link to='/login'>sign in</Link> to write a review
                                        </Message>
                                    )}
                                </ListGroup.Item>
                            </ListGroup>
                        </Col>
                    </Row>

                </>
            )}

        </>

    )
}

export default ProductDetail
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button, Row, Col } from 'react-bootstrap'
import { FaEdit, FaTrash } from 'react-icons/fa'
import Message from '../../components/Message'
import Loader from '../../components/Loader'
import { useParams } from 'react-router-dom'
import { useGetProductsQuery, useCreateProductMutation, useDeleteProductMutation } from '../../slices/productsApiSlice'
import { toast } from 'react-toastify'
import PaginationComponent from '../../components/Pagination'
const Products = () => {
    const { pageNumber } = useParams()

    const { data, isLoading, isError, refetch } = useGetProductsQuery({ pageNumber })



    const [createProduct, { isLoading: createLoading }] = useCreateProductMutation()
    const [deleteProduct, { isLoading: loadingDelete }] = useDeleteProductMutation();
    const createHandler = async () => {
        try {
            await createProduct()
            refetch()
            toast.success('New Product Created')
        } catch (error) {
            toast.error(error?.data?.message || error.error)
        }

    }
    const productDeleteHandler = async (id) => {

        try {
            await deleteProduct(id);
            refetch();
            toast.success(' Product Deleted')
        } catch (err) {
            toast.error(err?.data?.message || err.error);
        }

    };

    return (
        <>
            <Row className='align-items-center'>

                <Col>
                    <h1> Products</h1>
                </Col>
                <Col className='text-end'>
                    <Button className='m-2' onClick={createHandler}>
                        <FaEdit className='mb-1' />Add Products
                    </Button>
                </Col>
            </Row>
            {createLoading && <Loader />}
            {isLoading ? <Loader /> : isError ? <Message variant='danger'>{isError.data.message || 'something went wrong'}</Message> : (
                <>
                    <Table striped hover responsive >
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>NAME</th>
                                <th>PRICE</th>
                                <th>CATEGORY</th>
                                <th>BRAND</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.products.map((product) => (
                                <tr key={product._id}>
                                    <td>{product._id}</td>
                                    <td>{product.name}</td>
                                    <td>${product.price}</td>
                                    <td>{product.category}</td>
                                    <td>{product.brand}</td>
                                    <td>
                                        <LinkContainer to={`/admin/product/${product._id}/edit`}>
                                            <Button variant='light' className='btn-sm mx-2'>
                                                <FaEdit />
                                            </Button>
                                        </LinkContainer>
                                        <Button
                                            variant='danger'
                                            className='btn-sm'
                                            onClick={() => productDeleteHandler(product._id)}
                                        >
                                            <FaTrash style={{ color: 'white' }} />
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                    <PaginationComponent pages={data.pages} page={data.page} isAdmin={true} />
                </>
            )}


        </>
    )
}

export default Products
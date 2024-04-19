import { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import FormSkeleton from '../components/FormSkeleton';
import { addShippingAddress } from '../slices/cartSlice';
import CheckoutProcess from '../components/CheckoutProcess'
const Shipping = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate()


    const cart = useSelector((state) => state.cart);
    const { shippingAddress } = cart;



    const [address, setAddress] = useState((shippingAddress?.address) || '')
    const [city, setCity] = useState(shippingAddress?.city || '')
    const [postCode, setPostCode] = useState(shippingAddress?.postCode || '')
    const [country, setCountry] = useState(shippingAddress?.country || '')

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(addShippingAddress({ address, city, postCode, country }));
        navigate('/payment');

    }



    return (
        <FormSkeleton>
            <CheckoutProcess step1 step2 />
            <h1 className='text-center'>Shipping</h1>

            <Form onSubmit={submitHandler}>
                <Form.Group controlId='address' className='my-2'>
                    <Form.Label>Address</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='Enter Address'
                        value={address}
                        onChange={e => setAddress(e.target.value)}
                    ></Form.Control>

                </Form.Group>
                <Form.Group controlId='city' className='my-2'>
                    <Form.Label>City</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='Enter City'
                        value={city}
                        onChange={e => setCity(e.target.value)}
                    ></Form.Control>

                </Form.Group>
                <Form.Group controlId='postCode' className='my-2'>
                    <Form.Label>PostCode</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='Enter Post Code'
                        value={postCode}
                        onChange={e => setPostCode(e.target.value)}
                    ></Form.Control>

                </Form.Group>
                <Form.Group controlId='country' className='my-2'>
                    <Form.Label>Country</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='Enter Country'
                        value={country}
                        onChange={e => setCountry(e.target.value)}
                    ></Form.Control>

                </Form.Group>
                <Form.Group className='text-center'>
                    <Button type='submit' variant='primary'>
                        Continue
                    </Button>
                </Form.Group>

            </Form>

        </FormSkeleton>
    )
}

export default Shipping 
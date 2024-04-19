import { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import FormSkeleton from '../components/FormSkeleton'
import { useRegisterMutation } from '../slices/userApiSlice'
import { setCredentials } from '../slices/authSlice'
import { toast } from 'react-toastify'



const Register = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [name, setName] = useState('')
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [register, { isLoading }] = useRegisterMutation()

    const { userInfo } = useSelector(state => state.auth)

    const { search } = useLocation()
    const searchParams = new URLSearchParams(search)
    const q = searchParams.get('redirect') || '/'

    useEffect(() => {
        if (userInfo) {
            navigate(q)
        }
    }, [userInfo, q, navigate])


    const submitHandle = async (e) => {
        e.preventDefault()
        if (password !== confirmPassword) {
            toast.error('Password do not match')
            return
        } else {
            try {
                const res = await register({ name, email, password }).unwrap()
                dispatch(setCredentials(res))
                navigate(q)
            } catch (error) {
                toast.error(error?.data?.message || error.error)
            }
        }

    }
    return (
        <FormSkeleton>
            <h1>Sign Up</h1>
            <Form onSubmit={submitHandle}>


                <Form.Group className='my-2' controlId='name'>
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='Enter name'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    ></Form.Control>
                </Form.Group>


                <Form.Group className='my-2' controlId='email'>
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                        type='email'
                        placeholder='Enter email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    ></Form.Control>
                </Form.Group>


                <Form.Group className='my-2' controlId='password'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type='password'
                        placeholder='Enter password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    ></Form.Control>
                </Form.Group>
                <Form.Group className='my-2' controlId='confrimPassword'>
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                        type='password'
                        placeholder='Confrim password'
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Button disabled={isLoading} type='submit' variant='primary' >
                    Sign Up
                </Button>

                {isLoading && <Loader />}


            </Form>
            <Row className='py-3'>
                <Col>
                    Already have account?{'  '}
                    <Link to={q ? `/login?redirect=${q}` : '/login'}>
                        Login
                    </Link>
                </Col>
            </Row>
        </FormSkeleton>
    )

}
export default Register
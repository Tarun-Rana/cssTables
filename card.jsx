import React, { Component } from 'react'
import {
  Row,
  Table,
  Col,
  Button,
  Card,
  Container,
  Modal,
  Breadcrumb
} from 'react-bootstrap'
import customerService from '../../../Services/CustomerService'
import { FaHome } from 'react-icons/fa'
import { BiEdit } from 'react-icons/bi'
import { MdDeleteForever } from 'react-icons/md'
import { Link } from 'react-router-dom'
export default class CustomerComponent extends Component {
  constructor (props) {
    super(props)
    this.state = {
      customers: []
    }
  }
  openModal = () => {
    this.setState({ openModal: true })
  }

  closeModal = () => {
    this.setState({ openModal: false })
  }
  componentDidMount () {
    console.log('Mount')
    customerService.getAllCustomers().then(res => {
      this.setState({ customers: res.data.customers })
      console.log('Mount2')
      console.log(res.data)
    })
  }
  render () {
    const ColoredLine = ({ color }) => (
      <hr
        style={{
          color: color,
          backgroundColor: color,
          marginTop: 0,
          height: 1
        }}
      />
    )
    return (
      <Container className='mainCustomer'>
        <Row className='breadcrum'>
          <Col>
            <h4>Customer</h4>
          </Col>
          <Col>
            <Breadcrumb className='alignRight'>
              <Breadcrumb.Item>
                <Link to='/'>
                  <FaHome />
                </Link>
              </Breadcrumb.Item>
              <Breadcrumb.Item active>Customer</Breadcrumb.Item>
            </Breadcrumb>
          </Col>
        </Row>
        <ColoredLine color='grey' />
        <div className='m-2'>
          <Link to='/addCustomerExcel'>
            <Button className='mr-3' variant='light'>
              Add Excel
            </Button>
          </Link>

          <Link to='/addCustomer'>
            <Button variant='light'>Add Customer</Button>
          </Link>
        </div>
        <Row>
          <Card className='customerCard'>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Corporate Name</th>
                  <th>Customer Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Currency</th>
                  <th>Inserted Date</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {this.state.customers.length === 0 ? (
                  <h1>no items in customers</h1>
                ) : (
                  this.state.customers.map((customer, idx) => (
                    <tr>
                      <td>{idx+1}</td>
                      <td>{customer.corporateName}</td>
                      <td>{customer.customerName}</td>
                      <td>{customer.emailAddress}</td>
                      <td>{customer.phoneNumber}</td>
                      <td>{customer.currency}</td>
                      <td>{customer.insertedDate}</td>
                      <td>
                        <Link
                          to={{
                            pathname: '/updateCustomer',
                            state: { id: customer.id }
                          }}
                        >
                          <Button variant='success'>
                            <BiEdit />
                          </Button>
                        </Link>
                        <Button
                          variant='danger'
                          className='ml-2'
                          onClick={this.openModal}
                        >
                          <MdDeleteForever />
                        </Button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </Table>
            <Modal
              className='textCenter'
              show={this.state.openModal}
              onHide={this.closeModal}
            >
              <Modal.Header closeButton>Delete</Modal.Header>
              <Modal.Body>Do you really want to delete?</Modal.Body>
              <Modal.Footer>
                <Button variant='danger' onClick={this.closeModal}>
                  Delete
                </Button>
              </Modal.Footer>
            </Modal>
          </Card>
        </Row>
      </Container>
    )
  }
}

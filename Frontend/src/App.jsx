import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Container, Navbar, Nav, Row, Col, Card, Form, Button, Alert, Table, Badge } from 'react-bootstrap';
import './App.css';

function Home() {
  return (
    <Container className="mt-5 text-center px-4">
      <Row className="justify-content-center">
        <Col md={10} lg={8} xl={7}>
          <div className="p-5 rounded-4 shadow-sm bg-white" style={{ borderTop: "4px solid #0d6efd" }}>
            <h1 className="fw-bold mb-4 text-primary display-5">Inventory Management</h1>
            <p className="lead text-muted mb-4">Welcome to the central hub for managing your products and processing orders. Please select your portal below.</p>
            <div className="d-grid gap-3 d-sm-flex justify-content-sm-center">
              <Link to="/admin" className="btn btn-primary btn-lg rounded-pill px-4 shadow-sm">
                <i className="bi bi-shield-lock me-2"></i>Admin Portal
              </Link>
              <Link to="/customer" className="btn btn-outline-secondary btn-lg rounded-pill px-4">
                <i className="bi bi-person me-2"></i>Customer Shop
              </Link>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

function Admin() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({ id: '', name: '', price: '', qty: '' });
  const [removeId, setRemoveId] = useState('');

  const fetchProducts = async () => {
    try {
      const res = await fetch('/api/products');
      const data = await res.json();
      if (data.ok) setProducts(data.products);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      fetchProducts();
    }
  }, [isLoggedIn]);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      const data = await res.json();
      if (data.ok) {
        setIsLoggedIn(true);
        setError('');
      } else {
        setError(data.error || 'Login failed');
      }
    } catch (e) {
      setError('Network error');
    }
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        id: parseInt(newProduct.id),
        name: newProduct.name,
        price: parseFloat(newProduct.price),
        qty: parseInt(newProduct.qty)
      };
      const res = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (data.ok) {
        alert('Product added successfully!');
        setNewProduct({ id: '', name: '', price: '', qty: '' });
        fetchProducts();
      } else {
        alert(data.error || 'Failed to add product');
      }
    } catch (e) {
      alert('Network error');
    }
  };

  const handleRemoveProduct = async (e) => {
    e.preventDefault();
    if (!removeId) return;
    try {
      const res = await fetch(`/api/products/${parseInt(removeId)}`, {
        method: 'DELETE'
      });
      const data = await res.json();
      if (data.ok) {
        alert('Product removed successfully!');
        setRemoveId('');
        fetchProducts();
      } else {
        alert(data.error || 'Failed to remove product');
      }
    } catch (e) {
      alert('Network error');
    }
  };

  if (!isLoggedIn) {
    return (
      <Container className="mt-5">
        <Row className="justify-content-center">
          <Col md={5}>
            <Card className="shadow-sm border-0 rounded-4">
              <Card.Body className="p-4">
                <h3 className="fw-bold mb-4 text-center">Admin Login</h3>
                {error && <Alert variant="danger">{error}</Alert>}
                <Form onSubmit={handleLogin}>
                  <Form.Group className="mb-3">
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="text" placeholder="admin" value={username} onChange={e => setUsername(e.target.value)} required />
                  </Form.Group>
                  <Form.Group className="mb-4">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="password" value={password} onChange={e => setPassword(e.target.value)} required />
                  </Form.Group>
                  <Button variant="primary" type="submit" className="w-100 py-2 rounded-pill fw-semibold">
                    Sign In
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }

  return (
    <Container className="mt-5 mb-5 pb-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold m-0"><Badge bg="primary" className="me-2">Admin</Badge> Dashboard</h2>
        <Button variant="outline-danger" className="rounded-pill px-3" onClick={() => setIsLoggedIn(false)}>Logout</Button>
      </div>

      <Row className="g-4">
        <Col md={4}>
          <Card className="shadow-sm border-0 rounded-4 mb-4">
            <Card.Body className="p-4">
              <h5 className="fw-bold mb-3">Add New Product</h5>
              <Form onSubmit={handleAddProduct}>
                <Form.Group className="mb-3">
                  <Form.Control type="number" placeholder="Product ID" value={newProduct.id} onChange={e => setNewProduct({ ...newProduct, id: e.target.value })} required />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Control type="text" placeholder="Name" value={newProduct.name} onChange={e => setNewProduct({ ...newProduct, name: e.target.value })} required />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Control type="number" step="0.01" placeholder="Price ($)" value={newProduct.price} onChange={e => setNewProduct({ ...newProduct, price: e.target.value })} required />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Control type="number" placeholder="Quantity" value={newProduct.qty} onChange={e => setNewProduct({ ...newProduct, qty: e.target.value })} required />
                </Form.Group>
                <Button variant="success" type="submit" className="w-100 rounded-pill fw-semibold">Add Product</Button>
              </Form>
            </Card.Body>
          </Card>

          <Card className="shadow-sm border-0 rounded-4">
            <Card.Body className="p-4">
              <h5 className="fw-bold mb-3">Remove Product</h5>
              <Form onSubmit={handleRemoveProduct}>
                <Form.Group className="mb-3">
                  <Form.Control type="number" placeholder="Product ID" value={removeId} onChange={e => setRemoveId(e.target.value)} required />
                </Form.Group>
                <Button variant="danger" type="submit" className="w-100 rounded-pill fw-semibold">Remove</Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>

        <Col md={8}>
          <Card className="shadow-sm border-0 rounded-4 h-100">
            <Card.Body className="p-4">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h5 className="fw-bold m-0">Inventory List</h5>
                <Button variant="outline-secondary" size="sm" onClick={fetchProducts} className="rounded-pill">Refresh</Button>
              </div>
              <Table responsive hover className="align-middle">
                <thead className="table-light">
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Quantity</th>
                  </tr>
                </thead>
                <tbody>
                  {products.length === 0 ? (
                    <tr><td colSpan="4" className="text-center text-muted py-4">No products found. Add one!</td></tr>
                  ) : (
                    products.map(p => (
                      <tr key={p.id}>
                        <td><Badge bg="secondary" pill>#{p.id}</Badge></td>
                        <td className="fw-semibold">{p.name}</td>
                        <td>${parseFloat(p.price).toFixed(2)}</td>
                        <td>{p.qty > 0 ? p.qty : <Badge bg="danger">Out of Stock</Badge>}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

function Customer() {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [orderForm, setOrderForm] = useState({ id: '', qty: '' });
  const [message, setMessage] = useState(null);

  const fetchProducts = async () => {
    try {
      const res = await fetch('/api/products');
      const data = await res.json();
      if (data.ok) setProducts(data.products.filter(p => p.qty > 0));
    } catch (e) {
      console.error(e);
    }
  };

  const fetchOrders = async () => {
    try {
      const res = await fetch('/api/orders');
      const data = await res.json();
      if (data.ok) setOrders(data.ordered);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchOrders();
  }, []);

  const handleOrder = async (e) => {
    e.preventDefault();
    setMessage(null);
    try {
      const payload = {
        id: parseInt(orderForm.id),
        qty: parseInt(orderForm.qty)
      };
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (data.ok) {
        setMessage({ type: 'success', text: 'Order placed successfully!' });
        setOrderForm({ id: '', qty: '' });
        fetchProducts(); // Refresh to get updated quantities
        fetchOrders(); // Refresh order history
      } else {
        setMessage({ type: 'danger', text: data.error || 'Failed to place order' });
      }
    } catch (e) {
      setMessage({ type: 'danger', text: 'Network error placing order' });
    }
  };

  return (
    <Container className="mt-5 mb-5 pb-5">
      <Row className="g-4">
        <Col lg={8}>
          <div className="mb-4">
            <h2 className="fw-bold">Browse Products</h2>
            <p className="text-muted">Discover our fresh arrivals and top picks.</p>
          </div>
          <Row className="g-4">
            {products.length === 0 ? (
              <Col>
                <div className="p-5 text-center bg-light rounded-4 text-muted">
                  <h5>No products currently in stock. Please check back later.</h5>
                </div>
              </Col>
            ) : (
              products.map(p => (
                <Col md={6} key={p.id}>
                  <Card className="h-100 border-0 shadow-sm rounded-4 product-card overflow-hidden">
                    <div className="d-flex justify-content-between align-items-center bg-primary text-white p-3 pt-4">
                      <span className="fw-semibold px-2">{p.name}</span>
                      <Badge bg="light" text="dark" className="fs-6 me-2">${parseFloat(p.price).toFixed(2)}</Badge>
                    </div>
                    <Card.Body className="p-4 d-flex justify-content-between align-items-center">
                      <div>
                        <small className="text-muted d-block text-uppercase fw-bold" style={{ fontSize: '0.7rem' }}>Product Code</small>
                        <span className="fw-bold font-monospace">#{p.id}</span>
                      </div>
                      <div className="text-end">
                        <small className="text-muted d-block text-uppercase fw-bold" style={{ fontSize: '0.7rem' }}>Availability</small>
                        <Badge bg={p.qty > 10 ? "success" : "warning"} className="px-3 rounded-pill">{p.qty} in stock</Badge>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              ))
            )}
          </Row>
        </Col>

        <Col lg={4}>
          <div className="sticky-top" style={{ top: '20px' }}>
            <Card className="border-0 shadow-sm rounded-4 mb-4">
              <Card.Body className="p-4">
                <h4 className="fw-bold mb-4 border-bottom pb-3">Place an Order</h4>
                {message && <Alert variant={message.type} dismissible onClose={() => setMessage(null)}>{message.text}</Alert>}
                <Form onSubmit={handleOrder}>
                  <Form.Group className="mb-3">
                    <Form.Label className="fw-semibold text-muted small text-uppercase">Product ID</Form.Label>
                    <Form.Control size="lg" type="number" placeholder="e.g., 1" value={orderForm.id} onChange={e => setOrderForm({ ...orderForm, id: e.target.value })} required />
                  </Form.Group>
                  <Form.Group className="mb-4">
                    <Form.Label className="fw-semibold text-muted small text-uppercase">Quantity</Form.Label>
                    <Form.Control size="lg" type="number" min="1" placeholder="e.g., 2" value={orderForm.qty} onChange={e => setOrderForm({ ...orderForm, qty: e.target.value })} required />
                  </Form.Group>
                  <Button variant="primary" type="submit" size="lg" className="w-100 rounded-pill fw-bold shadow-sm">
                    Complete Order <i className="bi bi-cart-check ms-1"></i>
                  </Button>
                </Form>
              </Card.Body>
            </Card>

            <Card className="border-0 shadow-sm rounded-4">
              <Card.Body className="p-4">
                <h4 className="fw-bold mb-4 border-bottom pb-3">My Cart</h4>
                {orders.length === 0 ? (
                  <p className="text-muted text-center mb-0">Your cart is empty.</p>
                ) : (
                  <ul className="list-group list-group-flush">
                    {orders.map((o, idx) => (
                      <li key={idx} className="list-group-item d-flex justify-content-between align-items-center px-0">
                        <div>
                          <strong className="d-block">{o.name}</strong>
                          <small className="text-muted">Product #{o.id}</small>
                        </div>
                        <Badge bg="primary" pill>Qty: {o.ordered_qty}</Badge>
                      </li>
                    ))}
                  </ul>
                )}
              </Card.Body>
            </Card>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

function App() {
  return (
    <div className="bg-light min-vh-100">
      <Navbar bg="white" expand="lg" className="shadow-sm py-3 sticky-top">
        <Container>
          <Navbar.Brand as={Link} to="/" className="fw-bold fs-4 text-primary">
            <span style={{ color: '#0d6efd' }}>📋</span> Inventory Management System
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto fw-semibold">
              <Nav.Link as={Link} to="/" className="px-3 rounded-pill hover-bg-light">Home</Nav.Link>
              <Nav.Link as={Link} to="/customer" className="px-3 rounded-pill hover-bg-light">Customer</Nav.Link>
              <Nav.Link as={Link} to="/admin" className="px-3 rounded-pill hover-bg-light">Admin</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/customer" element={<Customer />} />
      </Routes>
    </div>
  );
}

export default App;

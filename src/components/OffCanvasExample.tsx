import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';

function OffCanvasExample() {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <Button variant="outline-secondary" onClick={handleShow} className="me-2">
                순위보기
            </Button>
            <Offcanvas show={show} onHide={handleClose} placement="end">
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>top20</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    
                </Offcanvas.Body>
            </Offcanvas>
        </>
    );
}

export default OffCanvasExample;
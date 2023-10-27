import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { RecordGet, RecordGetProps } from '../util/dbService';

function OffCanvasExample() {
    const [show, setShow] = useState(false);
    const [getData, setData] = useState<RecordGetProps[]>();

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    useEffect(() => {
        const fetchData = async () => {
            const data = await RecordGet();
            setData(data.slice(0, 20));
        }

        fetchData();
    }, []);
    console.log(getData);
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
                    {getData && getData.map((obj, i) => (
                        <div key={i}>
                            <span>{i+1}등: {obj.nickName} - {obj.time}</span>
                        </div>
                    ))}
                </Offcanvas.Body>
            </Offcanvas>
        </>
    );
}

export default OffCanvasExample;
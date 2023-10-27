import { useState } from 'react';
import { Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useSetRecoilState } from 'recoil';
import { nickNameState } from '../atom';

function Example() {
    
    const [text, setText] = useState("");
    const setNickName = useSetRecoilState(nickNameState);
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const changeNickName = (e: React.ChangeEvent<HTMLInputElement>) => {
        setText(e.target.value);
    };

    const onClick = () => {
        setNickName(text);
        setShow(false);
    };

    return (
        <>
            <Button variant="outline-secondary" onClick={handleShow}>
                순위입력
            </Button>

            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>정보를 입력해주세요.</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>이름 & 닉네임</Form.Label>
                            <Form.Control 
                                onChange={changeNickName}
                                value={text}
                                type="text"
                                placeholder="순위에 기록될 이름입니다."
                            />
                            <span>글자 미 입력 시 기록이 남지 않습니다.</span>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        취소
                    </Button>
                    <Button variant="primary" onClick={onClick}>
                        등록
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default Example;
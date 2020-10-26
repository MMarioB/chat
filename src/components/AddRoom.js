import React, { useState } from 'react';
import {
    useHistory
} from "react-router-dom";
import {
    Alert,
    Jumbotron,
    Spinner,
    Form,
    Button,
    FormGroup, 
    Label, 
    Input
} from 'reactstrap';
import firebase from '../Firebase';

function AddRoom() {
    const history = useHistory();
    const [room, setRoom] = useState({ roomname: '' });
    const [showLoading, setShowLoading] = useState(false);
    const ref = firebase.database().ref('rooms/');

    const save = (e) => {
        e.preventDefault();
        setShowLoading(true);
        ref.orderByChild('roomname').equalTo(room.roomname).once('value', snapshot => {
            if (snapshot.exists()) {
                return (
                    <div>
                        <Alert color="primary">
                            Room name already exist!
                        </Alert>
                    </div>
                );
            } else {
                const newRoom = firebase.database().ref('rooms/').push();
                newRoom.set(room);
                history.goBack();
                setShowLoading(false);
            }
        });
    };

    const onChange = (e) => {
        e.persist();
        setRoom({...room, [e.target.name]: e.target.value});
    }

    return (
        <div>
            {showLoading &&
                <Spinner color="primary" />
            }
            <Jumbotron>
                <h2>Introduce un nuevo Chat</h2>
                <Form onSubmit={save}>
                    <FormGroup>
                        <Label>Nombre</Label>
                        <Input type="text" name="roomname" id="roomname" placeholder="Nombre Sala" value={room.roomname} onChange={onChange} />
                    </FormGroup>
                    <Button variant="primary" type="submit">
                        Añadir
                    </Button>
                </Form>
            </Jumbotron>
        </div>
    );
}

export default AddRoom;
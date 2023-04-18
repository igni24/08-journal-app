import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { DeleteOutline, SaveOutlined, UploadOutlined } from '@mui/icons-material';
import { Button, Grid, IconButton, TextField, Typography } from '@mui/material';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css';

import { useForm } from '../../hooks/useForm';
import { ImageGallery } from '../components';
import { setActiveNote, startDeletingNote, startSaveNote, startUploadingFiles } from '../../store/journal';

export const NoteView = () => {
    const dispatch = useDispatch();

    const { active: note, messageSaved, isSaving } = useSelector(state => state.journal);
    const { body, title, date, onInputChange, formState } = useForm(note);

    const fileInputRef = useRef();

    useEffect(() => {
        dispatch(setActiveNote(formState));
    }, [formState]);

    useEffect(() => {
        if (messageSaved.length > 0) {
            Swal.fire('Nota actualizada', messageSaved, 'success');
        }
    }, [messageSaved]);

    const onSaveNote = () => {
        dispatch(startSaveNote());
    };

    const onFileInputChange = ({ target }) => {
        if (target.files === 0) return;
        dispatch(startUploadingFiles(target.files));
    };

    const onDelete = () => {
        dispatch(startDeletingNote());
    };

    return (
        <Grid
            container
            direction="row"
            justifyContent="space-between"
            sx={{ mb: 1 }}
        >
            <Grid item>
                <Typography fontSize={39} fontWeight="light">
                    {new Date(date).toUTCString()}
                </Typography>
            </Grid>
            <Grid item>
                <input
                    type="file"
                    multiple
                    ref={fileInputRef}
                    onChange={onFileInputChange}
                    style={{ display: 'none' }}
                />

                <IconButton
                    color="primary"
                    disabled={isSaving}
                    onClick={() => fileInputRef.current.click()}
                >
                    <UploadOutlined />
                </IconButton>

                <Button
                    color="primary"
                    sx={{ padding: 2 }}
                    onClick={onSaveNote}
                    disabled={isSaving}
                >
                    <SaveOutlined sx={{ fontSize: 30, mr: 1 }} />
                    Guardar
                </Button>
            </Grid>

            <Grid container>
                <TextField
                    type="text"
                    variant="filled"
                    fullWidth
                    placeholder="Ingrese un título"
                    label="Título"
                    sx={{ border: 'none', mb: 1 }}
                    name="title"
                    value={title}
                    onChange={onInputChange}
                />

                <TextField
                    type="text"
                    variant="filled"
                    fullWidth
                    multiline
                    placeholder="Que paso en el dia de hoy"
                    minRows={5}
                    sx={{ border: 'none', mb: 1 }}
                    name="body"
                    value={body}
                    onChange={onInputChange}
                />
            </Grid>

            <Grid container justifyContent="end">
                <Button
                color="error"
                onClick={onDelete}
                sx={{mt:2}}
                >
                    <DeleteOutline /> Borrar
                </Button>
            </Grid>

            <ImageGallery
                images={note.imageUrls}
            />
        </Grid>
    );
};
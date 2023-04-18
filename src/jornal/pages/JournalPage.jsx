import { AddOutlined } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

import { JournalLayout } from '../layout/JournalLayout';
import { NoteView, NothingSelectedView } from '../views';

import { startNewNote } from '../../store/journal';

export const JournalPage = () => {
  const { active, isSaving } = useSelector(state => state.journal);
  const dispatch = useDispatch();

  const onClickNewNote = () => {
    dispatch(startNewNote());
  };
  return (
    <JournalLayout>
      {
        (!!active)
          ? <NoteView />
          : <NothingSelectedView />
      }

      <IconButton
        onClick={onClickNewNote}
        size="large"
        disabled={isSaving}
        sx={{
          color: 'white',
          backgroundColor: 'error.main',
          ':hover': { backgroundColor: 'error.main', opacity: 0.9 },
          position: 'fixed',
          right: 50,
          bottom: 50
        }}>
        <AddOutlined sx={{ fontSize: 20 }} />
      </IconButton>
    </JournalLayout>
  );
};
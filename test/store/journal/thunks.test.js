import { addNewEmptyNote, savingNewNote, setActiveNote } from '../../../src/store/journal/JournalSlice';
import { startNewNote } from '../../../src/store/journal/thunks';

describe('Pruebas en Journal Thunks', () => {
    const dispatch = jest.fn();
    const getState = jest.fn();

    beforeEach(() => jest.clearAllMocks());

    test('startNewNote debe crear una nueva nota en blanco', async () => {
        const uid = 'TEST-UID';
        getState.mockReturnValue({
            auth: { uid: uid }
        });

        await startNewNote()(dispatch, getState);

        expect(dispatch).toHaveBeenCalledWith(savingNewNote());
        console.log(dispatch)
        console.log(addNewEmptyNote({
            body: '',
            title: '',
            id: expect.any(String),
            date: expect.any(Number)
        }))
        expect(dispatch).toHaveBeenCalledWith(addNewEmptyNote({
            body: '',
            title: '',
            id: expect.any(String),
            date: expect.any(Number)
        }));
        expect(dispatch).toHaveBeenCalledWith(setActiveNote({
            body: '',
            title: '',
            id: expect.any(String),
            date: expect.any(Number)
        }));
    });
});
'use client'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import ButtonGroup from '@mui/material/ButtonGroup';
import axios from 'axios'
import { useRouter } from 'next/navigation';

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    borderRadius: 4,
    boxShadow: 24,
    p: 4,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  };

const UnpublishModal = ({ open = false, setOpen, id }: { open: boolean, setOpen: React.Dispatch<React.SetStateAction<boolean>>, id: string | null | undefined }) => {
    const handleClose = () => setOpen(false);
    const router = useRouter()
    const unpublishPost = async () => {
        const { data } = await axios.post(`/api/posts/unpublish/${id}`)
        router.refresh()
        handleClose()
      }
    return (
        <>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h4" component="h2">
                        Are you Sure?
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        You are unpublishing this post, this action will make it private and not exposed in your API
                    </Typography>
                    <ButtonGroup sx={{ mt: 2 }}>
                        <Button variant='outlined' color='warning' onClick={handleClose}>No, Go Back</Button>
                        <Button variant='contained' color='warning' onClick={unpublishPost}>Unpublish Post</Button>
                    </ButtonGroup>
                </Box>
            </Modal>
        </>
    )

}

export default UnpublishModal
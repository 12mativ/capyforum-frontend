import React, {useState} from "react";
import useUsernameModal from "@/hooks/useUsernameModal";
import Modal from "@/components/Modal";
import Button from "@/components/Button";
import Input from "@/components/Input";

interface NicknameModalProps {
  updateProfile: ({username}: {username: string | null}) => Promise<void>
  loading: boolean
}

const UsernameModal: React.FC<NicknameModalProps> = ({updateProfile, loading}) => {
  const {onClose, isOpen, isLoading} = useUsernameModal()
  const [username, setUsername] = useState<string | null>(null)

  const onChange = (open: boolean) => {
    if (!open) {
      onClose()
    }
  }

  return (
    <Modal
      isOpen={isOpen}
      onChange={onChange}
      title='Your perfect nickname'
      description='Create your nickname'
    >
      <Input
        value={username || ''}
        onChange={(e) => setUsername(e.target.value)}
      />
      <Button disabled={loading} onClick={() => updateProfile({username})}>
        {loading ? 'Loading ...' : 'Set username'}
      </Button>
    </Modal>
  )
}


export default UsernameModal
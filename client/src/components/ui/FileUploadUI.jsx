import { Box, FileUpload, Icon } from "@chakra-ui/react"
import { LuUpload } from "react-icons/lu"

const FileUploadUI = ({onFilesChange, maxFiles, title, text }) => {
  return (
    <FileUpload.Root maxW="xl" alignItems="stretch" 
	maxFiles={maxFiles || 10}
	
	onFileChange={(files) => onFilesChange(files)}>
      <FileUpload.HiddenInput />
      <FileUpload.Dropzone>
        <Icon size="md" color="fg.muted">
          <LuUpload />
        </Icon>
        <FileUpload.DropzoneContent>
          <Box>{title || "Drag and drop files here"}</Box>
          <Box color="fg.muted">{text || ".png, .jpg up to 5MB"}</Box>
        </FileUpload.DropzoneContent>
      </FileUpload.Dropzone>
      <FileUpload.List />
    </FileUpload.Root>
  )
}
export default FileUploadUI

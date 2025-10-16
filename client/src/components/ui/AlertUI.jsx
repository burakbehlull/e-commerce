import { Alert } from "@chakra-ui/react"

const AlertUI = ({title, description, status}) => {
  return (
    <Alert.Root status={status ? status : "error"}>
      <Alert.Indicator />
      <Alert.Content>
		{title &&<Alert.Title>{title}</Alert.Title> }
        <Alert.Description>
			{description}
        </Alert.Description>
      </Alert.Content>
    </Alert.Root>
  )
}


export default AlertUI
import { Button } from "@chakra-ui/react"

const ButtonUI = ({text, ...props}) => {
  return (
    <Button {...props}>
		{text}
	</Button>
  )
}

export default ButtonUI
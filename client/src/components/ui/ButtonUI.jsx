import { Button } from "@chakra-ui/react"

const ButtonUI = ({children, text, ...props}) => {
  return (
    <Button {...props}>
		{children ? children : text}
	</Button>
  )
}

export default ButtonUI
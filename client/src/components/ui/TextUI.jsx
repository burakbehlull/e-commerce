import { Text } from "@chakra-ui/react"

const TextUI = ({children, text, ...props}) => {
  return (
    <Text {...props}>
		{children ? children : text}
	</Text>
  )
}

export default TextUI
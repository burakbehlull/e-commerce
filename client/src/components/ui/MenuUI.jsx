import { Button, Menu, Portal } from "@chakra-ui/react"

const MenuUI = ({children, content, ...props}) => {
  return (
    <Menu.Root {...props}>
      <Menu.Trigger asChild>
		{content}
      </Menu.Trigger>
      <Portal>
        <Menu.Positioner>
          <Menu.Content>
            {children}
          </Menu.Content>
        </Menu.Positioner>
      </Portal>
    </Menu.Root>
  )
}

const MenuItemUI = ({children, text, props}) => {
  return (
    <Menu.Item {...props}>{children ? children : text}</Menu.Item>      
  )
}

export {
	MenuUI,
	MenuItemUI
}